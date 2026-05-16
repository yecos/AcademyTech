import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ─── Curso: Introducción a la Inteligencia Artificial ──────────────
const courseData = {
  slug: "introduccion-inteligencia-artificial",
  title: "Inteligencia Artificial: De los Fundamentos a la Práctica",
  description:
    "Explora el fascinante mundo de la Inteligencia Artificial. Desde los conceptos fundamentales del machine learning hasta las aplicaciones prácticas con deep learning y modelos generativos. Aprende a construir modelos predictivos, comprender redes neuronales y aplicar IA en proyectos reales con Python, TensorFlow y herramientas modernas de IA generativa.",
  image: "/images/modules/modulo-1.png",
  icon: "🤖",
  order: 1,
  published: true,
  level: "principiante" as const,
  duration: "60 horas",
  status: "published" as const,
};

const modules = [
  {
    number: 1,
    title: "Fundamentos de la Inteligencia Artificial",
    description:
      "Comprende qué es la IA, su historia, las ramas principales y cómo está transformando industrias y la vida cotidiana.",
    topics: [
      {
        number: 1,
        name: "¿Qué es la Inteligencia Artificial?",
        difficulty: "basico",
        estimatedTime: "30 min",
        content: `La Inteligencia Artificial (IA) es el campo de la informática dedicado a crear sistemas capaces de realizar tareas que normalmente requieren inteligencia humana: aprender, razonar, percibir, tomar decisiones y generar lenguaje. La IA no es un concepto único sino un paraguas que abarca múltiples subcampos, técnicas y filosofías, desde sistemas basados en reglas explícitas hasta redes neuronales que aprenden patrones de millones de datos.

La distinción fundamental en IA es entre IA estrecha (Narrow AI o Weak AI) e IA general (AGI o Strong AI). La IA estrecha es la que existe hoy: sistemas especializados en una tarea específica, como reconocer rostros en fotos, traducir idiomas o jugar ajedrez. Estos sistemas pueden superar ampliamente al humano en su dominio específico pero no pueden generalizar a otras tareas. La IA general, que sería capaz de aprender y razonar sobre cualquier dominio como lo hace un humano, sigue siendo un objetivo teórico y uno de los grandes desafíos de la investigación en IA.

Las ramas principales de la IA incluyen: Machine Learning (aprendizaje automático), donde los sistemas mejoran su rendimiento con la experiencia sin ser explícitamente programados; Deep Learning (aprendizaje profundo), que utiliza redes neuronales con múltiples capas para aprender representaciones jerárquicas de los datos; Procesamiento de Lenguaje Natural (NLP), que permite a las máquinas comprender y generar lenguaje humano; Visión por Computadora, que interpreta imágenes y video; Robótica, que combina IA con sistemas mecánicos; y Sistemas Expertos, que codifican conocimiento de dominios específicos.

La IA está transformando prácticamente todas las industrias. En salud, asiste en diagnósticos médicos y descubre fármacos. En finanzas, detecta fraudes y optimiza inversiones. En transporte, impulsa los vehículos autónomos. En educación, personaliza el aprendizaje. En manufactura, optimiza la producción y predice fallos de equipos. En creatividad, genera arte, música y texto. Comprender los fundamentos de la IA es cada vez más importante no solo para los profesionales técnicos sino para cualquier persona que quiera entender cómo las tecnologías están moldeando el futuro.`,
      },
      {
        number: 2,
        name: "Historia y evolución de la IA",
        difficulty: "basico",
        estimatedTime: "25 min",
        content: `La historia de la IA es un viaje fascinante de visiones ambiciosas, avances revolucionarios e inviernos de desilusión. Comprender esta historia es esencial para contextualizar los logros actuales y evaluar críticamente las promesas futuras, evitando tanto el hype excesivo como el escepticismo infundado.

Los fundamentos teóricos de la IA se remontan a la década de 1940. En 1943, Warren McCulloch y Walter Pitts propusieron el primer modelo matemático de una neurona artificial. En 1950, Alan Turing publicó su célebre artículo "Computing Machinery and Intelligence", donde planteó el Test de Turing como criterio para determinar si una máquina puede pensar. También en 1950, Claude Shannon construyó una computadora que jugaba ajedrez, demostrando que las máquinas podían realizar tareas consideradas intelectuales.

El nacimiento oficial de la IA como disciplina se produjo en la Conferencia de Dartmouth en 1956, organizada por John McCarthy, Marvin Minsky, Nathaniel Rochester y Claude Shannon. Los participantes, incluyendo a Herbert Simon y Allen Newell, estaban convencidos de que la inteligencia humana podía ser replicada en máquinas. Esta conferencia acuñó el término "Inteligencia Artificial" y estableció las ambiciones fundacionales del campo. Los años siguientes vieron avances entusiastas: programas que demostraban teoremas matemáticos, resolvían problemas de lógica y jugaban damas.

Los "inviernos de la IA" fueron períodos de reducción drástica en financiamiento e interés, causados por expectativas no cumplidas. El primer invierno (1974-1980) siguió al informe Lighthill en el Reino Unido y al recorte de financiamiento de DARPA en EE.UU., que criticaron la falta de progreso en comparación con las promesas. El segundo invierno (1987-1993) llegó cuando los sistemas expertos, que habían generado gran entusiasmo comercial, resultaron costosos de mantener y limitados en su capacidad de adaptación.

El resurgimiento moderno comenzó en los años 2010 gracias a la convergencia de tres factores: datos masivos (internet generó cantidades sin precedentes de información), poder computacional (las GPUs permitieron entrenar redes neuronales grandes) y avances algorítmicos (dropout, batch normalization y arquitecturas como Transformers). En 2012, AlexNet ganó la competición ImageNet por un margen dramático, demostrando el potencial del deep learning. En 2016, AlphaGo derrotó al campeón mundial de Go. Y en 2022, ChatGPT mostró al mundo las capacidades de los modelos de lenguaje generativos, marcando el inicio de una nueva era para la IA.`,
      },
      {
        number: 3,
        name: "Tipos de aprendizaje: supervisado, no supervisado y reforzado",
        difficulty: "basico",
        estimatedTime: "35 min",
        content: `El Machine Learning se clasifica en tres paradigmas fundamentales según cómo el modelo aprende de los datos. Cada paradigma tiene aplicaciones específicas, requisitos de datos diferentes y produce resultados distintos. Comprender cuándo usar cada tipo de aprendizaje es la primera decisión que un practicante de IA debe tomar al abordar un problema.

El aprendizaje supervisado es el paradigma más utilizado. Se entrena con un conjunto de datos etiquetado: cada ejemplo de entrada (features) viene acompañado de la salida correcta (label/target). El modelo aprende una función que mapea las entradas a las salidas, y luego puede predecir la salida para datos nuevos no vistos. Las dos categorías principales son clasificación (predecir una categoría: spam/no spam, benigno/maligno) y regresión (predecir un valor continuo: precio de una casa, temperatura). Ejemplos de algoritmos supervisados incluyen regresión lineal, árboles de decisión, random forest, SVM y redes neuronales.

El aprendizaje no supervisado trabaja con datos sin etiquetas. El modelo busca patrones, estructuras y relaciones en los datos sin que se le indique qué buscar. Las aplicaciones principales son clustering (agrupar datos similares: segmentación de clientes, detección de anomalías), reducción de dimensionalidad (comprimir datos manteniendo la información esencial: PCA, t-SNE, UMAP) y asociación (descubrir reglas que relacionan variables: clientes que compran X también compran Y). K-means, DBSCAN, hierarchical clustering y autoencoders son algoritmos representativos.

El aprendizaje por refuerzo (Reinforcement Learning) es un paradigma donde un agente aprende a tomar decisiones realizando acciones en un entorno y recibiendo recompensas o castigos. El objetivo es maximizar la recompensa acumulada a lo largo del tiempo. A diferencia del aprendizaje supervisado, no hay ejemplos de la salida correcta; el agente debe descubrir por sí mismo qué acciones son mejores mediante prueba y error. El aprendizaje por refuerzo ha logrado resultados extraordinarios en juegos (AlphaGo, AlphaStar), robótica (manipulación de objetos), vehículos autónomos y optimización de sistemas industriales. Los algoritmos principales son Q-Learning, SARSA, Policy Gradient y PPO.`,
      },
      {
        number: 4,
        name: "Python para IA: NumPy, Pandas y Matplotlib",
        difficulty: "basico",
        estimatedTime: "40 min",
        content: `Python es el lenguaje dominante en IA y ciencia de datos, gracias a su sintaxis clara, su ecosistema de bibliotecas y su comunidad activa. Las tres bibliotecas fundamentales que todo practicante de IA debe dominar son NumPy para cálculo numérico, Pandas para manipulación de datos y Matplotlib para visualización. Juntos forman la base sobre la cual se construyen todas las herramientas de IA más avanzadas.

NumPy (Numerical Python) proporciona arrays multidimensionales (ndarrays) y funciones matemáticas de alto rendimiento para operar con ellos. A diferencia de las listas de Python, los arrays NumPy son homogéneos (todos los elementos son del mismo tipo), contiguos en memoria y vectorizados (las operaciones se aplican a todo el array sin bucles explícitos). Esto hace que NumPy sea 10-100x más rápido que Python puro para operaciones numéricas. Las operaciones esenciales incluyen: creación de arrays (np.array, np.zeros, np.arange), indexación y slicing, operaciones aritméticas vectorizadas, broadcasting (operaciones entre arrays de diferentes formas), y funciones de álgebra lineal (np.dot, np.linalg.inv, np.linalg.eig).

Pandas proporciona estructuras de datos flexibles para trabajar con datos tabulares: Series (una dimensión) y DataFrame (dos dimensiones, similar a una hoja de cálculo). Un DataFrame tiene filas y columnas con índices, permite cargar datos desde múltiples formatos (CSV, Excel, SQL, JSON), limpiar y transformar datos, realizar agrupaciones y agregaciones, y combinar múltiples fuentes. Las operaciones esenciales incluyen: lectura/escritura (pd.read_csv, df.to_csv), selección (df[['col']], df.loc[], df.iloc[]), filtrado (df[df['edad'] > 18]), agrupación (df.groupby('categoria').mean()), y combinación (pd.merge, pd.concat).

Matplotlib es la biblioteca estándar para visualización de datos en Python. Permite crear gráficos de línea, barras, dispersión, histogramas, boxplots, heatmaps y más. La interfaz principal es pyplot (import matplotlib.pyplot as plt), que proporciona funciones como plt.plot(), plt.bar(), plt.scatter(), plt.hist(), plt.imshow(). Seaborn, construida sobre Matplotlib, ofrece una API de más alto nivel con gráficos estadísticos atractivos por defecto: sns.heatmap(), sns.pairplot(), sns.violinplot(). La visualización es crucial en IA para explorar datos antes del modelado, diagnosticar problemas durante el entrenamiento y comunicar resultados.`,
      },
      {
        number: 5,
        name: "Ética en IA: sesgos, privacidad y responsabilidad",
        difficulty: "intermedio",
        estimatedTime: "30 min",
        content: `La ética en la IA aborda los dilemas morales que surgen del desarrollo y despliegue de sistemas inteligentes. A medida que la IA se integra en decisiones que afectan la vida de las personas —desde préstamos hipotecarios hasta diagnósticos médicos y sentencias judiciales—, la responsabilidad de asegurar que estos sistemas sean justos, transparentes y seguros se convierte en un imperativo ético y legal.

El sesgo algorítmico es uno de los problemas más urgentes. Los modelos de IA aprenden de datos históricos que reflejan prejuicios sociales existentes: si los datos de contratación históricos favorecen a hombres, el modelo aprenderá a hacerlo también. Ejemplos documentados incluyen sistemas de reconocimiento facial con menor precisión en personas de piel oscura, algoritmos de evaluación crediticia que discriminan por vecindario (proxy de raza), y herramientas de selección de personal que penalizan currículos con nombres femeninos. Mitigar el sesgo requiere auditorías regulares, datasets diversos y representativos, métricas de equidad (demographic parity, equalized odds) y equipos de desarrollo diversos.

La privacidad de los datos es otra preocupación fundamental. Los modelos de IA requieren grandes cantidades de datos personales para entrenarse, lo que entra en tensión con el derecho a la privacidad. Los modelos de lenguaje pueden memorizar y reproducir información personal de los datos de entrenamiento. Las técnicas de privacidad diferencial (differential privacy) añaden ruido controlado a los datos para que no se pueda inferir información individual, y el aprendizaje federado (federated learning) entrena modelos en los dispositivos de los usuarios sin centralizar sus datos.

La responsabilidad (accountability) pregunta quién es responsable cuando un sistema de IA causa daño: ¿el desarrollador, la empresa, el usuario, el propio algoritmo? El marco legal está evolucionando: el AI Act de la Unión Europea clasifica los sistemas de IA según su riesgo (inaceptable, alto, limitado, mínimo) y establece obligaciones proporcionales. Los sistemas de alto riesgo (biometría, educación, empleo, justicia) deben cumplir requisitos de transparencia, supervisión humana, robustez y documentación. La explicabilidad (XAI) busca que las decisiones de los modelos sean comprensibles para los humanos, utilizando técnicas como SHAP, LIME y attention visualization.`,
      },
    ],
  },
  {
    number: 2,
    title: "Machine Learning Práctico",
    description:
      "Implementa algoritmos de machine learning paso a paso, desde la preparación de datos hasta la evaluación de modelos.",
    topics: [
      {
        number: 1,
        name: "Preparación y limpieza de datos",
        difficulty: "intermedio",
        estimatedTime: "40 min",
        content: `La preparación de datos es la fase más laboriosa y crucial de cualquier proyecto de machine learning. Los datos del mundo real son incompletos, inconsistentes, ruidosos y frecuentemente no están en el formato necesario para los algoritmos. La regla empírica es que el 80% del tiempo de un proyecto de ML se dedica a la preparación de datos y solo el 20% al modelado. Sin embargo, la calidad de los datos determina la calidad del modelo: "garbage in, garbage out".

El tratamiento de valores faltantes es el primer desafío. Los valores NaN o null pueden provenir de errores de recolección, datos no aplicables o fallos del sistema. Las estrategias de manejo incluyen: eliminación de filas/columnas con muchos datos faltantes (peligroso si los datos faltantes no son aleatorios), imputación con estadísticos (media, mediana, moda), imputación con modelos predictivos (KNN imputer, regresión), y creación de indicadores de datos faltantes (missingness indicators) que capturan si el dato falta como señal útil. La elección depende del mecanismo de datos faltantes: MCAR (completamente aleatorio), MAR (aleatorio condicional) o MNAR (no aleatorio).

La codificación de variables categóricas transforma texto en números que los algoritmos pueden procesar. Label encoding asigna un número a cada categoría (rojo=0, verde=1, azul=2), pero introduce un orden artificial que no existe. One-hot encoding crea una columna binaria por categoría, evitando el orden artificial pero aumentando la dimensionalidad (maldición de la dimensionalidad). Target encoding reemplaza cada categoría por la media del target para esa categoría, útil para categorías de alta cardinalidad. La elección depende del algoritmo y la naturaleza de la variable.

La normalización y estandarización escalan las características numéricas a rangos comparables. StandardScaler transforma los datos para que tengan media 0 y desviación estándar 1 (z-score). MinMaxScaler escala al rango [0,1]. RobustScaler usa la mediana y el rango intercuartílico, siendo resistente a outliers. El escalado es importante para algoritmos sensibles a la escala de las características (SVM, KNN, redes neuronales, gradient descent) pero no para los basados en árboles (decision trees, random forest). La visualización con histogramas, boxplots y scatter plots permite detectar outliers, distribuciones sesgadas y relaciones entre variables que guían las transformaciones necesarias.`,
      },
      {
        number: 2,
        name: "Regresión lineal y logística",
        difficulty: "intermedio",
        estimatedTime: "35 min",
        content: `La regresión lineal es el algoritmo fundamental del aprendizaje supervisado para predecir valores continuos. Modela la relación entre una variable dependiente (target) y una o más variables independientes (features) como una función lineal: y = wx + b, donde w son los pesos y b es el sesgo (intercepto). El objetivo es encontrar los valores de w y b que minimizan el error entre las predicciones y los valores reales.

La función de costo (loss function) en regresión lineal es el Error Cuadrático Medio (MSE): la media de los cuadrados de las diferencias entre predicciones y valores reales. El algoritmo de minimización más común es el descenso de gradiente (gradient descent), que ajusta iterativamente los pesos en la dirección que reduce el error: w = w - learning_rate * gradiente. El learning rate controla el tamaño de los pasos: demasiado grande causa oscilación y divergencia, demasiado pequeño hace el entrenamiento lento. Variantes como SGD, Mini-batch GD y Adam optimizan la convergencia.

La regresión logística extiende la regresión lineal para problemas de clasificación binaria. En lugar de predecir un valor continuo, predice la probabilidad de que una observación pertenezca a una clase. La función sigmoide (1 / (1 + e^(-z))) transforma la salida lineal en un valor entre 0 y 1. Si la probabilidad es mayor a 0.5, se clasifica como clase positiva; de lo contrario, como negativa. La función de costo es la log-loss (cross-entropy), que penaliza fuavemente las predicciones incorrectas con alta confianza.

Las métricas de evaluación para regresión incluyen R2 (proporción de varianza explicada), MAE (error absoluto medio, interpretable en las unidades del target) y RMSE (raíz del error cuadrático medio, penaliza más los errores grandes). Para clasificación: accuracy (proporción de predicciones correctas), precision (de los positivos predichos, cuántos son realmente positivos), recall (de los positivos reales, cuántos fueron detectados), F1-score (media armónica de precision y recall), y AUC-ROC (área bajo la curva ROC, mide la capacidad de discriminación del modelo). La elección de la métrica depende del problema: en detección de cáncer, recall es más importante (no perder casos positivos); en detección de spam, precision es más importante (no marcar correos legítimos como spam).`,
      },
      {
        number: 3,
        name: "Árboles de decisión y Random Forest",
        difficulty: "intermedio",
        estimatedTime: "35 min",
        content: `Los árboles de decisión son modelos intuitivos que dividen recursivamente el espacio de características mediante reglas binarias, creando una estructura de árbol donde cada nodo interno representa una condición sobre una feature, cada rama representa el resultado de la condición, y cada hoja representa una predicción. Su ventaja principal es la interpretabilidad: se puede trazar exactamente cómo el modelo llega a cada predicción.

La construcción del árbol sigue un algoritmo greedy: en cada nodo, selecciona la feature y el umbral que mejor separan las clases (para clasificación) o reducen la varianza (para regresión). Los criterios de división más comunes son Gini impurity y Information Gain (basado en entropía) para clasificación, y reducción de varianza para regresión. El proceso continúa hasta que los nodos son "puros" (todas las muestras son de la misma clase) o se alcanza un criterio de parada (profundidad máxima, número mínimo de muestras por hoja).

El principal problema de los árboles de decisión es el sobreajuste (overfitting): pueden memorizar los datos de entrenamiento, incluyendo el ruido, creando árboles excesivamente profundos y complejos que no generalizan bien a datos nuevos. Las técnicas de poda (pruning) eliminan ramas que no mejoran significativamente el rendimiento, y la limitación de la profundidad máxima previene árboles demasiado complejos. Sin embargo, la solución más efectiva es el ensemble learning: combinar múltiples árboles para obtener un modelo más robusto.

Random Forest es el algoritmo de ensemble más popular para árboles de decisión. Entrena múltiples árboles independientes, cada uno con una muestra aleatoria del dataset (bagging) y una selección aleatoria de features en cada división. La predicción final es el promedio (regresión) o la votación mayoritaria (clasificación) de todos los árboles. Esta aleatorización decorrelaciona los árboles, reduciendo la varianza del modelo sin aumentar el sesgo. Random Forest es robusto, requiere poca preparación de datos, maneja features de diferentes tipos y escalas, y proporciona estimaciones de importancia de features. Sus principales hiperparámetros son el número de árboles (n_estimators), la profundidad máxima (max_depth) y el número de features consideradas en cada división (max_features).`,
      },
      {
        number: 4,
        name: "Validación cruzada y ajuste de hiperparámetros",
        difficulty: "avanzado",
        estimatedTime: "35 min",
        content: `La evaluación correcta de los modelos de machine learning es tan importante como su construcción. Un modelo que rinde perfectamente en los datos de entrenamiento pero falla con datos nuevos es inútil en la práctica. La validación cruzada y el ajuste de hiperparámetros son las técnicas fundamentales para asegurar que los modelos generalicen correctamente y para encontrar la configuración óptima de cada algoritmo.

El hold-out validation divide los datos en entrenamiento y test (típicamente 80/20 o 70/30). El modelo se entrena con los datos de entrenamiento y se evalúa con los de test, que nunca ha visto. Sin embargo, esta evaluación depende de la división particular de los datos y puede ser optimista o pesimista. La k-fold cross-validation mejora esto dividiendo los datos en k partes iguales, entrenando k veces con k-1 partes y evaluando con la parte restante, rotando la parte de evaluación. El resultado es un promedio y una desviación estándar del rendimiento, más robustos que una única evaluación.

Los hiperparámetros son configuraciones del algoritmo que no se aprenden de los datos sino que se establecen antes del entrenamiento: learning rate, profundidad del árbol, número de estimadores, regularización, etc. La búsqueda de hiperparámetros (hyperparameter tuning) encuentra la combinación que produce el mejor rendimiento. Grid Search evalúa todas las combinaciones posibles de una cuadrícula predefinida (exhaustiva pero costosa). Random Search evalúa combinaciones aleatorias (más eficiente para espacios grandes). Bayesian Optimization modela la relación entre hiperparámetros y rendimiento para guiar la búsqueda de forma inteligente.

El sobreajuste (overfitting) y el subajuste (underfitting) son los dos modos de fallo de los modelos. El overfitting ocurre cuando el modelo es demasiado complejo y memoriza el ruido de los datos de entrenamiento, rindiendo mal en datos nuevos. El underfitting ocurre cuando el modelo es demasiado simple y no captura los patrones de los datos. Las curvas de aprendizaje (learning curves) muestran el rendimiento en entrenamiento y validación en función del tamaño del dataset o la complejidad del modelo, ayudando a diagnosticar cuál de los dos problemas existe. Las estrategias de regularización (L1/L2, dropout, early stopping) combaten el overfitting penalizando la complejidad del modelo.`,
      },
    ],
  },
  {
    number: 3,
    title: "Deep Learning y Redes Neuronales",
    description:
      "Adéntrate en el deep learning: desde la neurona artificial hasta las arquitecturas modernas que están redefiniendo las capacidades de la IA.",
    topics: [
      {
        number: 1,
        name: "La neurona artificial y el perceptrón",
        difficulty: "intermedio",
        estimatedTime: "35 min",
        content: `La neurona artificial es la unidad básica de las redes neuronales, inspirada en la neurona biológica. Recibe múltiples entradas, cada una con un peso asociado, calcula una suma ponderada, añade un sesgo (bias) y aplica una función de activación para producir la salida. Matemáticamente: output = activation(sum(wi * xi) + b). Los pesos determinan la importancia de cada entrada, el sesgo desplaza la salida, y la función de activación introduce la no linealidad.

El perceptrón, propuesto por Frank Rosenblatt en 1958, es la neurona artificial más simple. Utiliza una función de activación escalón (step function): si la suma ponderada es positiva, la salida es 1; si es negativa, es 0. El perceptrón puede aprender a clasificar datos linealmente separables ajustando sus pesos mediante la regla de aprendizaje del perceptrón: si la predicción es incorrecta, los pesos se ajustan en la dirección que reduce el error. Sin embargo, Minsky y Papert demostraron en 1969 que el perceptrón no puede resolver problemas no linealmente separables como XOR, lo que contribuyó al primer invierno de la IA.

Las funciones de activación modernas han evolucionado significativamente. La sigmoide (1 / (1+e^(-x))) comprime la salida entre 0 y 1, pero sufre de desvanecimiento del gradiente (vanishing gradient) en redes profundas. Tanh comprime entre -1 y 1 con el mismo problema. ReLU (Rectified Linear Unit: max(0, x)) es la función más utilizada hoy: es simple, computacionalmente eficiente y mitiga el desvanecimiento del gradiente. Sin embargo, las neuronas ReLU pueden "morir" si siempre reciben entradas negativas. Leaky ReLU, ELU y GELU son variantes que abordan este problema.

El descenso de gradiente y la retropropagación (backpropagation) son los algoritmos fundamentales para entrenar redes neuronales. La retropropagación calcula el gradiente de la función de costo respecto a cada peso utilizando la regla de la cadena del cálculo, propagando el error desde la capa de salida hacia atrás. Los pesos se actualizan en la dirección opuesta al gradiente: w = w - lr * dL/dw. Los optimizadores modernos como Adam (Adaptive Moment Estimation) combinan momentum y tasas de aprendizaje adaptativas por parámetro, logrando convergencia más rápida y estable que el descenso de gradiente estocástico (SGD) simple.`,
      },
      {
        number: 2,
        name: "Redes neuronales convolucionales (CNN)",
        difficulty: "avanzado",
        estimatedTime: "45 min",
        content: `Las redes neuronales convolucionales (CNN) son la arquitectura revolucionaria que permitió a la IA alcanzar y superar el rendimiento humano en tareas de visión por computadora. Inspiradas en la corteza visual del cerebro, las CNN detectan patrones locales (bordes, texturas, formas) en las primeras capas y los combinan progresivamente en patrones complejos (objetos, rostros, escenas) en las capas posteriores.

La operación fundamental de una CNN es la convolución: un filtro (kernel) pequeño se desliza sobre la imagen realizando productos punto entre los valores del filtro y las regiones de la imagen, produciendo un mapa de características (feature map). Por ejemplo, un filtro de 3x3 puede detectar bordes verticales, otro bordes horizontales, y otro esquinas. Cada capa convolucional aplica múltiples filtros, cada uno detectando un patrón diferente. Los mapas de características de las capas posteriores representan patrones cada vez más abstractos y complejos.

El pooling reduce la dimensionalidad espacial de los feature maps, disminuyendo la cantidad de parámetros y la carga computacional. Max pooling selecciona el valor máximo de cada región (típicamente 2x2), preservando las activaciones más fuertes. Average pooling calcula el promedio. El stride (paso) del filtro y el padding (relleno) controlan las dimensiones de la salida. Un stride mayor que 1 reduce la resolución, mientras que el padding "same" agrega ceros alrededor de la entrada para mantener las dimensiones.

Las arquitecturas CNN han evolucionado dramáticamente. LeNet-5 (1998) reconoció dígitos escritos a mano. AlexNet (2012) ganó ImageNet con 8 capas y introdujo ReLU y dropout. VGGNet (2014) demostró que redes más profundas con filtros pequeños (3x3) funcionan mejor. ResNet (2015) resolvió el problema del degradamiento del gradiente en redes muy profundas (152+ capas) con conexiones residuales (skip connections). EfficientNet (2019) optimizó simultáneamente profundidad, anchura y resolución. Las CNN modernas se utilizan en clasificación de imágenes, detección de objetos (YOLO, Faster R-CNN), segmentación semántica (U-Net) y generación de imágenes (GANs).`,
      },
      {
        number: 3,
        name: "Redes recurrentes y secuencias (RNN, LSTM, GRU)",
        difficulty: "avanzado",
        estimatedTime: "45 min",
        content: `Las redes neuronales recurrentes (RNN) están diseñadas para procesar datos secuenciales donde el orden importa: texto, audio, series temporales y video. A diferencia de las redes feedforward que procesan cada entrada independientemente, las RNN mantienen un estado oculto (hidden state) que actúa como memoria, permitiendo que la información de pasos anteriores influya en las decisiones actuales.

La RNN simple procesa la secuencia paso a paso: en cada instante t, recibe la entrada xt y el estado anterior ht-1, y produce la salida yt y el nuevo estado ht: ht = tanh(Wxh * xt + Whh * ht-1 + bh). El estado ht es una representación comprimida de toda la secuencia hasta el momento t. Sin embargo, las RNN simples sufren del problema del desvanecimiento del gradiente (vanishing gradient): en secuencias largas, la información de los primeros pasos se diluye progresivamente hasta desaparecer, impidiendo aprender dependencias a largo plazo.

Las LSTM (Long Short-Term Memory), propuestas por Hochreiter y Schmidhuber en 1997, resuelven el problema del desvanecimiento del gradiente con un mecanismo de celda de memoria controlado por tres puertas (gates). La puerta de olvido (forget gate) decide qué información del estado anterior descartar. La puerta de entrada (input gate) decide qué nueva información almacenar. La puerta de salida (output gate) decide qué parte de la memoria emitir como salida. Este mecanismo permite que las LSTM mantengan información durante cientos de pasos temporales, aprendiendo dependencias a largo plazo que las RNN simples no pueden capturar.

Las GRU (Gated Recurrent Unit) son una simplificación de las LSTM que combina las puertas de olvido y entrada en una sola puerta de actualización (update gate), y fusiona el estado de celda y el estado oculto. Con menos parámetros que las LSTM, las GRU entrenan más rápido y a menudo obtienen resultados comparables, especialmente en datasets pequeños. Tanto LSTM como GRU son la base de modelos de NLP, traducción automática, generación de texto, reconocimiento de voz y análisis de series temporales. Sin embargo, para secuencias muy largas, la arquitectura Transformer (basada en atención) ha reemplazado a las RNN en la mayoría de las aplicaciones de NLP.`,
      },
      {
        number: 4,
        name: "Transformers y la revolución de la atención",
        difficulty: "avanzado",
        estimatedTime: "45 min",
        content: `Los Transformers, introducidos en el artículo "Attention Is All You Need" (Vaswani et al., 2017), son la arquitectura que revolucionó la IA y está detrás de modelos como GPT, BERT, DALL-E y la mayoría de los avances recientes en IA generativa. La innovación clave es el mecanismo de auto-atención (self-attention), que permite al modelo evaluar la importancia de cada elemento de la secuencia respecto a todos los demás, sin la limitación secuencial de las RNN.

El mecanismo de auto-atención funciona así: para cada token de la secuencia, se generan tres vectores —Query (Q), Key (K) y Value (V)— mediante multiplicaciones matriciales aprendidas. La atención se calcula como: Attention(Q,K,V) = softmax(QK^T / sqrt(dk)) * V. Las queries y keys determinan "cuánta atención" prestarse mutuamente (similitud), y los valores proporcionan la información a transmitir. El escalado por sqrt(dk) previene que los productos punto sean demasiado grandes. El resultado es que cada token puede atender a cualquier otro token de la secuencia, capturando dependencias a cualquier distancia.

La atención multi-cabeza (multi-head attention) aplica múltiples transformaciones de atención en paralelo, cada una con sus propias matrices de proyección. Cada "cabeza" puede aprender a atender a diferentes aspectos de la secuencia: una puede enfocarse en dependencias gramaticales, otra en relaciones semánticas, otra en posición relativa. Los resultados de todas las cabezas se concatenan y proyectan linealmente. Típicamente se usan 8, 12, 16 o más cabezas.

La arquitectura completa del Transformer incluye: embeddings posicionales (positional encoding) que inyectan información de posición (ya que la atención en sí no tiene noción de orden), capas feedforward después de cada subcapa de atención, conexiones residuales y layer normalization, y una estructura encoder-decoder (para traducción) o solo encoder (BERT) o solo decoder (GPT). Los modelos de lenguaje grandes (LLMs) como GPT-4 usan exclusivamente la parte decoder con atención causal (cada token solo puede atender a tokens anteriores), entrenados para predecir el siguiente token en enormes corpus de texto. Esta simple tarea, escalada a miles de millones de parámetros y terabytes de datos, produce capacidades emergentes que incluyen razonamiento, código, creatividad y conocimiento general.`,
      },
    ],
  },
  {
    number: 4,
    title: "IA Generativa y Modelos de Lenguaje",
    description:
      "Explora la revolución de la IA generativa: modelos de lenguaje, generación de imágenes y aplicaciones prácticas.",
    topics: [
      {
        number: 1,
        name: "Modelos de lenguaje grandes (LLMs)",
        difficulty: "intermedio",
        estimatedTime: "40 min",
        content: `Los modelos de lenguaje grandes (Large Language Models o LLMs) son la manifestación más impactante de la IA actual. Son redes neuronales Transformer entrenadas con miles de millones de parámetros sobre terabytes de texto para predecir el siguiente token en una secuencia. Esta tarea aparentemente simple, cuando se escala lo suficiente, produce capacidades emergentes sorprendentes: razonamiento, escritura creativa, programación, traducción, resumen y mucho más.

La arquitectura de los LLMs se basa en el decoder del Transformer con atención causal. GPT (Generative Pre-trained Transformer) de OpenAI es la familia más conocida: GPT-2 (1.5B parámetros, 2019), GPT-3 (175B parámetros, 2020), GPT-3.5 (ChatGPT, 2022), y GPT-4 ( multimodal, 2023). Otros modelos notables incluyen la familia Llama de Meta (open-source), Claude de Anthropic, Gemini de Google, y Mistral. La tendencia es hacia modelos más eficientes en lugar de simplemente más grandes: Llama 3 con 8B parámetros rivaliza con GPT-3 de 175B.

El entrenamiento de los LLMs tiene dos fases. El pre-entrenamiento aprende las estadísticas del lenguaje a partir de un corpus masivo y diverso (internet, libros, código, artículos científicos). La función de costo es la cross-entropy de predecir el siguiente token. Esta fase requiere miles de GPUs durante semanas o meses y cuesta millones de dólares. El fine-tuning ajusta el modelo para tareas específicas o formatos deseados, como seguir instrucciones (instruction tuning) o alinearse con preferencias humanas (RLHF: Reinforcement Learning from Human Feedback).

Las capacidades emergentes son fenómenos que aparecen en modelos suficientemente grandes pero no en los pequeños. In-context learning permite al modelo aprender de ejemplos proporcionados en el prompt sin cambiar sus pesos. Chain-of-thought prompting guía al modelo a razonar paso a paso, mejorando significativamente su rendimiento en problemas lógicos y matemáticos. Few-shot learning resuelve tareas nuevas con solo 2-5 ejemplos. Estas capacidades no fueron explícitamente programadas sino que emergieron del escalado, y su comprensión es uno de los temas más activos de la investigación en IA.`,
      },
      {
        number: 2,
        name: "Prompt Engineering e ingeniería de instrucciones",
        difficulty: "basico",
        estimatedTime: "35 min",
        content: `El Prompt Engineering es el arte y la ciencia de diseñar instrucciones (prompts) efectivas para obtener los mejores resultados de los modelos de lenguaje. A diferencia de la programación tradicional, donde especificas exactamente qué hacer, con LLMs describes qué quieres y el modelo determina cómo hacerlo. La calidad del prompt determina directamente la calidad de la respuesta, y pequeñas diferencias en la formulación pueden producir resultados dramáticamente diferentes.

Los principios del prompting efectivo son: claridad (instrucciones específicas y no ambiguas), contexto (información relevante de fondo), ejemplos (few-shot: mostrar el formato deseado con ejemplos), y restricciones (lo que NO debe hacer). Un prompt vago como "escribe algo sobre IA" produce respuestas genéricas, mientras que "explica en 3 párrafos cómo funciona la atención en los Transformers, usando analogías y dirigido a estudiantes de secundaria" produce respuestas mucho más útiles y enfocadas.

Las técnicas avanzadas de prompting incluyen: Chain-of-Thought (pedir al modelo que razone paso a paso: "piensa paso a paso"), Zero-shot CoT (añadir "vamos a pensar paso a paso" al final del prompt), Self-consistency (generar múltiples respuestas y elegir la más consistente), ReAct (combinar razonamiento y acción, permitiendo al modelo usar herramientas), y Tree-of-Thought (explorar múltiples ramas de razonamiento). Estas técnicas pueden mejorar el rendimiento en tareas complejas de un 20% a más del 80%.

La estructura del prompt óptima típicamente sigue un patrón: rol (actúa como experto en X), contexto (aquí está la situación), tarea (haz Y), formato (presentalo como Z), y ejemplos (aquí hay 2 ejemplos de entrada/salida). Los delimitadores (###, ```, <tag>) separan claramente las secciones. Los prompts del sistema (system prompts) establecen el comportamiento persistente del modelo a lo largo de la conversación. La iteración es clave: el prompt engineering es un proceso experimental donde se refinan las instrucciones basándose en los resultados observados.`,
      },
      {
        number: 3,
        name: "Generación de imágenes con IA: DALL-E, Stable Diffusion y Midjourney",
        difficulty: "intermedio",
        estimatedTime: "35 min",
        content: `La generación de imágenes con IA ha pasado de ser una curiosidad de laboratorio a una herramienta accesible que está transformando el diseño, el arte, la publicidad y la comunicación visual. Los modelos de difusión (diffusion models) son la tecnología subyacente que permite crear imágenes fotorrealistas o estilizadas a partir de descripciones textuales, con un nivel de detalle y coherencia que era inimaginable hace solo unos años.

Los modelos de difusión funcionan en dos fases. En la fase forward, se añade ruido gaussiano progresivamente a una imagen hasta que se convierte en ruido puro. En la fase reverse, una red neuronal aprende a denoificar (eliminar el ruido) paso a paso, generando imágenes a partir del ruido. Stable Diffusion, el modelo open-source más popular, opera en un espacio latente comprimido (en lugar de en el espacio de píxeles completo), lo que reduce drásticamente los requisitos computacionales y permite ejecutar el modelo en GPUs de consumo.

Las técnicas de generación avanzadas incluyen: img2img (usar una imagen como punto de partida y modificarla según un prompt), inpainting (modificar regiones específicas de una imagen), ControlNet (controlar la composición con mapas de profundidad, bordes, poses), y LoRA (Low-Rank Adaptation, para personalizar el modelo con estilos o conceptos específicos con pocos datos). Estas técnicas permiten un control preciso sobre la generación, combinando la creatividad del modelo con la dirección del artista.

Las aplicaciones prácticas son amplias: creación de concept art para videojuegos y cine, generación de assets de marketing, prototipado rápido de diseño, ilustración editorial, diseño de producto, arquitectura y decoración de interiores. Las consideraciones éticas incluyen los derechos de autor sobre obras generadas, el impacto en los artistas profesionales, la generación de deepfakes y la representación de sesgos. Las mejores prácticas incluyen: transparencia sobre el uso de IA generativa, respeto a los derechos de los artistas cuyas obras influyeron en los modelos de entrenamiento, y uso de estas herramientas como complemento de la creatividad humana, no como reemplazo.`,
      },
      {
        number: 4,
        name: "RAG y aplicaciones empresariales de LLMs",
        difficulty: "avanzado",
        estimatedTime: "40 min",
        content: `RAG (Retrieval-Augmented Generation) es la técnica que permite a los LLMs responder preguntas basándose en documentos específicos, superando sus limitaciones de conocimiento y reduciendo las alucinaciones. RAG combina la capacidad de razonamiento del LLM con la precisión de un sistema de recuperación de información, creando asistentes que pueden consultar bases de conocimiento actualizadas y documentación interna de las organizaciones.

El flujo RAG tiene dos fases. En la fase de indexación, los documentos se dividen en chunks (fragmentos), se generan embeddings vectoriales para cada chunk usando modelos como OpenAI embeddings o sentence-transformers, y se almacenan en una base de datos vectorial (Pinecone, Weaviate, ChromaDB, Qdrant). En la fase de consulta, la pregunta del usuario se convierte en embedding, se buscan los chunks más similares en la base de datos vectorial (usando similitud coseno), y los chunks recuperados se inyectan en el prompt del LLM como contexto para generar la respuesta.

Las técnicas avanzadas de RAG mejoran la calidad de la recuperación y la generación. El re-ranking aplica un modelo cruzado (cross-encoder) para reordenar los chunks recuperados por relevancia real. La consulta híbrida combina búsqueda vectorial (semántica) con búsqueda keyword (BM25) para capturar tanto similitud de significado como coincidencia de términos. El query decomposition divide preguntas complejas en sub-preguntas más simples. El recursive retrieval permite buscar en documentos con estructura jerárquica. Estas técnicas pueden mejorar el rendimiento de RAG en un 20-40% respecto al enfoque básico.

Las aplicaciones empresariales de RAG son transformadoras: asistentes de atención al cliente que consultan la documentación del producto, sistemas de búsqueda interna que encuentran información en miles de documentos corporativos, herramientas de análisis legal que buscan precedentes en jurisprudencia, y sistemas de soporte técnico que diagnotican problemas basándose en manuales y tickets anteriores. La ventaja de RAG sobre el fine-tuning es que el conocimiento se actualiza simplemente agregando documentos nuevos, sin necesidad de reentrenar el modelo, lo que es esencial para información que cambia frecuentemente como políticas, precios y regulaciones.`,
      },
    ],
  },
  {
    number: 5,
    title: "Visión por Computadora y Aplicaciones Especializadas",
    description:
      "Aplica la IA al análisis visual y explora aplicaciones especializadas que están transformando industrias específicas.",
    topics: [
      {
        number: 1,
        name: "Detección y clasificación de objetos",
        difficulty: "intermedio",
        estimatedTime: "40 min",
        content: `La detección de objetos es la tarea de identificar y localizar múltiples objetos dentro de una imagen. Mientras que la clasificación responde "¿qué hay en esta imagen?", la detección responde "¿qué objetos hay y dónde están exactamente?". Esta capacidad es fundamental para aplicaciones como vehículos autónomos (detectar peatones, señales, otros vehículos), vigilancia (detectar intrusos), manufactura (inspección de calidad) y medicina (detectar tumores en radiografías).

Los enfoques de detección se dividen en dos generaciones. Los detectores de dos etapas (two-stage) como Faster R-CNN primero proponen regiones candidatas (region proposals) y luego clasifican cada región. Son más precisos pero más lentos. Los detectores de una etapa (one-stage) como YOLO (You Only Look Once) y SSD predicen directamente las clases y las coordenadas de los bounding boxes en una sola pasada. YOLO es particularmente popular por su velocidad: YOLOv8 puede procesar más de 100 imágenes por segundo en una GPU moderna, haciéndolo ideal para aplicaciones en tiempo real.

La clasificación de imágenes asigna una o varias etiquetas a una imagen completa. Las arquitecturas como ResNet, EfficientNet y Vision Transformer (ViT) han alcanzado y superado el rendimiento humano en benchmarks como ImageNet. Transfer learning es la técnica estándar: se toma un modelo pre-entrenado en ImageNet (que ya sabe detectar bordes, texturas y formas básicas) y se ajusta (fine-tune) al dataset específico del problema. Esto permite obtener modelos precisos con cientos de veces menos datos que entrenar desde cero.

Las métricas de evaluación para detección incluyen mAP (mean Average Precision), que mide la precisión de las detecciones a diferentes umbrales de IoU (Intersection over Union: solapamiento entre la caja predicha y la real). Para clasificación, se usan accuracy, precision, recall y F1-score. La augmentación de datos (rotación, volteo, recorte, cambios de color) aumenta artificialmente el tamaño del dataset y mejora la generalización. Las herramientas como OpenCV, Albumentations y los frameworks de visión de PyTorch facilitan estas transformaciones.`,
      },
      {
        number: 2,
        name: "Procesamiento de Lenguaje Natural (NLP)",
        difficulty: "avanzado",
        estimatedTime: "40 min",
        content: `El Procesamiento de Lenguaje Natural (NLP) es la rama de la IA que permite a las máquinas comprender, interpretar y generar lenguaje humano. NLP es la tecnología detrás de traductores automáticos, asistentes de voz, chatbots, análisis de sentimiento, resumen automático y extracción de información. La evolución de NLP en la última década es una de las historias de progreso más impresionantes de toda la IA.

Las tareas fundamentales de NLP incluyen: tokenización (dividir texto en unidades mínimas), POS tagging (etiquetar cada token con su categoría gramatical), NER (Named Entity Recognition, identificar nombres de personas, organizaciones, lugares), parsing (analizar la estructura gramatical), sentiment analysis (determinar la polaridad emocional), text classification (categorizar documentos), machine translation (traducir entre idiomas), question answering (responder preguntas basadas en un contexto), y text generation (producir texto coherente).

La revolución de los embeddings transformó NLP. Word2Vec (2013) representó cada palabra como un vector denso en un espacio de cientos de dimensiones, donde palabras similares están cerca vectorialmente. GloVe (2014) mejoró esto usando estadísticas globales de co-ocurrencia. ELMo (2018) introdujo embeddings contextuales: la representación de una palabra depende del contexto, resolviendo la ambigüedad (banco = institución financiera vs. banco = asiento). BERT (2018) llevó esto más lejos con embeddings contextuales bidireccionales, estableciendo nuevos state-of-the-art en 11 tareas NLP.

Los modelos modernos de NLP están basados casi exclusivamente en Transformers. BERT (Bidirectional Encoder Representations from Transformers) se pre-entrena con masked language modeling (predecir palabras ocultas) y next sentence prediction, y se fine-tunea para tareas downstream. GPT se pre-entrena como modelo de lenguaje autoregresivo y se especializa mediante prompting o fine-tuning. T5 (Text-to-Text Transfer Transformer) unifica todas las tareas NLP como transformaciones de texto a texto. Los LLMs actuales han absorbido la mayoría de las tareas NLP especializadas en un único modelo multitarea, aunque las tareas especializadas siguen beneficiándose de modelos fine-tuned para dominios específicos.`,
      },
      {
        number: 3,
        name: "Sistemas de recomendación con IA",
        difficulty: "intermedio",
        estimatedTime: "35 min",
        content: `Los sistemas de recomendación son una de las aplicaciones más exitosas y ubicuas de la IA: Netflix recomendando películas, Amazon sugiriendo productos, Spotify descubriendo música y TikTok seleccionando videos. Estos sistemas analizan el comportamiento pasado del usuario y las características de los items para predecir qué le interesará en el futuro, creando experiencias personalizadas que aumentan el engagement y los ingresos.

Los enfoques fundamentales son tres. El filtrado colaborativo recomienda items basándose en el comportamiento de usuarios similares: si el usuario A y B tienen gustos parecidos y a A le gustó un item que B no ha visto, se recomienda a B. Este enfoque no necesita información sobre los items, pero sufre del problema de arranque en frío (cold start) para nuevos usuarios e items sin interacciones. El filtrado basado en contenido recomienda items similares a los que el usuario ya ha disfrutado, usando características de los items (género, director, tags). Este enfoque no tiene cold start para items nuevos pero tiende a recomendar items muy similares, creando "burbujas de filtro".

Los modelos factorización de matrices (Matrix Factorization) descomponen la matriz usuario-item (con muchas entradas vacías) en dos matrices de baja dimensión: una que representa a los usuarios y otra a los items en un espacio latente. La predicción es el producto punto entre los vectores latentes del usuario y el item. SVD (Singular Value Decomposition) y ALS (Alternating Least Squares) son los algoritmos clásicos. Estos modelos capturan factores latentes como "preferencia por acción vs. drama" o "películas intelectuales vs. comerciales".

Los enfoques modernos utilizan deep learning para superar las limitaciones de los métodos tradicionales. Las redes neuronales pueden modelar relaciones no lineales, incorporar información contextual (hora, dispositivo, ubicación), y manejar datos multimodales (texto, imágenes, audio de los items). Los autoencoders, las redes de atención y los transformers aplicados a secuencias de interacción representan el state-of-the-art. La combinación de filtrado colaborativo con LLMs permite sistemas que comprenden las preferencias del usuario en lenguaje natural y generan explicaciones legibles de las recomendaciones.`,
      },
      {
        number: 4,
        name: "IA en la nube: AWS, Azure y GCP AI Services",
        difficulty: "avanzado",
        estimatedTime: "35 min",
        content: `Los proveedores cloud ofrecen servicios de IA gestionados que permiten a las organizaciones implementar capacidades de inteligencia artificial sin necesidad de construir y mantener la infraestructura desde cero. Estos servicios cubren desde APIs pre-entrenadas para tareas comunes hasta plataformas para entrenar y desplegar modelos personalizados, democratizando el acceso a la IA para empresas de todos los tamaños.

AWS ofrece la suite más completa de servicios de IA. Amazon SageMaker es la plataforma para construir, entrenar y desplegar modelos de ML: gestiona notebooks, automatiza el tuning de hiperparámetros, proporciona endpoints de inferencia escalables y monitoriza los modelos en producción. Amazon Rekognition provee análisis de imagen y video pre-entrenado (detección de rostros, reconocimiento de celebridades, moderación de contenido). Amazon Comprehend realiza NLP (análisis de sentimiento, NER, clasificación de tópicos). Amazon Transcribe convierte voz a texto. Amazon Polly sintetiza habla. Amazon Bedrock da acceso a modelos fundacionales (Claude, Llama, Titan) como servicio.

Azure AI Services incluye Azure OpenAI Service (acceso a GPT-4, DALL-E y Whisper con cumplimiento empresarial), Azure Cognitive Services (visión, habla, lenguaje, decisión), Azure Machine Learning (plataforma MLOps completa), y Azure AI Studio (para construir soluciones de IA generativa). La integración con el ecosistema Microsoft (Office 365, Teams, Power Platform) facilita la adopción empresarial.

GCP (Google Cloud Platform) ofrece Vertex AI como plataforma unificada de ML, con AutoML para entrenar modelos sin código, Pipelines para MLOps y Prediction para inferencia escalable. Los APIs pre-entrenados incluyen Vision AI, Natural Language AI, Speech-to-Text, Text-to-Speech y Translation. La ventaja de GCP es el acceso a la tecnología de Google (TPUs, modelos PaLM/Gemini, investigación de vanguardia). La elección entre proveedores depende de la infraestructura existente, los requisitos de cumplimiento, los costos y las capacidades específicas necesarias.`,
      },
    ],
  },
  {
    number: 6,
    title: "Proyecto Final y Carrera en IA",
    description:
      "Construye un proyecto integral de IA y planifica tu carrera profesional en este campo en constante evolución.",
    topics: [
      {
        number: 1,
        name: "Pipeline completo de un proyecto de ML",
        difficulty: "avanzado",
        estimatedTime: "40 min",
        content: `Un proyecto de machine learning profesional sigue un pipeline estructurado que va desde la definición del problema hasta el despliegue y monitoreo del modelo en producción. Cada fase tiene sus propios desafíos, herramientas y mejores prácticas. Saltarse pasos o ejecutarlos superficialmente es la causa más común de fracaso en proyectos de ML.

La fase de definición del problema es la más subestimada y la más importante. Un proyecto de ML mal definido está condenado al fracaso independientemente de la sofisticación del modelo. Las preguntas clave son: ¿qué decisión se va a tomar con las predicciones? ¿Cuál es el impacto de los falsos positivos y falsos negativos? ¿Hay datos suficientes y de calidad? ¿Es ML realmente necesario o una solución basada en reglas sería más apropiada? Un framing correcto transforma "predecir churn" (ambiguo) en "predecir qué usuarios cancelarán en los próximos 30 días con al menos 80% de recall para intervenir proactivamente" (específico y accionable).

La fase de ingeniería de datos abarca la recolección, limpieza, transformación y feature engineering. Los datos se obtienen de múltiples fuentes (bases de datos, APIs, logs, archivos), se integran en un dataset unificado, se limpian (valores faltantes, outliers, duplicados), se transforman (codificación, escalado, feature engineering), y se dividen en entrenamiento/validación/test. La feature engineering —crear nuevas características a partir de las existentes que capturen patrones relevantes— es donde la experiencia del dominio marca la mayor diferencia.

La fase de modelado itera entre selección de algoritmo, entrenamiento, evaluación y ajuste. Se comienza con modelos baseline simples (regresión lineal, árboles poco profundos) para establecer un punto de referencia, y se progresa hacia modelos más complejos solo si mejoran significativamente el rendimiento. La evaluación usa las métricas apropiadas para el problema y validación cruzada para obtener estimaciones fiables. La fase de despliegue convierte el modelo en un servicio accesible: API REST, batch predictions, o edge deployment. MLOps (ML Operations) aplica las prácticas DevOps al ML: versionado de datos y modelos, pipelines automatizados, monitorización de drift y rendimiento, y re-entrenamiento automatizado.`,
      },
      {
        number: 2,
        name: "MLOps: operacionalización de modelos de IA",
        difficulty: "avanzado",
        estimatedTime: "35 min",
        content: `MLOps (Machine Learning Operations) es la disciplina que aplica las prácticas de DevOps al ciclo de vida de los modelos de ML. Mientras que el desarrollo de software tradicional gestiona código, MLOps gestiona código, datos y modelos —tres artefactos que evolucionan de forma independiente y que deben estar sincronizados. Sin MLOps, los modelos se quedan en notebooks de investigación y nunca llegan a producción, o se despliegan sin monitorización y se degradan silenciosamente.

El versionado es la base de MLOps. DVC (Data Version Control) versiona los datasets y los modelos como Git versiona el código. MLflow y Weights & Biases rastrean los experimentos: hiperparámetros, métricas, artefactos y entorno de ejecución de cada ejecución. Esto permite reproducir cualquier experimento pasado, comparar configuraciones y entender qué cambió cuando el rendimiento varía. El versionado semántico de modelos (model vX.Y.Z) comunica cambios: X es un cambio incompatible, Y es una mejora compatible, Z es un fix.

Los pipelines de ML automatizan el flujo de datos → entrenamiento → evaluación → despliegue. Herramientas como Kubeflow Pipelines, Apache Airflow y Vertex AI Pipelines definen el flujo como código (DAGs) que se ejecuta de forma reproducible. Los triggers pueden ser temporales (re-entrenar semanalmente), basados en datos (re-entrenar cuando hay nuevos datos), o basados en rendimiento (re-entrenar cuando el modelo degrada). CI/CD para ML extiende las prácticas de integración y despliegue continuo: cada cambio en el código o datos dispara pruebas automatizadas (validación de datos, tests de rendimiento del modelo, checks de sesgo) antes de ser desplegado.

La monitorización en producción es crítica porque los modelos de ML se degradan con el tiempo. El data drift ocurre cuando la distribución de los datos de entrada cambia (nuevos productos, estacionalidad, cambios de comportamiento). El concept drift ocurre cuando la relación entre features y target cambia (una pandemia cambia los patrones de consumo). El performance drift es la degradación de las métricas de rendimiento. Los sistemas de monitorización detectan estos drifts mediante tests estadísticos (KL divergence, PSI, chi-cuadrado) y alertan cuando es necesario re-entrenar. Los shadow deployments prueban la nueva versión del modelo en paralelo sin afectar a los usuarios, y los canary deployments la liberan gradualmente a un porcentaje del tráfico.`,
      },
      {
        number: 3,
        name: "Certificaciones y trayectorias en IA",
        difficulty: "basico",
        estimatedTime: "25 min",
        content: `La IA ofrece trayectorias profesionales diversas y lucrativas, con roles que abarcan desde la investigación fundamental hasta la aplicación empresarial. La demanda de profesionales de IA crece exponencialmente y la oferta de talentos calificados no alcanza a cubrirla, creando oportunidades excepcionales para quienes se preparan con las competencias adecuadas.

Los roles principales incluyen: ML Engineer (implementa modelos de ML en producción, el rol más demandado), Data Scientist (analiza datos y construye modelos predictivos), AI Researcher (avanza el conocimiento fundamental en IA), MLOps Engineer (opera la infraestructura de ML), NLP Engineer (especializado en lenguaje natural), Computer Vision Engineer (especializado en imágenes y video), AI Product Manager (define productos basados en IA), y AI Ethics Specialist (aborda los impactos sociales de la IA). Cada rol requiere una combinación específica de habilidades técnicas y blandas.

Las certificaciones más valoradas incluyen: AWS Machine Learning Specialty, Google Professional Machine Learning Engineer, Azure AI Engineer Associate, TensorFlow Developer Certificate, y Deep Learning Specialization de DeepLearning.AI. Estas certificaciones validan competencias prácticas y son reconocidas por los empleadores. Sin embargo, en IA el portafolio de proyectos suele ser más importante que las certificaciones: un GitHub con proyectos bien documentados, participaciones en competiciones de Kaggle y contribuciones a open-source son más persuasivos para los reclutadores.

Las trayectorias típicas comienzan como Junior ML Engineer o Data Analyst, avanzan a ML Engineer o Data Scientist, y culminan como Senior ML Engineer, AI Architect o Head of AI. La investigación académica sigue un camino paralelo: PhD, postdoctorado, investigador en labs de empresas (DeepMind, OpenAI, FAIR) o universidades. La IA es un campo que evoluciona rápidamente, y el aprendizaje continuo es imprescindible: seguir papers en arXiv, asistir a conferencias (NeurIPS, ICML, ICLR), y experimentar con nuevas técnicas son actividades permanentes del profesional de IA.`,
      },
      {
        number: 4,
        name: "El futuro de la IA: AGI, IA multimodal y más allá",
        difficulty: "avanzado",
        estimatedTime: "30 min",
        content: `El futuro de la IA es uno de los temas más debatidos y fascinantes de nuestro tiempo. Las tendencias actuales apuntan hacia modelos más capaces, multimodales y autónomos, pero también plantean preguntas fundamentales sobre seguridad, control y el impacto en la sociedad. Entender estas tendencias permite a los profesionales posicionarse estratégicamente y contribuir responsablemente al desarrollo de la tecnología.

La IA multimodal combina información de diferentes tipos (texto, imagen, audio, video) en un único modelo. GPT-4V, Gemini y Claude 3 ya procesan texto e imágenes simultáneamente. Los modelos futuros integrarán video, audio, acciones y posiblemente otros sensores, creando sistemas que perciben el mundo de forma similar a los humanos. La multimodalidad permite tareas que antes eran imposibles: describir imágenes para personas con discapacidad visual, generar videos a partir de descripciones textuales, y razonar sobre el contenido de documentos que combinan texto, tablas y gráficos.

Los agentes de IA representan el siguiente paradigma: sistemas que no solo generan texto sino que toman acciones en el mundo digital. Los agentes pueden navegar la web, usar herramientas, ejecutar código, enviar correos y completar flujos de trabajo complejos de forma autónoma. Frameworks como LangChain, AutoGPT y CrewAI orquestan agentes que descomponen tareas complejas en pasos, usan herramientas apropiadas en cada paso y verifican sus resultados. La IA agentiva promete automatizar tareas de conocimiento que antes requerían juicio humano, transformando la productividad en prácticamente todas las profesiones.

La IA General (AGI) sigue siendo el santo grial del campo: un sistema capaz de aprender y razonar sobre cualquier dominio intelectual al nivel humano o superior. Los investigadores debaten si los LLMs son un camino hacia AGI o si se necesitan arquitecturas fundamentalmente diferentes. La seguridad de la IA (AI Safety) aborda los riesgos de sistemas muy capaces que podrían no alinearse con los valores humanos: investigación en alineamiento (alignment), interpretabilidad, robustez y governance. Independientemente de si AGI se logra en 5, 20 o 50 años, las capacidades de la IA seguirán aumentando significativamente, y la preparación profesional, ética y regulatoria para este futuro es una responsabilidad compartida de toda la sociedad.`,
      },
    ],
  },
];

async function main() {
  console.log("🤖 Seeding IA course: Inteligencia Artificial...");

  const ia = await prisma.category.findUnique({
    where: { slug: "inteligencia-artificial" },
  });

  if (!ia) {
    console.error(
      "❌ Category 'inteligencia-artificial' not found. Run the main seed first."
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
      categoryId: ia.id,
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
      categoryId: ia.id,
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
    `\n🎉 IA course seeded: ${modules.length} modules, ${totalTopics} topics`
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
