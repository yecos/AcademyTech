import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ─── Curso: Desarrollo Web Completo ──────────────────────────
const courseData = {
  slug: "desarrollo-web-completo",
  title: "Desarrollo Web Completo: HTML, CSS y JavaScript",
  description:
    "Aprende a crear sitios web profesionales desde cero. Domina HTML5 semántico, CSS3 moderno con Flexbox y Grid, y JavaScript ES6+ para construir aplicaciones web interactivas y responsivas. Este curso te lleva desde los fundamentos hasta proyectos reales con las tecnologías más demandadas de la industria.",
  image: "/images/modules/modulo-1.png",
  icon: "💻",
  order: 1,
  published: true,
  level: "principiante" as const,
  duration: "50 horas",
  status: "published" as const,
};

const modules = [
  {
    number: 1,
    title: "Fundamentos de HTML5",
    description:
      "Aprende la estructura base de toda página web con HTML5 semántico, etiquetas esenciales y buenas prácticas de accesibilidad.",
    topics: [
      {
        number: 1,
        name: "Introducción al desarrollo web",
        difficulty: "basico",
        estimatedTime: "25 min",
        content: `El desarrollo web es la disciplina que engloba todas las tecnologías y procesos necesarios para crear sitios y aplicaciones que funcionan en los navegadores. Cuando accedes a cualquier página web —desde un blog personal hasta una plataforma como Netflix o Amazon—, estás interactuando con el resultado del trabajo de desarrolladores web que combinan HTML, CSS y JavaScript para crear experiencias digitales.

El modelo cliente-servidor es la base de cómo funciona la web. El servidor es una computadora que almacena los archivos del sitio web y los envía cuando un navegador los solicita. El cliente es el navegador (Chrome, Firefox, Safari) que recibe esos archivos y los interpreta para mostrar la página al usuario. Cuando escribes una URL en el navegador, este envía una petición HTTP al servidor, que responde con el código HTML, CSS y JavaScript que conforma la página.

Las tres tecnologías fundamentales del desarrollo web frontend son HTML, CSS y JavaScript. HTML (HyperText Markup Language) define la estructura y el contenido de la página: textos, imágenes, enlaces, formularios. CSS (Cascading Style Sheets) controla la presentación visual: colores, tipografía, disposición de los elementos, animaciones. JavaScript añade interactividad: validar formularios, modificar contenido dinámicamente, comunicarse con servidores, crear animaciones complejas.

El ecosistema del desarrollo web ha evolucionado enormemente. Hoy existen frameworks como React, Vue y Angular para construir interfaces complejas; herramientas de construcción como Vite y Webpack para optimizar el código; y plataformas como Vercel y Netlify para desplegar proyectos con facilidad. Sin embargo, todos estos frameworks y herramientas se construyen sobre los tres pilares fundamentales: HTML, CSS y JavaScript. Dominar estas bases es imprescindible antes de aventurarse en cualquier tecnología más avanzada.`,
      },
      {
        number: 2,
        name: "Estructura básica de un documento HTML",
        difficulty: "basico",
        estimatedTime: "30 min",
        content: `Todo documento HTML sigue una estructura base que el navegador necesita para interpretar correctamente el contenido. Esta estructura define el tipo de documento, el idioma, los metadatos y el cuerpo visible de la página. Comprender cada parte de esta estructura es el primer paso para escribir HTML válido y bien formado.

La declaración <!DOCTYPE html> es la primera línea de todo documento HTML5 y le indica al navegador que debe interpretar la página según el estándar HTML5. Sin esta declaración, el navegador puede entrar en "modo quirks", una modalidad de compatibilidad con navegadores antiguos que puede causar comportamientos impredecibles en el renderizado. Siempre incluye esta línea al inicio de tus documentos HTML.

El elemento <html> es el contenedor raíz de todo el documento. El atributo lang="es" indica el idioma del contenido, lo cual es importante para la accesibilidad (los lectores de pantalla usan esta información para elegir la pronunciación correcta) y para los motores de búsqueda (que indexan el contenido en el idioma adecuado). Dentro del elemento <html> hay dos hijos principales: <head> y <body>.

El <head> contiene metadatos que no se muestran directamente en la página pero son esenciales para su correcto funcionamiento. El <meta charset="UTF-8"> especifica la codificación de caracteres, permitiendo mostrar correctamente acentos, eñes y caracteres especiales. El <meta name="viewport" content="width=device-width, initial-scale=1.0"> es crucial para el diseño responsivo: asegura que la página se escale correctamente en dispositivos móviles. El <title> define el título que aparece en la pestaña del navegador y en los resultados de búsqueda.

El <body> contiene todo el contenido visible de la página: encabezados, párrafos, imágenes, enlaces, formularios y cualquier elemento que el usuario pueda ver e interactuar. Es aquí donde se construye la interfaz de la aplicación web. Cada elemento dentro del body se representa mediante etiquetas HTML que definen su tipo y significado semántico.`,
      },
      {
        number: 3,
        name: "Etiquetas semánticas de HTML5",
        difficulty: "basico",
        estimatedTime: "35 min",
        content: `Las etiquetas semánticas de HTML5 fueron introducidas para dar significado al contenido de las páginas web, reemplazando el uso excesivo de <div> sin significado. La semántica HTML beneficia la accesibilidad, el SEO (posicionamiento en buscadores) y la mantenibilidad del código, ya que cada sección de la página queda claramente identificada por su propósito.

El elemento <header> representa la cabecera de una página o sección. Típicamente contiene el logo, la navegación principal y elementos introductorios. Un documento puede tener múltiples <header>: uno para la página completa y otros para secciones individuales como artículos. El <nav> agrupa los enlaces de navegación principales del sitio, como el menú de secciones. Los lectores de pantalla identifican automáticamente los elementos <nav> y permiten saltar directamente a la navegación, mejorando la experiencia de usuarios con discapacidades visuales.

El <main> es el contenedor del contenido principal de la página y debe aparecer una sola vez por documento. Este elemento ayuda a los motores de búsqueda a identificar el contenido relevante y permite a los usuarios de lectores de pantalla saltar directamente al contenido principal, omitiendo la navegación y otros elementos repetitivos. El <footer> define el pie de página y suele contener información de copyright, enlaces a políticas de privacidad y datos de contacto.

Los elementos <article> y <section> organizan el contenido del <main>. Un <article> representa un contenido independiente y autocontenido que podría distribuirse por separado: una entrada de blog, un comentario, un producto en una tienda. Una <section> agrupa contenido temáticamente relacionado, generalmente con su propio encabezado. La regla práctica: si el contenido tendría sentido por sí solo en un feed RSS, usa <article>; si es una agrupación temática dentro de una página, usa <section>.

El <aside> contiene contenido complementario al contenido principal: barras laterales, publicidad, enlaces relacionados. El <figure> y <figcaption> asocian una imagen con su pie de foto, proporcionando contexto semántico. El <time> marca fechas y horas de forma que las máquinas pueden interpretarlas, útil para eventos y publicaciones. El uso correcto de estas etiquetas transforma una página de una colección de divs sin significado a un documento estructurado que tanto humanos como máquinas pueden comprender.`,
      },
      {
        number: 4,
        name: "Formularios y validación HTML5",
        difficulty: "intermedio",
        estimatedTime: "40 min",
        content: `Los formularios son el mecanismo principal mediante el cual los usuarios interactúan con las aplicaciones web: desde iniciar sesión y registrarse hasta realizar compras y enviar comentarios. HTML5 introdujo nuevos tipos de input y atributos de validación que simplifican enormemente la creación de formularios robustos y accesibles, reduciendo la necesidad de validación JavaScript personalizada.

El elemento <form> es el contenedor de todos los campos del formulario. Sus atributos principales son action (la URL a la que se envían los datos) y method (el método HTTP: GET o POST). Los campos del formulario se crean con <input>, <textarea>, <select> y <button>. Cada campo debe tener un atributo name que identifica los datos cuando se envían al servidor, y un <label> asociado que describe su propósito para la accesibilidad.

HTML5 define más de 20 tipos de input especializados: text, email, password, number, tel, url, date, time, datetime-local, month, week, color, range, file, search, checkbox, radio, hidden, submit, reset y button. Cada tipo activa controles nativos del navegador optimizados para el tipo de dato: el input type="email" muestra un teclado con @ en móviles, el type="date" despliega un calendario nativo, y el type="number" muestra controles de incremento.

Los atributos de validación nativos reducen la necesidad de JavaScript. required marca un campo como obligatorio, el navegador impide enviar el formulario si está vacío. minlength y maxlength definen la longitud mínima y máxima del texto. min y max establecen rangos numéricos. pattern acepta una expresión regular que el valor debe cumplir. type="email" valida automáticamente que el texto tenga formato de correo electrónico. Estas validaciones nativas son accesibles por defecto y funcionan incluso si JavaScript está deshabilitado.

Para mensajes de validación personalizados, JavaScript ofrece la API de Validación de Restricciones. El evento invalid se dispara cuando un campo no pasa la validación, y el método setCustomValidity() permite definir mensajes de error personalizados. El método checkValidity() permite validar el formulario programáticamente. Combinando validación nativa con JavaScript personalizado, se puede lograr una experiencia de usuario óptima: validación inmediata al salir del campo, mensajes contextualizados y resumen de errores antes del envío.`,
      },
      {
        number: 5,
        name: "Multimedia: imágenes, audio y video",
        difficulty: "basico",
        estimatedTime: "25 min",
        content: `El soporte nativo de multimedia en HTML5 eliminó la dependencia de plugins como Flash, permitiendo incrustar imágenes, audio y video directamente en las páginas con controles estándar del navegador. Esta capacidad es fundamental para crear experiencias web ricas y atractivas sin depender de tecnologías externas.

Las imágenes son el elemento multimedia más común en la web. El elemento <img> inserta una imagen con los atributos src (ruta de la imagen), alt (texto alternativo descriptivo para accesibilidad y SEO), width y height (dimensiones sugeridas que evitan el salto de layout al cargar). HTML5 introdujo el elemento <picture> con <source> para servir imágenes responsivas: diferentes resoluciones y formatos según el dispositivo y las capacidades del navegador. Los formatos modernos como WebP y AVIF ofrecen mejor compresión que JPEG y PNG, y el elemento <picture> permite ofrecerlos con fallback a formatos clásicos.

El elemento <video> reproduce video nativamente sin plugins. Sus atributos principales son src (ruta del video), controls (muestra los controles de reproducción), autoplay (reproduce automáticamente, requiere muted en la mayoría de navegadores), loop (repetición), muted (silenciado) y poster (imagen de vista previa antes de reproducir). Al igual que con <picture>, se pueden ofrecer múltiples formatos con <source> dentro de <video> para asegurar compatibilidad con todos los navegadores (MP4/H.264 para máxima compatibilidad, WebM para mejor compresión).

El elemento <audio> funciona de manera similar a <video> pero sin componente visual. Los formatos soportados son MP3 (universal), OGG (buen soporte excepto Safari) y WAV (sin compresión, para audio corto). Para contenido multimedia interactivo como dibujo y animaciones, el elemento <canvas> proporciona una superficie de dibujo programable con JavaScript, y SVG permite crear gráficos vectoriales escalables directamente en el HTML.`,
      },
    ],
  },
  {
    number: 2,
    title: "CSS3: Estilización y Layout Moderno",
    description:
      "Domina CSS3 con Flexbox, Grid, variables personalizadas y técnicas avanzadas de diseño responsivo.",
    topics: [
      {
        number: 1,
        name: "Selectores, cascada y especificidad",
        difficulty: "basico",
        estimatedTime: "35 min",
        content: `Los selectores CSS son los patrones que determinan a qué elementos se aplican las reglas de estilo. Comprender los selectores, su especificidad y cómo la cascada resuelve conflictos es fundamental para escribir CSS predecible y mantenible. Sin este conocimiento, es fácil caer en la trampa de usar !important o selectores excesivamente largos para forzar estilos, lo cual genera código frágil y difícil de mantener.

Los selectores básicos incluyen el selector de tipo (p selecciona todos los párrafos), el selector de clase (.destacado selecciona elementos con class="destacado"), el selector de ID (#titulo selecciona el elemento con id="titulo") y el selector universal (* selecciona todos los elementos). Los selectores de atributo seleccionan elementos según sus atributos: [type="email"] selecciona todos los inputs de tipo email, [href^="https"] selecciona enlaces que comienzan con https.

Los combinadores permiten seleccionar elementos basándose en su relación con otros. El combinador descendiente (article p) selecciona párrafos dentro de artículos. El combinador hijo directo (article > p) selecciona solo párrafos que son hijos inmediatos. El combinador de hermano adyacente (h2 + p) selecciona el párrafo que sigue inmediatamente a un h2. El combinador de hermanos generales (h2 ~ p) selecciona todos los párrafos que son hermanos de un h2.

La especificidad es el algoritmo que determina qué regla prevalece cuando múltiples reglas compiten por el mismo elemento. Se calcula como un número de cuatro componentes: estilos inline (1000), IDs (100), clases/atributos/pseudo-clases (10), elementos/pseudo-elementos (1). Un selector como #nav .item a tiene especificidad 1-1-1 (un ID, una clase, un elemento = 111), mientras que .nav .list .item a tiene 0-3-1 (31). El selector con mayor especificidad gana. Si hay empate, gana la última regla declarada (cascada). Comprender este sistema permite escribir selectores eficientes y evitar guerras de especificidad.`,
      },
      {
        number: 2,
        name: "Flexbox: layout unidimensional",
        difficulty: "intermedio",
        estimatedTime: "45 min",
        content: `Flexbox (Flexible Box Layout) es el sistema de layout unidimensional de CSS, diseñado para alinear y distribuir elementos a lo largo de un eje (horizontal o vertical). Flexbox resuelve problemas que antes requerían hacks como float, tablas o posicionamiento absoluto: centrar elementos verticalmente, crear barras de navegación, distribuir espacio equitativamente y reordenar elementos sin cambiar el HTML.

El contenedor flex se declara con display: flex. Los hijos directos se convierten en elementos flex y se comportan según las reglas de Flexbox. El eje principal se define con flex-direction: row (horizontal, por defecto), row-reverse, column o column-reverse. justify-content alinea los elementos a lo largo del eje principal: flex-start, flex-end, center, space-between, space-around, space-evenly. align-items alinea los elementos a lo largo del eje transversal: stretch (por defecto, estira para llenar), flex-start, flex-end, center, baseline.

Las propiedades de los elementos flex controlan su comportamiento individual. flex-grow define cómo crece el elemento cuando hay espacio disponible (0 = no crece, 1 = crece proporcionalmente). flex-shrink define cómo se encoge cuando no hay espacio suficiente (1 = se encoge, 0 = no se encoge). flex-basis define el tamaño inicial antes de distribuir espacio (auto = tamaño del contenido, 0 = todo se distribuye con grow/shrink). La propiedad abreviada flex combina estos tres valores: flex: 1 es equivalente a flex: 1 1 0%.

El centrado perfecto con Flexbox se logra con solo tres líneas: display: flex, justify-content: center, align-items: center. Antes de Flexbox, centrar verticalmente era uno de los problemas más frustrantes del CSS, requiriendo tablas, posicionamiento absoluto con transform o line-height. Con Flexbox, el centrado es trivial y funciona en cualquier contexto. El wrap de elementos flex con flex-wrap: wrap permite crear layouts que se adaptan automáticamente cuando los elementos no caben en una línea, fluyendo a la siguiente.`,
      },
      {
        number: 3,
        name: "CSS Grid: layout bidimensional",
        difficulty: "intermedio",
        estimatedTime: "45 min",
        content: `CSS Grid es el sistema de layout bidimensional de CSS, diseñado para crear diseños complejos con filas y columnas simultáneamente. Mientras Flexbox excela en layouts unidimensionales (una fila o una columna), Grid permite controlar ambas dimensiones a la vez, creando estructuras de página completas con una sintaxis declarativa y poderosa.

El contenedor grid se declara con display: grid. Las columnas y filas se definen con grid-template-columns y grid-template-rows. La función repeat() simplifica la definición: grid-template-columns: repeat(3, 1fr) crea tres columnas de igual tamaño. La unidad fr (fracción) distribuye el espacio disponible proporcionalmente: 1fr 2fr asigna un tercio a la primera columna y dos tercios a la segunda. La función minmax() define rangos: minmax(200px, 1fr) crea una columna de al menos 200px que puede crecer.

Grid ofrece métodos abreviados para colocar elementos. grid-column y grid-row definen la posición del elemento especificando la línea de inicio y fin: grid-column: 1 / 3 ocupa desde la línea 1 hasta la 3 (dos columnas). El span indica cuántas celdas ocupa: grid-column: span 2. Las áreas con nombre permiten crear layouts semánticos: se define grid-template-areas y cada elemento se asigna a un área con grid-area. Esto hace el código extremadamente legible y fácil de modificar.

La combinación de Grid y Flexbox es la estrategia más efectiva para layouts modernos. Grid se usa para la macro-estructura de la página (header, sidebar, main, footer), mientras Flexbox maneja los componentes internos (navegación, tarjetas, formularios). Auto-fill y auto-fit con minmax crean layouts completamente responsivos sin media queries: grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) crea tantas columnas de al menos 280px como quepan, adaptándose automáticamente al tamaño de la ventana.`,
      },
      {
        number: 4,
        name: "Diseño responsivo y Mobile First",
        difficulty: "intermedio",
        estimatedTime: "40 min",
        content: `El diseño responsivo (Responsive Web Design) es la práctica de crear páginas web que se adapten y funcionen correctamente en todos los tamaños de pantalla, desde teléfonos móviles hasta monitores de escritorio. La filosofía Mobile First consiste en diseñar primero para pantallas pequeñas y luego agregar progresivamente estilos para pantallas más grandes, garantizando que la experiencia móvil sea la base del diseño.

Las media queries son el mecanismo CSS que aplica estilos condicionales según las características del dispositivo. La sintaxis es @media (condición) { /* estilos */ }. Los breakpoints más comunes son: mobile (< 640px), tablet (640px - 1024px), desktop (> 1024px), y large desktop (> 1280px). En Mobile First, se usan min-width: los estilos base son para móvil, y @media (min-width: 640px) agrega estilos para tablet y superiores.

La meta etiqueta viewport es indispensable para el diseño responsivo: <meta name="viewport" content="width=device-width, initial-scale=1.0">. Sin ella, los navegadores móviles escalan la página como si fuera de escritorio, haciendo zoom out y mostrando texto ilegible. El viewport define cómo el navegador debe calcular las dimensiones de la página en relación con el dispositivo.

Las unidades relativas son fundamentales para el diseño responsivo. rem es relativa al tamaño de fuente del elemento raíz (16px por defecto en la mayoría de navegadores), lo que permite escalar todo el diseño cambiando un solo valor. em es relativa al tamaño de fuente del elemento padre. vw y vh son relativas al viewport: 1vw = 1% del ancho de la ventana, 1vh = 1% de la altura. Las funciones CSS clamp() y min()/max() permiten crear tipografía y espaciados fluidos que se adaptan continuamente al tamaño de la pantalla sin saltos abruptos entre breakpoints.`,
      },
      {
        number: 5,
        name: "Variables CSS y arquitectura de estilos",
        difficulty: "avanzado",
        estimatedTime: "35 min",
        content: `Las variables CSS (Custom Properties) permiten definir valores reutilizables que se pueden actualizar dinámicamente, incluso con JavaScript. Se declaran con --nombre-valor y se usan con var(--nombre-valor). A diferencia de las variables de preprocesadores como Sass, las variables CSS son nativas del navegador, se pueden modificar en tiempo real y respetan la cascada, permitiendo crear temas, variantes y estados de forma elegante.

La declaración de variables se realiza típicamente en :root para que estén disponibles globalmente: :root { --primary: #3b82f6; --font-size-base: 1rem; --spacing: 1rem; }. Luego se usan en cualquier propiedad: .button { background: var(--primary); font-size: var(--font-size-base); padding: var(--spacing); }. Las variables pueden tener valores por defecto: var(--primary, #000) usa #000 si --primary no está definida. Esta característica permite crear componentes robustos que funcionan incluso en contextos donde las variables no están declaradas.

El theming con variables CSS es uno de sus usos más poderosos. Definiendo un conjunto de variables para el tema claro y otro para el oscuro, el cambio de tema se reduce a cambiar las variables en lugar de sobrescribir cada estilo individual. El modo oscuro se implementa con @media (prefers-color-scheme: dark) o con un atributo data-theme en el body: [data-theme="dark"] { --primary: #60a5fa; --bg: #1a1a2e; }. El modo claro/oscuro de esta misma plataforma utiliza exactamente este patrón.

La arquitectura de estilos a gran escala requiere metodologías de organización. BEM (Block Element Modifier) es una convención de nombrado: .card {} es el bloque, .card__title {} es un elemento, .card--featured {} es un modificador. CSS Modules (usado por defecto en Next.js) genera nombres de clase únicos automáticamente, eliminando colisiones. Utility-first CSS (como Tailwind CSS) construye interfaces combinando clases atómicas: bg-blue-500 text-white p-4 rounded. Cada enfoque tiene ventajas y la elección depende del equipo y el proyecto.`,
      },
    ],
  },
  {
    number: 3,
    title: "JavaScript ES6+ Esencial",
    description:
      "Domina JavaScript moderno con ES6+: variables, funciones, arrays, objetos, asincronía y manipulación del DOM.",
    topics: [
      {
        number: 1,
        name: "Variables, tipos y operadores modernos",
        difficulty: "basico",
        estimatedTime: "35 min",
        content: `JavaScript ES6 (también conocido como ES2015) introdujo let y const como alternativas a var para declarar variables, resolviendo problemas históricos de ámbito y reasignación. let declara variables con ámbito de bloque (solo existen dentro del { } donde se declaran), mientras que const declara variables que no pueden ser reasignadas después de su inicialización. La recomendación es usar const por defecto y let solo cuando necesites reasignar el valor.

Las diferencias entre var, let y const son significativas. var tiene ámbito de función (function scope) y es elevada (hoisted) al inicio de la función, lo que permite usar la variable antes de su declaración sin error (pero con valor undefined). let y const tienen ámbito de bloque y no permiten acceso antes de la declaración (la "zona muerta temporal" lanza un ReferenceError). Esta diferencia elimina un tipo común de bugs donde las variables se usaban antes de ser declaradas sin que el programador se diera cuenta.

Los tipos de datos en JavaScript son siete: string, number, bigint, boolean, undefined, null y symbol (los primitivos), más object para colecciones y estructuras complejas. JavaScript es débilmente tipado: las variables no tienen un tipo fijo y la conversión entre tipos puede ser implícita (coerción). El operador typeof devuelve el tipo de un valor, y === (igualdad estricta) compara valor y tipo sin coerción, siendo la opción recomendada sobre ==.

Los operadores modernos de ES6+ incluyen el operador de propagación (spread): [...arr] copia un array, {...obj} copia un objeto. La desestructuración extrae valores de arrays y objetos: const { name, age } = user; o const [first, second] = array. El operador de encadenamiento opcional (?.) accede a propiedades profundas sin errores si un nivel intermedio es null/undefined: user?.address?.city. El operador de fusión nula (??) devuelve el valor de la derecha si el de la izquierda es null o undefined: const name = user.name ?? "Anónimo". Estos operadores hacen el código más conciso y seguro.`,
      },
      {
        number: 2,
        name: "Funciones: arrow functions, closures y callbacks",
        difficulty: "intermedio",
        estimatedTime: "45 min",
        content: `Las arrow functions (funciones flecha) son una sintaxis concisa para escribir funciones en JavaScript ES6. Se declaran con => en lugar de la palabra clave function: const suma = (a, b) => a + b;. Para funciones de una sola expresión, el retorno es implícito. Para funciones más complejas, se usan llaves y return explícito: const saludar = (nombre) => { return \`Hola, \${nombre}\`; }. Si la función tiene un solo parámetro, los paréntesis son opcionales: const doble = n => n * 2.

La diferencia más importante entre arrow functions y funciones tradicionales es el valor de this. En funciones tradicionales, this depende de cómo se llama la función. En arrow functions, this se hereda del contexto léxico donde se define la función, no del contexto donde se ejecuta. Esto elimina la necesidad de bind(this) o el patrón const self = this; que era común en código pre-ES6. Por esta razón, las arrow functions son ideales para callbacks y métodos que necesitan acceder al this del contexto exterior.

Los closures (cierres) son uno de los conceptos más poderosos de JavaScript. Un closure ocurre cuando una función interna recuerda las variables de su función externa incluso después de que la función externa haya terminado de ejecutarse. Esto permite crear funciones con estado privado: function contador() { let count = 0; return () => ++count; }. Cada llamada a contador() crea una nueva instancia con su propio count independiente. Los closures son la base de patrones como la memorización, la currificación y los módulos.

Los callbacks son funciones que se pasan como argumentos a otras funciones y se ejecutan en un momento posterior. Son el mecanismo fundamental para la asincronía en JavaScript: setTimeout(() => console.log("3 segundos después"), 3000), los event listeners: button.addEventListener("click", handleClick), y las operaciones de array: array.map(x => x * 2). Sin embargo, el anidamiento excesivo de callbacks (callback hell) hace el código difícil de leer y mantener, lo que motivó la introducción de Promesas y async/await.`,
      },
      {
        number: 3,
        name: "Arrays y objetos: métodos esenciales",
        difficulty: "intermedio",
        estimatedTime: "40 min",
        content: `Los arrays en JavaScript ofrecen un rico conjunto de métodos para transformar, filtrar y consultar datos. Los métodos funcionales map, filter y reduce son las herramientas más poderosas para la manipulación de datos y forman la base de la programación funcional en JavaScript. Dominar estos métodos es esencial para trabajar eficientemente con datos en cualquier aplicación web.

map() crea un nuevo array aplicando una función a cada elemento del array original. No modifica el array original (es inmutable): const preciosConIVA = precios.map(p => p * 1.19). filter() crea un nuevo array con los elementos que cumplen una condición: const mayoresDeEdad = personas.filter(p => p.edad >= 18). reduce() acumula todos los elementos en un solo valor: const total = carrito.reduce((sum, item) => sum + item.precio, 0). Estos tres métodos se pueden encadenar para transformaciones complejas: usuarios.filter(u => u.activo).map(u => u.nombre).sort().

Otros métodos esenciales de arrays incluyen find() (devuelve el primer elemento que cumple la condición), findIndex() (devuelve su índice), some() (verifica si al menos un elemento cumple la condición), every() (verifica si todos la cumplen), includes() (verifica si contiene un valor), flat() (aplana arrays anidados) y flatMap() (mapea y aplana en un solo paso). Los métodos sort(), splice() y reverse() modifican el array original (son mutables), mientras que toSorted(), toSpliced() y toReversed() (ES2023) devuelven copias sin modificar el original.

Para objetos, Object.keys(obj) devuelve un array de las claves, Object.values(obj) devuelve los valores, y Object.entries(obj) devuelve pares [clave, valor]. Object.assign() fusiona objetos, y el spread operator {...obj1, ...obj2} es la forma moderna de hacer lo mismo. Object.freeze() hace un objeto inmutable, y Object.seal() impide agregar o eliminar propiedades pero permite modificar las existentes. La desestructuración con renombrado ({ name: nombre } = user) y valores por defecto ({ role = "user" } = user) son patrones comunes en código moderno.`,
      },
      {
        number: 4,
        name: "Asincronía: Promesas y async/await",
        difficulty: "avanzado",
        estimatedTime: "45 min",
        content: `La asincronía es fundamental en JavaScript porque las operaciones web (peticiones HTTP, lectura de archivos, temporizadores) son inherentemente asíncronas. Una operación asíncrona comienza su ejecución y permite que el programa continúe sin esperar a que termine, notificando al programa cuando el resultado está disponible. Este modelo de un solo hilo con bucle de eventos es lo que permite a JavaScript manejar múltiples operaciones concurrentes sin bloquear la interfaz.

Las Promesas son objetos que representan el resultado eventual de una operación asíncrona. Una Promesa puede estar en tres estados: pendiente (pending), resuelta (fulfilled) o rechazada (rejected). Se crean con new Promise((resolve, reject) => { ... }) y se consumen con .then() para manejar el éxito y .catch() para manejar errores. El método .finally() ejecuta código independientemente del resultado. Las Promesas se pueden encadenar: cada .then() recibe el resultado del anterior y puede devolver un valor o una nueva Promesa.

Promise.all() ejecuta múltiples promesas en paralelo y espera a que todas se resuelvan, devolviendo un array con todos los resultados. Si alguna falla, Promise.all() se rechaza inmediatamente. Promise.allSettled() espera a que todas terminen (resueltas o rechazadas) y devuelve el estado de cada una. Promise.race() devuelve el resultado de la primera promesa en resolverse. Promise.any() devuelve el resultado de la primera promesa en resolverse exitosamente, ignorando los rechazos hasta que una tenga éxito.

async/await es la sintaxis moderna para trabajar con Promesas que hace el código asíncrono leer como código síncrono. Una función async siempre devuelve una Promesa. El operador await pausa la ejecución hasta que la Promesa se resuelve: const data = await fetch(url). El manejo de errores se realiza con try/catch. Esta sintaxis es preferida sobre .then()/.catch() encadenados porque es más legible y facilita el debug. Múltiples awaits secuenciales se pueden paralelizar con Promise.all(): const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]).`,
      },
      {
        number: 5,
        name: "Manipulación del DOM y Eventos",
        difficulty: "intermedio",
        estimatedTime: "40 min",
        content: `El DOM (Document Object Model) es la representación en memoria del documento HTML que el navegador crea al cargar una página. JavaScript puede leer y modificar el DOM, permitiendo crear páginas dinámicas e interactivas. Cada elemento HTML se representa como un nodo en el árbol del DOM, y la API del DOM proporciona métodos para buscar, crear, modificar y eliminar estos nodos.

La selección de elementos es el primer paso para manipular el DOM. document.querySelector('.clase') devuelve el primer elemento que coincide con el selector CSS. document.querySelectorAll('.clase') devuelve todos los elementos coincidentes en un NodeList. document.getElementById('id') selecciona por ID (más rápido pero menos flexible). Los métodos más modernos (querySelector/querySelectorAll) aceptan cualquier selector CSS, lo que los hace versátiles y consistentes con la sintaxis que ya conoces de CSS.

La modificación del DOM permite cambiar el contenido, los atributos y los estilos de los elementos. element.textContent = "Nuevo texto" cambia el texto visible. element.innerHTML = "<strong>HTML</strong>" inserta HTML (precaución: puede introducir vulnerabilidades XSS si el contenido no es confiable). element.setAttribute('class', 'active') modifica atributos. element.style.color = 'red' cambia estilos inline. element.classList.add(), .remove(), .toggle() y .contains() gestionan clases CSS de forma segura y eficiente.

Los eventos son la forma en que JavaScript responde a las interacciones del usuario: clics, tecleo, desplazamiento, redimensionamiento, envío de formularios y más. element.addEventListener('click', handler) registra una función que se ejecuta cuando ocurre el evento. El objeto event pasado al handler contiene información sobre el evento: event.target (el elemento que disparó el evento), event.preventDefault() (evita el comportamiento por defecto), event.stopPropagation() (detiene la propagación del evento). La delegación de eventos aprovecha la propagación para manejar eventos de múltiples elementos con un solo listener en un contenedor padre, mejorando el rendimiento en listas dinámicas.`,
      },
    ],
  },
  {
    number: 4,
    title: "APIs Web y Fetch",
    description:
      "Aprende a consumir APIs REST, manejar datos JSON y construir aplicaciones que se comunican con servidores.",
    topics: [
      {
        number: 1,
        name: "Protocolo HTTP y métodos de petición",
        difficulty: "intermedio",
        estimatedTime: "35 min",
        content: `El protocolo HTTP (HyperText Transfer Protocol) es la base de la comunicación en la web. Cuando el navegador solicita una página o una aplicación envía datos a un servidor, utilizan HTTP para estructurar la comunicación. Comprender HTTP es esencial para desarrollar aplicaciones web que se comuniquen correctamente con APIs y servidores.

Una petición HTTP consta de un método (verbo), una URL, cabeceras (headers) y opcionalmente un cuerpo (body). Los métodos principales son: GET (solicitar datos), POST (enviar datos para crear), PUT (reemplazar datos existentes), PATCH (modificar parcialmente datos existentes) y DELETE (eliminar datos). Estos métodos definen la intención de la petición y son la base de la arquitectura REST (Representational State Transfer), que es el estándar de facto para diseñar APIs web.

Las cabeceras HTTP proporcionan metadatos sobre la petición o la respuesta. Content-Type indica el formato del cuerpo (application/json, multipart/form-data). Authorization incluye credenciales para autenticación. Accept especifica los formatos que el cliente acepta. Cache-Control gestiona la caché. CORS (Cross-Origin Resource Sharing) es un mecanismo de seguridad que controla qué dominios pueden acceder a los recursos. Los códigos de estado HTTP indican el resultado de la petición: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Internal Server Error).

La API Fetch es la interfaz moderna de JavaScript para realizar peticiones HTTP. Reemplaza a XMLHttpRequest con una sintaxis basada en Promesas más limpia y poderosa. fetch(url, options) devuelve una Promesa que se resuelve con un objeto Response. El cuerpo de la respuesta se lee como texto, JSON, blob o array buffer. Los interceptores, el manejo de errores y las configuraciones por defecto se implementan envolviendo fetch en funciones auxiliares o utilizando librerías como ky o axios.`,
      },
      {
        number: 2,
        name: "Consumo de APIs REST con Fetch",
        difficulty: "intermedio",
        estimatedTime: "40 min",
        content: `Consumir una API REST significa realizar peticiones HTTP a un servidor y procesar las respuestas en la aplicación frontend. El patrón básico con fetch es: obtener datos con GET, enviar datos con POST/PUT, y manejar errores apropiadamente. La función fetch() es nativa del navegador y no requiere librerías externas, lo que la hace ideal para proyectos simples y para entender los fundamentos de la comunicación HTTP.

Una petición GET básica se realiza así: const response = await fetch('https://api.example.com/users'); const data = await response.json(). Fetch devuelve un objeto Response que incluye el código de estado (response.status), las cabeceras (response.headers) y métodos para leer el cuerpo (response.json(), response.text(), response.blob()). Es importante verificar response.ok (true si el estado está entre 200-299) antes de procesar los datos, ya que fetch no lanza error para códigos como 404 o 500.

Para enviar datos, se usa POST con un objeto de configuración: await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }). El cuerpo de la petición debe serializarse como cadena JSON con JSON.stringify(). Para uploads de archivos, se usa FormData en lugar de JSON, lo que permite enviar archivos binarios junto con campos de texto sin necesidad de serializar manualmente.

El patrón completo para consumir una API con manejo de errores incluye: try/catch para errores de red, verificación de response.ok para errores HTTP, y manejo de errores de parsing. Una función auxiliar reutilizable podría ser: async function apiFetch(url, options = {}) { const response = await fetch(url, { headers: { 'Content-Type': 'application/json', ...options.headers }, ...options }); if (!response.ok) throw new Error(\`HTTP \${response.status}\`); return response.json(); }. Este patrón encapsula la lógica común y simplifica el código de la aplicación.`,
      },
      {
        number: 3,
        name: "LocalStorage, SessionStorage y Cookies",
        difficulty: "intermedio",
        estimatedTime: "30 min",
        content: `El almacenamiento del lado del cliente permite a las aplicaciones web guardar datos en el navegador del usuario, persistiendo información entre recargas de página y sesiones. El Web Storage API (localStorage y sessionStorage) y las cookies son los mecanismos principales, cada uno con sus características, capacidades y casos de uso específicos.

localStorage almacena datos sin fecha de expiración: persisten hasta que se eliminan explícitamente con localStorage.removeItem('key') o localStorage.clear(). Los datos se almacenan por origen (protocolo + dominio + puerto) y son compartidos entre todas las pestañas del mismo sitio. La capacidad típica es de 5-10 MB. Se usa con localStorage.setItem('key', JSON.stringify(data)) para objetos y localStorage.getItem('key') para recuperarlos (requiriendo JSON.parse() ya que solo almacena cadenas).

sessionStorage funciona igual que localStorage pero los datos se eliminan cuando se cierra la pestaña o el navegador. Cada pestaña tiene su propio sessionStorage independiente. Es útil para datos temporales como el estado de un formulario multi-paso o filtros de búsqueda activos que no deben persistir entre sesiones.

Las cookies son fragmentos de datos que el servidor envía al navegador y que este adjunta automáticamente en peticiones posteriores al mismo dominio. Tienen una capacidad limitada (4 KB por cookie), pueden configurarse con fecha de expiración (expires), dominio (domain), ruta (path), y flags de seguridad (HttpOnly, Secure, SameSite). A diferencia de localStorage, las cookies se envían al servidor en cada petición HTTP, lo que las hace útiles para autenticación (tokens de sesión) pero ineficientes para grandes volúmenes de datos. Los flags de seguridad son esenciales: HttpOnly impide el acceso desde JavaScript (protección contra XSS), Secure solo envía la cookie sobre HTTPS, y SameSite=Strict/Lax previene ataques CSRF.`,
      },
      {
        number: 4,
        name: "Web APIs avanzadas: Geolocation, IntersectionObserver y más",
        difficulty: "avanzado",
        estimatedTime: "40 min",
        content: `Las Web APIs del navegador ofrecen capacidades avanzadas que antes solo estaban disponibles en aplicaciones nativas. Estas APIs permiten acceder al hardware del dispositivo, crear experiencias inmersivas y optimizar el rendimiento de las aplicaciones web. Conocer estas APIs abre un mundo de posibilidades para crear aplicaciones web potentes y sofisticadas.

La Geolocation API permite obtener la ubicación del usuario: navigator.geolocation.getCurrentPosition(success, error, options). El objeto Position incluye latitud, longitud, altitud, precisión y timestamp. watchPosition() rastrea la ubicación continuamente, ideal para aplicaciones de navegación. El usuario debe conceder permiso explícitamente, y las opciones permiten configurar la precisión (enableHighAccuracy), el timeout y la caché. La privacidad es fundamental: siempre solicita geolocalización solo cuando es necesaria y explica por qué.

IntersectionObserver monitorea la visibilidad de elementos en el viewport sin necesidad de escuchar eventos de scroll, lo cual es mucho más eficiente. Se crea con new IntersectionObserver(callback, options), donde callback recibe las entradas que entran o salen del viewport. Los casos de uso más comunes son: lazy loading de imágenes (cargar solo cuando son visibles), infinite scroll (cargar más contenido cuando el usuario llega al final), animaciones al hacer scroll (reveal effects) y tracking de visibilidad para analítica. Las opciones configuran el threshold (umbral de visibilidad) y el rootMargin (márgenes del área de observación).

La Web Audio API permite procesar y sintetizar audio en tiempo real. El Canvas API y WebGL permiten gráficos 2D y 3D acelerados por GPU. La Notification API envía notificaciones del sistema operativo. La Web Speech API reconoce voz y sintetiza habla. La Service Worker API permite crear Progressive Web Apps (PWAs) que funcionan sin conexión. La Clipboard API copia y pega contenido programáticamente. Cada una de estas APIs abre posibilidades específicas que, combinadas, permiten crear aplicaciones web que rivalizan con las aplicaciones nativas en capacidades.`,
      },
    ],
  },
  {
    number: 5,
    title: "Herramientas y Ecosistema Moderno",
    description:
      "Conoce las herramientas esenciales del desarrollo web moderno: control de versiones, bundlers, frameworks y despliegue.",
    topics: [
      {
        number: 1,
        name: "Git y control de versiones",
        difficulty: "basico",
        estimatedTime: "35 min",
        content: `Git es el sistema de control de versiones más utilizado en el mundo del software, y es una competencia indispensable para cualquier desarrollador web. Git rastrea los cambios en los archivos de un proyecto, permite volver a versiones anteriores, trabajar en paralelo con otras personas y mantener un historial completo de modificaciones. Sin Git, la colaboración en proyectos de software sería caótica y propensa a errores.

Los comandos básicos de Git forman el flujo de trabajo diario. git init crea un nuevo repositorio. git clone descarga un repositorio existente. git add . prepara los cambios para ser guardados (los mueve al staging area). git commit -m "mensaje" guarda los cambios preparados con un mensaje descriptivo. git push envía los commits al repositorio remoto (GitHub, GitLab, Bitbucket). git pull descarga los cambios del remoto y los fusiona con tu trabajo local.

Las ramas (branches) son la característica más poderosa de Git para la colaboración. Una rama es una línea de desarrollo independiente: git branch feature-login crea una nueva rama, git checkout feature-login (o git switch feature-login) cambia a esa rama. Los cambios en una rama no afectan a las demás, lo que permite experimentar y desarrollar nuevas funcionalidades sin riesgo. Cuando la funcionalidad está completa, git merge feature-login fusiona los cambios de la rama feature en la rama principal (main o master).

Los conflictos de fusión ocurren cuando dos ramas modifican las mismas líneas del mismo archivo. Git no puede decidir automáticamente qué versión conservar y requiere intervención manual. El desarrollador abre los archivos en conflicto (marcados con <<<<<<< HEAD, ======= y >>>>>>> feature-branch), resuelve las diferencias eligiendo o combinando ambas versiones, y luego hace commit. Los conflictos son normales en la colaboración y aprender a resolverlos eficientemente es parte del oficio del desarrollador.`,
      },
      {
        number: 2,
        name: "npm, bundlers y el ecosistema de paquetes",
        difficulty: "intermedio",
        estimatedTime: "30 min",
        content: `npm (Node Package Manager) es el gestor de paquetes de JavaScript y el registry más grande del mundo con más de 2 millones de paquetes. npm permite instalar librerías y herramientas de terceros, gestionar dependencias y ejecutar scripts de proyecto. El archivo package.json es el corazón de cualquier proyecto Node.js: define las dependencias, los scripts y los metadatos del proyecto.

Los comandos esenciales de npm son: npm init -y crea un package.json con valores por defecto. npm install paquete instala una dependencia (se añade a dependencies en package.json). npm install -D paquete instala una dependencia de desarrollo (devDependencies). npm install -g paquete instala globalmente. npm run script ejecuta un script definido en package.json. npm update actualiza las dependencias a sus últimas versiones compatibles. El archivo package-lock.json registra las versiones exactas instaladas para garantizar reproducibilidad.

Los bundlers (empaquetadores) transforman y optimizan el código fuente para producción. Vite es el bundler moderno más popular, ofreciendo un servidor de desarrollo ultra-rápido con Hot Module Replacement (HMR) instantáneo. Webpack es el bundler más establecido, con un ecosistema de plugins maduro pero una configuración más compleja. esbuild y Rollup son alternativas enfocadas en velocidad y optimización respectivamente. Todos estos bundlers resuelven el mismo problema: transformar múltiples archivos JavaScript, CSS y otros recursos en bundles optimizados que el navegador pueda cargar eficientemente.

El flujo de trabajo típico con un bundler como Vite incluye: crear el proyecto con npm create vite@latest, desarrollar con npm run dev (servidor local con HMR), y construir para producción con npm run build (genera archivos optimizados en la carpeta dist). Los loaders y plugins permiten procesar TypeScript, CSS Modules, imágenes, SVGs y otros tipos de archivos. La configuración de Vite es mínima por defecto y se extiende según las necesidades del proyecto.`,
      },
      {
        number: 3,
        name: "Introducción a React y componentes",
        difficulty: "intermedio",
        estimatedTime: "45 min",
        content: `React es la biblioteca de JavaScript más popular para construir interfaces de usuario, creada por Meta (Facebook). Su filosofía se basa en componentes reutilizables y composables que describen cómo debe verse la interfaz en cada estado, y React se encarga de actualizar el DOM de forma eficiente cuando los datos cambian. Este paradigma declarativo simplifica enormemente el desarrollo de interfaces complejas.

Un componente React es una función que recibe props (propiedades) y devuelve JSX, una sintaxis que parece HTML pero que se compila a JavaScript. function Saludo({ nombre }) { return <h1>Hola, {nombre}</h1>; }. Los componentes se componen: function App() { return <Saludo nombre="María" />; }. Esta composición permite construir interfaces complejas a partir de piezas simples y reutilizables, siguiendo el principio de responsabilidad única.

El estado (state) es la data que cambia con el tiempo y que React rastrea para actualizar la interfaz. El hook useState declara una variable de estado: const [contador, setContador] = useState(0). Cuando setContador se llama con un nuevo valor, React re-renderiza el componente con el nuevo estado. useEffect ejecuta efectos secundarios (peticiones API, suscripciones, manipulación del DOM) después del renderizado: useEffect(() => { fetchDatos(); }, [dependencia]). El array de dependencias controla cuándo se re-ejecuta el efecto.

La renderización condicional muestra diferentes elementos según el estado: {cargando ? <Spinner /> : <Datos />}. Las listas se renderizan con map: {usuarios.map(u => <li key={u.id}>{u.nombre}</li>)}. La prop key es obligatoria en listas y debe ser un identificador único (nunca el índice del array). El manejo de eventos usa la convención onEvento: <button onClick={handleClick}>. Los formularios controlados vinculan los inputs al estado: <input value={nombre} onChange={e => setNombre(e.target.value)} />. Estos patrones forman la base de cualquier aplicación React.`,
      },
      {
        number: 4,
        name: "Despliegue y alojamiento web",
        difficulty: "intermedio",
        estimatedTime: "30 min",
        content: `El despliegue (deployment) es el proceso de publicar una aplicación web para que sea accesible desde internet. Las plataformas modernas de alojamiento han simplificado enormemente este proceso, permitiendo desplegar proyectos con unos pocos clics o incluso automáticamente al hacer push al repositorio. Conocer las opciones y los flujos de despliegue es esencial para llevar tus proyectos del entorno de desarrollo al mundo real.

Vercel es la plataforma líder para desplegar aplicaciones Next.js y sitios estáticos. Se conecta directamente con GitHub, GitLab o Bitbucket y despliega automáticamente cada push a la rama principal. Las previews se generan para cada pull request, permitiendo revisar los cambios antes de fusionarlos. Vercel ofrece CDN global, certificados SSL automáticos, serverless functions, edge functions y optimización de imágenes. El plan gratuito es generoso y suficiente para proyectos personales y pequeños negocios.

Netlify es una alternativa popular con características similares: despliegue automático desde Git, funciones serverless, CDN global y formularios integrados. Para sitios estáticos (sin servidor), GitHub Pages es otra opción gratuita que sirve archivos directamente desde un repositorio de GitHub. Cloudflare Pages ofrece un plan gratuito con ancho de banda ilimitado y la red CDN más rápida del mundo.

Los dominios personalizados se configuran apuntando los registros DNS del dominio a la plataforma de alojamiento. Vercel y Netlify generan certificados SSL automáticamente para dominios personalizados. Las variables de entorno se configuran en el panel de la plataforma y están disponibles durante el build y en las funciones serverless. El monitoreo y los logs permiten diagnosticar problemas en producción. La estrategia de despliegue más segura es usar ramas de staging para pruebas antes de fusionar a la rama de producción, garantizando que los cambios verificados lleguen a los usuarios finales.`,
      },
    ],
  },
  {
    number: 6,
    title: "Proyecto Final: Portfolio Web Profesional",
    description:
      "Aplica todo lo aprendido construyendo un portfolio web completo con HTML5 semántico, CSS3 avanzado y JavaScript interactivo.",
    topics: [
      {
        number: 1,
        name: "Planificación y wireframing",
        difficulty: "intermedio",
        estimatedTime: "35 min",
        content: `Antes de escribir una sola línea de código, la planificación del proyecto es crucial para su éxito. Un portfolio web profesional debe comunicar quién eres, qué haces y cómo contactarte de forma clara y atractiva. La planificación incluye definir la estructura del sitio, las secciones principales, el contenido y la experiencia de navegación.

Las secciones típicas de un portfolio son: Hero (presentación con nombre, rol y llamada a la acción), Sobre mí (descripción profesional), Habilidades (tecnologías y competencias), Proyectos (trabajos destacados con imágenes y descripciones), Experiencia (trayectoria profesional), y Contacto (formulario o enlaces). La estructura debe guiar al visitante desde la primera impresión hasta la conversión (que te contacte o vea tus proyectos).

El wireframing es el proceso de crear bocetos de baja fidelidad de cada sección. Puedes usar herramientas como Figma, Excalidraw o simplemente papel y lápiz. El objetivo es definir la disposición de los elementos (layout) sin preocuparte por colores, tipografía o imágenes. Un buen wireframe responde a preguntas como: ¿Qué se ve primero al cargar la página? ¿Cómo se navega entre secciones? ¿Qué información es más importante? ¿Dónde están las llamadas a la acción?

La paleta de colores y la tipografía se eligen después del wireframing. Para un portfolio profesional, se recomienda una paleta limitada: un color primario (para acentos y botones), un color de fondo (claro u oscuro según el estilo), un color de texto (con buen contraste) y un color de acento secundario. La tipografía debe ser legible: una fuente sin serif para el cuerpo (Inter, Roboto, Open Sans) y opcionalmente una fuente con personalidad para los títulos. Google Fonts ofrece cientos de opciones gratuitas optimizadas para la web.`,
      },
      {
        number: 2,
        name: "Desarrollo HTML y estructura semántica",
        difficulty: "intermedio",
        estimatedTime: "40 min",
        content: `El desarrollo del portfolio comienza con la estructura HTML semántica. Cada sección se marca con las etiquetas HTML5 apropiadas: <header> para la navegación, <main> para el contenido, <section> para cada área temática, <article> para proyectos individuales, y <footer> para el pie de página. Esta estructura no solo mejora la accesibilidad y el SEO, sino que también facilita el estilo CSS al proporcionar selectores semánticos claros.

La sección Hero es la primera impresión y debe ser impactante. Se estructura como una <section> con un <h1> para el nombre, un <p> para el rol profesional, y un <a> o <button> como llamada a la acción. La navegación en el <header> usa <nav> con enlaces internos que apuntan a cada sección mediante IDs: <a href="#proyectos">Proyectos</a>. En móvil, la navegación se colapsa en un menú hamburguesa que se despliega con JavaScript.

La sección de proyectos usa una estructura de tarjetas: cada proyecto es un <article> con una imagen (<img> con alt descriptivo), un título (<h3>), una descripción (<p>), las tecnologías usadas (lista de <span> o <li>) y enlaces al demo y al repositorio. Las tarjetas se organizan en un grid que se adapta de 1 columna en móvil a 2 o 3 en escritorio. La sección de habilidades agrupa las tecnologías por categoría (frontend, backend, herramientas) con indicadores visuales del nivel de dominio.

El formulario de contacto usa los tipos de input HTML5: <input type="text"> para nombre, <input type="email"> para correo, <textarea> para mensaje. Cada campo tiene un <label> asociado, atributos de validación (required, pattern) y mensajes de error accesibles. El formulario se puede conectar a servicios como Formspree, EmailJS o Netlify Forms sin necesidad de un backend propio, simplificando enormemente la implementación.`,
      },
      {
        number: 3,
        name: "Estilización CSS avanzada y animaciones",
        difficulty: "avanzado",
        estimatedTime: "45 min",
        content: `La estilización del portfolio es donde el diseño cobra vida. Las animaciones CSS y las transiciones añaden personalidad y profesionalismo a la presentación, creando una experiencia memorable para el visitante. Las animaciones deben ser sutiles y funcionales: guiar la atención, proporcionar feedback y mejorar la percepción de calidad, nunca distraer o dificultar la navegación.

Las transiciones CSS animan el cambio de un estado a otro: .card { transition: transform 0.3s ease, box-shadow 0.3s ease; } .card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.15); }. Las propiedades transition definen qué se anima (property), la duración, la función de timing (ease, ease-in-out, cubic-bezier) y el delay. Las transiciones son ideales para hover, focus y cambios de estado.

Las animaciones CSS con @keyframes permiten crear secuencias complejas que no dependen de un cambio de estado: @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } } .element { animation: fadeInUp 0.6s ease forwards; }. La propiedad animation controla la duración, timing, delay, iteraciones (infinite), dirección (alternate) y fill-mode (forwards mantiene el estado final).

Las animaciones de scroll (scroll reveal) son un efecto popular en portfolios: los elementos aparecen con una animación cuando el usuario hace scroll hacia ellos. Se implementan con IntersectionObserver en JavaScript: cuando un elemento entra en el viewport, se le añade una clase CSS que activa la animación. Esta técnica combina la eficiencia de IntersectionObserver (sin listeners de scroll costosos) con la fluidez de las animaciones CSS. Los prefers-reduced-motion deben respetarse: @media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } } para usuarios que prefieren menos movimiento.`,
      },
      {
        number: 4,
        name: "JavaScript interactivo y despliegue final",
        difficulty: "avanzado",
        estimatedTime: "40 min",
        content: `El JavaScript del portfolio añade interactividad que no se puede lograr solo con CSS: navegación responsiva, filtrado de proyectos, validación de formularios y animaciones basadas en scroll. El objetivo es que el portfolio no solo se vea bien sino que funcione perfectamente en todos los dispositivos y sea accesible para todos los usuarios.

La navegación móvil es la primera interactividad a implementar. Un menú hamburguesa que abre y cierra el menú de navegación: el botón toggle cambia un atributo data-open en el <nav>, y CSS controla la visibilidad y la animación del menú desplegable. Al hacer clic en un enlace del menú, este se cierra automáticamente y se hace scroll suave hasta la sección correspondiente usando element.scrollIntoView({ behavior: 'smooth' }). El scroll suave también se puede activar globalmente con html { scroll-behavior: smooth; }.

El filtrado de proyectos permite al visitante ver solo los proyectos de una categoría específica. Se implementa añadiendo data attributes a las tarjetas: <article data-category="frontend"> y creando botones de filtro que, al hacer clic, ocultan las tarjetas que no coinciden. La animación de filtrado puede ser un fade out/in suave o un reflow del grid. El estado del filtro activo se refleja visualmente en los botones.

El despliegue final en Vercel o Netlify completa el proyecto. Se configura el repositorio Git, se conecta la plataforma de alojamiento, y cada push a la rama principal despliega automáticamente el portfolio. Se configuran las variables de entorno (si se usan APIs), el dominio personalizado, y se verifica el rendimiento con Lighthouse. Un buen portfolio debe obtener puntuaciones altas en Performance, Accessibility, Best Practices y SEO en Lighthouse, lo que demuestra profesionalismo y atención al detalle.`,
      },
    ],
  },
];

async function main() {
  console.log("💻 Seeding Programación course: Desarrollo Web Completo...");

  const programacion = await prisma.category.findUnique({
    where: { slug: "programacion" },
  });

  if (!programacion) {
    console.error(
      "❌ Category 'programacion' not found. Run the main seed first."
    );
    process.exit(1);
  }

  const course = await prisma.course.upsert({
    where: { slug: courseData.slug },
    update: {
      title: courseData.title,
      description: courseData.description,
      image: courseData.image,
      icon: courseData.icon,
      order: courseData.order,
      published: courseData.published,
      level: courseData.level,
      duration: courseData.duration,
      status: courseData.status,
      categoryId: programacion.id,
    },
    create: {
      slug: courseData.slug,
      title: courseData.title,
      description: courseData.description,
      image: courseData.image,
      icon: courseData.icon,
      order: courseData.order,
      published: courseData.published,
      level: courseData.level,
      duration: courseData.duration,
      status: courseData.status,
      categoryId: programacion.id,
    },
  });

  console.log(`✅ Course created: ${course.title} (${course.id})`);

  for (const mod of modules) {
    const dbModule = await prisma.module.upsert({
      where: {
        courseId_number: {
          courseId: course.id,
          number: mod.number,
        },
      },
      update: {
        title: mod.title,
        description: mod.description,
      },
      create: {
        number: mod.number,
        title: mod.title,
        description: mod.description,
        courseId: course.id,
      },
    });

    console.log(`  📦 Module ${mod.number}: ${mod.title}`);

    for (const topic of mod.topics) {
      await prisma.topic.upsert({
        where: {
          moduleId_number: {
            moduleId: dbModule.id,
            number: topic.number,
          },
        },
        update: {
          name: topic.name,
          difficulty: topic.difficulty,
          estimatedTime: topic.estimatedTime,
          content: topic.content,
        },
        create: {
          name: topic.name,
          number: topic.number,
          difficulty: topic.difficulty,
          estimatedTime: topic.estimatedTime,
          content: topic.content,
          moduleId: dbModule.id,
        },
      });
    }

    console.log(`    ✅ ${mod.topics.length} topics created`);
  }

  const totalTopics = modules.reduce((s, m) => s + m.topics.length, 0);
  console.log(
    `\n🎉 Programación course seeded: ${modules.length} modules, ${totalTopics} topics`
  );
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
