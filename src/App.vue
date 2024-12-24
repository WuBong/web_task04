<template>
  <Navbar />
  <router-view/>
</template>

<script>
import Navbar from "./components/Navbar.vue";

const token = localStorage.getItem('kakao_token');
if (token) {
  window.Kakao.Auth.setAccessToken(token);

  window.Kakao.API.request({
    url: '/v2/user/me',
    success: (res) => {
      console.log('자동 로그인 성공:', res);
    },
    fail: (error) => {
      console.error('자동 로그인 실패:', error);
      localStorage.removeItem('kakao_token');
    },
  });
}

export default {
  components: {
    Navbar,
  },
};
</script>

<style>

</style>
