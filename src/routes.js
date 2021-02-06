import Search from './views/Search.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
  { path: '/search', component: Search, meta: { title: 'Search' } },
]
