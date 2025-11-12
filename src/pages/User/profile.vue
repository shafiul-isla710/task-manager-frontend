<script setup>
import {onMounted, ref} from "vue";
import userProfile from "@/store/userStore.js";

const user = ref('')

const getProfile = async () => {
  const profile = await userProfile().getProfile();
  user.value = profile.data.data;
  console.log(user.value);
}

onMounted(() => {
  getProfile();
})


</script>

<template>

  <div class="container py-5 mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="card card-profile shadow-sm">
          <div class="row g-0">


            <!-- Left side -->
            <div class="col-md-4 text-center bg-white p-4 border-end">
              <img src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400" class="profile-avatar mb-3" alt="User Avatar">
              <h4 class="mb-0">{{user.name}}</h4>
              <p class="text-muted mb-3">{{user.designation}}</p>
              <button class="btn btn-primary btn-sm mb-2"><i class="bi bi-pencil me-1"></i>Edit Profile</button>
              <div class="mt-3">
                <div class="d-flex justify-content-around text-center">
                  <div>
                    <div class="stat-number">120</div>
                    <div class="text-muted small">Posts</div>
                  </div>
                  <div>
                    <div class="stat-number">450</div>
                    <div class="text-muted small">Followers</div>
                  </div>
                  <div>
                    <div class="stat-number">180</div>
                    <div class="text-muted small">Following</div>
                  </div>
                </div>
              </div>
            </div>


            <!-- Right side -->
            <div class="col-md-8 p-4 bg-light">
              <h5 class="fw-bold mb-3">Profile Information</h5>
              <div class="mb-3">
                <label class="form-label fw-semibold">Full Name</label>
                <input type="text" class="form-control" value="" v-model="user.name" readonly>
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Email</label>
                <input type="email" class="form-control" value="" v-model="user.email" readonly>
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Designation</label>
                <input type="text" class="form-control" value="" v-model="user.designation" readonly>
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold">About Me</label>
                <textarea class="form-control" rows="3" readonly>I’m a passionate web developer learning Laravel and Vue.js to build modern applications.</textarea>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

body { background-color: #f8f9fa; }
.profile-avatar {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  border: 5px solid #fff;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
.card-profile {
  border-radius: 15px;
  overflow: hidden;
}
.stat-number {
  font-size: 1.25rem;
  font-weight: 600;
}

</style>