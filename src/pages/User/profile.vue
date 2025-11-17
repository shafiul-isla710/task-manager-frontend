<script setup>
import {onMounted, ref} from "vue";
import userProfile from "@/store/userStore.js";

const user = ref('')

const getProfile = async () => {
  const profile = await userProfile().getProfile();
  user.value = profile.data.data;
}

const isEdit = ref(true)

const edit = () =>{
  return  isEdit.value = !isEdit.value;
}

const name = ref(user.value.name)
const email = ref()
const file = ref(null);



const handleFileUpload = (event)=>{
    const img = event.target.files[0];
    if(img){
      file.value = img;
    }
    else{
      file.value = null;
    }
}
//update profile
const profileUpdated = async () => {

  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("email", email.value);
  formData.append("file", file.value);

  console.log(formData);

  const result = await userProfile().updateProfile({
    name: name.value,
    email: email.value,
  });

  if(result === true){
    getProfile();
  }
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
                <div v-if="user.profile_image" class="position-relative">
                  <!-- Profile Image -->
                  <img
                      :src="user.profile_image"
                      alt="User Avatar"
                      class="rounded-circle border mb-3 shadow-sm"
                      style="width: 120px; height: 120px; object-fit: cover;"
                  >

                  <!-- File Upload Button (Visible only in edit mode) -->
                  <div v-if="!isEdit" class="mt-3">
                    <label class="btn btn-outline-primary btn-sm">
                      <i class="bi bi-camera me-1"></i> Change Photo
                      <input type="file" class="d-none" @change="handleFileUpload">
                    </label>
                  </div>
                </div>

                <div v-else class="text-muted fst-italic">
                  <img
                      src="@/assets/img/dummy.jpeg"
                      alt="User Avatar"
                      class="rounded-circle border mb-3 shadow-sm"
                      style="width: 120px; height: 120px; object-fit: cover;"
                  >
                  <div v-if="!isEdit" class="mt-2">
                    <label class="btn btn-outline-success btn-sm">
                      <i class="bi bi-upload me-1"></i> Upload Photo
                      <input type="file" class="d-none" @change="handleFileUpload">
                    </label>
                  </div>
                </div>

              <h4 class="mb-0">{{user.name}}</h4>
              <p class="text-muted mb-3">{{user.designation}}</p>
              <button @click="edit" class="btn btn-primary btn-sm mb-2"><i class="bi bi-pencil me-1"></i>{{isEdit?'Edit Profile':'Cancel'}}</button>
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
              <p>{{name}}</p>
              <p>{{email}}</p>
              <div class="mb-3">
                <label class="form-label fw-semibold">Full Name</label>
                <input type="text" class="form-control"   v-model="user.name" :readonly="isEdit">
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Email</label>
                <input type="email" class="form-control"  v-model="user.email" :readonly="isEdit">
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">Designation</label>
                <input type="text" class="form-control" value="" v-model="user.designation" readonly>
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold">About Me</label>
                <textarea class="form-control" rows="3" readonly>I’m a passionate web developer learning Laravel and Vue.js to build modern applications.</textarea>
              </div>
              <div class="mb-3" v-if="!isEdit">
                <button @click="profileUpdated" class="btn btn-success">Sava Change</button>
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
.profileImage{
  width: 50%;
  height: 50%;
  border-radius: 50%;
}

</style>