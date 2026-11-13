# Legal data (single source of truth)

```
NOMBRE_LEGAL   José Luis Muzikant            (ARCA: MUZIKANT JOSE LUIS, persona física, monotributista)
CUIT           20-26474739-3
DOMICILIO      Gorriti 3676, piso 4, depto. B, C1172, Ciudad Autónoma de Buenos Aires, Argentina
CIUDAD         Ciudad Autónoma de Buenos Aires, Argentina
TELEFONO       +54 9 11 5106-0793            (WhatsApp; the same phone given to Meta)
               link format: https://wa.me/5491151060793
EMAIL          contacto@inmo24x7.com
MODELO_IA      DeepSeek (DeepSeek, servidores en la República Popular China)
```

These values must match Meta's Business Info and the ARCA documents. The site is static, so
they are written literally in the HTML. If one changes, update it everywhere it is used:

| Value | Where it appears |
|---|---|
| NOMBRE_LEGAL, CUIT | Footer of every page; the legal pages' body text; JSON-LD `Organization` in `index.html`; `llms.txt` |
| DOMICILIO (street address) | **Only** `privacidad/index.html`, section 1 "Responsable" (Ley 25.326, art. 6). Nowhere else. |
| CIUDAD | Footer of every page; Términos (intro, contacto); Acuerdo (partes); JSON-LD; `llms.txt` |
| TELEFONO | Header "Pedir una demo" link, footer, home CTAs and floating button, legal pages' contact lines, JSON-LD, `llms.txt` |
| EMAIL | Everywhere a contact is shown |
| MODELO_IA | **One row** of the provider table in `privacidad/index.html` (marked `<!-- MODELO_IA -->`). The Acuerdo de tratamiento de datos links to that table instead of copying it. If the new provider is in another country, also update "Estados Unidos y China" in Privacidad §7 and Acuerdo §8. |

The footer is the block between `<!-- site-footer` and `<!-- /site-footer -->`, and the header
the block between `<!-- site-header` and `<!-- /site-header -->`. Both must be identical on every
page: `index.html`, `terminos/`, `privacidad/`, `eliminacion-de-datos/`,
`acuerdo-de-tratamiento-de-datos/` and `404.html`.

"Cuentas Claras" is a separate product and must not appear on this site.

Run `./check.sh` before publishing. It fails if a visible `TODO_` remains (hidden
`<!-- TODO_ABOGADO -->` comments are allowed and listed), if the old phone number reappears,
if the street address appears outside `/privacidad/`, if "Cuentas Claras" appears, or if the
header or footer differ between pages.
