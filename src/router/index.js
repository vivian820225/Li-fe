import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/frontend/Home.vue'),
    meta: { title: 'Li-fe' },
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('../views/frontend/Index.vue'),
        meta: { title: 'Li-fe' },
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/frontend/About.vue'),
        meta: { title: '品牌故事 | Li-fe' },
      },
      {
        path: 'products',
        name: 'AllProducts',
        component: () => import('../views/frontend/AllProducts.vue'),
        meta: {
          title: '商品總覽 | Li-fe',
          breadcrumb: [{
            name: '全部商品',
          }],
        },
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('../views/frontend/Product.vue'),
        meta: {
          title: '商品介紹 | Li-fe',
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
        path: 'favorites',
        name: 'Favorites',
        component: () => import('../views/frontend/Favorites.vue'),
        meta: { title: '我的收藏 | Li-fe' },
      },
      {
        path: 'discount',
        name: 'Discount',
        component: () => import('../views/frontend/Discount.vue'),
        meta: { title: '優惠活動 | Li-fe' },
      },
      {
        path: 'blog',
        name: 'Blog',
        component: () => import('../views/frontend/Blog.vue'),
        meta: { title: '綠色生活 | Li-fe' },
      },
      {
        path: 'guide',
        name: 'Guide',
        component: () => import('../views/frontend/Guide.vue'),
        meta: { title: '退款換貨須知 | Li-fe' },
      },
      {
        path: '404',
        name: '404',
        component: () => import('../views/frontend/NotFound.vue'),
        meta: { title: '此頁面不存在 | Li-fe' },
      },
    ],
  },
  // Order Check
  {
    path: '/checkout',
    component: () => import('../views/frontend/OrderCheck.vue'),
    meta: { title: '訂單確認 | Li-fe' },
    children: [
      {
        path: '',
        name: 'Checkout',
        component: () => import('../views/frontend/Checkout.vue'),
      },
      {
        path: 'order-completed',
        name: 'OrderAccepted',
        component: () => import('../views/frontend/OrderAccepted.vue'),
        meta: { title: '訂單已成立 | Li-fe' },
      },
      {
        path: 'order-failed',
        name: 'OrderFailed',
        component: () => import('../views/frontend/OrderFailed.vue'),
        meta: { title: '訂單成立失敗 | Li-fe' },
      },
    ],
  },
  // Backend
  {
    path: '/admin',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('../views/backend/AdminProducts.vue'),
        meta: { requiresAuth: true, title: '商品管理 | 後台管理' },
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('../views/backend/AdminOrders.vue'),
        meta: { requiresAuth: true, title: '訂單管理 | 後台管理' },
      },
      {
        path: 'coupons',
        name: 'AdminCoupons',
        component: () => import('../views/backend/AdminCoupons.vue'),
        meta: { requiresAuth: true, title: '優惠券設定 | 後台管理' },
      },
      {
        path: 'storage',
        name: 'AdminStorage',
        component: () => import('../views/backend/AdminStorage.vue'),
        meta: { requiresAuth: true, title: '圖片管理 | 後台管理' },
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});

export default router;
