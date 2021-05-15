import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'Login' }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '*',
    name: 'All',
    redirect: { name: 'Login' }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Guard que evita acceder a las rutas que no sean el login cuando no esta autenticado el usuario
router.beforeEach((to, from, next) => {
  const estaAutenticado = store.getters.estaAutenticado;
  // Ruta es distinta a la ruta de login y el usuario no esta autenticado
  switch (to.name) {
    case 'Home':
      if (!estaAutenticado) next({ name: 'Login' })
      else next()
      break;
    case 'Login':
      if (estaAutenticado) next({ name: 'Home' })
      else next()
      break;
    default:
      next();
      break;
  }
})

export default router
