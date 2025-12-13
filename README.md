# Desarrollo Frontend II - Experiencia 3 Semana 8
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![GraphQL](https://img.shields.io/badge/GraphQL-3.4-E10098?logo=graphql)
![API Rest](https://img.shields.io/badge/API%20Rest-2.0-009688?logo=rest)
![Apollo Client](https://img.shields.io/badge/Apollo-3.4-311C87?logo=apollographql)
![MSW](https://img.shields.io/badge/MSW-2.0.0-FF6A33?logo=mockserviceworker&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4.0.14-6E9F18?logo=vitest)
![Testing Library](https://img.shields.io/badge/Testing%20Library-16.3.0-E33332?logo=testinglibrary)
![Cypress](https://img.shields.io/badge/Cypress-15.7.1-17202C?logo=cypress)


## 🥞 Sistema de Recetas

Aplicación web en React para listar y consultar el detalle de un catálogo de recetas usando GraphQL y Apollo Client, simulado con Mock Service Worker. Incluye tests unitarios con Vitest y RTL, y tests E2E con Cypress.

## 🚀 Características Principales

- **Lista de Recetas**: Renderiza catálogo con nombre, tipo, locación y acceso al detalle.
- **Detalle de la Receta**: Vista individual completa con información extendida y precios.
- **API Rest Mock**: Consultas API servidas por MSW.
- **GraphQL Mock**: Consultas `ObtenerRecetaPorID` servidas por MSW.
- **Estados de Carga**: Mensajes diferenciados con delays simulados.
- **Manejo de Errores**: Respuestas GraphQL con estructura `errors` para IDs inexistentes.
- **Routing SPA**: Navegación completa con React Router entre páginas.
- **Estilos**: Tailwind CSS con diseño responsivo y componentes reutilizables.
- **Testing Completo**: Suite de tests unitarios.

## 🛠️ Tecnologías Utilizadas

- **React** 19.2.0 con componentes funcionales y hooks.
- **React Router** 7.9.5 para navegación SPA y rutas dinámicas.
- **Apollo Client** 4.0.9 para gestión de estado GraphQL y cache.
- **MSW (Mock Service Worker)** 2.12.1 para simulación de backend GraphQL.
- **Tailwind CSS** 3.4.18 para estilos utilitarios y diseño responsivo.
- **Vite** 7.2.2 como dev server, bundler y runner de tests.
- **Vitest** 4.0.14 como framework de testing rápido y moderno.
- **Testing Library** 16.3.0 para tests centrados en comportamiento del usuario.
- **Cypress** 15.7.1 para tests end-to-end y de integración completos.
- **Happy DOM** como entorno DOM ligero para tests.
- **ESLint / PostCSS** para calidad de código y procesado CSS.

## 📁 Estructura del Proyecto

```
cypress/
├── e2e/
│   ├── listar-recetas.cy.js       # Tests E2E para listado de recetas
│   └── recipe-detail.cy.js        # Tests E2E para detalle de recetas
├── fixtures/                      # Datos de prueba
└── support/                       # Comandos y configuración personalizada
src/
├── pages/
│   ├── RecipesPage.jsx            # Lista de recetas
│   ├── RecipesPage.test.jsx       # Tests del listado
│   ├── RecipeDetailPage.jsx       # Detalle de una receta
│   ├── RecipeDetailPage.test.jsx  # Tests del detalle
│   ├── HomePage.jsx              # Página de inicio
│   ├── HomePage.test.jsx         # Tests de la portada
│   └── AboutUsPage.jsx           # Información miscelanea
├── layout/
│   ├── Header.jsx                # Navegación principal
│   ├── Header.test.jsx           # Tests del header
│   ├── Footer.jsx                # Pie de página
│   └── Footer.test.jsx           # Tests del footer
├── components/
│   ├── common/Common.jsx         # PageTitle y componentes reutilizables
│   └── loading/Loading.jsx       # Indicador de carga
├── mocks/
│   ├── handlers.js               # Resolvers GraphQL mock con datos completos
│   └── browser.js                # Configuración MSW
├── routes/AppRoutes.jsx          # Definición de rutas con lazy loading
├── setupTests.js                 # Configuración de matchers para tests
├── App.jsx                       # Componente principal con Apollo Provider
└── App.test.jsx                  # Tests de integración de la app
```

## 🧪 Testing

### Cobertura
- **100% cobertura** en statements, branches, functions y lines
- **Tests unitarios** para todos los componentes individuales
- **Tests de integración** para flujos completos de usuario
- **Tests E2E** con Cypress para validar flujos de usuario completos
- **Mocks de Apollo Client** para consultas GraphQL
- **Testing de estados**: loading, error y success
- **Testing de navegación** con MemoryRouter
- **Interceptación de API calls** en tests E2E

### Comandos de Testing
```bash
npm run test          # Ejecutar tests unitarios en modo watch
npm run coverage      # Generar reporte de cobertura
npx cypress open      # Abrir Cypress Test Runner
npx cypress run       # Ejecutar tests E2E en modo headless
```

### Archivos de Test

#### Tests Unitarios
- `HomePage.test.jsx` - Renderizado y elementos de la portada
- `RecipesPage.test.jsx` - Lista, imágenes, enlaces y estados
- `RecipeDetailPage.test.jsx` - Detalle completo y manejo de errores
- `Header.test.jsx` - Navegación activa y responsive (100% branches)
- `Footer.test.jsx` - Enlaces y contenido del pie
- `App.test.jsx` - Integración de componentes y props

#### Tests E2E (Cypress)
- `listar-recetas.cy.js` - Navegación y conteo de recetas en el listado
- `recipe-detail.cy.js` - Flujo completo desde listado hasta detalle de la receta

## 🔐 Consultas GraphQL

```graphql
const GQL_OBTENER_RECETA_POR_ID = gql`
  query ObtenerRecetaPorID($id: ID!) {
    receta(id: $id) {
      imagen
      nombre
      descripcion
      ingredientes
      tiempoPreparacion
      tiempoCoccion
      cantidadPorciones
      categorias
      procedimiento
      observaciones
    }
  }
`;
```


## 🎨 Diseño y UX

- **Feedback de Carga**: Mensajes centrados y neutrales con paleta slate.
- **Semántica**: Secciones y encabezados claros.
- **Responsive**: Grid y utilidades Tailwind para distintos breakpoints.
- **Accesibilidad Básica**: Uso de `alt` en imágenes y enlaces descriptivos.

## 🧪 Manejo de Errores en la UI

Actualmente, al consultar un ID inexistente, Apollo entra al branch `error` debido a la presencia de `errors` en la respuesta. Para mostrar un mensaje “no encontrado” alternativo se puede:
1. Inspeccionar `error.graphQLErrors[0].extensions.code`.
2. O ajustar el handler para devolver `{ data: { receta: null } }` en vez de `errors`.

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 16+
- npm / yarn / pnpm

### Instalación

```bash
git clone https://github.com/nisiara/dfe2_exp3_s1.git
cd dfe2_exp2_s6
npm install
```

### Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run test         # Tests en modo watch
npm run coverage     # Reporte de cobertura
npm run lint         # Linter ESLint
```

### Desarrollo
Abrir: `http://localhost:5173`

### Rutas Disponibles
- `/` - Página de inicio
- `/recipes` - Lista de recetas
- `/recipes/:id` - Detalle de la receta
- `/about-us` - Información institucional


---

*Desarrollado con* ❤️ usando React, Apollo MSW y un montón de cosas.
