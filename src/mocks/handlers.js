import { http, HttpResponse, delay, graphql} from "msw";

const recetas = [
  {
    id: 1,
    nombre: "Ricotta Batida",
    descripcion: "Una receta de picoteo distinta, rica y muy fácil, que está lista en sólo 20 minutos o menos. Perfecta para tablas de picoteo.",
    ingredientes: [
      "Ricotta",
      "Aceite de oliva",
      "Hierbas frescas",
      "Sal y pimienta",
      "Miel (opcional)",
      "Tomates cherry (para acompañar)",
      "Tostadas o grisines"
    ],
    tiempoPreparacion: "20 min",
    tiempoCoccion: "0 min",
    cantidadPorciones: 4,
    imagen: "https://placehold.co/600x400/white/black?text=Ricotta+Batida",
    categorias: [
      "Salado",
      "Picoteo",
      "Vegetariano"
    ],
    procedimiento: [
      "Batir la ricotta en un procesador o con batidora hasta que esté muy cremosa y aireada.",
      "Extender en un plato o bowl bajo.",
      "Rociar con aceite de oliva, hierbas frescas picadas, sal y pimienta.",
      "Servir acompañada de tostadas o galletas."
    ],
    observaciones: "Puedes agregar un toque de miel para un contraste agridulce."
  },
  {
    id: 2,
    nombre: "Queque de Limón, Almendra y Cereza",
    descripcion: "Un queque cítrico, fresco y veraniego. El bizcocho es de limón y almendra, con un glaseado de limón y cereza.",
    ingredientes: [
      "125 g Mantequilla sin sal",
      "170 g Azúcar",
      "Ralladura de 2 Limones",
      "3 Huevos",
      "140 g Harina sin polvos",
      "40 g Harina de Almendras",
      "20 ml Jugo de limón",
      "150 g Azúcar flor (glaseado)",
      "2 Cdas Pulpa de Cereza (glaseado)"
    ],
    tiempoPreparacion: "40 min",
    tiempoCoccion: "50 min",
    cantidadPorciones: 8,
    imagen: "https://placehold.co/600x400/yellow/red?text=Queque+Limon+Almendra",
    categorias: [
      "Dulce",
      "Queques",
      "Hora del té"
    ],
    procedimiento: [
      "Batir mantequilla con azúcar y ralladura hasta cremar.",
      "Agregar huevos uno a uno.",
      "Incorporar harinas y polvos intercalando con los líquidos (limón/leche).",
      "Hornear a 170ºC por 50 minutos.",
      "Para el glaseado: mezclar azúcar flor con pulpa de cereza y limón."
    ],
    observaciones: "Para el glaseado se pueden usar cerezas en almíbar trituradas."
  },
  {
    id: 3,
    nombre: "Flatbread – Pan rápido y fácil",
    descripcion: "Un pan plano muy fácil de hacer con una combinación de ingredientes salados y dulces exquisita.",
    ingredientes: [
      "Harina",
      "Yogurt natural",
      "Polvos de hornear",
      "Sal",
      "Aceite de oliva",
      "Hierbas al gusto"
    ],
    tiempoPreparacion: "15 min",
    tiempoCoccion: "10 min",
    cantidadPorciones: 4,
    imagen: "https://placehold.co/600x400/orange/white?text=Flatbread",
    categorias: [
      "Salado",
      "Panes",
      "Acompañamiento"
    ],
    procedimiento: [
      "Mezclar harina con yogurt y sal hasta formar una masa.",
      "Estirar en forma ovalada o irregular.",
      "Cocinar en sartén caliente con un poco de aceite hasta dorar por ambos lados.",
      "Servir tibio."
    ],
    observaciones: "No requiere levadura ni tiempos de espera largos."
  },
  {
    id: 4,
    nombre: "Rollo de Merengue de Frutilla, Naranja y Pistachos",
    descripcion: "Rollo de merengue firme por fuera y suave por dentro. Relleno con crema, agua de azahar y frutillas.",
    ingredientes: [
      "150 g Claras de Huevo",
      "300 g Azúcar blanca",
      "1 cdta Vinagre",
      "60 g Pistachos picados",
      "200 ml Crema de leche (relleno)",
      "Agua de Azahar",
      "150 g Frutillas picadas",
      "Ralladura de Naranja"
    ],
    tiempoPreparacion: "40 min",
    tiempoCoccion: "25 min",
    cantidadPorciones: 8,
    imagen: "https://placehold.co/600x400/pink/white?text=Rollo+Merengue",
    categorias: [
      "Dulce",
      "Postres",
      "Sin Gluten"
    ],
    procedimiento: [
      "Hacer un merengue firme con las claras y azúcar.",
      "Extender en bandeja y hornear 20-30 min a 160ºC.",
      "Voltear sobre papel, dejar enfriar y rellenar con la crema batida con azahar y frutas.",
      "Enrollar con cuidado ayudándose del papel."
    ],
    observaciones: "La corteza se craquelará al enrollar, es normal."
  },
  {
    id: 5,
    nombre: "Cheesecake de Chocolate y Frambuesa",
    descripcion: "Cheesecake sin horno con base de Oreo, capa de frambuesas y relleno de chocolate.",
    ingredientes: [
      "300 g Galletas Oreo molidas",
      "100 g Mantequilla derretida",
      "210 g Queso Crema",
      "120 g Chocolate semi-amargo derretido",
      "150 ml Crema de leche",
      "Frambuesas frescas o molidas"
    ],
    tiempoPreparacion: "30 min",
    tiempoCoccion: "0 min",
    cantidadPorciones: 10,
    imagen: "https://placehold.co/600x400/brown/red?text=Cheesecake+Choco+Frambuesa",
    categorias: [
      "Dulce",
      "Postres",
      "Sin Horno"
    ],
    procedimiento: [
      "Formar la base mezclando Oreo y mantequilla; refrigerar.",
      "Poner una capa de frambuesas molidas sobre la base.",
      "Batir queso crema con chocolate derretido y luego incorporar crema batida.",
      "Verter sobre la base y refrigerar hasta cuajar."
    ],
    observaciones: "Usar chocolate de buena calidad para mejor sabor."
  },
  {
    id: 6,
    nombre: "Palta Grillada Rellena",
    descripcion: "Entrada distinta: palta grillada rellena con queso feta, quínoa, tomate y albahaca.",
    ingredientes: [
      "2 Paltas",
      "1 Taza Quínoa cocida",
      "100 g Tomate en cubos",
      "Albahaca fresca",
      "Queso Feta",
      "Mayonesa (o Not Mayo)",
      "Pesto"
    ],
    tiempoPreparacion: "30 min",
    tiempoCoccion: "5 min",
    cantidadPorciones: 2,
    imagen: "https://placehold.co/600x400/green/black?text=Palta+Grillada",
    categorias: [
      "Salado",
      "Entradas",
      "Vegetariano"
    ],
    procedimiento: [
      "Partir paltas por la mitad y grillar boca abajo en sartén o parrilla.",
      "Mezclar quínoa con tomate, albahaca y aliños.",
      "Rellenar la palta con la mezcla y terminar con queso feta, mayonesa y pesto."
    ],
    observaciones: "Servir inmediatamente mientras la palta está tibia."
  },
  {
    id: 7,
    nombre: "Tostadas Francesas con Cornflakes",
    descripcion: "Tostadas francesas crujientes por fuera gracias a los cornflakes. Ideales para brunch.",
    ingredientes: [
      "2 Huevos",
      "200 ml Crema de leche",
      "50 ml Leche",
      "1 cdta Vainilla",
      "150 g Cornflakes molidos",
      "Pan Brioche rebanado grueso",
      "Reducción de frambuesas (opcional)"
    ],
    tiempoPreparacion: "15 min",
    tiempoCoccion: "10 min",
    cantidadPorciones: 6,
    imagen: "https://placehold.co/600x400/orange/brown?text=Tostadas+Francesas",
    categorias: [
      "Dulce",
      "Desayuno",
      "Brunch"
    ],
    procedimiento: [
      "Mezclar huevos, crema, leche y vainilla.",
      "Pasar el pan por la mezcla líquida y luego por los cornflakes molidos.",
      "Dorar en sartén con mantequilla por ambos lados."
    ],
    observaciones: "Servir con yogurt, syrup y fruta fresca."
  },
  {
    id: 8,
    nombre: "Gratin de Papas",
    descripcion: "Papas laminadas finas horneadas en mezcla de leche, salsa de tomate y queso gruyère.",
    ingredientes: [
      "500 g Papas",
      "100 ml Leche",
      "100 g Salsa de Tomate",
      "150 ml Crema de Leche",
      "2 Dientes de ajo",
      "200 g Queso Gruyère rallado",
      "Nuez moscada"
    ],
    tiempoPreparacion: "30 min",
    tiempoCoccion: "60 min",
    cantidadPorciones: 4,
    imagen: "https://placehold.co/600x400/yellow/red?text=Gratin+de+Papas",
    categorias: [
      "Salado",
      "Acompañamiento",
      "Navidad"
    ],
    procedimiento: [
      "Calentar leche, crema, salsa de tomate y ajo.",
      "Laminar papas muy finas.",
      "Intercalar capas de papas y queso en una fuente.",
      "Verter el líquido caliente encima.",
      "Hornear tapado a 180ºC por 1 hora, luego gratinar destapado."
    ],
    observaciones: "Si laminas las papas antes, déjalas en agua para que no se oxiden."
  },
  {
    id: 9,
    nombre: "Torta de Cinnamon Roll Navideña",
    descripcion: "Torta de rollo de canela gigante, rellena con especias navideñas (canela, cardamomo, clavo).",
    ingredientes: [
      "530 g Harina",
      "250 ml Leche tibia",
      "Levadura seca",
      "2 Huevos",
      "80 g Mantequilla",
      "Relleno: Azúcar rubia, Canela, Jengibre, Cardamomo",
      "Frosting: Queso crema, azúcar flor"
    ],
    tiempoPreparacion: "90 min",
    tiempoCoccion: "90 min",
    cantidadPorciones: 8,
    imagen: "https://placehold.co/600x400/brown/white?text=Torta+Cinnamon+Roll",
    categorias: [
      "Dulce",
      "Navidad",
      "Bollería"
    ],
    procedimiento: [
      "Hacer masa de levadura y dejar leudar 1 hora.",
      "Estirar rectángulo, pincelar con mantequilla y cubrir con especias.",
      "Cortar tiras y enrollarlas una sobre otra para formar un rollo gigante.",
      "Hornear a 180ºC por 1.5 horas. Cubrir con frosting."
    ],
    observaciones: "La masa es pegajosa, eso asegura que quede húmeda."
  },
  {
    id: 10,
    nombre: "Muffins de Chocolate, Pera y Especias",
    descripcion: "Muffins húmedos con puré de pera, especias y chocolate. Sabor a invierno/navidad.",
    ingredientes: [
      "200 g Puré de Pera",
      "150 g Mantequilla",
      "150 g Azúcar rubia",
      "2 Huevos",
      "130 g Harina",
      "50 g Cacao amargo",
      "Canela, Jengibre, Nuez Moscada",
      "80 g Chocolate derretido"
    ],
    tiempoPreparacion: "20 min",
    tiempoCoccion: "25 min",
    cantidadPorciones: 12,
    imagen: "https://placehold.co/600x400/darkbrown/green?text=Muffins+Pera+Choco",
    categorias: [
      "Dulce",
      "Desayuno",
      "Navidad"
    ],
    procedimiento: [
      "Batir mantequilla y azúcar. Agregar puré de pera y huevos.",
      "Incorporar secos (harina, cacao, especias).",
      "Agregar chocolate derretido al final.",
      "Hornear 25-30 min a 170ºC."
    ],
    observaciones: "Se puede usar compota de pera comprada o casera."
  },
  {
    id: 11,
    nombre: "Galletas de Café, Especias y Chocolate",
    descripcion: "Galletas navideñas fáciles que combinan café, especias y chocolate.",
    ingredientes: [
      "Harina",
      "Mantequilla",
      "Café espresso o soluble",
      "Cacao en polvo",
      "Canela y especias",
      "Azúcar"
    ],
    tiempoPreparacion: "30 min",
    tiempoCoccion: "12 min",
    cantidadPorciones: 24,
    imagen: "https://placehold.co/600x400/brown/black?text=Galletas+Cafe",
    categorias: [
      "Dulce",
      "Galletas",
      "Regalos"
    ],
    procedimiento: [
      "Formar una masa con todos los ingredientes.",
      "Refrigerar la masa antes de cortar.",
      "Cortar con moldes y hornear hasta que estén firmes."
    ],
    observaciones: "Perfectas para regalar en bolsitas."
  },
  {
    id: 12,
    nombre: "Torta de Limón, Albahaca y Menta",
    descripcion: "Torta con bizcocho de hierbas (albahaca/menta) y frosting de mascarpone y limón.",
    ingredientes: [
      "Albahaca fresca",
      "Menta fresca",
      "Aceite de Oliva",
      "Azúcar",
      "Limón sutil",
      "Mascarpone (frosting)"
    ],
    tiempoPreparacion: "60 min",
    tiempoCoccion: "40 min",
    cantidadPorciones: 12,
    imagen: "https://placehold.co/600x400/green/white?text=Torta+Limon+Albahaca",
    categorias: [
      "Dulce",
      "Tortas",
      "Primavera"
    ],
    procedimiento: [
      "Procesar hierbas con aceite de oliva.",
      "Usar este aceite para batir el bizcocho con huevos y azúcar.",
      "Hornear en capas.",
      "Rellenar con frosting de mascarpone y limón."
    ],
    observaciones: "No procesar las hierbas en exceso para evitar amargor."
  },
  {
    id: 13,
    nombre: "Fondue de Queso y Tomate",
    descripcion: "Fondue rápido (15 min) con salsa de tomate y quesos, ideal para Halloween o picoteos.",
    ingredientes: [
      "3 Dientes de Ajo",
      "200 g Queso Crema",
      "200 ml Salsa de Tomate",
      "200 g Queso rallado (Gruyere/Emmental)",
      "Tostadas para acompañar"
    ],
    tiempoPreparacion: "5 min",
    tiempoCoccion: "15 min",
    cantidadPorciones: 6,
    imagen: "https://placehold.co/600x400/red/yellow?text=Fondue+Queso+Tomate",
    categorias: [
      "Salado",
      "Picoteo",
      "Halloween"
    ],
    procedimiento: [
      "Saltear ajo en una olla.",
      "Agregar salsa de tomate y quesos.",
      "Cocinar revolviendo hasta fundir y homogeneizar.",
      "Servir caliente con tostadas."
    ],
    observaciones: "No cocinar en exceso para que el queso no se separe (corte)."
  },
  {
    id: 14,
    nombre: "Mini Tortas de Hojarasca",
    descripcion: "Clásico dulce chileno en versión individual. Capas de masa crocante con manjar.",
    ingredientes: [
      "Masa de hojarasca (harina, yemas, pisco/vinagre)",
      "Manjar (dulce de leche)",
      "Merengue italiano o suizo",
      "Mostacillas para decorar"
    ],
    tiempoPreparacion: "60 min",
    tiempoCoccion: "10 min",
    cantidadPorciones: 6,
    imagen: "https://placehold.co/600x400/brown/white?text=Mini+Tortas+Hojarasca",
    categorias: [
      "Dulce",
      "Chilena",
      "Clásicos"
    ],
    procedimiento: [
      "Cortar discos de masa hojarasca y hornear hasta dorar.",
      "Rellenar intercalando discos con manjar.",
      "Cubrir con merengue y sopletear si se desea."
    ],
    observaciones: "Dejar reposar para que la masa se impregne del manjar."
  },
  {
    id: 15,
    nombre: "Galletas de Tomate y Flores Prensadas",
    descripcion: "Galletas saladas muy estéticas con flores comestibles prensadas, ideales para tablas.",
    ingredientes: [
      "Harina",
      "Mantequilla",
      "Concentrado de tomate o tomate deshidratado",
      "Flores comestibles (pensamientos, etc.)",
      "Hierbas"
    ],
    tiempoPreparacion: "30 min",
    tiempoCoccion: "15 min",
    cantidadPorciones: 20,
    imagen: "https://placehold.co/600x400/beige/red?text=Galletas+Tomate+Flores",
    categorias: [
      "Salado",
      "Galletas",
      "Picoteo"
    ],
    procedimiento: [
      "Hacer masa quebrada salada con tomate.",
      "Estirar y cortar galletas.",
      "Poner una flor comestible sobre cada galleta y pasar uslero suavemente para adherir.",
      "Hornear cuidando que no se quemen las flores."
    ],
    observaciones: "Usar flores libres de pesticidas."
  }
];

export const handlers = [

  http.get("/api/recetas", async (req) => {
    await delay(3000) 
    console.log('req', req)
    return HttpResponse.json(recetas)

  }),

  graphql.query('ObtenerRecetaPorID', async ({ variables }) => {
    await delay(3000);
    const rawId = variables?.id
    if (!rawId) {
      return HttpResponse.json({
        errors: [{ 
          message: 'Falta variable id', 
          extensions: { code: 'BAD_USER_INPUT' } 
        }]
      });
    }

    const receta = recetas.find(e => e.id.toString() === rawId.toString());
    
    if (!receta) {
      return HttpResponse.json({
        errors: [
          {
            message: `Receta ID: ${rawId}`,
            extensions: { code: 'RECETA NO ENCONTRADA' }
          }
        ]
      });
    }

    return HttpResponse.json({ data: { receta } });
  }),

 
]