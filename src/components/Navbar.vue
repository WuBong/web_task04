<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary" ref="navbar">
    <div class="container-fluid">
      <div>
        <router-link to="/" class="navbar-brand" v-if="!isLoggedIn">MyNeflix</router-link>
        <span v-else class="navbar-text">Hi, {{ userName }}</span> <!-- Display nickname -->
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/wishlist" class="nav-link">Wishlist</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/popular" class="nav-link">Popular</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/search" class="nav-link">Search</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <button class="nav-link btn btn-link" @click="handleLogout">Logout</button>
          </li>
          <li class="nav-item" v-else>
            <router-link to="/kakaologin" class="nav-link">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      userName: '', // State to store the KakaoTalk nickname
    };
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      const user = JSON.parse(localStorage.getItem("kakao_user"));
      if (user) {
        this.isLoggedIn = true;
        this.userName = user.kakao_account.profile.nickname; // Extract nickname from user data
      }
    },
    handleLogout() {
      localStorage.removeItem("kakao_user"); // Remove Kakao user data from localStorage
      this.isLoggedIn = false; // Update the login state
      this.userName = ''; // Clear the user's name
      this.$router.push("/kakaologin"); // Redirect to signin page
    },
    // 네비게이션 바의 높이를 부모 컴포넌트로 전달
    calculateNavbarHeight() {
      const navbar = this.$refs.navbar;
      if (navbar) {
        this.$emit("navbar-height", navbar.offsetHeight);
      }
    },
  },
  mounted() {
    this.calculateNavbarHeight();
    window.addEventListener("resize", this.calculateNavbarHeight);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.calculateNavbarHeight);
  },
};
</script>

<style scoped>
.navbar {
  background-color: #007bff !important; /* 푸른색으로 변경 */
}
.navbar-dark .navbar-brand,
.navbar-dark .nav-link,
.navbar-text {
  color: #ffffff !important; /* 텍스트 색상 흰색 */
}
.navbar-dark .nav-link:hover {
  color: #d1ecf1 !important; /* 호버 시 연한 색 */
}
</style>
