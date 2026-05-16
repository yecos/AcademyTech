import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type TopicSeed = {
  number: number;
  name: string;
  difficulty: string;
  estimatedTime: string;
  content: string;
};

type ModuleSeed = {
  number: number;
  title: string;
  description: string;
  topics: TopicSeed[];
};

type CourseSeed = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  level: string;
  duration: string;
  modules: ModuleSeed[];
};

const arquitecturaCourse: CourseSeed = {
  slug: "diseno-arquitectonico-bim",
  title: "Diseño Arquitectónico con BIM",
  description: "Domina la metodología BIM (Building Information Modeling) desde los fundamentos hasta la práctica profesional. Aprende a crear modelos inteligentes con Revit, coordinar disciplinas, generar documentación constructiva y visualizar proyectos de forma fotorrealista.",
  icon: "🏛️", order: 2, level: "principiante", duration: "45 horas",
  modules: [
    { number: 1, title: "Fundamentos del BIM y Modelado de Información", description: "Comprende qué es BIM, su historia y los estándares internacionales.", topics: [
      { number: 1, name: "¿Qué es BIM? Conceptos y definición", difficulty: "basico", estimatedTime: "25 min", content: "BIM (Building Information Modeling) es una metodología de trabajo colaborativo que transforma la forma en que se diseñan, construyen y gestionan los edificios. A diferencia del CAD, BIM crea un modelo digital inteligente con información detallada sobre cada componente: materiales, costos, propiedades físicas y datos de mantenimiento. Los niveles de madurez BIM (0-3) definen el grado de implementación, y las dimensiones 4D-7D extienden BIM con tiempo, costos, sostenibilidad y gestión de facilidades." },
      { number: 2, name: "Historia y evolución del BIM", difficulty: "basico", estimatedTime: "20 min", content: "Los orígenes se remontan a los años 70 con Charles Eastman. ArchiCAD (1984) fue el primer software BIM. Revit (2000) popularizó el modelado paramétrico. El BIM Mandate del Reino Unido (2011) impulsó la adopción gubernamental. América Latina avanza con estrategias nacionales en Chile, Colombia y México." },
      { number: 3, name: "BIM vs CAD tradicional: ventajas competitivas", difficulty: "basico", estimatedTime: "30 min", content: "En CAD se dibujan líneas sin significado; en BIM cada elemento es inteligente con propiedades. La asociatividad actualiza automáticamente todas las vistas. Las cuantificaciones automáticas eliminan errores manuales. La detección de colisiones evita problemas costosos en obra." },
      { number: 4, name: "Estándares BIM: ISO 19650, COBie y clasificación", difficulty: "intermedio", estimatedTime: "35 min", content: "ISO 19650 gestiona información en proyectos BIM. COBie entrega datos de activos al propietario. Uniclass, OmniClass y MasterFormat organizan la información. La estandarización permite interoperabilidad y colaboración efectiva." },
      { number: 5, name: "Niveles de madurez BIM (Level 0 al Level 3)", difficulty: "intermedio", estimatedTime: "25 min", content: "Level 0: CAD sin colaboración. Level 1: modelos 3D parciales sin compartir. Level 2: colaboración mediante archivos federados (mandato UK). Level 3: modelo único compartido en la nube con integración total." },
    ]},
    { number: 2, title: "Revit: Interfaz y Modelado Básico", description: "Familiarízate con Revit y aprende a crear elementos básicos.", topics: [
      { number: 1, name: "Interfaz de Revit y configuración del proyecto", difficulty: "basico", estimatedTime: "30 min", content: "La cinta de opciones organiza herramientas por pestaña. El navegador del proyecto centraliza vistas y elementos. La barra de propiedades edita parámetros. Antes de modelar: configura unidades, ubicación geográfica y parámetros compartidos." },
      { number: 2, name: "Muros, pisos y techos: modelado básico", difficulty: "basico", estimatedTime: "40 min", content: "Muros con composición multicapa (acabado, aislamiento, estructura). Pisos con capas similares. Techos con pendientes. La asociatividad entre elementos actualiza cambios automáticamente." },
      { number: 3, name: "Puertas, ventanas y componentes", difficulty: "basico", estimatedTime: "35 min", content: "Familias cargable que se insertan en muros anfitriones. Cada instancia hereda propiedades del tipo. Componentes genéricos: mobiliario, equipos, sanitarios. Biblioteca con miles de familias predefinidas." },
      { number: 4, name: "Vistas, plantas, cortes y fachadas", difficulty: "intermedio", estimatedTime: "30 min", content: "Cada vista tiene configuraciones independientes. Plantas por niveles, cortes con líneas de sección, fachadas desde puntos cardinales. Vistas 3D para visualización completa." },
      { number: 5, name: "Anotaciones, cotas y documentación", difficulty: "intermedio", estimatedTime: "35 min", content: "Cotas y etiquetas vinculadas al modelo se actualizan automáticamente. Los planos de construcción organizan vistas con formato de lámina para impresión." },
    ]},
    { number: 3, title: "Modelado Avanzado y Familias", description: "Profundiza en modelado paramétrico y familias personalizadas.", topics: [
      { number: 1, name: "Escaleras, rampas y barandas", difficulty: "intermedio", estimatedTime: "40 min", content: "Escaleras: fórmula de Blondel, componentes paramétricos. Rampas con pendiente máxima 8.33% para accesibilidad. Barandas con riel, balaustres y relleno parametrizables." },
      { number: 2, name: "Cubiertas complejas y claraboyas", difficulty: "avanzado", estimatedTime: "45 min", content: "Múltiples pendientes, limatesas y limahoyas. Claraboyas como familias anidadas. Cubiertas por forma para geometrías libres." },
      { number: 3, name: "Creación de familias paramétricas", difficulty: "avanzado", estimatedTime: "50 min", content: "Editor de Familias: planos de referencia, geometría, parámetros. Tipos: modelo, anotación, detalle. Parámetros compartidos para flujo de información entre familias." },
      { number: 4, name: "Familias anidadas y compartidas", difficulty: "avanzado", estimatedTime: "40 min", content: "Jerarquía de componentes. Asociación de parámetros entre niveles. Familias compartidas mantienen identidad independiente en el proyecto." },
    ]},
    { number: 4, title: "Coordinación Multidisciplinaria", description: "Integra modelos de arquitectura, estructura y MEP.", topics: [
      { number: 1, name: "Vínculos de modelos y gestión de referencias", difficulty: "intermedio", estimatedTime: "35 min", content: "Vinculación con coordenadas compartidas. Copy/monitor para detectar cambios. Gestión de fases para remodelaciones." },
      { number: 2, name: "Detección de colisiones (Clash Detection)", difficulty: "intermedio", estimatedTime: "40 min", content: "Navisworks para detección de colisiones. Hard clashes vs soft clashes. Proceso iterativo con reportes asignados a responsables." },
      { number: 3, name: "Formato IFC e interoperabilidad", difficulty: "intermedio", estimatedTime: "30 min", content: "IFC: formato abierto para intercambio BIM. Mapeo de categorías. MVDs para propósitos específicos." },
      { number: 4, name: "Entregables BIM y Modelos por Fase", difficulty: "avanzado", estimatedTime: "35 min", content: "EIR y BEP definen entregables. LOD 100-500 define nivel de detalle. Modelos: diseño, coordinación, constructivo, as-built." },
    ]},
    { number: 5, title: "Visualización y Presentación de Proyectos BIM", description: "Transforma modelos en visualizaciones y documentación profesional.", topics: [
      { number: 1, name: "Renders fotorrealistas desde Revit", difficulty: "intermedio", estimatedTime: "35 min", content: "Motor integrado para renders preliminares. Materiales PBR para calidad. Enscape, Twinmotion y Lumion para renders en tiempo real." },
      { number: 2, name: "Recorridos virtuales y vistas 360°", difficulty: "intermedio", estimatedTime: "30 min", content: "Enscape: recorrido en tiempo real desde Revit. Vistas 360° para interiores. VR con Meta Quest/HTC Vive." },
      { number: 3, name: "Planillas, cuantificaciones y presupuestos", difficulty: "avanzado", estimatedTime: "40 min", content: "Planillas dinámicas que se actualizan con el modelo. Cuantificaciones más precisas que las manuales. Exportación a Excel para estimación de costos." },
      { number: 4, name: "Exportación y publicación de modelos", difficulty: "intermedio", estimatedTime: "30 min", content: "IFC, DWG, FBX, NWC. ACC/BIM 360 para colaboración en la nube. Autodesk Viewer para exploración 3D en navegador." },
    ]},
    { number: 6, title: "BIM Avanzado y Tendencias Futuras", description: "Dimensiones avanzadas del BIM y tecnologías emergentes.", topics: [
      { number: 1, name: "BIM 4D: Planificación y secuencia constructiva", difficulty: "avanzado", estimatedTime: "40 min", content: "Dimensión temporal vinculada al cronograma. Simulación de secuencia constructiva. Navisworks y Synchro Pro." },
      { number: 2, name: "BIM 5D: Costos y presupuestos integrados", difficulty: "avanzado", estimatedTime: "35 min", content: "Cuantificaciones automáticas alimentan presupuestos. Análisis de variaciones entre versiones. CostX y iTWO para estimación 5D." },
      { number: 3, name: "BIM 6D y 7D: Sostenibilidad y gestión de facilidades", difficulty: "avanzado", estimatedTime: "35 min", content: "6D: análisis energético y sostenibilidad. 7D: gestión de facilidades con modelo as-built. Integración con CMMS." },
      { number: 4, name: "El futuro: Digital Twins, IA y construcción automatizada", difficulty: "avanzado", estimatedTime: "30 min", content: "Gemelos digitales con datos IoT en tiempo real. IA generativa para diseño. Fabricación digital con CNC e impresión 3D." },
    ]},
  ],
};

const programacionCourse: CourseSeed = {
  slug: "desarrollo-web-completo",
  title: "Desarrollo Web Completo: HTML, CSS y JavaScript",
  description: "Aprende a crear sitios web profesionales desde cero. Domina HTML5, CSS3 moderno y JavaScript ES6+.",
  icon: "💻", order: 1, level: "principiante", duration: "50 horas",
  modules: [
    { number: 1, title: "Fundamentos de HTML5", description: "Estructura base de toda página web.", topics: [
      { number: 1, name: "Introducción al desarrollo web", difficulty: "basico", estimatedTime: "25 min", content: "Modelo cliente-servidor. Tres pilares: HTML (estructura), CSS (presentación), JavaScript (interactividad). El ecosistema moderno se construye sobre estas bases." },
      { number: 2, name: "Estructura básica de un documento HTML", difficulty: "basico", estimatedTime: "30 min", content: "DOCTYPE, html con lang, head con charset/viewport/title, body con contenido. El viewport meta es crucial para diseño responsivo." },
      { number: 3, name: "Etiquetas semánticas de HTML5", difficulty: "basico", estimatedTime: "35 min", content: "header, nav, main, section, article, aside, footer. Benefician accesibilidad, SEO y mantenibilidad." },
      { number: 4, name: "Formularios y validación HTML5", difficulty: "intermedio", estimatedTime: "40 min", content: "20+ tipos de input. Atributos: required, minlength, pattern. API de Validación de Restricciones para personalización." },
      { number: 5, name: "Multimedia: imágenes, audio y video", difficulty: "basico", estimatedTime: "25 min", content: "picture para imágenes responsivas. video y audio nativos. Canvas y SVG para gráficos." },
    ]},
    { number: 2, title: "CSS3: Estilización y Layout Moderno", description: "Flexbox, Grid, variables y diseño responsivo.", topics: [
      { number: 1, name: "Selectores, cascada y especificidad", difficulty: "basico", estimatedTime: "35 min", content: "Especificidad: inline > IDs > clases > elementos. Comprender esto evita guerras de especificidad y uso excesivo de !important." },
      { number: 2, name: "Flexbox: layout unidimensional", difficulty: "intermedio", estimatedTime: "45 min", content: "justify-content y align-items para alineación. flex-grow/shrink/basis para comportamiento individual. Centrado perfecto con 3 propiedades." },
      { number: 3, name: "CSS Grid: layout bidimensional", difficulty: "intermedio", estimatedTime: "45 min", content: "Filas y columnas simultáneas. repeat(), fr, minmax(). Áreas con nombre. auto-fill para layouts responsivos sin media queries." },
      { number: 4, name: "Diseño responsivo y Mobile First", difficulty: "intermedio", estimatedTime: "40 min", content: "Mobile First con min-width. Unidades relativas: rem, em, vw, vh. clamp() para tipografía fluida." },
      { number: 5, name: "Variables CSS y arquitectura de estilos", difficulty: "avanzado", estimatedTime: "35 min", content: "Variables CSS (--nombre) para theming. BEM, CSS Modules, utility-first (Tailwind)." },
    ]},
    { number: 3, title: "JavaScript ES6+ Esencial", description: "Variables, funciones, arrays, asincronía y DOM.", topics: [
      { number: 1, name: "Variables, tipos y operadores modernos", difficulty: "basico", estimatedTime: "35 min", content: "let/const con ámbito de bloque. Spread, desestructuración, optional chaining (?.), nullish coalescing (??)." },
      { number: 2, name: "Funciones: arrow functions, closures y callbacks", difficulty: "intermedio", estimatedTime: "45 min", content: "Arrow functions heredan this. Closures para estado privado. Callbacks como mecanismo de asincronía." },
      { number: 3, name: "Arrays y objetos: métodos esenciales", difficulty: "intermedio", estimatedTime: "40 min", content: "map, filter, reduce para programación funcional. find, some, every, flatMap. Object.keys/values/entries." },
      { number: 4, name: "Asincronía: Promesas y async/await", difficulty: "avanzado", estimatedTime: "45 min", content: "Promises para operaciones asíncronas. Promise.all para paralelismo. async/await para código legible. try/catch para errores." },
      { number: 5, name: "Manipulación del DOM y Eventos", difficulty: "intermedio", estimatedTime: "40 min", content: "querySelector para selección. classList para clases. addEventListener para eventos. Delegación de eventos para optimización." },
    ]},
    { number: 4, title: "APIs Web y Fetch", description: "Consumo de APIs REST y comunicación con servidores.", topics: [
      { number: 1, name: "Protocolo HTTP y métodos de petición", difficulty: "intermedio", estimatedTime: "35 min", content: "GET, POST, PUT, PATCH, DELETE. Códigos de estado. Cabeceras. CORS. Fetch API para peticiones HTTP." },
      { number: 2, name: "Consumo de APIs REST con Fetch", difficulty: "intermedio", estimatedTime: "40 min", content: "GET para obtener, POST para enviar. Verificar response.ok. JSON.stringify para body. FormData para uploads." },
      { number: 3, name: "LocalStorage, SessionStorage y Cookies", difficulty: "intermedio", estimatedTime: "30 min", content: "localStorage: persiste sin expiración. sessionStorage: se elimina al cerrar. Cookies: se envían al servidor, flags HttpOnly/Secure/SameSite." },
      { number: 4, name: "Web APIs avanzadas: Geolocation, IntersectionObserver y más", difficulty: "avanzado", estimatedTime: "40 min", content: "Geolocation para ubicación. IntersectionObserver para lazy loading y scroll reveal. Web Audio, Canvas, Notification, Service Worker, Clipboard." },
    ]},
    { number: 5, title: "Herramientas y Ecosistema Moderno", description: "Git, npm, React y despliegue.", topics: [
      { number: 1, name: "Git y control de versiones", difficulty: "basico", estimatedTime: "35 min", content: "add/commit/push. Ramas para desarrollo paralelo. Merge conflicts: resolución manual." },
      { number: 2, name: "npm, bundlers y el ecosistema de paquetes", difficulty: "intermedio", estimatedTime: "30 min", content: "npm gestiona dependencias. Vite: HMR instantáneo. Flujo: create → dev → build." },
      { number: 3, name: "Introducción a React y componentes", difficulty: "intermedio", estimatedTime: "45 min", content: "Componentes con props. useState para estado. useEffect para efectos. Renderizado condicional y listas con map." },
      { number: 4, name: "Despliegue y alojamiento web", difficulty: "intermedio", estimatedTime: "30 min", content: "Vercel despliega desde Git. Netlify como alternativa. Dominios personalizados y variables de entorno." },
    ]},
    { number: 6, title: "Proyecto Final: Portfolio Web Profesional", description: "Aplica todo construyendo un portfolio completo.", topics: [
      { number: 1, name: "Planificación y wireframing", difficulty: "intermedio", estimatedTime: "35 min", content: "Secciones: Hero, Sobre mí, Habilidades, Proyectos, Contacto. Wireframing define layout. Paleta limitada y tipografía legible." },
      { number: 2, name: "Desarrollo HTML y estructura semántica", difficulty: "intermedio", estimatedTime: "40 min", content: "Etiquetas semánticas por sección. Hero impactante. Tarjetas de proyectos en grid. Formulario con validación HTML5." },
      { number: 3, name: "Estilización CSS avanzada y animaciones", difficulty: "avanzado", estimatedTime: "45 min", content: "Transiciones para hover. @keyframes para animaciones. Scroll reveal con IntersectionObserver. prefers-reduced-motion." },
      { number: 4, name: "JavaScript interactivo y despliegue final", difficulty: "avanzado", estimatedTime: "40 min", content: "Menú hamburguesa. Filtrado de proyectos. Scroll suave. Deploy en Vercel. Verificar Lighthouse." },
    ]},
  ],
};

const ciberseguridadCourse: CourseSeed = {
  slug: "fundamentos-ciberseguridad",
  title: "Fundamentos de Ciberseguridad y Ethical Hacking",
  description: "Aprende cómo los atacantes explotan vulnerabilidades, cómo proteger sistemas y cómo realizar auditorías de seguridad éticas.",
  icon: "🔒", order: 1, level: "principiante", duration: "55 horas",
  modules: [
    { number: 1, title: "Introducción a la Ciberseguridad", description: "Panorama de amenazas y principios fundamentales.", topics: [
      { number: 1, name: "Panorama actual de amenazas cibernéticas", difficulty: "basico", estimatedTime: "30 min", content: "Costo global: 10.5 billones USD/año. Vectores: phishing, ransomware, fuerza bruta. Actores: crimen organizado, APTs, insiders. Tendencias: supply chain, IA ofensiva, zero-days." },
      { number: 2, name: "La tríada CIA y principios de seguridad", difficulty: "basico", estimatedTime: "25 min", content: "Confidencialidad, Integridad, Disponibilidad. Cada control protege uno o más pilares. Las violaciones de cada pilar tienen consecuencias específicas." },
      { number: 3, name: "Tipos de malware y vectores de ataque", difficulty: "basico", estimatedTime: "35 min", content: "Virus, gusanos, troyanos, ransomware (WannaCry), spyware, rootkits, botnets, cryptominers. Vectores: phishing, drive-by, supply chain, USB, ingeniería social." },
      { number: 4, name: "Marco legal y ética en ciberseguridad", difficulty: "intermedio", estimatedTime: "30 min", content: "RGPD, LGPD, leyes locales. Multas de millones. Hacking ético: autorización, no daño, reporte responsable. CEH y OSCP requieren código de ética." },
      { number: 5, name: "Gestión de riesgos y modelo de amenazas", difficulty: "intermedio", estimatedTime: "35 min", content: "Identificar, evaluar, tratar, monitorear. STRIDE: Spoofing, Tampering, Repudiation, Info Disclosure, DoS, EoP. NIST CSF: Identify, Protect, Detect, Respond, Recover." },
    ]},
    { number: 2, title: "Seguridad de Redes", description: "Protocolos, protección y auditoría de redes.", topics: [
      { number: 1, name: "Modelo OSI y protocolos TCP/IP", difficulty: "basico", estimatedTime: "35 min", content: "7 capas, cada una con vulnerabilidades. ARP spoofing (L2), IP spoofing (L3), SYN flood (L4), XSS/SQLi (L7)." },
      { number: 2, name: "Firewalls, IDS/IPS y segmentación de red", difficulty: "intermedio", estimatedTime: "40 min", content: "Firewalls: filtrado de paquetes, stateful, NGFW. IDS detecta, IPS previene. DMZ, VLANs, microsegmentación, zero-trust." },
      { number: 3, name: "VPN, cifrado y túneles seguros", difficulty: "intermedio", estimatedTime: "35 min", content: "IPsec, OpenVPN, WireGuard. TLS 1.3 para web. Let's Encrypt. E2EE más allá de TLS." },
      { number: 4, name: "Reconocimiento de red y footprinting", difficulty: "intermedio", estimatedTime: "40 min", content: "Pasivo: WHOIS, DNS, Google dorking, Shodan. Activo: Nmap para puertos y servicios. Footprinting mapea infraestructura completa." },
    ]},
    { number: 3, title: "Hacking Ético y Pentesting", description: "Metodologías y técnicas de pentesting.", topics: [
      { number: 1, name: "Metodología de pentesting: PTES y OWASP", difficulty: "intermedio", estimatedTime: "35 min", content: "PTES: 7 fases desde pre-engagement hasta reporting. OWASP Top 10: los 10 riesgos web más críticos. Alcance y autorización son fundamentales." },
      { number: 2, name: "Explotación de vulnerabilidades web: XSS, SQLi y más", difficulty: "avanzado", estimatedTime: "50 min", content: "SQLi: inyección de SQL en consultas. XSS: scripts en páginas. Prevención: consultas parametrizadas, escapado, CSP, frameworks modernos." },
      { number: 3, name: "Escalada de privilegios y post-explotación", difficulty: "avanzado", estimatedTime: "45 min", content: "Linux: SUID, sudo, cron, credenciales, kernel exploits. Windows: Mimikatz, servicios débiles, tokens. Post-explotación: pivoting, exfiltración, persistencia." },
      { number: 4, name: "Herramientas esenciales: Nmap, Metasploit y Burp Suite", difficulty: "intermedio", estimatedTime: "45 min", content: "Nmap: escaneo de redes. Metasploit: explotación con miles de módulos. Burp Suite: proxy para pruebas web." },
    ]},
    { number: 4, title: "Criptografía y Protección de Datos", description: "Fundamentos criptográficos y protección de datos.", topics: [
      { number: 1, name: "Criptografía simétrica y asimétrica", difficulty: "intermedio", estimatedTime: "40 min", content: "Simétrica: AES, ChaCha20 (rápida, problema de distribución de claves). Asimétrica: RSA, ECC (resuelve distribución, más lenta). Esquema híbrido como TLS." },
      { number: 2, name: "Hashing, firmas digitales y certificados", difficulty: "intermedio", estimatedTime: "35 min", content: "SHA-256, bcrypt para contraseñas. Firmas: hash + clave privada. Certificados X.509: clave pública + identidad + firma CA." },
      { number: 3, name: "Protección de datos en reposo y en tránsito", difficulty: "avanzado", estimatedTime: "40 min", content: "En reposo: FDE, TDE, cifrado de columna. Gestión de claves con HSM/KMS. En tránsito: TLS 1.3, HSTS, PFS." },
      { number: 4, name: "Gestión de identidades y acceso (IAM)", difficulty: "intermedio", estimatedTime: "35 min", content: "MFA: múltiples factores. RBAC/ABAC para autorización. SSO con SAML/OAuth2/OIDC. Mínimo privilegio." },
    ]},
    { number: 5, title: "Seguridad en la Nube y DevSecOps", description: "Seguridad cloud y CI/CD seguro.", topics: [
      { number: 1, name: "Seguridad en AWS, Azure y GCP", difficulty: "avanzado", estimatedTime: "45 min", content: "Responsabilidad compartida. AWS: IAM, VPC, KMS, CloudTrail. Configuraciones incorrectas comunes. IaC con Terraform." },
      { number: 2, name: "DevSecOps: seguridad integrada en el CI/CD", difficulty: "avanzado", estimatedTime: "40 min", content: "Shift left. SAST para código, SCA para dependencias, DAST para runtime. Vulnerabilidades críticas bloquean deploy." },
      { number: 3, name: "Contenedores, Kubernetes y seguridad de supply chain", difficulty: "avanzado", estimatedTime: "40 min", content: "Imágenes minimalistas, escaneo, non-root. K8s: RBAC, Network Policies. Supply chain: cosign, SBOM, SLSA." },
      { number: 4, name: "Respuesta a incidentes y forense digital", difficulty: "avanzado", estimatedTime: "40 min", content: "Ciclo NIST: preparación → detección → contención → recuperación → lecciones. Forense: preservar evidencia, cadena de custodia." },
    ]},
    { number: 6, title: "Carreras y Certificaciones en Ciberseguridad", description: "Certificaciones, roles y carrera profesional.", topics: [
      { number: 1, name: "Certificaciones: CompTIA Security+, CEH, OSCP y más", difficulty: "basico", estimatedTime: "30 min", content: "Security+ (entry), CEH (ethical hacking), OSCP (práctico). CISSP y CISM para gestión. Cloud: AWS/Azure/GCP security specialties." },
      { number: 2, name: "Roles y trayectorias profesionales", difficulty: "basico", estimatedTime: "25 min", content: "Técnicos: Analyst, Pentester, Engineer, Responder. Gestión: CISO, Manager, GRC. Escasez de 3.5M profesionales globalmente." },
      { number: 3, name: "Laboratorios prácticos y CTFs", difficulty: "intermedio", estimatedTime: "30 min", content: "HackTheBox, TryHackMe. CTFs: DEF CON, PicoCTF. Home labs: VirtualBox, Docker, DVWA, Juice Shop." },
      { number: 4, name: "Construyendo tu marca profesional en seguridad", difficulty: "basico", estimatedTime: "25 min", content: "Portafolio: write-ups, GitHub, bug bounty. Comunidad: conferencias, publicaciones. HackerOne y Bugcrowd para bounties." },
    ]},
  ],
};

const iaCourse: CourseSeed = {
  slug: "introduccion-inteligencia-artificial",
  title: "Inteligencia Artificial: De los Fundamentos a la Práctica",
  description: "Desde conceptos de machine learning hasta deep learning y modelos generativos. Construye modelos y aplica IA en proyectos reales.",
  icon: "🤖", order: 1, level: "principiante", duration: "60 horas",
  modules: [
    { number: 1, title: "Fundamentos de la Inteligencia Artificial", description: "Qué es IA, historia y aplicaciones.", topics: [
      { number: 1, name: "¿Qué es la Inteligencia Artificial?", difficulty: "basico", estimatedTime: "30 min", content: "IA estrecha vs general. Ramas: ML, Deep Learning, NLP, Visión, Robótica. Transformando salud, finanzas, transporte, educación, creatividad." },
      { number: 2, name: "Historia y evolución de la IA", difficulty: "basico", estimatedTime: "25 min", content: "Dartmouth 1956. Inviernos de la IA (70s, 80s). Resurgimiento: datos + GPUs + algoritmos. AlexNet 2012, AlphaGo 2016, ChatGPT 2022." },
      { number: 3, name: "Tipos de aprendizaje: supervisado, no supervisado y reforzado", difficulty: "basico", estimatedTime: "35 min", content: "Supervisado: etiquetas (clasificación, regresión). No supervisado: sin etiquetas (clustering, PCA). Refuerzo: agente+entorno+recompensa (Q-Learning, PPO)." },
      { number: 4, name: "Python para IA: NumPy, Pandas y Matplotlib", difficulty: "basico", estimatedTime: "40 min", content: "NumPy: arrays vectorizados. Pandas: DataFrames tabulares. Matplotlib/Seaborn: visualización. Base del ecosistema IA." },
      { number: 5, name: "Ética en IA: sesgos, privacidad y responsabilidad", difficulty: "intermedio", estimatedTime: "30 min", content: "Sesgo algorítmico en datos históricos. Privacidad: differential privacy, federated learning. AI Act UE. Explicabilidad con SHAP/LIME." },
    ]},
    { number: 2, title: "Machine Learning Práctico", description: "Implementa algoritmos de ML paso a paso.", topics: [
      { number: 1, name: "Preparación y limpieza de datos", difficulty: "intermedio", estimatedTime: "40 min", content: "80% del tiempo en preparación. Valores faltantes, codificación (one-hot, target), escalado (Standard, MinMax, Robust). Visualización para diagnóstico." },
      { number: 2, name: "Regresión lineal y logística", difficulty: "intermedio", estimatedTime: "35 min", content: "Lineal: y=wx+b, MSE, gradiente descendiente. Logística: sigmoide, cross-entropy. Métricas: R2, MAE, accuracy, precision, recall, F1, AUC-ROC." },
      { number: 3, name: "Árboles de decisión y Random Forest", difficulty: "intermedio", estimatedTime: "35 min", content: "División recursiva por Gini/entropía. Overfitting en árboles profundos. Random Forest: bagging + feature randomness = menor varianza." },
      { number: 4, name: "Validación cruzada y ajuste de hiperparámetros", difficulty: "avanzado", estimatedTime: "35 min", content: "K-fold CV para evaluación robusta. Grid/Random/Bayesian search. Overfitting vs underfitting. Learning curves para diagnóstico." },
    ]},
    { number: 3, title: "Deep Learning y Redes Neuronales", description: "De la neurona artificial a arquitecturas modernas.", topics: [
      { number: 1, name: "La neurona artificial y el perceptrón", difficulty: "intermedio", estimatedTime: "35 min", content: "Suma ponderada + activación. ReLU más usada. Backpropagation con regla de la cadena. Adam: momentum + learning rates adaptativas." },
      { number: 2, name: "Redes neuronales convolucionales (CNN)", difficulty: "avanzado", estimatedTime: "45 min", content: "Convolución detecta patrones locales. Pooling reduce dimensionalidad. Evolución: AlexNet → VGG → ResNet → EfficientNet. Aplicaciones: clasificación, detección, segmentación." },
      { number: 3, name: "Redes recurrentes y secuencias (RNN, LSTM, GRU)", difficulty: "avanzado", estimatedTime: "45 min", content: "RNN: memoria con hidden state. Vanishing gradient. LSTM: puertas de olvido/entrada/salida. GRU: simplificación eficiente. Transformers han reemplazado RNN en NLP." },
      { number: 4, name: "Transformers y la revolución de la atención", difficulty: "avanzado", estimatedTime: "45 min", content: "Self-attention: Q/K/V, cada token atiende a todos. Multi-head: múltiples aspectos. Positional encoding. Base de GPT, BERT, todos los LLMs." },
    ]},
    { number: 4, title: "IA Generativa y Modelos de Lenguaje", description: "LLMs, prompt engineering y aplicaciones generativas.", topics: [
      { number: 1, name: "Modelos de lenguaje grandes (LLMs)", difficulty: "intermedio", estimatedTime: "40 min", content: "GPT, Llama, Claude, Gemini. Pre-entrenamiento + fine-tuning + RLHF. Capacidades emergentes: in-context learning, chain-of-thought, few-shot." },
      { number: 2, name: "Prompt Engineering e ingeniería de instrucciones", difficulty: "basico", estimatedTime: "35 min", content: "Claridad, contexto, ejemplos, restricciones. Chain-of-Thought, ReAct. Estructura: rol → contexto → tarea → formato → ejemplos." },
      { number: 3, name: "Generación de imágenes con IA", difficulty: "intermedio", estimatedTime: "35 min", content: "Modelos de difusión: ruido → denoificar. Stable Diffusion open-source. ControlNet, LoRA para control preciso. Consideraciones éticas." },
      { number: 4, name: "RAG y aplicaciones empresariales de LLMs", difficulty: "avanzado", estimatedTime: "40 min", content: "RAG: chunks → embeddings → vector DB → contexto. Re-ranking, hybrid search, query decomposition. Aplicaciones: soporte, búsqueda, legal." },
    ]},
    { number: 5, title: "Visión por Computadora y Aplicaciones Especializadas", description: "IA visual y aplicaciones por industria.", topics: [
      { number: 1, name: "Detección y clasificación de objetos", difficulty: "intermedio", estimatedTime: "40 min", content: "YOLO: detección en tiempo real. Transfer learning con modelos pre-entrenados. Métricas: mAP, IoU. Augmentación de datos." },
      { number: 2, name: "Procesamiento de Lenguaje Natural (NLP)", difficulty: "avanzado", estimatedTime: "40 min", content: "Evolución: Word2Vec → BERT → GPT. Tareas: NER, sentiment, traducción, QA. LLMs absorbieron tareas NLP especializadas." },
      { number: 3, name: "Sistemas de recomendación con IA", difficulty: "intermedio", estimatedTime: "35 min", content: "Colaborativo, contenido, híbrido. Matrix factorization. Deep learning: autoencoders, attention. LLMs generan explicaciones." },
      { number: 4, name: "IA en la nube: AWS, Azure y GCP AI Services", difficulty: "avanzado", estimatedTime: "35 min", content: "AWS: SageMaker, Bedrock. Azure: OpenAI Service, ML. GCP: Vertex AI. APIs pre-entrenados para visión, NLP, speech." },
    ]},
    { number: 6, title: "Proyecto Final y Carrera en IA", description: "Pipeline ML completo y carrera profesional.", topics: [
      { number: 1, name: "Pipeline completo de un proyecto de ML", difficulty: "avanzado", estimatedTime: "40 min", content: "Definición → datos → modelado → evaluación → despliegue. Framing correcto es la fase más importante. Feature engineering donde el dominio marca la diferencia." },
      { number: 2, name: "MLOps: operacionalización de modelos de IA", difficulty: "avanzado", estimatedTime: "35 min", content: "Versionado con DVC/MLflow. Pipelines con Kubeflow/Airflow. CI/CD para ML. Monitoreo: data drift, concept drift. Shadow y canary deployments." },
      { number: 3, name: "Certificaciones y trayectorias en IA", difficulty: "basico", estimatedTime: "25 min", content: "Roles: ML Engineer, Data Scientist, Researcher. Certificaciones: AWS ML, Google ML Engineer, TensorFlow. Portafolio > certificaciones." },
      { number: 4, name: "El futuro de la IA: AGI, IA multimodal y más allá", difficulty: "avanzado", estimatedTime: "30 min", content: "Multimodal: texto+imagen+audio+video. Agentes autónomos: LangChain, AutoGPT. AGI: ¿cuándo? AI Safety: alineamiento, interpretabilidad." },
    ]},
  ],
};

const coursesMap: Record<string, { course: CourseSeed; categorySlug: string }> = {
  arquitectura: { course: arquitecturaCourse, categorySlug: "arquitectura" },
  programacion: { course: programacionCourse, categorySlug: "programacion" },
  ciberseguridad: { course: ciberseguridadCourse, categorySlug: "ciberseguridad" },
  ia: { course: iaCourse, categorySlug: "inteligencia-artificial" },
};

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Solo administradores pueden ejecutar seeds" },
        { status: 403 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { category } = body as { category?: string };

    const toSeed = category
      ? { [category]: coursesMap[category] }
      : coursesMap;

    if (!toSeed || Object.keys(toSeed).length === 0) {
      return NextResponse.json(
        { error: "Categoría no encontrada. Usa: arquitectura, programacion, ciberseguridad, ia" },
        { status: 400 }
      );
    }

    const results: Record<string, { modules: number; topics: number; course: string }> = {};

    for (const [key, { course: courseData, categorySlug }] of Object.entries(toSeed)) {
      const category = await prisma.category.findUnique({
        where: { slug: categorySlug },
      });

      if (!category) {
        results[key] = { modules: 0, topics: 0, course: "category not found" };
        continue;
      }

      const course = await prisma.course.upsert({
        where: { slug: courseData.slug },
        update: {
          title: courseData.title, description: courseData.description,
          icon: courseData.icon, order: courseData.order,
          level: courseData.level, duration: courseData.duration,
          status: "published", published: true, categoryId: category.id,
        },
        create: {
          slug: courseData.slug, title: courseData.title,
          description: courseData.description, icon: courseData.icon,
          order: courseData.order, level: courseData.level,
          duration: courseData.duration, status: "published",
          published: true, categoryId: category.id,
        },
      });

      let moduleCount = 0;
      let topicCount = 0;

      for (const mod of courseData.modules) {
        const dbModule = await prisma.module.upsert({
          where: { courseId_number: { courseId: course.id, number: mod.number } },
          update: { title: mod.title, description: mod.description },
          create: { number: mod.number, title: mod.title, description: mod.description, courseId: course.id },
        });
        moduleCount++;

        for (const topic of mod.topics) {
          await prisma.topic.upsert({
            where: { moduleId_number: { moduleId: dbModule.id, number: topic.number } },
            update: { name: topic.name, difficulty: topic.difficulty, estimatedTime: topic.estimatedTime, content: topic.content },
            create: { name: topic.name, number: topic.number, difficulty: topic.difficulty, estimatedTime: topic.estimatedTime, content: topic.content, moduleId: dbModule.id },
          });
          topicCount++;
        }
      }

      results[key] = { modules: moduleCount, topics: topicCount, course: courseData.title };
    }

    return NextResponse.json({ message: "Cursos sembrados exitosamente", results });
  } catch (error) {
    console.error("Seed courses error:", error);
    return NextResponse.json({ error: "Error al sembrar cursos" }, { status: 500 });
  }
}
