import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ─── Curso: Fundamentos de Ciberseguridad ────────────────────────
const courseData = {
  slug: "fundamentos-ciberseguridad",
  title: "Fundamentos de Ciberseguridad y Ethical Hacking",
  description:
    "Adéntrate en el mundo de la seguridad informática. Aprende cómo los atacantes explotan vulnerabilidades, cómo proteger sistemas y redes, y cómo realizar auditorías de seguridad éticas. Este curso cubre desde los principios fundamentales hasta técnicas prácticas de pentesting, preparándote para certificaciones como CompTIA Security+ y CEH.",
  image: "/images/modules/modulo-1.png",
  icon: "🔒",
  order: 1,
  published: true,
  level: "principiante" as const,
  duration: "55 horas",
  status: "published" as const,
};

const modules = [
  {
    number: 1,
    title: "Introducción a la Ciberseguridad",
    description:
      "Comprende el panorama actual de amenazas, los principios fundamentales de seguridad y el marco legal que regula la protección de datos.",
    topics: [
      {
        number: 1,
        name: "Panorama actual de amenazas cibernéticas",
        difficulty: "basico",
        estimatedTime: "30 min",
        content: `El panorama de amenazas cibernéticas ha evolucionado dramáticamente en la última década. Lo que antes eran principalmente virus y gusanos creados por curiosidad o vanidad, hoy es una industria sofisticada y lucrativa que incluye ransomware, espionaje corporativo, ataques de estado-nación y crimen organizado digital. Según estimaciones de Cybersecurity Ventures, el costo global de la ciberdelincuencia alcanzará los 10.5 billones de dólares anuales para 2025, lo que la convierte en la tercera economía más grande del mundo si fuera un país.

Los vectores de ataque más comunes incluyen el phishing (correos electrónicos fraudulentos que engañan al usuario para que revele credenciales o descargue malware), el ransomware (software que cifra los datos de la víctima y exige un rescate), los ataques de fuerza bruta (prueba sistemática de contraseñas), la explotación de vulnerabilidades en software desactualizado, y los ataques de ingeniería social que manipulan a las personas para que realicen acciones que comprometen la seguridad.

Los actores de amenazas se clasifican en varias categorías. Los script kiddies son individuos con poca habilidad técnica que utilizan herramientas creadas por otros. Los ciberdelincuentes organizados operan como empresas con divisiones de I+D, marketing y soporte, generando miles de millones en ganancias ilegales. Los grupos APT (Advanced Persistent Threats) son equipos patrocinados por estados nacionales que realizan espionaje y sabotaje a gran escala. Los hacktivistas utilizan ataques como protesta política. Los insiders (empleados descontentos o negligentes) representan una amenaza interna significativa que a menudo se subestima.

Las tendencias emergentes incluyen ataques a la cadena de suministro (comprometer un proveedor de software para acceder a miles de víctimas, como el caso SolarWinds), ataques a infraestructuras críticas (energía, agua, transporte), el uso de IA por parte de los atacantes para crear phishing más convincente y evadir detecciones, y la explotación de vulnerabilidades zero-day (defectos desconocidos por el fabricante) que se venden en el mercado negro por millones de dólares. Comprender este panorama es el primer paso para defenderse efectivamente.`,
      },
      {
        number: 2,
        name: "La tríada CIA y principios de seguridad",
        difficulty: "basico",
        estimatedTime: "25 min",
        content: `La tríada CIA (Confidentiality, Integrity, Availability) es el modelo fundamental sobre el cual se construyen todas las estrategias de seguridad de la información. Cada control de seguridad, cada política y cada tecnología apunta a proteger uno o más de estos tres pilares. Comprender la tríada CIA es esencial para analizar riesgos, diseñar defensas y evaluar la efectividad de las medidas de seguridad implementadas.

La Confidencialidad garantiza que la información solo sea accesible para las personas autorizadas. Los controles de confidencialidad incluyen el cifrado (transformar datos para que solo quien tenga la clave pueda leerlos), el control de acceso (autenticación y autorización), la clasificación de datos (público, interno, confidencial, restringido) y las políticas de manejo de información sensible. Una violación de confidencialidad ocurre cuando datos privados son expuestos a personas no autorizadas, como en los casos de filtraciones de datos personales que afectan a millones de usuarios.

La Integridad asegura que la información no haya sido modificada de manera no autorizada. Los controles de integridad incluyen las firmas digitales (que verifican la autenticidad y la integridad de un documento), los checksums y hashes (que detectan cambios en los datos), el control de versiones y las auditorías de cambios. Una violación de integridad ocurre cuando un atacante modifica datos sin autorización, como alterar registros financieros, modificar código fuente o cambiar los datos de una transferencia bancaria.

La Disponibilidad garantiza que los sistemas y la información estén accesibles cuando se necesitan. Los controles de disponibilidad incluyen la redundancia de sistemas, los backups regulares, la protección contra ataques DDoS (Distributed Denial of Service), los planes de recuperación ante desastres y el monitoreo de la infraestructura. Una violación de disponibilidad ocurre cuando un atacante impide el acceso legítimo a los sistemas, como en los ataques de ransomware que cifran los datos o los ataques DDoS que saturan los servidores.`,
      },
      {
        number: 3,
        name: "Tipos de malware y vectores de ataque",
        difficulty: "basico",
        estimatedTime: "35 min",
        content: `El malware (malicious software) es cualquier software diseñado para dañar, explotar o acceder a sistemas sin autorización. Existen numerosas categorías de malware, cada una con mecanismos de propagación, objetivos y técnicas específicas. Identificar el tipo de malware es el primer paso para contener la infección, erradicarla y prevenir futuros incidentes.

Los virus son programas que se adjuntan a archivos legítimos y se ejecutan cuando el archivo es abierto, propagándose a otros archivos del mismo sistema. Los gusanos (worms) son similares a los virus pero se propagan automáticamente a través de redes sin necesidad de un archivo anfitrión. Los troyanos se disfrazan de software legítimo para engañar al usuario y abrir puertas traseras en el sistema. El ransomware cifra los datos del usuario y exige un pago (generalmente en criptomonedas) para devolver el acceso; variantes notorias incluyen WannaCry, NotPetya y Ryuk.

El spyware recopila información del usuario sin su conocimiento: teclas pulsadas (keyloggers), navegación web, credenciales y datos financieros. Los rootkits se ocultan profundamente en el sistema operativo para evitar su detección y mantenimiento acceso persistente. Los bots y botnets convierten máquinas comprometidas en zombies que reciben órdenes de un servidor de comando y control (C2), utilizándose para ataques DDoS, minería de criptomonedas y envío masivo de spam. Los cryptominers utilizan los recursos de la máquina infectada para minar criptomonedas para el atacante.

Los vectores de ataque son las rutas mediante las cuales el malware llega al sistema. El phishing es el vector más efectivo: correos que imitan comunicaciones legítimas de bancos, empresas o contactos conocidos. Las descargas drive-by infectan el sistema al visitar una página web maliciosa sin necesidad de hacer clic. Los ataques de suministro de software comprometen actualizaciones legítimas para distribuir malware. Las unidades USB infectadas aprovechan la curiosidad o la negligencia del usuario. La ingeniería social manipula a las personas para que realicen acciones que comprometen la seguridad, como revelar contraseñas o ejecutar archivos adjuntos.`,
      },
      {
        number: 4,
        name: "Marco legal y ética en ciberseguridad",
        difficulty: "intermedio",
        estimatedTime: "30 min",
        content: `El marco legal de la ciberseguridad establece las obligaciones y responsabilidades de las organizaciones en materia de protección de datos, notificación de brechas y estándares de seguridad. Cumplir con estas regulaciones no es opcional: las multas por incumplimiento pueden alcanzar decenas de millones de euros o porcentajes significativos de la facturación global de la empresa.

El Reglamento General de Protección de Datos (RGPD) de la Unión Europea es la ley de protección de datos más estricta del mundo. Establece que las organizaciones deben proteger los datos personales de los ciudadanos europeos, obtener consentimiento explícito para su procesamiento, permitir el derecho al olvido (eliminación de datos), notificar brechas de seguridad en 72 horas, y designar un Delegado de Protección de Datos (DPO). Las multas por incumplimiento pueden alcanzar 20 millones de euros o el 4% de la facturación global anual.

En América Latina, varias países han promulgado leyes de protección de datos: la Ley 1581 de 2012 en Colombia, la Ley Federal de Protección de Datos Personales en México, la Ley General de Protección de Datos en Brasil (LGPD), y la Ley de Protección de Datos Personales en Argentina. Estas leyes siguen principios similares al RGPD pero con variaciones en las sanciones y los requisitos específicos. La tendencia es hacia una armonización progresiva de las legislaciones a nivel regional y global.

La ética en la ciberseguridad distingue a los profesionales legítimos de los ciberdelincuentes. El ethical hacking (hacking ético) es la práctica de probar la seguridad de los sistemas con autorización explícita del propietario, con el objetivo de identificar y reportar vulnerabilidades antes de que sean explotadas por atacantes. Los principios éticos fundamentales son: siempre obtener autorización por escrito antes de realizar pruebas, no causar daño a los sistemas, mantener la confidencialidad de las vulnerabilidades descubiertas, y reportar los hallazgos de manera responsable. Las certificaciones como CEH (Certified Ethical Hacker) y OSCP (Offensive Security Certified Professional) requieren comprometerse con un código de ética profesional.`,
      },
      {
        number: 5,
        name: "Gestión de riesgos y modelo de amenazas",
        difficulty: "intermedio",
        estimatedTime: "35 min",
        content: `La gestión de riesgos en ciberseguridad es el proceso sistemático de identificar, evaluar, priorizar y mitigar los riesgos de seguridad de la información. No es posible eliminar todos los riesgos, pero sí es posible gestionarlos de manera que los riesgos residuales sean aceptables para la organización. Este enfoque basado en riesgos permite asignar recursos limitados de forma eficiente, priorizando la protección de los activos más críticos.

El proceso de gestión de riesgos sigue un ciclo continuo de cuatro fases. La identificación de riesgos cataloga las amenazas potenciales, las vulnerabilidades existentes y los activos que podrían verse afectados. La evaluación de riesgos analiza la probabilidad de que cada amenaza explote una vulnerabilidad y el impacto que tendría si se materializara. El tratamiento de riesgos selecciona la estrategia más apropiada: mitigar (implementar controles), transferir (seguros cibernéticos), aceptar (si el riesgo es bajo) o evitar (eliminar la actividad que genera el riesgo). El monitoreo continuo verifica que los controles son efectivos y detecta nuevos riesgos.

El modelado de amenazas (threat modeling) es una técnica estructurada para identificar amenazas de seguridad desde la fase de diseño. La metodología STRIDE, desarrollada por Microsoft, clasifica las amenazas en seis categorías: Spoofing (suplantación de identidad), Tampering (modificación de datos), Repudiation (negación de acciones), Information Disclosure (divulgación de información), Denial of Service (denegación de servicio) y Elevation of Privilege (escalada de privilegios). Cada categoría se corresponde con uno o más pilares de la tríada CIA.

Los marcos de gestión de riesgos como NIST CSF (Cybersecurity Framework), ISO 27001 y COBIT proporcionan estructuras estandarizadas para implementar programas de seguridad. El NIST CSF organiza las actividades en cinco funciones: Identify (identificar activos y riesgos), Protect (implementar controles de protección), Detect (detectar incidentes), Respond (responder a incidentes) y Recover (recuperar operaciones normales). Este marco es adoptado voluntariamente por miles de organizaciones y es la referencia más utilizada en la industria.`,
      },
    ],
  },
  {
    number: 2,
    title: "Seguridad de Redes",
    description:
      "Comprende cómo funcionan las redes, los protocolos de comunicación y las técnicas para proteger y auditar la infraestructura de red.",
    topics: [
      {
        number: 1,
        name: "Modelo OSI y protocolos TCP/IP",
        difficulty: "basico",
        estimatedTime: "35 min",
        content: `El modelo OSI (Open Systems Interconnection) es el marco teórico de referencia que describe cómo se comunican los sistemas en red a través de siete capas. Comprender este modelo es fundamental para la ciberseguridad porque cada capa presenta vulnerabilidades específicas y requiere controles de seguridad distintos. Los ataques pueden dirigirse a cualquier capa, y las defensas deben cubrir todas.

La Capa 1 (Física) trata sobre el medio de transmisión: cables, fibra óptica, ondas de radio. Los ataques en esta capa incluyen la interceptación física del cable (wiretapping), la interferencia electromagnética y la destrucción de infraestructura. La Capa 2 (Enlace de Datos) maneja la transmisión de frames entre dispositivos directamente conectados, usando direcciones MAC. Los ataques incluyen ARP spoofing (envenenamiento de la tabla ARP para interceptar tráfico), MAC flooding (saturar la tabla de direcciones del switch) y VLAN hopping (saltar entre redes virtuales).

La Capa 3 (Red) gestiona el enrutamiento de paquetes entre redes usando direcciones IP. Los ataques incluyen IP spoofing (falsificar la dirección IP de origen), routing attacks (manipular las tablas de enrutamiento) y fragment attacks (explotar el manejo de paquetes fragmentados). La Capa 4 (Transporte) proporciona comunicación extremo a extremo con TCP y UDP. Los ataques incluyen TCP SYN flood (agotar los recursos del servidor con conexiones a medio abrir), session hijacking (secuestro de sesiones TCP) y port scanning (escaneo de puertos para identificar servicios).

Las capas superiores (5-7: Sesión, Presentación, Aplicación) son donde operan los protocolos que los usuarios finales utilizan directamente: HTTP, DNS, SMTP, FTP, SSH. Los ataques en estas capas son los más numerosos y visibles: inyección SQL, cross-site scripting (XSS), ataques a DNS (DNS poisoning, DNS amplification), ataques a aplicaciones web y explotación de vulnerabilidades en software de servidor. Comprender qué capa es objetivo de cada ataque permite implementar las defensas apropiadas en el nivel correcto.`,
      },
      {
        number: 2,
        name: "Firewalls, IDS/IPS y segmentación de red",
        difficulty: "intermedio",
        estimatedTime: "40 min",
        content: `Los firewalls son la primera línea de defensa perimetral de una red, controlando el tráfico que entra y sale basándose en reglas predefinidas. Los firewalls de filtrado de paquetes examinan las cabeceras de los paquetes IP (direcciones de origen/destino, puertos, protocolos) y deciden si permitir o denegar el paso. Los firewalls de estado (stateful) mantienen información sobre las conexiones activas, permitiendo el tráfico de respuesta de conexiones legítimas establecidas.

Los firewalls de próxima generación (NGFW) combinan las capacidades tradicionales con funciones avanzadas: inspección profunda de paquetes (DPI) que analiza el contenido completo del paquete, identificación de aplicaciones independientemente del puerto, integración con sistemas de reputación de amenazas, y capacidades de VPN. Marcas líderes incluyen Palo Alto Networks, Fortinet, Check Point y Cisco. La configuración del firewall sigue el principio de mínimo privilegio: denegar todo por defecto y permitir solo el tráfico explícitamente autorizado.

Los sistemas de detección de intrusos (IDS) monitorean el tráfico de red en busca de actividad sospechosa y generan alertas, pero no toman acciones preventivas. Los sistemas de prevención de intrusos (IPS) van un paso más allá y bloquean automáticamente el tráfico malicioso. Los IDS/IPS basados en firma comparan el tráfico con patrones conocidos de ataques (como un antivirus de red). Los basados en anomalía establecen un baseline del tráfico normal y alertan sobre desviaciones significativas.

La segmentación de red divide la infraestructura en zonas de seguridad aisladas, limitando el movimiento lateral de un atacante que ha comprometido un sistema. La arquitectura DMZ (Demilitarized Zone) coloca los servidores accesibles desde internet en una zona separada de la red interna. Las VLANs segmentan la red a nivel de enlace de datos. Los microsegmentación y los zero-trust networks llevan la segmentación al nivel individual de workload, aplicando el principio de "nunca confiar, siempre verificar" a cada comunicación dentro de la red.`,
      },
      {
        number: 3,
        name: "VPN, cifrado y túneles seguros",
        difficulty: "intermedio",
        estimatedTime: "35 min",
        content: `Las VPN (Virtual Private Networks) crean túneles cifrados sobre redes no confiables como internet, permitiendo la comunicación segura entre oficinas remotas, usuarios en movilidad y la red corporativa. La cifrado de la VPN asegura que un atacante que intercepte el tráfico no pueda leer su contenido ni modificarlo sin ser detectado. Los protocolos VPN principales son IPsec, OpenVPN, WireGuard y los protocolos TLS-based.

IPsec (Internet Protocol Security) opera en la capa de red y proporciona seguridad para cualquier protocolo de nivel superior. Tiene dos modos: modo transporte (cifra solo la carga útil del paquete IP) y modo túnel (cifra el paquete IP completo, encapsulándolo en un nuevo paquete). IPsec utiliza dos protocolos: AH (Authentication Header) para integridad y autenticidad, y ESP (Encapsulating Security Payload) para cifrado, integridad y autenticidad. Las asociaciones de seguridad (SA) de IPsec se negocian mediante IKE (Internet Key Exchange).

WireGuard es el protocolo VPN más moderno y eficiente, con solo 4.000 líneas de código (frente a las 100.000+ de OpenVPN/IPsec). Su simplicidad facilita la auditoría de seguridad, reduce la superficie de ataque y mejora el rendimiento. WireGuard utiliza criptografía moderna: Curve25519 para intercambio de claves, ChaCha20 para cifrado, Poly1305 para autenticación, y BLAKE2s para hashing. Está integrado en el kernel de Linux desde la versión 5.6 y es considerado el futuro de las VPN.

El cifrado TLS (Transport Layer Security) protege la comunicación web (HTTPS), correo electrónico y otros protocolos de aplicación. TLS 1.3, la versión actual, simplifica el handshake a una sola ronda (1-RTT), elimina algoritmos criptográficos obsoletos y proporciona forward secrecy por defecto. Los certificados X.509 y las autoridades certificadoras (CA) verifican la identidad del servidor. Let's Encrypt ha democratizado los certificados TLS, ofreciéndolos gratuitamente y automatizando su renovación. El cifrado de extremo a extremo (E2EE) va más allá del TLS cifrando los datos en el cliente antes de enviarlos, de modo que ni siquiera el servidor puede leerlos.`,
      },
      {
        number: 4,
        name: "Reconocimiento de red y footprinting",
        difficulty: "intermedio",
        estimatedTime: "40 min",
        content: `El reconocimiento (reconnaissance) es la primera fase de cualquier test de penetración y consiste en recopilar la máxima información posible sobre el objetivo antes de intentar explotarlo. Esta información se utiliza para identificar superficies de ataque, vectores potenciales y vulnerabilidades. El reconocimiento puede ser pasivo (sin interactuar directamente con el objetivo) o activo (interactuando con los sistemas del objetivo).

El reconocimiento pasivo recopila información sin alertar al objetivo. Las técnicas incluyen: WHOIS (información de registro de dominios), DNS enumeration (registros A, MX, NS, TXT, que revelan servidores de correo, subdominios y configuraciones), Google dorking (búsquedas avanzadas que revelan archivos expuestos, paneles de administración y datos sensibles indexados), búsqueda en redes sociales (LinkedIn para organigrama y tecnologías usadas), Shodan (motor de búsqueda de dispositivos conectados a internet), y la Wayback Machine (versiones anteriores del sitio web).

El reconocimiento activo interactúa directamente con los sistemas del objetivo y puede ser detectado. Nmap es la herramienta estándar para escaneo de puertos y servicios: nmap -sV -sC -O target escanea puertos, detecta versiones de servicios, ejecuta scripts NSE y identifica el sistema operativo. El escaneo de puertos revela qué servicios están expuestos: el puerto 80/443 indica un servidor web, el 22 indica SSH, el 3306 indica MySQL. Cada servicio descubierto es un potencial vector de ataque.

El footprinting de red mapea la infraestructura del objetivo: rangos de IP, topología de red, sistemas operativos, servicios y versiones. Herramientas como traceroute revelan la ruta de red y los dispositivos intermedios. La enumeración de SNMP (Simple Network Management Protocol) puede revelar información detallada sobre los dispositivos de red. Los registros DNS reversos asocian direcciones IP con nombres de dominio. Toda esta información se compila en un perfil del objetivo que guía las fases posteriores del pentest.`,
      },
    ],
  },
  {
    number: 3,
    title: "Hacking Ético y Pentesting",
    description:
      "Aprende las metodologías y técnicas del hacking ético para identificar vulnerabilidades antes que los atacantes.",
    topics: [
      {
        number: 1,
        name: "Metodología de pentesting: PTES y OWASP",
        difficulty: "intermedio",
        estimatedTime: "35 min",
        content: `Las metodologías de pentesting proporcionan frameworks estructurados para realizar pruebas de penetración de manera sistemática, completa y reproducible. Sin una metodología, es fácil omitir vectores de ataque críticos o perder tiempo en áreas que no aportan valor. Las dos metodologías más reconocidas en la industria son PTES (Penetration Testing Execution Standard) y la metodología de OWASP para aplicaciones web.

PTES define siete fases para un pentest completo. La fase de pre-engagement establece el alcance, las reglas de compromiso, las autorizaciones y los contactos de emergencia. La inteligencia gathering recopila toda la información disponible sobre el objetivo. La modelación de amenazas analiza la información recopilada para identificar los vectores de ataque más prometedores. El análisis de vulnerabilidades identifica debilidades específicas en los sistemas objetivo. La explotación intenta aprovechar las vulnerabilidades descubiertas. El post-explotación evalúa el impacto de las vulnerabilidades explotadas y el acceso obtenido. Finalmente, la elaboración de reportes documenta todos los hallazgos, su severidad y las recomendaciones de remediación.

La metodología OWASP (Open Web Application Security Project) se enfoca específicamente en la seguridad de aplicaciones web. El OWASP Top 10 es la lista de referencia de los diez riesgos de seguridad más críticos en aplicaciones web, actualizada periódicamente. La versión 2021 incluye: Broken Access Control, Cryptographic Failures, Injection, Insecure Design, Security Misconfiguration, Vulnerable and Outdated Components, Identification and Authentication Failures, Software and Data Integrity Failures, Security Logging and Monitoring Failures, y Server-Side Request Forgery.

El alcance (scope) del pentest se define en el contrato y determina qué sistemas se pueden probar y cuáles están excluidos. Las reglas de compromiso (rules of engagement) especifican las ventanas de tiempo permitidas, las técnicas autorizadas o prohibidas, y los procedimientos de comunicación en caso de descubrir una vulnerabilidad crítica. Un pentest sin autorización explícita y documentada es ilegal, independientemente de las intenciones del pentester. La documentación legal es tan importante como las habilidades técnicas en el hacking ético profesional.`,
      },
      {
        number: 2,
        name: "Explotación de vulnerabilidades web: XSS, SQLi y más",
        difficulty: "avanzado",
        estimatedTime: "50 min",
        content: `Las vulnerabilidades web son las más prevalentes y explotadas en el panorama actual de ciberseguridad. OWASP categoriza estas vulnerabilidades y proporciona guías para prevenirlas. Las tres categorías más críticas son las inyecciones (SQL, NoSQL, OS command), el cross-site scripting (XSS) y el acceso roto, que juntas representan la mayoría de las brechas de seguridad en aplicaciones web.

La inyección SQL ocurre cuando una aplicación construye consultas SQL incluyendo datos no confiables sin sanitizar. Un atacante puede inyectar código SQL que la base de datos ejecuta: ' OR '1'='1' -- convierte una consulta de login en SELECT * FROM users WHERE username='' OR '1'='1' --' AND password='...', que siempre devuelve verdadero, permitiendo el acceso sin credenciales válidas. Las inyecciones más avanzadas pueden extraer datos completos de la base de datos (UNION-based), leer archivos del servidor (LOAD_FILE) o ejecutar comandos del sistema operativo (xp_cmdshell en SQL Server).

El Cross-Site Scripting (XSS) permite a un atacante inyectar scripts maliciosos en páginas web que otros usuarios visualizan. El XSS reflejado (reflected) se produce cuando el script viaja en la petición y se refleja en la respuesta sin sanitizar. El XSS almacenado (stored) persiste el script en el servidor (por ejemplo, en un comentario) y se ejecuta cada vez que alguien ve la página. El XSS basado en DOM (DOM-based) ocurre enteramente en el cliente cuando JavaScript maneja datos no confiables de forma insegura. Las consecuencias del XSS incluyen robo de sesiones, redirección a sitios de phishing, defacement y keylogging.

La prevención de estas vulnerabilidades se basa en principios fundamentales. Para inyecciones SQL: usar exclusivamente consultas parametrizadas (prepared statements) o ORMs, nunca concatenar cadenas para construir consultas. Para XSS: escapar (encode) todos los datos no confiables según el contexto (HTML body, atributos, JavaScript, CSS), implementar Content Security Policy (CSP) como defensa en profundidad, y usar frameworks modernos que escapan automáticamente por defecto (React, Vue). Para access control: implementar verificaciones de autorización en cada endpoint del servidor, nunca confiar solo en la ocultación de elementos en la interfaz.`,
      },
      {
        number: 3,
        name: "Escalada de privilegios y post-explotación",
        difficulty: "avanzado",
        estimatedTime: "45 min",
        content: `La escalada de privilegios es el proceso de obtener un nivel de acceso superior al inicialmente comprometido. Después de ganar acceso a un sistema (generalmente como usuario sin privilegios), el atacante busca elevar sus privilegios hasta obtener acceso de administrador (root en Linux, SYSTEM en Windows). Este acceso elevado permite acceder a todos los datos, instalar software malicioso y establecer persistencia en el sistema.

La escalada de privilegios en Linux explota configuraciones incorrectas y vulnerabilidades. Las técnicas más comunes incluyen: buscar archivos con SUID bit activado (find / -perm -4000 2>/dev/null) que se ejecutan con los privilegios del propietario; verificar permisos de sudo (sudo -l) que pueden permitir ejecutar comandos como root; explotar tareas cron que ejecutan scripts modificables por el usuario; buscar credenciales en archivos de configuración, historiales de bash y logs; y explotar vulnerabilidades del kernel (como Dirty COW, PwnKit) que permiten escalar desde usuario a root.

En Windows, las técnicas incluyen: extraer hashes de contraseñas del archivo SAM (usando herramientas como Mimikatz); explotar servicios con permisos débiles que permiten reemplazar el ejecutable; abusar de tokens de impersonación (potato attacks); buscar credenciales en el registro, archivos de configuración y variables de entorno; y explotar vulnerabilidades del sistema operativo como PrintNightmare o ZeroLogon.

La post-explotación abarca todo lo que se hace después de comprometer un sistema: pivoting (usar la máquina comprometida como punto de partida para atacar otras máquinas en la red interna), exfiltración de datos (extraer información sensible sin ser detectado), establecimiento de persistencia (asegurar que el acceso se mantiene después de reinicios y cambios de contraseña), y limpieza de rastros (eliminar logs y evidencias del compromiso). Cada una de estas actividades debe realizarse con cuidado para no alertar a los sistemas de monitoreo y demostrar el impacto real de las vulnerabilidades descubiertas.`,
      },
      {
        number: 4,
        name: "Herramientas esenciales: Nmap, Metasploit y Burp Suite",
        difficulty: "intermedio",
        estimatedTime: "45 min",
        content: `Las herramientas de pentesting son el arsenal del profesional de seguridad ofensiva. Conocer las capacidades y limitaciones de cada herramienta es esencial para realizar pruebas de penetración eficientes y efectivas. Las tres herramientas más utilizadas en la industria son Nmap para reconocimiento, Metasploit para explotación y Burp Suite para pruebas de aplicaciones web.

Nmap (Network Mapper) es la herramienta estándar para descubrimiento de redes y auditoría de seguridad. Los tipos de escaneo principales son: -sS (SYN scan, el más popular, rápido y sigiloso), -sT (TCP connect scan, más ruidoso pero funciona sin privilegios), -sU (UDP scan, lento pero necesario para servicios como DNS y DHCP), -sV (version detection, identifica la versión de los servicios), -sC (ejecuta scripts NSE por defecto), y -O (detección de sistema operativo). Los scripts NSE (Nmap Scripting Engine) extienden las capacidades de Nmap con scripts para detectar vulnerabilidades específicas, extraer información de servicios y realizar brute force.

Metasploit Framework es la plataforma de explotación más utilizada, con miles de exploits, payloads y módulos auxiliares. El flujo de trabajo típico es: buscar un exploit con search [vulnerabilidad], seleccionarlo con use exploit/multi/handler, configurar los parámetros con set RHOSTS [objetivo], elegir un payload con set PAYLOAD windows/meterpreter/reverse_tcp, y ejecutar con exploit. Meterpreter es el payload más potente, proporcionando una sesión interactiva con capacidades de post-explotación: migrar a otros procesos, capturar keystrokes, hacer screenshots, subir/descargar archivos y pivotar a otras máquinas.

Burp Suite es el proxy interceptador estándar para pruebas de seguridad en aplicaciones web. Funciona como un proxy entre el navegador y el servidor, permitiendo inspeccionar y modificar cada petición y respuesta HTTP. El Repeater permite reenviar peticiones modificadas manualmente para probar vulnerabilidades. El Intruder automatiza ataques de fuerza bruta y fuzzing. El Scanner (versión Pro) identifica automáticamente vulnerabilidades. El Decoder codifica/decodifica datos en múltiples formatos. Burp Suite es indispensable para encontrar vulnerabilidades lógicas y de negocio que los escáneres automatizados no detectan.`,
      },
    ],
  },
  {
    number: 4,
    title: "Criptografía y Protección de Datos",
    description:
      "Domina los fundamentos de la criptografía, los algoritmos de cifrado y las mejores prácticas para proteger datos en reposo y en tránsito.",
    topics: [
      {
        number: 1,
        name: "Criptografía simétrica y asimétrica",
        difficulty: "intermedio",
        estimatedTime: "40 min",
        content: `La criptografía es la ciencia de proteger la información mediante transformaciones matemáticas que la hacen ininteligible para quien no posea la clave de descifrado. Es la base técnica de la seguridad de la información y se utiliza en prácticamente todos los sistemas modernos: navegación web segura, mensajería cifrada, almacenamiento de contraseñas, firmas digitales y blockchain. Comprender los principios criptográficos es esencial para implementar soluciones de seguridad correctas.

La criptografía simétrica utiliza la misma clave para cifrar y descifrar. Es extremadamente rápida (procesa gigabytes por segundo) pero presenta el problema de la distribución de claves: ¿cómo compartir la clave secreta con el destinatario sin que sea interceptada? Los algoritmos simétricos modernos son AES (Advanced Encryption Standard), que opera con claves de 128, 192 o 256 bits y es el estándar mundial aprobado por la NSA para información clasificada; ChaCha20, una alternativa de flujo desarrollada por Daniel Bernstein que es más rápida en dispositivos sin soporte hardware AES; y 3DES, un algoritmo legado que aún se encuentra en sistemas antiguos pero que se considera obsoleto.

La criptografía asimétrica utiliza un par de claves: una pública (que se comparte libremente) y una privada (que se mantiene secreta). Lo cifrado con la clave pública solo se descifra con la privada, y viceversa. Esto resuelve el problema de distribución de claves pero es considerablemente más lento que la criptografía simétrica (100-1000x). Los algoritmos asimétricos principales son RSA (basado en la dificultad de factorizar números enteros grandes), ECC (Elliptic Curve Cryptography, que ofrece la misma seguridad con claves mucho más cortas), y Diffie-Hellman (para intercambio seguro de claves).

En la práctica, se utiliza un esquema híbrido: la criptografía asimétrica establece una conexión segura y negocia una clave simétrica de sesión, y luego toda la comunicación posterior usa criptografía simétrica por rendimiento. Este es exactamente el modelo que usa TLS/HTTPS. El cifrado asimétrico también se usa para firmas digitales: el emisor firma con su clave privada, y cualquiera puede verificar la firma con la clave pública del emisor, garantizando autenticidad e integridad.`,
      },
      {
        number: 2,
        name: "Hashing, firmas digitales y certificados",
        difficulty: "intermedio",
        estimatedTime: "35 min",
        content: `Las funciones hash criptográficas transforman datos de cualquier tamaño en una huella digital de longitud fija (digest). Un hash criptográfico debe cumplir tres propiedades: ser unidireccional (no es posible reconstruir los datos originales a partir del hash), resistente a colisiones (es computacionalmente inviable encontrar dos entradas diferentes que produzcan el mismo hash), y resistente a preimagen (dado un hash, es inviable encontrar una entrada que lo produzca). Estas propiedades hacen que los hashes sean ideales para verificar integridad y almacenar contraseñas.

Los algoritmos hash principales son SHA-256 (produce un hash de 256 bits, estándar en la mayoría de aplicaciones), SHA-3 (el estándar más reciente, basado en una estructura diferente llamado Keccak), y bcrypt/scrypt/Argon2 (funciones derivadas de clave diseñadas específicamente para contraseñas, que incorporan salt y son intencionalmente lentas para resistir ataques de fuerza bruta). MD5 y SHA-1 están rotos criptográficamente y no deben usarse para propósitos de seguridad, aunque aún se encuentran en sistemas legados.

Las firmas digitales combinan hashing con criptografía asimétrica para garantizar autenticidad, integridad y no repudio. El proceso es: el emisor calcula el hash del mensaje, lo cifra con su clave privada (esto es la firma), y envía el mensaje junto con la firma. El destinatario descifra la firma con la clave pública del emisor (obteniendo el hash original), calcula el hash del mensaje recibido, y compara ambos. Si coinciden, el mensaje es auténtico (provino del emisor), íntegro (no fue modificado), y el emisor no puede repudiarlo (solo él posee la clave privada).

Los certificados digitales X.509 vinculan una clave pública con la identidad de su propietario, firmados por una Autoridad Certificadora (CA) de confianza. El certificado contiene: la clave pública del titular, su identidad (nombre, organización, dominio), el período de validez, y la firma digital de la CA. La cadena de confianza va desde la CA raíz (auto-firmada y preinstalada en los navegadores) hasta el certificado del servidor final, pasando por CAs intermedias. La PKI (Public Key Infrastructure) es el sistema completo que gestiona la emisión, revocación y verificación de certificados.`,
      },
      {
        number: 3,
        name: "Protección de datos en reposo y en tránsito",
        difficulty: "avanzado",
        estimatedTime: "40 min",
        content: `La protección de datos debe aplicarse en dos estados fundamentales: en reposo (almacenados en discos, bases de datos, backups) y en tránsito (siendo transmitidos por la red). Cada estado presenta desafíos y requiere controles específicos. La estrategia de defensa en profundidad recomienda aplicar ambos tipos de protección, ya que la compromisión de uno no debería exponer los datos completamente.

La protección de datos en reposo utiliza cifrado a nivel de disco, partición, archivo o campo de base de datos. El cifrado de disco completo (Full Disk Encryption, FDE) con LUKS en Linux o BitLocker en Windows cifra todo el contenido del disco, protegiendo los datos si el disco físico es robado o accedido sin autorización. El cifrado a nivel de base de datos (Transparent Data Encryption, TDE) cifra los archivos de datos y logs de la base de datos, protegiendo contra acceso físico al almacenamiento. El cifrado a nivel de columna o campo cifra datos específicos (números de tarjeta, datos médicos) con claves gestionadas independientemente.

La gestión de claves de cifrado (Key Management) es tan importante como el cifrado mismo. Las claves deben generarse con generadores de números aleatorios criptográficamente seguros, almacenarse en módulos de seguridad de hardware (HSM) o servicios de gestión de claves (AWS KMS, Azure Key Vault), rotarse periódicamente, y tener procedimientos de backup y recuperación. La pérdida de la clave de cifrado equivale a la pérdida de los datos. La separación de funciones debe garantizar que quien administra las claves no tenga acceso a los datos cifrados, y viceversa.

La protección de datos en tránsito utiliza TLS/SSL para cifrar la comunicación entre clientes y servidores. La configuración segura de TLS requiere: deshabilitar protocolos antiguos (SSLv3, TLS 1.0, 1.1), usar solo TLS 1.2 o preferiblemente 1.3, seleccionar cipher suites fuertes (AES-GCM, ChaCha20-Poly1305), deshabilitar compresión (para prevenir ataques CRIME), implementar HSTS (HTTP Strict Transport Security) para forzar HTTPS, y configurar OCSP stapling para verificación eficiente de revocación de certificados. La perfect forward secrecy (PFS) asegura que la compromisión de la clave del servidor no permita descifrar comunicaciones pasadas.`,
      },
      {
        number: 4,
        name: "Gestión de identidades y acceso (IAM)",
        difficulty: "intermedio",
        estimatedTime: "35 min",
        content: `La gestión de identidades y acceso (Identity and Access Management, IAM) es el conjunto de políticas, procesos y tecnologías que garantizan que las personas y sistemas correctos tengan acceso a los recursos apropiados, en el momento adecuado y por las razones correctas. IAM es fundamental porque la mayoría de las brechas de seguridad involucran credenciales comprometidas o accesos excesivos: según Verizon, el 80% de las brechas involucran credenciales robadas o débiles.

La autenticación verifica la identidad del usuario. Los factores de autenticación son: algo que sabes (contraseña, PIN), algo que tienes (token, teléfono, tarjeta inteligente), y algo que eres (huella dactilar, reconocimiento facial, iris). La autenticación multifactor (MFA) combina dos o más factores, reduciendo drásticamente el riesgo de acceso no autorizado: incluso si un atacante roba la contraseña, necesita el segundo factor para acceder. Las implementaciones modernas de MFA incluyen TOTP (Google Authenticator, Authy), llaves de seguridad FIDO2/WebAuthn (YubiKey) y autenticación push (Duo, Microsoft Authenticator).

La autorización determina qué puede hacer un usuario autenticado. El modelo RBAC (Role-Based Access Control) asigna permisos a roles (administrador, editor, visor) y los roles a usuarios. El modelo ABAC (Attribute-Based Access Control) evalúa atributos del usuario, del recurso, del entorno y de la acción para tomar decisiones de acceso más granulares. El principio de mínimo privilegio establece que cada usuario debe tener solo los permisos necesarios para realizar su trabajo, ni más ni menos.

El Single Sign-On (SSO) permite a los usuarios autenticarse una vez y acceder a múltiples aplicaciones sin volver a ingresar credenciales. Los protocolos SAML, OAuth 2.0 y OpenID Connect son los estándares para implementar SSO. SAML es el estándar empresarial para autenticación entre organizaciones. OAuth 2.0 es el framework de autorización que permite a aplicaciones acceder a recursos del usuario sin compartir credenciales. OpenID Connect extiende OAuth 2.0 con una capa de identidad estándar. La gestión del ciclo de vida de las identidades (joiner-mover-leaver) automatiza la creación, modificación y desactivación de accesos conforme los usuarios se incorporan, cambian de rol o abandonan la organización.`,
      },
    ],
  },
  {
    number: 5,
    title: "Seguridad en la Nube y DevSecOps",
    description:
      "Aplica principios de seguridad a infraestructuras cloud e integra la seguridad en el ciclo de desarrollo de software.",
    topics: [
      {
        number: 1,
        name: "Seguridad en AWS, Azure y GCP",
        difficulty: "avanzado",
        estimatedTime: "45 min",
        content: `La seguridad en la nube presenta desafíos únicos porque la infraestructura es compartida y gestionada parcialmente por el proveedor cloud. El modelo de responsabilidad compartida define qué aspectos de la seguridad maneja el proveedor y cuáles son responsabilidad del cliente. En IaaS (Infrastructure as a Service), el proveedor protege la infraestructura física, la red y el hipervisor, mientras que el cliente es responsable de la configuración del sistema operativo, las aplicaciones, los datos y el acceso. En SaaS, el proveedor asume más responsabilidad, pero el cliente siempre es dueño de sus datos y del acceso a ellos.

En AWS, los servicios de seguridad principales son: IAM (gestión de identidades y políticas), VPC (redes virtuales aisladas), Security Groups y NACLs (firewalls a nivel de instancia y subred), KMS (gestión de claves de cifrado), CloudTrail (auditoría de acciones API), GuardDuty (detección de amenazas), y Config (evaluación de configuraciones). Las configuraciones incorrectas más comunes en AWS incluyen buckets S3 públicos, seguridad predeterminada en grupos de seguridad (0.0.0.0/0), claves de acceso AWS embebidas en código, y roles IAM con permisos excesivos.

Azure Security Center y Microsoft Defender for Cloud proporcionan capacidades similares para el ecosistema Azure: evaluación de postura de seguridad, protección de cargas de trabajo, detección de amenazas y recomendaciones de hardening. GCP ofrece Security Command Center, Cloud IAM, VPC Service Controls y Binary Authorization. Independientemente del proveedor, los principios de seguridad cloud son universales: principio de mínimo privilegio, defensa en profundidad, cifrado por defecto, monitoreo continuo y automatización de respuestas de seguridad.

Las herramientas de seguridad cloud-native como CloudSploit, ScoutSuite y Prowler escanean la configuración de la cuenta cloud contra benchmarks de seguridad (CIS Benchmarks) y detectan desviaciones. Terraform y CloudFormation permiten implementar la infraestructura como código (IaC), garantizando que las configuraciones de seguridad se versionen, revisen y apliquen consistentemente. Los policies as code (OPA, Sentinel) validan automáticamente que las configuraciones cumplen con las políticas de seguridad antes de ser desplegadas.`,
      },
      {
        number: 2,
        name: "DevSecOps: seguridad integrada en el CI/CD",
        difficulty: "avanzado",
        estimatedTime: "40 min",
        content: `DevSecOps es la filosofía de integrar la seguridad en cada fase del ciclo de desarrollo de software, desde la planificación hasta el despliegue y la operación. El enfoque tradicional trataba la seguridad como una fase final (testing de seguridad antes de producción), lo que generaba cuellos de botella, retrasos y vulnerabilidades no detectadas. DevSecOps desplaza la seguridad hacia la izquierda (shift left), detectando y corrigiendo problemas lo antes posible cuando el costo de remediar es menor.

En la fase de planificación, el modelado de amenazas (threat modeling) identifica riesgos de seguridad en el diseño antes de escribir código. Los user stories de seguridad (abuse cases) describen cómo un atacante podría abusar de cada funcionalidad. Los requisitos de seguridad se integran en los criterios de aceptación. En la fase de desarrollo, los IDEs con plugins de seguridad (SonarLint, Snyk) alertan sobre vulnerabilidades mientras el desarrollador escribe código. Los pre-commit hooks impiden la subida de secretos, credenciales y claves API al repositorio.

En la fase de build, los escáneres SAST (Static Application Security Testing) analizan el código fuente en busca de patrones vulnerables: SQLi, XSS, buffer overflows, uso de funciones inseguras. Las herramientas principales son SonarQube, Checkmarx, Semgrep y CodeQL. Los escáneres SCA (Software Composition Analysis) verifican las dependencias de terceros contra bases de datos de vulnerabilidades conocidas (CVE): Snyk, Dependabot, OWASP Dependency-Check. Los escáneres de secretos detectan credenciales filtradas en el código: GitLeaks, TruffleHog.

En la fase de testing, los escáneres DAST (Dynamic Application Security Testing) prueban la aplicación en ejecución enviando payloads maliciosos: OWASP ZAP, Burp Suite Scanner. Los tests de seguridad automatizados se integran en el pipeline CI/CD: si una vulnerabilidad crítica se detecta, el despliegue se bloquea automáticamente. En producción, el monitoreo de seguridad (WAF, RASP, SIEM) detecta y responde a ataques en tiempo real. El feedback loop cierra el ciclo: los incidentes detectados en producción informan mejoras en los controles preventivos de las fases anteriores.`,
      },
      {
        number: 3,
        name: "Contenedores, Kubernetes y seguridad de supply chain",
        difficulty: "avanzado",
        estimatedTime: "40 min",
        content: `Los contenedores (Docker, Podman) y orquestadores (Kubernetes) han transformado el despliegue de aplicaciones, pero introducen nuevas superficies de ataque que deben ser comprendidas y mitigadas. La seguridad de contenedores requiere un enfoque de defensa en profundidad que cubra desde la imagen base hasta el runtime del contenedor y la orquestación.

La seguridad de imágenes Docker comienza con la elección de la imagen base. Las imágenes minimalistas como Alpine (5 MB) o distroless reducen la superficie de ataque al contener menos software potencialmente vulnerable. Cada capa adicional (paquetes instalados, dependencias) aumenta el riesgo. El escaneo de vulnerabilidades de imágenes con Trivy, Grype o Clair identifica CVEs en las capas de la imagen antes de desplegarla. Las mejores prácticas incluyen: usar imágenes base oficiales y verificadas, ejecutar como usuario no-root (USER nonroot), no almacenar secretos en la imagen (usar variables de entorno o secret managers), y minimizar el número de capas.

Kubernetes es el orquestador de contenedores más utilizado y presenta un modelo de seguridad complejo con múltiples capas. La seguridad del clúster incluye: asegurar el API server con RBAC y autenticación, restringir el acceso al etcd (almacén de estado del clúster), usar Network Policies para segmentar el tráfico entre pods, y cifrar los secretos en reposo con KMS. La seguridad de los pods incluye: usar Security Contexts para limitar capacidades (drop ALL capabilities, run as non-root), establecer resource limits para prevenir ataques de denegación de servicio, y usar Pod Security Standards (privileged, baseline, restricted).

La seguridad de la cadena de suministro de software (supply chain security) ha ganado importancia crítica después de ataques como SolarWinds y las dependencias maliciosas en npm. Las prácticas clave son: verificar la integridad de las imágenes con firmas digitales (cosign, Notary), usar registries privados y confiables, implementar Binary Authorization para asegurar que solo imágenes firmadas y verificadas se desplieguen, auditar las dependencias con SBOM (Software Bill of Materials), y usar SLSA (Supply-chain Levels for Software Artifacts) como framework para evaluar la madurez de la cadena de suministro.`,
      },
      {
        number: 4,
        name: "Respuesta a incidentes y forense digital",
        difficulty: "avanzado",
        estimatedTime: "40 min",
        content: `La respuesta a incidentes es el proceso estructurado de detectar, contener, erradicar y recuperarse de ataques de seguridad. Un plan de respuesta a incidentes (Incident Response Plan) define los procedimientos, roles y responsabilidades para manejar brechas de seguridad de manera eficiente y minimizar el daño. La velocidad de respuesta es crítica: según IBM, el tiempo medio para identificar y contener una brecha es de 277 días, y cada día de retraso incrementa el costo promedio en más de un millón de dólares.

El ciclo de vida de respuesta a incidentes del NIST define cuatro fases. La preparación establece las políticas, el equipo CSIRT (Computer Security Incident Response Team), las herramientas y los procedimientos antes de que ocurra un incidente. La detección y análisis identifica el incidente, determina su alcance y evalúa su severidad. La contención, erradicación y recuperación limita el daño, elimina la amenaza y restaura los sistemas afectados. La actividad post-incidente analiza lecciones aprendidas y mejora los controles para prevenir incidentes similares.

La forense digital es la aplicación de métodos científicos para preservar, recolectar, analizar y presentar evidencia digital. Los principios forenses fundamentales son: preservar la evidencia original (trabajar siempre con copias), mantener la cadena de custodia (documentar quién maneja la evidencia y cuándo), y asegurar la integridad de los datos (calcular hashes de los archivos originales). Las herramientas forenses incluyen EnCase, FTK (Forensic Toolkit), Autopsy y The Sleuth Kit para análisis de disco; Volatility y LiME para análisis de memoria RAM; y Wireshark y NetworkMiner para análisis de tráfico de red.

Las técnicas de análisis forense incluyen: análisis de timeline (reconstruir la secuencia de eventos a partir de timestamps), análisis de artefactos del sistema operativo (registro de Windows, logs de Linux, archivos de prefetch), análisis de memoria (extraer procesos activos, conexiones de red y claves de cifrado de la memoria RAM), y análisis de red (reconstruir sesiones de comunicación y exfiltración de datos). Los resultados del análisis forense alimentan el reporte de incidentes y pueden servir como evidencia en procedimientos legales.`,
      },
    ],
  },
  {
    number: 6,
    title: "Carreras y Certificaciones en Ciberseguridad",
    description:
      "Conoce las certificaciones más valoradas, las trayectorias profesionales y cómo construir tu carrera en ciberseguridad.",
    topics: [
      {
        number: 1,
        name: "Certificaciones: CompTIA Security+, CEH, OSCP y más",
        difficulty: "basico",
        estimatedTime: "30 min",
        content: `Las certificaciones en ciberseguridad validan las competencias de los profesionales y son un factor determinante en la contratación. Según estudios de la industria, los profesionales certificados ganan entre un 10% y un 25% más que sus pares no certificados. La elección de la certificación depende del nivel de experiencia, el área de especialización y los objetivos profesionales.

CompTIA Security+ es la certificación de nivel entry más reconocida globalmente. Cubre los fundamentos de seguridad: amenazas y vulnerabilidades, tecnologías y herramientas, arquitectura y diseño, gestión de riesgos, y criptografía. No requiere experiencia previa y es el punto de partida recomendado para quienes inician en la ciberseguridad. El examen tiene 90 preguntas de opción múltiple y rendimiento, con un mínimo aprobatorio de 750/900. Es un requisito para muchos puestos gubernamentales en EE.UU. (cumple con DoD 8570).

El CEH (Certified Ethical Hacker) de EC-Council se enfoca en habilidades ofensivas: metodologías de hacking ético, herramientas de pentesting, y técnicas de explotación. Es una certificación intermedia que requiere demostrar conocimiento de los métodos de los atacantes para poder defenderse de ellos. El OSCP (Offensive Security Certified Professional) es la certificación práctica más respetada en seguridad ofensiva. A diferencia de exámenes de opción múltiple, el OSCP evalúa en un entorno práctico de 24 horas donde el candidato debe comprometer múltiples máquinas y documentar el proceso.

Las certificaciones avanzadas incluyen CISSP (para gestión y arquitectura de seguridad), CISM (para gestión de seguridad de la información), GCIH (para respuesta a incidentes), y GPEN (para pentesting). En la nube, AWS Security Specialty, Azure Security Engineer y GCP Professional Cloud Security Engineer validan competencias específicas de cada proveedor. La combinación de certificaciones técnicas prácticas (OSCP, GPEN) con certificaciones de gestión (CISSP, CISM) es la trayectoria más completa para aspirar a posiciones de liderazgo como CISO (Chief Information Security Officer).`,
      },
      {
        number: 2,
        name: "Roles y trayectorias profesionales",
        difficulty: "basico",
        estimatedTime: "25 min",
        content: `La ciberseguridad ofrece una amplia variedad de roles profesionales que abarcan desde la seguridad técnica hasta la gestión estratégica. La escasez global de profesionales de ciberseguridad (estimada en 3.5 millones de puestos vacantes según ISC2) crea oportunidades excepcionales para quienes se preparan adecuadamente. Los salarios son competitivos y la demanda está asegurada a largo plazo.

Los roles técnicos incluyen: Security Analyst (monitorea y responde a alertas de seguridad), Penetration Tester (realiza pruebas de penetración para identificar vulnerabilidades), Security Engineer (diseña e implementa soluciones de seguridad), Incident Responder (investiga y contiene brechas de seguridad), Malware Analyst (analiza software malicioso), y Security Architect (diseña la arquitectura de seguridad de los sistemas). Estos roles requieren habilidades técnicas profundas y generalmente requieren certificaciones especializadas.

Los roles de gestión incluyen: CISO (líder estratégico de la seguridad de la organización), Security Manager (gestiona equipos y proyectos de seguridad), GRC Analyst (gestiona gobernanza, riesgo y cumplimiento), Security Consultant (asesora a organizaciones en materia de seguridad), y Security Auditor (evalúa el cumplimiento de estándares de seguridad). Estos roles combinan conocimientos técnicos con habilidades de comunicación, gestión de proyectos y liderazgo.

Las trayectorias típicas comienzan en roles de Security Analyst o SOC Analyst (nivel entry), avanzan a roles especializados como Penetration Tester o Security Engineer (nivel intermedio), y culminan en posiciones de liderazgo como Security Architect o CISO (nivel senior). La transición desde otras áreas de TI (desarrollo de software, administración de sistemas, redes) es común y valorada, ya que la experiencia en la construcción y operación de sistemas proporciona una perspectiva invaluable para protegerlos.`,
      },
      {
        number: 3,
        name: "Laboratorios prácticos y CTFs",
        difficulty: "intermedio",
        estimatedTime: "30 min",
        content: `La práctica constante es la clave para desarrollar habilidades de ciberseguridad. Los laboratorios prácticos y los CTFs (Capture The Flag) proporcionan entornos legales y seguros para aplicar los conocimientos teóricos en escenarios realistas. Las competencias CTF son el campo de entrenamiento estándar de la comunidad de seguridad y una excelente forma de construir un portafolio demostrable de habilidades.

HackTheBox es la plataforma de entrenamiento más popular para seguridad ofensiva. Ofrece máquinas vulnerables de dificultad progresiva (fácil, media, difícil, insana) que cubren técnicas de explotación web, escalada de privilegios, pivoting y post-explotación. TryHackMe proporciona rutas de aprendizaje guiadas con salas temáticas: Web Fundamentals, Offensive Pentesting, Cyber Defense y especializaciones como Android Hacking o Cloud Security. Ambas plataformas tienen opciones gratuitas y de pago.

Los CTFs competitivos son competencias cronometradas donde los equipos resuelven retos de seguridad en categorías como: Web (vulnerabilidades web), Pwn (explotación de binarios), Reverse (ingeniería inversa), Crypto (criptografía), Forensics (análisis forense) y OSINT (inteligencia de fuentes abiertas). Las competencias más prestigiosas incluyen DEF CON CTF, PicoCTF (para principiantes), y las competiciones organizadas por universidades y empresas. Participar en CTFs desarrolla habilidades de resolución de problemas bajo presión y fomenta la colaboración en equipo.

Los laboratorios caseros (home labs) permiten crear entornos personalizados para practicar. Con VirtualBox o VMware, se pueden montar redes virtuales con máquinas Kali Linux (atacante), Metasploitable (víctima vulnerable), y pfSense (firewall). Docker permite levantar aplicaciones vulnerables intencionalmente como DVWA, WebGoat y Juice Shop. Los laboratorios cloud con AWS/Azure/GCP facilitan practicar seguridad en entornos reales de nube con costos mínimos. Documentar las prácticas y write-ups en un blog o GitHub demuestra habilidades y contribuye a la comunidad.`,
      },
      {
        number: 4,
        name: "Construyendo tu marca profesional en seguridad",
        difficulty: "basico",
        estimatedTime: "25 min",
        content: `En el competitivo mercado de la ciberseguridad, la marca profesional diferencial marca la diferencia entre conseguir las mejores oportunidades o pasar desapercibido. Construir una reputación como profesional de seguridad requiere una estrategia deliberada que combine habilidades técnicas demostrables con visibilidad en la comunidad y contribuciones significativas.

El portafolio técnico es la base de la marca profesional. Incluye: write-ups de CTFs y máquinas de HackTheBox (documentando la metodología y las técnicas utilizadas), herramientas y scripts de seguridad publicados en GitHub, reportes de vulnerabilidades responsables (bug bounty), y proyectos personales que demuestran habilidades prácticas. Un GitHub activo con código de calidad es más valorado que un CV tradicional en la comunidad de seguridad.

La participación en la comunidad genera visibilidad y networking. Asistir a conferencias de seguridad (DEF CON, Black Hat, BSides, ekoparty, DragonJar) permite aprender las últimas técnicas, conocer a profesionales destacados y descubrir oportunidades laborales. Publicar artículos en blogs, Medium o LinkedIn sobre investigaciones propias, análisis de vulnerabilidades o tutoriales técnicos posiciona al profesional como referente en su área. Las charlas en meetups y conferencias locales son una excelente forma de ganar visibilidad y practicar habilidades de comunicación.

Los programas de bug bounty ofrecen una forma legítima y lucrativa de encontrar vulnerabilidades en productos reales. Plataformas como HackerOne, Bugcrowd y Synack conectan a investigadores de seguridad con empresas que pagan recompensas por vulnerabilidades reportadas responsablemente. Los mejores hunters ganan cientos de miles de dólares al año, pero incluso los principiantes pueden encontrar vulnerabilidades significativas con persistencia y metodología. Los reportes públicos de bug bounty son una fuente invaluable de aprendizaje sobre técnicas de explotación reales y formatos de reporte profesional.`,
      },
    ],
  },
];

async function main() {
  console.log("🔒 Seeding Ciberseguridad course: Fundamentos de Ciberseguridad...");

  const ciberseguridad = await prisma.category.findUnique({
    where: { slug: "ciberseguridad" },
  });

  if (!ciberseguridad) {
    console.error(
      "❌ Category 'ciberseguridad' not found. Run the main seed first."
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
      categoryId: ciberseguridad.id,
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
      categoryId: ciberseguridad.id,
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
    `\n🎉 Ciberseguridad course seeded: ${modules.length} modules, ${totalTopics} topics`
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
