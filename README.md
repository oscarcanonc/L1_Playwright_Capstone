# L1_Playwright_Capstone
Capstone for L1 Playwright learning path.

## Descripción

Proyecto de automatización UI con Playwright sobre [Automation Exercise](https://automationexercise.com). La solución cubre flujos funcionales, validaciones de accesibilidad y pruebas visuales usando Page Object Model, fixtures personalizados y datos externos en JSON.

## Tecnologías usadas

- Playwright Test
- TypeScript
- Axe Core para accesibilidad
- Page Object Model
- Fixtures personalizados
- Reportes HTML y JSON

## Estructura principal

- `tests/`: casos de prueba funcionales, visuales y de accesibilidad.
- `pages/`: Page Objects reutilizables por flujo.
- `fixtures/`: extensión de `test` con páginas inyectadas.
- `testdata/`: datos de entrada en archivos JSON.
- `reports/html/`: reporte HTML generado por Playwright.
- `reports/results.json`: resultado consolidado en formato JSON.
- `reports/results/`: evidencias como screenshots, videos y trazas.

## Instalación

### Prerrequisitos

- Node.js 18 o superior
- npm
- Visual Studio Code

### Pasos

1. Clonar el repositorio.
2. Instalar dependencias.
3. Instalar navegadores de Playwright.
4. Ejecutar la suite.

```powershell
git clone https://github.com/oscarcanonc/L1_Playwright_Capstone.git
cd L1_Playwright_Capstone
npm install
npx.cmd playwright install chromium firefox webkit
npm test
```

## Scripts disponibles

```powershell
npm test
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:accessibility
npm run test:visual
npm run test:visual:update
npm run test:report
```

## Configuración de ejecución

La configuración principal está en `playwright.config.ts` e incluye:

- `baseURL`: `https://automationexercise.com`
- ejecución en Chromium, Firefox y WebKit
- screenshots solo en fallo
- video retenido en fallo
- trace en el primer reintento
- reportes `list`, `html` y `json`

## Ejemplos de ejecución

### Ejecutar toda la suite

```powershell
npm test
```

### Ejecutar solo accesibilidad

```powershell
npm run test:accessibility
```

### Ejecutar solo pruebas visuales

```powershell
npm run test:visual
```

### Actualizar snapshots visuales

```powershell
npm run test:visual:update
```

## Ejemplos de reportes de ejecución

El proyecto genera evidencias en tres niveles:

### 1. Reporte HTML

Ubicación: `reports/html/index.html`

Permite revisar:

- estado de cada prueba
- duración
- reintentos
- screenshots de fallo
- videos
- trazas

Para abrirlo localmente:

```powershell
npm run test:report
```

### 2. Reporte JSON

Ubicación: `reports/results.json`

Este archivo contiene el detalle estructurado de la ejecución y puede usarse para integraciones o tableros.

Ejemplo simplificado:

```json
{
  "config": {
    "version": "1.64.1",
    "workers": 4
  },
  "suites": [
    {
      "title": "auth.spec.ts",
      "specs": [
        {
          "title": "register, logout, login, and delete account"
        }
      ]
    }
  ]
}
```

### 3. Evidencias por prueba

Ubicación: `reports/results/`

Se almacenan artefactos como:

- screenshots
- videos `.webm`
- trazas para depuración
- resultados por reintento

## Cobertura funcional actual

La suite incluye validaciones sobre:

- autenticación y registro
- productos
- carrito
- checkout
- contacto
- accesibilidad
- regresión visual

## Uso de IA en el proyecto

La IA puede apoyar este proyecto en actividades como:

- generación inicial de casos de prueba a partir de historias de usuario
- propuesta de locators y refactorización de Page Objects
- creación de datos de prueba realistas en `testdata/`
- análisis de fallos a partir de `reports/results.json`, screenshots y traces
- documentación de flujos y mantenimiento del `README.md`

### Ejemplos prácticos de uso de IA

- sugerir nuevos escenarios negativos para login y checkout
- identificar duplicación en Page Objects y fixtures
- resumir fallos recurrentes desde el reporte JSON
- proponer mejoras de estabilidad para pruebas visuales y de accesibilidad

## Buenas prácticas aplicadas

- separación de responsabilidades con Page Object Model
- reutilización mediante fixtures personalizados
- datos externos para facilitar mantenimiento
- ejecución multi navegador
- evidencias automáticas en fallos

## Notas

Las pruebas visuales usan snapshots almacenados en `tests/visual.spec.ts-snapshots/`. Si cambia intencionalmente la UI esperada, se deben actualizar con:

```powershell
npm run test:visual:update
```
