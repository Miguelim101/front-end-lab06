# Laboratorio de extensión · App ToDo: seguridad con Spring Security y JWT

**Escuela Colombiana de Ingeniería Julio Garavito**  
**Asignatura:** Desarrollo y Operaciones de Software (DOSW)  
**Caso de estudio:** App ToDo · Gestión de tareas  
**Base del laboratorio:** [Lab6-G4-AppToDo](https://github.com/DOSW-2026-2/Lab6-G4-AppToDo/blob/main/README.md)  
**Tema central:** autenticación, autorización, JSON Web Tokens (JWT) y protección de APIs REST.

---

# 6. Desarrollo del laboratorio · Paso a paso

## Parte 6 · Frontend React

Incorporar componentes o páginas (los nombres son sugeridos):

```text
frontend/src/
├── api/
│   ├── authApi.js
│   └── taskApi.js
├── features/
│   ├── auth/
│   │   ├── components/LoginForm.jsx
│   │   ├── components/RegisterForm.jsx
│   │   └── context/AuthContext.jsx
│   └── tasks/
│       └── ... componentes ya existentes ...
└── App.jsx
```

**Comportamiento requerido:**

- Mostrar registro e inicio de sesión cuando no hay una sesión válida.
- Consumir `/auth/login` y conservar el token **en memoria** (Context, estado o solución equivalente).
- Incorporar `Authorization: Bearer ...` en peticiones protegidas desde `taskApi.js`.
- Mostrar un estado de carga y mensajes adecuados cuando un recurso falle.
- Si el backend responde `401` por token expirado, limpiar la sesión y redirigir al login.
- Agregar botón **Cerrar sesión** que elimine el estado de autenticación.
- Evitar mostrar las tareas del usuario anterior después del cierre de sesión.
- Si existe calendario semanal, mantenerlo protegido y filtrado por propietario.

**Decisión para este laboratorio:** conservar el token en memoria y solicitar nuevo login después de recargar la página. Esto evita persistir JWT en `localStorage`; la aplicación deberá documentar la consecuencia de perder la sesión al recargar. No se exige implementar cookies ni refresh tokens.

### Mockup de referencia · Inicio de sesión

```text
┌─────────────────────────────────────────────┐
│                    TO DO                    │
│                INICIAR SESIÓN               │
│                                             │
│ Correo                                      │
│ [_______________________________________]   │
│ Contraseña                                  │
│ [_______________________________________]   │
│                                             │
│           [  Iniciar sesión  ]              │
│                                             │
│        ¿No tienes cuenta? Regístrate       │
└─────────────────────────────────────────────┘
```

### Mockup de referencia · Tareas autenticadas

```text
┌────────────────────────────────────────────────────────┐
│ TO DO                       Ana Pérez  [Cerrar sesión] │
├────────────────────────────────────────────────────────┤
│ MIS TAREAS                      [ + Nueva tarea ]       │
│                                                        │
│  [HIGH] Entregar laboratorio       PENDING              │
│         Fecha límite: 25/10        [Editar] [Eliminar]  │
│                                                        │
│  [LOW] Organizar apuntes          COMPLETED             │
│         Fecha límite: 27/10        [Editar] [Eliminar]  │
└────────────────────────────────────────────────────────┘
```

*Estos prototipos indican componentes mínimos; el diseño gráfico es libre.*
