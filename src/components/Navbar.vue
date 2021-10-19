<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>          </li>
          <li class="nav-item">
           <router-link v-if="existeUsuario" class="nav-link active" aria-current="page" to="/about">About</router-link>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success me-2" type="submit">Search</button>
        </form>
         <!-- Iniciar sesión --> 
<button v-if="!existeUsuario" type="button" class="btn btn-outline-primary mx-2" 
  data-bs-toggle="modal" 
  data-bs-target="#login">
  Log in
</button> 
 <!-- Cerrar sesión -->   
<button v-if="existeUsuario" class="btn btn-outline-danger me-2"
  data-bs-toggle="modal" 
  data-bs-target="#login"
  @click="signout">
  Log out
</button>
 <!-- Regístrate --> 
<button v-if="!existeUsuario" type="button" 
  class="btn btn-outline-warning" 
  data-bs-toggle="modal" 
  data-bs-target="#registro"><!-- inicia modal con id="registro" --> 
  Regístrate
</button> 

      </div>
    </div>
  </nav>
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
</template>

<script>
import { 
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
  } from "firebase/auth";
  import { mapGetters } from 'vuex'

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
   },
    computed: {
    ...mapGetters(['existeUsuario'])
  }
}
</script>
