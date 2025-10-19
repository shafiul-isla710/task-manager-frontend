<script setup>
import {ref} from "vue";
import authStore from "@/store/authStore.js";
import {useRouter} from "vue-router";
import Navbar from "@/pages/Navbar.vue";
import sweetalert2 from "sweetalert2";
import Swal from "sweetalert2";

const router = useRouter();
const name = ref();
const email = ref();
const password = ref();
const password_confirm = ref();

const useStore = authStore();
const errors = ref([]);


const register = async()=> {

  const result = await Swal.fire({
    title: "Do you want to work with?",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    confirmButtonColor: "#3085d6",
  })

  if(result.isConfirmed){
    const success = await useStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirm.value,
    });
    if(success === true){
      setTimeout(() => {
        router.push("/login");
      }, 2000)
    }
  }
}
</script>
<template>
  <navbar></navbar>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10 col-lg-10 center-screen">
        <div class="card animated fadeIn w-100 p-3">
          <div class="card-body">
            <h4>Sign Up</h4>
            <hr />
            <div class="container-fluid m-0 p-0">
              <form @submit.prevent="register">
                <div class="row m-0 p-0">
                  <div class="col-md-12 p-2">
                    <label>Email Address</label>
                    <input
                        placeholder="User Email"
                        class="form-control animated fadeInUp"
                        type="email"
                        name="email"
                        v-model="email"
                    />
                  </div>
                  <div class="col-md-12 p-2">
                    <label>Name</label>
                    <input
                        placeholder="First Name"
                        class="form-control animated fadeInUp"
                        type="text"
                        name="name"
                        v-model="name"
                    />
                  </div>

                  <div class="col-md-12 p-2">
                    <label>Password</label>
                    <input
                        placeholder="User Password"
                        class="form-control animated fadeInUp"
                        type="password"
                        name="password"
                        v-model="password"
                    />
                  </div>
                  <div class="col-md-12 p-2">
                    <label>Confirm Password</label>
                    <input
                        placeholder="Confirm Password"
                        class="form-control animated fadeInUp"
                        type="password"
                        name="password_confirmation"
                        v-model="password_confirm"
                    />
                  </div>
                </div>
                <div class="row mt-2 p-0">
                  <div class="col-md-4 p-2">
                    <button
                        type="submit"
                        class="btn mt-3 w-100 float-end btn-primary animated fadeInUp"
                    >
                      Sign Up
                    </button>
                    <router-link to="/login">Already have an account</router-link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>