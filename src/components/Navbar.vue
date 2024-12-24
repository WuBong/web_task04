<template>
  <nav class="navbar" ref="navbar">
    <div class="navbar-container">
      <div class="navbar-left">
        <router-link to="/" class="navbar-brand" v-if="!isLoggedIn">MyNetflix</router-link>
        <span v-else class="navbar-text">Hi, {{ userName }}</span>
      </div>
      <div class="navbar-right">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/wishlist" class="nav-link">Wishlist</router-link>
        <router-link to="/popular" class="nav-link">Popular</router-link>
        <router-link to="/search" class="nav-link">Search</router-link>
        <button v-if="isLoggedIn" class="nav-link button-link" @click="handleLogout">Logout</button>
        <router-link v-else to="/kakaologin" class="nav-link">Login</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      userName: "", // KakaoTalk nickname
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
        this.userName = user.kakao_account.profile.nickname;
        
      }
    },
    handleLogout() {
      localStorage.removeItem("kakao_user");
      this.isLoggedIn = false;
      this.userName = "";
      this.$router.push("/kakaologin");
    },
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #ffffff;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.navbar-brand {
  font-size: 1.5rem;
  text-decoration: none;
  color: white;
  margin-right: 1rem;
}

.navbar-text {
  font-size: 1rem;
  margin-right: 1rem;
}

.nav-link {
  margin-left: 1rem;
  text-decoration: none;
  color: white;
  font-size: 1rem;
}

.nav-link:hover {
  color: #d1ecf1;
}

.button-link {
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 1rem;
  text-decoration: none;
  margin-left: 1rem;
}

.button-link:hover {
  color: #d1ecf1;
}
</style>
