# PROYECTA — Estaciones 2 y 3 (prototipo web estático)

**Estado: listo para prueba técnica local; NO aprobado aún para despliegue con estudiantes.**

Esta carpeta contiene una web sin servidor para explorar dos instrumentos presentes en materiales aportados al proyecto:

- **IAMI-R (Pérez y Medrano, 2007)**: 48 afirmaciones, puntuaciones 1–10, media de seis ítems por dimensión en ocho grupos.
- **DTDC-27, escala INICIAL (Lozano, 2007)**: 27 afirmaciones, puntuaciones 1–7, media descriptiva por las ocho dimensiones de la escala *inicial*. **No equivale al modelo reducido y reorganizado de seis factores validado después**. No diagnosticar ni utilizar baremos inexistentes.

El estudiante responde en una pantalla adaptable, observa medias por dimensión y usa **Imprimir / Guardar como PDF**. El nombre y el código para el informe son opcionales.

## Probar en un computador

Extrae el ZIP y abre `index.html` con el navegador (Chrome, Edge, Firefox). Funciona **sin instalar Node.js** y sin internet. No necesita base de datos, cuentas, clave API ni pago.

En el PDF el encabezado será «PROYECTA» y se incluirán los promedios por dimensión, fecha y fuente. Para guardarlo, pulsa *Imprimir / Guardar como PDF* y en el diálogo de impresión selecciona «Guardar como PDF».

## Publicación GRATUITA en GitHub Pages (solo una vez obtenidos permisos)

1. En GitHub crea un repositorio **público** (por ejemplo, `proyecta-pruebas`). **Antes de hacer pública la web, comprueba los permisos de reproducción de los cuestionarios y las condiciones de aplicación institucional.** GitHub Free exige repositorio público para Pages.
2. Sube a la **raíz** del repositorio estos archivos: `index.html`, `estilo.css`, `aplicacion.js`, `instrumentos.js`, `banner.jpg`.
3. Ve a **Settings → Pages → Build and deployment → Deploy from a branch**. Selecciona `main` y `/ (root)` y pulsa **Save**.
4. Cuando GitHub publique el sitio, el enlace tendrá el formato `https://TUUSUARIO.github.io/proyecta-pruebas/`. Sustituye TUUSUARIO; no es un enlace activo hasta que lo despliegues.
5. Prueba ambos formularios en un móvil, revisa resultados y descarga un PDF de prueba.

Fuentes: https://docs.github.com/es/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

**No subas a GitHub PDFs de consentimiento, hojas con datos, respuestas de estudiantes ni archivos SQLite.** La web no utiliza `localStorage`, cookies de aplicación, servicios de seguimiento ni peticiones para remitir respuestas. El alojamiento público sí puede registrar visitas conforme a las políticas del proveedor.

## Antes de ofrecerlo a menores de edad

- Confirmar la **autorización de reproducción pública** de los ítems originales, pues los PDF de revistas disponibles en línea no conceden necesariamente licencia para redistribución en GitHub público.
- Revisión de pertinencia en estudiantes colombianos, uso del material psicotécnico con orientación y participación de un profesional habilitado, y protocolos institucionales de consentimiento/privacidad cuando correspondan.
- Cotejar transcripciones exactas; IAMI-R en el anexo se presenta con vocabulario argentino. Evitar adaptar ítems arbitrariamente.
- Decidir **qué DTDC se reportará para la investigación**: este prototipo tiene las ocho dimensiones de la *escala inicial*, mientras que el artículo valida después otra estructura; no tratar ambos resultados como equivalentes.
- Los resultados entregados voluntariamente como PDF podrán ser revisados bajo protocolos separados. **La web no identifica ni guarda quién está autorizado para la investigación**: jamás usar esta página como sustituto del registro seguro de consentimientos.

## Archivos

`index.html`: diseño; `instrumentos.js`: preguntas provenientes de los PDFs aportados; `aplicacion.js`: lógica y promedios; `estilo.css`: pantalla e impresión; `banner.jpg`: identidad gráfica proporcionada para PROYECTA.

**Advertencia metodológica:** se obtienen resultados **descriptivos del prototipo**, no informes psicométricos validados para población colombiana. No mezclar, comparar ni sumar DTDC e IAMI-R en una calificación única. No usar estas puntuaciones para asignar «clanes» ni restringir opciones educativas.


## Versión 2: interpretación reflexiva

Añade para cada prueba un resumen personalizado, ámbitos destacados relativamente según respuestas, sugerencias educativas y preguntas de reflexión. Los resultados son descriptivos; no se crean puntos de corte o diagnósticos. La DTDC mantiene las ocho agrupaciones de su anexo inicial de 27 ítems, que no equivalen a los seis factores posteriores, y **no debe utilizarse para análisis psicométrico de la maestría sin acordar instrumento y protocolo con profesional competente**.

Actualización del repositorio: subir `index.html`, `aplicacion.js`, `estilo.css` y `README.md` sustituyendo los anteriores. `instrumentos.js` y `banner.jpg` permanecen sin cambios. Si se está publicando por primera vez, cargar todo el contenido de esta carpeta.

**IMPORTANTE:** verificar licencia de reproducción y condiciones de aplicación antes de uso público con estudiantes. Este sitio no recoge consentimiento ni envía datos. No se almacena información del estudiante en servidor o navegador tras salir o actualizar.
