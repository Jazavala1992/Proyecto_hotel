# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al **Sistema de Gestión Hotelera Multi-Base de Datos**!

---

## 📋 Índice

1. [Código de Conducta](#código-de-conducta)
2. [¿Cómo Contribuir?](#cómo-contribuir)
3. [Configuración del Entorno](#configuración-del-entorno)
4. [Flujo de Trabajo](#flujo-de-trabajo)
5. [Estándares de Código](#estándares-de-código)
6. [Testing](#testing)
7. [Reportar Bugs](#reportar-bugs)
8. [Solicitar Funcionalidades](#solicitar-funcionalidades)

---

## 📜 Código de Conducta

Este proyecto se adhiere a un código de conducta profesional. Al participar, te comprometes a:

- ✅ Ser respetuoso y constructivo
- ✅ Aceptar críticas constructivas
- ✅ Enfocarte en lo que es mejor para la comunidad
- ✅ Mostrar empatía hacia otros miembros

---

## 🚀 ¿Cómo Contribuir?

Hay varias formas de contribuir:

### 1. Reportar Bugs 🐛
Encontraste un error? [Crea un issue](https://github.com/Jazavala1992/Proyecto_hotel/issues/new)

### 2. Sugerir Mejoras 💡
Tienes una idea? [Abre una discusión](https://github.com/Jazavala1992/Proyecto_hotel/discussions)

### 3. Escribir Código 👨‍💻
Sigue el flujo de trabajo descrito abajo

### 4. Mejorar Documentación 📝
La documentación siempre puede mejorar

### 5. Agregar Tests ✅
Más cobertura de tests es bienvenida

---

## ⚙️ Configuración del Entorno

### Prerrequisitos

```bash
# Node.js 16 o superior
node --version

# PostgreSQL 15 (o MySQL, SQL Server, Oracle)
psql --version

# Git
git --version
```

### Instalación

```bash
# 1. Fork el repositorio en GitHub

# 2. Clona tu fork
git clone https://github.com/TU_USUARIO/Proyecto_hotel.git
cd Proyecto_hotel

# 3. Configura el remoto upstream
git remote add upstream https://github.com/Jazavala1992/Proyecto_hotel.git

# 4. Instala dependencias del backend
cd backend
npm install

# 5. Instala dependencias del frontend
cd ../frontend
npm install

# 6. Configura variables de entorno
cd ../backend
cp .env.example .env
# Edita .env con tus credenciales

# 7. Inicializa la base de datos
psql -U postgres -f ../init-scripts/01-create-tables.sql
psql -U postgres -d hotel_db -f ../init-scripts/02-insert-data.sql
psql -U postgres -d hotel_db -f ../init-scripts/03-functions.sql
psql -U postgres -d hotel_db -f ../init-scripts/04-procedures.sql
psql -U postgres -d hotel_db -f ../init-scripts/05-triggers.sql
psql -U postgres -d hotel_db -f ../init-scripts/06-funcionalidades-adicionales.sql
```

---

## 🔄 Flujo de Trabajo

### Paso 1: Actualiza tu fork

```bash
git checkout main
git fetch upstream
git merge upstream/main
```

### Paso 2: Crea una rama

```bash
# Nomenclatura: tipo/descripcion-corta
git checkout -b feature/agregar-dashboard
git checkout -b fix/corregir-reservas
git checkout -b docs/actualizar-readme
```

**Tipos de ramas:**
- `feature/` - Nueva funcionalidad
- `fix/` - Corrección de bug
- `docs/` - Cambios en documentación
- `refactor/` - Refactorización de código
- `test/` - Agregar o mejorar tests
- `chore/` - Tareas de mantenimiento

### Paso 3: Haz tus cambios

```bash
# Edita los archivos necesarios
# Asegúrate de seguir los estándares de código
```

### Paso 4: Commit

```bash
git add .
git commit -m "tipo: descripción clara del cambio

Explicación más detallada si es necesario.

Resolves #123"
```

**Formato de commits:**
```
tipo: descripción corta (máximo 50 caracteres)

[cuerpo opcional con más detalles]

[referencia a issues: Resolves #123, Closes #456]
```

**Tipos de commit:**
- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bug
- `docs:` - Cambios en documentación
- `style:` - Formato, punto y coma, etc.
- `refactor:` - Refactorización de código
- `test:` - Agregar tests
- `chore:` - Tareas de mantenimiento

**Ejemplos:**
```bash
feat: agregar endpoint para reportes de ocupación

fix: corregir cálculo de total en pagos
Resuelve el issue #45 donde los pagos no sumaban correctamente

docs: actualizar guía de instalación de MySQL

refactor: simplificar lógica de adaptador de queries

test: agregar tests unitarios para hotels.js
```

### Paso 5: Push y Pull Request

```bash
git push origin feature/tu-rama
```

Luego en GitHub:
1. Ve a tu fork
2. Click en "Compare & pull request"
3. Describe tus cambios
4. Espera revisión

---

## 📐 Estándares de Código

### JavaScript/Node.js

```javascript
// ✅ BIEN: Variables descriptivas
const hotelReservations = await getReservations(hotelId);

// ❌ MAL: Variables crípticas
const hrs = await getRes(hid);

// ✅ BIEN: Funciones con JSDoc
/**
 * Obtiene todas las reservas de un hotel
 * @param {number} hotelId - ID del hotel
 * @returns {Promise<Array>} Lista de reservas
 */
async function getHotelReservations(hotelId) {
  // ...
}

// ✅ BIEN: Manejo de errores
try {
  const result = await executeQuery(pool, query, params);
  return result.rows;
} catch (error) {
  console.error('Error al obtener reservas:', error);
  throw error;
}

// ❌ MAL: Sin manejo de errores
const result = await executeQuery(pool, query, params);
return result.rows;
```

### SQL

```sql
-- ✅ BIEN: Query formateada
SELECT 
  h.id,
  h.nombre,
  COUNT(r.id) as total_reservas
FROM hoteles h
LEFT JOIN reservas r ON h.id = r.hotel_id
WHERE h.activo = true
GROUP BY h.id, h.nombre
ORDER BY total_reservas DESC;

-- ❌ MAL: Query en una línea
SELECT h.id,h.nombre,COUNT(r.id) as total_reservas FROM hoteles h LEFT JOIN reservas r ON h.id=r.hotel_id WHERE h.activo=true GROUP BY h.id,h.nombre ORDER BY total_reservas DESC;
```

### React

```javascript
// ✅ BIEN: Componente limpio con hooks
import React, { useState, useEffect } from 'react';
import api from '../api';

function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const data = await api.getHotels();
      setHotels(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="hotel-list">
      {hotels.map(hotel => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}

export default HotelList;
```

### Estructura de Archivos

```
backend/
├── config/         # Configuraciones (DB, etc)
├── routes/         # Endpoints de la API
├── middleware/     # Middlewares de Express
├── utils/          # Funciones utilitarias
└── tests/          # Tests unitarios
```

---

## ✅ Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Cobertura

```bash
npm run test:coverage
```

**Objetivo:** Mantener cobertura > 80%

---

## 🐛 Reportar Bugs

Al reportar un bug, incluye:

### Template de Bug Report

```markdown
**Descripción del Bug**
Descripción clara y concisa del problema.

**Para Reproducir**
Pasos para reproducir:
1. Ve a '...'
2. Click en '...'
3. Scroll hasta '...'
4. Ver error

**Comportamiento Esperado**
Qué esperabas que sucediera.

**Screenshots**
Si aplica, agrega capturas de pantalla.

**Entorno:**
 - OS: [ej. macOS 14.0]
 - Node: [ej. 18.17.0]
 - Base de Datos: [ej. PostgreSQL 15]
 - Browser: [ej. Chrome 118]

**Contexto Adicional**
Cualquier otra información relevante.
```

---

## 💡 Solicitar Funcionalidades

### Template de Feature Request

```markdown
**¿La funcionalidad está relacionada a un problema?**
Descripción clara del problema. Ej: "Siempre me frustra que [...]"

**Describe la solución que te gustaría**
Descripción clara de lo que quieres que suceda.

**Describe alternativas consideradas**
Otras soluciones o funcionalidades alternativas.

**Contexto Adicional**
Mockups, ejemplos, referencias, etc.
```

---

## 🔍 Checklist antes del Pull Request

Antes de enviar tu PR, verifica:

- [ ] ✅ El código compila sin errores
- [ ] ✅ Los tests pasan (`npm test`)
- [ ] ✅ Agregaste tests para tu código nuevo
- [ ] ✅ La documentación está actualizada
- [ ] ✅ El código sigue los estándares del proyecto
- [ ] ✅ No hay console.logs de debug
- [ ] ✅ Los commits tienen mensajes descriptivos
- [ ] ✅ No hay conflictos con la rama main
- [ ] ✅ El .env no está en el commit

---

## 📚 Recursos Útiles

- [Documentación Node.js](https://nodejs.org/docs/)
- [Documentación Express](https://expressjs.com/)
- [Documentación React](https://react.dev/)
- [Documentación PostgreSQL](https://www.postgresql.org/docs/)
- [Git Best Practices](https://git-scm.com/book/en/v2)

---

## 🎯 Áreas que Necesitan Ayuda

Estamos buscando contribuciones en:

1. **Tests Unitarios** - Aumentar cobertura
2. **Documentación** - Mejorar ejemplos y guías
3. **Performance** - Optimizar queries
4. **UI/UX** - Mejorar interfaz del frontend
5. **Internacionalización** - Agregar más idiomas
6. **Docker** - Mejorar configuración de contenedores

---

## 💬 Comunidad

- **Issues:** Para bugs y features
- **Discussions:** Para preguntas y discusiones
- **Pull Requests:** Para contribuciones de código

---

## 📄 Licencia

Al contribuir, aceptas que tus contribuciones serán licenciadas bajo la [MIT License](LICENSE).

---

## 🙏 Agradecimientos

¡Gracias por contribuir al proyecto! Cada contribución, grande o pequeña, es valiosa.

**Happy Coding!** 🚀
