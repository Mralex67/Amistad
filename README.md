# Flores Amarillas para Stefany 🌻

Aplicación web interactiva creada para celebrar la amistad sincera con un ramo en 3D que florece paso a paso y la canción oficial *"Flores Amarillas"* de Floricienta.

---

## 🚀 Cómo publicar en GitHub Pages (Guía Rápida)

Para que la web cargue correctamente en GitHub Pages sin pantallas en blanco ni errores:

### Opción 1: Con GitHub Actions (Automático - Recomendado)
1. Sube este repositorio a tu cuenta de GitHub.
2. Entra a tu repositorio en GitHub y ve a **Settings** (Configuración) > **Pages** (en el menú lateral).
3. En la sección **Build and deployment**, cambia el desplegable **Source** de *"Deploy from a branch"* a **`GitHub Actions`**.
4. ¡Listo! La acción incluida en `.github/workflows/deploy.yml` compilará la web y la publicará automáticamente en tu enlace de GitHub Pages (`https://tu-usuario.github.io/tu-repo/`).

---

### Opción 2: Con el comando `npm run deploy`
Si tienes el repositorio clonado en tu computadora:
```bash
npm install
npm run deploy
```
Este comando compilará el proyecto y subirá la carpeta `dist` automáticamente a la rama `gh-pages`. Luego en **Settings > Pages** seleccionas la rama `gh-pages` y `/ (root)`.

---

### Opción 3: Despliegue en 30 segundos en Vercel o Netlify (Gratis)
- **Vercel**: Importa tu repositorio de GitHub en [vercel.com](https://vercel.com) y haz clic en *Deploy*. Detecta Vite automáticamente.
- **Netlify**: Arrastra la carpeta `dist/` a [app.netlify.com/drop](https://app.netlify.com/drop) y tendrás un enlace público al instante.

---

## 💻 Desarrollo local

```bash
npm install
npm run dev
```
Abre en tu navegador: `http://localhost:3000`
