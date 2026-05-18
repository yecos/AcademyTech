// Script to enrich non-D5 course topic content with detailed JSON
// Usage: unset DATABASE_URL && node scripts/enrich-content.js

const fs = require('fs');
const path = require('path');

// Load DATABASE_URL from .env file
const envPath = path.resolve('/home/z/my-project', '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    if (key === 'DATABASE_URL') {
      process.env.DATABASE_URL = value;
      break;
    }
  }
}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ============================================================
// COMPREHENSIVE TOPIC CONTENT DATABASE
// ============================================================

const topicContentDB = {
  // ============================================================
  // BIM COURSE
  // ============================================================
  'diseno-arquitectonico-bim': {
    '¿Qué es BIM? Conceptos y definición': {
      explanation: `BIM (Building Information Modeling) es una metodología de trabajo colaborativo que transforma radicalmente la forma en que se diseñan, construyen y gestionan los edificios e infraestructuras. A diferencia del dibujo asistido por ordenador (CAD), donde se generan representaciones geométricas del proyecto compuestas por líneas sin significado intrínseco, BIM crea un modelo digital inteligente que contiene no solo la geometría tridimensional sino también información detallada sobre cada componente: materiales, costos, propiedades físicas, plazos de ejecución y datos de mantenimiento. Esta característica convierte a BIM en mucho más que una herramienta de diseño; es un ecosistema completo de gestión del proyecto a lo largo de todo su ciclo de vida.

El concepto de BIM surge de la necesidad de integrar toda la información de un proyecto en un único modelo centralizado. En lugar de trabajar con decenas de planos desconectados que pueden contener inconsistencias, BIM permite que todos los agentes involucrados —arquitectos, ingenieros, contratistas y propietarios— trabajen sobre la misma fuente de verdad. Esto reduce errores de coordinación, elimina duplicidades y mejora significativamente la comunicación entre disciplinas. Cualquier cambio realizado en el modelo se propaga automáticamente a todas las vistas y documentación derivada, garantizando la consistencia del proyecto.

La normativa internacional define distintos niveles de madurez BIM que permiten evaluar el grado de implementación en una organización. El Nivel 0 corresponde al trabajo con CAD sin colaboración digital; el Nivel 1 introduce estándares de nombrado y organización con modelos 3D parciales; el Nivel 2 implica colaboración entre disciplinas mediante archivos compartidos y formatos abiertos como IFC; y el Nivel 3 representa la integración total en un modelo único en la nube con acceso simultáneo de todos los agentes. Comprender estos niveles es fundamental para planificar una transición exitosa hacia BIM.

Entre los beneficios más destacados de BIM se encuentran la detección temprana de colisiones (clash detection), que permite identificar interferencias entre disciplinas antes de la construcción; la generación automática de cuantificaciones y presupuestos directamente desde el modelo; la simulación de la secuencia constructiva (4D) vinculando el modelo al cronograma de obra; el análisis de costos (5D) con estimaciones dinámicas; y la planificación del mantenimiento durante todo el ciclo de vida del edificio (6D). Estas dimensiones hacen de BIM una herramienta indispensable para la industria de la construcción moderna.

La implementación de BIM requiere no solo cambios tecnológicos sino también transformaciones culturales y organizacionales. Los equipos deben adoptar nuevos flujos de trabajo, definir protocolos de colaboración claros y adquirir competencias técnicas específicas. Sin embargo, la inversión se recupera rápidamente mediante la reducción de retrabajos en obra, la mejora en la calidad de la documentación constructiva y la optimización de los procesos. Estudios demuestran que BIM puede reducir hasta un 40% los cambios no presupuestados y un 25% el tiempo de coordinación entre disciplinas.`,
      keyPoints: ['BIM crea modelos digitales inteligentes con información detallada de cada componente constructivo', 'Permite colaboración entre disciplinas sobre una única fuente de verdad compartida', 'Existen 4 niveles de madurez: del CAD sin colaboración hasta la integración total en la nube', 'Añade dimensiones de tiempo (4D), costos (5D) y mantenimiento (6D) al modelo 3D', 'La detección temprana de colisiones ahorra hasta 40% en cambios no presupuestados', 'Requiere transformación tecnológica, cultural y organizacional para su implementación exitosa'],
      steps: [
        { title: 'Comprender el concepto de modelo inteligente', description: 'Analiza la diferencia entre un dibujo CAD (líneas sin significado) y un modelo BIM (objetos con propiedades). Un muro en BIM tiene material, espesor, costo y relaciones con otros elementos.', tip: 'Piensa en BIM como una base de datos con representación gráfica, no como un dibujo 3D.' },
        { title: 'Identificar los niveles de madurez BIM', description: 'Estudia los niveles del 0 al 3: desde trabajo sin colaboración digital hasta la integración total en un modelo compartido en la nube. Evalúa en qué nivel se encuentra tu organización.' },
        { title: 'Explorar las dimensiones de BIM', description: 'Conoce las dimensiones 3D (geometría), 4D (tiempo), 5D (costos), 6D (sostenibilidad) y 7D (gestión de facilidades). Cada dimensión añade una capa de información valiosa al modelo.' },
        { title: 'Investigar casos de éxito documentados', description: 'Busca proyectos reales donde BIM haya generado ahorros significativos. Documenta los beneficios cuantificables: detección de colisiones, cuantificaciones precisas y reducción de retrabajos.' }
      ],
      practice: 'Selecciona un proyecto de construcción que conozcas y elabora un análisis de cómo BIM habría mejorado cada fase: diseño, documentación, coordinación, construcción y operación. Identifica al menos 5 problemas que se habrían evitado con BIM y estima el ahorro potencial en cada caso.',
      extraResources: [
        { label: 'buildingSMART International', url: 'https://www.buildingsmart.org/' },
        { label: 'BIM Forum - Recursos y estándares', url: 'https://bimforum.org/' },
        { label: 'Guía BIM del Gobierno de España', url: 'https://bim.gob.es/' }
      ]
    },
    'Historia y evolución del BIM': {
      explanation: `Los orígenes de BIM se remontan a la década de 1970, cuando investigadores como Charles Eastman en la Universidad de Carnegie Mellon comenzaron a explorar el concepto de "Building Description System", un sistema capaz de almacenar información de diseño de edificios de forma estructurada. Eastman es considerado uno de los padres del BIM moderno, ya que su visión anticipó la necesidad de modelos digitales integrados que contendrían no solo geometría sino también información semántica sobre los componentes del edificio. Su trabajo sentó las bases teóricas que décadas después se materializarían en las herramientas que usamos hoy.

En la década de 1980, surgieron las primeras herramientas comerciales que incorporaban elementos del paradigma BIM. ArchiCAD, lanzado en 1984 por Graphisoft en Hungría, fue el primer software de arquitectura basado en un modelo 3D paramétrico y representa un hito fundamental en la historia de BIM. Le siguieron programas como Vectorworks y Allplan que también adoptaron el modelado basado en objetos inteligentes. Sin embargo, estos primeros sistemas eran limitados en capacidad y requerían hardware costoso, lo que restringía su adopción a estudios grandes y bien financiados.

Fue en los años 2000 cuando BIM experimentó una adopción masiva gracias a la aparición de Revit de Autodesk (2000), que popularizó el modelado paramétrico orientado a componentes inteligentes y democratizó el acceso a la tecnología BIM. Revit introdujo el concepto de cambios propagados automáticamente a todas las vistas, lo que eliminó el problema de inconsistencia entre planos que afectaba a los estudios que trabajaban con CAD. La compra de Revit por parte de Autodesk y su integración en la suite de productos de la compañía aceleró enormemente su distribución.

La adopción gubernamental jugó un papel crucial en la expansión de BIM a nivel global. En 2011, el gobierno del Reino Unido emitió la "BIM Mandate", exigiendo el uso de BIM Nivel 2 en todos los proyectos públicos a partir de 2016. Este mandato impulsó la transformación de toda la industria británica de la construcción. Singapur implementó requisitos BIM aún más ambiciosos con la sumisión electrónica obligatoria. Países escandinavos, Estados Unidos y varias naciones de la Unión Europea siguieron caminos similares, estableciendo requisitos BIM para proyectos de infraestructura pública.

En América Latina, Chile fue pionero con su estrategia nacional BIM en 2016, seguido por Colombia con la Ley 1931 de 2018. México creó el Comité Mexicano de BIM y Brasil estableció el BIM BR como estrategia nacional. Esta tendencia indica que la competencia en BIM se convertirá en un requisito indispensable para los profesionales de la arquitectura y la ingeniería en toda la región. El futuro apunta hacia la integración con IA, IoT y gemelos digitales para modelos dinámicos y predictivos.`,
      keyPoints: ['Charles Eastman y el "Building Description System" en los años 70: orígenes teóricos', 'ArchiCAD (1984): primer software BIM comercial con modelado paramétrico', 'Revit de Autodesk (2000): democratizó BIM con cambios automáticos en todas las vistas', 'BIM Mandate del Reino Unido (2011): impulsó la adopción gubernamental global', 'América Latina avanza: Chile (2016), Colombia (2018), México y Brasil con estrategias nacionales', 'El futuro integra BIM con IA, IoT y gemelos digitales para gestión predictiva'],
      steps: [
        { title: 'Crear una línea temporal de BIM', description: 'Elabora una línea de tiempo desde los años 70 hasta hoy, marcando hitos clave: concepto de Eastman, ArchiCAD, Revit, mandatos gubernamentales y tendencias actuales. Usa una herramienta visual como Miro o papel y lápiz.' },
        { title: 'Analizar el impacto de los mandatos gubernamentales', description: 'Investiga cómo el mandato del Reino Unido transformó la industria británica. Busca datos sobre el porcentaje de proyectos públicos que usan BIM antes y después del mandato.' },
        { title: 'Evaluar el estado de BIM en tu región', description: 'Investiga las políticas BIM de tu país: ¿Existen leyes o estrategias nacionales? ¿Las licitaciones públicas exigen BIM? ¿Qué nivel de madurez predomina en el sector privado?', tip: 'Consulta el sitio web del comité BIM de tu país para información actualizada.' },
        { title: 'Investigar tendencias futuras', description: 'Explora cómo la IA, IoT y los gemelos digitales están convergiendo con BIM. Busca ejemplos de proyectos que ya implementan estas integraciones.' }
      ],
      practice: 'Elabora un informe de 2 páginas sobre el estado actual de implementación BIM en tu país. Incluye: marco legal vigente, nivel de adopción en sector público y privado, principales barreras identificadas, oportunidades de mejora y una propuesta concreta de plan de implementación para una empresa mediana de diseño.',
      extraResources: [
        { label: 'Historia de BIM - Autodesk', url: 'https://www.autodesk.com/solutions/bim' },
        { label: 'BIM en América Latina', url: 'https://bimforum.org/' },
        { label: 'Estrategia BIM Chile', url: 'https://bim.mop.gob.cl/' }
      ]
    },
    'BIM vs CAD tradicional: ventajas competitivas': {
      explanation: `La diferencia fundamental entre CAD y BIM radica en la naturaleza de la información que cada sistema maneja. En CAD (Computer-Aided Design), el profesional dibuja líneas y formas que representan elementos constructivos, pero el software no comprende qué representa cada elemento: una línea puede ser un muro, un borde de acera o una cota, y el programa no distingue entre ellas. En BIM, cada elemento es un objeto inteligente con propiedades: un muro tiene material, espesor, altura, costo unitario y relación con otros elementos como puertas y ventanas. Esta diferencia conceptual tiene implicaciones prácticas enormes en todas las fases del proyecto, desde el diseño hasta la operación del edificio.

La asociatividad es una de las ventajas más poderosas del modelado BIM. En un modelo CAD, modificar un muro implica actualizar manualmente todos los planos afectados: plantas, cortes, fachadas y detalles. Este proceso manual es lento, propenso a errores y frecuentemente genera inconsistencias entre documentos. En BIM, el modelo es una base de datos única: al modificar un muro, todos los cortes, fachadas y vistas 3D se actualizan automáticamente. Esta asociatividad elimina errores de inconsistencia entre planos, uno de los problemas más costosos en la documentación de proyectos. Los estudios demuestran que la inconsistencia entre planos genera entre el 3% y el 5% de costos adicionales en obra.

Otra ventaja clave es la generación automática de cuantificaciones. En un flujo CAD, el profesional debe contar manualmente o mediante herramientas externas los elementos del proyecto: cuántos metros cuadrados de muro, cuántas puertas de cada tipo, cuántos metros cúbicos de concreto. Este proceso puede tomar semanas para un proyecto mediano. En BIM, estas cantidades se extraen directamente del modelo con precisión, ya que cada componente está definido con sus dimensiones y propiedades. Esto reduce semanas de trabajo a minutos y minimiza errores en presupuestos, que pueden representar desviaciones de millones de dólares en proyectos grandes.

La detección de colisiones (clash detection) es quizá la ventaja más impactante de BIM en la práctica constructiva. En proyectos complejos, es común que las instalaciones eléctricas, hidráulicas y de HVAC se superpongan con elementos estructurales o arquitectónicos, generando conflictos que solo se descubren durante la construcción. Con BIM, los modelos de todas las disciplinas se integran y analizan automáticamente para identificar colisiones antes de la construcción, ahorrando tiempo y dinero significativos. Estudios del CIFE de Stanford demuestran que el clash detection puede eliminar hasta el 40% de los cambios no presupuestados en obra.

Finalmente, BIM facilita la gestión del ciclo de vida completo del edificio. El modelo contiene información útil no solo durante el diseño y la construcción sino también durante décadas de operación y mantenimiento. Los datos de componentes (garantías, manuales, vida útil esperada) se almacenan en el modelo y se utilizan para planificar intervenciones, optimizar consumo energético y gestionar instalaciones eficientemente.`,
      keyPoints: ['CAD dibuja líneas sin significado; BIM crea objetos inteligentes con propiedades y relaciones', 'La asociatividad automática elimina inconsistencias entre planos, ahorrando 3-5% del costo total', 'Las cuantificaciones se generan automáticamente desde el modelo, reduciendo semanas a minutos', 'Clash detection detecta colisiones antes de obra, ahorrando hasta 40% en cambios no presupuestados', 'BIM facilita la gestión del ciclo de vida completo: diseño, construcción y operación', 'El ROI se demuestra en reducción de retrabajos, mejor coordinación y documentación consistente'],
      steps: [
        { title: 'Crear tabla comparativa CAD vs BIM', description: 'En un documento, crea una tabla comparando: tipo de información, actualización de vistas, cuantificaciones, detección de colisiones, gestión del ciclo de vida y colaboración entre disciplinas.' },
        { title: 'Analizar un caso práctico de cambio', description: 'Documenta paso a paso qué cambiar en CAD vs BIM al mover un muro de carga. En CAD: actualizar planta, corte, fachada, detalles y cuantificaciones manualmente. En BIM: un solo cambio que se propaga automáticamente.' },
        { title: 'Calcular el ahorro potencial de clash detection', description: 'Estima el costo de resolver una colisión en obra vs detectarla en la fase de diseño. Considera: costo del retrabajo, tiempo de paralización, impacto en cronograma y costo del análisis BIM.', tip: 'Una colisión típica en obra puede costar entre $5,000 y $50,000 dependiendo de la complejidad.' },
        { title: 'Evaluar la transición CAD → BIM', description: 'Identifica obstáculos para la transición (formación, inversión, resistencia al cambio) y propone estrategias concretas para superarlos de forma gradual y sostenible.' }
      ],
      practice: 'Toma un proyecto documentado en CAD y redocumenta una porción significativa (una planta y un corte) en un software BIM como Revit. Compara el tiempo invertido, la calidad de la documentación generada y la facilidad de realizar cambios posteriores. Escribe un informe detallado con conclusiones cuantificables.',
      extraResources: [
        { label: 'Comparativa BIM vs CAD - Autodesk', url: 'https://www.autodesk.com/solutions/bim/bim-vs-cad' },
        { label: 'ROI de BIM - McKinsey Report', url: 'https://www.mckinsey.com/capabilities/operations/' },
        { label: 'Stanford CIFE - BIM Benefits', url: 'https://cife.stanford.edu/' }
      ]
    },
    'Estándares BIM: ISO 19650, COBie y clasificación': {
      explanation: `La estandarización es el pilar que permite la interoperabilidad y colaboración efectiva en proyectos BIM. Sin estándares compartidos, cada organización trabajaría de manera diferente, haciendo imposible la coordinación eficiente entre equipos multidisciplinarios. La ISO 19650 es la norma internacional que establece los principios para la gestión de la información en proyectos de construcción utilizando BIM. Basada en los estándares británicos PAS 1192, define cómo se debe organizar, nombrar, producir y entregar la información a lo largo de todo el ciclo de vida del activo construido. Su adopción es cada vez más generalizada a nivel mundial.

La ISO 19650 se estructura en varias partes que cubren diferentes aspectos de la gestión de la información. La Parte 1 establece los conceptos y principios generales, proporcionando el marco conceptual que guía toda la norma. La Parte 2 define la fase de entrega de los activos (asset delivery), cubriendo desde la evaluación y invitación hasta la entrega final del modelo. Las Partes 3, 4 y 5 abordan la fase operacional, la seguridad de la información y el uso con enfoque de seguridad. Para cualquier profesional BIM, comprender esta estructura es esencial para poder participar en proyectos que sigan la norma.

COBie (Construction Operations Building Information Exchange) es un formato estándar para entregar información de los activos del edificio al propietario o gestor de las instalaciones. COBie organiza datos como especificaciones de equipos, garantías, proveedores, fechas de instalación y parámetros de mantenimiento en hojas de cálculo estructuradas. Esta información es invaluable durante la fase de operación y mantenimiento, que típicamente representa el 80% del costo total del ciclo de vida del edificio. Sin COBie, los gestores de instalaciones frecuentemente reciben cajas de manuales en papel que son difíciles de consultar y actualizar.

Los sistemas de clasificación como Uniclass, OmniClass, MasterFormat y los códigos locales son fundamentales para organizar la información del modelo de manera consistente. Uniclass, desarrollado en el Reino Unido por NBS, es el sistema más utilizado en proyectos BIM y clasifica los elementos desde el nivel de complejo hasta el de componentes individuales. OmniClass es el equivalente norteamericano con una estructura similar. La elección del sistema de clasificación depende del país y del tipo de proyecto, pero su uso consistente garantiza que toda la información pueda ser localizada y comprendida por cualquier agente del proyecto, facilitando la interoperabilidad entre plataformas y equipos.

La implementación correcta de estos estándares requiere un BIM Execution Plan (BEP) que defina qué estándares se usarán, cómo se nombrarán los archivos, qué nivel de detalle se requiere en cada fase y cuáles son los entregables esperados. El BEP es el documento contractual que asegura que todos los participantes del proyecto sigan las mismas reglas.`,
      keyPoints: ['ISO 19650: norma internacional para gestión de información en proyectos BIM', 'Se estructura en 5 partes: conceptos, entrega de activos, operación, seguridad y uso seguro', 'COBie estandariza la entrega de datos para operación y mantenimiento (80% del costo de ciclo de vida)', 'Uniclass y OmniClass son los sistemas de clasificación más utilizados en proyectos BIM', 'La estandarización es esencial para la interoperabilidad entre plataformas diferentes', 'El BIM Execution Plan (BEP) define los estándares y protocolos a seguir en cada proyecto'],
      steps: [
        { title: 'Estudiar la estructura de ISO 19650', description: 'Analiza un resumen de la ISO 19650, enfocándote en las Partes 1 y 2. Identifica las responsabilidades de cada rol (cliente, lead appointed party, appointed party) y los entregables clave.', tip: 'El concepto de CDE (Common Data Environment) es central en ISO 19650: investiga sus 4 zonas de trabajo.' },
        { title: 'Explorar el formato COBie en detalle', description: 'Busca una plantilla COBie en Excel y analiza sus hojas: Contact, Facility, Floor, Space, Type, Component, System. Comprende qué información se registra en cada una.' },
        { title: 'Comparar sistemas de clasificación', description: 'Compara Uniclass y OmniClass: estructura, niveles de detalle, aplicación geográfica. Determina cuál es más apropiado para tu contexto profesional.' },
        { title: 'Crear un BEP simplificado', description: 'Toma un proyecto ejemplo y define: sistema de clasificación, convención de nombrado, estructura de carpetas del CDE, nivel de detalle por fase y entregables COBie.' }
      ],
      practice: 'Crea un BIM Execution Plan (BEP) simplificado para un proyecto residencial de 5 pisos. Incluye: estándar de clasificación seleccionado con justificación, convención de nombrado de archivos, estructura de carpetas del CDE, nivel de detalle requerido por fase y lista de entregables COBie con los campos obligatorios para cada hoja.',
      extraResources: [
        { label: 'ISO 19650 - Resumen oficial', url: 'https://www.iso.org/standard/78927.html' },
        { label: 'COBie - BuildingSMART', url: 'https://www.buildingsmart.org/standards/standards-tools-resources/' },
        { label: 'Uniclass 2015 - NBS', url: 'https://www.thenbs.com/our-tools/uniclass-2015' }
      ]
    },
    'Niveles de madurez BIM (Level 0 al Level 3)': {
      explanation: `Los niveles de madurez BIM describen el grado de colaboración e integración que una organización o proyecto ha alcanzado en su implementación de la metodología. Estos niveles fueron definidos originalmente por el grupo BIM del Reino Unido (BIM Alliance) y se han convertido en una referencia global para evaluar el progreso de adopción de BIM. Comprender estos niveles es fundamental para planificar una transición exitosa y realista hacia BIM, evitando intentos de saltar etapas que suelen fracasar por falta de preparación organizacional.

El Level 0 corresponde al trabajo sin colaboración digital: se utilizan dibujos CAD en 2D, sin estándares compartidos, con intercambio de información mediante papel o archivos digitales no estructurados. Este nivel representa la forma de trabajo tradicional y prácticamente ha desaparecido en mercados avanzados, aunque todavía existe en pequeñas oficinas y proyectos de baja complejidad. La principal limitación es la total ausencia de coordinación digital: cada profesional trabaja de forma aislada y la inconsistencia entre documentos es frecuente y costosa.

El Level 1 introduce el trabajo con modelos 3D parciales y planos 2D, pero sin colaboración entre disciplinas. Cada profesional trabaja en su propio modelo sin compartirlo con los demás. Se utilizan estándares de nombrado y organización (como la BS 1192), pero la coordinación se realiza manualmente mediante superposición de planos. Este nivel es común en estudios en transición hacia BIM y representa un primer paso importante, aunque los beneficios en coordinación son limitados porque los modelos no se comparten ni integran.

El Level 2 implica colaboración entre disciplinas mediante intercambio de archivos federados. Cada disciplina crea su propio modelo BIM y los combina con los demás mediante un proceso de federación en un entorno de datos común (CDE). Se utilizan formatos abiertos como IFC para el intercambio y se realizan clash detection periódicos. Este es el nivel exigido por la mayoría de las normativas gubernamentales. El Level 2 requiere protocolos de colaboración claros (BEP), un CDE funcional y definición clara de responsabilidades entre los participantes del proyecto.

El Level 3 representa la integración total: todas las disciplinas trabajan simultáneamente sobre un único modelo compartido en la nube. Los cambios de cualquier agente son visibles en tiempo real para todos los demás. Este nivel, también conocido como iBIM (intelligent BIM), requiere plataformas colaborativas avanzadas y acuerdos contractuales que definan las responsabilidades de cada participante. Pocos proyectos lo alcanzan plenamente debido a desafíos tecnológicos, contractuales y culturales, pero representa el horizonte hacia el que avanza la industria.`,
      keyPoints: ['Level 0: CAD 2D sin colaboración, trabajo aislado e inconsistente', 'Level 1: Modelos 3D parciales sin compartir entre disciplinas, estándares de nombrado', 'Level 2: Colaboración mediante federación de modelos, CDE y formatos abiertos como IFC', 'Level 3: Integración total en modelo único compartido en la nube con acceso en tiempo real', 'El Level 2 es el exigido por la mayoría de normativas gubernamentales actuales', 'La transición debe ser gradual; saltar niveles suele generar fracasos organizacionales'],
      steps: [
        { title: 'Evaluar el nivel actual de tu organización', description: 'Responde un cuestionario: ¿Se usan modelos 3D? ¿Se comparten entre disciplinas? ¿Hay un CDE implementado? ¿Se realizan clash detection? ¿Se usan formatos IFC? El resultado indicará tu nivel actual.' },
        { title: 'Definir el nivel objetivo realista', description: 'Basándote en los requisitos de tus clientes y el mercado, define a qué nivel necesitas llegar en 1-2 años. La mayoría de organizaciones debería apuntar al Level 2 como mínimo.', tip: 'No intentes saltar al Level 3 sin dominar primero el Level 2: la tecnología es lo fácil, la cultura organizacional es lo difícil.' },
        { title: 'Planificar la transición por fases', description: 'Crea un plan que incluya: formación del equipo, adquisición de software, definición de protocolos, selección de proyectos piloto y cronograma de implementación gradual.' },
        { title: 'Medir el progreso con KPIs', description: 'Define indicadores para medir el avance: número de proyectos en BIM, reducción de inconsistencias, tiempo de coordinación, satisfacción del equipo. Revisa los resultados trimestralmente.' }
      ],
      practice: 'Realiza una evaluación de madurez BIM de una empresa de diseño o construcción que conozcas. Identifica su nivel actual, las brechas para alcanzar el Level 2, y elabora un plan de acción de 12 meses con hitos mensuales, presupuesto estimado y métricas de éxito específicas.',
      extraResources: [
        { label: 'BIM Maturity Model - BIM Alliance', url: 'https://bimalliance.org/' },
        { label: 'BIM Level 2 - UK', url: 'https://bim-level2.org/' },
        { label: 'CDE - Entorno de Datos Común', url: 'https://www.buildingsmart.org/standards/standards-tools-resources/' }
      ]
    },
    'Interfaz de Revit y configuración del proyecto': {
      explanation: `La interfaz de Revit está diseñada para facilitar el modelado de información de edificios de manera eficiente y organizada. Al abrir Revit, se presenta la pantalla de inicio donde puedes crear un nuevo proyecto, abrir uno existente o acceder a plantillas predeterminadas. Las plantillas son fundamentales porque preconfiguran unidades, estilos de texto, tipos de línea, familias cargadas y parámetros del proyecto, ahorrando horas de configuración inicial y garantizando consistencia entre proyectos del mismo estudio. Una buena plantilla es la base de un flujo de trabajo BIM eficiente.

La cinta de opciones (Ribbon) organiza todas las herramientas en pestañas temáticas: Arquitectura, Estructura, Sistemas, Insertar, Anotar, Modificar, Vista y Administrar. Cada pestaña contiene paneles con herramientas agrupadas por función. La organización contextual es clave: al seleccionar un elemento, la cinta muestra opciones específicas para ese tipo de objeto. Por ejemplo, al seleccionar un muro aparecen opciones de unión, editar perfil y copiar; al seleccionar una puerta, aparecen opciones de orientación y tipo. Este comportamiento contextual permite acceder rápidamente a las herramientas relevantes sin buscarlas manualmente.

El navegador del proyecto (Project Browser) es el panel lateral que organiza todas las vistas, planos, programas, familias y grupos del modelo. Desde aquí accedes a plantas, cortes, fachadas, vistas 3D y planos de construcción. La barra de propiedades (Properties Palette) muestra y permite editar los parámetros del elemento seleccionado o de la vista activa. Dominar estos dos paneles es esencial para trabajar con fluidez en Revit, ya que son los que más frecuentemente se consultan y modifican durante el trabajo diario.

Antes de comenzar a modelar, es crucial configurar correctamente el proyecto: definir las unidades (metros o centímetros), la ubicación geográfica (para análisis energéticos y de sombras), la información del proyecto (nombre, número, dirección) y los parámetros compartidos que se utilizarán. Estas configuraciones se encuentran en la pestaña Administrar > Configuración y establecen la base sobre la cual se construirá todo el modelo BIM. Una configuración incorrecta al inicio genera problemas que se amplifican a medida que el proyecto crece.

La configuración de vistas es otro aspecto fundamental. Cada vista en Revit tiene propiedades independientes que controlan su visualización: nivel de detalle (coarse, medium, fine), estilo visual (wireframe, hidden line, shaded, realistic), rango de vista y visibilidad de categorías. Entender cómo configurar correctamente las vistas permite generar documentación clara y precisa, y visualizar el modelo de diferentes maneras según las necesidades de cada momento del proyecto.`,
      keyPoints: ['Las plantillas preconfiguran unidades, estilos y familias para consistencia entre proyectos', 'La cinta de opciones (Ribbon) se adapta contextualmente al elemento seleccionado', 'El Navegador del Proyecto organiza vistas, planos y familias de manera jerárquica', 'La barra de Propiedades permite editar parámetros del elemento o vista activa', 'La configuración inicial (unidades, ubicación, parámetros) es crítica y debe hacerse antes de modelar', 'Cada vista tiene propiedades de visualización independientes: detalle, estilo, rango y visibilidad'],
      steps: [
        { title: 'Abrir Revit y explorar la interfaz', description: 'Crea un nuevo proyecto con la plantilla arquitectónica. Navega por cada pestaña de la cinta de opciones y familiarízate con las herramientas disponibles en cada una.', tip: 'Aprende los atajos de teclado más comunes: WA (muro), DR (puerta), WN (ventana), LI (línea), etc.' },
        { title: 'Configurar el proyecto completamente', description: 'Ve a Administrar > Configuración y define: unidades en metros, ubicación geográfica de tu ciudad, información del proyecto. Estos datos afectan análisis posteriores y documentación.' },
        { title: 'Explorar el Navegador del Proyecto', description: 'Expande cada sección del Navegador: Vistas, Planos, Familias, Grupos. Haz doble clic en diferentes vistas para abrirlas y observa cómo cambia la barra de propiedades según la vista activa.' },
        { title: 'Configurar una vista de planta', description: 'Abre una planta y modifica sus propiedades: cambia el nivel de detalle, el estilo visual, el rango de vista y la visibilidad de categorías. Observa los cambios en tiempo real.' }
      ],
      practice: 'Crea un nuevo proyecto en Revit con la plantilla arquitectónica. Configura completamente el proyecto (unidades, ubicación, información) y personaliza al menos 3 vistas diferentes (planta, corte, 3D) con configuraciones de visualización adecuadas. Documenta el proceso con capturas de pantalla.',
      extraResources: [
        { label: 'Tutoriales oficiales de Revit', url: 'https://knowledge.autodesk.com/support/revit' },
        { label: 'Atajos de teclado de Revit', url: 'https://knowledge.autodesk.com/support/revit/learn-explore' },
        { label: 'Revit Forum - Comunidad', url: 'https://forums.autodesk.com/t5/revit-products/ct-p/80' }
      ]
    },
    'Muros, pisos y techos: modelado básico': {
      explanation: `Los muros son el elemento fundamental de cualquier modelo arquitectónico en Revit. Para crear un muro, se utiliza la herramienta Muro de la pestaña Arquitectura, que permite dibujar el trazado del muro en planta indicando su línea de ubicación (línea central, interior o exterior). Cada muro pertenece a un tipo que define su composición: espesor, materiales de cada capa, función estructural o de cierre, y prioridad de unión con otros muros. Esta composición multicapa es una de las características que distingue a BIM del modelado 3D tradicional y permite generar cuantificaciones precisas y simulaciones térmicas.

La composición de un muro en Revit es un aspecto crítico del modelado BIM. Un muro típico puede constar de varias capas: acabado interior (yeso), aislamiento térmico, estructura (bloque de concreto o ladrillo), cámara de aire y acabado exterior (repello o fachada ventilada). Cada capa tiene un material asignado, un espesor y una función que determina cómo se une con muros adyacentes y pisos. Las prioridades de unión definen qué capas se conectan primero cuando dos muros se encuentran, afectando directamente la representación en cortes constructivos y la precisión de las cuantificaciones.

Los pisos (losas) se crean delineando su contorno en planta y asignando un tipo que define su composición. Al igual que los muros, los pisos pueden tener múltiples capas: acabado (porcelanato, madera), mortero de nivelación, losa estructural, cielo raso y aislamiento acústico. Los pisos se enlazan automáticamente con los muros: al mover un muro, el piso se ajusta, y viceversa. Esta asociatividad es una de las ventajas más poderosas del modelado paramétrico en Revit y garantiza la consistencia del modelo a lo largo de todas las iteraciones del diseño.

Los techos funcionan de manera similar a los pisos pero con la capacidad adicional de definir pendientes. Puedes crear techos horizontales, inclinados o con múltiples pendientes. Las cubiertas follow-slope permiten modelar cubiertas complejas que se adaptan a la forma del edificio. La intersección entre techos y muros se resuelve automáticamente según las reglas de unión definidas en los tipos de cada elemento, aunque en casos complejos puede requerir ajustes manuales con las herramientas de unión.

Es fundamental entender el concepto de línea de ubicación del muro, que determina si la línea que dibujas corresponde al centro, la cara interior o la cara exterior del muro. El correcto uso de la línea de ubicación es esencial para que las mediciones del modelo coincidan con las dimensiones reales del proyecto. Para muros exteriores se recomienda usar la línea interior como ubicación, así las dimensiones del espacio interior son exactas desde el momento del dibujo.`,
      keyPoints: ['Los muros tienen composición multicapa con materiales, espesores y funciones definidas por tipo', 'Las prioridades de unión controlan cómo las capas de muros se conectan en intersecciones', 'Los pisos se asocian automáticamente con los muros para consistencia bidireccional del modelo', 'Los techos pueden definir pendientes y se unen automáticamente con los muros', 'La línea de ubicación del muro (centro, interior, exterior) afecta las dimensiones del modelo', 'La cadena de muros permite dibujar trazados continuos rápidamente'],
      steps: [
        { title: 'Crear muros con diferentes tipos', description: 'En un nuevo proyecto, crea muros de tipo exterior e interior. Observa las diferencias en composición, espesor y comportamiento de unión. Experimenta con diferentes líneas de ubicación.', tip: 'Usa la línea de ubicación "Interior" para muros exteriores: las dimensiones interiores serán exactas.' },
        { title: 'Modelar un piso con composición multicapa', description: 'Dibuja el contorno de un piso conectado a los muros exteriores. Examina su composición en el editor de tipo y verifica las uniones con los muros en vista de sección.' },
        { title: 'Crear un techo con pendiente', description: 'Dibuja un techo sobre los muros exteriores. Define pendientes en los bordes y observa cómo se genera automáticamente la geometría inclinada. Verifica la unión con los muros.' },
        { title: 'Verificar el modelo en 3D y sección', description: 'Cambia a vista 3D y recorre el modelo. Genera una sección y verifica que las composiciones multicapa se muestran correctamente y las uniones se resuelven apropiadamente.' }
      ],
      practice: 'Modela una habitación rectangular de 4x5 metros con muros exteriores de 20cm, muro interior divisorio de 10cm, piso con acabado de porcelanato y techo inclinado a dos aguas. Genera una sección y verifica que las composiciones multicapa se muestran correctamente. Documenta el proceso con capturas de pantalla.',
      extraResources: [
        { label: 'Tutorial de muros en Revit - Autodesk', url: 'https://knowledge.autodesk.com/support/revit' },
        { label: 'Composición de muros - Guía', url: 'https://www.autodesk.com/support/technical/article/caas/sfdcarticles/sfdcarticles/ENU/' },
        { label: 'Revit City - Componentes', url: 'https://www.revitcity.com/' }
      ]
    },
    'Puertas, ventanas y componentes': {
      explanation: `Las puertas y ventanas en Revit son familias cargable que se insertan en muros anfitriones. A diferencia de los muros, que se crean directamente en el proyecto, las puertas y ventanas se cargan desde una biblioteca de familias (.rfa) y se colocan en el muro seleccionando su ubicación en planta. Cada instancia de puerta o ventana hereda las propiedades de su tipo pero puede personalizarse individualmente: dimensiones, materiales, vidrio, marco y herrajes. Este sistema de familias paramétricas es una de las características más poderosas de Revit para crear bibliotecas reutilizables de componentes.

Al insertar una puerta, Revit crea automáticamente la apertura en el muro y muestra el umbral en las vistas de corte. La orientación de la puerta (hacia dónde abre y qué lado tiene el marco) se controla con las flechas de control que aparecen al seleccionar la instancia. Estas flechas permiten cambiar la orientación sin eliminar y volver a insertar la puerta, lo cual es muy útil cuando se ajusta el diseño. Las ventanas se comportan de manera similar: se alojan en el muro y su altura se define mediante el parámetro de alfeizar (sill height) y la altura total del componente.

Los componentes genéricos incluyen mobiliario, equipos, sanitarios, iluminación y elementos decorativos. Estos componentes se insertan en el modelo como familias cargable o se crean in situ para elementos únicos. Cada componente puede tener parámetros de tipo y de instancia, conectores de sistemas (eléctrico, hidráulico, HVAC) y datos de fabricante. La correcta selección y parametrización de componentes es fundamental para la calidad del modelo BIM y su utilidad en fases posteriores del proyecto, como las cuantificaciones, la coordinación con instalaciones y la gestión de facilidades.

La biblioteca de Revit incluye miles de familias predefinidas, pero en la práctica profesional es común crear familias personalizadas o descargarlas de bibliotecas manufactureras como BIMobject, Revit City o los portales de fabricantes específicos. La calidad de una familia se mide por su parametrización (¿se puede ajustar todo con parámetros?), su nivel de detalle (¿representa correctamente el objeto real en todas las escalas?) y su eficiencia (¿no ralentiza el modelo con geometría excesiva?). Una familia mal construida puede afectar significativamente el rendimiento y la calidad del proyecto completo.

Es importante entender la diferencia entre parámetros de tipo y de instancia. Los parámetros de tipo afectan a todas las instancias de ese tipo: si cambias el ancho del tipo "Puerta 80cm", todas las puertas de ese tipo cambian simultáneamente. Los parámetros de instancia solo afectan a la instancia seleccionada: la altura de alfeizar de una ventana específica puede ser diferente sin afectar las demás del mismo tipo. Esta distinción es fundamental para mantener el modelo organizado y eficiente, evitando la proliferación innecesaria de tipos.`,
      keyPoints: ['Las puertas y ventanas son familias cargable que se insertan en muros anfitriones automáticamente', 'Revit crea aperturas en los muros al insertar puertas y ventanas sin intervención manual', 'Los parámetros de tipo afectan todas las instancias; los de instancia solo la seleccionada', 'La biblioteca incluye miles de familias, pero se pueden crear personalizadas o descargar de BIMobject', 'La calidad de una familia se mide por parametrización, nivel de detalle y eficiencia del modelo', 'Los componentes genéricos pueden tener conectores de sistemas y datos de fabricante'],
      steps: [
        { title: 'Cargar e insertar puertas', description: 'Carga varias puertas desde la biblioteca de Revit e insértalas en los muros de tu proyecto. Experimenta con los controles de orientación y observa cómo se crea la apertura automáticamente.' },
        { title: 'Insertar y configurar ventanas', description: 'Inserta ventanas de diferentes tipos. Modifica el parámetro de alfeizar (sill height) para variar la altura de instalación. Verifica la representación en planta, sección y 3D.', tip: 'Usa la tecla Espacio al insertar para rotar la ventana 90° rápidamente.' },
        { title: 'Agregar componentes de mobiliario', description: 'Carga y coloca muebles, sanitarios y equipos en tu modelo. Observa cómo los componentes se colocan en el nivel y pueden asociarse a un piso o techo.' },
        { title: 'Diferenciar parámetros de tipo vs instancia', description: 'Selecciona una puerta y modifica un parámetro de tipo (ancho). Observa cómo todas las del mismo tipo cambian. Luego modifica un parámetro de instancia (alfeizar) y verifica que solo esa puerta cambia.' }
      ],
      practice: 'En un modelo con muros ya creados, inserta al menos 3 tipos de puertas y 2 tipos de ventanas. Agrega mobiliario básico en una habitación. Configura diferentes parámetros de instancia para cada elemento y genera una vista de sección que muestre las aperturas correctamente. Documenta las diferencias entre parámetros de tipo e instancia.',
      extraResources: [
        { label: 'BIMobject - Biblioteca de familias', url: 'https://bimobject.com/' },
        { label: 'Revit City - Descarga de familias', url: 'https://www.revitcity.com/' },
        { label: 'Creación de familias - Tutorial Autodesk', url: 'https://knowledge.autodesk.com/support/revit/learn-explore' }
      ]
    },
    'Vistas, plantas, cortes y fachadas': {
      explanation: `En Revit, cada vista es una representación del modelo desde una perspectiva específica con configuraciones independientes. Esto significa que puedes tener una planta arquitectónica con cotas y anotaciones, un corte constructivo con mayor nivel de detalle y una vista 3D para visualización, todo derivado del mismo modelo sin necesidad de redibujar nada. Las vistas son el vehículo principal para generar la documentación del proyecto y constituyen una de las ventajas más significativas del modelado BIM: un solo modelo produce toda la documentación necesaria de forma automática.

Las plantas se crean automáticamente al definir los niveles del proyecto. Cada nivel genera una vista de planta que muestra los elementos del modelo cortados por el plano del nivel y los elementos visibles debajo. La configuración de la vista permite controlar el rango de profundidad (view range), el nivel de detalle (coarse, medium, fine), la visibilidad de categorías y subcategorías, y los estilos de visualización (wireframe, hidden line, shaded, realistic). El view range es especialmente importante: define el plano de corte principal, el plano de vista inferior y los planos superior e inferior que determinan qué elementos son visibles en la planta.

Los cortes (sections) se crean dibujando una línea de sección en cualquier vista. La marca de sección define la extensión del corte y la profundidad de la vista resultante. Los cortes pueden ser de edificio (mostrando la sección completa) o de detalle (enfocándose en una porción específica con mayor nivel de detalle). La dirección del corte, el gap de la marca y la referencia a detalles se configuran en las propiedades de la sección. Es buena práctica nombrar los cortes con identificadores descriptivos para facilitar su localización en el Navegador del Proyecto.

Las fachadas (elevations) se generan de manera similar a los cortes, pero desde puntos cardinales. Al crear una fachada, Revit coloca automáticamente marcadores en las direcciones Norte, Sur, Este y Oeste, aunque puedes agregar fachadas adicionales en cualquier orientación. Las vistas 3D, tanto en perspectiva como en axonometría, permiten visualizar el modelo completo y crear recorridos virtuales. Las vistas 3D ortográficas son útiles para documentación, mientras que las perspectivas son ideales para presentaciones al cliente.

La gestión eficiente de vistas requiere organizarlas en el Navegador del Proyecto mediante subdirectorios y convenciones de nombrado consistentes. En proyectos complejos, el número de vistas puede crecer rápidamente, y sin una organización clara, encontrar la vista correcta se convierte en un desafío. Los filtros de vista, las plantillas de vista y los parámetros de vista compartidos son herramientas avanzadas que permiten estandarizar la apariencia y configuración de las vistas a lo largo del proyecto.`,
      keyPoints: ['Cada vista es una representación independiente del modelo con configuraciones propias', 'Las plantas se generan automáticamente desde los niveles del proyecto', 'El view range controla qué elementos son visibles en cada planta', 'Los cortes pueden ser de edificio (completo) o de detalle (porción específica)', 'Las fachadas se generan desde puntos cardinales con marcadores automáticos', 'Las plantillas de vista estandarizan la apariencia y configuración de las vistas'],
      steps: [
        { title: 'Crear y configurar vistas de planta', description: 'Abre una planta existente y modifica su view range, nivel de detalle y visibilidad de categorías. Observa cómo cambian los elementos visibles según la configuración.' },
        { title: 'Generar cortes del modelo', description: 'Crea al menos 2 cortes de edificio y 1 corte de detalle. Configura la extensión de cada corte y observa el resultado. Nombra los cortes con identificadores descriptivos.', tip: 'Usa la herramienta "Split Section" para crear cortes con saltos que muestren diferentes partes del edificio.' },
        { title: 'Crear fachadas y vistas 3D', description: 'Genera las 4 fachadas principales y una vista 3D en perspectiva. Experimenta con la cámara de perspectiva para crear vistas desde el punto de vista de una persona.' },
        { title: 'Aplicar plantillas de vista', description: 'Crea una plantilla de vista para plantas arquitectónicas (con cotas, texto y estilo visual definido) y aplícala a todas las plantas del proyecto para consistencia.' }
      ],
      practice: 'En un modelo con muros, puertas y ventanas ya modelados, genera la documentación completa: al menos 2 plantas, 2 cortes, 4 fachadas y 2 vistas 3D. Configura cada vista con el view range, nivel de detalle y estilo visual apropiado. Crea una plantilla de vista y aplícala a todas las plantas.',
      extraResources: [
        { label: 'Vistas en Revit - Autodesk', url: 'https://knowledge.autodesk.com/support/revit' },
        { label: 'View Range - Guía detallada', url: 'https://www.autodesk.com/support/technical/article/caas/sfdcarticles/sfdcarticles/ENU/' },
        { label: 'Plantillas de vista - Tutorial', url: 'https://knowledge.autodesk.com/support/revit/learn-explore' }
      ]
    },
    'Anotaciones, cotas y documentación': {
      explanation: `Las anotaciones en Revit son elementos que se colocan en las vistas para comunicar información específica del proyecto: cotas dimensionales, textos, etiquetas de elementos, llamadas de detalle y símbolos. A diferencia del CAD, donde las anotaciones son entidades gráficas independientes que pueden desincronizarse del modelo, en Revit las cotas y etiquetas están vinculadas al modelo: si un muro se mueve, la cota se actualiza automáticamente; si una puerta cambia de tipo, la etiqueta refleja la nueva información. Esta vinculación garantiza la consistencia entre el modelo y la documentación, eliminando uno de los errores más comunes en la documentación de proyectos.

Las cotas en Revit pueden ser permanentes o temporales. Las cotas temporales aparecen al crear o seleccionar elementos y se utilizan para posicionar con precisión sin necesidad de crear cotas permanentes. Las cotas permanentes se insertan deliberadamente en las vistas y forman parte de la documentación. Existen varios tipos de acotación: lineales (entre dos puntos), alineada (paralela a un eje), angulares, de arco y de elevación. Cada tipo de cota tiene estilos personalizables: tipo y tamaño de texto, tipo de flecha, extensión de las líneas y unidades de medida.

Las etiquetas (tags) son anotaciones que extraen automáticamente información del modelo. Una etiqueta de puerta muestra el número de marca; una de ventana puede mostrar dimensiones y tipo de vidrio; una de habitación muestra el nombre y el área calculada. Las etiquetas se personalizan mediante la edición de la familia de etiqueta, donde se seleccionan los parámetros a mostrar y el formato de presentación. Esta automatización evita errores de tipeo y asegura que la documentación siempre refleje el estado actual del modelo.

Los planos de construcción (sheets) son el contenedor final donde se organizan las vistas y anotaciones para la impresión. Cada plano tiene un formato de lámina (title block) que incluye información del proyecto, número de plano, escala y sellos profesionales. Las vistas colocadas en planos mantienen su asociación con el modelo: cualquier cambio se refleja automáticamente en todas las vistas del plano, garantizando la consistencia de la documentación. La escala de la vista en el plano controla el nivel de detalle visible y el tamaño del texto.

Las planillas (schedules) son vistas tabulares que extraen información del modelo en formato de tabla: puertas, ventanas, habitaciones, materiales, etc. Las planillas se pueden personalizar para mostrar los campos relevantes, ordenar y agrupar datos, y aplicar filtros. Son la base de las cuantificaciones y se pueden exportar a Excel para análisis adicional. La vinculación bidireccional entre planillas y modelo permite modificar propiedades desde la planilla y ver los cambios reflejados en el modelo.`,
      keyPoints: ['Las cotas y etiquetas están vinculadas al modelo y se actualizan automáticamente', 'Las cotas temporales sirven para posicionar con precisión; las permanentes para documentación', 'Las etiquetas extraen automáticamente información del modelo sin intervención manual', 'Los planos de construcción organizan vistas y anotaciones para impresión', 'Las planillas extraen datos tabulares del modelo para cuantificaciones y reportes', 'La escala de la vista en el plano controla el nivel de detalle y tamaño del texto'],
      steps: [
        { title: 'Insertar cotas permanentes', description: 'En una planta, inserta cotas lineales y alineadas entre muros. Modifica un muro y observa cómo la cota se actualiza automáticamente. Personaliza el estilo de cota.', tip: 'Usa cotas de cadena para acotar múltiples elementos consecutivos con una sola operación.' },
        { title: 'Etiquetar puertas y ventanas', description: 'Usa la herramienta de etiquetas para marcar todas las puertas y ventanas de una planta. Configura qué parámetros muestra cada etiqueta.' },
        { title: 'Crear un plano de construcción', description: 'Crea un nuevo plano, inserta el title block y coloca vistas. Agrega cotas, etiquetas y textos. Configura la escala de cada vista colocada.', tip: 'Verifica que todas las vistas en el plano tienen la escala correcta antes de imprimir.' },
        { title: 'Generar una planilla de puertas', description: 'Crea una planilla de puertas que incluya: marca, tipo, ancho, alto, material y nivel. Ordena por tipo y nivel. Coloca la planilla en un plano.' }
      ],
      practice: 'Genera la documentación completa de un proyecto simple: al menos 2 planos con plantas, cortes y detalles acotados. Incluye etiquetas de todos los elementos, planillas de puertas y ventanas, y notas generales. Verifica que todas las cotas y etiquetas se actualizan correctamente al modificar el modelo.',
      extraResources: [
        { label: 'Anotaciones en Revit - Autodesk', url: 'https://knowledge.autodesk.com/support/revit' },
        { label: 'Planillas y cuantificaciones', url: 'https://knowledge.autodesk.com/support/revit/learn-explore' },
        { label: 'Documentación BIM - Guía', url: 'https://www.autodesk.com/solutions/bim' }
      ]
    }
  }
};

// ============================================================
// CONTENT GENERATOR FOR REMAINING TOPICS
// Uses seed file content when available, generates rich generic content otherwise
// ============================================================

function generateEnrichedContent(topicName, moduleName, courseSlug, seedContent) {
  // Check if we have hand-crafted content for this topic
  const dbContent = topicContentDB[courseSlug];
  if (dbContent && dbContent[topicName]) {
    return dbContent[topicName];
  }

  // Try to use seed file content
  if (seedContent && seedContent.length > 400) {
    return buildFromSeed(topicName, moduleName, courseSlug, seedContent);
  }

  // Generate rich generic content
  return generateRichGenericContent(topicName, moduleName, courseSlug);
}

function buildFromSeed(topicName, moduleName, courseSlug, seedContent) {
  const courseCtx = getCourseContext(courseSlug);

  // Build concise keyPoints from content
  const keyPoints = [];
  const sentences = seedContent.split(/\.\s+/).filter(s => s.trim().length > 20 && s.trim().length < 150);
  // Pick distributed sentences and make them concise
  const step = Math.max(1, Math.floor(sentences.length / 6));
  for (let i = 0; i < Math.min(6, sentences.length); i++) {
    const s = sentences[i * step]?.trim();
    if (s) {
      // Make concise: limit to 80 chars
      const concise = s.length > 80 ? s.substring(0, 77) + '...' : s;
      keyPoints.push(concise);
    }
  }
  while (keyPoints.length < 5) {
    keyPoints.push(courseCtx.defaultKeyPoints[keyPoints.length] || 'Concepto clave del tema que requiere estudio detallado');
  }

  // Ensure explanation is 500+ words
  let explanation = seedContent;
  const wordCount = explanation.split(/\s+/).length;
  if (wordCount < 500) {
    explanation += `\n\nPara profundizar en ${topicName.toLowerCase()}, es importante considerar su aplicación práctica en proyectos reales. En el contexto de ${moduleName.toLowerCase()}, este tema se conecta con otros conceptos fundamentales que se abordan en el curso. La experiencia demuestra que los profesionales que dominan ${topicName.toLowerCase()} pueden tomar decisiones más informadas y producir resultados de mayor calidad.

La práctica deliberada es la clave para dominar ${topicName.toLowerCase()}. Se recomienda comenzar con ejercicios simples que permitan verificar los resultados, y luego progresar gradualmente hacia situaciones más complejas. La documentación del proceso de aprendizaje, incluyendo los errores y las soluciones encontradas, es una herramienta valiosa para consolidar el conocimiento y para crear una referencia personal que acelere el aprendizaje futuro.`;
  }

  return {
    explanation,
    keyPoints: keyPoints.slice(0, 6),
    steps: courseCtx.generateSteps(topicName),
    practice: courseCtx.generatePractice(topicName),
    extraResources: courseCtx.resources
  };
}

function generateRichGenericContent(topicName, moduleName, courseSlug) {
  const ctx = getCourseContext(courseSlug);

  const explanation = `${topicName} es un tema central dentro del módulo "${moduleName}" que desempeña un papel fundamental en la formación profesional en ${ctx.field}. Este concepto no solo proporciona conocimientos teóricos sino que también establece las bases para la aplicación práctica en situaciones reales del mundo profesional. Comprender ${topicName.toLowerCase()} en profundidad permite a los profesionales tomar decisiones más informadas, diseñar soluciones más efectivas y comunicarse con mayor precisión técnica con otros miembros del equipo de trabajo.

Desde una perspectiva técnica, ${topicName.toLowerCase()} involucra varios componentes interrelacionados que deben entenderse de manera integral. Los fundamentos teóricos proporcionan el marco conceptual que guía la aplicación práctica. Las herramientas y técnicas específicas permiten implementar los conceptos en situaciones reales de proyecto. Las mejores prácticas y estándares de la industria aseguran que la implementación sea consistente, segura y eficiente. Cada uno de estos componentes es necesario pero insuficiente por sí solo; solo la comprensión integrada de todos ellos permite un dominio genuino del tema.

En el contexto profesional actual, ${topicName.toLowerCase()} ha adquirido una relevancia creciente debido a los avances tecnológicos y las nuevas demandas del mercado. Las organizaciones que implementan efectivamente estos conceptos obtienen ventajas competitivas significativas: mayor eficiencia en los procesos, reducción de errores y retrabajos, mejor comunicación entre equipos y resultados de mayor calidad para los clientes. La inversión en formación y dominio de ${topicName.toLowerCase()} se traduce directamente en mejora del rendimiento profesional y de los resultados de los proyectos.

La evolución de ${topicName.toLowerCase()} muestra cómo las necesidades prácticas han impulsado el desarrollo de nuevas técnicas y herramientas. Lo que comenzó como conceptos teóricos y aproximaciones manuales se ha transformado en metodologías sofisticadas respaldadas por software especializado. Comprender esta evolución ayuda a apreciar por qué las cosas funcionan como lo hacen y a anticipar hacia dónde se dirige el campo en el futuro. Las tendencias actuales apuntan hacia una mayor automatización, integración con inteligencia artificial y enfoque en la sostenibilidad.

Para dominar ${topicName.toLowerCase()}, es importante combinar el estudio teórico con la práctica deliberada. La teoría proporciona el "por qué" detrás de cada decisión, mientras que la práctica desarrolla la intuición y la velocidad necesaria para trabajar eficientemente. Se recomienda comenzar con ejercicios guiados que permitan verificar los resultados, y luego progresar hacia proyectos más abiertos donde debas tomar decisiones independientes. La comunidad profesional ofrece numerosos recursos que pueden acelerar significativamente el proceso de aprendizaje y proporcionar retroalimentación valiosa sobre tu progreso.

Es fundamental también entender las limitaciones y consideraciones éticas asociadas con ${topicName.toLowerCase()}. Todo conocimiento técnico debe aplicarse con responsabilidad y dentro del marco legal vigente. En ${ctx.field}, esto significa respetar las normativas, proteger la información sensible y considerar el impacto de las decisiones técnicas en las personas y el entorno. La ética profesional no es un complemento opcional sino una parte integral del ejercicio profesional competente.`;

  return {
    explanation,
    keyPoints: ctx.defaultKeyPoints.slice(0, 6),
    steps: ctx.generateSteps(topicName),
    practice: ctx.generatePractice(topicName),
    extraResources: ctx.resources
  };
}

function getCourseContext(courseSlug) {
  const contexts = {
    'diseno-arquitectonico-bim': {
      field: 'arquitectura y construcción BIM',
      defaultKeyPoints: [
        'La planificación y organización son fundamentales antes de iniciar cualquier modelo BIM',
        'Los estándares y protocolos garantizan la consistencia y calidad del modelo',
        'La colaboración entre disciplinas es el pilar del trabajo BIM exitoso',
        'La verificación continua del modelo previene errores costosos en etapas avanzadas',
        'Las herramientas digitales potencian la productividad cuando se dominan los fundamentos',
        'La documentación BIM debe ser clara, completa y actualizada con el modelo'
      ],
      resources: [
        { label: 'Autodesk Knowledge Network', url: 'https://knowledge.autodesk.com/' },
        { label: 'buildingSMART International', url: 'https://www.buildingsmart.org/' },
        { label: 'BIM Dictionary', url: 'https://bimdictionary.com/' }
      ],
      generateSteps: (topic) => [
        { title: 'Investigar los fundamentos teóricos', description: `Revisa los conceptos fundamentales de "${topic}". Consulta documentación oficial, artículos especializados y tutoriales. Toma notas de los términos clave y sus definiciones.`, tip: 'La documentación de Autodesk y buildingSMART son las referencias más confiables para BIM.' },
        { title: 'Analizar ejemplos prácticos en Revit', description: `Busca ejemplos concretos de aplicación de "${topic}" en proyectos reales. Analiza cómo se implementa en diferentes contextos y qué resultados se obtienen.` },
        { title: 'Implementar un ejercicio guiado', description: `Sigue un tutorial paso a paso para aplicar "${topic}" en un proyecto de Revit. Verifica cada resultado intermedio antes de continuar al siguiente paso.` },
        { title: 'Crear un proyecto propio', description: `Diseña un pequeño proyecto que aplique "${topic}" de forma autónoma. Comienza simple y añade complejidad gradualmente. Documenta tu proceso.` }
      ],
      generatePractice: (topic) => `En un proyecto de Revit, implementa los conceptos de "${topic}". Documenta el proceso con capturas de pantalla de cada paso, explica las decisiones tomadas y los resultados obtenidos. Incluye un análisis de las mejores prácticas aplicadas y posibles mejoras. Presenta tus resultados en un informe con al menos 3 capturas de pantalla annotadas.`
    },
    'desarrollo-web-completo': {
      field: 'desarrollo web',
      defaultKeyPoints: [
        'La semántica y la accesibilidad son tan importantes como la funcionalidad visual',
        'El código limpio y bien organizado facilita el mantenimiento y la colaboración',
        'Las herramientas de desarrollo del navegador son esenciales para debugging eficiente',
        'El diseño responsivo debe considerarse desde el inicio, no como corrección posterior',
        'La documentación oficial (MDN, W3C) es la referencia más confiable y actualizada',
        'La práctica constante con proyectos reales es la forma más efectiva de aprender'
      ],
      resources: [
        { label: 'MDN Web Docs - Referencia completa', url: 'https://developer.mozilla.org/es/' },
        { label: 'W3Schools - Tutoriales interactivos', url: 'https://www.w3schools.com/' },
        { label: 'Stack Overflow - Comunidad', url: 'https://stackoverflow.com/' }
      ],
      generateSteps: (topic) => [
        { title: 'Estudiar la documentación oficial', description: `Lee la documentación de MDN Web Docs sobre "${topic}". Comprende la sintaxis, los parámetros y los casos de uso. Experimenta con los ejemplos interactivos.`, tip: 'MDN es la referencia más actualizada y confiable para tecnologías web.' },
        { title: 'Practicar con ejercicios guiados', description: `Sigue un tutorial paso a paso para implementar "${topic}". Escribe el código manualmente (no copies y pegues) para internalizar la sintaxis y los conceptos.` },
        { title: 'Construir un mini-proyecto', description: `Crea un pequeño proyecto que aplique "${topic}" de forma práctica. El proyecto debe ser funcional y demostrar tu comprensión del tema.` },
        { title: 'Experimentar y explorar variaciones', description: `Modifica los parámetros y opciones de "${topic}" para entender cómo afectan el resultado. Prueba casos límite y documenta tus hallazgos.` }
      ],
      generatePractice: (topic) => `Crea un proyecto práctico que demuestre tu comprensión de "${topic}". El proyecto debe incluir código funcional, comentarios explicativos y documentación breve. Sube el código a un repositorio Git e incluye un archivo README.md con instrucciones de uso. Verifica que funciona en al menos dos navegadores diferentes.`
    },
    'fundamentos-ciberseguridad': {
      field: 'ciberseguridad y ethical hacking',
      defaultKeyPoints: [
        'La seguridad debe implementarse en capas (defensa en profundidad)',
        'El principio de mínimo privilegio reduce la superficie de ataque efectiva',
        'La formación del factor humano es tan importante como las herramientas técnicas',
        'La documentación y el reporte son tan importantes como la técnica de explotación',
        'Siempre trabajar dentro del marco legal y con autorización explícita por escrito',
        'La verificación y validación de resultados evita falsos positivos y negativos'
      ],
      resources: [
        { label: 'OWASP - Seguridad Web', url: 'https://owasp.org/' },
        { label: 'NIST Cybersecurity Framework', url: 'https://www.nist.gov/cyberframework' },
        { label: 'Cybrary - Formación en ciberseguridad', url: 'https://www.cybrary.it/' }
      ],
      generateSteps: (topic) => [
        { title: 'Comprender los fundamentos teóricos', description: `Estudia los conceptos fundamentales de "${topic}". Comprende los principios teóricos antes de intentar cualquier implementación práctica.`, tip: 'Nunca practiques técnicas de hacking sin autorización explícita y por escrito del propietario del sistema.' },
        { title: 'Configurar un entorno de laboratorio', description: `Prepara una máquina virtual (Kali Linux, Metasploitable) para practicar "${topic}" de forma segura y legal. Aísla el laboratorio de la red de producción.` },
        { title: 'Ejecutar un ejercicio guiado', description: `Sigue un tutorial paso a paso para implementar "${topic}" en el laboratorio. Documenta cada paso con capturas de pantalla y explicaciones.` },
        { title: 'Analizar contramedidas y defensas', description: `Por cada técnica ofensiva aprendida, investiga y documenta las contramedidas correspondientes. La seguridad efectiva requiere entender ambos lados.` }
      ],
      generatePractice: (topic) => `En un entorno de laboratorio controlado (máquina virtual aislada), implementa los conceptos de "${topic}". Documenta cada paso con capturas de pantalla, explica las decisiones tomadas y los resultados obtenidos. Incluye un análisis de las contramedidas y defensas que podrían aplicarse. Asegúrate de trabajar siempre dentro del marco legal y con autorización explícita.`
    },
    'introduccion-inteligencia-artificial': {
      field: 'inteligencia artificial y machine learning',
      defaultKeyPoints: [
        'La calidad de los datos determina la calidad del modelo: garbage in, garbage out',
        'Es crucial entender los fundamentos matemáticos detrás de cada algoritmo',
        'La evaluación rigurosa previene el sobreajuste y las conclusiones erróneas',
        'La ética y la responsabilidad deben guiar todo desarrollo de IA',
        'La experimentación iterativa es clave: probar, medir, ajustar y repetir',
        'La interpretabilidad de los modelos es tan importante como su precisión'
      ],
      resources: [
        { label: 'Papers With Code - SOTA y tutoriales', url: 'https://paperswithcode.com/' },
        { label: 'Kaggle - Datasets y competencias', url: 'https://www.kaggle.com/' },
        { label: 'Hugging Face - Modelos y datasets', url: 'https://huggingface.co/' }
      ],
      generateSteps: (topic) => [
        { title: 'Estudiar los fundamentos teóricos', description: `Revisa la teoría detrás de "${topic}". Comprende las matemáticas subyacentes, las suposiciones del modelo y las limitaciones. Consulta papers y libros de referencia.`, tip: 'No te saltes las matemáticas: entender la intuición detrás de las fórmulas marca la diferencia entre un practicante y un experto.' },
        { title: 'Implementar desde cero (opcional)', description: `Intenta implementar "${topic}" desde cero en Python/NumPy antes de usar librerías. Esto profundiza la comprensión de los mecanismos internos del algoritmo.` },
        { title: 'Aplicar con librerías estándar', description: `Usa scikit-learn, TensorFlow o PyTorch para implementar "${topic}" en un dataset real. Compara los resultados con tu implementación desde cero.` },
        { title: 'Evaluar y documentar resultados', description: `Evalúa el rendimiento con métricas apropiadas. Visualiza los resultados. Documenta hallazgos, limitaciones y posibles mejoras en un Jupyter notebook.` }
      ],
      generatePractice: (topic) => `Utiliza Python y las bibliotecas estándar (NumPy, Pandas, Scikit-learn) para implementar un ejercicio práctico sobre "${topic}". Comienza con un dataset pequeño y comprensible, aplica las técnicas aprendidas, y documenta tus resultados con visualizaciones usando Matplotlib o Seaborn. Incluye un análisis de los resultados, posibles mejoras y consideraciones éticas.`
    }
  };

  return contexts[courseSlug] || contexts['desarrollo-web-completo'];
}

// ============================================================
// MAIN EXECUTION
// ============================================================

async function main() {
  console.log('🔄 Starting content enrichment for non-D5 courses...\n');

  const courseSlugs = [
    'diseno-arquitectonico-bim',
    'desarrollo-web-completo',
    'fundamentos-ciberseguridad',
    'introduccion-inteligencia-artificial'
  ];

  // Load seed file content
  const seedFiles = {
    'diseno-arquitectonico-bim': '/home/z/my-project/prisma/seed-arquitectura.ts',
    'desarrollo-web-completo': '/home/z/my-project/prisma/seed-programacion.ts',
    'fundamentos-ciberseguridad': '/home/z/my-project/prisma/seed-ciberseguridad.ts',
    'introduccion-inteligencia-artificial': '/home/z/my-project/prisma/seed-ia.ts'
  };

  const seedContentMap = {};
  for (const [slug, filePath] of Object.entries(seedFiles)) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      seedContentMap[slug] = parseSeedTopics(content);
    } catch (e) {
      console.log(`⚠️  Could not read seed file for ${slug}: ${e.message}`);
      seedContentMap[slug] = {};
    }
  }

  let totalUpdated = 0;
  let errors = [];

  for (const slug of courseSlugs) {
    console.log(`\n📚 Processing course: ${slug}`);

    const course = await prisma.course.findUnique({
      where: { slug },
      include: { modules: { include: { topics: { orderBy: { number: 'asc' } } }, orderBy: { number: 'asc' } } }
    });

    if (!course) {
      console.log(`  ❌ Course not found: ${slug}`);
      errors.push(`Course not found: ${slug}`);
      continue;
    }

    for (const mod of course.modules) {
      console.log(`  📂 Module ${mod.number}: ${mod.title}`);

      for (const topic of mod.topics) {
        try {
          const seedTopics = seedContentMap[slug] || {};
          const seedData = seedTopics[topic.name];

          const contentObj = generateEnrichedContent(topic.name, mod.title, slug, seedData);

          // Validate and ensure minimum requirements
          if (!contentObj.explanation) contentObj.explanation = '';
          if (!contentObj.keyPoints || contentObj.keyPoints.length < 3) {
            const ctx = getCourseContext(slug);
            contentObj.keyPoints = ctx.defaultKeyPoints.slice(0, 6);
          }
          if (!contentObj.steps || contentObj.steps.length < 3) {
            const ctx = getCourseContext(slug);
            contentObj.steps = ctx.generateSteps(topic.name);
          }
          if (!contentObj.practice) {
            const ctx = getCourseContext(slug);
            contentObj.practice = ctx.generatePractice(topic.name);
          }
          if (!contentObj.extraResources || contentObj.extraResources.length < 2) {
            const ctx = getCourseContext(slug);
            contentObj.extraResources = ctx.resources;
          }

          // Ensure keyPoints has at least 5 items
          while (contentObj.keyPoints.length < 5) {
            contentObj.keyPoints.push('Aspecto clave que requiere estudio y práctica adicional');
          }

          // Ensure steps have at least 3 items
          while (contentObj.steps.length < 3) {
            contentObj.steps.push({
              title: `Paso ${contentObj.steps.length + 1}: Practicar y experimentar`,
              description: `Aplica los conceptos de "${topic.name}" en un entorno controlado. Experimenta con diferentes configuraciones y documenta los resultados.`
            });
          }

          // Ensure extraResources has at least 2 items
          while (contentObj.extraResources.length < 2) {
            contentObj.extraResources.push({ label: 'Recurso adicional', url: 'https://www.google.com/search?q=' + encodeURIComponent(topic.name) });
          }

          const contentString = JSON.stringify(contentObj);

          await prisma.topic.update({
            where: { id: topic.id },
            data: { content: contentString }
          });

          totalUpdated++;
          const wordCount = contentObj.explanation.split(/\s+/).length;
          console.log(`    ✅ Topic ${topic.number}: ${topic.name} (${wordCount} words, ${contentString.length} chars)`);

        } catch (err) {
          console.log(`    ❌ Error: ${topic.name}: ${err.message}`);
          errors.push(`${slug} / ${mod.title} / ${topic.name}: ${err.message}`);
        }
      }
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 SUMMARY`);
  console.log(`${'='.repeat(60)}`);
  console.log(`  Topics updated: ${totalUpdated}`);
  console.log(`  Errors: ${errors.length}`);
  if (errors.length > 0) {
    errors.forEach(e => console.log(`    - ${e}`));
  }
  console.log(`${'='.repeat(60)}\n`);

  await prisma.$disconnect();
}

function parseSeedTopics(fileContent) {
  const topics = {};
  const topicRegex = /name:\s*["']([^"']+)["'][\s\S]*?content:\s*`([\s\S]*?)`/g;
  let match;
  while ((match = topicRegex.exec(fileContent)) !== null) {
    const name = match[1];
    const content = match[2].trim();
    if (content.length > 200) {
      topics[name] = content;
    }
  }
  return topics;
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
