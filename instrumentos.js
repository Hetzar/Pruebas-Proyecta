/* Prototipo local: verificar derechos de reproducción antes de publicación pública. */
const INSTRUMENTOS = {
  "iami": {
    "id": "iami",
    "title": "IAMI-R · Autoeficacia percibida",
    "short": "IAMI-R",
    "min": 1,
    "max": 10,
    "questions": [
      "Analizar textos literarios (describiendo los personajes principales de una novela, por ejemplo)",
      "Reconocer diferentes géneros de escritura (cuento y ensayo, por ejemplo)",
      "Identificar las ideas principales de un texto",
      "Escribir una redacción breve sin errores gramaticales",
      "Escribir de manera coherente y organizada (un informe con introducción, desarrollo y conclusiones, por ejemplo)",
      "Escribir una redacción breve sin errores ortográficos",
      "Resolver problemas de la Física",
      "Obtener notas altas en Matemática",
      "Resolver problemas geométricos",
      "Realizar mentalmente operaciones matemáticas",
      "Resolver ecuaciones matemáticas",
      "Resolver problemas que requieran cálculos numéricos",
      "Dibujar con precisión (retratos, por ejemplo)",
      "Dibujar objetos en tres dimensiones (figuras geométricas, por ejemplo)",
      "Emplear la perspectiva en el dibujo (representando los objetos tal cual se ven a la distancia)",
      "Realizar construcciones en tres dimensiones (utilizando papel madera, por ejemplo)",
      "Armar maquetas o modelos (de aviones, por ejemplo)",
      "Dibujar planos (de una vivienda, por ejemplo)",
      "Interpretar un instrumento musical",
      "Leer música (en una partitura o pentagrama, por ejemplo)",
      "Componer temas musicales sencillos",
      "Afinar un instrumento musical",
      "Interpretar un instrumento en una orquesta o grupo musical",
      "Realizar variaciones o arreglos de un tema musical",
      "Percibir rápidamente los sentimientos de otras personas",
      "Coordinar un grupo (de estudio, por ejemplo)",
      "Exponer un tema en público (un debate o asamblea, por ejemplo)",
      "Defender los derechos de otras personas",
      "Hablar con personas de mayor autoridad (directivos, por ejemplo)",
      "Iniciar y mantener conversaciones con diferentes personas (nuevos compañeros de curso, por ejemplo)",
      "Practicar ejercicios que requieran esfuerzo prolongado (ciclismo, por ejemplo)",
      "Practicar ejercicios que requieran precisión (encestar en un aro, por ejemplo)",
      "Competir en carreras de velocidad",
      "Practicar ejercicios que requieran resistencia (natación, por ejemplo)",
      "Practicar ejercicios que requieran agilidad (esquivar obstáculos, por ejemplo)",
      "Practicar ejercicios que requieran equilibrio (usando barras o cajones, por ejemplo)",
      "Conocer tus limitaciones para enfrentar diferentes situaciones",
      "Describir con precisión tus sentimientos (en un diario íntimo, por ejemplo)",
      "Identificar rápidamente tus necesidades psicológicas (de compañía, por ejemplo)",
      "Comprender las causas de tus estados de ánimo",
      "Conocer tus capacidades para enfrentar diferentes situaciones",
      "Identificar rápidamente tus sentimientos",
      "Identificar las diferencias entre animales de un mismo tipo (entre serpientes venenosas e inofensivas, por ejemplo)",
      "Conocer una gran variedad de vegetales (diferentes tipos de árboles, por ejemplo)",
      "Usar técnicas para medir la contaminación ambiental (existencia de bacterias en el agua, por ejemplo)",
      "Hacer experimentos para analizar fenómenos naturales (fotosíntesis, por ejemplo)",
      "Realizar análisis de materia orgánica (una muestra de tejido, por ejemplo)",
      "Obtener notas altas en Biología"
    ],
    "source": "Pérez, E. R., & Medrano, L. (2007). Inventario de Autoeficacia para Inteligencias Múltiples Revisado: Un estudio de validez de criterio. Avances en Medición, 5, 105–114. Anexo (48 ítems).",
    "version": "48 ítems, 2007",
    "note": "Mide confianza percibida para realizar actividades. No evalúa inteligencia, aptitudes reales ni determina ocupaciones.",
    "groups": [
      {
        "name": "Lingüística",
        "ids": [
          1,
          2,
          3,
          4,
          5,
          6
        ]
      },
      {
        "name": "Lógico-matemática",
        "ids": [
          7,
          8,
          9,
          10,
          11,
          12
        ]
      },
      {
        "name": "Espacial",
        "ids": [
          13,
          14,
          15,
          16,
          17,
          18
        ]
      },
      {
        "name": "Musical",
        "ids": [
          19,
          20,
          21,
          22,
          23,
          24
        ]
      },
      {
        "name": "Interpersonal",
        "ids": [
          25,
          26,
          27,
          28,
          29,
          30
        ]
      },
      {
        "name": "Cinestésico-corporal",
        "ids": [
          31,
          32,
          33,
          34,
          35,
          36
        ]
      },
      {
        "name": "Intrapersonal",
        "ids": [
          37,
          38,
          39,
          40,
          41,
          42
        ]
      },
      {
        "name": "Naturalista",
        "ids": [
          43,
          44,
          45,
          46,
          47,
          48
        ]
      }
    ]
  },
  "dtdc": {
    "id": "dtdc",
    "title": "DTDC · Dificultades al decidir",
    "short": "DTDC",
    "min": 1,
    "max": 7,
    "questions": [
      "Sé que tengo que tomar una decisión sobre mi futuro académico-profesional, pero no tengo motivación para hacerlo ahora (no se me apetece).",
      "Opino que no tengo que escoger ahora mi camino profesional, el tiempo sé que me dirigirá hacia la opción más correcta.",
      "Normalmente me cuesta tomar decisiones.",
      "Normalmente siento que necesito la aprobación o el apoyo y ayuda de otros para tomar decisiones.",
      "Normalmente temo el fracaso.",
      "No sé qué pasos debo dar.",
      "No sé qué factores y elementos debo considerar.",
      "No sé cómo combinar la información que tengo sobre mí mismo con la que poseo sobre los diferentes caminos académico-profesionales.",
      "No sé qué profesiones me interesan.",
      "No estoy seguro/a todavía de mis preferencias vocacionales (p. ej., no sé qué tipo de relación quiero tener con la gente en el trabajo, qué ambiente de trabajo prefiero).",
      "No tengo suficiente información sobre mis competencias (p. ej., sobre mis habilidades numéricas, verbales) y/o sobre mis rasgos de personalidad (iniciativa, paciencia, persistencia...).",
      "No sé cuáles serán en el futuro mis habilidades y/o rasgos de personalidad.",
      "No sé cómo obtener información adicional sobre mí mismo (habilidades, rasgos de personalidad...).",
      "No tengo suficiente información sobre la variedad de profesiones y/o alternativas educativas que existen.",
      "No tengo suficiente información sobre las características de las profesiones y/o alternativas académicas que me interesan (p. ej., la demanda laboral, ingresos, posibilidades de promoción, requisitos académicos).",
      "Desconozco qué opciones académicas y profesionales tendrán más salidas laborales en el futuro.",
      "No sé cómo obtener información precisa y actual sobre las características de profesiones y/o alternativas académicas.",
      "Cambio constantemente mis preferencias académico-vocacionales (p. ej., algunas veces quiero ser enfermero y otras maestro, algunas estudiar Bachillerato y otras un Ciclo formativo).",
      "Tengo información contradictoria sobre mis habilidades y/o rasgos de personalidad (p. ej., yo creo que soy paciente con la gente, pero otros creen que no lo soy).",
      "Tengo información contradictoria sobre las características de profesiones y/o alternativas académicas.",
      "Me atraen diferentes carreras profesionales y/o alternativas educativas de igual manera, y me cuesta elegir entre ellas.",
      "Mis preferencias no pueden combinarse en una única opción académica-profesional y yo no quiero abandonar ninguna de ellas.",
      "Mis destrezas y habilidades no encajan con los requerimientos de la alternativa académica y/o profesional en la que estoy interesado.",
      "No me gustan ninguna de las profesiones o alternativas académicas en las que me han admitido.",
      "La profesión o alternativa académica en la que estoy interesado tiene ciertas características que me sobrepasan (p. ej., me interesa Medicina pero no quiero estudiar muchos años; me interesa el Bachillerato Artístico pero quiero empezar a trabajar pronto).",
      "Las personas que son importantes para mí (como padres o amigos) no están de acuerdo con la opción académico-profesional que estoy considerando o con las características de la profesión que yo deseo.",
      "Entre las personas que me están recomendando alguna profesión u opción académica y que me dicen qué aspectos deben guiar mi decisión, existen contradicciones."
    ],
    "source": "Lozano, S. (2007). Validación de un modelo de medida de las dificultades en los procesos de toma de decisiones sobre la carrera profesional. Revista de Educación, 343, 325–351. Anexo de escala inicial.",
    "version": "Escala inicial de 27 ítems, 2007",
    "note": "Muestra identificación con posibles dificultades. No es un diagnóstico ni reproduce automáticamente el modelo factorial validado posterior.",
    "groups": [
      {
        "name": "Motivación",
        "ids": [
          1,
          2
        ]
      },
      {
        "name": "Indecisión",
        "ids": [
          3,
          4,
          5
        ]
      },
      {
        "name": "Información sobre el proceso de decisión",
        "ids": [
          6,
          7,
          8
        ]
      },
      {
        "name": "Información sobre sí mismo",
        "ids": [
          9,
          10,
          11,
          12,
          13
        ]
      },
      {
        "name": "Información sobre alternativas",
        "ids": [
          14,
          15,
          16,
          17
        ]
      },
      {
        "name": "Información contradictoria",
        "ids": [
          18,
          19,
          20
        ]
      },
      {
        "name": "Conflictos internos",
        "ids": [
          21,
          22,
          23,
          24
        ]
      },
      {
        "name": "Conflictos externos",
        "ids": [
          25,
          26,
          27
        ]
      }
    ]
  }
};
