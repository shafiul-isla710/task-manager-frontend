<script setup>
import useStore from "@/store/authStore.js";
import Swal from "sweetalert2";


const user = JSON.parse(localStorage.getItem("user"));

const logout = async()=>{
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes,Logout"
  })
  if (result.isConfirmed){
    useStore().logout()
  }
}

</script>

<template>
  <!-- Navbar -->
  <nav
      class="navbar navbar-expand-lg navbar-light bg-light fixed-top px-3 shadow-sm"
  >
    <div class="container-fluid">
      <a href="#" class="navbar-brand d-flex align-items-center">
        <i class="bi bi-list h4 m-0"></i>
        <img
            src="https://cdn-icons-png.flaticon.com/256/906/906334.png"
            class="nav-logo mx-2"
            alt="logo"
        />
      </a>
      <div class="d-flex align-items-center">
      </div>
    </div>
  </nav>

  <!-- Sidebar -->
  <div class="side-nav-open">

    <a href="/Progress" class="side-bar-item mt-2 text-black">
      <i class="bi bi-hourglass-split side-bar-item-icon"></i>
      <span>User Dashboard</span>
    </a>

    <a href="/Completed" class="side-bar-item mt-2 text-black">
      <i class="bi bi-check-circle side-bar-item-icon"></i>
      <span>Task</span>
    </a>
    <a href="/Canceled" class="side-bar-item mt-2 text-black">
      <i class="bi bi-x-octagon side-bar-item-icon"></i>
      <span>Group</span>
    </a>

    <router-link :to="{name:'profile'}" class="side-bar-item mt-2 text-black">
      <i class="bi bi-x-octagon side-bar-item-icon"></i>
      <span>Profile</span>
    </router-link>

    <a @click="logout" class="side-bar-item mt-2 text-black">
      <i class="bi bi-x-octagon side-bar-item-icon"></i>
      <span>Logout</span>
    </a>
  </div>

  <RouterView/>
</template>

<style scoped>

</style>