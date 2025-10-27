# 🧪 Proyecto de Automatización con Playwright + Cucumber (TypeScript)

Este proyecto automatiza flujos de prueba sobre la aplicación Sauce Demo utilizando Playwright, Cucumber (BDD) y el patrón Page Object Model (POM).

Los escenarios cubren autenticación, manejo de carrito y checkout completo.

---

## 💻 Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu equipo:

| Herramienta | Descripción | Verificación |
|--------------|--------------|---------------|
| **Node.js (v18 o superior)** | Entorno de ejecución de JavaScript necesario para Playwright y Cucumber. | `node -v` |
| **npm (v9 o superior)** | Administrador de paquetes incluido con Node.js. | `npm -v` |
| **Git** *(opcional)* | Para clonar el repositorio desde un control de versiones. | `git --version` |
| **Visual Studio Code** *(recomendado)* | Editor para desarrollar y ejecutar pruebas. | — |
| **Google Chrome / Chromium** *(opcional)* | Navegadores para ejecutar Playwright (Playwright instala los suyos). | — |

> 💡 Si no tienes Node.js, descárgalo desde:  
> 👉 [https://nodejs.org/](https://nodejs.org/)

---

## ⚙️ Instalación del proyecto

### 1. **Clonar el repositorio** o copiar los archivos en tu máquina local:

```bash
git clone https://github.com/tu-usuario/test-play-web-saucedemo.git
cd test-play-web-saucedemo
```

### 2. **Instalar dependencias:**

```bash
npm install
```

### 3. **Instalar los navegadores de Playwright:**

```bash
npm run playwright:install
```

### 4. **Configurar el archivo .env:**

```bash
BASE_URL=https://www.saucedemo.com/
HEADLESS=true
```

---

## 🚀 Ejecución de pruebas

### 🔹 Modo normal (headless)

Ejecuta todas las pruebas sin abrir el navegador:

```bash
npm test
```

### 🔹 Modo visual (headed)

Abre el navegador y muestra la ejecución en tiempo real:

```bash
HEADLESS=false npm test
```

---

## 🧾 Generar reporte HTML

Después de ejecutar las pruebas, genera un reporte visual en HTML:

```bash
npm run report
```