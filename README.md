# TaskFlowPro

![TaskFlowPro Banner](https://img.shields.io/badge/TaskFlowPro-Premium%20Edition-black?style=for-the-badge&logo=react) 

Aplicación premium de gestión de tareas construida desde cero priorizando la experiencia de usuario, interacciones fluidas mediante Web Animations y persistencia de datos.

## 🚀 Características Principales

- **Gestión Avanzada**: Tablero interactivo con creación y organización de tareas fluida.
- **Categorías persistentes**: crear categorías con color, consultar su progreso y eliminar categorías personalizadas vacías. Las categorías predeterminadas y las que contienen tareas quedan protegidas.
- **Micro-interacciones y UI Premium**: Material UI 3 sumado a Framer Motion aseguran una sensación táctil y premium incomparable.
- **Notificaciones WhatsApp**: Integración opcional con CallMeBot configurada desde el navegador; requiere credenciales propias y acceso al servicio externo. No existe un servidor de notificaciones push gestionado por el repositorio.

## 💻 Pila Tecnológica
- **Frontend Core**: React 18, Vite
- **Lenguaje**: TypeScript
- **Estilos y Componentes**: Material UI (M3), Emotion
- **Animaciones**: Framer Motion, Lucide React (Iconos)
- **Estados**: Zustand
- **Rutas**: React Router DOM (v7)

## 📦 Instalación y Despliegue Local

1. Prepara tu entorno con Node (>= 18.x recomendado).
2. Clona el repositorio e inicializa dependencias.

```bash
git clone https://github.com/manu-alvarez/TaskFlowPro.git
cd TaskFlowPro
npm ci
```

3. Crea una copia del archivo `.env.example` y renómbralo a `.env.local` (Opcional, si agregas variables secretas).
4. Inicializa el entorno de desarrollo:

```bash
npm run dev
```

La app se inicia en `http://localhost:8887` (servidor de desarrollo, no publicación de producción).

## 🌐 Deploy a Producción

La compilación y estandarización del bundle final se genera ejecutando:
```bash
npm run build
```
Esto arrojará todos los archivos listos dentro de la carpeta `dist/`. Despliégalos en tu Nginx o CDN preferido configurando la caída hacia `index.html` (comportamiento de SPA).

## Estado y arquitectura

- El **repositorio independiente TaskFlowPro** es la fuente de código para el frontend React/Vite. Las carpetas `MSB/apps/taskflow` y otras copias publicadas son artefactos de distribución; no deben modificarse como si fueran la fuente original sin una sincronización explícita.
- Las tareas y preferencias se conservan en el `localStorage` de cada navegador mediante Zustand `persist`. No existe sincronización entre dispositivos ni backend de cuentas.
- El Dashboard utiliza tareas persistidas, prioridades y fechas de vencimiento para estadísticas reales. El botón «Nueva Tarea» abre directamente el formulario; las fechas se guardan como `YYYY-MM-DD` y los indicadores se calculan por fecha local, sin valores demostrativos.
- Las claves de CallMeBot que se introduzcan en la interfaz quedan almacenadas en el navegador. **No introduzcas credenciales privilegiadas o compartidas**: las variables `VITE_*` y el almacenamiento cliente no son almacenes de secretos.

Pendiente de la fase de aceptación posterior: integración real de CallMeBot y comprobaciones de navegación y persistencia en navegadores.
