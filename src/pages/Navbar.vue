<script setup>

</script>

<template>
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid container-xl position-relative d-flex align-items-center">

      <router-link to="/" class="logo d-flex align-items-center me-auto">
        <!-- Uncomment the line below if you also wish to use an image logo -->
        <!-- <img src="assets/img/logo.webp" alt=""> -->
        <h1 class="sitename">Task Manager</h1>
      </router-link>

      <nav id="navmenu" class="navmenu">
        <ul>
          <li><router-link to="/" class="active">Home</router-link></li>
          <li><router-link to="register">Register</router-link></li>
          <li><router-link to="login">Login</router-link></li>
        </ul>
        <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
      </nav>

      <a class="btn-getstarted" href="#about">Get Started</a>

    </div>
  </header>
</template>

<style scoped>

</style>