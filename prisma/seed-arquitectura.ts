import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ─── Curso: Diseño Arquitectónico con BIM ────────────────────────
const courseData = {
  slug: "diseno-arquitectonico-bim",
  title: "Diseño Arquitectónico con BIM",
  description:
    "Domina la metodología BIM (Building Information Modeling) desde los fundamentos hasta la práctica profesional. Aprende a crear modelos inteligentes con Revit, coordinar disciplinas, generar documentación constructiva y visualizar proyectos de forma fotorrealista. Este curso te prepara para trabajar en estudios de arquitectura y constructoras que exigen competencias BIM.",
  image: "/images/modules/modulo-1.png",
  icon: "🏛️",
  order: 2,
  published: true,
  level: "principiante" as const,
  duration: "45 horas",
  status: "published" as const,
};

const modules = [
  {
    number: 1,
    title: "Fundamentos del BIM y Modelado de Información",
    description:
      "Comprende qué es BIM, su historia, beneficios frente al CAD tradicional y los estándares internacionales que rigen su implementación.",
    topics: [
      {
        number: 1,
        name: "¿Qué es BIM? Conceptos y definición",
        difficulty: "basico",
        estimatedTime: "25 min",
        content: `BIM (Building Information Modeling) es una metodología de trabajo colaborativo que transforma la forma en que se diseñan, construyen y gestionan los edificios e infraestructuras. A diferencia del dibujo asistido por ordenador (CAD), donde se generan representaciones geométricas del proyecto, BIM crea un modelo digital inteligente que contiene no solo la geometría tridimensional sino también información detallada sobre cada componente: materiales, costos, propiedades físicas, plazos de ejecución y datos de mantenimiento.

El concepto de BIM surge de la necesidad de integrar toda la información de un proyecto en un único modelo centralizado. En lugar de trabajar con decenas de planos desconectados, BIM permite que todos los agentes involucrados —arquitectos, ingenieros, contratistas y propietarios— trabajen sobre la misma fuente de verdad. Esto reduce errores, elimina duplicidades y mejora significativamente la comunicación entre disciplinas.

La normativa internacional define distintos niveles de madurez BIM: el Nivel 0 corresponde al trabajo con CAD sin colaboración; el Nivel 1 introduce estándares de nombrado y organización; el Nivel 2 implica colaboración entre disciplinas mediante archivos compartidos; y el Nivel 3 representa la integración total en un modelo único en la nube. Comprender estos niveles es fundamental para evaluar el grado de implementación de BIM en un estudio o empresa constructora.

Entre los beneficios más destacados de BIM se encuentran la detección temprana de colisiones (clash detection), la generación automática de cuantificaciones y presupuestos, la simulación de la secuencia constructiva (4D), el análisis de costos (5D) y la planificación del mantenimiento durante todo el ciclo de vida del edificio (6D). Estas dimensiones hacen de BIM mucho más que una herramienta de diseño: es un ecosistema completo de gestión del proyecto.`,
      },
      {
        number: 2,
        name: "Historia y evolución del BIM",
        difficulty: "basico",
        estimatedTime: "20 min",
        content: `Los orígenes de BIM se remontan a la década de 1970, cuando investigadores como Charles Eastman en la Universidad de Carnegie Mellon comenzaron a explorar el concepto de "Building Description System", un sistema capaz de almacenar información de diseño de edificios de forma estructurada. Eastman es considerado uno de los padres del BIM moderno, ya que su visión anticipó la necesidad de modelos digitales integrados.

En la década de 1980, surgieron las primeras herramientas comerciales que incorporaban elementos del paradigma BIM. ArchiCAD, lanzado en 1984 por Graphisoft, fue el primer software de arquitectura basado en un modelo 3D paramétrico. Le siguieron programas como Vectorworks y Allplan. Sin embargo, fue en los años 2000 cuando BIM experimentó una adopción masiva gracias a la aparición de Revit de Autodesk (2000), que popularizó el modelado paramétrico orientado a componentes inteligentes.

La adopción gubernamental jugó un papel crucial en la expansión de BIM. En 2011, el gobierno del Reino Unido emitió la "BIM Mandate", exigiendo el uso de BIM Nivel 2 en todos los proyectos públicos a partir de 2016. Este mandato impulsó la transformación de toda la industria británica de la construcción. Países como Singapur, Escandinavia, Estados Unidos y varias naciones de la Unión Europea siguieron caminos similares, estableciendo requisitos BIM para proyectos de infraestructura pública.

En América Latina, la adopción de BIM ha sido más gradual pero constante. Países como Chile, Colombia y México han desarrollado estrategias nacionales de implementación BIM, con hitos como la exigencia de BIM en licitaciones públicas y la creación de comités técnicos. Esta tendencia indica que la competencia en BIM se convertirá en un requisito indispensable para los profesionales de la arquitectura y la ingeniería en toda la región.`,
      },
      {
        number: 3,
        name: "BIM vs CAD tradicional: ventajas competitivas",
        difficulty: "basico",
        estimatedTime: "30 min",
        content: `La diferencia fundamental entre CAD y BIM radica en la naturaleza de la información que cada sistema maneja. En CAD (Computer-Aided Design), el profesional dibuja líneas y formas que representan elementos constructivos, pero el software no comprende qué representa cada elemento: una línea puede ser un muro, un borde de acera o una cota, y el programa no distingue entre ellas. En BIM, cada elemento es un objeto inteligente con propiedades: un muro tiene material, espesor, altura, costo unitario y relación con otros elementos como puertas y ventanas.

Esta diferencia conceptual genera ventajas prácticas inmensas. En un modelo CAD, modificar un muro implica actualizar manualmente todos los planos afectados: plantas, cortes, fachadas y detalles. En BIM, el modelo es una base de datos única: al modificar un muro, todos los cortes, fachadas y vistas 3D se actualizan automáticamente. Esta asociatividad elimina errores de inconsistencia entre planos, uno de los problemas más costosos en la documentación de proyectos.

Otra ventaja clave es la generación automática de cuantificaciones. En un flujo CAD, el profesional debe contar manualmente o mediante herramientas externas los elementos del proyecto: cuántos metros cuadrados de muro, cuántas puertas de cada tipo, cuántos metros cúbicos de concreto. En BIM, estas cantidades se extraen directamente del modelo con precisión, ya que cada componente está definido con sus dimensiones y propiedades. Esto reduce semanas de trabajo a minutos y minimiza errores en presupuestos.

La detección de colisiones (clash detection) es quizá la ventaja más impactante de BIM. En proyectos complejos, es común que las instalaciones eléctricas, hidráulicas y de HVAC se superpongan con elementos estructurales o arquitectónicos. Con CAD, estas interferencias solo se detectan en obra, generando retrabajos costosos. Con BIM, los modelos de todas las disciplinas se integran y analizan automáticamente para identificar colisiones antes de la construcción, ahorrando tiempo y dinero significativos.`,
      },
      {
        number: 4,
        name: "Estándares BIM: ISO 19650, COBie y clasificación",
        difficulty: "intermedio",
        estimatedTime: "35 min",
        content: `La estandarización es el pilar que permite la interoperabilidad y colaboración efectiva en proyectos BIM. La ISO 19650 es la norma internacional que establece los principios para la gestión de la información en proyectos de construcción utilizando BIM. Esta norma, basada en los estándares británicos PAS 1192, define cómo se debe organizar, nombrar, producir y entregar la información a lo largo de todo el ciclo de vida del activo construido.

La ISO 19650 se estructura en varias partes. La Parte 1 establece los conceptos y principios generales. La Parte 2 define la fase de entrega de los activos (asset delivery), cubriendo desde la evaluación y invitación hasta la entrega final del modelo. Las Partes 3, 4 y 5 abordan la fase operacional, la seguridad de la información y el uso con un enfoque de seguridad. Para cualquier profesional BIM, comprender la estructura de esta norma es esencial, ya que define las responsabilidades, los entregables y los protocolos de colaboración.

COBie (Construction Operations Building Information Exchange) es un formato estándar para entregar información de los activos del edificio al propietario o gestor de las instalaciones. COBie organiza datos como las especificaciones de los equipos, garantías, proveedores, fechas de instalación y parámetros de mantenimiento en hojas de cálculo estructuradas. Esta información es invaluable durante la fase de operación y mantenimiento del edificio, que típicamente representa el 80% del costo total del ciclo de vida.

Los sistemas de clasificación como Uniclass, OmniClass, MasterFormat y los códigos de la norma local son fundamentales para organizar la información del modelo. Uniclass, desarrollado en el Reino Unido, es el sistema más utilizado en proyectos BIM y clasifica los elementos desde el nivel de complejo hasta el de componentes individuales. La elección del sistema de clasificación depende del país y del tipo de proyecto, pero su uso consistente garantiza que toda la información pueda ser localizada y comprendida por cualquier agente del proyecto.`,
      },
      {
        number: 5,
        name: "Niveles de madurez BIM (Level 0 al Level 3)",
        difficulty: "intermedio",
        estimatedTime: "25 min",
        content: `Los niveles de madurez BIM describen el grado de colaboración e integración que una organización o proyecto ha alcanzado en su implementación de la metodología. Estos niveles fueron definidos originalmente por el grupo BIM del Reino Unido (BIM Alliance) y se han convertido en una referencia global para evaluar el progreso de adopción de BIM.

El Level 0 corresponde al trabajo sin colaboración digital: se utilizan dibujos CAD en 2D, sin estándares compartidos, con intercambio de información mediante papel o archivos digitales no estructurados. Este nivel representa la forma de trabajo tradicional y prácticamente ha desaparecido en mercados avanzados, aunque todavía existe en pequeñas oficinas y proyectos de baja complejidad.

El Level 1 introduce el trabajo con modelos 3D parciales y planos 2D, pero sin colaboración entre disciplinas. Cada profesional trabaja en su propio modelo sin compartirlo con los demás. Se utilizan estándares de nombrado y organización (como la BS 1192), pero la coordinación se realiza manualmente mediante superposición de planos. Este nivel es común en estudios que están en transición hacia BIM.

El Level 2 implica colaboración entre disciplinas mediante intercambio de archivos. Cada disciplina crea su propio modelo BIM y los combina con los demás mediante un proceso de federación. Se utilizan formatos abiertos como IFC para el intercambio y se realizan clash detection periódicos. Este es el nivel exigido por la mayoría de las normativas gubernamentales, incluyendo el mandato del Reino Unido.

El Level 3 representa la integración total: todas las disciplinas trabajan simultáneamente sobre un único modelo compartido en la nube. Los cambios de cualquier agente son visibles en tiempo real para todos los demás. Este nivel, también conocido como iBIM (intelligent BIM), requiere plataformas colaborativas avanzadas y acuerdos contractuales que definan las responsabilidades de cada participante en el modelo compartido.`,
      },
    ],
  },
  {
    number: 2,
    title: "Revit: Interfaz y Modelado Básico",
    description:
      "Familiarízate con el entorno de trabajo de Revit, la herramienta líder en BIM, y aprende a crear los elementos básicos de un modelo arquitectónico.",
    topics: [
      {
        number: 1,
        name: "Interfaz de Revit y configuración del proyecto",
        difficulty: "basico",
        estimatedTime: "30 min",
        content: `La interfaz de Revit está diseñada para facilitar el modelado de información de edificios de manera eficiente y organizada. Al abrir Revit, se presenta la pantalla de inicio donde puedes crear un nuevo proyecto, abrir uno existente o acceder a plantillas predeterminadas. Las plantillas son fundamentales porque preconfiguran unidades, estilos de texto, tipos de línea, familias cargadas y parámetros del proyecto, ahorrando horas de configuración inicial.

La cinta de opciones (Ribbon) organiza todas las herramientas en pestañas temáticas: Arquitectura, Estructura, Sistemas, Insertar, Anotar, Modificar, Vista y Administrar. Cada pestaña contiene paneles con herramientas agrupadas por función. Por ejemplo, la pestaña Arquitectura incluye paneles para crear muros, puertas, ventanas, pisos, techos, cubiertas y escaleras. La organización contextual es clave: al seleccionar un elemento, la cinta muestra opciones específicas para ese tipo de objeto.

El navegador del proyecto (Project Browser) es el panel lateral que organiza todas las vistas, planos, programas, familias y grupos del modelo. Desde aquí accedes a plantas, cortes, fachadas, vistas 3D y planos de construcción. La barra de propiedades (Properties Palette) muestra y permite editar los parámetros del elemento seleccionado o de la vista activa. Dominar estos dos paneles es esencial para trabajar con fluidez en Revit.

Antes de comenzar a modelar, es crucial configurar correctamente el proyecto: definir las unidades (metros o centímetros), la ubicación geográfica (para análisis energéticos y de sombras), la información del proyecto (nombre, número, dirección) y los parámetros compartidos que se utilizarán. Estas configuraciones se encuentran en la pestaña Administrar > Configuración y establecen la base sobre la cual se construirá todo el modelo BIM.`,
      },
      {
        number: 2,
        name: "Muros, pisos y techos: modelado básico",
        difficulty: "basico",
        estimatedTime: "40 min",
        content: `Los muros son el elemento fundamental de cualquier modelo arquitectónico en Revit. Para crear un muro, se utiliza la herramienta Muro de la pestaña Arquitectura, que permite dibujar el trazado del muro en planta indicando su línea de ubicación (línea central, interior o exterior). Cada muro pertenece a un tipo que define su composición: espesor, materiales de cada capa, función estructural o de cierre, y prioridad de unión con otros muros.

La composición de un muro en Revit es un aspecto crítico del modelado BIM. Un muro típico puede constar de varias capas: acabado interior (yeso), aislamiento térmico, estructura (bloque de concreto o ladrillo), cámara de aire y acabado exterior (repello o fachada ventilada). Cada capa tiene un material asignado, un espesor y una función que determina cómo se une con muros adyacentes y pisos. Esta información permite generar cuantificaciones precisas y simulaciones térmicas.

Los pisos (losas) se crean delineando su contorno en planta y asignando un tipo que define su composición. Al igual que los muros, los pisos pueden tener múltiples capas: acabado (porcelanato, madera), mortero de nivelación, losa estructural, cielo raso y aislamiento acústico. Los pisos se enlazan automáticamente con los muros: al mover un muro, el piso se ajusta, y viceversa. Esta asociatividad es una de las ventajas más poderosas del modelado paramétrico.

Los techos funcionan de manera similar a los pisos pero con la capacidad de definir pendientes. Puedes crear techos horizontales, inclinados o con múltiples pendientes. Las cubiertas follow-slope permiten modelar cubiertas complejas que se adaptan a la forma del edificio. La intersección entre techos y muros se resuelve automáticamente según las reglas de unión definidas en los tipos de cada elemento, aunque en casos complejos puede requerir ajustes manuales.`,
      },
      {
        number: 3,
        name: "Puertas, ventanas y componentes",
        difficulty: "basico",
        estimatedTime: "35 min",
        content: `Las puertas y ventanas en Revit son familias cargables que se insertan en muros anfitriones. A diferencia de los muros, que se crean directamente en el proyecto, las puertas y ventanas se cargan desde una biblioteca de familias (.rfa) y se colocan en el muro seleccionando su ubicación en planta. Cada instancia de puerta o ventana hereda las propiedades de su tipo pero puede personalizarse individualmente: dimensiones, materiales, vidrio, marco y herrajes.

Al insertar una puerta, Revit crea automáticamente la apertura en el muro y muestra el umbral en las vistas de corte. La orientación de la puerta (hacia dónde abre y qué lado tiene el marco) se controla con las flechas de control que aparecen al seleccionar la instancia. Las ventanas se comportan de manera similar: se alojan en el muro y su altura se define mediante el parámetro de alfeizar (sill height) y la altura total del componente.

Los componentes genéricos incluyen mobiliario, equipos, sanitarios, iluminación y elementos decorativos. Estos componentes se insertan en el modelo como familias cargables o se crean in situ para elementos únicos. Cada componente puede tener parámetros de tipo y de instancia, conectores de sistemas (eléctrico, hidráulico, HVAC) y datos de fabricante. La correcta selección y parametrización de componentes es fundamental para la calidad del modelo BIM y su utilidad en fases posteriores del proyecto.

La biblioteca de Revit incluye miles de familias predefinidas, pero en la práctica profesional es común crear familias personalizadas o descargarlas de bibliotecas manufactureras como BIMobject, Revit City o los portales de fabricantes específicos. La calidad de una familia se mide por su parametrización (¿se puede ajustar todo con parámetros?), su nivel de detalle (¿representa correctamente el objeto real?) y su eficiencia (¿no ralentiza el modelo?).`,
      },
      {
        number: 4,
        name: "Vistas, plantas, cortes y fachadas",
        difficulty: "intermedio",
        estimatedTime: "30 min",
        content: `En Revit, cada vista es una representación del modelo desde una perspectiva específica con configuraciones independientes. Esto significa que puedes tener una planta arquitectónica con cotas y anotaciones, un corte constructivo con mayor nivel de detalle y una vista 3D para visualización, todo derivado del mismo modelo sin necesidad de redibujar nada. Las vistas son el vehículo principal para generar la documentación del proyecto.

Las plantas se crean automáticamente al definir los niveles del proyecto. Cada nivel genera una vista de planta que muestra los elementos del modelo cortados por el plano del nivel y los elementos visibles debajo. La configuración de la vista permite controlar el rango de profundidad (view range), el nivel de detalle (coarse, medium, fine), la visibilidad de categorías y subcategorías, y los estilos de visualización (wireframe, hidden line, shaded, realistic).

Los cortes (sections) se crean dibujando una línea de sección en cualquier vista. La marca de sección define la extensión del corte y la profundidad de la vista resultante. Los cortes pueden ser de edificio (mostrando la sección completa) o de detalle (enfocándose en una porción específica con mayor nivel de detalle). La dirección del corte, el gap de la marca y la referencia a detalles se configuran en las propiedades de la sección.

Las fachadas (elevations) se generan de manera similar a los cortes, pero desde puntos cardinales. Al crear una fachada, Revit coloca automáticamente marcadores en las direcciones Norte, Sur, Este y Oeste, aunque puedes agregar fachadas adicionales en cualquier orientación. Las vistas 3D, tanto en perspectiva como en axonometría, permiten visualizar el modelo completo y crear recorridos virtuales y renders.`,
      },
      {
        number: 5,
        name: "Anotaciones, cotas y documentación",
        difficulty: "intermedio",
        estimatedTime: "35 min",
        content: `Las anotaciones en Revit son elementos que se colocan en las vistas para comunicar información específica del proyecto: cotas dimensionales, textos, etiquetas de elementos, llamadas de detalle y símbolos. A diferencia del CAD, donde las anotaciones son entidades gráficas independientes, en Revit las cotas y etiquetas están vinculadas al modelo: si un muro se mueve, la cota se actualiza automáticamente; si una puerta cambia de tipo, la etiqueta refleja la nueva información.

Las cotas en Revit pueden ser permanentes o temporales. Las cotas temporales aparecen al crear o seleccionar elementos y se utilizan para posicionar con precisión. Las cotas permanentes se insertan deliberadamente en las vistas y forman parte de la documentación. Existen varios tipos de acotación: lineales (entre dos puntos), alineadas (paralela a un eje), angulares, de arco y de elevación. Cada tipo de cota tiene estilos personalizables: tipo y tamaño de texto, tipo de flecha, extensión de las líneas y unidades.

Las etiquetas (tags) son anotaciones que extraen automáticamente información del modelo. Una etiqueta de puerta muestra el número de marca; una de ventana puede mostrar dimensiones y tipo de vidrio; una de habitación muestra el nombre y el área calculada. Las etiquetas se personalizan mediante la edición de la familia de etiqueta, donde se seleccionan los parámetros a mostrar y el formato de presentación.

Los planos de construcción (sheets) son el contenedor final donde se organizan las vistas y anotaciones para la impresión. Cada plano tiene un formato de lámina (title block) que incluye información del proyecto, número de plano, escala y sellos profesionales. Las vistas colocadas en planos mantienen su asociación con el modelo: cualquier cambio en el modelo se refleja automáticamente en todas las vistas del plano, garantizando la consistencia de la documentación.`,
      },
    ],
  },
  {
    number: 3,
    title: "Modelado Avanzado y Familias",
    description:
      "Profundiza en el modelado paramétrico y la creación de familias personalizadas para enriquecer tu modelo BIM.",
    topics: [
      {
        number: 1,
        name: "Escaleras, rampas y barandas",
        difficulty: "intermedio",
        estimatedTime: "40 min",
        content: `Las escaleras en Revit son un sistema complejo que integra huellas, contrahuellas, descansos, costados y barandas en un solo componente paramétrico. Revit ofrece dos métodos para crear escaleras: por boceto (sketch) y por componente. El método por componente es más eficiente y permite crear escaleras rectas, en L, en U y espirales definiendo los parámetros básicos: ancho, altura de piso a piso, número de contrahuellas y tipo de huella.

El cálculo de las escaleras sigue la fórmula de Blondel: 2CH + H = 63-65 cm, donde CH es la contrahuella y H es la huella. Revit permite configurar este cálculo automáticamente, ajustando las dimensiones para cumplir con la normativa. Las contrahuellas típicas oscilan entre 17 y 19 cm para escaleras de uso común, y las huellas entre 26 y 30 cm. Los descansos se generan automáticamente en los giros y pueden personalizarse en forma y dimensión.

Las rampas funcionan de manera similar a las escaleras pero con pendientes continuas. La pendiente máxima permitida para rampas de acceso es del 8.33% (1:12) según la mayoría de normativas de accesibilidad. Revit permite definir la pendiente, el ancho, el grosor de la losa y los materiales. Las rampas requieren longitudes significativas: para salvar un desnivel de 1 metro con pendiente del 8%, se necesitan 12 metros de longitud de rampa, más los descansos obligatorios cada 9 metros de desarrollo.

Las barandas (railings) se crean automáticamente con las escaleras y rampas, pero también se pueden colocar de forma independiente en balcones, terrazas y bordes de losas. Una baranda está compuesta por el riel superior, los balaustres (o postes) y los elementos de relleno (paneles, balaustres intermedios o cables). Cada componente se parametriza independientemente: altura del riel, separación de balaustres, sección del riel y material.`,
      },
      {
        number: 2,
        name: "Cubiertas complejas y claraboyas",
        difficulty: "avanzado",
        estimatedTime: "45 min",
        content: `Las cubiertas complejas representan uno de los desafíos más interesantes del modelado BIM. Revit permite crear cubiertas con múltiples pendientes, uniones de aguas, limatesas, limahoyas y entrevigados. El método principal es el boceto de la cubierta, donde se definen los bordes y se asignan pendientes a cada uno. Las cubiertas por extrusión ofrecen una alternativa para formas más libres, definiendo un perfil que se extruye a lo largo de un trayecto.

Las limatesas (crestas donde se encuentran dos aguas) y limahoyas (valles donde dos aguas se separan) se generan automáticamente al unir cubiertas con diferentes orientaciones. Sin embargo, en casos complejos como cubiertas inclinadas con formas no rectangulares, es necesario ajustar manualmente los bordes y las pendientes para lograr la geometría deseada. Las herramientas de unión de cubierta y de ajuste de pendiente son esenciales para resolver estas situaciones.

Las claraboyas (skylights) y lucernarios se insertan como familias anidadas en la cubierta. La claraboya crea automáticamente la apertura en la cubierta y se parametriza con dimensiones, tipo de vidrio, marco y método de ventilación. Es importante modelar correctamente la transición entre la cubierta y la claraboya, incluyendo el marco de soporte, el sellado y la pendiente del marco para garantizar la estanqueidad.

Para cubiertas de formas libres, Revit ofrece la herramienta de cubierta por forma (roof by shape), que permite modelar superficies curvas y orgánicas. Estas cubiertas se crean a partir de masas o superficies generadas en el entorno conceptual. La subdivisión de la superficie en paneles y la asignación de patrones permiten crear fachadas y cubiertas con geometrías complejas que serían imposibles con las herramientas de cubierta convencionales.`,
      },
      {
        number: 3,
        name: "Creación de familias paramétricas",
        difficulty: "avanzado",
        estimatedTime: "50 min",
        content: `Las familias son la base del modelado paramétrico en Revit. Una familia define un tipo de objeto (puerta, ventana, mobiliario, equipamiento) con parámetros que controlan su geometría, materiales y datos. Al crear una familia personalizada, se define la lógica paramétrica que permite adaptar el componente a diferentes dimensiones y configuraciones sin necesidad de redibujarlo.

El Editor de Familias es un entorno de modelado independiente donde se construye la geometría del componente. El flujo de trabajo comienza definiendo las planos de referencia (reference planes) que establecen las cotas y restricciones del objeto. Luego se crea la geometría (extrusiones, barridos, fusiones, revolutiones) vinculada a estos planos de referencia mediante restricciones de alineación y cotejo. Los parámetros (dimensiones, materiales, visibilidad) se asignan a las cotas y propiedades para hacer el componente paramétrico.

Existen tres tipos de familias según su comportamiento: familias de modelo (se colocan en el proyecto y tienen representación en 3D), familias de anotación (se colocan en vistas específicas y solo existen en 2D), y familias de detalle (se colocan en vistas de borrador para complementar la información gráfica). Las familias de modelo se subdividen en categorías: puertas, ventanas, mobiliario, equipamiento, componentes genéricos, etc. La categoría determina el comportamiento del componente en el proyecto y su representación en las vistas.

Los parámetros compartidos permiten que la información fluya entre familias, proyectos y esquemas. Un parámetro compartido definido una vez puede utilizarse en múltiples familias y extraerse en planillas y cuantificaciones. Por ejemplo, el parámetro "Fabricante" puede compartirse entre puertas, ventanas y equipamiento, permitiendo generar una planilla consolidada de todos los proveedores del proyecto. La gestión correcta de parámetros compartidos es una competencia avanzada que distingue a los modeladores BIM experto.`,
      },
      {
        number: 4,
        name: "Familias anidadas y compartidas",
        difficulty: "avanzado",
        estimatedTime: "40 min",
        content: `Las familias anidadas son componentes que se insertan dentro de otra familia, creando una jerarquía de objetos. Por ejemplo, una familia de ventana puede contener una familia anidada de vidrio, otra de marco y otra de herraje. Esta estructura modular facilita la parametrización: al cambiar el tipo de vidrio en la familia anidada, todas las ventanas que la contienen se actualizan automáticamente.

El uso de familias anidadas ofrece varias ventajas. Primero, la modularidad: cada subcomponente se desarrolla y prueba independientemente antes de integrarse en la familia principal. Segundo, la flexibilidad: se pueden intercambiar familias anidadas dentro de la familia principal (por ejemplo, cambiar un tipo de manija por otro) mediante parámetros de tipo. Tercero, la eficiencia: las familias anidadas compartidas entre múltiples familias reducen la redundancia y facilitan las actualizaciones globales.

La conexión de parámetros entre la familia principal y las familias anidadas se realiza mediante la asociación de parámetros. Cuando un parámetro de la familia anidada (por ejemplo, la altura del vidrio) se asocia con un parámetro de la familia principal, al cambiar la altura de la ventana en el proyecto, el vidrio se ajusta automáticamente. Esta cascada de parámetros es la esencia del modelado paramétrico avanzado y permite crear componentes altamente personalizables.

Las familias compartidas (shared families) son familias anidadas que mantienen su identidad independiente en el proyecto. A diferencia de las familias anidadas normales, que se comportan como un solo objeto, las familias compartidas se pueden seleccionar individualmente en el proyecto, se incluyen en las planillas por separado y pueden tener parámetros que se editan de forma independiente. Esta característica es especialmente útil para componentes como muebles modulares, instalaciones mecánicas y sistemas de fachada donde cada pieza debe contabilizarse y gestionarse por separado.`,
      },
    ],
  },
  {
    number: 4,
    title: "Coordinación Multidisciplinaria",
    description:
      "Aprende a integrar modelos de arquitectura, estructura y MEP (MEP = Mechanical, Electrical, Plumbing) para lograr una coordinación efectiva.",
    topics: [
      {
        number: 1,
        name: "Vínculos de modelos y gestión de referencias",
        difficulty: "intermedio",
        estimatedTime: "35 min",
        content: `La coordinación multidisciplinaria en BIM se basa en la integración de modelos creados por diferentes disciplinas (arquitectura, estructura, instalaciones) en un entorno común. En Revit, esto se logra mediante el vínculo de modelos (linking), donde el modelo de cada disciplina se carga como referencia dentro de un archivo de coordinación. El modelo vinculado se puede posicionar por origen compartido, por coordenadas compartidas o manualmente, asegurando que todos los modelos coincidan espacialmente.

Las coordenadas compartidas son fundamentales para la coordinación. Cuando se vincula un modelo por coordenadas compartidas, Revit alinea automáticamente los modelos según un punto de referencia común definido previamente. Este sistema de coordenadas se establece en el modelo base (generalmente el modelo arquitectónico) y se exporta a los demás modelos para que todos compartan el mismo sistema de referencia. Sin coordenadas compartidas, la alineación manual es propensa a errores y difícil de mantener a medida que el proyecto evoluciona.

La gestión de las fases del proyecto es otro aspecto crítico de la coordinación. Revit permite definir fases (existente, nuevo, demolido, futuro) y controlar la visibilidad de los elementos según su fase de creación y demolición. En un proyecto de remodelación, por ejemplo, se puede mostrar la estructura existente en un estilo de línea diferente al de los elementos nuevos, facilitando la comprensión de lo que se conserva y lo que se construye.

El monitoreo de cambios entre modelos vinculados (copy/monitor) permite detectar automáticamente cuando un elemento monitoreado ha sido modificado en el modelo de origen. Por ejemplo, si el arquitecto mueve un muro de carga, el ingeniero estructural recibe una advertencia indicando que el elemento monitoreado ha cambiado. Esta funcionalidad es esencial para mantener la consistencia entre disciplinas y evitar que los cambios no coordinados generen problemas constructivos.`,
      },
      {
        number: 2,
        name: "Detección de colisiones (Clash Detection)",
        difficulty: "intermedio",
        estimatedTime: "40 min",
        content: `La detección de colisiones es el proceso de identificar intersecciones geométricas entre elementos de diferentes disciplinas que no deberían coexistir en el mismo espacio. Por ejemplo, un ducto de aire acondicionado que cruza una viga estructural, o una tubería de agua que pasa por el interior de un muro sin considerar el espesor necesario. Estas colisiones, si no se detectan antes de la construcción, generan retrabajos costosos, retrasos y conflictos entre contratistas.

En el ecosistema BIM, Navisworks es la herramienta líder para la detección de colisiones. El flujo de trabajo consiste en exportar los modelos de cada disciplina en formato NWC o IFC, agregarlos a Navisworks, configurar las reglas de detección y ejecutar el análisis. Las reglas permiten definir qué categorías de elementos deben comprobarse entre sí: por ejemplo, ductos contra vigas, tuberías contra muros, y cableado contra elementos estructurales.

Los resultados del clash detection se organizan en un reporte que lista cada colisión con su ubicación, los elementos involucrados, capturas de pantalla y comentarios. Cada colisión se asigna a un responsable para su resolución. El proceso es iterativo: después de resolver las colisiones en los modelos respectivos, se realiza una nueva verificación hasta que el número de colisiones sea aceptable. En proyectos complejos, se realizan múltiples rondas de clash detection a lo largo del desarrollo del proyecto.

Es importante distinguir entre colisiones duras (hard clashes), donde dos elementos ocupan el mismo espacio físico, y colisiones blandas (soft clashes), donde los elementos no se superponen pero no respetan los espacios de mantenimiento requeridos. Por ejemplo, un ducto puede no chocar con una viga pero estar tan cerca que no deja espacio para instalar los soportes o acceder para mantenimiento. Las reglas de soft clash definen los claros mínimos alrededor de cada tipo de elemento.`,
      },
      {
        number: 3,
        name: "Formato IFC e interoperabilidad",
        difficulty: "intermedio",
        estimatedTime: "30 min",
        content: `IFC (Industry Foundation Classes) es el formato abierto y estandarizado que permite el intercambio de información BIM entre diferentes plataformas de software. Desarrollado por buildingSMART International, IFC es el único formato realmente interoperable del sector de la construcción y está reconocido como estándar ISO (ISO 16739). Su importancia radica en que permite que un modelo creado en Revit pueda ser leído por ArchiCAD, Allplan, Tekla, Bentley y cualquier otro software compatible.

La exportación a IFC desde Revit requiere una configuración cuidadosa para garantizar que la información se traduzca correctamente. Revit ofrece varios esquemas de exportación (IFC2x3, IFC4) y permite mapear las categorías de Revit a las clases IFC correspondientes. Por ejemplo, los muros básicos de Revit se exportan como IfcWallStandardCase, los muros cortina como IfcWallElementedCase, y las losas como IfcSlab. El mapeo correcto es fundamental para que el modelo receptor interprete cada elemento según su naturaleza.

La importación de IFC en Revit ha mejorado significativamente en versiones recientes, pero aún presenta limitaciones. Los modelos importados como vínculo IFC mantienen la estructura de clases y propiedades originales, pero la geometría puede simplificarse y algunos parámetros personalizarse pueden perderse. Por esta razón, en flujos de trabajo donde la coordinación es bidireccional, se prefiere utilizar el formato nativo de Revit (RVT) para los modelos de la misma plataforma e IFC para el intercambio con plataformas diferentes.

Los Modelos de Vista de Información (MVD) son subconjuntos del esquema IFC que definen qué entidades y propiedades se deben intercambiar para un propósito específico. Por ejemplo, el MVD de Coordinación de Diseño incluye la geometría y los datos necesarios para clash detection, mientras que el MVD de Análisis Energético incluye propiedades térmicas y de orientación. La elección del MVD adecuado en la exportación asegura que el modelo contenga la información relevante para el propósito previsto sin información innecesaria que aumenta el tamaño del archivo.`,
      },
      {
        number: 4,
        name: "Entregables BIM y Modelos por Fase",
        difficulty: "avanzado",
        estimatedTime: "35 min",
        content: `Los entregables BIM definen qué información debe producirse y entregarse en cada fase del proyecto. Según la ISO 19650, los entregables se especifican en el EIR (Exchange Information Requirements) y se organizan en el BEP (BIM Execution Plan). Estos documentos establecen el nivel de detalle requerido (LOD), los formatos de entrega, la frecuencia de las entregas y las responsabilidades de cada agente.

El LOD (Level of Development) es una especificación que define la cantidad de información y el grado de confianza que un elemento BIM debe tener en cada fase del proyecto. El LOD 100 indica un elemento conceptual con dimensiones aproximadas; el LOD 200 define un elemento con geometría y ubicación precisa; el LOD 300 añade información de ensamblaje y conexiones; el LOD 350 incluye interfaces con otros sistemas; el LOD 400 agrega datos de fabricación; y el LOD 500 representa el elemento construido con datos verificados.

Los modelos por fase se estructuran según el ciclo de vida del proyecto. El modelo de proyecto (design model) evoluciona desde la fase de concepto hasta la de diseño detallado. El modelo de coordinación (coordination model) integra todas las disciplinas y se utiliza para clash detection. El modelo constructivo (construction model) incluye secuencias, temporalidad y logística de obra. Finalmente, el modelo de activos (as-built model) refleja lo construido realmente y se entrega al propietario para la gestión del edificio durante su vida útil.

La transición entre modelos por fase requiere protocolos claros de transferencia de información. Cada entrega debe incluir el modelo nativo, el modelo IFC, las planillas de cuantificación, los reportes de clash detection y la documentación gráfica. El sistema de nombrado de archivos, la estructura de carpetas y el control de versiones son aspectos que se definen en el BEP y que todo el equipo debe seguir rigurosamente para mantener la trazabilidad y la integridad de la información del proyecto.`,
      },
    ],
  },
  {
    number: 5,
    title: "Visualización y Presentación de Proyectos BIM",
    description:
      "Transforma tus modelos BIM en visualizaciones impactantes y documentación profesional para clientes y equipos de trabajo.",
    topics: [
      {
        number: 1,
        name: "Renders fotorrealistas desde Revit",
        difficulty: "intermedio",
        estimatedTime: "35 min",
        content: `El renderizado fotorrealista es una herramienta fundamental para comunicar el diseño arquitectónico a clientes, inversionistas y equipos de toma de decisiones. Revit incluye un motor de renderizado integrado basado en Autodesk Raytracer que permite generar imágenes fotorrealistas directamente desde el modelo BIM, sin necesidad de exportar a software externo. Aunque el renderizador integrado no alcanza la calidad de motores especializados como V-Ray o Enscape, ofrece resultados aceptables para presentaciones preliminares y estudios de masa.

La configuración del render en Revit comienza con la definición de la iluminación. Se pueden utilizar luces artificiales (puntuales, spots, lineales) y la iluminación natural del sol, configurando la ubicación geográfica, la fecha y la hora. La calidad del render se ajusta en cuatro niveles: draft, low, medium y high. Los tiempos de render varían significativamente: un render draft puede tardar segundos, mientras que un render high con iluminación compleja puede requerir horas.

Los materiales juegan un papel crucial en la calidad del render. Cada material de Revit tiene propiedades de apariencia (appearance assets) que definen su aspecto renderizado: color, reflexión, refracción, rugosidad, transparencia y mapa de textura. Es importante configurar correctamente estos parámetros para lograr resultados realistas. Los materiales PBR (Physically Based Rendering) con mapas de difuso, normal y rugosidad producen los resultados más convincentes.

Para renders de alta calidad, muchos estudios exportan el modelo a motores de renderizado especializados. La integración nativa con Enscape permite renderizado en tiempo real directamente desde Revit, con iluminación global, materiales avanzados y efectos atmosféricos. Twinmotion y Lumion también ofrecen flujos de trabajo fluidos con sincronización directa desde Revit, permitiendo crear recorridos animados y vistas 360 de manera eficiente.`,
      },
      {
        number: 2,
        name: "Recorridos virtuales y vistas 360°",
        difficulty: "intermedio",
        estimatedTime: "30 min",
        content: `Los recorridos virtuales permiten a los clientes y stakeholders experimentar el proyecto de forma inmersiva antes de su construcción. En el ecosistema BIM, existen múltiples herramientas para crear estas experiencias: Enscape, Twinmotion, Unreal Engine y Autodesk Cloud Rendering ofrecen capacidades de recorrido en tiempo real con diferentes niveles de calidad y complejidad.

Enscape es la opción más accesible para crear recorridos virtuales directamente desde Revit. Con un solo clic, Enscape genera una vista 3D navegable en tiempo real donde puedes moverte por el modelo como en un videojuego. La herramienta permite crear puntos de vista (viewpoints) que forman un recorrido guiado, exportable como archivo ejecutable standalone o como enlace web compartible. Los ajustes de iluminación, atmósfera y hora del día se modifican en tiempo real, permitiendo explorar diferentes escenarios de manera interactiva.

Las vistas 360° son imágenes esféricas que el espectador puede rotar libremente para mirar en todas las direcciones. Se generan desde un punto específico del modelo y se visualizan en navegadores web, visores VR o plataformas como Roundme y Kuula. Estas imágenes son ideales para presentar espacios interiores donde se quiere transmitir la sensación de estar dentro del ambiente. La calidad de la imagen, la iluminación y los materiales son determinantes para la inmersión del espectador.

La realidad virtual (VR) representa el nivel máximo de inmersión. Con cascos como Meta Quest o HTC Vive, los usuarios pueden caminar por el modelo a escala real, evaluando proporciones, alturas y recorridos. Enscape y Twinmotion soportan VR nativamente, permitiendo entrar al modelo con un solo clic. La experiencia VR es particularmente valiosa para validar diseños de interiores, verificar alturas libres, evaluar la escala de los espacios y detectar problemas de accesibilidad antes de la construcción.`,
      },
      {
        number: 3,
        name: "Planillas, cuantificaciones y presupuestos",
        difficulty: "avanzado",
        estimatedTime: "40 min",
        content: `Las planillas (schedules) en Revit son vistas tabulares que extraen y organizan información del modelo BIM de forma automatizada. A diferencia de las tablas manuales, las planillas de Revit se actualizan dinámicamente cuando el modelo cambia: si se agrega una puerta, aparece en la planilla; si se elimina un muro, sus datos desaparecen. Esta asociatividad garantiza que la documentación siempre esté sincronizada con el modelo.

Se pueden crear planillas para prácticamente cualquier categoría del modelo: puertas, ventanas, muros, pisos, techos, mobiliario, habitaciones, materiales y más. Cada planilla se configura seleccionando los campos (parámetros) a mostrar, aplicando filtros (por ejemplo, solo puertas del nivel 2), ordenando y agrupando (por tipo, por nivel, por material), y aplicando formato condicional (resaltar elementos que exceden un presupuesto). Las planillas de materiales son especialmente útiles para cuantificaciones: muestran volúmenes de concreto, áreas de muro, longitudes de viga y cantidades de cada material con precisión.

Las cuantificaciones derivadas del modelo BIM son significativamente más precisas que las realizadas manualmente a partir de planos 2D. Cada elemento del modelo tiene sus dimensiones exactas, materiales definidos y propiedades cuantificables. La planilla de cuantificación de muros, por ejemplo, puede mostrar el área neta (descontando puertas y ventanas), el volumen de cada material componente y el costo unitario, generando un subtotal por tipo de muro y un total general.

La exportación de datos de Revit a Excel o a software de presupuestos permite integrar la información del modelo con los flujos de trabajo de estimación de costos. Revit permite exportar planillas a formatos CSV y HTML, y mediante plugins como Revit DB Link se puede establecer una conexión bidireccional con bases de datos externas. Los modelos con LOD 300 o superior proporcionan la granularidad necesaria para estimaciones de costo confiables en fases de diseño avanzado y documentación constructiva.`,
      },
      {
        number: 4,
        name: "Exportación y publicación de modelos",
        difficulty: "intermedio",
        estimatedTime: "30 min",
        content: `La exportación del modelo BIM a diferentes formatos es un paso crítico en el flujo de trabajo, ya que determina cómo la información se comparte con otros agentes del proyecto. Revit permite exportar a numerosos formatos: IFC para interoperabilidad, DWG y DXF para intercambio con AutoCAD, FBX y OBJ para visualización 3D, NWC para coordinación en Navisworks, y gLTF para experiencias web.

La exportación a IFC requiere especial atención a la configuración. Antes de exportar, es necesario verificar el mapeo de categorías, asignar las clases IFC correctas a los elementos que no se mapean automáticamente, y configurar los conjuntos de propiedades que se incluirán. La herramienta de clasificación IFC de Revit permite asignar manualmente la clase IFC a cualquier elemento, lo cual es necesario para componentes que Revit no clasifica automáticamente de forma correcta.

La publicación en la nube mediante Autodesk Construction Cloud (ACC) o BIM 360 permite compartir el modelo con todo el equipo del proyecto en tiempo real. Los modelos publicados son accesibles desde cualquier dispositivo con navegador web, permitiendo a los stakeholders revisar el diseño, agregar comentarios y marcar problemas sin necesidad de tener Revit instalado. La integración con Docs, Model Coordination y Insight proporciona un ecosistema completo de colaboración.

Para presentaciones a clientes, la exportación a formatos interactivos es cada vez más común. Los modelos publicados en Autodesk Viewer pueden explorarse en 3D con navegación intuitiva, medición de distancias, secciones dinámicas y anotaciones. Otra opción es exportar a formatos como Sketchfab o WebGL, que permiten incrustar el modelo 3D interactivo en sitios web del proyecto para que los clientes lo exploren a su propio ritmo.`,
      },
    ],
  },
  {
    number: 6,
    title: "BIM Avanzado y Tendencias Futuras",
    description:
      "Explora las dimensiones avanzadas del BIM (4D, 5D, 6D, 7D) y las tecnologías emergentes que están transformando la industria.",
    topics: [
      {
        number: 1,
        name: "BIM 4D: Planificación y secuencia constructiva",
        difficulty: "avanzado",
        estimatedTime: "40 min",
        content: `El BIM 4D incorpora la dimensión temporal al modelo tridimensional, permitiendo simular la secuencia constructiva del proyecto. Esta simulación visualiza cómo se construirá el edificio paso a paso, mostrando qué elementos se instalan en cada período, cómo se organizan los frentes de trabajo y cómo evoluciona la obra a lo largo del tiempo. La planificación 4D conecta el modelo 3D con el cronograma del proyecto, generalmente creado en Primavera P6 o Microsoft Project.

La creación de una simulación 4D comienza con la descomposición del modelo en conjuntos de construcción (construction sets) que corresponden a las actividades del cronograma. Cada actividad se vincula con los elementos del modelo que se construyen en ese período. Por ejemplo, la actividad "Cimentar zapata A1" se vincula con la zapata A1 del modelo estructural. Al ejecutar la simulación, los elementos aparecen progresivamente según el cronograma, creando una animación del proceso constructivo.

Las aplicaciones prácticas del 4D son múltiples: visualización de la secuencia de obra para el equipo de construcción, identificación de conflictos logísticos (acceso de maquinaria, áreas de almacenamiento), optimización del uso de grúas y equipos pesados, comunicación del plan de obra a stakeholders no técnicos, y detección de solapamientos entre actividades que podrían generar interferencias en campo.

Navisworks es la herramienta estándar para simulación 4D en el ecosistema Autodesk. Permite importar el cronograma desde Primavera o Project, vincular las actividades con los elementos del modelo y ejecutar la simulación con controles de reproducción. Otras herramientas como Synchro Pro ofrecen capacidades avanzadas de planificación 4D con funciones de optimización de secuencias y análisis de recursos. La tendencia actual es hacia la planificación 4D en tiempo real, donde el modelo se actualiza con el progreso real de la obra para comparar plan vs. realidad.`,
      },
      {
        number: 2,
        name: "BIM 5D: Costos y presupuestos integrados",
        difficulty: "avanzado",
        estimatedTime: "35 min",
        content: `El BIM 5D integra la dimensión de costos al modelo, permitiendo gestionar presupuestos y estimaciones financieras directamente desde la información del modelo. La ventaja fundamental del 5D es que las cuantificaciones se extraen automáticamente del modelo, eliminando el proceso manual de medición y reduciendo significativamente los errores de estimación. Cuando el modelo cambia, los costos se recalculan automáticamente, manteniendo el presupuesto sincronizado con el diseño.

La implementación del 5D requiere que cada elemento del modelo tenga asignados costos unitarios por categoría: materiales, mano de obra, equipos y subcontratos. Estos costos se almacenan como parámetros compartidos o se vinculan mediante bases de datos externas. Las planillas de cuantificación extraen las cantidades del modelo y las multiplican por los costos unitarios, generando presupuestos detallados por disciplina, nivel, tipo de elemento o cualquier otro criterio de agrupación.

Las herramientas de estimación 5D como CostX, Cubicost y iTWO permiten importar modelos IFC y extraer cuantificaciones automáticamente con gran precisión. Estas herramientas ofrecen funciones avanzadas como el mapeo de elementos a bases de datos de precios, la generación de presupuestos con fórmulas personalizadas, el análisis de variaciones de costo entre versiones del modelo y la integración con sistemas ERP de las constructoras.

El análisis de variaciones (change order analysis) es una aplicación particularmente valiosa del BIM 5D. Cuando el diseño cambia, se puede comparar el modelo actual con la versión anterior para identificar exactamente qué elementos se agregaron, modificaron o eliminaron, y calcular el impacto financiero de cada cambio. Esta trazabilidad es invaluable para la gestión de contratos y la resolución de disputas entre las partes del proyecto.`,
      },
      {
        number: 3,
        name: "BIM 6D y 7D: Sostenibilidad y gestión de facilidades",
        difficulty: "avanzado",
        estimatedTime: "35 min",
        content: `El BIM 6D aborda la sostenibilidad y el análisis energético del edificio. Al incorporar datos de rendimiento térmico, consumo energético, emisiones de carbono y ciclo de vida de los materiales, el modelo BIM se convierte en una herramienta de diseño sostenible. Los análisis energéticos basados en el modelo permiten evaluar el desempeño del edificio antes de construirlo, optimizando la orientación, el aislamiento, los vidrios y los sistemas HVAC para minimizar el consumo de energía.

Herramientas como Autodesk Insight, Sefaira e IES VE se integran con Revit para realizar análisis energéticos directamente desde el modelo. Estos análisis evalúan métricas como la demanda energética por metro cuadrado, el consumo de energía por sistemas, la iluminación natural, el confort térmico y las emisiones de CO2. Los resultados se presentan en dashboards interactivos que permiten comparar escenarios de diseño y tomar decisiones informadas para mejorar la eficiencia energética del proyecto.

El BIM 7D se enfoca en la gestión de facilidades (Facility Management) durante la fase operacional del edificio. El modelo as-built, que refleja lo construido realmente, se entrega al propietario como una base de datos viva del activo. Este modelo contiene información detallada de cada equipo, sistema y componente: especificaciones técnicas, manuales de instalación, garantías, proveedores, fechas de mantenimiento programado y vida útil esperada.

La integración del modelo BIM con sistemas de gestión de facilidades (CMMS) como Maximo, ServiceNow o FM:Systems permite automatizar la planificación del mantenimiento, gestionar órdenes de trabajo vinculadas a espacios y equipos del modelo, y visualizar el estado de los activos en 3D. Cuando un equipo falla, el gestor de facilidades puede localizarlo en el modelo, acceder a su información técnica completa y programar la intervención de mantenimiento de manera eficiente. Esta integración reduce los tiempos de respuesta ante fallas y optimiza los recursos de mantenimiento durante toda la vida útil del edificio.`,
      },
      {
        number: 4,
        name: "El futuro: Digital Twins, IA y construcción automatizada",
        difficulty: "avanzado",
        estimatedTime: "30 min",
        content: `El gemelo digital (Digital Twin) es la evolución natural del modelo BIM. Mientras que un modelo BIM es una representación estática del edificio en su estado de diseño o construcción, el gemelo digital es una réplica virtual dinámica que se actualiza en tiempo real con datos de sensores IoT, sistemas de gestión y fuentes externas. El gemelo digital permite monitorear el rendimiento del edificio en operación, predecir fallas antes de que ocurran y optimizar el uso de recursos energéticos y de mantenimiento.

La implementación de gemelos digitales requiere una infraestructura de sensores distribuidos por el edificio: medidores de energía, sensores de temperatura y humedad, detectores de ocupación, acelerómetros en elementos estructurales y medidores de calidad del aire. Los datos de estos sensores fluyen hacia una plataforma central que los asocia con los elementos correspondientes del modelo BIM, creando una visualización en tiempo real del estado del edificio.

La inteligencia artificial está transformando todas las dimensiones del BIM. En la fase de diseño, algoritmos generativos exploran miles de variantes de un proyecto optimizadas para múltiples criterios (costo, rendimiento energético, habitabilidad, estructura). En la fase de construcción, la visión artificial analiza imágenes de drones y cámaras de obra para verificar el progreso, detectar desviaciones respecto al plan y evaluar la calidad de los trabajos. En la fase operacional, modelos de machine learning predicen fallos en equipos, optimizan los horarios de mantenimiento y ajustan automáticamente los sistemas HVAC para maximizar el confort y minimizar el consumo.

La construcción automatizada y la fabricación digital representan otra frontera del BIM. Los datos del modelo se utilizan directamente para programar máquinas CNC, robots de ensamblaje e impresoras 3D de concreto. La fabricación de componentes estructurales y de cerramiento se realiza con precisión milimétrica directamente desde el modelo, eliminando errores de interpretación de planos y reduciendo desperdicios de material. Estas tecnologías están pasando de la experimentación a la adopción comercial, y en la próxima década transformarán fundamentalmente la forma en que se diseñan y construyen los edificios.`,
      },
    ],
  },
];

async function main() {
  console.log("🏗️ Seeding Arquitectura course: Diseño Arquitectónico con BIM...");

  // Get the arquitectura category
  const arquitectura = await prisma.category.findUnique({
    where: { slug: "arquitectura" },
  });

  if (!arquitectura) {
    console.error(
      "❌ Category 'arquitectura' not found. Run the main seed first."
    );
    process.exit(1);
  }

  // Create the course
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
      categoryId: arquitectura.id,
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
      categoryId: arquitectura.id,
    },
  });

  console.log(`✅ Course created: ${course.title} (${course.id})`);

  // Create modules and topics
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
    `\n🎉 Arquitectura course seeded: ${modules.length} modules, ${totalTopics} topics`
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
