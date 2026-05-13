export interface TopicStep {
  title: string;
  description: string;
  tip?: string;
}

export interface TopicContent {
  moduleId: string;
  topicIndex: number;
  title: string;
  objective: string;
  explanation: string;
  keyPoints: string[];
  steps: TopicStep[];
  practice: string;
  extraResources: { label: string; url: string }[];
}

// Helper to find content
const contentMap = new Map<string, TopicContent>();

export function getTopicContent(moduleId: string, topicIndex: number): TopicContent | undefined {
  return contentMap.get(`${moduleId}-${topicIndex}`);
}

export function getAllTopicContents(): TopicContent[] {
  return Array.from(contentMap.values());
}

function register(tc: TopicContent) {
  contentMap.set(`${tc.moduleId}-${tc.topicIndex}`, tc);
}

// ============================================================
// MÓDULO 1: Introducción a D5 Render
// ============================================================

register({
  moduleId: "modulo-1",
  topicIndex: 0,
  title: "Qué es D5 Render y su historia",
  objective: "Comprender qué es D5 Render, sus orígenes, su modelo de desarrollo y por qué se ha convertido en una herramienta líder para visualización arquitectónica en tiempo real.",
  explanation: `D5 Render es un motor de renderizado en tiempo real desarrollado por la empresa china D5 Tech, fundada en 2015. Nació con la visión de democratizar la visualización arquitectónica de alta calidad, permitiendo a diseñadores y arquitectos crear imágenes fotorrealistas sin necesidad de equipos extremadamente costosos ni años de experiencia técnica.

A diferencia de motores tradicionales como V-Ray o Corona Renderer que funcionan mediante cálculos progresivos de ray tracing en CPU, D5 Render aprovecha la tecnología de Ray Tracing por hardware (RTX) de las tarjetas gráficas NVIDIA para ofrecer una vista previa casi instantánea de la escena mientras se trabaja. Esto significa que puedes ver cómo cambia la iluminación, los materiales y la atmósfera en tiempo real, lo que reduce drásticamente el tiempo de iteración entre ajuste y resultado final.

La versión 1.0 se lanzó públicamente en 2020 y desde entonces ha experimentado un crecimiento exponencial. En 2022 introdujo la versión 2.0 con mejoras significativas en iluminación global, materiales y el sistema de vegetación. La versión 2.5 trajo el sistema de animación mejorado y la integración con más software de modelado. Actualmente D5 Render se encuentra en su versión 2.x con actualizaciones constantes.

El modelo de negocio de D5 Render es freemium: existe una versión gratuita con limitaciones (resolución de render máximo 1920x1080, marca de agua, sin render por capas) y una versión Pro de pago que desbloquea todas las funcionalidades. Esta estrategia ha permitido que miles de estudiantes y profesionales prueben la herramienta sin inversión inicial.

D5 Render se ha posicionado como competencia directa de Lumion y Enscape, ofreciendo una calidad de renderizado que muchos consideran superior gracias a su implementación de ray tracing por hardware, algo que Lumion solo ha empezado a incorporar recientemente.`,
  keyPoints: [
    "D5 Render utiliza Ray Tracing por hardware (NVIDIA RTX) para renderizado en tiempo real",
    "Fue desarrollado por D5 Tech, empresa china fundada en 2015",
    "La primera versión pública salió en 2020 y ha evolucionado rápidamente",
    "Modelo freemium: versión gratuita con limitaciones + versión Pro de pago",
    "Competencia directa de Lumion, Enscape y Twinmotion",
    "Actualizaciones frecuentes con nuevas funcionalidades y mejoras de calidad",
  ],
  steps: [
    {
      title: "Visitar el sitio oficial de D5 Render",
      description: "Abre tu navegador y ve a www.d5render.com. Explora la página principal para ver las características más recientes, ejemplos de renders y noticias del producto.",
      tip: "Suscríbete a su newsletter para recibir notificaciones de actualizaciones y nuevos tutoriales.",
    },
    {
      title: "Revisar la galería de proyectos",
      description: "Navega a la sección de galería o comunidad en el sitio web. Observa los renders creados por otros usuarios para tener una idea del nivel de calidad que se puede alcanzar con D5 Render.",
    },
    {
      title: "Comparar versiones Free vs Pro",
      description: "En la sección de precios, compara las funcionalidades de la versión gratuita y la versión Pro. Identifica cuáles son las limitaciones de la versión gratuita (resolución, marca de agua, exportación por capas) para decidir cuándo necesitarás la versión de pago.",
      tip: "Si eres estudiante, revisa si hay descuentos educativos disponibles.",
    },
    {
      title: "Explorar la comunidad y recursos",
      description: "Busca el foro oficial de D5 Render y su canal de YouTube. La comunidad es muy activa y comparte tutoriales, assets gratuitos y trucos que te ayudarán a aprender más rápido.",
    },
  ],
  practice: "Crea un documento o nota con un resumen de qué es D5 Render, sus ventajas principales sobre otros motores, y por qué lo elegiste como herramienta de aprendizaje. Incluye capturas de pantalla de la galería que te hayan impresionado más.",
  extraResources: [
    { label: "Sitio oficial D5 Render", url: "https://www.d5render.com" },
    { label: "Canal de YouTube D5 Render", url: "https://www.youtube.com/@D5Render" },
    { label: "Foro oficial de la comunidad", url: "https://forum.d5render.com" },
  ],
});

register({
  moduleId: "modulo-1",
  topicIndex: 1,
  title: "Requisitos del sistema y hardware recomendado",
  objective: "Conocer los requisitos mínimos y recomendados para ejecutar D5 Render correctamente, entender la importancia de la tarjeta gráfica y cómo verificar la compatibilidad de tu equipo.",
  explanation: `D5 Render es un software exigente en términos de hardware gráfico porque toda su tecnología se basa en el ray tracing por hardware. Esto significa que la tarjeta gráfica (GPU) es el componente más importante para su funcionamiento, mucho más que el procesador (CPU) o la memoria RAM.

El requisito mínimo absoluto es una tarjeta gráfica NVIDIA con soporte para Ray Tracing (arquitectura Turing o superior). Las tarjetas de la serie GTX 1000 no son compatibles porque carecen de núcleos RT. Las tarjetas mínimas recomendadas son las RTX 2060 o superiores, aunque para una experiencia fluida con escenas complejas se recomienda al menos una RTX 3060 con 12GB de VRAM.

La VRAM (memoria de video) es crucial porque D5 Render carga todos los modelos, texturas y mapas de iluminación en la memoria de la tarjeta gráfica. Si tu escena requiere más VRAM de la que tiene tu GPU, D5 Render mostrará advertencias y el rendimiento caerá drásticamente o incluso podría cerrarse. Para proyectos profesionales con muchos assets y texturas de alta resolución, 8GB de VRAM es lo mínimo confortable, idealmente 12GB o más.

En cuanto a otros componentes: se recomienda al menos 16GB de RAM del sistema (32GB para proyectos grandes), un procesador de gama media-alta (Intel i7 o AMD Ryzen 7), y un SSD para almacenamiento ya que los archivos de escena y los assets de la biblioteca pueden ocupar varios gigabytes.

Es importante mantener los drivers de NVIDIA actualizados. D5 Render recomienda usar los drivers Studio en lugar de los Game Ready, ya que están optimizados para aplicaciones profesionales de renderizado y ofrecen mayor estabilidad.`,
  keyPoints: [
    "La GPU es el componente más importante: se requiere NVIDIA RTX (Turing o superior)",
    "Mínimo: RTX 2060 / Recomendado: RTX 3060 (12GB) o superior",
    "VRAM es crucial: mínimo 8GB, idealmente 12GB+ para proyectos complejos",
    "RAM del sistema: mínimo 16GB, recomendado 32GB",
    "Usar drivers NVIDIA Studio (no Game Ready) para mayor estabilidad",
    "SSD recomendado para almacenamiento de escenas y assets",
  ],
  steps: [
    {
      title: "Verificar tu tarjeta gráfica",
      description: "En Windows, abre el Administrador de tareas (Ctrl+Shift+Esc), ve a la pestaña Rendimiento y haz clic en GPU. Anota el modelo de tu tarjeta gráfica y la cantidad de memoria VRAM dedicada.",
      tip: "También puedes usar el programa GPU-Z para obtener información detallada de tu tarjeta gráfica.",
    },
    {
      title: "Comprobar compatibilidad con D5 Render",
      description: "Compara tu GPU con los requisitos oficiales en la página de D5 Render. Si tienes una tarjeta RTX 2000 series o superior, eres compatible. Si tienes una GTX series o una tarjeta AMD, D5 Render no funcionará correctamente.",
    },
    {
      title: "Actualizar drivers de NVIDIA",
      description: "Descarga e instala NVIDIA App o GeForce Experience, y actualiza a los drivers Studio más recientes. Evita los drivers Game Ready si usas D5 Render para trabajo profesional.",
      tip: "Configura la actualización automática de drivers para no tener que preocuparte por esto en el futuro.",
    },
    {
      title: "Verificar RAM y almacenamiento",
      description: "Comprueba que tienes al menos 16GB de RAM y suficiente espacio libre en tu disco SSD. Las bibliotecas de assets de D5 pueden ocupar más de 20GB.",
    },
  ],
  practice: "Crea una tabla con las especificaciones de tu computadora actual (GPU, VRAM, RAM, CPU, almacenamiento) y compárala con los requisitos de D5 Render. Identifica si necesitas alguna mejora y cuál sería la prioridad.",
  extraResources: [
    { label: "Requisitos oficiales D5 Render", url: "https://www.d5render.com/download" },
    { label: "GPU-Z - Info de tarjeta gráfica", url: "https://www.techpowerup.com/gpuz/" },
    { label: "Drivers NVIDIA Studio", url: "https://www.nvidia.com/drivers" },
  ],
});

register({
  moduleId: "modulo-1",
  topicIndex: 2,
  title: "Descarga e instalación de D5 Render",
  objective: "Descargar e instalar correctamente D5 Render, crear una cuenta y configurar los ajustes iniciales del programa.",
  explanation: `La instalación de D5 Render es un proceso sencillo pero tiene algunos detalles importantes que debes conocer para evitar problemas posteriores. El instalador pesa aproximadamente 1-2GB, pero las bibliotecas de assets y materiales que se descargan después pueden sumar más de 20GB adicionales, por lo que es importante tener suficiente espacio en disco.

El proceso comienza descargando el instalador desde la página oficial de D5 Render. Es fundamental descargar siempre desde la fuente oficial para evitar versiones modificadas o malware. El instalador incluye el motor de renderizado, la interfaz de usuario y los plugins de integración para los diferentes software de modelado.

Durante la instalación, puedes elegir la ubicación de instalación. Se recomienda instalar D5 Render en un disco SSD para mejorar los tiempos de carga de escenas y la respuesta general del programa. La ubicación por defecto es Archivos de Programa, pero puedes cambiarla si tienes un SSD secundario con más espacio.

Después de la instalación, al abrir D5 Render por primera vez, se te pedirá iniciar sesión o crear una cuenta. La cuenta es gratuita y necesaria para acceder a la biblioteca de assets en línea, sincronizar tu licencia Pro (si la tienes) y recibir actualizaciones. Puedes usar tu correo electrónico o iniciar sesión con Google.

Una vez dentro, D5 Render descargará automáticamente los assets predeterminados (materiales, modelos de vegetación, sky boxes, etc.). Este proceso puede tardar entre 10-30 minutos dependiendo de tu conexión a internet. Puedes empezar a usar el programa mientras se descargan, pero algunos assets no estarán disponibles hasta que se complete la descarga.`,
  keyPoints: [
    "Descargar siempre desde la página oficial: www.d5render.com/download",
    "El instalador pesa ~2GB, pero los assets adicionales pueden sumar 20GB+",
    "Instalar preferiblemente en un SSD para mejor rendimiento",
    "Crear cuenta gratuita obligatoria para acceder a la biblioteca de assets",
    "Los assets predeterminados se descargan automáticamente al primer inicio",
    "Verificar que el plugin para tu software de modelado se instala correctamente",
  ],
  steps: [
    {
      title: "Descargar el instalador",
      description: "Ve a www.d5render.com/download y haz clic en el botón de descarga. Elige la versión para Windows (D5 Render solo está disponible para Windows actualmente). El archivo descargado será un ejecutable .exe.",
    },
    {
      title: "Ejecutar el instalador",
      description: "Ejecuta el archivo descargado. Si Windows muestra una advertencia de seguridad, haz clic en 'Más información' y luego en 'Ejecutar de todos modos'. Sigue el asistente de instalación aceptando los términos de uso.",
      tip: "Si tienes antivirus, puede que lo detecte como sospechoso. Agrega una excepción si es necesario.",
    },
    {
      title: "Elegir ubicación de instalación",
      description: "Selecciona la carpeta de instalación. Si tienes un SSD con suficiente espacio, elige ese disco. Evita instalar en discos mecánicos (HDD) ya que los tiempos de carga serán significativamente más lentos.",
    },
    {
      title: "Crear cuenta e iniciar sesión",
      description: "Abre D5 Render y crea una cuenta con tu correo electrónico o inicia sesión con Google. Esto es necesario para acceder a la biblioteca de assets y a las actualizaciones.",
    },
    {
      title: "Esperar la descarga de assets",
      description: "En la primera ejecución, D5 Render descargará los assets predeterminados. Puedes ver el progreso en la esquina inferior derecha. Mientras tanto, puedes explorar la interfaz del programa.",
      tip: "Si la descarga es lenta, puedes pausarla y reanudarla más tarde desde la configuración.",
    },
  ],
  practice: "Instala D5 Render en tu computadora siguiendo todos los pasos. Toma capturas de pantalla de cada paso del proceso y verifica que el programa se ejecuta correctamente abriendo un proyecto de ejemplo.",
  extraResources: [
    { label: "Página de descarga oficial", url: "https://www.d5render.com/download" },
    { label: "Guía de instalación en video", url: "https://www.youtube.com/@D5Render" },
  ],
});

register({
  moduleId: "modulo-1",
  topicIndex: 3,
  title: "Interfaz principal y navegación básica",
  objective: "Familiarizarse con la interfaz de D5 Render, conocer las diferentes áreas de trabajo, los menús principales y la navegación 3D en el viewport.",
  explanation: `La interfaz de D5 Render está diseñada para ser intuitiva y eficiente, combinando la simplicud de herramientas como Lumion con la potencia de un motor de ray tracing en tiempo real. Al abrir D5 Render, encontrarás un viewport 3D central que ocupa la mayor parte de la pantalla, rodeado de paneles y barras de herramientas accesibles.

En la parte superior se encuentra la barra de menú principal con opciones como Archivo (nuevo, abrir, guardar, exportar), Editar (deshacer, rehacer, preferencias) y Ayuda. Justo debajo está la barra de herramientas rápida con accesos a las funciones más utilizadas: selección, mover, rotar, escalar, y los diferentes modos de visualización.

A la izquierda se ubica el panel de Escena (Scene), que es donde se organizan todos los objetos del proyecto en una estructura jerárquica similar a un árbol. Aquí puedes ver todos los modelos importados, luces, cámaras y otros elementos, y gestionar su visibilidad, bloqueo y organización en capas. Este panel es esencial para mantener el orden en proyectos complejos.

A la derecha está el panel de Propiedades, que cambia su contenido según el elemento seleccionado. Si seleccionas un objeto, mostrará sus propiedades de transformación (posición, rotación, escala) y material. Si seleccionas una luz, mostrará sus parámetros de intensidad, color y tipo. Si no hay nada seleccionado, muestra las propiedades generales de la escena como la iluminación y el ambiente.

En la parte inferior se encuentra la barra de estado con información sobre el rendimiento del renderizado (FPS, uso de VRAM), y los controles de navegación temporal para la línea de tiempo de animación.

La navegación en el viewport 3D es similar a otros programas 3D: el botón izquierdo del ratón selecciona objetos, el botón central (rueda) hace pan al mantenerlo presionado, y la rueda del ratón hace zoom. Para orbitar alrededor de la escena, mantén presionado el botón central y arrastra. También puedes usar las teclas WASD para navegar en modo primera persona manteniendo presionado el botón central del ratón.`,
  keyPoints: [
    "Viewport central con vista 3D en tiempo real del proyecto",
    "Panel izquierdo: Escena (jerarquía de objetos, capas, visibilidad)",
    "Panel derecho: Propiedades (del objeto, luz o cámara seleccionada)",
    "Barra superior: menú principal + herramientas rápidas",
    "Navegación: rueda=zoom, botón medio=pan, botón medio+arrastrar=orbitar",
    "Modo primera persona con WASD manteniendo botón medio del ratón",
  ],
  steps: [
    {
      title: "Abrir un proyecto de ejemplo",
      description: "Al abrir D5 Render, selecciona uno de los proyectos de ejemplo que vienen incluidos. Esto te dará una escena con objetos, iluminación y materiales ya configurados para explorar la interfaz sin tener que crear todo desde cero.",
    },
    {
      title: "Explorar el panel de Escena",
      description: "Haz clic en el panel izquierdo de Escena. Expande las diferentes categorías (modelos, luces, cámaras) y haz clic en los elementos para seleccionarlos en el viewport. Observa cómo al seleccionar un objeto, sus propiedades aparecen en el panel derecho.",
    },
    {
      title: "Practicar la navegación 3D",
      description: "Usa la rueda del ratón para acercar y alejar la vista. Mantén presionado el botón central y arrastra para hacer pan. Haz clic con el botón central en el viewport y arrastra para orbitar alrededor de la escena. Practica hasta que te sientas cómodo con los controles.",
      tip: "Presiona la tecla F para enfocar la cámara en el objeto seleccionado.",
    },
    {
      title: "Explorar los modos de visualización",
      description: "En la barra superior, busca los diferentes modos de visualización: modo wireframe, modo sólido, modo material, etc. Alterna entre ellos para ver cómo cambia la representación de la escena.",
    },
    {
      title: "Interactuar con objetos",
      description: "Selecciona un objeto en el viewport y usa las herramientas de mover (W), rotar (E) y escalar (R) de la barra superior. Observa cómo los gizmos de transformación aparecen en el objeto y permiten manipularlo en los tres ejes.",
    },
  ],
  practice: "Abre un proyecto de ejemplo y dedica 15 minutos a navegar libremente por la escena. Selecciona diferentes objetos, muévelos, cambia su material y explora todos los paneles de la interfaz. Toma nota de cualquier duda que tengas para consultarla en la siguiente sesión.",
  extraResources: [
    { label: "Tutorial oficial de interfaz", url: "https://www.d5render.com/help/getting-started" },
    { label: "Atajos de teclado D5 Render", url: "https://www.d5render.com/help/shortcuts" },
  ],
});

register({
  moduleId: "modulo-1",
  topicIndex: 4,
  title: "Diferencias entre D5 Render y otros motores (Lumion, Enscape, V-Ray)",
  objective: "Entender las diferencias fundamentales entre D5 Render y otros motores de renderizado populares para poder elegir la herramienta adecuada según el proyecto.",
  explanation: `El mercado de renderizado arquitectónico ofrece varias opciones, cada una con fortalezas y debilidades. Comprender las diferencias te ayudará a saber cuándo D5 Render es la mejor opción y cuándo podría complementarse con otras herramientas.

V-Ray es el motor de renderizado más establecido en la industria. Funciona como un plugin dentro de software de modelado como SketchUp, 3ds Max, Rhino y Revit. Su mayor fortaleza es la calidad de renderizado prácticamente sin límites y el control total sobre cada parámetro de iluminación y materiales. Sin embargo, su flujo de trabajo es más lento porque no ofrece vista previa en tiempo real de calidad completa (aunque V-Ray GPU ha mejorado esto). La curva de aprendizaje es considerable y los tiempos de render final pueden ser de minutos a horas por imagen.

Lumion es probablemente el competidor más directo de D5 Render. También es un software standalone con vista previa en tiempo real y una interfaz amigable. La principal diferencia es que Lumion utiliza rasterización + efectos de post-proceso para simular el realismo, mientras que D5 Render usa ray tracing por hardware real. Esto significa que las reflexiones, refracciones y la iluminación global en D5 Render son físicamente más precisas. Lumion tiende a ser más rápido en escenas simples pero D5 Render ofrece mayor calidad fotorrealista, especialmente en escenas con mucha reflexión y luz indirecta.

Enscape es un plugin que funciona directamente dentro del software de modelado (SketchUp, Revit, Rhino). Su ventaja principal es la integración perfecta: cualquier cambio en el modelo se refleja instantáneamente en Enscape sin necesidad de exportar. Sin embargo, su calidad de renderizado es inferior a D5 Render y tiene menos opciones de personalización de materiales y iluminación. Es ideal para visualizaciones rápidas durante el proceso de diseño.

Twinmotion, propiedad de Epic Games, utiliza el motor Unreal Engine y ofrece calidad visual comparable a D5 Render. Su fortaleza está en la creación de presentaciones interactivas y recorridos, pero su flujo de trabajo para renders estáticos puede ser más complejo. La integración con Unreal Engine le da acceso a un ecosistema enorme de assets y herramientas.

En resumen: D5 Render destaca por su equilibrio entre calidad fotorrealista (gracias al ray tracing), facilidad de uso y velocidad. Es la mejor opción cuando necesitas calidad profesional sin la complejidad de V-Ray ni el costo de hardware de alto nivel que requiere Unreal Engine.`,
  keyPoints: [
    "V-Ray: máxima calidad, curva de aprendizaje alta, renders lentos, plugin integrado",
    "Lumion: tiempo real, rasterización, interfaz amigable, reflexiones menos precisas",
    "Enscape: integración directa en el modelador, calidad media-baja, ideal para diseño",
    "Twinmotion: basado en Unreal, bueno para presentaciones interactivas",
    "D5 Render: ray tracing real, calidad fotorrealista, fácil de usar, buen equilibrio calidad/velocidad",
    "D5 Render es gratuito con limitaciones (competidores son de pago completo)",
  ],
  steps: [
    {
      title: "Crear una tabla comparativa",
      description: "En un documento o spreadsheet, crea una tabla con las siguientes columnas: Motor de render, Tipo (plugin/standalone), Tecnología (ray tracing/rasterización), Calidad máxima, Velocidad, Precio, Curva de aprendizaje. Completa la información para D5 Render, V-Ray, Lumion, Enscape y Twinmotion.",
    },
    {
      title: "Ver galerías comparativas",
      description: "Busca en internet 'D5 Render vs Lumion' o comparaciones similares. Observa las diferencias visuales en los resultados, prestando especial atención a reflexiones, iluminación indirecta y materiales translúcidos.",
    },
    {
      title: "Identificar cuándo usar cada herramienta",
      description: "Piensa en diferentes escenarios de proyecto (diseño rápido para cliente, render fotorrealista para competencia, recorrido interactivo, visualización durante el diseño) y determina qué motor sería más apropiado para cada caso.",
      tip: "No necesitas elegir solo uno. Muchos profesionales usan 2-3 herramientas según el tipo de proyecto.",
    },
  ],
  practice: "Escribe un breve análisis (mínimo 200 palabras) comparando D5 Render con al menos otros dos motores. Incluye tu opinión sobre cuál sería la mejor opción para tu tipo de trabajo y por qué.",
  extraResources: [
    { label: "Comparativa D5 vs Lumion vs Enscape", url: "https://www.d5render.com/blog" },
    { label: "Benchmark de renderizado arquitectónico", url: "https://www.youtube.com/results?search_query=d5+render+vs+lumion+comparison" },
  ],
});

register({
  moduleId: "modulo-1",
  topicIndex: 5,
  title: "Configuración inicial y preferencias",
  objective: "Configurar D5 Render con las preferencias óptimas para tu equipo y flujo de trabajo, incluyendo idioma, rendimiento, ubicación de assets y atajos de teclado.",
  explanation: `Una configuración inicial adecuada puede marcar una gran diferencia en tu experiencia con D5 Render. Antes de empezar a trabajar en proyectos, es importante dedicar unos minutos a ajustar las preferencias del programa a tu hardware y preferencias personales.

El primer ajuste importante es el idioma de la interfaz. D5 Render está disponible en varios idiomas incluyendo español, inglés y chino. Para cambiarlo, ve a Editar > Preferencias (o usa el atajo Ctrl+,) y selecciona tu idioma preferido en la sección de General. El cambio se aplicará después de reiniciar el programa.

En la sección de Rendimiento, encontrarás ajustes críticos para tu GPU. D5 Render te permite seleccionar qué tarjeta gráfica usar si tienes múltiples GPUs. También puedes ajustar la calidad del viewport en tiempo real: Alta calidad consume más VRAM pero ofrece mejor vista previa, mientras que Baja calidad es más suave en equipos modestos. El modo de Denoiser (eliminador de ruido) puede activarse o desactivarse según tus necesidades.

La gestión de assets es otro aspecto fundamental. En Preferencias > Assets, puedes configurar la ubicación donde se almacenan los assets descargados de la biblioteca de D5. Por defecto se guardan en la carpeta del usuario, pero es recomendable moverlos a un disco con suficiente espacio (pueden ocupar 20-50GB). Si cambias la ubicación, D5 Render necesitará reindexar los assets existentes.

La configuración de auto-guardado es vital para evitar pérdidas de trabajo. Activa el auto-guardado y configúralo para que guarde cada 5-10 minutos. Los archivos de escena de D5 (.drs) pueden ser grandes, así que asegúrate de tener suficiente espacio en disco.

Finalmente, familiarízate con los atajos de teclado. D5 Render incluye atajos predeterminados que puedes personalizar. Los más importantes son: W (mover), E (rotar), R (escalar), F (enfocar objeto), G (agregar objeto), Ctrl+Z (deshacer), Ctrl+S (guardar). Personalizar los atajos a tu flujo de trabajo puede acelerar significativamente tu productividad.`,
  keyPoints: [
    "Cambiar idioma en Editar > Preferencias > General (requiere reinicio)",
    "Seleccionar GPU correcta si tienes múltiples tarjetas gráficas",
    "Ajustar calidad del viewport según tu VRAM disponible",
    "Configurar ubicación de assets en un disco con suficiente espacio",
    "Activar auto-guardado cada 5-10 minutos",
    "Personalizar atajos de teclado para mayor productividad",
  ],
  steps: [
    {
      title: "Abrir Preferencias",
      description: "Abre D5 Render y ve a Editar > Preferencias (o presiona Ctrl+,). Recorre cada sección del panel de preferencias para familiarizarte con todas las opciones disponibles.",
    },
    {
      title: "Configurar idioma y apariencia",
      description: "En la sección General, cambia el idioma a español si lo prefieres. También puedes ajustar el tema de la interfaz (oscuro/claro) y el tamaño de los iconos.",
    },
    {
      title: "Ajustar configuración de rendimiento",
      description: "En la sección de Rendimiento, verifica que tu GPU RTX esté seleccionada. Ajusta la calidad del viewport a 'Alta' si tienes 8GB+ de VRAM, o 'Media' si tienes menos. Activa el Denoiser para mejor vista previa.",
      tip: "Si experimentas lag en el viewport, reduce la calidad de vista previa antes de considerar actualizar tu hardware.",
    },
    {
      title: "Configurar ubicación de assets",
      description: "En la sección Assets, cambia la ruta de almacenamiento a un disco con al menos 50GB libres. Los assets de D5 Render (materiales, vegetación, sky boxes) pueden ocupar mucho espacio con el tiempo.",
    },
    {
      title: "Activar auto-guardado",
      description: "En la sección General, activa el auto-guardado y configúralo para que guarde cada 5 minutos. Elige una ubicación para los archivos de respaldo que sea fácil de encontrar.",
    },
  ],
  practice: "Configura todas las preferencias de D5 Render según las recomendaciones. Crea un documento con capturas de pantalla de tu configuración final y explica brevemente por qué elegiste cada opción.",
  extraResources: [
    { label: "Guía de configuración D5 Render", url: "https://www.d5render.com/help/settings" },
    { label: "Optimización de rendimiento", url: "https://www.d5render.com/blog/performance" },
  ],
});

// ============================================================
// MÓDULO 2: Importación y Gestión de Modelos
// ============================================================

register({
  moduleId: "modulo-2",
  topicIndex: 0,
  title: "Importar modelos desde SketchUp",
  objective: "Aprender a importar modelos 3D desde SketchUp a D5 Render usando el plugin de sincronización directa, entendiendo qué se preserva y qué se pierde en la transferencia.",
  explanation: `SketchUp es uno de los software de modelado más utilizados en arquitectura y diseño de interiores, y D5 Render ofrece un plugin de sincronización directa que hace que la transferencia de modelos sea extremadamente sencilla. Este plugin, llamado D5 SketchUp Sync, se instala como una extensión dentro de SketchUp y permite enviar el modelo directamente a D5 Render con un solo clic.

Para instalar el plugin, abre D5 Render y ve a la sección de descargas o plugins. Descarga el instalador del plugin para SketchUp compatible con tu versión (SketchUp 2020-2024). Ejecuta el instalador y sigue las instrucciones. Una vez instalado, encontrarás una nueva barra de herramientas de D5 Render dentro de SketchUp con botones como 'Sync to D5' y 'Update Model'.

El flujo de trabajo básico es: modelas en SketchUp normalmente, luego haces clic en 'Sync to D5' y el modelo se transfiere a D5 Render donde se abre con la iluminación y los materiales convertidos automáticamente. Los materiales de SketchUp se mapean a materiales PBR de D5 Render de la mejor manera posible. Los colores sólidos se convierten en materiales difusos, los materiales con textura conservan sus mapas difusos, y los materiales semi-transparentes se convierten en materiales de vidrio o translúcidos.

Es importante entender las limitaciones de la conversión. SketchUp no maneja materiales PBR nativamente (no tiene mapas de rugosidad, metalicidad o normales), por lo que todos los materiales importados serán versiones simplificadas. Después de importar, deberás mejorar los materiales manualmente en D5 Render agregando los mapas que SketchUp no puede proporcionar.

La jerarquía de grupos y componentes de SketchUp se preserva en D5 Render, lo que facilita la selección y manipulación de objetos. Sin embargo, las escenas de SketchUp (vistas guardadas) no se transfieren automáticamente; tendrás que recrear las cámaras en D5 Render.

Una funcionalidad muy útil es la actualización del modelo. Si haces cambios en SketchUp, puedes hacer clic en 'Update Model' en el plugin y D5 Render actualizará la geometría del modelo manteniendo los materiales y ajustes que ya configuraste. Esto es esencial para el flujo de trabajo iterativo donde el diseño cambia constantemente.`,
  keyPoints: [
    "Instalar plugin D5 SketchUp Sync desde D5 Render",
    "Flujo: modelar en SketchUp > clic Sync to D5 > editar en D5 Render",
    "Materiales se convierten automáticamente pero son versiones simplificadas",
    "Grupos y componentes de SketchUp se preservan en D5 Render",
    "La función Update Model actualiza geometría sin perder materiales asignados",
    "Las escenas de SketchUp (vistas) no se transfieren automáticamente",
  ],
  steps: [
    {
      title: "Instalar el plugin D5 SketchUp Sync",
      description: "Abre D5 Render, ve a la sección de plugins y descarga el instalador para SketchUp. Cierra SketchUp si está abierto, ejecuta el instalador y sigue las instrucciones. Abre SketchUp y verifica que aparece la barra de herramientas de D5 Render.",
      tip: "Si no ves la barra de herramientas, ve a Extensiones > D5 Render en SketchUp y actívala.",
    },
    {
      title: "Preparar el modelo en SketchUp",
      description: "Abre un modelo de SketchUp o crea uno sencillo. Organiza los objetos en grupos y componentes con nombres descriptivos. Aplica materiales básicos a las superficies (aunque sean colores sólidos). Esta organización facilitará enormemente el trabajo posterior en D5 Render.",
    },
    {
      title: "Sincronizar con D5 Render",
      description: "Con el modelo abierto en SketchUp, haz clic en el botón 'Sync to D5' de la barra de herramientas de D5. D5 Render se abrirá (o se activará si ya estaba abierto) y el modelo aparecerá en el viewport. Espera a que se complete la conversión de materiales.",
    },
    {
      title: "Verificar la importación",
      description: "En D5 Render, revisa que todos los objetos se hayan importado correctamente. Comprueba la jerarquía en el panel de Escena, verifica que los materiales se hayan convertido razonablemente y que no falten geometrías.",
    },
    {
      title: "Probar la actualización del modelo",
      description: "Vuelve a SketchUp, haz un cambio en el modelo (mueve un muro, agrega un objeto). Haz clic en 'Update Model' en el plugin de D5. Regresa a D5 Render y verifica que el cambio se refleja sin perder los materiales que ya configuraste.",
    },
  ],
  practice: "Importa un modelo de SketchUp a D5 Render usando el plugin de sincronización. Haz al menos dos ciclos de actualización (modificar en SketchUp > actualizar en D5 Render) para practicar el flujo de trabajo iterativo. Documenta qué materiales se importaron bien y cuáles necesitaron ajustes.",
  extraResources: [
    { label: "Plugin D5 SketchUp Sync", url: "https://www.d5render.com/sketchup" },
    { label: "Guía de importación SketchUp-D5", url: "https://www.d5render.com/help/sketchup-sync" },
  ],
});

register({
  moduleId: "modulo-2",
  topicIndex: 1,
  title: "Importar modelos desde Rhino y Revit",
  objective: "Aprender a importar modelos desde Rhino y Revit a D5 Render, conociendo las particularidades de cada flujo de trabajo y las mejores prácticas para cada software.",
  explanation: `Además de SketchUp, D5 Render ofrece plugins de sincronización directa para Rhino y Revit, dos de los software más utilizados en arquitectura y diseño. Cada uno tiene sus particularidades en cuanto a cómo se transfiere la información del modelo.

Rhino es un modelador NURBS muy popular entre diseñadores y arquitectos. El plugin D5 Rhino Sync funciona de manera similar al de SketchUp: se instala como una extensión dentro de Rhino y permite sincronizar el modelo directamente. La ventaja de Rhino es que maneja materiales más sofisticados que SketchUp, incluyendo materiales con texturas y transparencias, lo que resulta en una mejor conversión automática en D5 Render. Además, las capas de Rhino se preservan como capas en D5 Render, facilitando la organización de la escena.

Para instalar el plugin de Rhino, descárgalo desde D5 Render y ejecuta el instalador. En Rhino, encontrarás la barra de herramientas de D5 Render con los mismos botones de sincronización. El flujo es idéntico: modelas en Rhino, sincronizas con D5 Render, y los materiales y capas se transfieren automáticamente.

Revit es el software BIM líder en la industria y tiene particularidades importantes. El plugin D5 Revit Sync se instala como un add-in dentro de Revit. La diferencia principal con Revit es que el modelo BIM contiene mucha más información que un modelo 3D simple (materiales reales, espesores, metadatos). D5 Render intenta aprovechar esta información para una mejor conversión de materiales. Por ejemplo, un muro de ladrillo en Revit puede importarse con un material que tiene la textura de ladrillo ya asignada, algo que en SketchUp requeriría asignación manual.

Una consideración importante con Revit es el tamaño de los modelos. Los proyectos BIM completos pueden ser extremadamente pesados con miles de elementos. Es recomendable usar la función de vista 3D filtrada de Revit para enviar solo la geometría relevante a D5 Render, ocultando elementos estructurales, instalaciones y detalles que no son necesarios para la visualización.

Para ambos software, el principio es el mismo: mantener el plugin actualizado para asegurar la máxima compatibilidad con las versiones más recientes de cada programa y de D5 Render.`,
  keyPoints: [
    "D5 Render tiene plugins para Rhino y Revit además de SketchUp",
    "Rhino: mejor conversión de materiales, capas se preservan automáticamente",
    "Revit: aprovecha información BIM para mejor asignación de materiales",
    "En Revit, filtrar la vista 3D para no enviar geometría innecesaria",
    "Mantener plugins actualizados para compatibilidad con versiones recientes",
    "El flujo de actualización (Update Model) funciona igual que con SketchUp",
  ],
  steps: [
    {
      title: "Instalar el plugin correspondiente",
      description: "Descarga e instala el plugin de D5 Render para el software que uses (Rhino o Revit) desde la página de D5 Render. Verifica que la barra de herramientas de D5 aparece en tu software después de la instalación.",
    },
    {
      title: "Preparar el modelo en Rhino o Revit",
      description: "En Rhino: organiza el modelo por capas con nombres descriptivos y aplica materiales básicos. En Revit: crea una vista 3D filtrada que muestre solo los elementos relevantes para la visualización, ocultando estructura, instalaciones y detalles innecesarios.",
      tip: "En Revit, usa la opción de 'Filtro por categoría' para controlar exactamente qué elementos se exportan.",
    },
    {
      title: "Sincronizar con D5 Render",
      description: "Haz clic en 'Sync to D5' desde tu software de modelado. D5 Render se abrirá y el modelo aparecerá en el viewport. Espera a que se complete la conversión de todos los materiales y geometrías.",
    },
    {
      title: "Evaluar la calidad de la importación",
      description: "Revisa los materiales importados en D5 Render. Compara con los materiales originales del modelo. Identifica cuáles se convirtieron bien y cuáles necesitan ajustes manuales. Presta especial atención a vidrios, metales y materiales reflectivos.",
    },
  ],
  practice: "Si tienes acceso a Rhino o Revit, importa un modelo usando el plugin respectivo. Si no, investiga los flujos de trabajo documentando el proceso y creando una guía paso a paso con capturas de la documentación oficial.",
  extraResources: [
    { label: "Plugin D5 Rhino Sync", url: "https://www.d5render.com/rhino" },
    { label: "Plugin D5 Revit Sync", url: "https://www.d5render.com/revit" },
    { label: "Guías de importación", url: "https://www.d5render.com/help/import" },
  ],
});

register({
  moduleId: "modulo-2",
  topicIndex: 2,
  title: "Formatos compatibles (FBX, OBJ, SKP, etc.)",
  objective: "Conocer todos los formatos de archivo que D5 Render puede importar, sus ventajas y desventajas, y cuándo usar cada uno según el software de origen.",
  explanation: `Además de la sincronización directa mediante plugins, D5 Render permite importar archivos en varios formatos estándar de la industria 3D. Conocer las características de cada formato te permitirá elegir la mejor opción según tu flujo de trabajo y el software de modelado que utilices.

FBX es el formato más recomendado para importación manual en D5 Render. Es un formato desarrollado por Autodesk que soporta geometría, materiales, texturas, animaciones y jerarquía de objetos. La mayoría de los software 3D pueden exportar a FBX, lo que lo convierte en un estándar universal. En D5 Render, la importación FBX suele preservar bien los materiales y la estructura del modelo. Se recomienda usar la versión FBX 2014 o posterior para máxima compatibilidad.

OBJ es uno de los formatos más antiguos y universalmente soportados. Es simple y confiable para geometría, pero tiene limitaciones: no soporta animaciones, tiene soporte limitado para materiales complejos (solo difuso básico), y no preserva la jerarquía de objetos tan bien como FBX. Es útil para modelos simples o cuando otros formatos no funcionan.

SKP es el formato nativo de SketchUp. D5 Render puede importar archivos .skp directamente sin necesidad de tener SketchUp instalado. Esto es conveniente cuando recibes un archivo de un colega y solo necesitas renderizarlo. Sin embargo, la importación directa suele ser menos precisa que la sincronización mediante el plugin, especialmente en materiales complejos.

3DS es un formato legacy de 3ds Max que D5 Render también soporta. No se recomienda para nuevos proyectos ya que tiene limitaciones significativas (nombres de objetos cortos, sin soporte para materiales PBR), pero puede ser útil para importar modelos antiguos.

Al importar cualquier formato, hay consideraciones importantes. Primero, las unidades: asegúrate de que el modelo esté en las unidades correctas (generalmente metros o centímetros para arquitectura). D5 Render intenta detectar las unidades automáticamente, pero a veces falla, resultando en modelos demasiado grandes o pequeños. Segundo, el origen: el modelo debe estar cerca del origen de coordenadas (0,0,0) para aparecer correctamente en el viewport de D5 Render. Tercero, la escala: verifica siempre la escala del modelo importado comparándolo con objetos de referencia conocidos.

Para importar, simplemente arrastra el archivo al viewport de D5 Render o usa Archivo > Importar. D5 Render procesará el archivo y lo añadirá a la escena actual.`,
  keyPoints: [
    "FBX: formato más recomendado, soporta materiales, texturas y jerarquía",
    "OBJ: universal pero limitado, solo geometría y materiales básicos",
    "SKP: importación directa de SketchUp sin plugin, menos precisa",
    "3DS: formato legacy, solo para modelos antiguos",
    "Siempre verificar unidades, origen (0,0,0) y escala después de importar",
    "Se puede importar arrastrando el archivo al viewport o desde Archivo > Importar",
  ],
  steps: [
    {
      title: "Exportar un modelo en FBX",
      description: "Desde tu software de modelado (SketchUp, Rhino, Blender, etc.), exporta un modelo en formato FBX. Configura las opciones de exportación: unidades en metros, escala 1:1, y asegúrate de incluir materiales y texturas.",
      tip: "En Blender, usa File > Export > FBX con la opción 'Forward: Y Forward' y 'Up: Z Up' para compatibilidad con D5 Render.",
    },
    {
      title: "Importar el archivo FBX en D5 Render",
      description: "En D5 Render, arrastra el archivo FBX al viewport o ve a Archivo > Importar y selecciona el archivo. Espera a que se complete la importación y verifica que el modelo aparece en la escena.",
    },
    {
      title: "Verificar escala y posición",
      description: "Comprueba que el modelo tiene el tamaño correcto. Si es un edificio, debería tener una escala razonable comparada con los assets de la biblioteca de D5 Render. Si está demasiado grande o pequeño, puede ser un problema de unidades en la exportación.",
    },
    {
      title: "Probar otros formatos",
      description: "Exporta el mismo modelo en OBJ y SKP (si es posible) e impórtalos en D5 Render. Compara los resultados: calidad de materiales, preservación de la jerarquía y escala. Esto te dará experiencia para elegir el mejor formato en futuros proyectos.",
    },
  ],
  practice: "Importa el mismo modelo en al menos dos formatos diferentes (FBX y OBJ) y compara los resultados. Documenta las diferencias en materiales, escala, jerarquía y cualquier problema que encuentres.",
  extraResources: [
    { label: "Formatos soportados D5 Render", url: "https://www.d5render.com/help/supported-formats" },
    { label: "Guía de exportación FBX", url: "https://www.d5render.com/help/fbx-export" },
  ],
});

register({
  moduleId: "modulo-2",
  topicIndex: 3,
  title: "Organización de la escena con capas",
  objective: "Dominar el sistema de capas de D5 Render para organizar eficientemente los elementos de la escena, facilitando la visibilidad, selección y gestión de objetos complejos.",
  explanation: `El sistema de capas de D5 Render es una herramienta fundamental para mantener el orden en proyectos de cualquier tamaño. Cuando trabajas con escenas arquitectónicas complejas que pueden contener miles de objetos, la capacidad de agrupar, mostrar y ocultar elementos por capas es esencial para la productividad.

Las capas en D5 Render funcionan como carpetas que contienen objetos. Cada objeto puede pertenecer a una sola capa, y cada capa puede contener cualquier número de objetos. Las capas tienen dos estados principales: visible (el ojo abierto) y oculto (el ojo cerrado). Cuando una capa está oculta, todos sus objetos desaparecen del viewport y del render final, liberando también recursos de VRAM.

Para acceder al sistema de capas, abre el panel de Escena en la parte izquierda de la interfaz y haz clic en la pestaña 'Layers'. Aquí verás la lista de todas las capas existentes con controles para mostrar/ocultar, bloquear/desbloquear y renombrar. También puedes crear nuevas capas con el botón '+' y eliminar capas vacías.

La estrategia de organización más común en proyectos arquitectónicos es crear capas por categoría: una capa para la estructura, otra para los muros, otra para el mobiliario, otra para la vegetación, otra para las luces, etc. Esto permite mostrar solo lo que necesitas en cada momento: si estás trabajando en la iluminación, oculta el mobiliario para ver mejor las sombras; si estás ajustando materiales de los muros, oculta la vegetación que pueda obstruir la vista.

Cuando importas modelos desde SketchUp o Rhino, las capas del software de modelado se preservan automáticamente en D5 Render. Esto es una gran ventaja porque puedes organizar tu modelo en el software de modelado y esa organización se mantiene en D5 Render. Para modelos importados en FBX u OBJ, D5 Render crea una capa por defecto, por lo que deberás organizar manualmente.

Para mover objetos entre capas, selecciona los objetos en el viewport o en el panel de Escena, haz clic derecho y elige 'Move to Layer', luego selecciona la capa de destino. También puedes arrastrar objetos en el panel de Escena de una capa a otra.

Una práctica recomendada es crear capas temporales para elementos que solo necesitas durante el proceso de trabajo (como objetos de referencia, luces de prueba o geometría de bloqueo). Estas capas se ocultan antes del render final pero te ayudan durante la edición.`,
  keyPoints: [
    "Las capas agrupan objetos y controlan su visibilidad en el viewport y render",
    "Ocultar capas libera VRAM y simplifica la vista de trabajo",
    "Organizar por categoría: estructura, muros, mobiliario, vegetación, luces, etc.",
    "Las capas de SketchUp y Rhino se preservan al importar",
    "Mover objetos entre capas con clic derecho > Move to Layer",
    "Crear capas temporales para elementos de referencia o prueba",
  ],
  steps: [
    {
      title: "Crear una estructura de capas",
      description: "Abre un proyecto en D5 Render y ve al panel de Escena > Layers. Crea las siguientes capas: Estructura, Muros, Mobiliario, Vegetación, Luces, Referencia. Nombra cada capa con el prefijo del módulo si estás en un proyecto grande (ej: P1_Estructura).",
    },
    {
      title: "Asignar objetos a capas",
      description: "Selecciona objetos en el viewport y asígnalos a la capa correspondiente usando clic derecho > Move to Layer. Empieza por los elementos más grandes (muros, suelo) y avanza hacia los más pequeños (mobiliario, decoración).",
      tip: "Selecciona múltiples objetos del mismo tipo manteniendo Shift y luego muévelos todos a la vez.",
    },
    {
      title: "Practicar mostrar y ocultar capas",
      description: "Alterna la visibilidad de cada capa haciendo clic en el icono del ojo. Observa cómo la escena cambia y cómo los tiempos de respuesta del viewport mejoran al ocultar capas pesadas como la vegetación.",
    },
    {
      title: "Verificar el render con capas",
      description: "Oculta la capa de Referencia y cualquier capa temporal. Haz un render de prueba y verifica que solo aparecen los objetos de las capas visibles. Los objetos en capas ocultas NO aparecen en el render final.",
    },
  ],
  practice: "Organiza un proyecto completo en capas siguiendo la estructura recomendada. Documenta tu organización con capturas de pantalla del panel de capas y explica cómo te ayuda a trabajar más eficientemente.",
  extraResources: [
    { label: "Sistema de capas en D5 Render", url: "https://www.d5render.com/help/layers" },
  ],
});

register({
  moduleId: "modulo-2",
  topicIndex: 4,
  title: "Reemplazo y actualización de modelos",
  objective: "Aprender a actualizar modelos ya importados sin perder el trabajo realizado en D5 Render (materiales, iluminación, ajustes), utilizando las funciones de reimportación y reemplazo.",
  explanation: `Uno de los mayores desafíos en el flujo de trabajo de renderizado es mantener sincronizado el modelo 3D con los cambios que el diseñador hace durante el proceso de proyecto. D5 Render ofrece herramientas específicas para actualizar modelos sin perder el trabajo ya realizado, lo que lo convierte en una herramienta ideal para flujos de trabajo iterativos.

El escenario más común es: importas un modelo a D5 Render, asignas materiales detallados, configuras la iluminación, ajustas la vegetación, y luego el arquitecto te envía una versión actualizada del modelo con cambios en la geometría. Sin las herramientas de actualización, tendrías que empezar desde cero con la nueva versión.

La función principal es 'Update Model' (Actualizar modelo), disponible en el plugin de sincronización o en el menú de D5 Render. Cuando usas esta función, D5 Render compara el modelo antiguo con el nuevo y actualiza solo la geometría que ha cambiado. Los materiales que ya asignaste se mantienen en los objetos que no cambiaron, y los objetos nuevos reciben los materiales por defecto de la importación.

Para modelos importados manualmente (FBX, OBJ), el proceso es ligeramente diferente. D5 Render permite reemplazar un modelo existente por uno nuevo usando la función 'Replace Model' en el menú contextual del objeto. Esta función mantiene la posición, rotación y escala del objeto original mientras reemplaza la geometría. Sin embargo, los materiales se reemplazan con los del nuevo modelo, por lo que puede que necesites reasignar algunos.

Es importante entender cómo D5 Render maneja los cambios específicos. Si un muro se mueve de posición, D5 Render lo actualiza correctamente. Si se agrega un nuevo muro, aparece en la escena. Si se elimina un muro, D5 Render lo elimina de la escena. Sin embargo, si un muro existente se divide en dos objetos, D5 Render puede no reconocer la relación y tratar los dos muros nuevos como objetos diferentes, perdiendo el material personalizado del muro original.

Para minimizar problemas, sigue estas mejores prácticas: mantén los nombres de los objetos consistentes entre versiones del modelo (no renombres objetos arbitrariamente), evita reorganizar la jerarquía de grupos y componentes innecesariamente, y usa capas con nombres fijos. Si haces cambios mayores en la estructura del modelo, puede ser más eficiente volver a importar y reasignar materiales que intentar actualizar.

Otra función útil es la importación selectiva. En lugar de actualizar todo el modelo, puedes importar solo los elementos nuevos o modificados como objetos separados. Esto te da más control sobre qué se cambia y qué se mantiene, aunque requiere más trabajo manual.`,
  keyPoints: [
    "'Update Model' actualiza geometría sin perder materiales ya asignados",
    "Funciona mejor con plugins de sincronización (SketchUp, Rhino, Revit)",
    "Para FBX/OBJ, usar 'Replace Model' que reemplaza geometría pero pierde materiales",
    "Mantener nombres de objetos consistentes entre versiones del modelo",
    "Cambios mayores en estructura pueden requerir reimportación completa",
    "Importación selectiva: importar solo elementos nuevos como objetos separados",
  ],
  steps: [
    {
      title: "Preparar el modelo original",
      description: "Importa un modelo a D5 Render y asígnale varios materiales personalizados (al menos 5). Configura algo de iluminación y vegetación. Toma nota de los materiales que asignaste para verificarlos después.",
    },
    {
      title: "Modificar el modelo en el software de modelado",
      description: "En tu software de modelado, haz cambios en el modelo: mueve un muro, agrega un objeto nuevo, elimina un objeto existente. No cambies los nombres de los objetos existentes.",
    },
    {
      title: "Actualizar el modelo en D5 Render",
      description: "Usa la función 'Update Model' desde el plugin de sincronización. Observa el progreso de la actualización y verifica que los cambios se reflejan en la escena.",
    },
    {
      title: "Verificar la integridad de los materiales",
      description: "Revisa los materiales de los objetos que no cambiaron. ¿Se preservaron los materiales personalizados? Revisa los objetos nuevos. ¿Tienen materiales por defecto? Identifica cualquier pérdida de material y reasigna según sea necesario.",
      tip: "Si perdiste materiales, verifica los nombres de los objetos en el modelo original vs el actualizado. Los cambios de nombre causan pérdida de materiales.",
    },
  ],
  practice: "Realiza al menos 3 ciclos de actualización de un modelo, haciendo cambios diferentes cada vez (agregar, eliminar, mover objetos). Documenta qué tipos de cambios se manejan bien y cuáles causan problemas con los materiales.",
  extraResources: [
    { label: "Actualización de modelos en D5 Render", url: "https://www.d5render.com/help/update-model" },
  ],
});

register({
  moduleId: "modulo-2",
  topicIndex: 5,
  title: "Asignación básica de materiales al importar",
  objective: "Entender cómo D5 Render asigna materiales automáticamente al importar modelos y cómo mejorar esta asignación inicial para obtener mejores resultados desde el primer momento.",
  explanation: `Cuando importas un modelo a D5 Render, el software realiza una conversión automática de los materiales del modelo original a su sistema de materiales PBR. Entender cómo funciona esta conversión te permitirá prepara mejor tus modelos para obtener resultados más cercanos al deseado desde el primer momento, reduciendo el trabajo manual posterior.

La conversión de materiales depende del formato de importación y del software de origen. En general, D5 Render convierte cada material del modelo original en un material PBR de D5 Render, intentando preservar las propiedades visuales lo más fielmente posible. Sin embargo, como los sistemas de materiales varían enormemente entre software, la conversión nunca es perfecta.

Los colores sólidos (difusos) se convierten bastante bien. Si tienes un material rojo en SketchUp, D5 Render creará un material PBR con color base rojo, rugosidad media y sin metalicidad. El resultado será un material de aspecto plástico que, aunque no es fotorrealista, es un buen punto de partida.

Las texturas de mapa difuso (color) también se convierten bien. Si tu material en el software de modelado tiene una imagen de textura para el color, D5 Render la importará y la usará como mapa base del material PBR. Esto funciona especialmente bien para materiales como ladrillo, concreto y madera donde el patrón de color es la característica principal.

Los materiales transparentes se convierten en materiales de vidrio de D5 Render con la transparencia correspondiente. Sin embargo, los ajustes finos (índice de refracción, rugosidad del vidrio, color tintado) no se transfieren y deberás ajustarlos manualmente.

Los materiales reflectivos o metálicos son los que más problemas presentan en la conversión automática. SketchUp no tiene un concepto nativo de metalicidad o rugosidad, por lo que D5 Render no puede saber si un material gris debería ser un metal pulido, un metal cepillado o simplemente una superficie pintada de gris. Por defecto, D5 Render asume que son materiales no metálicos, lo que es correcto la mayoría de las veces pero falla con metales reales.

Para mejorar los resultados de la importación, hay estrategias que puedes aplicar en el software de modelado antes de exportar. Usa nombres descriptivos para los materiales (ej: 'Metal_Brass', 'Glass_Clear', 'Wood_Oak') ya que D5 Render puede usar estos nombres para hacer una mejor asignación automática. En SketchUp, aplica colores y texturas con intención: un material que debería ser vidrio debería ser semi-transparente en SketchUp para que D5 Render lo detecte como tal.

Después de importar, el flujo de trabajo típico es revisar cada material en D5 Render, identificar los que necesitan mejoras (metales, vidrios, materiales translúcidos) y reasignarlos usando materiales de la biblioteca de D5 Render o creando materiales PBR personalizados con los mapas apropiados.`,
  keyPoints: [
    "D5 Render convierte automáticamente materiales del modelo a materiales PBR",
    "Colores sólidos y texturas difusas se convierten razonablemente bien",
    "Metales y materiales reflectivos NO se detectan automáticamente",
    "Vidrios se convierten pero sin ajustes finos (refracción, rugosidad)",
    "Usar nombres descriptivos de materiales ayuda a la asignación automática",
    "Revisar y mejorar materiales manualmente después de importar es el flujo normal",
  ],
  steps: [
    {
      title: "Preparar materiales en el modelo original",
      description: "En tu software de modelado, renombra los materiales con nombres descriptivos: 'Glass_Clear', 'Metal_Steel', 'Wood_Oak', 'Concrete_Gray'. Aplica transparencia a los materiales que deberían ser vidrio.",
      tip: "Esta convención de nombres te ahorrará mucho tiempo al identificar materiales después de importar.",
    },
    {
      title: "Importar y revisar materiales automáticos",
      description: "Importa el modelo a D5 Render y revisa cada material en el panel de Propiedades. Identifica cuáles se ven correctos y cuáles necesitan ajustes. Presta especial atención a metales, vidrios y materiales reflectivos.",
    },
    {
      title: "Mejorar materiales problemáticos",
      description: "Para cada material que necesita ajustes: selecciona el objeto, ve al panel de Propiedades > Material, y ajusta los parámetros PBR (metalicidad, rugosidad, color base). O reemplaza el material con uno de la biblioteca de D5 Render.",
    },
    {
      title: "Guardar la sesión de materiales",
      description: "Después de mejorar todos los materiales, guarda el proyecto. Si usas sincronización con plugin, los materiales se mantendrán en futuras actualizaciones del modelo.",
    },
  ],
  practice: "Importa un modelo con al menos 10 materiales diferentes. Mejora cada material manualmente hasta obtener un resultado visualmente satisfactorio. Toma capturas de antes y después para cada material.",
  extraResources: [
    { label: "Materiales PBR en D5 Render", url: "https://www.d5render.com/help/materials" },
    { label: "Conversión de materiales al importar", url: "https://www.d5render.com/help/material-conversion" },
  ],
});

// ============================================================
// MÓDULO 3: Iluminación
// ============================================================

register({
  moduleId: "modulo-3",
  topicIndex: 0,
  title: "Iluminación natural: Sol y cielo",
  objective: "Dominar la configuración de la iluminación natural en D5 Render, incluyendo la posición del sol, la intensidad, el color de la luz y la configuración del cielo para crear ambientes diurnos realistas.",
  explanation: `La iluminación natural es la base de cualquier escena arquitectónica y D5 Render ofrece un sistema de sol y cielo muy completo que permite simular condiciones de iluminación diurna con gran realismo. Gracias al ray tracing en tiempo real, puedes ver los cambios de iluminación instantáneamente mientras ajustas los parámetros, lo que facilita enormemente encontrar la configuración perfecta.

El sistema de sol de D5 Render simula una luz direccional que emite rayos paralelos, replicando cómo la luz solar llega a la Tierra. La posición del sol se controla mediante dos parámetros principales: la altitud (ángulo sobre el horizonte) y el azimut (dirección horizontal). La altitud determina la hora del día: valores bajos representan el amanecer o atardecer, valores altos representan el mediodía. El azimut determina la dirección de la luz: desde dónde viene el sol.

La intensidad del sol se mide en lux y D5 Render ajusta automáticamente la intensidad según la posición del sol, simulando la atmósfera real. Al mediodía, la luz es más intensa y blanca; al amanecer y atardecer, es más suave y cálida (tonos naranjas y rojos). Puedes ajustar manualmente la intensidad con un multiplicador si necesitas compensar para escenas específicas.

El sistema de cielo trabaja en conjunto con el sol. D5 Render genera proceduralmente un cielo que responde a la posición del sol: cielo azul al mediodía, tonos cálidos al atardecer, y cielo oscuro de noche. El cielo también funciona como fuente de iluminación ambiental, proporcionando luz indirecta que llena las sombras y evita que las áreas no iluminadas por el sol directo queden completamente negras.

Las sombras generadas por el sol son un aspecto crucial. D5 Render calcula sombras de ray tracing en tiempo real, lo que significa que las sombras son precisas y se suavizan naturalmente según la distancia al objeto que las proyecta. Las sombras duras y definidas cerca del objeto se difuminan gradualmente a medida que se alejan, simulando la penumbra real.

Para configurar la iluminación natural, selecciona el sol en el panel de Escena o haz clic en la esfera solar que aparece en la escena. Los controles del sol aparecen en el panel de Propiedades a la derecha. Aquí puedes ajustar la hora, la dirección, la intensidad y el color de la luz solar, así como los parámetros del cielo.

Un truco profesional es usar la geolocalización para posicionar el sol exactamente como estaría en la ubicación real del proyecto. D5 Render permite ingresar coordenadas de latitud y longitud, así como la fecha específica, para calcular la posición solar precisa. Esto es invaluable para estudios de asoleamiento y para presentar renders que reflejen las condiciones reales del sitio.`,
  keyPoints: [
    "El sol se controla con altitud (hora) y azimut (dirección)",
    "La intensidad se ajusta automáticamente según la posición del sol",
    "El cielo procedural responde a la posición del sol y aporta luz ambiental",
    "Sombras de ray tracing: duras cerca del objeto, suaves a distancia",
    "Geolocalización permite simular la posición solar real del sitio del proyecto",
    "Los cambios de iluminación se ven en tiempo real gracias al ray tracing",
  ],
  steps: [
    {
      title: "Abrir un proyecto y localizar el sol",
      description: "Abre un proyecto en D5 Render. Busca la esfera solar en la escena (generalmente visible en el cielo) y haz clic en ella. Los controles del sol aparecerán en el panel de Propiedades a la derecha.",
    },
    {
      title: "Ajustar la hora del día",
      description: "Usa el control deslizante de altitud del sol para cambiar la hora del día. Observa cómo cambia la iluminación en tiempo real: las sombras se mueven, la intensidad varía y el color de la luz pasa de cálido (amanecer/atardecer) a neutro (mediodía).",
      tip: "Prueba la regla de los 'golden hours': la primera y última hora de luz solar dan los renders más atractivos.",
    },
    {
      title: "Cambiar la dirección del sol",
      description: "Ajusta el azimut del sol para cambiar la dirección de la luz. Observa cómo las fachadas del edificio cambian de iluminadas a sombreadas. Busca la dirección que mejor resalte la arquitectura del proyecto.",
    },
    {
      title: "Configurar la geolocalización",
      description: "En los ajustes del sol, activa la geolocalización e ingresa las coordenadas de tu proyecto. Selecciona la fecha y hora deseadas. Verifica que la posición del sol corresponde a la ubicación real.",
    },
    {
      title: "Ajustar parámetros del cielo",
      description: "Explora los ajustes del cielo: nubosidad, turbidez atmosférica, y color. Un cielo despejado produce sombras definidas; un cielo nublado produce iluminación difusa sin sombras marcadas.",
    },
  ],
  practice: "Configura la iluminación natural de un proyecto para tres momentos del día: amanecer (7:00), mediodía (12:00) y atardecer (18:00). Usa la geolocalización de tu ciudad. Haz renders de cada momento y compáralos.",
  extraResources: [
    { label: "Iluminación natural en D5 Render", url: "https://www.d5render.com/help/natural-lighting" },
    { label: "Geolocalización y estudios solares", url: "https://www.d5render.com/blog/sun-study" },
  ],
});

register({
  moduleId: "modulo-3",
  topicIndex: 1,
  title: "Uso de HDRI para iluminación ambiental",
  objective: "Aprender a utilizar mapas HDRI como fuente de iluminación y fondo de escena, creando ambientes realistas con iluminación basada en imágenes del mundo real.",
  explanation: `Los mapas HDRI (High Dynamic Range Image) son una herramienta poderosa para crear iluminación ambiental realista en D5 Render. Un HDRI es una imagen esférica de 360 grados que captura la totalidad de la iluminación de un entorno real, incluyendo la intensidad completa de la luz del sol y las sombras, algo que las imágenes normales (LDR) no pueden representar.

Cuando usas un HDRI en D5 Render, la imagen se despliega como un esfera que rodea tu escena, cumpliendo dos funciones simultáneas: sirve como fondo visible (skybox) y como fuente de iluminación. Cada píxel del HDRI emite luz con la intensidad y color correspondientes, lo que significa que un píxel blanco brillante (el sol) emitirá mucha luz cálida, mientras que un píxel azul (el cielo) emitirá luz suave y fría. El resultado es una iluminación extremadamente natural que sería muy difícil de replicar manualmente con luces individuales.

Para activar un HDRI en D5 Render, ve al panel de iluminación y selecciona la opción de HDRI en lugar del sol procedural. D5 Render incluye una biblioteca de HDRIs predeterminados con diferentes condiciones: días soleados, atardeceres, días nublados, noches estrelladas, interiores, etc. También puedes importar tus propios archivos HDRI en formato .hdr o .exr.

La orientación del HDRI es importante porque determina de dónde viene la luz principal (el sol). D5 Render te permite rotar el HDRI horizontalmente para cambiar la dirección de la luz sin modificar la posición de la cámara. También puedes ajustar la exposición del HDRI para controlar la intensidad general de la iluminación.

Una ventaja clave de los HDRIs es la variedad de ambientes que ofrecen. Puedes cambiar completamente el mood de una escena simplemente reemplazando el HDRI: un HDRI de atardecer dará un ambiente cálido y dramático, mientras que un HDRI de día nublado dará una iluminación suave y uniforme ideal para mostrar detalles de la arquitectura.

Los HDRIs también son muy útiles para reflexiones. Cuando un material reflectivo (como vidrio o metal pulido) refleja el entorno, el HDRI proporciona una imagen realista para reflejar en lugar de un cielo procedural. Esto mejora enormemente la credibilidad de los renders, especialmente en primeros planos de materiales reflectivos.

Para obtener los mejores resultados, elige HDRIs de alta resolución (8K o superior) cuando el cielo sea visible en la imagen final, ya que las resoluciones bajas pueden verse pixeladas en el fondo. Si el cielo no es visible y solo usas el HDRI como fuente de luz, la resolución es menos importante.`,
  keyPoints: [
    "HDRI = imagen 360° de alto rango dinámico que ilumina la escena",
    "Funciona como fondo visible Y como fuente de iluminación simultáneamente",
    "D5 Render incluye biblioteca de HDRIs + soporte para HDRIs personalizados",
    "La rotación del HDRI controla la dirección de la luz principal",
    "Ajustar exposición del HDRI controla la intensidad de toda la iluminación",
    "HDRIs de alta resolución (8K+) para fondos visibles, menor resolución si solo ilumina",
  ],
  steps: [
    {
      title: "Activar el modo HDRI",
      description: "Abre un proyecto en D5 Render y ve al panel de iluminación. Cambia del modo Sol procedural al modo HDRI. La escena se oscurecerá momentáneamente hasta que selecciones un HDRI.",
    },
    {
      title: "Explorar la biblioteca de HDRIs",
      description: "Abre la biblioteca de HDRIs de D5 Render y previsualiza los diferentes mapas disponibles. Selecciona un HDRI de día soleado y observa cómo cambia la iluminación de la escena en tiempo real.",
      tip: "Pasa el ratón sobre los HDRIs para ver una vista previa antes de seleccionarlos.",
    },
    {
      title: "Ajustar la orientación del HDRI",
      description: "Usa el control de rotación del HDRI para cambiar la dirección de la luz. Busca la orientación que mejor ilumine la fachada principal de tu proyecto. Observa cómo las sombras y las reflexiones cambian con la rotación.",
    },
    {
      title: "Experimentar con diferentes ambientes",
      description: "Prueba al menos 3 HDRIs diferentes (soleado, nublado, atardecer) y observa cómo cambia completamente el ambiente de la escena. Toma nota de cuál funciona mejor para tu tipo de proyecto.",
    },
    {
      title: "Ajustar la exposición del HDRI",
      description: "Modifica la exposición del HDRI para controlar la intensidad de la iluminación. Valores más altos iluminan más la escena, valores más bajos la oscurecen. Encuentra el equilibrio que muestre bien los interiores sin quemar los exteriores.",
    },
  ],
  practice: "Configura la iluminación de un proyecto usando 3 HDRIs diferentes. Para cada uno, ajusta la orientación y exposición. Haz un render con cada configuración y explica cuál prefieres y por qué.",
  extraResources: [
    { label: "HDRIs en D5 Render", url: "https://www.d5render.com/help/hdri" },
    { label: "Biblioteca HDRI gratuita (Poly Haven)", url: "https://polyhaven.com/hdris" },
    { label: "No emulador HDRI", url: "https://polyhaven.com" },
  ],
});

register({
  moduleId: "modulo-3",
  topicIndex: 2,
  title: "Iluminación artificial: luces puntuales, spots y áreas",
  objective: "Dominar los diferentes tipos de luces artificiales en D5 Render (puntuales, spots y de área) y saber cuándo y cómo usar cada una para crear iluminación artificial realista.",
  explanation: `La iluminación artificial es esencial para escenas de interior y para complementar la iluminación natural en escenas de exterior nocturnas. D5 Render ofrece varios tipos de luces artificiales que simulan las fuentes de luz del mundo real, cada una con características y usos específicos.

Las luces puntuales (Point Lights) emiten luz en todas las direcciones desde un punto único, similar a una bombilla sin pantalla. Son las más simples y se usan para iluminación general de ambientes, lámparas de techo y cualquier fuente de luz omnidireccional. Tienen parámetros de intensidad (lumen), color de luz (temperatura en Kelvin), y radio de influencia. La temperatura de color es especialmente importante: 2700K es una luz cálida (bombilla incandescente), 4000K es neutra (fluorescente), y 6500K es fría (luz de día artificial).

Los spots (Spot Lights) emiten luz en forma de cono direccionado, similar a un foco o reflector. Son ideales para resaltar elementos específicos, crear dramatismo o simular lámparas direccionales. Los spots tienen parámetros adicionales: ángulo del cono (inner/outer angle) que controla la apertura del haz de luz, y la distancia máxima de alcance. Un ángulo estrecho crea un haz concentrado (como un foco de museo), mientras que un ángulo amplio ilumina un área mayor (como un downlight).

Las luces de área (Area Lights) emiten luz desde una superficie rectangular, simulando paneles LED, ventanas iluminadas, pantallas de luz o luminarias lineales. Son las más realistas para iluminación de interiores porque las fuentes de luz reales raramente son puntos infinitesimales. Las luces de área producen sombras más suaves y naturales que las puntuales, y su tamaño afecta directamente la suavidad de las sombras: a mayor área, sombras más difusas.

Para agregar una luz en D5 Render, puedes usar la barra de herramientas de iluminación o hacer clic derecho en la escena y seleccionar 'Add Light'. También puedes usar el atajo de teclado correspondiente. Una vez colocada, selecciona la luz y ajusta sus parámetros en el panel de Propiedades.

La intensidad de las luces se mide en lumen o candelas según el tipo. Es importante usar valores realistas: una bombilla doméstica emite unos 800 lumen, un panel LED de techo puede emitir 3000-5000 lumen, y un foco profesional puede llegar a 10000+ lumen. Usar valores exagerados resultará en iluminación irreal y zonas quemadas.

El color de la luz es otro parámetro crucial. D5 Render permite seleccionar la temperatura de color en Kelvin o elegir un color personalizado. Para escenas de interior residencial, se recomiendan temperaturas cálidas (2700-3000K). Para oficinas y espacios comerciales, temperaturas neutras (4000K). Para escenas que mezclan luz natural y artificial, puede ser necesario equilibrar las temperaturas para que la luz artificial no contraste demasiado con la natural.`,
  keyPoints: [
    "Luces puntuales: omnidireccionales, para iluminación general y bombillas",
    "Spots: haz cónico direccional, para resaltar elementos y focalizar",
    "Luces de área: superficie emisora, las más realistas para interiores",
    "Intensidad en lumen: usar valores realistas (800 lumen = bombilla doméstica)",
    "Temperatura de color: 2700K cálida, 4000K neutra, 6500K fría",
    "Luces de área producen sombras más suaves y naturales",
  ],
  steps: [
    {
      title: "Agregar una luz puntual",
      description: "En un proyecto de interior, agrega una luz puntual en el centro del techo de una habitación. Ajusta la intensidad a 3000 lumen y la temperatura a 3000K. Observa cómo la luz ilumina uniformemente el espacio en todas direcciones.",
    },
    {
      title: "Agregar un spot",
      description: "Agrega un spot dirigido hacia una pared o un objeto específico (una obra de arte, una planta). Ajusta el ángulo del cono a 30 grados y la intensidad a 2000 lumen. Observa cómo el haz de luz crea un efecto dramático concentrado.",
      tip: "Usa spots con ángulo estrecho (15-25°) para acentuar y ángulo amplio (45-60°) para iluminación general dirigida.",
    },
    {
      title: "Agregar una luz de área",
      description: "Coloca una luz de área en el techo, configurándola con dimensiones similares a un panel LED real (60x60cm). Ajusta la intensidad a 5000 lumen y temperatura a 4000K. Compara la suavidad de las sombras con la luz puntual.",
    },
    {
      title: "Combinar diferentes tipos de luces",
      description: "Crea una iluminación de tres puntos para una escena de interior: una luz de área principal en el techo, un spot acentuando un elemento decorativo, y una luz puntual suave rellenando las zonas oscuras. Ajusta las intensidades para crear un equilibrio.",
    },
    {
      title: "Experimentar con temperatura de color",
      description: "Cambia la temperatura de color de las luces y observa cómo afecta el ambiente de la escena. Prueba configuraciones cálidas (2700K), neutras (4000K) y frías (6500K). Nota cómo la temperatura influye en la percepción del espacio.",
    },
  ],
  practice: "Crea una escena de interior con al menos 5 luces artificiales de diferentes tipos. Documenta tu esquema de iluminación indicando el tipo, posición, intensidad y temperatura de cada luz. Explica por qué elegiste cada una.",
  extraResources: [
    { label: "Luces artificiales en D5 Render", url: "https://www.d5render.com/help/artificial-lighting" },
    { label: "Temperaturas de color de referencia", url: "https://www.d5render.com/blog/light-temperature" },
  ],
});

register({
  moduleId: "modulo-3",
  topicIndex: 3,
  title: "Luz volumétrica y rayos de sol (God rays)",
  objective: "Aprender a crear efectos de luz volumétrica y rayos de sol visibles (God rays) en D5 Render para añadir dramatismo y atmósfera a las escenas.",
  explanation: `La luz volumétrica es uno de los efectos más impactantes visualmente en el renderizado arquitectónico. Simula cómo la luz se hace visible al interactuar con partículas en el aire (polvo, humo, niebla), creando haces de luz visibles que atraviesan ventanas, claraboyas y aberturas. Este efecto, conocido popularmente como 'God rays' (rayos de Dios) o crepusculares, puede transformar una escena ordinaria en una imagen dramática y evocadora.

En el mundo real, la luz volumétrica ocurre cuando los rayos de sol pasan a través de aberturas y encuentran partículas en suspensión en el aire. El polvo, la humedad y la contaminación dispersan la luz, haciéndola visible desde los ángulos laterales. Este fenómeno es especialmente notable en iglesias con ventanas altas, bosques con copas densas, y espacios interiores con ventanas y atmósfera con polvo.

D5 Render implementa la luz volumétrica como un efecto que se activa en la configuración del sol o de las luces artificiales. Para activarlo, selecciona el sol y en el panel de Propiedades busca la opción 'Volumetric Light' o 'God Rays'. Activa la casilla y ajusta los parámetros: intensidad (qué tan visible es el haz), dispersión (cuánto se esparce la luz), y color (generalmente sigue el color de la fuente de luz).

El efecto funciona mejor en condiciones específicas. Necesitas una fuente de luz fuerte (el sol o un spot potente), una abertura por donde pase la luz (ventana, puerta, claraboya), y algo de atmósfera para que la luz interactue. Si tu escena tiene aire completamente limpio, el efecto será mínimo; si añades algo de niebla o polvo, los rayos serán más visibles.

La intensidad del efecto debe ajustarse con cuidado. Un valor demasiado bajo hará que los rayos apenas se perciban, mientras que un valor demasiado alto creará un efecto artificial y exagerado. La clave es la sutileza: los God rays más efectivos son los que el espectador nota inconscientemente, no los que dominan la imagen.

Los God rays también funcionan con luces artificiales. Puedes crear efectos de luz volumétrica con spots apuntando a través de aberturas o hacia el espectador. Esto es útil para escenas nocturnas donde quieres crear atmosfera con iluminación artificial, como un teatro con haces de luz cruzando el humo.

Para mejorar el efecto, puedes combinarlo con la configuración de atmósfera de D5 Render. Añadir algo de niebla o neblina aumentará la visibilidad de los rayos. También puedes usar partículas de polvo o humo de la biblioteca de assets para crear puntos de dispersión locales.`,
  keyPoints: [
    "La luz volumétrica simula la visibilidad de la luz al interactuar con partículas en el aire",
    "Se activa en las propiedades del sol o de las luces artificiales",
    "Funciona mejor con: luz fuerte + abertura + atmósfera (polvo/niebla)",
    "Los parámetros principales son: intensidad, dispersión y color",
    "La sutileza es clave: efectos exagerados parecen artificiales",
    "También funciona con luces artificiales para escenas nocturnas",
  ],
  steps: [
    {
      title: "Preparar la escena",
      description: "Abre o crea un proyecto con un espacio interior que tenga ventanas o claraboyas. Asegúrate de que la luz del sol pueda entrar por las aberturas. Un espacio con ventanas altas funciona ideal.",
    },
    {
      title: "Activar la luz volumétrica",
      description: "Selecciona el sol en la escena y ve al panel de Propiedades. Busca la opción 'Volumetric Light' y actívala. Ajusta la intensidad a un valor medio (0.5) como punto de partida.",
    },
    {
      title: "Ajustar la posición del sol",
      description: "Posiciona el sol de modo que sus rayos pasen directamente por las ventanas. La altitud debe ser baja a media (amanecer/atardecer o primeras horas de la mañana) para que los rayos entren horizontalmente por las ventanas.",
      tip: "Los God rays más espectaculares se logran con el sol bajo, cuando los rayos entran casi horizontalmente.",
    },
    {
      title: "Ajustar la intensidad del efecto",
      description: "Incrementa gradualmente la intensidad del volumen de luz. Busca el punto donde los rayos son claramente visibles pero no abruman la imagen. Normalmente, valores entre 0.3 y 0.7 funcionan bien.",
    },
    {
      title: "Añadir atmósfera adicional",
      description: "Si los rayos son demasiado sutiles, añade algo de niebla o neblina en la configuración de atmósfera de D5 Render. Esto aumentará la dispersión y hará los rayos más visibles sin necesidad de subir demasiado la intensidad del efecto.",
    },
  ],
  practice: "Crea una escena interior con luz volumétrica entrando por ventanas. Haz 3 renders con diferentes intensidades del efecto (sutil, medio, intenso) y explica cuál prefieres y por qué.",
  extraResources: [
    { label: "Luz volumétrica en D5 Render", url: "https://www.d5render.com/help/volumetric-light" },
    { label: "Tutorial God Rays", url: "https://www.d5render.com/blog/god-rays" },
  ],
});

register({
  moduleId: "modulo-3",
  topicIndex: 4,
  title: "Configuración de sombras y suavizado",
  objective: "Entender y dominar la configuración de sombras en D5 Render, incluyendo el suavizado de sombras, la calidad de las sombras de ray tracing y cómo optimizarlas para diferentes situaciones.",
  explanation: `Las sombras son uno de los elementos más importantes para el realismo en un render. Proporcionan información sobre la posición relativa de los objetos, la dirección de la luz y la profundidad del espacio. D5 Render calcula sombras mediante ray tracing, lo que produce resultados físicamente precisos, pero es importante entender los parámetros disponibles para obtener el mejor resultado en cada situación.

El tipo de sombra más realista en D5 Render es la sombra de ray tracing. A diferencia de las sombras de mapa (shadow maps) que usan algunos motores más antiguos, las sombras de ray tracing calculan la trayectoria real de cada rayo de luz, produciendo sombras precisas con penumbra natural. La penumbra es la zona de transición entre la sombra completa y la luz completa, y ocurre naturalmente porque las fuentes de luz reales tienen un tamaño finito, no son puntos infinitesimales.

El suavizado de sombras depende directamente del tamaño de la fuente de luz. Una luz puntual (teóricamente un punto infinitesimal) produce sombras completamente duras y definidas. Una luz de área grande produce sombras suaves con una penumbra amplia. El sol, aunque es enorme, está tan lejos que actúa como una fuente de luz pequeña, produciendo sombras relativamente duras con una penumbra muy sutil. Entender esta relación te permitirá elegir el tipo de luz adecuado para cada efecto de sombra deseado.

D5 Render ofrece ajustes de calidad de sombras que controlan cuántos rayos se trazan para calcular cada sombra. Mayor calidad significa sombras más suaves y sin ruido, pero también mayor uso de VRAM y potencialmente menor rendimiento del viewport. En la configuración de renderizado, puedes elegir entre diferentes niveles de calidad de sombras.

Para sombras de sol (luz natural), la configuración por defecto suele ser adecuada. El sol produce sombras definidas que se suavizan ligeramente con la distancia. Si necesitas sombras más suaves, puedes aumentar el tamaño del sol en los ajustes, lo que simula un sol más grande (como en días ligeramente nublados) y produce una penumbra más ancha.

Para sombras de luces artificiales, el resultado depende completamente del tipo de luz. Las luces puntuales producen sombras duras, los spots producen sombras con penumbra según el ángulo del cono, y las luces de área producen las sombras más suaves y realistas. Para interiores realistas, se recomienda usar luces de área siempre que sea posible.

Un problema común es el ruido en las sombras, especialmente en áreas de penumbra compleja. D5 Render incluye un Denoiser que ayuda a eliminar este ruido en el render final. El Denoiser analiza la imagen y suaviza el ruido sin perder detalles importantes. Se puede activar o desactivar según preferencia, aunque generalmente se recomienda mantenerlo activado para renders finales.`,
  keyPoints: [
    "Las sombras de ray tracing son físicamente precisas con penumbra natural",
    "El tamaño de la fuente de luz determina la suavidad de las sombras",
    "Luz puntual = sombras duras / Luz de área = sombras suaves",
    "El sol produce sombras relativamente duras (fuente pequeña lejana)",
    "El Denoiser elimina ruido en sombras de penumbra compleja",
    "Mayor calidad de sombras = más VRAM y menor rendimiento",
  ],
  steps: [
    {
      title: "Observar sombras de sol",
      description: "Abre un proyecto exterior y ajusta la posición del sol. Observa cómo las sombras cambian de dirección y longitud. Nota que las sombras del sol son relativamente duras cerca de los objetos y se suavizan ligeramente con la distancia.",
    },
    {
      title: "Comparar tipos de luces y sus sombras",
      description: "En una escena de interior, coloca tres luces diferentes (puntual, spot, área) y compara las sombras que produce cada una. La luz puntual dará sombras duras, el spot sombras con penumbra direccional, y la luz de área sombras suaves.",
      tip: "Para la iluminación de interior más realista, las luces de área son siempre la mejor opción.",
    },
    {
      title: "Ajustar el tamaño del sol",
      description: "En los ajustes del sol, aumenta el parámetro de tamaño del sol. Observa cómo las sombras se vuelven más suaves a medida que el sol 'crece'. Un sol más grande simula un día ligeramente nublado.",
    },
    {
      title: "Probar el Denoiser",
      description: "Haz un render con el Denoiser activado y otro desactivado. Compara los resultados, especialmente en las zonas de penumbra y sombras suaves. El Denoiser debería eliminar el ruido sin perder detalles de la sombra.",
    },
  ],
  practice: "Crea una escena con diferentes tipos de sombras (sol directo, luz puntual, spot, luz de área). Haz renders comparativos y explica las diferencias visuales entre cada tipo de sombra.",
  extraResources: [
    { label: "Configuración de sombras en D5 Render", url: "https://www.d5render.com/help/shadows" },
  ],
});

register({
  moduleId: "modulo-3",
  topicIndex: 5,
  title: "Geolocalización y hora del día",
  objective: "Aprender a usar la geolocalización en D5 Render para simular condiciones de iluminación solar precisas según la ubicación real del proyecto y la fecha/hora específica.",
  explanation: `La geolocalización es una funcionalidad avanzada de D5 Render que permite posicionar el sol exactamente donde estaría en una ubicación geográfica real, en una fecha y hora específicas. Esto es fundamental para estudios de asoleamiento, análisis de sombras y para producir renders que representen fielmente las condiciones de iluminación que el edificio experimentará en la realidad.

La posición del sol en el cielo depende de tres factores: la latitud del lugar, la fecha del año y la hora del día. En el ecuador, el sol se mantiene bastante alto durante todo el año. En latitudes altas, el sol varía enormemente entre verano (sol alto) e invierno (sol bajo). La geolocalización de D5 Render calcula automáticamente la posición solar correcta basándose en estos parámetros.

Para activar la geolocalización, selecciona el sol en la escena y ve al panel de Propiedades. Busca la sección de geolocalización o ubicación. Aquí puedes ingresar las coordenadas de latitud y longitud manualmente, o buscar la ubicación por nombre de ciudad. D5 Render tiene una base de datos de ciudades principales, pero también puedes obtener las coordenadas de Google Maps y ingresarlas directamente.

Una vez configurada la ubicación, puedes seleccionar la fecha y la hora. D5 Render actualizará instantáneamente la posición del sol según los parámetros ingresados. Esto te permite simular cómo sería la iluminación en cualquier momento del año: el solsticio de verano (máxima altura solar), el solsticio de invierno (mínima altura), o los equinoccios (posiciones intermedias).

El uso más profesional de la geolocalización es el estudio de asoleamiento. Al posicionar el sol correctamente, puedes verificar si una fachada recibe sol directo en determinadas horas, si un edificio vecino proyecta sombras sobre tu proyecto, o si un árbol caducifolio permitiría el paso del sol en invierno. Estos estudios son requisitos comunes en normativas urbanísticas y en presentaciones a clientes.

D5 Render también permite crear animaciones de estudio solar (sun study) que muestran el recorrido del sol durante un día completo. Esta animación es invaluable para presentaciones porque permite al cliente visualizar cómo cambia la iluminación a lo largo del día de manera intuitiva.

Para proyectos en el hemisferio norte, el sol se mueve de este a oeste pasando por el sur. En el hemisferio sur, pasa por el norte. Cerca del ecuador, el sol pasa casi perpendicularmente sobre la cabeza al mediodía. Conocer estos patrones te ayudará a interpretar correctamente los resultados de la geolocalización y a verificar que las sombras tienen sentido.`,
  keyPoints: [
    "La geolocalización calcula la posición solar real según latitud, fecha y hora",
    "Se puede ingresar coordenadas manualmente o buscar por nombre de ciudad",
    "Esencial para estudios de asoleamiento y análisis de sombras reales",
    "Permite simular solsticios, equinoccios y cualquier fecha específica",
    "Se pueden crear animaciones de recorrido solar (sun study)",
    "La dirección del sol varía según el hemisferio (sur en norte, norte en sur)",
  ],
  steps: [
    {
      title: "Activar la geolocalización",
      description: "Selecciona el sol en la escena y ve al panel de Propiedades. Busca la sección de Location o Geolocalización y actívala. Ingresa las coordenadas de tu ciudad o búscala por nombre.",
    },
    {
      title: "Configurar la fecha y hora",
      description: "Selecciona la fecha del solsticio de verano (21 junio hemisferio norte / 21 diciembre hemisferio sur) y ajusta la hora a las 12:00 del mediodía. Observa la posición del sol y las sombras resultantes.",
      tip: "El solsticio de verano es importante porque representa el día con el sol más alto y las sombras más cortas del año.",
    },
    {
      title: "Comparar solsticios",
      description: "Configura la misma hora (12:00) pero cambia la fecha al solsticio de invierno. Compara las sombras: en invierno serán mucho más largas porque el sol está más bajo en el horizonte.",
    },
    {
      title: "Simular un día completo",
      description: "Ajusta la hora progresivamente desde las 6:00 hasta las 18:00 en intervalos de 2 horas. Observa cómo las sombras rotan alrededor del edificio. Toma nota de las horas con mejor iluminación para cada fachada.",
    },
    {
      title: "Crear un sun study (opcional)",
      description: "Si quieres llevar el estudio al siguiente nivel, usa la función de animación de D5 Render para crear un time-lapse del recorrido solar durante un día completo. Esto es muy impresionante para presentaciones a clientes.",
    },
  ],
  practice: "Realiza un estudio de asoleamiento completo para un proyecto: configura la geolocalización de tu ciudad, simula el solsticio de verano y de invierno a las 9:00, 12:00 y 16:00, y documenta las diferencias con capturas de pantalla y análisis.",
  extraResources: [
    { label: "Geolocalización en D5 Render", url: "https://www.d5render.com/help/geolocation" },
    { label: "Sun study animation", url: "https://www.d5render.com/blog/sun-study" },
  ],
});

// ============================================================
// MÓDULO 4: Materiales y Texturas
// ============================================================

register({
  moduleId: "modulo-4",
  topicIndex: 0,
  title: "Editor de materiales: interfaz y propiedades",
  objective: "Dominar la interfaz del editor de materiales de D5 Render, conocer todas las propiedades disponibles y entender cómo afectan al aspecto visual del material.",
  explanation: `El editor de materiales es una de las herramientas más importantes de D5 Render, ya que la calidad de los materiales es frecuentemente lo que diferencia un render mediocre de uno fotorrealista. D5 Render utiliza un sistema de materiales PBR (Physically Based Rendering) que simula cómo la luz interactúa con las superficies reales, produciendo resultados convincentes bajo cualquier condición de iluminación.

Para abrir el editor de materiales, selecciona cualquier objeto en la escena y ve al panel de Propiedades a la derecha. Haz clic en la pestaña de Material. Aquí encontrarás todos los parámetros que controlan el aspecto visual de la superficie del objeto.

La propiedad más fundamental es el Color Base (Base Color o Albedo). Este define el color intrínseco del material sin la influencia de la iluminación o las reflexiones. Puede ser un color sólido o un mapa de textura. Es importante entender que el color base debe representar solo el color del material, no la sombra ni el reflejo, ya que el motor de renderizado se encarga de calcular esos efectos por separado.

La Rugosidad (Roughness) controla qué tan mate o pulida es una superficie. Un valor de 0 produce una superficie perfectamente lisa y reflectante (como un espejo), mientras que un valor de 1 produce una superficie completamente mate (como tiza o concreto sin pulir). La rugosidad afecta directamente cómo se difuminan las reflexiones: superficies rugosas producen reflexiones borrosas, superficies lisas producen reflexiones nítidas.

La Metalicidad (Metallic) es un valor binario en la vida real: un material es metálico o no lo es. Los metales tienen un comportamiento diferente a los no metales: su color base define tanto el color de la superficie como el color de las reflexiones. En D5 Render, el deslizador va de 0 a 1, pero para la mayoría de los materiales deberías usar valores extremos (0 para no metales, 1 para metales puros) ya que valores intermedios raramente existen en la naturaleza.

La Opacidad controla la transparencia del material. Un valor de 1 es completamente opaco, 0 es completamente invisible. Para materiales de vidrio, se usa una combinación de opacidad parcial con transmisión en lugar de solo opacidad, ya que el vidrio real no es simplemente transparente sino que también transmite y refracta la luz.

Otros parámetros importantes incluyen: el Índice de Refracción (IOR) para materiales translúcidos como vidrio y agua, la Transmisión para materiales que dejan pasar la luz (vidrio, plásticos translúcidos), y el mapa Normal que añade detalles superficiales sin modificar la geometría.`,
  keyPoints: [
    "Color Base: color intrínseco del material sin iluminación ni reflexiones",
    "Rugosidad: 0 = espejo perfecto, 1 = superficie completamente mate",
    "Metalicidad: 0 = no metálico, 1 = metálico (usar valores extremos)",
    "Opacidad: 1 = opaco, 0 = invisible (para vidrio usar transmisión)",
    "Mapa Normal: añade detalle superficial sin alterar la geometría",
    "IOR (Índice de Refracción): crítico para vidrio y agua",
  ],
  steps: [
    {
      title: "Seleccionar un objeto y abrir el editor de materiales",
      description: "Haz clic en cualquier objeto de la escena y ve al panel de Propiedades > Material. Familiarízate con la disposición de los controles: cada propiedad tiene un deslizador y un selector de color/textura.",
    },
    {
      title: "Experimentar con el Color Base",
      description: "Cambia el color base de un material y observa cómo cambia el aspecto del objeto. Nota que el color base no afecta las reflexiones ni las sombras, solo el color intrínseco de la superficie.",
    },
    {
      title: "Ajustar la Rugosidad",
      description: "Con un material metálico seleccionado, mueve el deslizador de Rugosidad de 0 a 1. Observa cómo las reflexiones pasan de nítidas (espejo) a completamente difuminadas (metal mate). Prueba valores intermedios para metales cepillados o satinados.",
      tip: "La mayoría de los metales arquitectónicos tienen rugosidad entre 0.2 y 0.5, raramente 0 (espejo perfecto).",
    },
    {
      title: "Probar la Metalicidad",
      description: "Con un material de color gris, alterna la metalicidad entre 0 y 1. Observa cómo el mismo color base produce resultados completamente diferentes: no metálico = superficie pintada, metálico = superficie de metal.",
    },
    {
      title: "Explorar parámetros avanzados",
      description: "Revisa las secciones de Transmisión, IOR, y mapa Normal. No necesitas dominarlos ahora, pero saber que existen te ayudará cuando los necesites en proyectos futuros.",
    },
  ],
  practice: "Selecciona 5 objetos diferentes en una escena y personaliza sus materiales desde cero. Para cada uno, ajusta el color base, rugosidad y metalicidad hasta obtener un resultado convincente. Documenta los valores utilizados.",
  extraResources: [
    { label: "Editor de materiales D5 Render", url: "https://www.d5render.com/help/material-editor" },
    { label: "Guía de materiales PBR", url: "https://learn.microsoft.com/es-es/minecraft/creator/documents/physicallybasedrendering" },
  ],
});

register({
  moduleId: "modulo-4",
  topicIndex: 1,
  title: "Tipos de materiales PBR (metálicos, dieléctricos)",
  objective: "Entender la diferencia fundamental entre materiales metálicos y dieléctricos (no metálicos) en el sistema PBR y cómo configurar cada tipo correctamente.",
  explanation: `En el sistema de renderizado PBR, todos los materiales del mundo real se dividen en dos categorías fundamentales: metálicos y dieléctricos (no metálicos). Esta distinción es crucial porque cada tipo interactúa con la luz de manera completamente diferente, y configurar incorrectamente esta propiedad es uno de los errores más comunes que hacen que los renders parezcan artificiales.

Los materiales dieléctricos son la categoría más amplia e incluye prácticamente todo lo que no es metal: madera, concreto, ladrillo, plástico, tela, piel, papel, cerámica, piedra, pintura, goma, etc. Su característica principal es que absorben y reflejan la luz de manera difusa: la luz penetra ligeramente en la superficie, interactúa con los pigmentos del material (dándole su color), y luego se emite de nuevo en direcciones aleatorias. Las reflexiones en los dieléctricos son siempre del mismo color (blanco neutro) independientemente del color del material, y son relativamente débiles (alrededor del 4% de la luz se refleja directamente).

Los materiales metálicos tienen un comportamiento radicalmente diferente. Los metales conducten electricidad, lo que significa que su superficie refleja la mayor parte de la luz incidente de manera especular (entre 60-95% dependiendo del tipo de metal). A diferencia de los dieléctricos, los metales NO tienen un componente difuso: la luz no penetra en la superficie, por lo que el color que vemos en un metal proviene enteramente de sus reflexiones coloreadas. El oro refleja luz amarilla/dorada, el cobre refleja luz anaranjada/rojiza, y el aluminio refleja luz blanca/neutra.

En D5 Render, la propiedad Metalicidad controla esta distinción. Un valor de 0 (dieléctrico) significa que el material refleja luz blanca débilmente y tiene un componente difuso fuerte. Un valor de 1 (metálico) significa que el material refleja luz intensamente con el color del color base y no tiene componente difuso.

El error más común es usar valores intermedios de metalicidad (como 0.5) pensando que esto crea un 'semi-metal'. En realidad, los materiales semi-metálicos casi no existen en la naturaleza. Si necesitas un metal oxidado o pintado, debes usar capas o texturas: una capa base de metal con metalicidad 1 y una capa de pintura/óxido con metalicidad 0, usando un mapa de metalicidad que defina qué zonas son metálicas y cuáles no.

Otro error común es hacer que los materiales dieléctricos sean demasiado reflectantes. En la realidad, el concreto fresco, la madera sin tratar y la tela no son reflectantes. Si tus paredes de concreto parecen brillantes, probablemente necesitas aumentar la rugosidad a 0.7-0.9.`,
  keyPoints: [
    "Dos categorías PBR: metálicos (metallic=1) y dieléctricos (metallic=0)",
    "Dieléctricos: reflexiones débiles blancas + componente difuso fuerte (madera, concreto, plástico)",
    "Metálicos: reflexiones fuertes coloreadas + sin componente difuso (oro, cobre, acero)",
    "Evitar valores intermedios de metalicidad (0.5) - raramente existen en la naturaleza",
    "Metales oxidados/pintados: usar mapa de metalicidad con zonas 0 y 1",
    "Dieléctricos demasiado reflectantes son un error común - subir rugosidad",
  ],
  steps: [
    {
      title: "Crear un material dieléctrico",
      description: "Selecciona un objeto y crea un material de concreto: color base gris claro, metalicidad 0, rugosidad 0.85. Observa cómo la superficie se ve mate con reflexiones mínimas. Este es el comportamiento correcto de un dieléctrico.",
    },
    {
      title: "Crear un material metálico",
      description: "Selecciona otro objeto y crea un material de acero inoxidable: color base gris claro, metalicidad 1, rugosidad 0.2. Observa cómo las reflexiones son intensas y el color base tiñe las reflexiones.",
      tip: "Para acero inoxidable realista, usa un color base ligeramente azulado (#D4D4D8) en lugar de gris puro.",
    },
    {
      title: "Comparar con el mismo color base",
      description: "Usa exactamente el mismo color base para un material dieléctrico y uno metálico. Observa la enorme diferencia visual que produce cambiar solo la metalicidad. Esto demuestra por qué es tan importante configurar correctamente esta propiedad.",
    },
    {
      title: "Crear materiales metálicos de colores",
      description: "Crea un material de oro (color base dorado #FFD100, metalicidad 1, rugosidad 0.3) y uno de cobre (color base anaranjado #B87333, metalicidad 1, rugosidad 0.35). Observa cómo el color base define el color de las reflexiones metálicas.",
    },
  ],
  practice: "Crea una paleta de 8 materiales PBR correctos: 4 dieléctricos (concreto, madera, plástico blanco, cerámica) y 4 metálicos (acero, oro, cobre, aluminio). Documenta los valores de color base, metalicidad y rugosidad de cada uno.",
  extraResources: [
    { label: "Materiales PBR: metálicos vs dieléctricos", url: "https://www.d5render.com/help/pbr-materials" },
  ],
});

register({
  moduleId: "modulo-4",
  topicIndex: 2,
  title: "Mapas de textura: difuso, normal, rugosidad, metálico",
  objective: "Aprender qué es cada mapa de textura PBR, cómo afecta al material y cómo configurarlos correctamente en D5 Render para crear materiales detallados y realistas.",
  explanation: `Los mapas de textura son imágenes que se aplican a las diferentes propiedades de un material PBR para añadir detalle y variación que sería imposible de lograr con valores uniformes. Mientras que un color sólido da un aspecto plano y uniforme, los mapas de textura permiten simular la variación natural de las superficies reales: las vetas de la madera, las grietas del concreto, las manchas del mármol, etc.

El mapa Difuso (Base Color o Albedo Map) es el mapa más básico y el primero que se aplica. Define el color de cada píxel de la superficie. Cuando ves una textura de ladrillo con ladrillos rojos y mortero gris, estás viendo un mapa difuso. Es importante que el mapa difuso no contenga información de iluminación (sombras, resplandor, reflexiones) ya que el motor de renderizado calcula esos efectos por separado. Un mapa difuso correcto debe verse como la superficie vista con luz plana y uniforme.

El mapa Normal (Normal Map) es quizás el mapa más mágico del sistema PBR. Añade detalle superficial tridimensional sin modificar la geometría del objeto. Funciona alterando la dirección de las normales de la superficie (los vectores que indican hacia dónde apunta cada punto), lo que engaña al motor de renderizado haciéndole creer que hay relieve donde en realidad la superficie es plana. Una textura de ladrillo con mapa normal mostrará ladrillos que parecen sobresalir del muro con sombras en los bordes, pero si miras la geometría de cerca, es completamente plana.

El mapa de Rugosidad (Roughness Map) permite variar la rugosidad de la superficie píxel a píxel. Esto es esencial para materiales que tienen zonas más pulidas y zonas más desgastadas. Por ejemplo, un piso de madera tiene zonas de alto tráfico más pulidas (rugosidad baja) y zonas bajo los muebles más mate (rugosidad alta). El mapa de rugosidad usa escala de grises: blanco = rugoso (mate), negro = liso (reflectante).

El mapa de Metalicidad (Metallic Map) define qué zonas del material son metálicas y cuáles no. Esto es crucial para materiales como metal pintado, metal oxidado o metal con zonas desgastadas donde la pintura se ha caído. El mapa usa escala de grises pero en la práctica solo debe tener valores de 0 (negro, no metálico) o 1 (blanco, metálico), ya que los valores intermedios no existen en materiales reales.

Para aplicar mapas en D5 Render, haz clic en el cuadrado pequeño junto a cada propiedad del material. Esto abre un selector donde puedes elegir un mapa de textura de la biblioteca de D5 Render o importar tu propia imagen. D5 Render soporta los formatos PNG, JPG y TIFF para mapas de textura.

Es importante que todos los mapas de un material tengan la misma resolución y estén alineados correctamente. Si el mapa difuso muestra ladrillos y el mapa normal muestra una textura de concreto, el resultado será incorrecto. Los mapas PBR suelen venir en paquetes coordinados que garantizan la consistencia entre todos los mapas.`,
  keyPoints: [
    "Mapa Difuso: color de cada píxel, sin sombras ni reflejos",
    "Mapa Normal: añade relieve falso sin alterar geometría (el más mágico)",
    "Mapa Rugosidad: blanco=mate, negro=pulido, variación por píxel",
    "Mapa Metalicidad: negro=no metálico, blanco=metálico (solo usar 0 o 1)",
    "Todos los mapas deben estar alineados y tener la misma resolución",
    "Los paquetes PBR coordinados garantizan consistencia entre mapas",
  ],
  steps: [
    {
      title: "Aplicar un mapa difuso",
      description: "Selecciona un muro y abre el editor de materiales. Haz clic en el cuadrado junto a Color Base y elige un mapa de textura de ladrillo de la biblioteca de D5 Render. Observa cómo el muro cambia de un color sólido a una superficie con patrón.",
    },
    {
      title: "Añadir un mapa normal",
      description: "En el mismo material, haz clic en el cuadrado junto a Normal Map y selecciona el mapa normal correspondiente al ladrillo. Observa cómo aparecen sombras en los bordes de los ladrillos y el mortero parece más profundo. Acércate para ver el efecto en detalle.",
      tip: "El mapa normal es el que más impacto tiene en el realismo de un material. Siempre que puedas, úsalo.",
    },
    {
      title: "Aplicar un mapa de rugosidad",
      description: "Añade el mapa de rugosidad correspondiente. Observa cómo las zonas de mortero (más rugosas) se ven más mate y los ladrillos (más lisos) tienen reflexiones más definidas. Este detalle marca la diferencia entre un material plano y uno realista.",
    },
    {
      title: "Añadir un mapa de metalicidad",
      description: "Busca un material que combine zonas metálicas y no metálicas (como metal pintado desgastado). Aplica el mapa de metalicidad y observa cómo las zonas desgastadas (donde se ve el metal) son reflectantes y las zonas pintadas son mate.",
    },
    {
      title: "Descargar un paquete PBR completo",
      description: "Ve a una biblioteca de materiales PBR como Poly Haven y descarga un paquete completo de un material (difuso, normal, rugosidad, metalicidad). Impórtalo en D5 Render y configura todos los mapas para ver el resultado final.",
      tip: "Poly Haven ofrece materiales PBR gratuitos de alta calidad, perfectos para práctica.",
    },
  ],
  practice: "Crea 3 materiales personalizados usando paquetes PBR completos (difuso + normal + rugosidad). Compara el mismo material con y sin mapa normal para ver la diferencia que hace.",
  extraResources: [
    { label: "Biblioteca PBR gratuita (Poly Haven)", url: "https://polyhaven.com/textures" },
    { label: "Mapas PBR en D5 Render", url: "https://www.d5render.com/help/pbr-maps" },
  ],
});

register({
  moduleId: "modulo-4",
  topicIndex: 3,
  title: "Vidrio y materiales translúcidos",
  objective: "Dominar la creación de materiales de vidrio, plásticos translúcidos y otros materiales que transmiten luz, entendiendo los parámetros de transmisión, IOR y absorción.",
  explanation: `Los materiales translúcidos son de los más desafiantes de configurar correctamente en cualquier motor de renderizado, pero también de los más impactantes visualmente cuando se hacen bien. D5 Render ofrece un sistema de transmisión que simula cómo la luz pasa a través de materiales semitransparentes como vidrio, plástico, agua y telas delgadas.

El material de vidrio es el caso más común. A diferencia de otros materiales, el vidrio no es simplemente 'transparente' — refracta la luz (la dobla al pasar), refleja parte de la luz incidente, y en algunos casos absorbe ciertos colores. En D5 Render, para crear un vidrio realista necesitas configurar varias propiedades: opacidad parcial (o usar el modo de transmisión), índice de refracción (IOR), y opcionalmente color de tintado.

El Índice de Refracción (IOR) es un número que define cuánto se dobla la luz al pasar de un medio a otro. El aire tiene un IOR de 1.0, el vidrio estándar tiene un IOR de aproximadamente 1.5, el agua 1.33, y el diamante 2.42. Este parámetro es crucial porque controla cuánto se distorsiona lo que vemos a través del material. Un IOR incorrecto hará que el vidrio parezca irreal.

La Transmisión controla cuánta luz pasa a través del material. A diferencia de la simple opacidad, la transmisión simula físicamente la refracción y la absorción de la luz. Cuando activas la transmisión en D5 Render, el material calcula el camino de los rayos de luz a través del volumen del objeto, produciendo efectos como la distorsión de las imágenes vistas a través del vidrio y las caústicas (patrones de luz concentrada que el vidrio proyecta en superficies cercanas).

Para vidrio arquitectónico estándar (ventanas), la configuración típica es: transmisión activada con valor alto (0.9-1.0), IOR de 1.5, rugosidad muy baja (0.0-0.05), y sin metalicidad. El color base debe ser blanco o muy ligeramente tintado (el vidrio real tiene un ligero tono verde visible en los bordes).

Para vidrio de colores (vidrio esmerilado, vitrales), simplemente cambia el color base del material. El motor de renderizado se encargará de que la luz transmitida tenga el color correspondiente. La intensidad del color controla cuánta luz se absorbe.

Los materiales translúcidos pero no transparentes (como plástico lechoso, alabastro, papel cebolla) usan un parámetro de subsuperficie o translucencia. Estos materiales dejan pasar algo de luz pero no se puede ver a través de ellos claramente. D5 Render configura esto mediante una combinación de opacidad y transmisión con rugosidad media.`,
  keyPoints: [
    "El vidrio requiere transmisión (no solo opacidad) para refracción realista",
    "IOR del vidrio estándar: 1.5 / Agua: 1.33 / Diamante: 2.42",
    "Vidrio arquitectónico: transmisión alta, IOR 1.5, rugosidad ~0, sin metalicidad",
    "El vidrio real tiene un ligero tono verde visible en los bordes",
    "Materiales translúcidos (no transparentes): usar subsuperficie/translucencia",
    "Las caústicas son patrones de luz concentrada que el vidrio proyecta",
  ],
  steps: [
    {
      title: "Crear un vidrio básico",
      description: "Selecciona una ventana o superficie de vidrio. En el editor de materiales: activa la transmisión, ajusta IOR a 1.5, rugosidad a 0.02, metalicidad a 0, color base blanco. Observa cómo la luz pasa y se refracta a través del vidrio.",
    },
    {
      title: "Añadir tintado al vidrio",
      description: "Cambia el color base a un verde muy suave (#F0FFF0) para simular el tintado natural del vidrio. Observa cómo los bordes del vidrio muestran más claramente el color verde, igual que en la realidad.",
      tip: "El efecto de color en los bordes es más visible en vidrios gruesos. Para ventanas delgadas, el tintado será sutil.",
    },
    {
      title: "Crear vidrio esmerilado",
      description: "Aumenta la rugosidad del material de vidrio a 0.3-0.5. Observa cómo el vidrio se vuelve translúcido y difuso, permitiendo pasar la luz pero sin claridad visual. Este efecto es común en baños y oficinas.",
    },
    {
      title: "Crear un plástico translúcido",
      description: "Crea un material con: color base blanco, metalicidad 0, rugosidad 0.3, transmisión parcial (0.5). Este tipo de material simula plásticos como los de las pantallas de lámparas o difusores de luz.",
    },
    {
      title: "Experimentar con IOR",
      description: "Con un material de vidrio seleccionado, cambia el IOR entre 1.0 (sin refracción), 1.33 (agua), 1.5 (vidrio) y 2.42 (diamante). Observa cómo cambia la distorsión de las imágenes vistas a través del material.",
    },
  ],
  practice: "Crea 4 tipos de vidrio: cristal transparente, vidrio tintado verde, vidrio esmerilado y vidrio de colores (tipo vitral). Colócalos en una escena con luz y documenta los parámetros de cada uno.",
  extraResources: [
    { label: "Materiales de vidrio en D5 Render", url: "https://www.d5render.com/help/glass-material" },
    { label: "Referencia de IOR para materiales", url: "https://www.d5render.com/blog/ior-reference" },
  ],
});

register({
  moduleId: "modulo-4",
  topicIndex: 4,
  title: "Biblioteca de materiales de D5 Render",
  objective: "Conocer y aprovechar al máximo la biblioteca integrada de materiales de D5 Render, aprendiendo a buscar, aplicar y personalizar los materiales predefinidos.",
  explanation: `D5 Render incluye una extensa biblioteca de materiales predefinidos que pueden ahorrarte horas de trabajo. Estos materiales están configurados por profesionales con todos los parámetros PBR correctos, mapas de textura de alta calidad y ajustes optimizados para el motor de renderizado. Aprender a usar eficientemente esta biblioteca es fundamental para trabajar de manera productiva.

Para acceder a la biblioteca de materiales, haz clic en el botón de Assets (generalmente en la barra lateral o con un atajo de teclado) y selecciona la pestaña de Materiales. La biblioteca está organizada por categorías: Madera, Metal, Piedra, Vidrio, Tela, Cerámica, Concreto, Azulejo, etc. Dentro de cada categoría encontrarás múltiples variantes con diferentes acabados, colores y estados de desgaste.

Cada material de la biblioteca viene con todos los mapas PBR necesarios preconfigurados: difuso, normal, rugosidad, y metalicidad cuando corresponde. Esto significa que al aplicar un material de la biblioteca, inmediatamente obtienes un resultado fotorrealista sin necesidad de ajustar nada. Por supuesto, siempre puedes personalizar los parámetros después de aplicar el material si necesitas un acabado específico.

La búsqueda es una herramienta poderosa en la biblioteca. Puedes buscar por nombre (ej: 'marble', 'concrete', 'oak') y D5 Render mostrará todos los materiales relevantes. También puedes filtrar por categoría usando las pestañas laterales.

Para aplicar un material de la biblioteca, simplemente arrástralo desde la biblioteca hasta el objeto en el viewport, o selecciónalo y haz clic en 'Apply'. Si quieres aplicarlo a múltiples objetos, selecciónalos todos primero y luego arrastra el material. También puedes aplicar el material a una cara específica del objeto si solo necesitas cubrir una parte.

La biblioteca se actualiza con cada versión de D5 Render, añadiendo nuevos materiales y mejorando los existentes. Es recomendable mantener D5 Render actualizado para tener acceso a los materiales más recientes. Además, D5 Render permite a los usuarios compartir materiales personalizados en la comunidad, ampliando las opciones disponibles más allá de la biblioteca oficial.

Cuando uses materiales de la biblioteca, presta atención a la escala de las texturas. Un material de madera que se ve perfecto en un piso puede verse incorrecto en un mueble si la escala de las vetas es demasiado grande o pequeña. D5 Render permite ajustar la escala UV del material para corregir este problema, y la mayoría de los materiales de la biblioteca tienen un valor de escala predeterminado que funciona para su uso típico.`,
  keyPoints: [
    "Biblioteca organizada por categorías: madera, metal, piedra, vidrio, etc.",
    "Cada material viene con todos los mapas PBR preconfigurados",
    "Búsqueda por nombre y filtrado por categoría disponibles",
    "Aplicar arrastrando al objeto o seleccionando y clic en Apply",
    "Los materiales se pueden personalizar después de aplicar",
    "Verificar escala UV del material al aplicarlo a diferentes objetos",
  ],
  steps: [
    {
      title: "Explorar la biblioteca de materiales",
      description: "Abre la biblioteca de materiales en D5 Render y recorre todas las categorías. Familiarízate con la organización y la variedad de materiales disponibles. Pasa el ratón sobre los materiales para ver una vista previa ampliada.",
    },
    {
      title: "Aplicar materiales a objetos",
      description: "Selecciona varios objetos en tu escena (muros, pisos, muebles) y aplica materiales de la biblioteca arrastrándolos desde la biblioteca hasta cada objeto. Observa cómo cada material transforma instantáneamente el aspecto del objeto.",
      tip: "Puedes aplicar materiales a múltiples objetos seleccionándolos todos antes de arrastrar el material.",
    },
    {
      title: "Ajustar la escala de texturas",
      description: "Si un material de madera se ve con vetas demasiado grandes en un mueble pequeño, selecciona el objeto y ajusta la escala UV del material en el panel de Propiedades. Reduce el valor hasta que las vetas tengan un tamaño natural para el objeto.",
    },
    {
      title: "Personalizar un material de la biblioteca",
      description: "Aplica un material de concreto de la biblioteca y luego personalízalo: cambia ligeramente el color base, ajusta la rugosidad, o modifica la intensidad del mapa normal. Esto te da un material único basado en uno profesional.",
    },
  ],
  practice: "Aplica materiales de la biblioteca a todos los objetos de una escena de interior. Personaliza al menos 3 de los materiales aplicados para ajustarlos mejor al concepto de diseño. Documenta cuáles aplicaste directamente y cuáles modificaste.",
  extraResources: [
    { label: "Biblioteca de materiales D5 Render", url: "https://www.d5render.com/help/material-library" },
    { label: "Materiales de comunidad", url: "https://forum.d5render.com/c/materials" },
  ],
});

register({
  moduleId: "modulo-4",
  topicIndex: 5,
  title: "Creación de materiales personalizados",
  objective: "Aprender a crear materiales PBR personalizados desde cero, importando mapas de textura propios y ajustando todos los parámetros para lograr resultados únicos y realistas.",
  explanation: `Aunque la biblioteca de D5 Render es extensa, siempre habrá situaciones donde necesites crear materiales personalizados: un tipo específico de mármol italiano, un acabado de pintura particular, o un material de diseño que no existe en ninguna biblioteca. Crear materiales personalizados es una habilidad fundamental para cualquier artista 3D.

El primer paso es conseguir los mapas de textura necesarios. Hay varias fuentes para obtener mapas PBR de alta calidad: sitios web gratuitos como Poly Haven y AmbientCG, sitios de pago como Quixel Megascans y Poliigon, o puedes fotografiar y procesar tus propias texturas usando software como Substance Designer o Materialize.

Para importar mapas de textura propios en D5 Render, abre el editor de materiales de un objeto y haz clic en el cuadrado junto a la propiedad donde quieres aplicar el mapa. En el selector, elige la opción de importar archivo y navega hasta la ubicación de tu textura. D5 Render soporta formatos PNG, JPG, TIFF y EXR para mapas de textura.

Es crucial entender la convención de nombres de los mapas PBR para no confundirlos. Los sufijos más comunes son: '_basecolor' o '_albedo' o '_diffuse' para el mapa de color, '_normal' o '_nrm' para el mapa normal, '_roughness' o '_rgh' para rugosidad, '_metallic' o '_met' para metalicidad, '_height' o '_disp' para desplazamiento, y '_ao' para oclusión ambiental. Siempre verifica que estás asignando el mapa correcto a la propiedad correspondiente.

Una técnica avanzada es crear materiales con mapas de desgaste (wear maps) o máscaras. Estas texturas en escala de grises definen zonas donde el material está más desgastado, sucio o dañado. Por ejemplo, un mapa de desgaste puede hacer que los bordes de un metal pintado muestren el metal subyacente, o que el centro de un piso de madera esté más pulido que los bordes.

D5 Render también permite ajustar la proyección UV de los mapas. Los tipos más comunes son: Box (proyección desde 6 caras, ideal para objetos volumétricos), Planar (proyección plana, para fachadas y muros), Cylindrical (para columnas y tubos), y Spherical (para esferas). Elegir la proyección correcta evita distorsiones en la textura.

Para crear variaciones de un mismo material sin duplicarlo, puedes ajustar parámetros como el tinte del color base, la intensidad del mapa normal, o el offset de la textura. Esto es útil cuando necesitas que dos muros de concreto se vean similares pero no idénticos.

Finalmente, guarda tus materiales personalizados en la biblioteca de usuario de D5 Render para reutilizarlos en futuros proyectos. Hacer clic derecho en el material y seleccionar 'Save to Library' lo añadirá a tu colección personal.`,
  keyPoints: [
    "Fuentes de texturas PBR: Poly Haven (gratuito), Quixel Megascans (pago), propias",
    "Importar mapas: clic en cuadrado junto a propiedad > Importar archivo",
    "Convención de nombres: _basecolor, _normal, _roughness, _metallic",
    "Mapas de desgaste: añaden realismo con zonas erosionadas o sucias",
    "Proyección UV: Box, Planar, Cylindrical, Spherical según el objeto",
    "Guardar materiales personalizados en la biblioteca de usuario",
  ],
  steps: [
    {
      title: "Descargar un paquete PBR",
      description: "Ve a Poly Haven (polyhaven.com/textures) y descarga un paquete PBR completo de un material que te interese (mármol, cuero, metal). Descarga todos los mapas disponibles (1K es suficiente para práctica).",
    },
    {
      title: "Crear el material base",
      description: "En D5 Render, selecciona un objeto y abre el editor de materiales. Asigna el mapa de color base importando el archivo _basecolor. Ajusta la escala UV para que el patrón tenga el tamaño correcto.",
    },
    {
      title: "Añadir mapas de detalle",
      description: "Importa y asigna el mapa normal (_normal), rugosidad (_roughness), y metalicidad (_metallic) si aplica. Cada mapa se asigna en la propiedad correspondiente haciendo clic en el cuadrado junto a ella.",
      tip: "Si el mapa normal parece invertido (el relieve se ve hundido), prueba activar la opción 'Flip Green Channel' en la configuración del mapa.",
    },
    {
      title: "Ajustar parámetros finos",
      description: "Con todos los mapas aplicados, ajusta los parámetros globales del material: intensidad del mapa normal (0.5-2.0), multiplicador de rugosidad, y color de tinte si es necesario. Busca el balance que más se acerque al material real.",
    },
    {
      title: "Guardar el material personalizado",
      description: "Una vez satisfecho con el resultado, haz clic derecho en el material y selecciona 'Save to Library'. Nómbralo descriptivamente (ej: 'Marble_Carrara_Custom') para encontrarlo fácilmente en futuros proyectos.",
    },
  ],
  practice: "Crea 2 materiales personalizados desde cero usando texturas descargadas de Poly Haven. Para cada uno, documenta el proceso con capturas de pantalla: mapas originales, configuración en D5 Render, y resultado final.",
  extraResources: [
    { label: "Poly Haven (texturas PBR gratuitas)", url: "https://polyhaven.com/textures" },
    { label: "AmbientCG (texturas PBR gratuitas)", url: "https://ambientcg.com" },
  ],
});

// ============================================================
// MÓDULO 5: Vegetación y Entorno
// ============================================================

register({
  moduleId: "modulo-5",
  topicIndex: 0,
  title: "Sistema de vegetación de D5 Render",
  objective: "Conocer el sistema de vegetación nativo de D5 Render, sus características únicas (animación de viento, respuesta al clima) y cómo aprovecharlo al máximo.",
  explanation: `Uno de los puntos fuertes más destacados de D5 Render es su sistema de vegetación nativo. A diferencia de otros motores donde los árboles y plantas son geometría estática, la vegetación de D5 Render está viva: responde al viento con animaciones naturales, reacciona a las condiciones climáticas, y se integra perfectamente con la iluminación de la escena. Esta característica sola puede elevar significativamente la calidad de tus renders arquitectónicos.

La biblioteca de vegetación de D5 Render contiene cientos de especies: árboles de diferentes tipos (caducifolios, perennifolios, palmeras, coníferas), arbustos, flores, pastos, y plantas de interior. Cada especie está modelada con geometría 3D detallada y texturas de alta calidad, pero optimizada para funcionar eficientemente con el ray tracing en tiempo real.

La característica más impresionante es la animación de viento. Cuando colocas un árbol de la biblioteca de D5 Render, automáticamente se anima con el viento: las hojas se mueven suavemente, las ramas oscilan, y la hierba se mece. Esta animación no es una simple textura animada sino una simulación basada en la estructura del modelo, lo que produce movimientos naturales y convincentes. La intensidad del viento se controla globalmente en los ajustes de la escena.

La vegetación también responde al clima. En días lluviosos, las hojas aparecen más oscuras y brillantes por la humedad. En días nevados, la nieve se acumula naturalmente sobre las ramas y hojas. Estos efectos se calculan automáticamente sin necesidad de configuración adicional.

Para colocar vegetación, abre la biblioteca de Assets (generalmente con la tecla G o desde la barra de herramientas) y selecciona la categoría de Vegetación. Navega por las subcategorías o usa la búsqueda para encontrar la especie deseada. Haz clic en el modelo y luego haz clic en el terreno o superficie donde quieres colocarlo. También puedes arrastrar el modelo directamente desde la biblioteca.

La vegetación de D5 Render está diseñada para ser eficiente. Usa técnicas de LOD (Level of Detail) automáticas: los árboles cercanos a la cámara muestran toda su geometría y texturas, mientras que los árboles lejanos se simplifican progresivamente para mantener el rendimiento. Esto te permite tener cientos de árboles en una escena sin problemas de rendimiento en la mayoría de los equipos.`,
  keyPoints: [
    "Vegetación nativa con animación de viento automática",
    "Responde al clima: humedad en lluvia, nieve acumulada",
    "Cientos de especies: árboles, arbustos, flores, pastos, plantas de interior",
    "Colocación desde la biblioteca de Assets (tecla G)",
    "LOD automático: árboles lejanos se simplifican para rendimiento",
    "La intensidad del viento se controla globalmente en la escena",
  ],
  steps: [
    {
      title: "Abrir la biblioteca de vegetación",
      description: "Presiona la tecla G o haz clic en el botón de Assets en la barra de herramientas. Selecciona la categoría de Vegetación. Explora las diferentes subcategorías: árboles, arbustos, flores, pastos.",
    },
    {
      title: "Colocar un árbol",
      description: "Selecciona un árbol de la biblioteca (por ejemplo, un roble o un arce) y haz clic en el terreno de tu escena para colocarlo. Observa cómo el árbol inmediatamente se anima con el viento.",
      tip: "Usa la rueda del ratón mientras colocas para rotar el árbol antes de soltarlo.",
    },
    {
      title: "Ajustar la intensidad del viento",
      description: "Ve a los ajustes de la escena y busca el parámetro de viento. Aumenta y disminuye la intensidad y observa cómo la vegetación responde. Un viento suave crea un ambiente tranquilo, un viento fuerte añade dramatismo.",
    },
    {
      title: "Colocar vegetación variada",
      description: "Añade al menos un arbusto, un patch de pasto y unas flores alrededor del árbol. Observa cómo cada tipo de vegetación tiene su propio tipo de animación: el pasto se mueve más que los arbustos, y las flores se mecen suavemente.",
    },
    {
      title: "Probar con diferentes climas",
      description: "Cambia las condiciones climáticas de la escena a lluvia y observa cómo la vegetación reacciona. Luego prueba con nieve. Nota los cambios en el aspecto de las hojas y las acumulaciones en las ramas.",
    },
  ],
  practice: "Crea un pequeño jardín con al menos 3 árboles, 5 arbustos, pasto y flores. Experimenta con la intensidad del viento y las condiciones climáticas. Haz renders con clima soleado y lluvioso para comparar.",
  extraResources: [
    { label: "Vegetación en D5 Render", url: "https://www.d5render.com/help/vegetation" },
    { label: "Biblioteca de vegetación D5", url: "https://www.d5render.com/assets/vegetation" },
  ],
});

register({
  moduleId: "modulo-5",
  topicIndex: 1,
  title: "Colocación de árboles, arbustos y flores",
  objective: "Dominar las técnicas de colocación de vegetación en D5 Render, incluyendo la colocación individual, en masa y el uso de herramientas de dispersión para crear paisajes naturales.",
  explanation: `Colocar vegetación de manera natural y convincente es una habilidad que requiere práctica y conocimiento de cómo crecen las plantas en la realidad. D5 Render ofrece varias herramientas para colocar vegetación, desde la colocación individual precisa hasta la dispersión masiva para crear bosques y prados.

La colocación individual es la más simple: seleccionas un modelo de vegetación de la biblioteca y haces clic en la superficie donde quieres colocarlo. Cada clic coloca una instancia del modelo. Puedes rotar el modelo antes de colocarlo moviendo la rueda del ratón, y puedes ajustar la escala después de colocarlo seleccionándolo y usando la herramienta de escalar.

Para proyectos grandes, la colocación individual sería demasiado lenta. D5 Render ofrece herramientas de dispersión que permiten colocar docenas o cientos de plantas de una sola vez. La herramienta de dispersión funciona definiendo un área (generalmente una superficie o un camino) y configurando parámetros como la densidad, la variación de escala y la aleatorización de rotación. D5 Render genera automáticamente las instancias dentro del área definida.

La clave para que la vegetación se vea natural es la variación. En la naturaleza, ningún árbol es idéntico a otro, y las plantas crecen en grupos irregulares. D5 Render permite configurar variación de escala (para que cada instancia tenga un tamaño ligeramente diferente) y aleatorización de rotación (para que cada instancia mire en una dirección diferente). Usar estos parámetros evita el aspecto repetitivo y artificial que resulta de colocar plantas idénticas en filas regulares.

Otro aspecto importante es la elección de especies apropiadas. Un paisaje tropical no debería tener coníferas, y un jardín japonés no debería tener palmeras. D5 Render tiene una amplia variedad de especies que cubren la mayoría de los climas y estilos de paisajismo. Tómate el tiempo de elegir las especies correctas para tu proyecto.

La colocación en capas es una técnica profesional: primero colocas los árboles grandes que definen la estructura del paisaje, luego los arbustos medianos que rellenan los espacios entre árboles, luego las plantas pequeñas y flores que añaden color y detalle, y finalmente el pasto o cubresuelos que unifican todo. Cada capa se coloca en una capa de escena diferente para facilitar la gestión.

La densidad de la vegetación también es importante. Demasiada vegetación puede hacer que un proyecto se vea selvático y desordenado, mientras que muy poca puede hacer que se vea estéril y poco habitable. Estudia fotografías de referencia de paisajes reales para calibrar la densidad apropiada para tu tipo de proyecto.`,
  keyPoints: [
    "Colocación individual para control preciso, dispersión para áreas grandes",
    "La variación de escala y rotación es crucial para un aspecto natural",
    "Elegir especies apropiadas al clima y estilo del proyecto",
    "Colocación en capas: árboles > arbustos > flores > pasto",
    "Usar capas de escena para gestionar cada tipo de vegetación",
    "Calibrar la densidad con fotografías de referencia reales",
  ],
  steps: [
    {
      title: "Colocar árboles individuales",
      description: "Selecciona 2-3 especies de árboles de la biblioteca y colócalos individualmente en tu escena. Varía la escala de cada árbol (0.8 a 1.2 del tamaño original) y rota cada uno en una dirección diferente.",
      tip: "Los árboles más grandes y viejos suelen ser más asimétricos. Rota los árboles para que su lado más interesante mire hacia la cámara.",
    },
    {
      title: "Colocar arbustos como relleno",
      description: "Selecciona arbustos de la biblioteca y colócalos en los espacios entre los árboles. Usa varias especies diferentes y varía la escala más que con los árboles (0.6 a 1.4) para crear un sotobosque natural.",
    },
    {
      title: "Usar la herramienta de dispersión para pasto",
      description: "Selecciona un patch de pasto de la biblioteca y usa la herramienta de dispersión para cubrir el suelo. Configura la densidad y la variación de escala. Observa cómo D5 Render genera cientos de instancias automáticamente.",
    },
    {
      title: "Añadir flores como acento de color",
      description: "Coloca macizos de flores cerca de la entrada o en puntos focales del paisaje. Las flores deben ser detalles, no dominar la escena. Usa colores que complementen la arquitectura del edificio.",
    },
    {
      title: "Revisar y ajustar el conjunto",
      description: "Aléjate de la escena y evalúa el paisaje completo. ¿Se ve natural? ¿Hay zonas vacías? ¿Hay demasiada vegetación en algún punto? Ajusta hasta lograr un equilibrio que complementa la arquitectura sin dominarla.",
    },
  ],
  practice: "Diseña el paisaje completo para un proyecto residencial: jardín delantero con árboles y camino, jardín trasero con terraza y vegetación, y bordes con arbustos. Usa al menos 5 especies diferentes de vegetación.",
  extraResources: [
    { label: "Colocación de vegetación en D5 Render", url: "https://www.d5render.com/help/place-vegetation" },
  ],
});

register({
  moduleId: "modulo-5",
  topicIndex: 2,
  title: "Terreno y modelado del paisaje",
  objective: "Aprender a crear y modificar terreno en D5 Render usando la herramienta Terrain, incluyendo elevaciones, depresiones, caminos y superficies naturales.",
  explanation: `El terreno es la base de cualquier paisaje y D5 Render ofrece herramientas dedicadas para crear topografía personalizada sin necesidad de modelarla en un software externo. La herramienta Terrain permite esculpir el suelo de la escena añadiendo elevaciones, depresiones y caminos que luego se pueden cubrir con vegetación y materiales.

Para acceder a la herramienta Terrain, ve a la barra de herramientas y selecciona el icono de Terrain o usa el atajo de teclado correspondiente. Esto activará el modo de edición de terreno donde verás una malla que representa la superficie del suelo.

D5 Render ofrece varios modos de edición del terreno. El modo Raise eleva el terreno donde pintas, creando colinas y montículos. El modo Lower hace lo contrario, creando depresiones y valles. El modo Flatten nivela el terreno a una altura específica, útil para crear plataformas donde se ubicará el edificio. El modo Smooth suaviza las transiciones, eliminando irregularidades para que el terreno se vea más natural.

El pincel de terreno tiene parámetros ajustables: tamaño (radio del efecto), intensidad (qué tan fuerte es la elevación o depresión por pasada), y suavizado (qué tan gradual es la transición entre el terreno modificado y el original). Para colinas suaves y naturales, usa un pincel grande con baja intensidad y alto suavizado. Para detalles más marcados como bordes de caminos, usa un pincel más pequeño con mayor intensidad.

Un flujo de trabajo típico para crear un paisaje completo comienza creando las elevaciones principales: colinas suaves en los bordes del terreno que enmarcan el proyecto. Luego se crean las depresiones para elementos como estanques o jardines hundidos. Después se nivela la plataforma central donde se ubica el edificio. Finalmente se añaden los detalles como caminos, terrazas y bordes.

Los caminos se pueden crear de dos maneras: bajando el terreno ligeramente y aplicando un material diferente (gravilla, adoquín), o usando la herramienta Flatten para crear una superficie plana y luego aplicando el material del camino. Los caminos deben tener una ligera pendiente para el drenaje del agua de lluvia.

D5 Render también permite importar terreno desde datos topográficos. Si tienes un archivo DEM (Digital Elevation Model) o un modelo 3D del terreno hecho en otro software, puedes importarlo como geometría y D5 Render lo usará como superficie del terreno. Esto es útil para proyectos en sitios reales donde la topografía existente es importante.

Después de esculpir el terreno, es importante aplicarle un material apropiado. D5 Render tiene materiales de tierra, césped, gravilla y roca en su biblioteca que funcionan bien como base. Luego, la vegetación se coloca sobre el terreno, y las plantas se ajustan automáticamente a la topografía.`,
  keyPoints: [
    "Herramienta Terrain: esculpir terreno directamente en D5 Render",
    "Modos: Raise (elevar), Lower (bajar), Flatten (nivelar), Smooth (suavizar)",
    "Pincel ajustable: tamaño, intensidad y suavizado",
    "Flujo: elevaciones principales > depresiones > plataforma del edificio > detalles",
    "Caminos: bajar terreno + material diferente, o Flatten + material",
    "Se puede importar terreno topográfico desde archivos externos",
  ],
  steps: [
    {
      title: "Activar la herramienta Terrain",
      description: "Abre un proyecto en D5 Render y activa la herramienta Terrain desde la barra de herramientas. Observa la malla del terreno en el viewport y los controles del pincel en el panel de Propiedades.",
    },
    {
      title: "Crear elevaciones suaves",
      description: "Selecciona el modo Raise con un pincel grande (radio 10+), baja intensidad (0.3) y alto suavizado. Pinta suavemente en los bordes del terreno para crear colinas que enmarquen el proyecto. Trabaja en múltiples pasadas suaves en lugar de una sola pasada intensa.",
      tip: "Altérnate entre Raise y Smooth para lograr colinas naturales sin irregularidades.",
    },
    {
      title: "Crear una plataforma para el edificio",
      description: "Usa el modo Flatten para nivelar una zona rectangular en el centro del terreno. Ajusta la altura deseada y pinta sobre la zona hasta que quede completamente plana. Esta será la base del edificio.",
    },
    {
      title: "Crear un camino de acceso",
      description: "Usa el modo Lower con un pincel estrecho para crear una depresión suave desde el borde del terreno hasta la plataforma del edificio. Luego aplica un material de gravilla o adoquín al camino.",
    },
    {
      title: "Aplicar material y vegetación",
      description: "Aplica un material de césped al terreno general y un material de gravilla al camino. Coloca vegetación sobre el terreno: árboles en las colinas, arbustos junto al camino y flores cerca de la entrada.",
    },
  ],
  practice: "Crea un terreno completo con colinas, una plataforma central para el edificio, un camino de acceso, y un jardín hundido. Aplica materiales y vegetación básica.",
  extraResources: [
    { label: "Herramienta Terrain en D5 Render", url: "https://www.d5render.com/help/terrain" },
  ],
});

register({
  moduleId: "modulo-5",
  topicIndex: 3,
  title: "Sistema de agua y océano",
  objective: "Aprender a crear superficies de agua realistas en D5 Render, incluyendo piscinas, lagos, ríos y océano, con animación de olas y reflexiones dinámicas.",
  explanation: `El agua es uno de los elementos más visualmente impactantes en la visualización arquitectónica, y D5 Render ofrece un sistema de agua nativo que produce resultados impresionantes con relativamente poca configuración. El sistema simula las propiedades ópticas del agua (reflexión, refracción, absorción de color) y añade animación de olas para crear superficies dinámicas y convincentes.

Para crear una superficie de agua en D5 Render, ve a la biblioteca de Assets y busca la categoría de Agua (Water). Encontrarás varios presets: agua de piscina, agua de lago, agua de río, océano, y cascada. Cada preset viene con parámetros preconfigurados para el tipo de agua que simula. Simplemente arrastra el preset a la escena y se creará un plano de agua que puedes escalar y posicionar.

El material de agua de D5 Render es un material especial que combina varias propiedades: reflexión especular (el agua refleja el cielo y los objetos circundantes), refracción (deforma lo que se ve bajo la superficie), absorción de color (el agua profunda se ve más azul/verde que la superficial), y animación de ondas (simula el movimiento natural del agua).

La profundidad del agua afecta significativamente su color. En agua poco profunda (como el borde de una piscina), la luz atraviesa el agua y se refleja en el fondo, produciendo un color turquesa claro. En agua profunda (como el océano), la luz se absorbe progresivamente, produciendo un azul oscuro. D5 Render simula este efecto automáticamente basándose en la geometría del lecho.

Las olas y la turbulencia del agua se controlan mediante parámetros de animación. Puedes ajustar la altura de las olas, la frecuencia (qué tan juntas están), la dirección del viento, y la velocidad de la animación. Para una piscina, usa olas mínimas con frecuencia alta (pequeñas ondas). Para un océano, usa olas grandes con frecuencia variable.

Las caústicas son otro efecto importante del agua. Son los patrones de luz que el agua enfoca y dispersa en el fondo y las superficies cercanas. D5 Render calcula caústicas automáticamente cuando hay una superficie de agua con luz atravesándola. Este efecto es especialmente visible en piscinas iluminadas por el sol y añade un nivel de realismo difícil de lograr manualmente.

Para piscinas, D5 Render tiene presets específicos que ya incluyen el color turquesa característico, la profundidad correcta y las olas suaves. Solo necesitas escalar el plano de agua al tamaño de la piscina y posicionarlo a la altura correcta del agua. El material de azulejo de la piscina se aplica a las paredes y el fondo del volumen de la piscina.`,
  keyPoints: [
    "Presets de agua: piscina, lago, río, océano, cascada",
    "El agua combina reflexión + refracción + absorción + animación de olas",
    "La profundidad afecta el color: poca profundidad = turquesa, mucha = azul oscuro",
    "Las caústicas (patrones de luz) se calculan automáticamente",
    "Olas: altura, frecuencia, dirección y velocidad son ajustables",
    "Las piscinas tienen presets específicos con color y olas preconfigurados",
  ],
  steps: [
    {
      title: "Crear una piscina",
      description: "Busca el preset de piscina en la biblioteca de Assets y arrástralo a la escena. Escala el plano de agua al tamaño de la piscina y posiciónalo a la altura del agua. Verifica que las caústicas son visibles en el fondo de la piscina.",
    },
    {
      title: "Crear un lago",
      description: "Usa el preset de lago y colócalo en una depresión del terreno. Escala el plano para cubrir el área del lago. Ajusta las olas a una altura media con frecuencia baja para simular agua tranquila.",
      tip: "Añade vegetación acuática en los bordes del lago para un aspecto más natural.",
    },
    {
      title: "Crear un océano",
      description: "Usa el preset de océano y colócalo como fondo de la escena. Aumenta la altura de las olas y la frecuencia para simular un mar agitado. Observa cómo el color del agua cambia con la profundidad.",
    },
    {
      title: "Ajustar los parámetros del agua",
      description: "Selecciona la superficie de agua y experimenta con los parámetros: color de absorción (para cambiar el tono del agua), altura de olas, velocidad de animación, y rugosidad de la superficie. Cada ajuste debe hacer que el agua se vea más como el tipo de agua que quieres simular.",
    },
  ],
  practice: "Crea una escena con una piscina y un océano visible al fondo. Ajusta los parámetros de cada tipo de agua para que se vean realistas. Haz renders en diferentes momentos del día para ver cómo la iluminación afecta el agua.",
  extraResources: [
    { label: "Sistema de agua en D5 Render", url: "https://www.d5render.com/help/water" },
  ],
});

register({
  moduleId: "modulo-5",
  topicIndex: 4,
  title: "Skybox y atmósfera",
  objective: "Dominar la configuración del skybox y los efectos atmosféricos en D5 Render para crear fondos y ambientes convincentes que complementen la arquitectura.",
  explanation: `El skybox es el fondo de la escena, la imagen esférica que rodea todo el entorno y que representa el cielo y el horizonte. En D5 Render, el skybox trabaja en conjunto con el sistema de iluminación para crear un ambiente coherente donde la iluminación, el fondo y la atmósfera están perfectamente sincronizados.

D5 Render ofrece dos modos de skybox: procedural y HDRI. El skybox procedural genera el cielo matemáticamente basándose en parámetros como la hora del día, la nubosidad y la turbidez atmosférica. Es el modo por defecto y ofrece control total sobre las condiciones del cielo con resultados convincentes. El skybox HDRI usa una imagen real de 360 grados como fondo y fuente de iluminación, como vimos en el módulo de iluminación.

Los ajustes atmosféricos de D5 Render controlan la apariencia del aire entre la cámara y los objetos. La niebla (fog) añade una capa de bruma que reduce la visibilidad a distancia, creando un efecto de profundidad atmosférica. La niebla delgada simula mañanas húmedas o paisajes costeros. La niebla espesa crea ambientes místicos o escenas de mal tiempo.

La turbidez atmosférica controla la claridad del cielo. Valores bajos producen un cielo azul profundo y transparente, típicos de días secos y despejados. Valores altos producen un cielo más pálido y lavado, típicos de días húmedos o contaminados. La turbidez también afecta la calidad de la luz: cielos más turbios producen iluminación más difusa y menos sombras definidas.

Las nubes son otro elemento atmosférico importante. D5 Render genera nubes volumétricas proceduralmente que se integran con la iluminación de la escena. Puedes ajustar la cantidad de nubes, su tipo (cirros, cúmulos, estratos) y su altitud. Las nubes no solo son estéticas sino que también afectan la iluminación: nubes densas entre el sol y la escena crearán sombras suaves.

El color del horizonte es un ajuste frecuentemente ignorado pero importante. En la realidad, el horizonte siempre es más claro y lavado que el cenit debido a la mayor cantidad de atmósfera que la luz atraviesa. D5 Render simula esto automáticamente, pero puedes ajustar la intensidad del efecto.

Para crear atardeceres y amaneceres convincentes, la combinación de skybox procedural + posición baja del sol + nubosidad media produce los mejores resultados. Las nubes capturan los colores cálidos del sol bajo y crean los gradientes de color característicos de estas horas.`,
  keyPoints: [
    "Dos modos de skybox: procedural (generado) y HDRI (imagen real)",
    "Niebla: crea profundidad atmosférica y efectos de clima",
    "Turbidez: cielo claro (baja) vs cielo lavado (alta)",
    "Nubes volumétricas: afectan iluminación y estética",
    "El color del horizonte es naturalmente más claro que el cenit",
    "Atardeceres convincentes: sol bajo + nubosidad media + skybox procedural",
  ],
  steps: [
    {
      title: "Explorar el skybox procedural",
      description: "En un proyecto, ve a los ajustes de cielo/atmósfera. Configura el skybox en modo procedural y ajusta la hora a diferentes momentos del día. Observa cómo el cielo cambia de azul a naranja a oscuro.",
    },
    {
      title: "Añadir niebla",
      description: "Activa la niebla en los ajustes atmosféricos. Empieza con una cantidad baja (0.1) y ve aumentando gradualmente. Observa cómo los objetos lejanos se difuminan y la escena gana profundidad atmosférica.",
      tip: "La niebla más efectiva es la que apenas se nota: suaviza los bordes lejanos sin hacer que la escena se vea brumosa.",
    },
    {
      title: "Configurar nubes",
      description: "Añade nubes al skybox procedural. Experimenta con diferentes cantidades y tipos. Observa cómo las nubes crean sombras suaves cuando pasan entre el sol y la escena.",
    },
    {
      title: "Crear un atardecer",
      description: "Configura el sol a una altitud baja (5-10 grados), nubosidad media, y turbidez ligeramente alta. Observa los colores cálidos en el cielo y las nubes. Ajusta hasta obtener un atardecer convincente.",
    },
  ],
  practice: "Crea 3 ambientes diferentes usando solo los ajustes de skybox y atmósfera: un mediodía despejado, un atardecer nublado, y una mañana con niebla. Haz renders de cada uno y compara el mood de cada escena.",
  extraResources: [
    { label: "Atmósfera en D5 Render", url: "https://www.d5render.com/help/atmosphere" },
  ],
});

register({
  moduleId: "modulo-5",
  topicIndex: 5,
  title: "Efectos climáticos: lluvia y nieve",
  objective: "Aprender a usar los efectos climáticos integrados de D5 Render (lluvia, nieve) para crear escenas con condiciones meteorológicas que añadan dramatismo y variedad visual.",
  explanation: `D5 Render incluye efectos climáticos nativos que permiten simular lluvia y nieve de manera convincente sin necesidad de plugins o composición posterior. Estos efectos se integran con el sistema de iluminación y la vegetación, creando resultados coherentes donde cada elemento de la escena responde al clima de forma realista.

El efecto de lluvia de D5 Render consiste en varias capas: partículas de lluvia visibles (las gotas cayendo), salpicaduras en las superficies (donde las gotas impactan), y el efecto sobre los materiales (las superficies se ven más oscuras y brillantes por la humedad). Todo esto se calcula automáticamente cuando activas la lluvia.

Para activar la lluvia, ve a los ajustes de clima/atmósfera de la escena y activa el efecto de lluvia. Aparecerán controles para ajustar la intensidad (de llovizna a tormenta), la dirección del viento (que afecta el ángulo de las gotas), y la velocidad de las partículas. Una intensidad baja simula una llovizna ligera, mientras que una intensidad alta simula una tormenta con gotas grandes y abundantes.

La vegetación responde automáticamente a la lluvia: las hojas se ven más oscuras y brillantes, simulando la humedad acumulada. Las superficies de los materiales también se ven más oscuras y reflectantes, lo que es físicamente correcto ya que el agua forma una capa que actúa como una superficie reflectante adicional.

El efecto de nieve funciona de manera similar. Cuando lo activas, D5 Render añade partículas de nieve cayendo y acumulación de nieve en las superficies horizontales y los objetos. La nieve se acumula en los techos, las ramas de los árboles, las cornisas y las superficies planas. La cantidad de acumulación es proporcional a la intensidad del efecto.

La nieve también afecta la vegetación de forma automática: los árboles y arbustos muestran nieve acumulada en las ramas y hojas, y el pasto se cubre parcialmente de blanco. Este efecto es especialmente impresionante con la vegetación nativa de D5 Render.

Combinar los efectos climáticos con otros ajustes atmosféricos potencia el resultado. Una escena de lluvia con niebla ligera y cielo nublado se ve mucho más convincente que solo con las partículas de lluvia. Una escena de nieve con cielo gris y luz difusa recrea la atmósfera de un día invernal de forma creíble.

Es importante notar que los efectos climáticos aumentan la carga de renderizado, especialmente en escenas complejas. Si experimentas problemas de rendimiento, reduce la intensidad del efecto o desactívalo mientras trabajas en otros aspectos de la escena.`,
  keyPoints: [
    "Lluvia: partículas + salpicaduras + superficies húmedas (automático)",
    "Nieve: partículas + acumulación en superficies horizontales",
    "La vegetación responde automáticamente: hojas húmedas, nieve en ramas",
    "Combinar con niebla y cielo nublado para mayor realismo",
    "Los materiales se ven más oscuros y reflectantes con humedad",
    "Los efectos climáticos aumentan la carga de renderizado",
  ],
  steps: [
    {
      title: "Activar el efecto de lluvia",
      description: "Ve a los ajustes de clima y activa la lluvia. Empieza con intensidad baja y ve aumentando. Observa cómo las gotas caen, las salpicaduras aparecen en las superficies y los materiales se oscurecen por la humedad.",
    },
    {
      title: "Configurar una tormenta",
      description: "Aumenta la intensidad de la lluvia al máximo. Añade viento fuerte para que las gotas caigan en ángulo. Oscurece el cielo con nubes densas. Observa el dramatismo que aporta la tormenta a la escena.",
      tip: "Una tormenta es el momento perfecto para usar luz volumétrica si hay una abertura o un rayo de luz que atraviesa las nubes.",
    },
    {
      title: "Activar el efecto de nieve",
      description: "Desactiva la lluvia y activa la nieve. Observa cómo los copos caen y se acumulan gradualmente en los techos, ramas y superficies horizontales. Ajusta la intensidad para simular desde una nevada ligera hasta una tormenta de nieve.",
    },
    {
      title: "Combinar clima con atmósfera",
      description: "Añade niebla ligera y cielo nublado al efecto de lluvia o nieve. Observa cómo la combinación crea un ambiente mucho más inmersivo que el efecto climático solo.",
    },
  ],
  practice: "Crea dos versiones de un proyecto: una con lluvia y otra con nieve. Ajusta todos los parámetros atmosféricos para cada condición. Compara el mood y el impacto visual de cada versión.",
  extraResources: [
    { label: "Efectos climáticos en D5 Render", url: "https://www.d5render.com/help/weather" },
  ],
});

// ============================================================
// MÓDULO 6: Cámara y Composición
// ============================================================

register({
  moduleId: "modulo-6",
  topicIndex: 0,
  title: "Configuración de la cámara virtual",
  objective: "Dominar los parámetros de la cámara virtual de D5 Render, incluyendo distancia focal, exposición, y formato, para lograr encuadres profesionales.",
  explanation: `La cámara virtual de D5 Render simula una cámara fotográfica real, con parámetros que controlan exactamente qué se ve y cómo se ve en el render final. Entender estos parámetros es esencial porque, al igual que en la fotografía real, la cámara puede transformar completamente la percepción de un espacio.

La distancia focal (medida en milímetros) es el parámetro más importante de la cámara. Controla el ángulo de visión y la perspectiva de la imagen. Una distancia focal corta (14-24mm) produce un ángulo de visión amplio y exagera la perspectiva, haciendo que los objetos cercanos parezcan más grandes y los lejanos más pequeños. Es ideal para interiores pequeños donde necesitas mostrar mucho espacio. Una distancia focal media (35-50mm) produce una perspectiva similar a la visión humana. Una distancia focal larga (85-200mm) comprime la perspectiva, haciendo que los objetos parezcan más cercanos entre sí, ideal para fachadas y detalles arquitectónicos.

La exposición controla el brillo general de la imagen. En D5 Render, la exposición se ajusta automáticamente según la iluminación de la escena, pero puedes modificarla manualmente. Una exposición alta ilumina más la imagen (útil para interiores oscuros), mientras que una exposición baja la oscurece (útil para escenas nocturnas o atardeceres).

El balance de blancos compensa el color de la iluminación para que los blancos se vean realmente blancos. D5 Render permite ajustar la temperatura de color del balance de blancos en Kelvin. Si la escena está iluminada con luz cálida (2700K), subir el balance de blancos compensará el tono amarillo. Si la escena tiene luz fría (6500K), bajar el balance de blancos añadirá calidez.

El formato de la cámara define la relación de aspecto (aspect ratio) de la imagen. Los formatos más comunes son 16:9 (panorámico, ideal para pantallas), 4:3 (clásico), 1:1 (cuadrado, para Instagram), y 21:9 (cinematográfico). La elección del formato debe hacerse antes de encuadrar porque afecta significativamente la composición.

Para mover la cámara, usa los controles de navegación del viewport: clic derecho + WASD para primera persona, o los controles de órbita. D5 Render también permite ajustar la posición y rotación de la cámara numéricamente en el panel de Propiedades para un control preciso.`,
  keyPoints: [
    "Distancia focal corta (14-24mm): ángulo amplio, perspectiva exagerada, ideal interiores",
    "Distancia focal media (35-50mm): perspectiva natural, similar a visión humana",
    "Distancia focal larga (85-200mm): perspectiva comprimida, ideal fachadas y detalles",
    "Exposición: controla brillo general, automática o manual",
    "Balance de blancos: compensa temperatura de color de la iluminación",
    "Formato: 16:9 panorámico, 4:3 clásico, 1:1 Instagram, 21:9 cine",
  ],
  steps: [
    {
      title: "Experimentar con distancias focales",
      description: "En una escena de exterior, ajusta la distancia focal desde 14mm hasta 200mm. Observa cómo la perspectiva cambia dramáticamente: en 14mm el edificio parece enorme y distante, en 200mm se comprime y los elementos parecen más cercanos.",
      tip: "Para interiores arquitectónicos, 24-35mm es el rango más útil. Para fachadas, 50-85mm.",
    },
    {
      title: "Ajustar la exposición",
      description: "En una escena de interior, ajusta la exposición manualmente. Observa cómo el brillo cambia. Busca el valor donde los detalles son visibles tanto en las zonas claras como en las oscuras sin que ninguna se queme.",
    },
    {
      title: "Configurar el balance de blancos",
      description: "En una escena con iluminación cálida, ajusta el balance de blancos hasta que las superficies blancas se vean realmente blancas. Luego desajústalo deliberadamente para crear un mood cálido o frío.",
    },
    {
      title: "Elegir un formato de imagen",
      description: "Configura la cámara en formato 16:9 y encuadra una vista. Luego cambia a 4:3 y reencuadra. Observa cómo la relación de aspecto cambia la composición y el espacio visible.",
    },
  ],
  practice: "Fotografía el mismo edificio con 3 distancias focales diferentes (24mm, 50mm, 100mm) manteniendo el edificio centrado. Compara las diferencias de perspectiva y elige cuál funciona mejor para tu proyecto.",
  extraResources: [
    { label: "Cámara en D5 Render", url: "https://www.d5render.com/help/camera" },
  ],
});

register({
  moduleId: "modulo-6",
  topicIndex: 1,
  title: "Profundidad de campo (DOF)",
  objective: "Aprender a usar la profundidad de campo para crear imágenes con enfoque selectivo, dirigiendo la atención del espectador y añadiendo realismo fotográfico.",
  explanation: `La profundidad de campo (Depth of Field o DOF) es el efecto que produce que solo una parte de la imagen esté nítida mientras que el resto se ve borroso, igual que en una fotografía real con el diafragma abierto. Este efecto no solo añade realismo sino que es una herramienta compositiva poderosa para dirigir la atención del espectador hacia los elementos importantes de la imagen.

En fotografía real, la profundidad de campo depende de tres factores: la apertura del diafragma (f-stop), la distancia focal y la distancia al sujeto. D5 Render simula estos mismos parámetros para producir un efecto físicamente preciso. Una apertura grande (f/1.4, f/2.8) produce una profundidad de campo muy superficial con mucho desenfoque. Una aperture pequeña (f/11, f/16) produce una imagen casi completamente nítida.

El parámetro principal en D5 Render es el diafragma (aperture). Cuanto menor sea el número f, mayor será la apertura y más pronunciado será el efecto de desenfoque. Para retratos arquitectónicos donde quieres que un elemento destaque sobre un fondo difuso, usa aperturas de f/2.8 a f/4. Para vistas generales donde todo debe estar nítido, usa f/8 a f/16.

La distancia de enfoque (focus distance) define a qué distancia de la cámara los objetos estarán perfectamente nítidos. Los objetos más cerca o más lejos de esta distancia se irán desenfocando progresivamente. Puedes hacer clic en un objeto de la escena para que la cámara enfoque automáticamente en ese punto.

La distancia focal también afecta la profundidad de campo: las lentes largas (teleobjetivos) producen menos profundidad de campo que las lentes cortas (gran angular) a la misma apertura. Esto significa que con una distancia focal de 85mm y f/2.8 tendrás mucho más desenfoque que con 24mm y f/2.8.

Usar la profundidad de campo de manera efectiva requiere pensar en qué elemento de la escena es el protagonista. En un render de interior, puede ser el mueble principal o la vista desde la ventana. En un exterior, puede ser la entrada del edificio. El desenfoque del resto de la imagen no solo dirige la atención sino que también oculta detalles que no son perfectos en zonas secundarias.

Es importante no exagerar el efecto. Un desenfoque demasiado pronunciado puede hacer que la imagen parezca una maqueta miniatura (efecto tilt-shift). Para renders arquitectónicos, un desenfoque sutil suele ser más apropiado que uno extremo.`,
  keyPoints: [
    "DOF produce enfoque selectivo: solo una zona nítida, resto desenfocado",
    "Apertura grande (f/1.4-f/4): mucho desenfoque, ideal para destacar elementos",
    "Apertura pequeña (f/8-f/16): todo nítido, ideal para vistas generales",
    "Distancia de enfoque: define a qué distancia los objetos son nítidos",
    "Distancias focales largas amplifican el efecto de DOF",
    "Evitar exagerar: un desenfoque sutil es más profesional que uno extremo",
  ],
  steps: [
    {
      title: "Activar la profundidad de campo",
      description: "Selecciona la cámara en D5 Render y busca la opción de Depth of Field. Actívala y ajusta la apertura a f/2.8. Observa cómo el desenfoque aparece en las zonas fuera de foco.",
    },
    {
      title: "Ajustar la distancia de enfoque",
      description: "Haz clic en un objeto de la escena para enfocar en él. Observa cómo ese objeto se vuelve nítido mientras que los elementos delante y detrás se desenfocan. Prueba enfocando diferentes objetos.",
      tip: "Puedes usar el punto de enfoque como herramienta compositiva: lo que está enfocado es lo que el espectador mirará primero.",
    },
    {
      title: "Experimentar con diferentes aperturas",
      description: "Ajusta la apertura desde f/1.4 hasta f/16. Observa cómo la zona nítida se amplía con aperturas más cerradas. Encuentra el equilibrio entre el desenfoque artístico y la nitidez necesaria.",
    },
    {
      title: "Combinar DOF con distancia focal larga",
      description: "Configura una distancia focal de 85mm y apertura f/2.8. Observa cómo el teleobjetivo amplifica el efecto de desenfoque, creando un retrato arquitectónico con el edificio nítido sobre un fondo suavemente difuminado.",
    },
  ],
  practice: "Crea 3 renders del mismo espacio con diferentes configuraciones de DOF: todo nítido (f/16), desenfoque moderado (f/5.6), y desenfoque pronunciado (f/2.0). Compara y explica cuál funciona mejor para cada tipo de presentación.",
  extraResources: [
    { label: "Profundidad de campo en D5 Render", url: "https://www.d5render.com/help/dof" },
  ],
});

register({
  moduleId: "modulo-6",
  topicIndex: 2,
  title: "Composición fotográfica: regla de tercios",
  objective: "Aprender los principios de composición fotográfica y aplicarlos en D5 Render para crear renders visualmente atractivos y profesionales.",
  explanation: `La composición es el arte de organizar los elementos visuales dentro del encuadre para crear imágenes equilibradas, atractivas y que comuniquen eficazmente la intención del autor. En el renderizado arquitectónico, una buena composición puede hacer que un proyecto ordinario parezca extraordinario, mientras que una mala composición puede desperdiciar un proyecto excelente.

La regla de tercios es la regla compositiva más fundamental. Divide la imagen en 9 secciones iguales usando dos líneas horizontales y dos verticales. Los cuatro puntos donde se cruzan las líneas se llaman puntos de fuerza o puntos de interés, y son las posiciones donde el ojo humano tiende a mirar naturalmente. Colocar los elementos principales en estos puntos crea una composición más dinámica e interesante que centrarlos.

D5 Render permite mostrar una cuadrícula de tercios en el viewport como guía de composición. Actívala y usa las intersecciones como referencia para posicionar los elementos clave: la entrada del edificio, un árbol destacado, o una obra de arte en el interior.

Las líneas guía son otra herramienta compositiva importante. Las líneas diagonales crean tensión y dinamismo, las líneas horizontales transmiten calma y estabilidad, y las líneas verticales sugieren fuerza y poder. En arquitectura, las líneas del edificio, los caminos, y los bordes de los elementos pueden usarse como líneas guía que dirigen la mirada del espectador.

El encuadre (framing) consiste en usar elementos de la escena para enmarcar el sujeto principal. Una puerta que enmarca una vista, las ramas de un árbol que enmarcan un edificio, o un arco que enmarca un patio son ejemplos de encuadre natural que añade profundidad y contexto a la imagen.

El espacio negativo es el área vacía de la composición. Aunque parece contradictorio, el espacio negativo es tan importante como el positivo: da respiración al sujeto, evita que la imagen se vea abrumada, y puede crear un sentido de escala. Un edificio rodeado de cielo vacío se percibe como más monumental que uno rodeado de otros edificios.

La simetría y el equilibrio son conceptos relacionados pero diferentes. La simetría perfecta (dividir la imagen en dos mitades idénticas) puede ser poderosa pero también monótona. El equilibrio asimétrico es más sutil: un elemento grande a un lado se equilibra con un elemento pequeño pero llamativo al otro lado. La arquitectura a menudo se beneficia de composiciones equilibradas pero no perfectamente simétricas.`,
  keyPoints: [
    "Regla de tercios: dividir en 9 zonas, colocar sujetos en puntos de intersección",
    "Líneas guía: diagonales=dinamismo, horizontales=calma, verticales=fuerza",
    "Encuadre: usar elementos de la escena para enmarcar el sujeto",
    "Espacio negativo: área vacía que da respiración y escala al sujeto",
    "Equilibrio asimétrico: más interesante que la simetría perfecta",
    "D5 Render muestra cuadrícula de tercios como guía de composición",
  ],
  steps: [
    {
      title: "Activar la cuadrícula de tercios",
      description: "En D5 Render, activa la visualización de la cuadrícula de tercios en el viewport. Esta cuadrícula te ayudará a posicionar los elementos clave en los puntos de intersección.",
    },
    {
      title: "Aplicar la regla de tercios",
      description: "Encuadra una vista del edificio colocando el elemento principal (la entrada, una torre destacada) en uno de los puntos de intersección de la cuadrícula. Evita centrar el sujeto.",
      tip: "Si el edificio se mueve hacia la izquierda, el cielo o el paisaje a la derecha ganará protagonismo y creará un balance interesante.",
    },
    {
      title: "Usar líneas guía",
      description: "Busca líneas en la escena (caminos, bordes de muros, líneas del techo) que dirijan la mirada hacia el sujeto principal. Ajusta la cámara para que estas líneas conduzcan naturalmente hacia el punto focal.",
    },
    {
      title: "Crear encuadre natural",
      description: "Busca elementos que puedan enmarcar el sujeto: un árbol a cada lado, un arco, o la oscuridad de un interior que enmarca una vista exterior. El encuadre añade profundidad y contexto.",
    },
    {
      title: "Evaluar el espacio negativo",
      description: "Revisa tu composición y verifica si hay suficiente espacio negativo alrededor del sujeto. Si la imagen se ve abarrotada, aleja la cámara o usa una distancia focal más larga para simplificar.",
    },
  ],
  practice: "Toma 5 renders del mismo edificio usando diferentes composiciones: regla de tercios, simetría, encuadre natural, líneas diagonales y espacio negativo. Analiza cuál funciona mejor y por qué.",
  extraResources: [
    { label: "Composición en visualización arquitectónica", url: "https://www.d5render.com/blog/composition" },
  ],
});

register({
  moduleId: "modulo-6",
  topicIndex: 3,
  title: "Exposición y balance de blancos",
  objective: "Dominar los ajustes de exposición y balance de blancos en D5 Render para controlar el brillo y la temperatura de color de los renders de forma precisa.",
  explanation: `La exposición y el balance de blancos son los dos ajustes más importantes de la cámara después del encuadre. Controlan respectivamente el brillo general de la imagen y la fidelidad de los colores bajo diferentes condiciones de iluminación. Dominar estos ajustes te permitirá obtener renders bien iluminados y con colores naturales en cualquier situación.

La exposición determina cuánta luz llega al sensor de la cámara (virtual en este caso). Una exposición correcta muestra detalles tanto en las zonas claras (highlights) como en las oscuras (shadows). Una sobreexposición quema los highlights (las zonas claras se vuelven blancas sin detalle), mientras que una subexposición pierde los detalles en las sombras.

En D5 Render, la exposición se controla mediante un valor de EV (Exposure Value) o un deslizador de exposición. Valores más altos iluminan la imagen, valores más bajos la oscurecen. D5 Render ajusta la exposición automáticamente según la iluminación de la escena, pero a veces necesitas corregirla manualmente, especialmente en situaciones de alto contraste como interiores con vistas al exterior.

El balance de blancos (White Balance) compensa la temperatura de color de la iluminación para que los colores neutros (blancos, grises) se reproduzcan correctamente. La temperatura de color se mide en Kelvin: valores bajos (2500-3500K) son cálidos (amarillos/rojos), valores medios (5000-5500K) son neutros (luz de día), y valores altos (6500-10000K) son fríos (azulados).

El problema más común es el desajuste entre la iluminación interior y exterior. Un interior iluminado con luz cálida (2700K) que tiene ventanas con luz del día (5500K) creará un contraste de temperatura: el interior se verá amarillo y el exterior se verá azul. Ajustar el balance de blancos a un valor intermedio puede equilibrar ambas temperaturas.

D5 Render también ofrece ajustes de tono (tint) que controlan el eje verde-magenta del balance de color. Esto es útil cuando la iluminación tiene componentes de color no naturales, como luces fluorescentes que tienden al verde.

Para verificar la exposición correcta, D5 Render puede mostrar un histograma que indica la distribución de luminosidad en la imagen. Un histograma equilibrado con la mayoría de los datos en el centro indica una exposición correcta. Un histograma desplazado a la derecha indica sobreexposición, y desplazado a la izquierda indica subexposición.`,
  keyPoints: [
    "Exposición: controla brillo general, verificable con histograma",
    "Sobreexposición: quema highlights (zonas claras sin detalle)",
    "Subexposición: pierde detalles en sombras",
    "Balance de blancos: compensa temperatura de color (medido en Kelvin)",
    "Interior cálido (2700K) vs exterior neutro (5500K): ajustar a valor intermedio",
    "Histograma: herramienta para verificar exposición correcta",
  ],
  steps: [
    {
      title: "Ajustar la exposición manualmente",
      description: "En una escena de interior, desactiva la exposición automática y ajusta manualmente. Empieza desde un valor bajo y ve subiendo hasta que los detalles sean visibles en toda la imagen sin quemar las zonas claras.",
    },
    {
      title: "Usar el histograma",
      description: "Activa la visualización del histograma en D5 Render. Observa la distribución de luminosidad. Si el histograma está muy a la derecha, la imagen está sobreexpuesta. Si está muy a la izquierda, está subexpuesta.",
      tip: "Un histograma con picos en ambos extremos indica una escena con mucho contraste que puede requerir ajustes de iluminación, no solo de exposición.",
    },
    {
      title: "Ajustar el balance de blancos",
      description: "En una escena con iluminación mixta (natural + artificial), ajusta el balance de blancos a diferentes valores. Observa cómo los colores cambian: más cálidos con valores bajos, más fríos con valores altos.",
    },
    {
      title: "Corregir iluminación mixta",
      description: "En una escena de interior con vistas al exterior, ajusta el balance de blancos para equilibrar las temperaturas de la luz interior y exterior. Un valor de alrededor de 4000-4500K suele funcionar como compromiso.",
    },
  ],
  practice: "Renderiza la misma escena con 3 configuraciones de exposición (subexpuesta, correcta, sobreexpuesta) y 2 configuraciones de balance de blancos (cálido, neutro). Analiza los 6 resultados.",
  extraResources: [
    { label: "Exposición y balance de blancos", url: "https://www.d5render.com/help/exposure" },
  ],
});

register({
  moduleId: "modulo-6",
  topicIndex: 4,
  title: "Vistas guardadas y presets de cámara",
  objective: "Aprender a guardar y gestionar múltiples vistas de cámara en D5 Render para trabajar eficientemente con diferentes encuadres en un mismo proyecto.",
  explanation: `En un proyecto de visualización arquitectónica, normalmente necesitas producir múltiples renders desde diferentes ángulos: fachada principal, fachada posterior, vista aérea, interiores, detalles, etc. D5 Render permite guardar múltiples configuraciones de cámara para alternar rápidamente entre ellas sin tener que reencuadrar cada vez.

Las vistas guardadas almacenan no solo la posición y orientación de la cámara sino también todos sus parámetros: distancia focal, apertura (DOF), exposición, balance de blancos, y formato. Esto significa que puedes tener una vista con gran angular para el exterior y otra con teleobjetivo para un detalle, cada una con sus parámetros óptimos, y cambiar entre ellas con un clic.

Para guardar una vista, configura la cámara como desees (posición, ángulo, parámetros) y luego ve al panel de Vistas o usa el botón de guardar vista. Dale un nombre descriptivo como 'Fachada principal - 35mm' o 'Sala de estar - 24mm'. Cuantas más vistas guardes, más organizado será tu flujo de trabajo.

La organización de las vistas es importante en proyectos grandes. Nómbralas con un sistema consistente que incluya el espacio y la distancia focal: 'EXT_FachadaNorte_50mm', 'INT_SalaEstar_24mm', 'AER_VistaGeneral_14mm'. Este sistema te permitirá encontrar rápidamente la vista que necesitas.

D5 Render también permite crear presets de cámara que solo guardan los parámetros sin la posición. Esto es útil si quieres aplicar la misma configuración de exposición, DOF y balance de blancos a diferentes encuadres. Por ejemplo, un preset de 'Interior cálido' con exposición alta, balance de blancos cálido y f/4 de apertura.

Las vistas guardadas son esenciales para el flujo de trabajo de renderizado por lotes (batch rendering). En lugar de renderizar una vista a la vez manualmente, puedes configurar todas las vistas necesarias y luego renderizarlas automáticamente una tras otra. Esto es especialmente útil para entregas con múltiples imágenes donde necesitas producir 10-20 renders consistentemente.`,
  keyPoints: [
    "Las vistas guardadas almacenan posición + todos los parámetros de cámara",
    "Nombrar vistas con sistema consistente: espacio + distancia focal",
    "Los presets guardan solo parámetros sin posición",
    "Esenciales para renderizado por lotes (batch rendering)",
    "Permiten alternar rápidamente entre diferentes encuadres",
    "Organizar vistas por categoría: exteriores, interiores, detalles, aéreas",
  ],
  steps: [
    {
      title: "Configurar y guardar una vista",
      description: "Encuadra una vista de la fachada principal del edificio. Ajusta la distancia focal, exposición y balance de blancos. Guarda la vista con un nombre descriptivo como 'EXT_FachadaPrincipal_50mm'.",
    },
    {
      title: "Crear múltiples vistas",
      description: "Repite el proceso para al menos 4 vistas diferentes: fachada, interior principal, detalle, y vista aérea. Ajusta los parámetros de cámara óptimos para cada una. Nómbralas consistentemente.",
    },
    {
      title: "Alternar entre vistas",
      description: "Prueba cambiar entre las vistas guardadas haciendo clic en cada una. Observa cómo la cámara salta instantáneamente a la posición y configuración guardadas. Esto es mucho más rápido que reencuadrar manualmente cada vez.",
    },
    {
      title: "Crear un preset de parámetros",
      description: "Configura los parámetros ideales para renders de interior (exposición alta, DOF suave, balance cálido) y guárdalos como preset. Aplica este preset a diferentes encuadres de interior.",
      tip: "Los presets te ahorran tiempo cuando necesitas consistencia entre múltiples renders del mismo tipo.",
    },
  ],
  practice: "Configura al menos 8 vistas guardadas para un proyecto completo (4 exteriores + 4 interiores). Nómbralas con un sistema consistente y renderiza todas desde el panel de vistas.",
  extraResources: [
    { label: "Vistas guardadas en D5 Render", url: "https://www.d5render.com/help/saved-views" },
  ],
});

register({
  moduleId: "modulo-6",
  topicIndex: 5,
  title: "Perspectiva vs. ortográfica",
  objective: "Entender la diferencia entre vistas en perspectiva y ortográficas, y saber cuándo usar cada una según el propósito del render.",
  explanation: `D5 Render permite cambiar entre dos modos de proyección de la cámara: perspectiva y ortográfica. Cada una produce resultados visualmente diferentes y es apropiada para diferentes propósitos en la visualización arquitectónica.

La proyección en perspectiva es la que usamos normalmente. Simula cómo el ojo humano (y las cámaras fotográficas) perciben el mundo: los objetos cercanos se ven más grandes que los lejanos, las líneas paralelas convergen en un punto de fuga, y hay una sensación de profundidad y tridimensionalidad. Es la proyección más natural y la que se usa para la mayoría de los renders arquitectónicos porque crea imágenes con las que el espectador puede identificarse.

La proyección ortográfica elimina completamente la perspectiva: los objetos mantienen el mismo tamaño independientemente de su distancia a la cámara, y las líneas paralelas permanecen paralelas sin converger. Es como mirar el edificio desde el infinito con un teleobjetivo infinitamente potente. El resultado se parece a un dibujo técnico o un plano arquitectónico.

Las vistas ortográficas son especialmente útiles para mostrar fachadas, plantas y secciones con precisión dimensional. Cuando un arquitecto necesita verificar las proporciones de una fachada o la relación entre elementos, una vista ortográfica frontal proporciona información precisa sin la distorsión de la perspectiva. También son comunes en presentaciones técnicas y documentación de proyectos.

D5 Render permite alternar entre los dos modos en cualquier momento. En el panel de la cámara, busca la opción de proyección y cambia entre Perspectiva y Ortográfica. En modo ortográfico, la distancia focal ya no afecta el ángulo de visión (porque no hay perspectiva), pero sí afecta el nivel de zoom.

Para crear una fachada ortográfica, sitúa la cámara directamente frente a la fachada del edificio, sin ángulo. Cambia a proyección ortográfica y ajusta el zoom hasta encuadrar toda la fachada. El resultado será una imagen sin distorsión donde todas las líneas horizontales y verticales son perfectamente paralelas.

Una técnica avanzada es combinar vistas ortográficas con estilos de presentación. D5 Render puede aplicar efectos de contorno (outline) y sombras que, sobre una vista ortográfica, producen resultados similares a renders técnicos o ilustraciones arquitectónicas.`,
  keyPoints: [
    "Perspectiva: simula visión humana, líneas convergen, hay profundidad",
    "Ortográfica: sin perspectiva, líneas paralelas, aspecto técnico",
    "Ortográfica ideal para: fachadas, plantas, secciones, verificación de proporciones",
    "Perspectiva ideal para: renders fotorrealistas, presentación a clientes",
    "En ortográfica, la distancia focal controla el zoom, no la perspectiva",
    "Combinar ortográfica con contornos produce renders técnicos",
  ],
  steps: [
    {
      title: "Comparar perspectiva y ortográfica",
      description: "Encuadra una fachada del edificio en perspectiva. Luego cambia a proyección ortográfica. Observa cómo las líneas que convergían en perspectiva ahora son perfectamente paralelas en ortográfica.",
    },
    {
      title: "Crear una fachada ortográfica",
      description: "Sitúa la cámara directamente frente a la fachada, sin ángulo horizontal ni vertical. Cambia a ortográfica y ajusta el zoom. Verifica que todas las líneas del edificio son paralelas.",
      tip: "Para una fachada perfectamente frontal, ajusta la posición de la cámara numéricamente para que coincida exactamente con el eje del edificio.",
    },
    {
      title: "Crear una vista de planta ortográfica",
      description: "Sitúa la cámara directamente arriba del edificio, mirando hacia abajo. Cambia a ortográfica. El resultado será similar a una planta arquitectónica. Ajusta el zoom para encuadrar el área deseada.",
    },
    {
      title: "Elegir el modo apropiado para cada render",
      description: "Para un proyecto completo, decide qué renders necesitan perspectiva (presentación, marketing) y cuáles necesitan ortográfica (documentación, verificación). Planifica tus vistas en consecuencia.",
    },
  ],
  practice: "Crea 4 renders del mismo proyecto: 2 en perspectiva (exterior e interior) y 2 en ortográfica (fachada y planta). Compara la utilidad de cada tipo para diferentes propósitos.",
  extraResources: [
    { label: "Proyecciones de cámara en D5 Render", url: "https://www.d5render.com/help/camera-projection" },
  ],
});

// ============================================================
// MÓDULO 7: Renderizado
// ============================================================

register({
  moduleId: "modulo-7",
  topicIndex: 0,
  title: "Configuración de resolución y calidad de render",
  objective: "Dominar las opciones de configuración de renderizado en D5 Render, incluyendo resolución, calidad, pases de ray tracing y formatos de salida.",
  explanation: `El renderizado final es el proceso donde D5 Render calcula la imagen de alta calidad a partir de tu escena. A diferencia de la vista previa en tiempo real del viewport (que prioriza la velocidad), el render final invierte más tiempo en calcular cada píxel con precisión, produciendo una imagen sin ruido con iluminación, materiales y efectos de máxima calidad.

La resolución es el primer parámetro a configurar. Define el tamaño de la imagen en píxeles. Para presentaciones en pantalla, 1920x1080 (Full HD) suele ser suficiente. Para impresión de alta calidad, necesitarás resoluciones mayores como 3840x2160 (4K) o incluso superiores, dependiendo del tamaño de impresión y la distancia de visualización. D5 Render permite resoluciones personalizadas o presets comunes.

La calidad del render se controla mediante el número de pases de ray tracing. Cada pase calcula una muestra adicional de la iluminación, reduciendo el ruido y mejorando la precisión de las sombras, reflexiones y caústicas. Más pases = mejor calidad pero más tiempo de render. Para previews rápidos, 100-200 pases pueden ser suficientes. Para renders finales, 500-2000 pases son recomendados. Para renders de máxima calidad (competencias, impresión grande), 3000+ pases.

D5 Render también ofrece un Denoiser inteligente que elimina el ruido residual sin perder detalles. Con el Denoiser activado, puedes usar menos pases y obtener resultados similares en menos tiempo. Esto es especialmente útil en escenas con iluminación indirecta compleja donde el ruido es más persistente.

El formato de salida determina cómo se guarda la imagen. PNG es el formato más común: soporta transparencia y no tiene compresión con pérdida. JPEG es más ligero pero pierde calidad. EXR y HDR son formatos de alto rango dinámico que conservan toda la información de luminosidad, ideales para post-producción. TIFF es un formato profesional sin pérdida usado en impresión.

Para renders de noche o interiores oscuros, necesitarás más pases porque la iluminación indirecta es más compleja y genera más ruido. Para renders de día con sol directo, menos pases suelen ser suficientes porque la iluminación principal es más simple de calcular.

El tiempo de render depende principalmente de la complejidad de la escena (número de objetos, luces, materiales translúcidos), la resolución, y el número de pases. En una GPU RTX 3060, un render de 1920x1080 con 500 pases puede tomar entre 2-10 minutos dependiendo de la escena.`,
  keyPoints: [
    "Resolución: 1920x1080 (pantalla), 3840x2160 (4K/impresión), personalizada",
    "Pases de ray tracing: más pases = menos ruido + más tiempo",
    "100-200 pases: preview / 500-2000: final / 3000+: máxima calidad",
    "Denoiser: elimina ruido, permite menos pases con buena calidad",
    "Formatos: PNG (general), EXR (post-producción), JPEG (preview)",
    "Escenas nocturnas y de interior requieren más pases que exteriores diurnos",
  ],
  steps: [
    {
      title: "Configurar la resolución",
      description: "Abre el panel de renderizado en D5 Render. Selecciona la resolución deseada o ingresa valores personalizados. Para una presentación en pantalla, 1920x1080 es adecuado. Para impresión A3, usa al menos 3500x2500.",
      tip: "Si no estás seguro, renderiza a mayor resolución de la que crees necesitar. Siempre puedes reducir después, pero no puedes aumentar sin perder calidad.",
    },
    {
      title: "Ajustar la calidad (pases)",
      description: "Configura el número de pases. Para una prueba rápida, usa 100-200. Para el render final, usa 500-1000. Observa la diferencia de calidad y tiempo entre ambas configuraciones.",
    },
    {
      title: "Probar el Denoiser",
      description: "Renderiza la misma escena con 300 pases sin Denoiser y luego con Denoiser. Compara los resultados: el Denoiser debería eliminar el ruido sin borrar detalles finos.",
    },
    {
      title: "Elegir el formato de salida",
      description: "Para renders finales que no necesitan post-producción, usa PNG. Si planeas ajustar la imagen en Photoshop o After Effects, usa EXR para conservar toda la información HDR.",
    },
    {
      title: "Iniciar el render",
      description: "Haz clic en el botón de Render y observa el progreso. D5 Render mostrará la imagen mientras se renderiza, permitiéndote ver cómo se reduce el ruido con cada pase.",
    },
  ],
  practice: "Renderiza la misma vista con 3 configuraciones diferentes: baja calidad (200 pases), media (800 pases), y alta (2000 pases). Compara calidad y tiempo. Determina cuál es el equilibrio óptimo para tu equipo.",
  extraResources: [
    { label: "Configuración de renderizado", url: "https://www.d5render.com/help/render-settings" },
  ],
});

register({
  moduleId: "modulo-7",
  topicIndex: 1,
  title: "Render de imagen fija (fotografía)",
  objective: "Aprender el flujo de trabajo completo para producir renders de imagen fija de alta calidad, desde la preparación de la escena hasta la exportación final.",
  explanation: `El render de imagen fija es el tipo de output más común en visualización arquitectónica. Una imagen fija bien compuesta, iluminada y renderizada puede comunicar todo el potencial de un proyecto arquitectónico de manera que ningún otro medio puede igualar. Este tema cubre el flujo de trabajo completo para producir imágenes fijas profesionales.

La preparación es la etapa más importante. Antes de iniciar cualquier render, verifica que la escena esté completa: todos los materiales asignados, la iluminación configurada, la vegetación colocada, y los detalles finales añadidos. Un error común es empezar a renderizar antes de que la escena esté lista, desperdiciando tiempo en renders que tendrán que repetirse.

Define qué imágenes necesitas antes de empezar. Un set típico para un proyecto residencial incluye: fachada principal (exterior diurno), fachada secundaria o jardín trasero, vista aérea, sala de estar (interior), cocina/comedor, y dormitorio principal. Para proyectos comerciales, añade vistas de la entrada, espacios de trabajo y áreas comunes.

Para cada imagen, configura la cámara cuidadosamente siguiendo los principios de composición. Guarda cada vista con un nombre descriptivo. Ajusta la exposición y el balance de blancos específicamente para cada vista, ya que las condiciones de iluminación pueden variar significativamente entre diferentes ángulos y momentos del día.

El renderizado por lotes (batch render) es una función que te permite configurar múltiples vistas y renderizarlas automáticamente una tras otra. Esto es especialmente útil cuando necesitas producir un set completo de imágenes de un proyecto, ya que puedes configurar todo y dejar que D5 Render trabaje sin supervisión.

Después del render, revisa cada imagen en pantalla completa. Busca problemas como: ruido visible, materiales que no se ven correctos, sombras extrañas, objetos flotantes o intersectados, y elementos que se salen del encuadre. Si encuentras problemas, corrígelos en la escena y vuelve a renderizar solo las vistas afectadas.

Finalmente, organiza los renders en una carpeta con una nomenclatura clara. Los nombres de archivo deben incluir el proyecto, la vista y la versión (ej: 'CasaLopez_FachadaPrincipal_v02.png'). Esto facilita encontrar y compartir las imágenes correctas con el equipo y los clientes.`,
  keyPoints: [
    "Preparar la escena completamente antes de renderizar",
    "Definir el set de imágenes necesario antes de empezar",
    "Configurar cámara, exposición y balance de blancos para cada vista",
    "Usar renderizado por lotes para múltiples vistas",
    "Revisar cada imagen en pantalla completa antes de aprobar",
    "Organizar archivos con nomenclatura clara y versiones",
  ],
  steps: [
    {
      title: "Verificar la escena",
      description: "Recorre la escena en el viewport verificando que todo está correcto: materiales asignados, iluminación funcionando, vegetación colocada, sin objetos flotantes o intersectados. Haz cualquier corrección necesaria.",
    },
    {
      title: "Configurar las vistas",
      description: "Encuadra cada vista necesaria y guárdala con nombre descriptivo. Ajusta la distancia focal, exposición, balance de blancos y DOF para cada una. Verifica la composición con la cuadrícula de tercios.",
    },
    {
      title: "Configurar el renderizado",
      description: "Establece la resolución, calidad (pases), formato de salida y carpeta de destino. Activa el Denoiser para renders finales. Verifica que hay suficiente espacio en disco para todos los renders.",
    },
    {
      title: "Renderizar y revisar",
      description: "Inicia el renderizado. Revisa cada imagen resultante en pantalla completa. Busca ruido, artefactos o errores. Si encuentras problemas, corrígelos y re-renderiza solo las vistas afectadas.",
      tip: "Siempre revisa los renders en un monitor calibrado si es posible. Los colores pueden verse diferentes en diferentes pantallas.",
    },
  ],
  practice: "Produce un set completo de 6 renders para un proyecto (2 exteriores + 4 interiores). Usa renderizado por lotes y organiza los archivos con nomenclatura profesional.",
  extraResources: [
    { label: "Flujo de trabajo de renderizado", url: "https://www.d5render.com/help/render-workflow" },
  ],
});

register({
  moduleId: "modulo-7",
  topicIndex: 2,
  title: "Render de video y animación",
  objective: "Aprender a configurar y producir renders de video animado en D5 Render, incluyendo recorridos de cámara y animaciones de objetos.",
  explanation: `Los renders de video permiten mostrar el proyecto arquitectónico de una manera dinámica e inmersiva que las imágenes fijas no pueden igualar. Un recorrido de cámara puede transportar al espectador a través del espacio, mostrando la secuencia de experiencias que un visitante real tendría al recorrer el edificio. D5 Render facilita la creación de videos animados directamente desde la escena.

El tipo más común de video arquitectónico es el recorrido de cámara (camera walk-through), donde la cámara se mueve a través del espacio como si el espectador caminara por el edificio. D5 Render permite crear estos recorridos definiendo keyframes de posición de cámara a lo largo de una línea de tiempo, y el programa interpola automáticamente el movimiento entre los keyframes.

Para configurar un video, necesitas definir la resolución (generalmente 1920x1080 para web o 3840x2160 para presentaciones en pantalla grande), los frames por segundo (FPS: 24 para cinematográfico, 30 para web, 60 para suavidad extra), y la duración total del video. Un recorrido arquitectónico típico dura entre 30 segundos y 3 minutos.

La calidad del video requiere más pases por frame que una imagen fija porque cada frame se muestra solo una fracción de segundo, lo que hace que el ruido sea más visible. Se recomienda usar al menos 500 pases por frame con Denoiser activado para videos. Esto significa que un video de 30 segundos a 30 FPS (900 frames) puede tardar varias horas en renderizar.

D5 Render permite previsualizar la animación en tiempo real antes de renderizar, lo que es esencial para verificar que el movimiento de la cámara es suave y no hay cortes bruscos. También puedes renderizar una versión de baja calidad (preview) del video completo para revisar la edición antes de lanzar el render final de alta calidad.

Para hacer el recorrido más interesante, varía la velocidad de la cámara: más lento en los espacios importantes, más rápido en las transiciones. También cambia la dirección de la mirada para que la cámara no siempre mire hacia adelante, sino que mire hacia los lados para mostrar detalles interesantes.

Los videos de D5 Render se exportan en formato MP4 con códec H.264 o H.265. El formato MP4 es universalmente compatible y ofrece buena calidad con tamaño de archivo razonable. Para post-producción en After Effects, puedes exportar como secuencia de imágenes PNG o EXR que ofrecen mayor flexibilidad de edición.`,
  keyPoints: [
    "Recorrido de cámara: la cámara se mueve por el espacio simulando un visitante",
    "Resolución: 1920x1080 (web) o 3840x2160 (presentaciones)",
    "FPS: 24 (cine), 30 (web), 60 (ultra suave)",
    "Más pases por frame que imagen fija (mínimo 500 con Denoiser)",
    "Previsualizar animación antes de renderizar final",
    "Formatos: MP4 (H.264) para entrega, secuencia PNG/EXR para post-producción",
  ],
  steps: [
    {
      title: "Planificar el recorrido",
      description: "Dibuja en papel o mentalmente la ruta que seguirá la cámara. Define los puntos de inicio, los momentos clave y el final. Un buen recorrido empieza desde lejos (acercamiento), entra al edificio, recorre los espacios principales y termina con una vista memorable.",
    },
    {
      title: "Crear keyframes de cámara",
      description: "En la línea de tiempo de D5 Render, coloca keyframes de posición y dirección de cámara en los puntos clave del recorrido. Mueve la cámara a cada posición y guarda el keyframe. D5 Render interpolará el movimiento entre ellos.",
      tip: "Usa pocos keyframes al principio y ve refinando. Demasiados keyframes pueden crear movimientos erráticos.",
    },
    {
      title: "Ajustar la suavidad del movimiento",
      description: "Reproduce la animación en el viewport para verificar el movimiento. Ajusta las curvas de interpolación para que las aceleraciones y desaceleraciones sean suaves. Evita los cambios bruscos de dirección o velocidad.",
    },
    {
      title: "Configurar y renderizar el video",
      description: "Establece la resolución, FPS, calidad y formato de salida. Renderiza primero una versión de baja calidad para verificar, y luego lanza el render final de alta calidad.",
    },
  ],
  practice: "Crea un recorrido de cámara de 30 segundos a través de un proyecto. Renderiza una versión preview de baja calidad primero, revisa el movimiento, y luego renderiza la versión final.",
  extraResources: [
    { label: "Render de video en D5 Render", url: "https://www.d5render.com/help/video-render" },
  ],
});

register({
  moduleId: "modulo-7",
  topicIndex: 3,
  title: "Render panorámico 360°",
  objective: "Aprender a crear renders panorámicos 360° en D5 Render que permitan visualizaciones interactivas inmersivas.",
  explanation: `Los renders panorámicos 360° son una forma poderosa de presentar proyectos arquitectónicos de manera interactiva. A diferencia de una imagen fija tradicional que muestra solo un ángulo, un panorama 360° permite al espectador mirar en todas las direcciones como si estuviera dentro del espacio. Esto crea una experiencia inmersiva que es especialmente valiosa para presentaciones a clientes que no pueden visitar el sitio.

D5 Render genera panoramas en formato equirectangular, que es una imagen plana que contiene la información completa de 360 grados horizontales y 180 grados verticales. Esta imagen se puede visualizar con visores de realidad virtual (VR), reproductores web de 360°, o incluso subir a plataformas como Matterport o Kuula para compartir con clientes.

Para crear un render panorámico en D5 Render, selecciona la opción de render panorámico en el panel de renderizado. La resolución recomendada para panoramas es alta: al menos 4096x2048 para web y 8192x4096 para VR. La resolución alta es necesaria porque la imagen se despliega en todas las direcciones, por lo que cada dirección individual tiene solo una fracción de los píxeles totales.

La posición de la cámara es crítica en los panoramas porque el espectador puede mirar en cualquier dirección. Coloca la cámara a la altura de los ojos (aproximadamente 1.60m) en el punto más representativo del espacio. Evita posiciones donde un muro esté demasiado cerca de la cámara, ya que creará una zona sin interés visual.

La iluminación debe ser equilibrada en todas las direcciones para un panorama efectivo. Evita tener una dirección mucho más brillante que las demás, ya que el espectador sentirá que las zonas oscuras carecen de detalle. Para interiores, esto puede requerir luces artificiales adicionales en las zonas que no reciben luz natural.

Los panoramas se pueden enlazar entre sí para crear recorridos virtuales. Por ejemplo, un panorama en la sala de estar puede tener puntos de acceso (hotspots) que al hacer clic llevan al panorama de la cocina, y desde ahí a la terraza. D5 Render no crea estos recorridos directamente, pero puedes usar plataformas como Kuula o Pano2VR para enlazar los panoramas y añadir interactividad.

Para compartir panoramas, puedes subir las imágenes equirectangulares a plataformas como Kuula, Roundme o Momento360. Estas plataformas generan automáticamente la vista interactiva 360° que se puede compartir mediante un enlace o incrustar en un sitio web.`,
  keyPoints: [
    "Panoramas 360°: experiencia inmersiva donde el espectador mira en todas direcciones",
    "Formato equirectangular: imagen plana con info de 360° horizontal + 180° vertical",
    "Resolución alta: mínimo 4096x2048 (web), 8192x4096 (VR)",
    "Posicionar cámara a 1.60m de altura en el punto más representativo",
    "Iluminación equilibrada en todas las direcciones",
    "Enlazar panoramas en Kuula/Roundme para recorridos virtuales interactivos",
  ],
  steps: [
    {
      title: "Configurar el render panorámico",
      description: "En el panel de renderizado, selecciona la opción Panoramic. Configura la resolución a al menos 4096x2048. Coloca la cámara a la altura de los ojos en el centro del espacio que quieres mostrar.",
    },
    {
      title: "Verificar la iluminación",
      description: "Gira la cámara 360 grados en el viewport para verificar que la iluminación es equilibrada en todas las direcciones. Añade luces artificiales si hay zonas demasiado oscuras.",
    },
    {
      title: "Renderizar el panorama",
      description: "Inicia el renderizado. Los panoramas necesitan más pases que las imágenes fijas porque las zonas distantes pueden tener ruido. Usa al menos 800 pases con Denoiser.",
    },
    {
      title: "Visualizar el resultado",
      description: "Abre la imagen renderizada en un visor 360° para verificar que se ve correcta en todas las direcciones. Busca problemas como líneas de costura (seam lines) o zonas sin detalle.",
      tip: "Puedes usar la vista previa de 360° de D5 Render o subir la imagen a Kuula para una vista interactiva rápida.",
    },
  ],
  practice: "Crea 3 panoramas 360° para un proyecto (exterior, sala principal, terraza). Súbelos a una plataforma como Kuula y enlázalos para crear un recorrido virtual.",
  extraResources: [
    { label: "Render panorámico en D5 Render", url: "https://www.d5render.com/help/panoramic-render" },
    { label: "Kuula - Plataforma 360°", url: "https://kuula.co" },
  ],
});

register({
  moduleId: "modulo-7",
  topicIndex: 4,
  title: "Formatos de exportación",
  objective: "Conocer todos los formatos de exportación disponibles en D5 Render y saber cuándo usar cada uno según el destino final del render.",
  explanation: `Elegir el formato de exportación correcto es tan importante como el renderizado mismo. El formato afecta la calidad de la imagen, el tamaño del archivo, la compatibilidad con otros programas y la flexibilidad para post-producción. D5 Render ofrece varios formatos, cada uno con sus ventajas y desventajas.

PNG (Portable Network Graphics) es el formato más versátil y el que usarás con mayor frecuencia. Soporta 16 bits por canal (millones de colores), transparencia (canal alpha), y no tiene compresión con pérdida. Esto significa que la calidad se preserva perfectamente. El tamaño de archivo es moderado-grande. Es ideal para renders finales, presentaciones y cualquier uso donde la calidad es prioritaria.

JPEG (Joint Photographic Experts Group) es el formato más común en fotografía digital. Usa compresión con pérdida, lo que significa que cada vez que guardas un JPEG, pierdes algo de calidad. Sin embargo, a máxima calidad (100%), la pérdida es prácticamente imperceptible. El tamaño de archivo es mucho menor que PNG. Es adecuado para previews, envío por email y uso web donde el tamaño importa más que la calidad perfecta.

EXR (OpenEXR) es un formato profesional de alto rango dinámico (HDR) desarrollado por ILM. Almacena valores de color que superan el rango 0-1, permitiendo representar luminosidades superiores al blanco puro. Esto es invaluable para post-producción porque puedes ajustar la exposición, el balance de blancos y otros parámetros sin perder información. Si planeas editar tus renders en Photoshop, After Effects o Nuke, EXR es el mejor formato.

HDR (Radiance HDR) es similar a EXR pero con un formato más antiguo. También almacena información de alto rango dinámico y es útil para los mismos propósitos que EXR. La elección entre EXR y HDR suele depender de la compatibilidad con tu software de post-producción.

TIFF (Tagged Image File Format) es un formato profesional sin compresión o con compresión sin pérdida. Soporta 8 y 16 bits por canal, canales alpha, y es ampliamente compatible con software de impresión profesional. Es ideal cuando necesitas la máxima calidad para impresión de gran formato.

Para video, D5 Render exporta en MP4 con códec H.264 (compatible universalmente) o H.265 (mejor compresión, menor compatibilidad). Para post-producción de video, puedes exportar como secuencia de imágenes PNG o EXR que dan máxima flexibilidad de edición.`,
  keyPoints: [
    "PNG: sin pérdida, con transparencia, versátil, ideal para uso general",
    "JPEG: compresión con pérdida, archivos pequeños, solo para previews/web",
    "EXR: alto rango dinámico, ideal para post-producción profesional",
    "HDR: similar a EXR, para post-producción y HDRI",
    "TIFF: sin pérdida, ideal para impresión profesional de gran formato",
    "Video: MP4 (H.264/H.265) o secuencia PNG/EXR para post-producción",
  ],
  steps: [
    {
      title: "Exportar en PNG",
      description: "Renderiza una imagen en formato PNG. Observa el tamaño del archivo y la calidad. Este es tu formato de referencia para comparar con los demás.",
    },
    {
      title: "Comparar PNG vs JPEG",
      description: "Renderiza la misma vista en JPEG con calidad 100 y calidad 80. Compara con el PNG: zoom al 200% para ver los artefactos de compresión del JPEG. El JPEG a calidad 80 tiene artefactos visibles pero el archivo es mucho más pequeño.",
    },
    {
      title: "Exportar en EXR para post-producción",
      description: "Renderiza en formato EXR y abre el archivo en un editor de imágenes. Observa cómo puedes ajustar la exposición y el balance de blancos sin perder calidad. La información HDR te da una flexibilidad imposible con PNG o JPEG.",
      tip: "Los archivos EXR son grandes pero valen la pena si planeas post-producción seria.",
    },
    {
      title: "Elegir el formato según el destino",
      description: "Para cada tipo de entrega, elige el formato apropiado: presentación en pantalla (PNG), email/cliente (JPEG alta calidad), post-producción (EXR), impresión (TIFF), video (MP4).",
    },
  ],
  practice: "Renderiza la misma vista en PNG, JPEG y EXR. Abre los tres en un editor y compara calidad, tamaño y flexibilidad de edición. Documenta cuándo usarías cada formato.",
  extraResources: [
    { label: "Formatos de exportación D5 Render", url: "https://www.d5render.com/help/export-formats" },
  ],
});

register({
  moduleId: "modulo-7",
  topicIndex: 5,
  title: "Optimización del tiempo de render",
  objective: "Aprender estrategias y técnicas para optimizar el tiempo de renderizado sin sacrificar calidad, haciendo el flujo de trabajo más eficiente.",
  explanation: `El tiempo es uno de los recursos más valiosos en visualización arquitectónica, y optimizar el tiempo de render sin sacrificar calidad es una habilidad que diferencia a los profesionales eficientes de los que pierden horas innecesariamente. Hay muchas estrategias que puedes aplicar para acelerar tus renders.

La optimización de la escena es el primer paso. Las escenas con geometría innecesaria, materiales excesivamente complejos y luces redundantes tardan más en renderizar. Revisa tu escena y elimina objetos que no son visibles desde el ángulo de la cámara (backface culling manual). Simplifica la geometría de objetos lejanos: un árbol a 100 metros no necesita el mismo nivel de detalle que uno a 5 metros.

Los materiales translúcidos (vidrio, agua) son los más costosos de renderizar porque cada rayo de luz que los atraviesa debe ser calculado adicionalmente. Si un vidrio es visible pero no es el foco de la imagen, considera reducir la calidad de refracción o usar un material más simple. Si el vidrio está lejos, reemplázalo por un material opaco con textura de reflexión.

El uso inteligente del Denoiser es la mayor optimización disponible. Con el Denoiser activado, puedes reducir los pases a la mitad o más obteniendo resultados visualmente equivalentes. Un render de 500 pases con Denoiser puede verse tan bueno como uno de 1500 pases sin Denoiser, pero en una fracción del tiempo.

La resolución también puede optimizarse. Si el render final se verá en una pantalla de 1080p, no necesitas renderizar a 4K. Si necesitas imprimir a tamaño A3, calcula la resolución mínima necesaria (A3 a 300 DPI = 3508x4961 píxeles) y no renderices a más.

El renderizado por capas (pass rendering) te permite renderizar elementos por separado (iluminación difusa, reflexiones, sombras) y componerlos en post-producción. Esto es más eficiente porque puedes re-renderizar solo la capa que necesita cambios en lugar de toda la imagen.

Para videos, la optimización es aún más importante. Renderizar cientos de frames a máxima calidad puede tomar días. Usa resoluciones más bajas para previews, reduce los pases por frame, y usa el Denoiser agresivamente. Solo renderiza a máxima calidad los frames clave o el segmento final.

Finalmente, la optimización del hardware también cuenta. Mantén los drivers actualizados, cierra otros programas que consuman VRAM, y considera usar GPU con más VRAM si tu trabajo lo requiere. La VRAM es el recurso más limitado y el que más afecta al rendimiento.`,
  keyPoints: [
    "Eliminar geometría innecesaria y simplificar objetos lejanos",
    "Materiales translúcidos (vidrio, agua) son los más costosos de renderizar",
    "El Denoiser permite reducir pases a la mitad con resultados equivalentes",
    "No renderizar a más resolución de la necesaria para el destino final",
    "Renderizar por capas para cambios eficientes en post-producción",
    "Para videos: previews de baja calidad primero, alta calidad solo al final",
  ],
  steps: [
    {
      title: "Auditar la escena",
      description: "Recorre tu escena y busca objetos innecesarios: geometría oculta, objetos duplicados, luces redundantes. Elimina todo lo que no aporta al render final. Cada objeto eliminado es tiempo de render ahorrado.",
    },
    {
      title: "Simplificar materiales costosos",
      description: "Identifica los materiales translúcidos (vidrio, agua). Si alguno no es importante para la imagen, reemplázalo con un material más simple. Si es importante, verifica que no tiene parámetros excesivos.",
    },
    {
      title: "Comparar con y sin Denoiser",
      description: "Renderiza la misma escena con 500 pases sin Denoiser y con 300 pases con Denoiser. Compara la calidad visual y el tiempo. Lo más probable es que el resultado con Denoiser sea indistinguible pero más rápido.",
      tip: "El Denoiser es tu mejor amigo para optimizar tiempo sin sacrificar calidad visible.",
    },
    {
      title: "Optimizar la resolución",
      description: "Calcula la resolución mínima necesaria para tu destino final. Si el render se verá en una presentación PowerPoint a 1080p, no necesitas más de 1920x1080. Reduce la resolución y observa cómo baja el tiempo de render.",
    },
  ],
  practice: "Toma una escena compleja y optimízala siguiendo todos los pasos anteriores. Mide el tiempo de render antes y después de la optimización. Documenta el porcentaje de mejora.",
  extraResources: [
    { label: "Optimización de renderizado", url: "https://www.d5render.com/help/render-optimization" },
  ],
});

// ============================================================
// MÓDULO 8: Efectos y Post-producción
// ============================================================

register({
  moduleId: "modulo-8",
  topicIndex: 0,
  title: "Panel de efectos de post-producción",
  objective: "Conocer el panel de efectos de post-producción integrado de D5 Render y aprender a usarlo para mejorar los renders sin necesidad de software externo.",
  explanation: `D5 Render incluye un potente panel de efectos de post-producción que te permite ajustar y mejorar tus renders directamente en el programa, sin necesidad de exportar a Photoshop o After Effects. Este panel es una de las grandes ventajas de D5 Render frente a otros motores que requieren post-producción externa para ajustes básicos.

El panel de efectos se accede desde la barra de herramientas o con un atajo de teclado. Muestra una lista de efectos disponibles que puedes activar, desactivar y ajustar individualmente. Los efectos se aplican en tiempo real sobre la vista previa del viewport, lo que te permite ver el resultado instantáneamente mientras ajustas los parámetros.

La organización del panel es jerárquica: los efectos se aplican en orden, desde los más básicos (exposición, contraste) hasta los más complejos (bloom, viñeta). Puedes reordenar los efectos arrastrándolos, aunque el orden por defecto suele ser el más lógico.

Cada efecto tiene un interruptor de activación/desactivación y parámetros ajustables con deslizadores. También hay un botón de reset para volver a los valores por defecto de cada efecto. Es recomendable empezar con todos los efectos desactivados e ir añadiéndolos uno a uno para un control preciso.

Los ajustes de post-producción se guardan con la escena, por lo que tus efectos se mantendrán entre sesiones. También puedes guardar presets de post-producción para aplicar la misma configuración a diferentes escenas o proyectos.

Es importante entender que la post-producción no puede arreglar un render mal hecho. Si la iluminación es incorrecta o los materiales están mal configurados, los efectos de post-producción solo pueden mejorar parcialmente el resultado. La post-producción debe ser el toque final, no una corrección de errores fundamentales.

La regla general para la post-producción es la sutileza. Los mejores efectos de post-producción son los que el espectador no nota conscientemente pero que hacen que la imagen se vea 'mejor' de alguna manera difícil de definir. Evita los efectos exagerados que hacen que el render se vea artificial o sobre-procesado.`,
  keyPoints: [
    "Panel integrado con efectos en tiempo real sobre la vista previa",
    "Efectos se aplican en orden jerárquico",
    "Cada efecto tiene activación, parámetros y reset individual",
    "Los ajustes se guardan con la escena",
    "La post-producción no sustituye un buen render base",
    "La sutileza es la regla: los mejores efectos son los que no se notan",
  ],
  steps: [
    {
      title: "Abrir el panel de efectos",
      description: "Abre el panel de efectos de post-producción en D5 Render. Familiarízate con la lista de efectos disponibles y la interfaz de cada uno. Observa cómo cada efecto tiene un interruptor y deslizadores de parámetros.",
    },
    {
      title: "Aplicar ajustes básicos",
      description: "Activa los ajustes de exposición y contraste. Ajusta ligeramente el contraste (un aumento de 5-10% suele ser suficiente) para dar más punch a la imagen. Observa cómo la imagen gana viveza sin dejar de verse natural.",
    },
    {
      title: "Probar cada efecto individualmente",
      description: "Activa un efecto a la vez y ajusta sus parámetros. Observa cómo afecta a la imagen. Luego desactívalo y prueba el siguiente. Esto te dará un entendimiento claro de qué hace cada efecto sin interferencias.",
    },
    {
      title: "Combinar efectos con moderación",
      description: "Activa 2-3 efectos que complementen tu escena (por ejemplo: ligero bloom + contraste suave + viñeta sutil). Ajusta cada uno para que su contribución sea apenas perceptible individualmente pero el conjunto mejore notablemente la imagen.",
      tip: "Activa y desactiva todos los efectos para comparar el antes y después. Si la diferencia es demasiado obvia, reduce la intensidad.",
    },
  ],
  practice: "Aplica efectos de post-producción a 3 renders diferentes. Para cada uno, documenta qué efectos usaste y con qué parámetros. Compara el antes y después.",
  extraResources: [
    { label: "Post-producción en D5 Render", url: "https://www.d5render.com/help/post-production" },
  ],
});

register({
  moduleId: "modulo-8",
  topicIndex: 1,
  title: "Ambient Occlusion (AO)",
  objective: "Entender qué es el Ambient Occlusion y cómo usarlo en D5 Render para añadir profundidad y realismo a los renders oscureciendo zonas de contacto y esquinas.",
  explanation: `El Ambient Occlusion (AO) u Oclusión Ambiental es un efecto de sombreado que simula cómo la luz ambiente tiene dificultad para llegar a las esquinas, grietas y zonas de contacto entre objetos. En la realidad, estas zonas siempre son más oscuras porque los objetos cercanos bloquean parte de la luz que llegaría desde el entorno. El AO reproduce este fenómeno, añadiendo profundidad y definición a la imagen.

Sin AO, los renders pueden verse planos porque todos los objetos tienen la misma cantidad de luz ambiental. Con AO, las zonas donde los objetos se encuentran (un muro con el piso, una viga con el techo, una silla sobre el suelo) se oscurecen sutilmente, creando una sensación de contacto y peso que el cerebro interpreta como realismo.

D5 Render calcula AO automáticamente como parte del renderizado con ray tracing, pero también ofrece un efecto de AO en el panel de post-producción que puedes ajustar. El AO del panel de post-producción es un overlay adicional que intensifica el efecto del AO nativo.

Los parámetros principales del AO son: intensidad (qué tan oscuro se hace el efecto), radio (hasta qué distancia del contacto se extiende la oscuridad), y suavizado (qué tan gradual es la transición entre la zona oscurecida y la normal).

El AO es especialmente efectivo en interiores donde hay muchas zonas de contacto: muebles contra paredes, marcos de puertas, zócalos, y esquinas de habitaciones. Un AO sutil en estas zonas puede transformar un interior plano en un espacio con profundidad y definición.

Es importante no exagerar el AO. Un AO demasiado intenso creará líneas oscuras artificiales alrededor de todos los objetos, haciendo que la escena parezca sucia o con sombras excesivas. El AO real es muy sutil: apenas un oscurecimiento ligero en las zonas de contacto, no sombras pronunciadas.`,
  keyPoints: [
    "AO oscurece zonas de contacto y esquinas donde la luz ambiente no llega",
    "Añade profundidad y sensación de peso a los objetos",
    "D5 Render calcula AO nativo + permite ajuste en post-producción",
    "Parámetros: intensidad, radio y suavizado",
    "Especialmente efectivo en interiores con muchos contactos",
    "La sutileza es clave: AO exagerado parece sombras artificiales",
  ],
  steps: [
    {
      title: "Activar y ajustar el AO",
      description: "Abre el panel de post-producción y activa Ambient Occlusion. Ajusta la intensidad a un valor bajo (0.3-0.5) como punto de partida. Observa cómo las esquinas y zonas de contacto se oscurecen sutilmente.",
    },
    {
      title: "Ajustar el radio",
      description: "Cambia el radio del AO de pequeño a grande. Un radio pequeño afecta solo las zonas muy cercanas al contacto. Un radio grande extiende el efecto más lejos. Para interiores arquitectónicos, un radio medio suele ser el más apropiado.",
      tip: "El radio debe ser proporcional a la escala de la escena. Interiores pequeños necesitan radio pequeño, exteriores necesitan radio grande.",
    },
    {
      title: "Comparar con y sin AO",
      description: "Alterna el AO activado/desactivado. Observa la diferencia: sin AO, la imagen se ve más plana; con AO, hay más profundidad y definición. Si la diferencia es demasiado obvia, reduce la intensidad.",
    },
    {
      title: "Aplicar AO en una escena de interior",
      description: "En una escena de interior, ajusta el AO para que los muebles se asienten naturalmente en el piso, los zócalos se definan contra la pared, y las esquinas del techo se oscurezcan ligeramente.",
    },
  ],
  practice: "Aplica AO a una escena de interior y a una de exterior. Compara cómo el efecto funciona en cada caso y documenta los parámetros óptimos para cada tipo de escena.",
  extraResources: [
    { label: "Ambient Occlusion en D5 Render", url: "https://www.d5render.com/help/ao" },
  ],
});

register({
  moduleId: "modulo-8",
  topicIndex: 2,
  title: "Bloom y resplandor",
  objective: "Aprender a usar el efecto Bloom en D5 Render para crear resplandor realista alrededor de fuentes de luz brillantes y reflejos intensos.",
  explanation: `El Bloom (también llamado glow o resplandor) es un efecto óptico que simula cómo las cámaras fotográficas y el ojo humano perciben las fuentes de luz extremadamente brillantes: se produce un halo suave y difuso alrededor del punto luminoso que se extiende más allá de sus bordes reales. Este efecto es natural y lo vemos constantemente en la vida real cuando miramos luces brillantes.

En el mundo real, el bloom ocurre porque la luz de una fuente muy brillante se dispersa dentro del objetivo de la cámara o el ojo, afectando los píxeles cercanos. En renderizado, el bloom simula este comportamiento, haciendo que las luces brillantes, los reflejos intensos y las superficies muy iluminadas emitan un resplandor suave.

D5 Render incluye un efecto de Bloom en el panel de post-producción. Los parámetros principales son: intensidad (qué tan visible es el resplandor), umbral (qué nivel de brillo necesita un píxel para generar bloom) y radio (qué tan lejos se extiende el resplandor desde la fuente).

El umbral es el parámetro más importante. Si lo configuras bajo, muchas superficies generarán bloom (incluyendo algunas que no deberían), haciendo que toda la imagen parezca brumosa. Si lo configuras alto, solo las luces más brillantes generarán bloom, lo cual es más realista. La clave es encontrar el umbral que haga que solo las fuentes de luz directas y los reflejos más intensos produzcan resplandor.

El bloom es especialmente efectivo en escenas nocturnas donde las luces artificiales crean resplandor visible. Una farola en la noche, una ventana iluminada, o un spot dirigido hacia la cámara lucen mucho más realistas con un bloom sutil. También mejora los renders de día cuando el sol crea reflejos intensos en ventanas o superficies metálicas.

Para escenas de interior, el bloom puede suavizar la apariencia de las lámparas y crear un ambiente más cálido y acogedor. Las pantallas de lámparas con bloom parecen emitir luz de manera más natural.

Es importante no confundir bloom con sobreexposición. El bloom añade resplandor a las fuentes brillantes sin afectar el resto de la imagen. La sobreexposición ilumina toda la imagen. Si tu imagen se ve lavada o deslavada, probablemente tienes el umbral de bloom demasiado bajo o la intensidad demasiado alta.`,
  keyPoints: [
    "Bloom simula el resplandor de luces brillantes en cámaras reales",
    "Parámetros: intensidad, umbral (nivel mínimo de brillo) y radio",
    "El umbral es clave: bajo = todo resplandece, alto = solo las luces más brillantes",
    "Especialmente efectivo en escenas nocturnas y reflejos intensos",
    "No confundir con sobreexposición: bloom solo afecta zonas brillantes",
    "La sutileza es importante: bloom excesivo hace la imagen brumosa",
  ],
  steps: [
    {
      title: "Activar el Bloom",
      description: "En una escena con luces visibles, activa el efecto Bloom en el panel de post-producción. Observa cómo las fuentes de luz generan un resplandor suave a su alrededor.",
    },
    {
      title: "Ajustar el umbral",
      description: "Sube el umbral hasta que solo las luces más brillantes produzcan bloom. Baja el umbral gradualmente y observa cómo más superficies empiezan a resplandecer. Encuentra el punto donde solo las luces y reflejos más intensos tienen bloom.",
      tip: "El umbral correcto depende de la escena. Escenas nocturnas necesitan umbral más bajo, escenas diurnas umbral más alto.",
    },
    {
      title: "Ajustar la intensidad y el radio",
      description: "Con el umbral correcto, ajusta la intensidad del bloom. Un valor de 0.2-0.4 suele ser suficiente para realismo. Ajusta el radio para que el resplandor se extienda naturalmente sin ser demasiado amplio.",
    },
    {
      title: "Probar en diferentes condiciones",
      description: "Aplica bloom a una escena nocturna y a una diurna. Observa cómo el efecto funciona diferente en cada caso: más pronunciado en la noche, más sutil en el día.",
    },
  ],
  practice: "Crea una escena nocturna con luces artificiales visibles. Aplica bloom con parámetros sutiles y renderiza con y sin el efecto. Compara el realismo de ambas versiones.",
  extraResources: [
    { label: "Efecto Bloom en D5 Render", url: "https://www.d5render.com/help/bloom" },
  ],
});

register({
  moduleId: "modulo-8",
  topicIndex: 3,
  title: "Viñeta y corrección de color",
  objective: "Aprender a usar los efectos de viñeta y corrección de color en D5 Render para dar un acabado cinematográfico y consistente a los renders.",
  explanation: `La viñeta y la corrección de color son dos efectos de post-producción que, aunque sutiles, pueden transformar significativamente el mood y la calidad percibida de un render. Son las herramientas finales que dan el 'toque profesional' a una imagen.

La viñeta es un efecto que oscurece gradualmente los bordes de la imagen mientras mantiene el centro más brillante. Este fenómeno ocurre naturalmente en muchas cámaras fotográficas debido a las características del objetivo. En post-producción, la viñeta se usa para dirigir la atención del espectador hacia el centro de la imagen y crear una sensación de intimidad.

Los parámetros de la viñeta son: intensidad (qué tan oscuros son los bordes) y suavizado (qué tan gradual es la transición entre el centro y los bordes). Una viñeta sutil apenas se nota conscientemente pero subconscientemente dirige la mirada al centro. Una viñeta fuerte crea un efecto dramático y cinematográfico.

La corrección de color abarca varios ajustes: temperatura (cálido/frío), tinte (verde/magenta), saturación (intensidad del color), y contraste. Estos ajustes permiten afinar el mood de la imagen de manera similar a como un fotógrafo edita sus fotos.

La temperatura ajusta el balance entre tonos cálidos (amarillo/naranja) y fríos (azul). Subir la temperatura añade calidez (ideal para atardeceres e interiores acogedores). Bajarla añade frialdad (ideal para escenas nocturnas y ambientes contemporáneos).

La saturación controla la intensidad de los colores. Los renders de D5 Render suelen tener colores ligeramente sobresaturados por defecto. Reducir la saturación un 5-10% puede hacer que los colores se vean más naturales y menos 'computarizados'. Para renders en blanco y negro o desaturados, puedes reducir la saturación significativamente.

El contraste separa los tonos claros de los oscuros, dando más punch a la imagen. Un contraste ligeramente aumentado (5-15%) hace que el render se vea más definido y profesional. Demasiado contraste quema los highlights y pierde detalles en las sombras.

Una técnica profesional es crear 'looks' consistentes aplicando las mismas correcciones de color a todas las imágenes de un proyecto. Esto crea una paleta visual coherente que refuerza la identidad del proyecto. Puedes guardar tus ajustes como presets para aplicarlos a todas las vistas.`,
  keyPoints: [
    "Viñeta: oscurece bordes para dirigir atención al centro",
    "Corrección de color: temperatura, tinte, saturación, contraste",
    "Viñeta sutil: casi imperceptible pero efectiva",
    "Reducir saturación 5-10% suele hacer los renders más naturales",
    "Contraste aumentado 5-15% da más punch sin quemar detalles",
    "Guardar presets de color para consistencia entre renders del mismo proyecto",
  ],
  steps: [
    {
      title: "Aplicar una viñeta sutil",
      description: "En el panel de post-producción, activa la viñeta y ajusta la intensidad a un valor bajo (0.2-0.4). Configura el suavizado para que la transición sea gradual. Observa cómo la atención se dirige al centro de la imagen.",
    },
    {
      title: "Ajustar la temperatura de color",
      description: "Para una escena de interior cálido, sube la temperatura ligeramente. Para un exterior contemporáneo, bájala un poco. Encuentra la temperatura que mejor comunique el mood deseado.",
      tip: "Compara tu render con fotos de referencia del tipo de espacio que quieres simular. La temperatura de color debe ser similar.",
    },
    {
      title: "Afinar la saturación",
      description: "Reduce la saturación un 5-10% y observa si los colores se ven más naturales. Si la escena se ve deslavada, vuelve a subir un poco. El objetivo es colores realistas, no sobresaturados.",
    },
    {
      title: "Ajustar el contraste",
      description: "Aumenta el contraste un 5-10% para dar más definición a la imagen. Verifica que no se queman los highlights ni se pierden detalles en las sombras. Ajusta hasta encontrar el equilibrio.",
    },
  ],
  practice: "Crea 3 'looks' diferentes para el mismo render: cálido acogedor (interior residencial), neutro profesional (oficina), y frío dramático (exterior nocturno). Documenta los parámetros de cada look.",
  extraResources: [
    { label: "Corrección de color en D5 Render", url: "https://www.d5render.com/help/color-correction" },
  ],
});

register({
  moduleId: "modulo-8",
  topicIndex: 4,
  title: "Estilos artísticos y efectos especiales",
  objective: "Explorar los estilos artísticos y efectos especiales disponibles en D5 Render para crear renders no fotorrealistas y presentaciones creativas.",
  explanation: `Aunque el fotorrealismo es el objetivo principal de la mayoría de los renders arquitectónicos, hay situaciones donde un estilo artístico o un efecto especial puede comunicar mejor la idea del proyecto. D5 Render incluye varias opciones no fotorrealistas que permiten crear renders con estilos únicos.

El modo de contorno (Outline/Outline Render) es uno de los estilos más útiles. Dibuja líneas negras en los bordes de los objetos, creando un efecto similar a una ilustración o un dibujo técnico. Los parámetros controlan el grosor de las líneas y qué bordes se muestran (solo silueta, todos los bordes, o bordes basados en ángulo). Combinado con colores planos o iluminación simplificada, produce resultados que recuerdan a ilustraciones arquitectónicas.

El estilo acuarela simula la apariencia de una pintura en acuarela, con bordes suaves y difuminados, colores que se mezclan, y un aspecto orgánico y artesanal. Este estilo es popular en presentaciones de paisajismo y proyectos residenciales donde se busca una estética más humana y menos técnica.

El estilo conceptual simplifica la escena a formas básicas con colores sólidos y sombras mínimas. Es útil en las primeras etapas del diseño cuando quieres mostrar el concepto sin comprometerte con detalles específicos. También se usa en diagramas y esquemas donde la claridad es más importante que el realismo.

El efecto de tilt-shift simula la fotografía de maquetas, haciendo que la escena parezca un modelo en miniatura. Funciona combinando una viñeta selectiva con profundidad de campo pronunciada, creando una banda nítida en el centro de la imagen mientras que arriba y abajo se desenfocan. Es un efecto divertido para presentaciones pero debe usarse con moderación.

El estilo nocturno cinematográfico combina varios efectos (bloom intenso, viñeta fuerte, colores fríos con acentos cálidos, alto contraste) para crear imágenes que parecen sacadas de una película. Es efectivo para presentaciones dramáticas de proyectos de hostelería y entretenimiento.

D5 Render permite combinar estos estilos con el renderizado fotorrealista, creando imágenes híbridas donde elementos específicos tienen tratamiento artístico mientras otros se mantienen realistas. Por ejemplo, un edificio con estilo de contorno sobre un fondo fotorrealista.`,
  keyPoints: [
    "Contorno (Outline): dibuja líneas en bordes, estilo ilustración/técnico",
    "Acuarela: aspecto orgánico y artesanal, popular en paisajismo",
    "Conceptual: formas básicas y colores sólidos, para etapas tempranas",
    "Tilt-shift: simula fotografía de maquetas con DOF pronunciada",
    "Nocturno cinematográfico: bloom + viñeta + colores fríos + alto contraste",
    "Se pueden combinar estilos artísticos con elementos fotorrealistas",
  ],
  steps: [
    {
      title: "Probar el modo contorno",
      description: "Activa el efecto de contorno en el panel de post-producción. Ajusta el grosor de las líneas y los parámetros de detección de bordes. Renderiza una vista con solo contornos y luego con contornos sobre el render fotorrealista.",
    },
    {
      title: "Explorar el estilo acuarela",
      description: "Si D5 Render tiene un preset de acuarela, aplícalo y observa los resultados. Si no, intenta simularlo combinando: suavizado de imagen, saturación reducida, y viñeta suave.",
    },
    {
      title: "Crear un estilo conceptual",
      description: "Crea un render conceptual eliminando texturas (usando colores sólidos), simplificando materiales, y activando contornos sutiles. El resultado debe comunicar la idea del proyecto sin detalles distractores.",
      tip: "Los renders conceptuales son excelentes para competencias donde quieres que el jurado se enfoque en la idea, no en los materiales.",
    },
    {
      title: "Experimentar con tilt-shift",
      description: "Aplica un DOF pronunciado con la zona de enfoque en una franja horizontal del centro. Aumenta la saturación y añade viñeta. Observa cómo la escena parece una maqueta en miniatura.",
    },
  ],
  practice: "Crea 3 versiones del mismo proyecto con estilos diferentes: fotorrealista, ilustración con contornos, y conceptual. Compara cuándo sería apropiado usar cada estilo.",
  extraResources: [
    { label: "Estilos artísticos en D5 Render", url: "https://www.d5render.com/help/artistic-styles" },
  ],
});

register({
  moduleId: "modulo-8",
  topicIndex: 5,
  title: "Exportación para post-producción externa (Photoshop, After Effects)",
  objective: "Aprender a preparar y exportar renders de D5 Render para post-producción profesional en Photoshop, After Effects u otros software de edición.",
  explanation: `Aunque D5 Render tiene herramientas de post-producción integradas, para ajustes avanzados y composición profesional necesitarás usar software externo como Adobe Photoshop (para imágenes fijas) o After Effects (para video). Este tema cubre cómo preparar y exportar tus renders para estos programas.

El primer paso es renderizar en el formato correcto. Para post-producción en Photoshop, el formato EXR es ideal porque conserva toda la información HDR, permitiéndote ajustar exposición, balance de blancos y niveles sin perder calidad. Si no tienes EXR disponible, PNG de 16 bits es la segunda mejor opción. Nunca uses JPEG para post-producción porque la compresión con pérdida degrada la imagen con cada edición.

D5 Render permite renderizar por capas (render passes), que son imágenes separadas que contienen información específica de cada aspecto del render. Los passes más útiles son: iluminación difusa (solo la luz directa), iluminación indirecta (solo la luz rebotada), reflexiones, sombras, y occlusión ambiental. Al tener estos elementos por separado, puedes ajustar cada uno independientemente en Photoshop.

El pase de reflexiones te permite intensificar o suavizar las reflexiones sin afectar el resto de la imagen. El pase de sombras te permite aclarar u oscurecer las sombras sin cambiar la iluminación directa. El pase de AO te permite ajustar la oclusión ambiental independientemente. Esta flexibilidad es imposible si solo tienes el render final combinado.

Para exportar el canal alpha (transparencia), activa la opción de Alpha Channel en la configuración de renderizado. El canal alpha te permite separar el edificio del fondo, lo que es útil para reemplazar el cielo o añadir elementos en post-producción.

El flujo de trabajo típico en Photoshop es: abrir el render EXR, ajustar la exposición y balance de blancos usando los ajustes de Camera Raw, componer los passes individuales como capas con modos de fusión (Screen para reflexiones, Multiply para sombras), y aplicar ajustes finales como curvas, niveles y corrección de color.

Para After Effects, el flujo es similar pero orientado a video. Importa la secuencia de imágenes EXR, componla con los passes, y añade efectos y transiciones. After Effects es especialmente útil para añadir elementos que no puedes crear fácilmente en D5 Render: personas, coches en movimiento, partículas, y efectos atmosféricos complejos.

Otra técnica es renderizar una imagen de profundidad (Z-depth pass) que codifica la distancia de cada píxel a la cámara en escala de grises. Con esta información, puedes aplicar efectos basados en profundidad en post-producción: niebla volumétrica, DOF adicional, o color grading por distancia.`,
  keyPoints: [
    "EXR es el mejor formato para post-producción (conserva HDR)",
    "Renderizar por capas/passes: reflexiones, sombras, AO, iluminación",
    "Canal alpha: separa edificio del fondo para reemplazar cielo",
    "En Photoshop: EXR + Camera Raw + capas con modos de fusión",
    "En After Effects: secuencia EXR + composición + efectos",
    "Z-depth pass: permite efectos basados en profundidad en post",
  ],
  steps: [
    {
      title: "Renderizar en EXR con passes",
      description: "Configura el renderizado en formato EXR y activa los passes disponibles (reflexiones, sombras, AO, iluminación, alpha). Renderiza y verifica que se generan todos los archivos de pass.",
    },
    {
      title: "Abrir en Photoshop",
      description: "Abre el archivo EXR principal en Photoshop. Usa Camera Raw Filter para ajustar la exposición y el balance de blancos. Observa cómo puedes hacer ajustes significativos sin perder calidad gracias a la información HDR.",
      tip: "Si no tienes EXR, abre el PNG y duplica la capa antes de hacer ajustes. Así siempre puedes volver al original.",
    },
    {
      title: "Componer los passes",
      description: "Abre los passes de reflexiones y sombras como capas. Pon las reflexiones en modo Screen y las sombras en modo Multiply. Ajusta la opacidad de cada capa para controlar su intensidad.",
    },
    {
      title: "Usar el canal alpha",
      description: "Usa el canal alpha para crear una selección del edificio. Con el edificio seleccionado, puedes aplicar ajustes solo al edificio sin afectar el cielo, o viceversa. Esto es especialmente útil para reemplazar el cielo.",
    },
  ],
  practice: "Renderiza una escena con EXR y todos los passes disponibles. Compón la imagen en Photoshop usando los passes como capas. Documenta los ajustes que haces y compara el resultado con el render directo de D5 Render.",
  extraResources: [
    { label: "Exportación para post-producción", url: "https://www.d5render.com/help/post-export" },
  ],
});

console.log(`Topic content loaded: ${contentMap.size} topics`);
