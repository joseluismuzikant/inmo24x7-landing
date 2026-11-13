# Legal data (single source of truth)

```
NOMBRE_LEGAL   José Luis Muzikant            (ARCA: MUZIKANT JOSE LUIS, persona física, monotributista)
CUIT           20-26474739-3
DOMICILIO      Ciudad Autónoma de Buenos Aires, Argentina
               (show ONLY the city on the site — never a street address)
TELEFONO       +54 9 11 5106-0793            (WhatsApp; the same phone given to Meta)
               link format: https://wa.me/5491151060793
EMAIL          contacto@inmo24x7.com
```

These values must match Meta's Business Info and the ARCA documents. The site is static, so
they are written literally in the HTML. If one changes, update it everywhere:

- The footer of every page (`index.html`, `terminos/index.html`, `privacidad/index.html`,
  `eliminacion-de-datos/index.html`, `404.html`). The footer is the block between
  `<!-- site-footer` and `<!-- /site-footer -->` and must be identical on every page.
- The header (block between `<!-- site-header` and `<!-- /site-header -->`), also identical.
- The legal pages' body text (sections "Quiénes somos", "Contacto").
- The JSON-LD `Organization` in `index.html`.
- `llms.txt`.

Run `./check.sh` before publishing: it fails if any `TODO_` remains in the HTML, if the old
phone number reappears, or if the header or footer differ between pages.
