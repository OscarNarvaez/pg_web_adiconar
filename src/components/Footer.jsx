function Footer({ navItems, currentYear, navegarASeccion }) {
  return (
    <footer className="relative z-10 border-t border-emerald-950/15 bg-[#0d2721] text-emerald-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-12 px-4 py-12 text-center md:px-8">
        <div className="flex flex-col items-center">
          <p className="font-heading text-3xl tracking-tight text-white">ADICONAR</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-4">
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
              <p>contacto@adiconar.co</p>
              <p>+57 318 589 6142</p>
              <p>Calle 21 #16 - 44 Navarrete</p>
              <p>Pasto, Colombia</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">Legal</p>
            <div className="mt-4 space-y-2 text-sm text-emerald-100/85">
              <a
                href="mailto:contacto@adiconar.co?subject=Solicitud%20politica%20de%20privacidad"
                className="block transition hover:text-amber-200"
              >
                Politica de privacidad
              </a>
              <a
                href="mailto:contacto@adiconar.co?subject=Solicitud%20terminos%20de%20servicio"
                className="block transition hover:text-amber-200"
              >
                Terminos de servicio
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">Redes sociales</p>
            <div className="mt-4 space-y-3 text-sm text-emerald-100/85">
              <a
                href="https://www.facebook.com/share/17mGRkHmjR/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-amber-200"
                aria-label="Facebook ADICONAR"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/1280px-Facebook_f_logo_%282021%29.svg.png"
                  alt="Facebook"
                  className="h-5 w-5 rounded"
                  loading="lazy"
                />
                Facebook
              </a>
              <br />
              <a
                href="https://www.instagram.com/adiconarnarino?igsh=a3Z6anF0bDFjbTJz&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-amber-200"
                aria-label="Instagram ADICONAR"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1280px-Instagram_icon.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail"
                  alt="Instagram"
                  className="h-5 w-5 rounded"
                  loading="lazy"
                />
                Instagram
              </a>
              <br />
              <a
                href="#inicio"
                className="inline-flex items-center gap-2 transition hover:text-amber-200"
                aria-label="Sitio Web ADICONAR"
              >
                <svg className="h-5 w-5 text-emerald-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
                adiconar.co
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-emerald-100/10 bg-black/20">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-2 px-4 py-4 text-center text-xs text-emerald-100/70 md:px-8">
          <p>© {currentYear} ADICONAR. Todos los derechos reservados.</p>
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
