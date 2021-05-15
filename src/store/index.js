import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from '../../firebaseConfig';

firebase.initializeApp(firebaseConfig);

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    estaAutenticado: false,
    datosUsuario: null,
  },
  mutations: {
    setearDatosUsuario(state, datosUsuario) {
      state.datosUsuario = { ...datosUsuario };
      state.estaAutenticado = true;
    },
    cerrarSesion(state) {
      state.datosUsuario = null;
      state.estaAutenticado = false;
    }
  },
  getters: {
    estaAutenticado: (state) => state.estaAutenticado,
  },
  actions: {
    async autenticarUsuario(context, payload) {
      try {
        const { email, password } = payload;
        const auth = firebase.auth();
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        context.commit('setearDatosUsuario', userCredential);
        return true;
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error al autenticar: ${errorCode}, ${errorMessage}`);
        return false;
      }
    },
    async cerrarSesion(context) {
      try {
        const auth = firebase.auth();
        await auth.signOut();
        context.commit('cerrarSesion');
        return true;
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error cerrar sesión: ${errorCode}, ${errorMessage}`);
        return false;
      }
    }
  }
})
