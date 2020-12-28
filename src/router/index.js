import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../layouts/default.vue'),
    children: [
      // Public page
      {
        path: '',
        name: 'homepage',
        meta: { requiresAuth: false },
        component: () => import('../pages/Homepage.vue')
      },
      {
        path: 'product/:id',
        name: 'product',
        meta: { requiresAuth: false },
        component: () => import('../pages/Product.vue')
      },

      // Posted
      {
        path: 'posted',
        name: 'posted',
        component: () => import('../pages/posted/List.vue')
      },
      {
        path: 'choose-category',
        name: 'choose-category',
        component: () => import('../pages/posted/ChooseCategory.vue')
      },
      {
        path: 'posted/add/:category',
        name: 'post-add',
        component: () => import('../pages/posted/Form.vue')
      },
      {
        path: 'posted/edit/:category/:uuid',
        name: 'post-edit',
        component: () => import('../pages/posted/Form.vue')
      },

      // Bought
      {
        path: 'bought',
        name: 'bought',
        component: () => import('../pages/bought/List.vue')
      },
      {
        path: 'bought/:id',
        name: 'bought-view',
        component: () => import('../pages/bought/View.vue')
      },

      // Sold
      {
        path: 'sold',
        name: 'sold',
        component: () => import('../pages/sold/List.vue')
      },
      {
        path: 'sold/:id',
        name: 'sold-view',
        component: () => import('../pages/sold/View.vue')
      },

      // Live chat
      {
        path: 'chat',
        name: 'chat',
        component: () => import('../pages/chat/Index.vue')
      }
    ]
  },
  // Entry routes
  {
    path: '/',
    component: () => import('../layouts/entry.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        meta: {
          requiresAuth: false
        },
        component: () => import('../pages/entry/Login.vue')
      },
      {
        path: 'register',
        name: 'register',
        meta: {
          requiresAuth: false
        },
        component: () => import('../pages/entry/Register.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['user/isLoggedIn']
  if (!store.state.loading) {
    if (to.meta.requiresAuth === undefined && !isAuthenticated) {
      router.push('/')
      return next({ name: 'login', query: { 
        url: to.path
      }})
    }
  
    if ((to.name === 'login' || to.name === 'register ') && isAuthenticated){
      return next('/')
    }
  }
  next()
})

export default router
