import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import ProductList from './components/ProductList.vue';
import ProductDetail from './components/ProductDetail.vue';

// Define routes
const routes = [
  { path: '/', component: ProductList },
  { path: '/about', component: ProductDetail }
];

// Create router instance
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// Create Vue app instance and use the router
createApp(App)
  .use(router)
  .mount('#app');
