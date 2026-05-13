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

console.log(`Topic content loaded: ${contentMap.size} topics`);
