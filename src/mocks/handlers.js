import { HttpResponse, delay, graphql} from "msw";

const eventos = [
  {
    id: "EVE-001A",
    nombre_evento: "Festival de Jazz en el Parque",
    tipo_evento: "musica",
    fecha: "2026-03-15",
    locacion: "Parque O'Higgins",
    ciudad: "Santiago",
    hora: "19:30",
    descripcion: "Una noche mágica de improvisación y ritmos con las mejores bandas de jazz nacional e internacional.",
    auspiciadores: ["Cerveza Kross", "Municipalidad de Santiago", "Banco de Chile"],
    precios: {
      galeria: 15000,
      tribuna: 25000,
      cancha: 35000,
      vip: 60000
    },
    detalles_artista: {
      nombre: "Jazz Fusion Collective",
      pais_origen: "Chile",
      generos: ["Jazz", "Fusión"],
      miembros: 5,
      discos_destacados: ["Ritmos del Sur"]
    }
  },
  {
    id: "EVE-002B",
    nombre_evento: "Partido Clásico de Fútbol: Univ. vs Colo",
    tipo_evento: "deporte",
    fecha: "2026-04-01",
    locacion: "Estadio Nacional Julio Martínez",
    ciudad: "Santiago",
    hora: "17:00",
    descripcion: "El encuentro más esperado de la temporada: un clásico imperdible del fútbol chileno.",
    auspiciadores: ["Gatorade", "Bci", "Movistar"],
    precios: {
      galeria: 12000,
      tribuna: 30000,
      pacifico: 55000,
      vip: 120000
    },
    detalles_artista: {
      nombre: "Clubes Chilenos",
      disciplina: "Fútbol",
      liga: "Primera División",
      equipos: ["Universidad de Chile", "Colo-Colo"]
    }
  },
  {
    id: "EVE-003C",
    nombre_evento: "Gira Mundial: The Rock Legends",
    tipo_evento: "concierto",
    fecha: "2026-05-20",
    locacion: "Movistar Arena",
    ciudad: "Santiago",
    hora: "21:00",
    descripcion: "La banda de rock más grande de los 80 vuelve a Chile con todos sus éxitos.",
    auspiciadores: ["Cerveza Kross", "Ticketmaster", "Entel"],
    precios: {
      platea_alta: 45000,
      platea_baja: 65000,
      cancha: 80000,
      vip: 150000
    },
    detalles_artista: {
      nombre: "The Rock Legends",
      pais_origen: "Reino Unido",
      generos: ["Hard Rock", "Heavy Metal"],
      miembros: 4,
      discos_destacados: ["Electric Storm", "Road to Eternity"]
    }
  },
  {
    id: "EVE-004D",
    nombre_evento: "Estreno de la Obra: El Jardín Secreto",
    tipo_evento: "teatro",
    fecha: "2026-06-05",
    locacion: "Teatro Municipal de Las Condes",
    ciudad: "Santiago",
    hora: "20:30",
    descripcion: "Una conmovedora adaptación de la novela clásica al formato teatral.",
    auspiciadores: ["Municipalidad de Las Condes", "Ministerio de las Culturas"],
    precios: {
      galeria: 10000,
      platea_baja: 22000,
      palco: 35000
    },
    detalles_artista: {
      nombre: "Compañía Teatral Ícaro",
      director: "Elena Rojas",
      actores_principales: ["Javier Soto", "Catalina Méndez"]
    }
  },
  {
    id: "EVE-005E",
    nombre_evento: "Concierto Íntimo: Sofía del Mar",
    tipo_evento: "musica",
    fecha: "2026-07-10",
    locacion: "Teatro Caupolicán",
    ciudad: "Santiago",
    hora: "20:00",
    descripcion: "La cantautora nacional presenta su nuevo álbum, 'Amanecer'.",
    auspiciadores: ["Radio Cooperativa", "Cerveza Austral"],
    precios: {
      galeria: 18000,
      cancha: 30000,
      palco: 50000
    },
    detalles_artista: {
      nombre: "Sofía del Mar",
      pais_origen: "Chile",
      generos: ["Folk", "Pop"],
      discos_destacados: ["Amanecer", "Raíces"]
    }
  },
  {
    id: "EVE-006F",
    nombre_evento: "Campeonato Nacional de Natación",
    tipo_evento: "deporte",
    fecha: "2026-08-03",
    locacion: "Centro Acuático Estadio Nacional",
    ciudad: "Santiago",
    hora: "10:00",
    descripcion: "Los mejores nadadores del país compiten por el título nacional.",
    auspiciadores: ["Speedo", "Banco Estado"],
    precios: {
      general: 5000,
      preferencial: 8000
    },
    detalles_artista: {
      nombre: "Federación Chilena de Natación",
      disciplina: "Natación",
      atletas_clave: ["Martín B.", "Valentina G."]
    }
  },
  {
    id: "EVE-007G",
    nombre_evento: "Noche de Ópera: La Traviata",
    tipo_evento: "musica",
    fecha: "2026-09-12",
    locacion: "Teatro Municipal de Santiago",
    ciudad: "Santiago",
    hora: "19:00",
    descripcion: "Una producción clásica de la célebre ópera de Verdi.",
    auspiciadores: ["CorpArtes", "Fundación Cultural de Santiago"],
    precios: {
      galeria: 18000,
      anfiteatro: 35000,
      platea_central: 60000,
      palco: 100000
    },
    detalles_artista: {
      nombre: "Orquesta Filarmónica de Santiago",
      compositor: "Giuseppe Verdi",
      director: "Maestro Paolo Rossi"
    }
  },
  {
    id: "EVE-008H",
    nombre_evento: "Monólogo de Comedia: La Vida Moderna",
    tipo_evento: "teatro",
    fecha: "2026-10-25",
    locacion: "Gran Arena Monticello",
    ciudad: "Mostazal",
    hora: "22:00",
    descripcion: "El comediante más popular del momento reflexiona con humor sobre el día a día.",
    auspiciadores: ["Gran Arena Monticello", "Pisco Mistral"],
    precios: {
      general: 20000,
      silver: 35000,
      golden: 50000
    },
    detalles_artista: {
      nombre: "Felipe Morán",
      tipo: "Stand-Up Comedy",
      giras_previas: ["Risas y Caos"]
    }
  },
  {
    id: "EVE-009I",
    nombre_evento: "Electro Beat Fest - Edición Verano",
    tipo_evento: "concierto",
    fecha: "2027-01-20",
    locacion: "Sede V Región (Por confirmar)",
    ciudad: "Viña del Mar",
    hora: "18:00",
    descripcion: "El festival de música electrónica más grande de la costa central.",
    auspiciadores: ["Heineken", "Red Bull", "Municipalidad de Viña del Mar"],
    precios: {
      preventa_general: 30000,
      general: 40000,
      vip: 75000
    },
    detalles_artista: {
      nombre: "DJ Cosmic Rays & Amigos",
      pais_origen: "USA/Chile",
      generos: ["EDM", "Techno", "House"],
      headliners: ["Cosmic Rays", "The Synthetik"]
    }
  },
  {
    id: "EVE-010J",
    nombre_evento: "Torneo Internacional de Basketball",
    tipo_evento: "deporte",
    fecha: "2026-11-18",
    locacion: "Movistar Arena",
    ciudad: "Santiago",
    hora: "20:00",
    descripcion: "Chile se enfrenta a Argentina y Brasil en un triangular amistoso.",
    auspiciadores: ["Nike", "Coca-Cola", "Ministerio del Deporte"],
    precios: {
      galeria: 8000,
      platea_baja: 15000,
      cancha: 25000
    },
    detalles_artista: {
      nombre: "Selecciones de Baloncesto",
      disciplina: "Baloncesto",
      países: ["Chile", "Argentina", "Brasil"]
    }
  },
  {
    id: "EVE-011K",
    nombre_evento: "Concierto: Los Héroes del Silencio (Tributo)",
    tipo_evento: "musica",
    fecha: "2026-03-22",
    locacion: "Teatro Nescafé de las Artes",
    ciudad: "Santiago",
    hora: "21:30",
    descripcion: "La mejor banda tributo a Héroes del Silencio en un show inolvidable.",
    auspiciadores: ["Rock & Pop", "Banco de Chile"],
    precios: {
      platea_alta: 20000,
      platea_baja: 30000
    },
    detalles_artista: {
      nombre: "Avalancha Chilena",
      tipo: "Tributo",
      banda_original: "Héroes del Silencio"
    }
  },
  {
    id: "EVE-012L",
    nombre_evento: "Maratón de Santiago 2026",
    tipo_evento: "deporte",
    fecha: "2026-04-09",
    locacion: "Calles de Santiago",
    ciudad: "Santiago",
    hora: "08:00",
    descripcion: "La carrera más grande de Chile con circuitos de 42k, 21k y 10k.",
    auspiciadores: ["Adidas", "Entel", "Municipalidad de Santiago"],
    precios: {
      inscripcion_42k: 45000,
      inscripcion_21k: 35000,
      inscripcion_10k: 25000
    },
    detalles_artista: {
      nombre: "Deportistas y Runners",
      disciplina: "Atletismo",
      distancias: ["42k", "21k", "10k"]
    }
  },
  {
    id: "EVE-013M",
    nombre_evento: "Gala de Ballet: El Lago de los Cisnes",
    tipo_evento: "teatro",
    fecha: "2026-05-10",
    locacion: "Teatro Municipal de Viña del Mar",
    ciudad: "Viña del Mar",
    hora: "19:00",
    descripcion: "El clásico ballet con la Orquesta Filarmónica de Viña del Mar.",
    auspiciadores: ["Municipalidad de Viña del Mar", "Fundación Ballet Chile"],
    precios: {
      general: 15000,
      preferencial: 28000,
      palco: 45000
    },
    detalles_artista: {
      nombre: "Ballet Nacional de Chile",
      compositor: "Pyotr Ilyich Tchaikovsky",
      bailarina_principal: "Isidora Pérez"
    }
  },
  {
    id: "EVE-014N",
    nombre_evento: "Show de Stand Up: El Fin del Mundo",
    tipo_evento: "teatro",
    fecha: "2026-06-18",
    locacion: "Sala SCD Bellavista",
    ciudad: "Santiago",
    hora: "21:00",
    descripcion: "Un show de comedia negra e hilarante sobre la contingencia mundial.",
    auspiciadores: ["Cerveza Kross", "SCD"],
    precios: {
      entrada_unica: 12000
    },
    detalles_artista: {
      nombre: "Mauricio Ríos",
      tipo: "Stand-Up Comedy",
      temas: ["Política", "Tecnología", "Cultura Pop"]
    }
  },
  {
    id: "EVE-015O",
    nombre_evento: "Recital: La Voz del Sur",
    tipo_evento: "musica",
    fecha: "2026-07-28",
    locacion: "Teatro Biobío",
    ciudad: "Concepción",
    hora: "20:30",
    descripcion: "Un viaje por el folclor y la música de raíz chilena con la cantautora del sur.",
    auspiciadores: ["Municipalidad de Concepción", "Fondo Nacional de la Música"],
    precios: {
      general: 10000,
      platea: 18000
    },
    detalles_artista: {
      nombre: "Isabel Montes",
      pais_origen: "Chile",
      generos: ["Folclor", "Música de Raíz"],
      instrumento: "Guitarra"
    }
  },
  {
    id: "EVE-016P",
    nombre_evento: "Copa Chile de eSports: LoL Final",
    tipo_evento: "deporte",
    fecha: "2026-08-30",
    locacion: "Movistar Arena",
    ciudad: "Santiago",
    hora: "16:00",
    descripcion: "La final del campeonato nacional de League of Legends (LoL).",
    auspiciadores: ["ASUS ROG", "Claro Gaming", "Red Bull"],
    precios: {
      general: 10000,
      preferencial: 18000,
      vip_gamer: 35000
    },
    detalles_artista: {
      nombre: "Equipos Profesionales de eSports",
      disciplina: "eSports",
      juego: "League of Legends"
    }
  },
  {
    id: "EVE-017Q",
    nombre_evento: "Regreso a los 90's: Bandas Pop",
    tipo_evento: "concierto",
    fecha: "2026-09-05",
    locacion: "Gran Arena Monticello",
    ciudad: "Mostazal",
    hora: "21:00",
    descripcion: "Revive la época dorada del pop latino con invitados especiales.",
    auspiciadores: ["Radio Carolina", "Banco Bci"],
    precios: {
      general: 25000,
      golden: 40000,
      palco: 60000
    },
    detalles_artista: {
      nombre: "Iconos del Pop Latino",
      decada: "90s",
      generos: ["Pop Latino", "Dance"]
    }
  },
  {
    id: "EVE-018R",
    nombre_evento: "Feria del Libro de Santiago (FILSA)",
    tipo_evento: "teatro",
    fecha: "2026-10-12",
    locacion: "Centro Cultural Estación Mapocho",
    ciudad: "Santiago",
    hora: "11:00",
    descripcion: "Encuentros con autores, lanzamientos y conversatorios literarios.",
    auspiciadores: ["Cámara del Libro", "Ministerio de las Culturas"],
    precios: {
      entrada_diaria: 3000,
      pase_semanal: 10000
    },
    detalles_artista: {
      nombre: "Autores Varios",
      tipo: "Feria/Exposición",
      invitado_estelar: "Gabriel García H."
    }
  },
  {
    id: "EVE-019S",
    nombre_evento: "Recital Punk Rock: La Rebeldía",
    tipo_evento: "concierto",
    fecha: "2026-11-28",
    locacion: "Teatro Caupolicán",
    ciudad: "Santiago",
    hora: "18:00",
    descripcion: "Día de pura energía y *mosh pit* con las bandas de punk rock más importantes.",
    auspiciadores: ["Cerveza Kross", "Punto Ticket"],
    precios: {
      preventa: 18000,
      general: 25000
    },
    detalles_artista: {
      nombre: "Los Inadaptados",
      pais_origen: "Chile",
      generos: ["Punk Rock", "Hardcore"],
      teloneros: ["Furia Ciega"]
    }
  },
  {
    id: "EVE-020T",
    nombre_evento: "Mundial de Tenis Playa - Final",
    tipo_evento: "deporte",
    fecha: "2027-02-14",
    locacion: "Playa Reñaca",
    ciudad: "Viña del Mar",
    hora: "15:00",
    descripcion: "La final del circuito mundial de tenis en la arena de Reñaca.",
    auspiciadores: ["Wilson", "Municipalidad de Viña del Mar", "Coca-Cola"],
    precios: {
      general: 6000,
      tribuna: 12000,
      vip_cancha: 25000
    },
    detalles_artista: {
      nombre: "Tenistas Profesionales",
      disciplina: "Tenis Playa",
      torneo: "ITF Beach Tennis"
    }
  }
]

export const handlers = [
  graphql.query('ObtenerEventos', async () => {
    await delay(5000)
    return HttpResponse.json({data: {eventos}})

  }),

  graphql.query('ObtenerEventoPorID', async ({ variables }) => {
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

    const eventoId = rawId.toLowerCase()

    const evento = eventos.find(e => e.id.toLowerCase() === eventoId);
    
    if (!evento) {
      return HttpResponse.json({
        errors: [
          {
            message: `Evento id: ${eventoId}`,
            extensions: { code: 'EVENTO NO ENCONTRADO' }
          }
        ]
      });
    }

    return HttpResponse.json({ data: { evento } });
  }),

 
]