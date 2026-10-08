# LABORATORIO · ToDo FULL STACK

**Escuela Colombiana de Ingeniería Julio Garavito**  
**Curso:** Desarrollo y Operaciones de Software - DOSW  
**Caso de estudio:** ToDo · Sistema para gestión de tareas  
**Docente:** Rodrigo Gualtero

# FRONT-END
This repository manges the application front-end

#### NOTA 1: Los requerimientos y las descripcíón del proyecto se encunetran ubicados en el back-end en /docs/requirements/requiremnets.md

#### NOTA 2: Además se tiene en este README lo conserniente al desarrollo de la segunda parte del laboratorio 

---

# PARTE 11 · FRONT-END CON REACT

# 38. Crear React con Vite

Antes de usar este framework, es necesario descargar el framework de nodejs que ya incluye npm:

```bash
sudo dnf install nodejs
```

Desde la raíz:

```bash
npm create vite@latest frontend -- --template react
```

Instalar:

```bash
cd frontend
npm install
```

El README.md generado:

```text
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
```

Ejecutar:

```bash
npm run dev
```

Aplicación:

```text
http://localhost:5173
```

![p11_npm1.png](docs/evidence/p11_npm1.png)

---

# 39. Estructura sugerida

```text
front-end-lab06/
├── docs
└── src/
    │
    ├── api/
    │   └── taskApi.js
    │
    ├── features/
    │   └── tasks/
    │       │
    │       ├── components/
    │       │   ├── TaskForm.jsx
    │       │   ├── TaskList.jsx
    │       │   └── TaskItem.jsx
    │       │
    │       ├── hooks/
    │       │   └── useTasks.js
    │       │
    │       └── pages/
    │           └── TasksPage.jsx
    │
    ├── App.jsx
    └── main.jsx
```
#### Scaffolding Front-End evidence

![p11_scaffolding.png](docs/evidence/p11_scaffolding.png)

---

# 40. TaskForm

Crear un formulario para:

```text
Título
Descripción
Prioridad
Fecha límite
```

Debe servir para:

```text
Crear tarea
Editar tarea
```

---

# 41. TaskList

Mostrar:

```text
Título
Estado
Prioridad
Fecha límite
```

Acciones:

```text
Editar
Cambiar estado
Eliminar
```

---

# 42. Interfaz mínima

```text
-----------------------------------------------------
                    TO DO
-----------------------------------------------------

[ Nueva tarea ]

Título:       [________________________]

Descripción:  [________________________]

Prioridad:    [ MEDIUM v ]

Fecha límite: [ 2026-09-25 ]

              [ Guardar ]

-----------------------------------------------------

TAREAS

[HIGH] Terminar laboratorio
Estado: IN_PROGRESS
Fecha: 25/09/2026

[Editar] [Completar] [Eliminar]

-----------------------------------------------------

[MEDIUM] Preparar parcial
Estado: PENDING
Fecha: 27/09/2026

[Editar] [Iniciar] [Eliminar]

-----------------------------------------------------
```
Hasta esta parte ya hemos creado gran parte del front-end, y para visualizarlo rápidamente creamos un cóidgo temporal para el useTask.js y poder visualizar. Sin embargo, en el próximo paso haremos la versión correcta y mejoraremos un poco la interfaz.

![p11_temp_interface.png](docs/evidence/p11_temp_interface.png)

---

# PARTE 12 · CONSUMO DE RECURSOS REST

# 43. Crear taskApi.js

Crear:

```text
src/api/taskApi.js
```

Ejemplo:

```javascript
const API_URL = "http://localhost:8080/api/v1/tasks";

export async function getTasks() {
    // TODO
}

export async function getTask(id) {
    // TODO
}

export async function createTask(task) {
    // TODO
}

export async function updateTask(id, task) {
    // TODO
}

export async function deleteTask(id) {
    // TODO
}
```

---

# 44. Crear useTasks

Crear:

```text
useTasks.js
```

Utilizar:

```text
useState
useEffect
```

Debe manejar:

```text
tasks
loading
error

loadTasks()
addTask()
editTask()
removeTask()
```

---

# 45. Configurar CORS

React:

```text
http://localhost:5173
```

Spring Boot:

```text
http://localhost:8080
```

Crear:

```text
config/WebConfig.java
```

y permitir el origen:

```text
http://localhost:5173
```

![p12_cors.png](docs/evidence/p12_cors.png)

---

# PARTE 13 · PRUEBAS DEL FRONT-END

# 46. Herramientas

Utilizar:

```text
Vitest
React Testing Library
```
![p13_frameworks_intalation.png](docs/evidence/p13_frameworks_intalation.png)

Crear:

![p13_initial_npm_tests.png](docs/evidence/p13_initial_npm_tests.png)

```text
TaskForm.test.jsx
TaskList.test.jsx
TasksPage.test.jsx
```
#### SetupTests

![p13_setupTests.png](docs/evidence/p13_setupTests.png)

#### Package.json

![p13_package.json.png](docs/evidence/p13_package.json.png)

#### Vite.config.js

![p13_package.json.png](docs/evidence/p13_vite.config.js.png)

---

# 47. Pruebas mínimas

## TaskForm

```text
Renderiza el formulario.
Permite escribir un título.
Ejecuta la acción guardar.
Valida el título obligatorio.
```

## TaskList

```text
Renderiza tareas.
Muestra estado.
Muestra prioridad.
Ejecuta eliminar.
```

## TasksPage

```text
Carga tareas.
Muestra loading.
Muestra error cuando falla la API.
```

Las llamadas HTTP deben ser simuladas.

![p13_tests_ok.png](docs/evidence/p13_tests_ok.png)

---

# PARTE 14 · INTEGRACIÓN FULL STACK

# 48. Ejecutar PostgreSQL

```bash
docker start todo-postgres
```

Verificar:

```bash
docker ps
```

![p14_docker_sql.png](docs/evidence/p14_docker_sql.png)

---

# 49. Ejecutar Back-end

```bash
cd backend
mvn spring-boot:run
```

![p14_docker_sql.png](docs/evidence/p14_docker_sql.png)

---

# 50. Ejecutar Front-end

```bash
cd frontend
npm run dev
```

![p14_docker_sql.png](docs/evidence/p14_docker_sql.png)

---

# 51. Demostración obligatoria

Desde React realizar:

```text
Crear tarea
    ↓
Consultar tareas
    ↓
Editar tarea
    ↓
Cambiar estado
    ↓
Eliminar tarea
```

Flujo esperado:

```text
React
   ↓
HTTP
   ↓
REST Controller
   ↓
Service
   ↓
Repository
   ↓
JPA / Hibernate
   ↓
PostgreSQL
```
## React Steps (internal Flow)

### Step 1

![p14_step1_create.png](docs/evidence/p14_step1_create.png)

### Step 2

![p14_step2_findTasks.png](docs/evidence/p14_step2_findTasks.png)

### Step 3

![p14_step3_edit.png](docs/evidence/p14_step3_edit.png)

### Step 4

![p14_step4_status1.png](docs/evidence/p14_step4_status1.png)
![p14_step4_status2.png](docs/evidence/p14_step4_status2.png)

### Step 5

![p14_p14_step5_delete1.png](docs/evidence/p14_step5_delete1.png)
![p14_p14_step5_delete2.png](docs/evidence/p14_step5_delete2.png)

---

# PARTE 15 · BONUS · VISTA DE CALENDARIO SEMANAL

# 52. Crear TaskCalendar

Crear un componente adicional:

```text
TaskCalendar.jsx
```

Debe mostrar:

```text
              SEMANA 21 - 27 SEPTIEMBRE

-------------------------------------------------------------
 LUN        MAR        MIÉ        JUE        VIE        SÁB       DOM
-------------------------------------------------------------

Lab DOSW              Parcial              Entrega
HIGH                  MEDIUM               HIGH

-------------------------------------------------------------

[ < Semana anterior ]          [ Semana siguiente > ]
```

---

# 53. Requisitos del calendario

La vista debe:

- mostrar los siete días,
- ubicar las tareas según `dueDate`,
- mostrar estado,
- mostrar prioridad,
- permitir semana anterior,
- permitir semana siguiente,
- permitir seleccionar una tarea para editar,
- actualizarse después de crear, modificar o eliminar una tarea.

---

# 54. Endpoint opcional para el bono

Se puede implementar:

```http
GET /api/v1/tasks?from=2026-09-21&to=2026-09-27
```

En el Repository:

```java
findByDueDateBetween(...)
```

---

# 55. Pruebas del calendario

Crear:

```text
TaskCalendar.test.jsx
```

Probar:

```text
Renderiza siete días.

Ubica una tarea en la fecha correspondiente.

Permite cambiar de semana.

No muestra tareas que pertenecen a otra semana.
```

---

# PARTE 16 · EVIDENCIAS

# 56. Evidencias requeridas

Guardar en:

```text
docs/evidence/
```

Evidencia de:

1. PostgreSQL en Docker.
2. Tabla `tasks`.
3. Pruebas de Service.
4. Pruebas de Controller.
5. Reporte JaCoCo.
6. API funcionando.
7. Aplicación React.
8. Creación desde React.
9. Edición desde React.
10. Eliminación desde React.
11. Pruebas Front-end.
12. Vista semanal si desarrolló el bono.

---

# 57. Resultado final esperado

El repositorio deberá tener una estructura similar a:

```text
todo-fullstack/
│
├── backend/
├── frontend/
├── database/
│   └── 001_create_schema.sql
├── docs/
│   └── evidence/
└── README.md
```

---

# 58. Checklist final

## Back-end

- [X] Proyecto Maven.
- [X] Spring Boot.
- [X] Entidad JPA.
- [X] Repository.
- [X] Service.
- [X] REST Controller.
- [X] DTOs.
- [X] Manejo de errores.
- [X] PostgreSQL ejecutándose desde la imagen oficial de Docker.
- [X] Pruebas unitarias.
- [X] Reporte JaCoCo.

## Front-end

- [X] React.
- [X] Vite.
- [X] TaskForm.
- [X] TaskList.
- [X] Edición.
- [X] Eliminación.
- [X] Cambio de estado.
- [X] Consumo REST.
- [X] useState.
- [X] useEffect.
- [X] Pruebas unitarias.

## Integración

- [X] React consume Spring Boot.
- [X] Spring Boot persiste en PostgreSQL.
- [X] CRUD completo desde la interfaz.
- [X] Docker ejecuta PostgreSQL.

## Bono

- [ ] Vista semanal.
- [ ] Navegación entre semanas.
- [ ] Tareas reales desde la API.
- [ ] Pruebas del calendario.

---



---

# PARTE 17 · INFORME FINAL DEL LABORATORIO

# 60. Informe de resultados

Ubicación:

```text
docs/
└── informe-laboratorio.md
```

1. Integrantes del equipo
2. Enlace al repositorio
3. Descripción breve de la solución implementada
* Aplicación **ToDo** full-stack para gestionar tareas (título, descripción, prioridad, estado y fecha límite). El back-end es una API REST en Spring Boot con persistencia en PostgreSQL (ejecutado en Docker). El front-end es una SPA en React (Vite) que consume la API. Permite crear, listar, editar, cambiar de estado y eliminar tareas, e incluye pruebas unitarias en ambas capas.

## 4. Arquitectura final de la aplicación

```text
React (Vite, :5173)
   ↓  HTTP / JSON
API REST (Spring Boot, :8080)
   ↓
Controller → Service → Repository
   ↓
JPA / Hibernate
   ↓
PostgreSQL (Docker, volumen persistente)
```

5. Evidencias principales de funcionamiento
6. Resultados de las pruebas
7. Respuestas a las preguntas de análisis
8. Enlace al video de demostración

---

# 61. Preguntas de análisis

## Arquitectura

**1. Explique qué sucede desde el momento en que el usuario presiona Guardar tarea en React hasta que la tarea queda almacenada en PostgreSQL.**

`TaskForm` toma los datos del formulario y llama a `onSubmit`. `TasksPage` ejecuta `addTask` del hook `useTasks`, que llama a `createTask` en `taskApi.js`. Esta función hace un `fetch` POST con el JSON a `/api/v1/tasks`. El `TaskController` recibe el `TaskRequest`, lo valida y se lo pasa al `TaskService`. El Service aplica la lógica de negocio y usa el `TaskRepository`, que mediante JPA/Hibernate genera el `INSERT` en PostgreSQL. La respuesta (`TaskResponse`) vuelve por el mismo camino y el front recarga la lista.

**2. ¿Qué responsabilidad tiene cada una de estas capas en su implementación?**

- **Controller:** recibe las peticiones HTTP, valida la entrada y devuelve la respuesta con el código HTTP adecuado.
- **Service:** contiene la lógica de negocio (por ejemplo, estado inicial `PENDING`, errores si la tarea no existe) y convierte entre DTO y Entity.
- **Repository:** accede a la base de datos (`JpaRepository`).
- **Entity:** representa la tabla `tasks` mapeada con JPA.
- **DTO:** define los datos que entran (`TaskRequest`) y salen (`TaskResponse`) de la API, sin exponer la entidad.

**3. ¿Por qué el Front-end no se conecta directamente a PostgreSQL?**

Por seguridad: tendría que exponer credenciales y la base de datos en el navegador. Además, se saltaría la lógica de negocio y las validaciones, y quedaría acoplado a la base de datos. La API es el único punto de acceso controlado a los datos.

**4. ¿Qué problema tendría la aplicación si el Controller accediera directamente al Repository y además implementara allí la lógica de negocio?**

Se mezclarían responsabilidades: el Controller quedaría grande, difícil de mantener y de probar, y la lógica no se podría reutilizar. Cualquier cambio en reglas o en la base de datos afectaría la capa web, y las pruebas unitarias serían más complicadas.

## Persistencia

**5. ¿Cómo se relaciona `TaskEntity` con la tabla `tasks` de PostgreSQL?**

Con `@Entity` y `@Table(name = "tasks")`. Cada atributo se mapea a una columna (`@Column`), el `id` es la llave primaria (`@Id`, `@GeneratedValue`) y cada objeto `TaskEntity` representa una fila de la tabla.

**6. ¿Qué papel cumplen JPA, Hibernate y Spring Data JPA dentro de la solución?**

- **JPA:** es la especificación estándar para mapear objetos a tablas.
- **Hibernate:** es la implementación de JPA; genera y ejecuta el SQL.
- **Spring Data JPA:** simplifica el acceso a datos creando automáticamente la implementación del repositorio a partir de la interfaz.

**7. ¿Qué operaciones del CRUD proporciona `JpaRepository` sin necesidad de implementarlas manualmente?**

`save` (crear y actualizar), `findById`, `findAll`, `deleteById`, `delete`, `existsById` y `count`, además de paginación y ordenamiento.

**8. Explique por qué se utilizó `spring.jpa.hibernate.ddl-auto=validate` en lugar de permitir que Hibernate cree automáticamente toda la estructura de la base de datos.**

Porque el esquema se controla con scripts SQL versionados y Hibernate solo verifica que las entidades coincidan con las tablas. Con `create` o `update` podría modificar o borrar estructura sin control, lo que es peligroso fuera de desarrollo y genera diferencias entre equipos.
Y en este caso, se optó porque la base de datos es la que dirije el desarrollo, es decir, debemos acomodar todo con base en al base de datos y sus reglas.

## API REST

**9. Para cada operación del CRUD indique el método HTTP utilizado y explique por qué es apropiado.**

- **Crear:** `POST /api/v1/tasks`, porque crea un recurso nuevo.
- **Consultar:** `GET /api/v1/tasks` y `GET /api/v1/tasks/{id}`, porque solo lee datos sin modificarlos.
- **Actualizar:** `PUT /api/v1/tasks/{id}`, porque reemplaza un recurso existente y es idempotente.
- **Eliminar:** `DELETE /api/v1/tasks/{id}`, porque elimina el recurso indicado.

**10. ¿Cuál es la diferencia entre responder 200, 201, 204, 400, 404 y 500?**

- **200 OK:** la petición se procesó correctamente (consultas y actualizaciones).
- **201 Created:** se creó un recurso nuevo.
- **204 No Content:** éxito sin cuerpo en la respuesta (por ejemplo, al eliminar).
- **400 Bad Request:** el cliente envió datos inválidos.
- **404 Not Found:** el recurso solicitado no existe.
- **500 Internal Server Error:** error inesperado en el servidor.

**11. ¿Qué información intercambian React y Spring Boot y en qué formato se realiza esta comunicación?**

Intercambian los datos de las tareas (`id`, `title`, `description`, `status`, `priority`, `dueDate`) mediante peticiones HTTP, en formato **JSON**. Las fechas viajan en formato ISO `yyyy-MM-dd`.

## React

**12. ¿Qué responsabilidad tiene `taskApi.js` dentro del Front-end?**

Centraliza todas las llamadas HTTP a la API (`getTasks`, `createTask`, `updateTask`, `deleteTask`). Así los componentes no conocen la URL ni los detalles de `fetch`, y es fácil de simular en las pruebas.

**13. ¿Para qué utilizaron `useState` en la aplicación?**

Para guardar el estado local: en `useTasks` la lista `tasks`, `loading` y `error`; en `TaskForm` los valores del formulario; y en `TasksPage` la tarea que se está editando.

**14. ¿Para qué utilizaron `useEffect`?**

En `useTasks` para cargar las tareas desde la API al montar el componente, y en `TaskForm` para llenar el formulario cuando se selecciona una tarea para editar.

**15. Explique cómo se actualiza la pantalla después de crear, editar o eliminar una tarea.**

Después de cada operación exitosa, el hook llama a `loadTasks()`, que vuelve a pedir la lista a la API y actualiza el estado `tasks` con `setTasks`. Como React vuelve a renderizar al cambiar el estado, la pantalla muestra la información actualizada.

## Docker y PostgreSQL

**16. ¿Qué ventaja tuvo utilizar la imagen oficial de PostgreSQL en Docker en lugar de instalar PostgreSQL directamente en cada computador?**

Todos los integrantes usan la misma versión y configuración sin instalar nada manualmente. Se levanta con un solo comando, no ensucia el sistema operativo y se puede borrar y recrear fácilmente.

**17. Explique la diferencia entre `docker pull`, `docker run`, `docker stop`, `docker start` y `docker exec`.**

- **`docker pull`:** descarga una imagen desde el registro.
- **`docker run`:** crea y arranca un contenedor nuevo a partir de una imagen.
- **`docker stop`:** detiene un contenedor en ejecución.
- **`docker start`:** vuelve a iniciar un contenedor ya existente.
- **`docker exec`:** ejecuta un comando dentro de un contenedor en ejecución (por ejemplo, `psql`).

**18. ¿Por qué se utilizó un volumen Docker para PostgreSQL?**

Para que los datos persistan fuera del ciclo de vida del contenedor. Sin volumen, los datos se perderían al eliminar el contenedor.

**19. ¿Qué ocurriría con la información almacenada si se elimina el contenedor pero se conserva el volumen?**

La información se conserva. Al crear un nuevo contenedor de PostgreSQL y montar el mismo volumen, las tablas y los datos siguen disponibles.

## Pruebas

**20. ¿Por qué las pruebas unitarias del Service no deberían depender de una instancia real de PostgreSQL?**

Porque una prueba unitaria debe ser rápida, aislada y repetible. Depender de la base de datos la haría lenta, frágil (por datos previos o por la base apagada) y dejaría de probar solo la lógica del Service.

**21. ¿Qué dependencia se simuló con Mockito al probar `TaskService` y por qué?**

Se simuló el `TaskRepository`, para controlar lo que devuelve (por ejemplo, tarea existente o vacía) y probar la lógica del Service sin acceder a la base de datos.

**22. ¿Qué dependencia se simuló al probar `TaskController`?**

Se simuló el `TaskService` (con `@MockBean` / `@MockitoBean` y `MockMvc`), para probar solo las rutas, los códigos HTTP y la validación del Controller.

**23. Mencione un error que haya sido detectado por una prueba durante el desarrollo y explique cómo fue corregido.**

En la prueba "renderiza tareas" de `TaskList`, la búsqueda `getByText("25/09/2026")` falló porque en `TaskItem` el texto del párrafo es `Fecha: 25/09/2026`. Se corrigió usando una expresión regular (`getByText(/25\/09\/2026/)`), que acepta texto parcial.

**24. ¿Qué información proporciona JaCoCo y por qué un porcentaje alto de cobertura no garantiza por sí solo que las pruebas sean buenas?**

JaCoCo indica qué porcentaje de líneas, ramas y métodos se ejecutaron durante las pruebas. Una cobertura alta solo muestra que el código se ejecutó, no que se verificara correctamente: una prueba sin aserciones o que no cubre casos límite también sube el porcentaje sin detectar errores.

## Integración

**25. Diagrama del flujo completo y explicación.**

```text
React
   ↓
API REST
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
JPA / Hibernate
   ↓
PostgreSQL
```

React envía una petición HTTP con JSON a la API REST. El Controller la recibe, valida los datos y llama al Service. El Service aplica la lógica de negocio y pide al Repository guardar o consultar. Spring Data JPA, con Hibernate, traduce esas operaciones a SQL y las ejecuta en PostgreSQL. La respuesta recorre el camino inverso: la base de datos devuelve los datos, el Service y el Controller los convierten en un `TaskResponse` y React los muestra en pantalla.

---

# PARTE 18 · VIDEO DE FUNCIONAMIENTO

# 62. Video obligatorio

Cada equipo deberá entregar un video corto mostrando el funcionamiento completo de la aplicación.

Duración recomendada:

```text
5 a 8 minutos
```

El video debe mostrar la aplicación funcionando **completamente en ambiente local**.

No se requiere despliegue en Internet.

---

# 63. Qué debe aparecer en el video

El video deberá mostrar, como mínimo, el siguiente recorrido.

## 1. PostgreSQL en Docker

Mostrar la imagen descargada:

```bash
docker images
```

Mostrar el contenedor ejecutándose:

```bash
docker ps
```

Mostrar que la tabla existe:

```bash
docker exec -it todo-postgres psql -U todo_user -d todo_db
```

y ejecutar:

```sql
SELECT * FROM tasks;
```

---

## 2. Back-end

Mostrar Spring Boot ejecutándose localmente:

```bash
cd backend
mvn spring-boot:run
```

La API deberá estar disponible en:

```text
http://localhost:8080
```

---

## 3. Pruebas del Back-end

Ejecutar:

```bash
mvn clean test
```

o:

```bash
mvn clean verify
```

Mostrar que las pruebas terminan correctamente.

---

## 4. Front-end

Mostrar React ejecutándose:

```bash
cd frontend
npm run dev
```

Abrir:

```text
http://localhost:5173
```

---

## 5. CRUD completo desde React

Desde la interfaz se debe demostrar:

```text
Crear una tarea
        ↓
Consultar las tareas
        ↓
Editar una tarea
        ↓
Cambiar su estado
        ↓
Eliminar la tarea
```

Todas estas operaciones deben realizarse desde React.

No es suficiente mostrar únicamente las peticiones en Postman.

---

## 6. Evidencia de persistencia

Durante el video se debe demostrar que una operación realizada desde React realmente modifica PostgreSQL.

Por ejemplo:

1. Crear una tarea desde React.
2. Consultar PostgreSQL.
3. Mostrar que la nueva tarea aparece en la tabla.

Luego se puede modificar o eliminar desde React y volver a consultar la base.

---

## 7. Pruebas del Front-end

Ejecutar las pruebas configuradas con Vitest.

Ejemplo:

```bash
npm test
```

o el comando definido por el equipo en `package.json`.

Mostrar que las pruebas terminan correctamente.

---

## 8. Bono de calendario

Si el equipo implementó el bono, deberá mostrar:

- vista semanal,
- navegación entre semanas,
- tareas ubicadas según `dueDate`,
- edición de una tarea desde la vista,
- actualización del calendario después de modificar los datos.

---

# 64. Explicación durante el video

El video no debe limitarse a mostrar pantallas.

Cada integrante deberá participar explicando alguna parte de la solución.

Durante la demostración deben explicar brevemente:

- cómo React consume la API,
- cómo llega la petición al Controller,
- qué hace el Service,
- cómo interviene el Repository,
- cómo JPA persiste la información,
- dónde queda almacenada la información,
- cómo comprobaron el funcionamiento mediante pruebas.

---

# 65. Entrega del video

El video podrá publicarse en:

```text
YouTube como video no listado
Google Drive
OneDrive
```

El enlace deberá quedar registrado en:

```text
docs/informe-laboratorio.md
```

Ejemplo:

```markdown
## Video de demostración

https://...
```

El enlace debe tener permisos de visualización activos al momento de la entrega.

---

# 66. Entrega final

La entrega se considera completa cuando el repositorio contiene:

```text
todo-fullstack/
│
├── backend/
├── frontend/
├── database/
├── docs/
│   ├── evidence/
│   └── informe-laboratorio.md
└── README.md
```

y el informe incluye:

- respuestas a las preguntas,
- evidencias,
- resultados de las pruebas,
- enlace al video.

El video debe demostrar la aplicación funcionando localmente con:

```text
React
Spring Boot
PostgreSQL en Docker
```


# 59. Referencias

Spring Initializr  
https://start.spring.io/

Spring Boot  
https://spring.io/projects/spring-boot

Spring Data JPA  
https://spring.io/projects/spring-data-jpa

PostgreSQL  
https://www.postgresql.org/

Docker PostgreSQL  
https://hub.docker.com/_/postgres

React  
https://react.dev/

Vite  
https://vite.dev/

Vitest  
https://vitest.dev/

React Testing Library  
https://testing-library.com/docs/react-testing-library/intro/
