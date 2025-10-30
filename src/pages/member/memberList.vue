<script setup>
import {computed, onMounted, ref} from "vue";
import memberStore from '@/store/memberStore.js'

const store = memberStore();

const designation = ['viewer','UI/UX Designer','Web Developer','Web Designer','Apps Developer']

//pagination
const goToPage = async (url) => {
  if(!url) return;

  const u = new URL(url);
  const page = u.searchParams.get('page');
  await store.fetchMembers(page);
}

//search
const searchData = ref('')
const search = async()=>{
  await store.fetchMembers(1,searchData.value);
}

// Designation
const selected = ref('')
const selectDesignation = async()=>{
  await store.fetchMembers(1,'',selected.value);
}

onMounted(()=>{
  store.fetchMembers()
})
</script>

<template>

  <div  class="content">

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class=" w-90 p-4">
            <div class=" d-flex justify-content-between align-items-center">
              <h4>Member List</h4>
            </div>
          </div>
          <!-- Loading spinner-->
          <div v-if="store.loading" class="d-flex align-items-center">
            <strong>Loading...</strong>
            <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
          </div>

          <!-- search input-->
          <div class="row mb-3">
            <div class="col-md-3">
              <label for="basic-url" class="form-label">Search</label>
              <div class="input-group mb-3">
                <input type="search" @keyup="search" v-model="searchData" placeholder="Search by Name" class="form-control" id="basic-url" aria-describedby="basic-addon3">
              </div>
            </div>
            <div class="col-md-3">
              <label for="basic-url" class="form-label">Designation</label>
              <select name="" @change="selectDesignation" id="" v-model="selected" class="form-control">
                <option value="">Select..</option>
                <option v-for="(item,index) in designation" :key="index" :value="item">{{item}}</option>
              </select>
            </div>
          </div>
          <p>{{designation1}}</p>

          <table v-if="!store.loading" class="table table-hover align-middle text-center ">
            <thead class="table-light">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="store.membersData.length" v-for="(member, index) in store.membersData" :key="index">
              <td>
                <template v-if="member.profile_image">
                  <img
                      :src="member.profile_image"
                      alt="Profile"
                      class="rounded-circle border shadow-sm"
                      style="width: 40px; height: 40px; object-fit: cover;"
                  />
                </template>
                <template v-else>
                  <img
                      src="@/assets/img/dummy.jpeg"
                      alt="Profile"
                      class="rounded-circle border shadow-sm"
                      style="width: 40px; height: 40px; object-fit: cover;"
                  />
                </template>
              </td>
              <td>{{ member.name }}</td>
              <td>{{ member.email }}</td>
              <td>{{ member.designation }}</td>
              <td>
                <router-link :to="{name:'memberEditForm',params:{id:member.id}}" class="btn btn-sm btn-success">Assign Roll</router-link>
              </td>
            </tr>
            <tr v-else>
              <td colspan="5">No members found</td>
            </tr>
            </tbody>
          </table>

          <!-- Pagination buttons -->
          <nav aria-label="Page navigation example" v-if="store.pagination.links">
            <ul class="pagination justify-content-start">
              <!-- Previous Button -->
              <li class="page-item" :class="{ disabled: !store.pagination.prev_page_url }">
                <button
                    class="page-link"
                    @click="goToPage(store.pagination.prev_page_url)"
                    :disabled="!store.pagination.prev_page_url"
                >
                  <<
                </button>
              </li>
              <!-- Page Numbers -->
              <li
                  v-for="(link, index) in store.pagination.links.slice(1, -1)"
                  :key="index"
                  class="page-item"
                  :class="{ active: link.active }"
              >
                <button
                    class="page-link"
                    v-html="link.label"
                    @click="goToPage(link.url)"
                    :disabled="!link.url"
                ></button>
              </li>
              <!-- Next Button -->
              <li class="page-item" :class="{ disabled: !store.pagination.next_page_url }">
                <button
                    class="page-link"
                    @click="goToPage(store.pagination.next_page_url)"
                    :disabled="!store.pagination.next_page_url"
                >
                  >>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>




</template>

<style scoped>

</style>