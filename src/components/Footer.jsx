function Footer({ navItems, currentYear, navegarASeccion }) {
  return (
    <footer className="relative z-10 border-t border-emerald-950/15 bg-[#0d2721] text-emerald-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-12 px-4 py-12 text-center md:px-8">
        <div className="flex flex-col items-center">
          <p className="font-heading text-3xl tracking-tight text-white">ADICONAR</p>
          <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-emerald-100/85">
            Impulsamos desarrollo comunitario con metodo, alianzas y gestion transparente para sostener resultados de largo plazo.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-3">
          <div className="flex flex-col items-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">Navegacion</p>
            <div className="mt-4 space-y-2 text-sm text-emerald-100/85">
              {navItems.map((item) => (
                <a
                  key={`footer-${item.href}`}
                  href={item.href}
                  onClick={(event) => navegarASeccion(event, item.href)}
                  className="block transition hover:text-amber-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">Contacto</p>
            <div className="mt-4 space-y-2 text-sm text-emerald-100/85">
              <p>nadiconar@gmail.com</p>
              <p>+57 312 847 1928</p>
              <p>Pasto, Colombia</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">Legal</p>
            <div className="mt-4 space-y-2 text-sm text-emerald-100/85">
              <a
                href="mailto:nadiconar@gmail.com?subject=Solicitud%20politica%20de%20privacidad"
                className="block transition hover:text-amber-200"
              >
                Politica de privacidad
              </a>
              <a
                href="mailto:nadiconar@gmail.com?subject=Solicitud%20terminos%20de%20servicio"
                className="block transition hover:text-amber-200"
              >
                Terminos de servicio
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-emerald-100/10 bg-black/20">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-2 px-4 py-4 text-center text-xs text-emerald-100/70 md:px-8">
          <p>© {currentYear} ADICONAR ONG. Todos los derechos reservados.</p>
          <p>
            Diseñado por{' '}
            <a
              href="https://www.linkedin.com/in/oscar-julian-narvaez-5b144120b/"
              className="text-emerald-100/70 transition hover:text-amber-200"
            >
              ZOKY
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
