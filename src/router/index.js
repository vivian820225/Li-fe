import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/frontend/Home.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('../views/frontend/Index.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/frontend/About.vue'),
      },
      {
        path: '/products',
        name: 'AllProducts',
        component: () => import('../views/frontend/AllProducts.vue'),
        meta: {
          breadcrumb: [{
            name: '全部商品',
          }],
        },
      },
      {
        path: '/product/:id',
        name: 'Product',
        component: () => import('../views/frontend/Product.vue'),
        meta: {
          breadcrumb: [{
            name: '全部商品',
            link: '/products',
          },
          {
            name: '當前商品',
          }],
        },
      },
      {
        path: '/checkout',
        name: 'Checkout',
        component: () => import('../views/frontend/Checkout.vue'),
      },
      {
        path: '/favorites',
        name: 'Favorites',
        component: () => import('../views/frontend/Favorites.vue'),
      },
      {
        path: '/discount',
        name: 'Discount',
        component: () => import('../views/frontend/Discount.vue'),
      },
      {
        path: '/blog',
        name: 'Blog',
        component: () => import('../views/frontend/Blog.vue'),
      },
      {
        path: '/guide',
        name: 'Guide',
        component: () => import('../views/frontend/Guide.vue'),
      },
      {
        path: '/account',
        name: 'Account',
        component: () => import('../views/frontend/Account.vue'),
      },
      {
        path: '/404',
        name: '404',
        component: () => import('../views/frontend/NotFound.vue'),
      },
    ],
  },
  // Backend
];

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
