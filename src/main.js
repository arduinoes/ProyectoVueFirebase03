import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDF3MX2SzdanQXlOGWFudqTPjX37JJljDo",
  authDomain: "fir-3cd29.firebaseapp.com",
  projectId: "fir-3cd29",
  storageBucket: "fir-3cd29.appspot.com",
  messagingSenderId: "669805638608",
  appId: "1:669805638608:web:2b40046fd5b4a7c52bbfd5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

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

createApp(App).use(store).use(router).mount('#app')

