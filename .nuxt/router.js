import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _68f4394c = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _1ad8290f = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _40654139 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _d57eb10e = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _b7d74f5a = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _8091ecc6 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _7c0aeac6 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _68f4394c,
    children: [{
      path: "",
      component: _1ad8290f,
      name: "home"
    }, {
      path: "/login",
      component: _40654139,
      name: "login"
    }, {
      path: "/register",
      component: _40654139,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _d57eb10e,
      name: "profile"
    }, {
      path: "/settings",
      component: _b7d74f5a,
      name: "settings"
    }, {
      path: "/editor",
      component: _8091ecc6,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _7c0aeac6,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
