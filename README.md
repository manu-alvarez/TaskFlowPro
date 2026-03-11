# TaskFlowPro

![TaskFlowPro Banner](https://img.shields.io/badge/TaskFlowPro-Premium%20Edition-black?style=for-the-badge&logo=react) 

Aplicación premium de gestión de tareas construida desde cero priorizando la experiencia de usuario, interacciones fluidas mediante Web Animations y persistencia de datos.

## 🚀 Características Principales

- **Gestión Avanzada**: Tablero interactivo con creación y organización de tareas fluida.
- **Categorización Flexible**: Permite administrar etiquetas o contextos específicos para tus objetivos diarios.
- **Micro-interacciones y UI Premium**: Material UI 3 sumado a Framer Motion aseguran una sensación táctil y premium incomparable.
- **Alertas Push y WhatsApp**: Integración experimental para ser notificado de eventos claves de las tareas.

## 💻 Pila Tecnológica
- **Frontend Core**: React 18, Vite
- **Lenguaje**: TypeScript
- **Estilos y Componentes**: Material UI (M3), Emotion
- **Animaciones**: Framer Motion, Lucide React (Iconos)
- **Estados**: Zustand
- **Rutas**: React Router DOM (v6)

## 📦 Instalación y Despliegue Local

1. Prepara tu entorno con Node (>= 18.x recomendado).
2. Clona el repositorio e inicializa dependencias.

```bash
git clone https://github.com/TU_USUARIO/TaskFlowPro.git
cd TaskFlowPro
npm install
```

3. Crea una copia del archivo `.env.example` y renómbralo a `.env.local` (Opcional, si agregas variables secretas).
4. Inicializa el entorno de desarrollo:

```bash
npm run dev
```

La app estará corriendo de forma segura en `localhost:8887`.

## 🌐 Deploy a Producción

La compilación y estandarización del bundle final se genera ejecutando:
```bash
npm run build
```
Esto arrojará todos los archivos listos dentro de la carpeta `dist/`. Despliégalos en tu Nginx o CDN preferido configurando la caída hacia `index.html` (comportamiento de SPA).
