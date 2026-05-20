import { useCallback, useEffect, useRef, useState } from 'react'

const getPointerX = (event) => (event.touches ? event.touches[0].clientX : event.clientX)

export const useInfiniteCarousel = ({ speed = 18 } = {}) => {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const frameRef = useRef(0)
  const draggingRef = useRef(false)
  const startXRef = useRef(0)
  const startScrollLeftRef = useRef(0)
  const offsetRef = useRef(0)
  const halfWidthRef = useRef(0)
  const [isDragging, setIsDragging] = useState(false)

  const measure = useCallback(() => {
    const track = trackRef.current
    halfWidthRef.current = track ? track.scrollWidth / 2 : 0
  }, [])

  useEffect(() => {
    measure()

    const track = trackRef.current
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null

    if (track && observer) {
      observer.observe(track)
    }

    window.addEventListener('load', measure)

    return () => {
      observer?.disconnect()
      window.removeEventListener('load', measure)
    }
  }, [measure])

  useEffect(() => {
    let last = performance.now()

    const step = (now) => {
      const container = containerRef.current
      const half = halfWidthRef.current

      if (container && half > 0 && !draggingRef.current) {
        const delta = ((now - last) / 1000) * speed

        if (delta) {
          offsetRef.current += delta

          if (offsetRef.current >= half) {
            offsetRef.current -= half
          }

          if (offsetRef.current < 0) {
            offsetRef.current += half
          }

          container.scrollLeft = offsetRef.current
        }
      }

      last = now
      frameRef.current = window.requestAnimationFrame(step)
    }

    frameRef.current = window.requestAnimationFrame(step)

    return () => {
      window.cancelAnimationFrame(frameRef.current)
    }
  }, [speed])

  const normalizeScrollLeft = useCallback((value) => {
    const half = halfWidthRef.current

    if (half <= 0) return value

    let next = value
    while (next >= half) next -= half
    while (next < 0) next += half
    return next
  }, [])

  const handlePointerDown = useCallback((event) => {
    const container = containerRef.current
    if (!container) return

    draggingRef.current = true
    setIsDragging(true)
    startXRef.current = getPointerX(event)
    startScrollLeftRef.current = container.scrollLeft
    offsetRef.current = container.scrollLeft

    if (event.currentTarget.setPointerCapture && event.pointerId !== undefined) {
      event.currentTarget.setPointerCapture(event.pointerId)
    }
  }, [])

  const handlePointerMove = useCallback((event) => {
    if (!draggingRef.current) return

    const container = containerRef.current
    if (!container) return

    const deltaX = getPointerX(event) - startXRef.current
    offsetRef.current = normalizeScrollLeft(startScrollLeftRef.current - deltaX)
    container.scrollLeft = offsetRef.current
  }, [normalizeScrollLeft])

  const endDrag = useCallback((event) => {
    draggingRef.current = false
    setIsDragging(false)

    const container = containerRef.current
    if (container) {
      offsetRef.current = normalizeScrollLeft(offsetRef.current)
      container.scrollLeft = offsetRef.current
    }

    if (event?.currentTarget?.releasePointerCapture && event.pointerId !== undefined) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId)
      } catch {
        // ignore release errors when capture already ended
      }
    }
  }, [normalizeScrollLeft])

  return {
    containerRef,
    trackRef,
    isDragging,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onPointerLeave: endDrag,
    },
  }
}