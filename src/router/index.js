//router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetail from '../views/MovieDetail.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }, // 로그인 필요
  },
  {
    path: '/about',
    name: 'about',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    meta: { requiresAuth: true }, // 로그인 필요
  },
  {
    path: '/signin',
    name: 'signin',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/SignIn.vue')
    },
  },
  {
    path: '/popular',
    name: 'popular',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Popular.vue')
    },
    meta: { requiresAuth: true }, // 로그인 필요
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Wishlist.vue')
    },
    meta: { requiresAuth: true }, // 로그인 필요
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetail, 
    meta: { requiresAuth: true }, // 로그인 필요
  },

  {
    path: '/search',
    name: 'Search',
    component: function () {
    return import(/* webpackChunkName: "about" */ '../views/Search.vue')
    },
    meta: { requiresAuth: true }, // 로그인 필요
  },

  {
    path: '/kakaologin',
    name: 'Kakaologin',
    component: function () {
    return import(/* webpackChunkName: "about" */ '../views/Kakao_Login.vue')
    },
  },

  {
    path: '/mainview',
    name: '/MainView',
    component: function () {
    return import(/* webpackChunkName: "about" */ '../views/MainView.vue')
    },
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 네비게이션 가드 설정
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('kakao_user'); // 로그인 여부 확인

  if (to.meta.requiresAuth && !isLoggedIn) {
    // 로그인이 필요한데 로그인되지 않은 경우
    next('/kakaologin'); // 로그인 페이지로 리디렉션
  } else {
    next(); // 다음 라우트로 이동
  }
});

export default router
