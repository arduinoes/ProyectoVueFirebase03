# AUTH autentificación

## Atención acuérdate de intalar los Módulos

Instala los modulos, vete a terminal, nuevo terminal y escribe:
```
npm install
```

## TEMPLATE Navbar

### Botones modales

En componentes **Navbar** añadimos los botones para abrir los modales después de </form>:

```html
 <!-- Después de la etiqueta </form> --> 
 <!-- Iniciar sesión --> 
<button type="button" class="btn btn-outline-primary mx-2" 
  data-bs-toggle="modal" 
  data-bs-target="#login">
  Log in
</button> 
 <!-- Cerrar sesión -->   
<button class="btn btn-outline-danger me-2"
  data-bs-toggle="modal" 
  data-bs-target="#login"
  @click="signout">
  Log out
</button>
 <!-- Regístrate --> 
<button type="button" 
  class="btn btn-outline-warning" 
  data-bs-toggle="modal" 
  data-bs-target="#registro"><!-- inicia modal con id="registro" --> 
  Regístrate
</button> 
```
### Modal Regístrate

Crea un formulario con:
- Correo electrónico
- Contraseña
- Repita la contraseña
- Botón de envío

```html
<!-- //// Modal - Registrarse //// -->
<div class="modal fade" id="registro">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Regístrate</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="register( this.email, this.password )">  
           <!-- CORREO -->
          <div class="input-group mb-3">
          <span class="input-group-text">Correo</span>
          <input v-model="email" 
                  type="email"
                  required="true"
                  class="form-control">
          </div>
          <!-- PASSWORD -->
          <div class="input-group mb-3">
          <span class="input-group-text">Password</span>
          <input v-model="password" 
                  type="password"
                  required="true" 
                  class="form-control">
          </div>
          <!-- REPASSWORD -->
          <div class="input-group mb-3">
          <span class="input-group-text">Repite Password</span>
          <input v-model="repassword" 
                  type="password"
                  required="true" 
                  class="form-control">
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
```

### Modal iniciar sesión

Crea un formulario con:
- Correo electrónico
- Contraseña
- Botón de envío

```html
<!-- //// Modal - Iniciar sesión //// -->
<div class="modal fade" id="login">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Inicia de sesión</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="login( this.email, this.password )">
          <!-- CORREO --> 
          <div class="input-group mb-3">
          <span class="input-group-text">Correo</span>
          <input v-model="email" 
                  type="email"
                  required="true"
                  class="form-control">
          </div>
          <!-- PASSWORD --> 
          <div class="input-group mb-3">
          <span class="input-group-text">Password</span>
          <input v-model="password" 
                  type="password"
                  required="true" 
                  class="form-control">
          </div>
          <div class="d-grid gap-2">
            <button type="submit" 
              class="btn btn-primary" 
              data-bs-dismiss="modal"><!-- Cierra el modal --> 
              Iniciar sesión
            </button>
          </div>
          </form>
      </div>
    </div>
  </div>
</div>
```

## SCRIPT Navbar 

### Iniciar sesión, cerrar sesión y registrase

- Importamos **auth** de **firebase**
- Creamos los datos **email** y **password**
- Función register(), login() y logout()

```js
<script>
import { 
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
  } from "firebase/auth";

export default {
  name: 'Navbar',
   data() {
        return {
            email: '',
            password: '',
            repassword: '',
            errorMessage: ''
        };
    },
   methods: {
     register(email, password) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('¡Registrado!');
        })
        .catch((error) => {
            const errorCode = error.code;
            this.errorMessage = error.message;
            alert(this.errorMessage);
            // ..
        });
      },        
     login( email, password ) {
       const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert('¡Sesión iniciada!');
            // Signed in
            const user = userCredential.user;
            // ...
            })
        .catch((error) => {
        const errorCode = error.code;
        this.errorMessage = error.message;
        alert(this.errorMessage);
        });
        },
     signout () {
       const auth = getAuth();
      signOut(auth).then(() => {
        alert('¡Sesión cerrada! Inicia sesión.');
      }).catch((error) => {
      });
     }
   }
}
</script>
```

## USUARIO LOG IN

### onAuthStateChanged

En el archivo **main.js** añade este código

```js
// Importa la funcion onAuthStateChanged
import { getAuth, onAuthStateChanged } from "firebase/auth";
// Función 
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user)
      const usuarioActivo ={
        email: user.email,
        uid: user.uid
      }
     store.dispatch('detectarUsuario', usuarioActivo)
     console.log(usuarioActivo)
    // ...
  } else {
    console.log(user)
    store.dispatch('detectarUsuario', user)
    // User is signed out
    // ...
  } 
});
```
## STORE

### Actions / mutations / state/ getters

Copia y pega en **/store/index.js**

```js
import { createStore } from 'vuex'

export default createStore({
  state: {
    usuario: null,
  },
  mutations: {
    setUsuario(state, payload){
      state.usuario = payload
    }
  },
  // Recibe datos de onAuthStateChanged (main.js)
  actions: {
    detectarUsuario({commit}, usuario){
      commit('setUsuario', usuario)
    }
  },
  // Devuelve true/false si existe un usuario
  getters: {
    existeUsuario(state){
      if(state.usuario === null){
        return false;
      }else{
        return true;
      }
    }
  },
  modules: {
  }
})
```
### ...mapGetters

En el script:
```js
// Importamos mapGetters
import { mapGetters } from 'vuex'
// Añadimos en computed
  computed: {
    ...mapGetters(['existeUsuario'])
  }
```

En el template del archvo ***Navbar.vue**

En los botones:

- Iniciar sesión añadimos **v-if="!existeUsuario"**
- Cerrar sesión añadimos **v-if="existeUsuario"**
- Registro añadimos **v-if="!existeUsuario"**

```html
<!-- Utilizamos v-if para mostrar/ocultar los botones --> 
 v-if="!existeUsuario"
```

## MODIFICANDO LA BARRA DE NAVEGACIÓN

Modifica la navegación cambiando los botones por:

```html
<!-- HOME -->
<router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
<!-- ABOUT -->
<router-link v-if="existeUsuario" class="nav-link active" aria-current="page" to="/about">About</router-link>
```


## RUTAS PROTEGIDAS

### Router / requiresAuth

En el archivo **/router/indes.js** añadimos el código:

```js
// Importamos auth
import { getAuth } from "firebase/auth";
// Añadimos el meta: a la ruta
meta: {requiresAuth: true},
// Incluimos la función
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    const auth = getAuth();
    const usuario = auth.currentUser;
    console.log ('usuario desde router', usuario)
    if(!usuario){
      next({path: '/'})
    }else{
      next()
    }
  } else {
    next()
  }
})
```
