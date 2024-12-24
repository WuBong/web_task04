<template>
  <div>
    <button @click="loginWithKakao">카카오 로그인</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false, // Add isLoggedIn to track login status
    };
  },
  methods: {
    loginWithKakao() {
      // 카카오 로그인
      window.Kakao.Auth.login({
        success: (authObj) => {
          console.log('로그인 성공', authObj);

          // 사용자 정보 조회
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: (res) => {
              console.log('회원 정보:', res);
              // 회원 정보를 Vuex나 LocalStorage에 저장
              localStorage.setItem('kakao_user', JSON.stringify(res));
              this.isLoggedIn = true; // 로그인 성공 시 isLoggedIn을 true로 설정
              window.location.replace('/'); // 메인 페이지로 리디렉션
            },
            fail: (error) => {
              console.error(error);
            },
          });
        },
        fail: (err) => {
          console.error(err);
        },
      });
    },
  },
};
</script>
