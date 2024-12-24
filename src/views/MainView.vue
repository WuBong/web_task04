<template>
    <div>
      <header>
        <h1>환영합니다, {{ profile.nickname }}님!</h1>
      </header>
      <p>프로필 정보: {{ profile }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        profile: {},
      };
    },
    created() {
      const user = JSON.parse(localStorage.getItem('kakao_user'));
      if (user) {
        this.profile = user.kakao_account.profile;
      } else {
        this.$router.push('/kakaologin'); // 로그인 안 되어 있으면 리디렉션
      }
    },
  };
  </script>