<script setup>
import {onMounted, ref} from "vue";
import groupStore from '@/store/groupStore.js'
import Swal from "sweetalert2";

// const groups = ref([]);
const store = groupStore();

const groupDelete = async(id) =>{
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  })

  if(result.isConfirmed){
    await groupStore().deleteGroup(id)
    store.fetchGroups()
  }
}
//pagination
const goToPage = async(url)=>{
  if(!url) return ;

  const u = new URL(url);
  const page = u.searchParams.get("page");
  await store.fetchGroups(page);
}
//search
const searchData = ref('')
const search = async()=>{
  await store.fetchGroups(1,searchData.value);
}

onMounted(() => {
  store.fetchGroups()
})
</script>

<template>

  <div  class="content">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class=" w-90 p-4">
            <div class=" d-flex justify-content-between align-items-center">
              <h4>Groups</h4>
              <router-link :to="{name:'createForm'}" class="btn btn-sm btn-primary">Add New</router-link>
            </div>
          </div>
          <!--search-->
          <div class="row mb-3">
            <div class="col-md-3">
              <label for="basic-url" class="form-label">Search</label>
              <div class="input-group mb-3">
                <input type="search" @keyup="search" v-model="searchData" placeholder="Search by Name" class="form-control" id="basic-url" aria-describedby="basic-addon3">
              </div>
            </div>
          </div>

          <table class="table table-bordered table-striped align-middle text-center">
            <thead>
            <tr>
              <th class="w-30">Group Name</th>
              <th class="w-30">Title</th>
              <th class="w-30">status</th>
              <th class="w-20">Action</th>
            </tr>
            </thead>
            <tbody>
              <tr v-if="store.groups.length" v-for="(group, index) in store.groups" :key="index">
                <td>{{group.name}}</td>
                <td>{{group.title}}</td>
                <td>
                  <span class="badge bg-success" v-if="group.status === 1">Active</span>
                  <span class="badge bg-danger" v-else>Inactive</span>

                </td>
                <td class="text-center d-flex flex-row gap-3">
                  <router-link :to="{name:'groupDetails',params:{id:group.id}}" class="bg-secondary text-white p-2  border-0 rounded">Details</router-link>
                  <router-link :to="{name:'editForm',params:{id:group.id}}" class="bg-success text-white p-2 border-0 rounded">Edit</router-link>
                  <button @click="groupDelete(group.id)" class="bg-danger text-white p-2 border-0 rounded">Delete</button>
                </td>
              </tr>
              <tr v-else>
                <td colspan="5">No Data Found</td>
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