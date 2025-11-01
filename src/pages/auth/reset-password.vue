<script setup>
import Navbar from "@/pages/Navbar.vue";
import {ref,computed} from "vue";
import {useRouter} from "vue-router";
import authStore from "@/store/authStore.js";

const router = useRouter();
const email = ref('');
const otp = ref('');
const password = ref('');
const confirm_password = ref('');


const resetPassword = async()=>{
  const result = await authStore().resetPassword({
    email: email.value,
    otp: otp.value,
    password: password.value,
    password_confirmation: confirm_password.value,
  })
  if(result === true){
    setTimeout(()=>{
      router.push("/login");
    },1000)
  }
}

//Nest button enable function
const isFiled = computed(()=>{
  return email.value.trim() !=="" && otp.value.trim() !=="" && password.value.trim() !=="" && confirm_password.value.trim() !=="";
})

</script>

<template>
  <navbar></navbar>
  <navbar></navbar>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-7 col-lg-6 center-screen">
        <div class="card w-90 p-4">
          <div class="card-body">
            <form >
              <h4>Reset Your Password</h4>
              <br />
              <div class="row" >
                <div class="col-md-6 mb-3">
                  <input
                      placeholder="Enter Your Email"
                      class="form-control animated fadeInUp"
                      name="email"
                      v-model="email"
                  />
                  <br />
                </div>

                <div class="col-md-6 mb-3">
                  <input
                      placeholder="Enter OTP"
                      class="form-control animated fadeInUp"
                      type="text"
                      min="6"
                      name="otp"
                      v-model="otp"
                  />
                  <br />
                </div>

                <div class="col-md-6 mb-3">
                  <input
                      placeholder="Password"
                      class="form-control animated fadeInUp"
                      type="password"
                      min="6"
                      name="otp"
                      v-model="password"
                  />
                  <br />
                </div>

                <div class="col-md-6 mb-3">
                  <input
                      placeholder="Confirm Password"
                      class="form-control animated fadeInUp"
                      type="password"
                      min="6"
                      name="otp"
                      v-model="confirm_password"
                  />
                  <br />
                </div>
              </div>

              <button @click.prevent="resetPassword" class="btn w-100 animated fadeInUp float-end btn-primary" :disabled="!isFiled">
                Next
              </button>
            </form>
            <hr />
            <div class="float-end mt-3">
              <span>
                <router-link :to="{name:'login'}" class="text-center ms-3 h6 animated fadeInUp">Back</router-link>
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