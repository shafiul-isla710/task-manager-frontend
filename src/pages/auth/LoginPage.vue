<script setup>

import {ref,computed} from "vue";
import {useRouter} from "vue-router";
import authStore from "@/store/authStore.js";
import Navbar from "@/pages/Navbar.vue";

const router = useRouter();
const email = ref('')
const password = ref('')

const useStore = authStore()

//login button disabled
const isFiled = computed(()=>{
  return email.value.trim() !== '' && password.value.trim() !== ''
})

const login = async ()=>{
  const success = await useStore.login({
    "email": email.value,
    "password": password.value
  })
  if(success === true ){
    setTimeout(()=>{
      router.push("/dashboard")
    },2000)
  }
}

</script>

<template>
  <navbar></navbar>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-7 col-lg-6 center-screen">
        <div class="card w-90 p-4">
          <div class="card-body">
            <form @submit.prevent="login">
              <h4>SIGN IN</h4>
              <br />
              <input
                  placeholder="User Email"
                  class="form-control animated fadeInUp"
                  type="email"
                  name="email"
                  v-model="email"
              />
              <br />
              <input
                  placeholder="User Password"
                  class="form-control animated fadeInUp"
                  type="password"
                  name="password"
                  v-model="password"
              />
              <br />
              <button class="btn w-100 animated fadeInUp float-end btn-primary" :disabled="!isFiled">
                Next
              </button>
            </form>
            <hr />
            <div class="float-end mt-3">
              <span>
                <router-link :to="{name:'sent-otp'}" class="text-center ms-3 h6 animated fadeInUp">Forgot Password</router-link>
              </span>
              <span>
                <RouterLink
                    :to="{ name: 'register'}"
                    class="text-center ms-3 h6 animated fadeInUp"
                >Sign Up
                </RouterLink>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>