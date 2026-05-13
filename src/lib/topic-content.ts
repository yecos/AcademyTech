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

console.log(`Topic content loaded: ${contentMap.size} topics`);
