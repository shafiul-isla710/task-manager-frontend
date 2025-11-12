<script setup>
import useStore from "@/store/authStore.js";

const user = JSON.parse(localStorage.getItem("user"));

const isAdmin = ()=>{
  if(user.type ==='Admin'){
    return true;
  }
  return false;
};

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
        <div class="user-dropdown">
          <img
              src="https://t3.ftcdn.net/jpg/02/00/90/24/360_F_200902415_G4eZ9Ok3Ypd4SZZKjc8nqJyFVp1eOD6V.jpg"
              alt="User"
              class="icon-nav-img"
          />
          <div class="user-dropdown-content p-3">
            <div class="text-center">
              <img
                  src="https://t3.ftcdn.net/jpg/02/00/90/24/360_F_200902415_G4eZ9Ok3Ypd4SZZKjc8nqJyFVp1eOD6V.jpg"
                  class="icon-nav-img mb-2"
                  alt=""
              />
              <h6>User</h6>
              <hr class="p-0" />
            </div>
            <a href="/profile" class="side-bar-item">
              <i class="bi bi-person side-bar-item-icon"></i>
              <span class="side-bar-item-caption">Profile</span>
            </a>
            <span
                class="side-bar-item"
                style="cursor: pointer"
                @click="useStore().logout()"
            >
              <i class="bi bi-box-arrow-right side-bar-item-icon"></i>
              <span class="side-bar-item-caption">Logout</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Sidebar -->
  <div class="side-nav-open">
<!--    <router-link :to="{name:'dashboard'}" class="side-bar-item mt-2 text-black">-->
<!--      <i class="bi bi-speedometer2 side-bar-item-icon"></i>-->
<!--      <span>Dashboard</span>-->
<!--    </router-link>-->

<!--    <router-link :to="{name:'memberList'}" class="side-bar-item mt-2 text-black">-->
<!--      <i class="bi bi-speedometer2 side-bar-item-icon"></i>-->
<!--      <span>Members</span>-->
<!--    </router-link>-->

<!--    <router-link :to="{name:'groups'}"  class="side-bar-item mt-2 text-black">-->
<!--      <i class="bi bi-list-ul side-bar-item-icon"></i>-->
<!--      <span>Groups</span>-->
<!--    </router-link>-->

<!--    <router-link :to="{name:'TaskList'}"  class="side-bar-item mt-2 text-black">-->
<!--      <i class="bi bi-pencil-square side-bar-item-icon"></i>-->
<!--      <span>Tasks</span>-->
<!--    </router-link>-->

    <a href="/Progress" class="side-bar-item mt-2 text-black">
      <i class="bi bi-hourglass-split side-bar-item-icon"></i>
      <span>In Progress</span>
    </a>

    <a href="/Completed" class="side-bar-item mt-2 text-black">
      <i class="bi bi-check-circle side-bar-item-icon"></i>
      <span>Completed</span>
    </a>
    <a href="/Canceled" class="side-bar-item mt-2 text-black">
      <i class="bi bi-x-octagon side-bar-item-icon"></i>
      <span>Canceled</span>
    </a>
  </div>

  <RouterView/>
</template>

<style scoped>

</style>