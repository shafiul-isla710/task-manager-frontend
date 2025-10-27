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
          <!-- Loading spinner-->
          <div v-if="store.loading" class="d-flex align-items-center">
            <strong>Loading...</strong>
            <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
          </div>

          <table v-if="!store.loading" class="table table-bordered table-striped">
            <thead>
            <tr>
              <th class="w-30">Group Name</th>
              <th class="w-30">Title</th>
              <th class="w-30">status</th>
              <th class="w-20">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(group, index) in store.groups" :key="index">
              <td>{{group.name}}</td>
              <td>{{group.title}}</td>
              <td>
                <span class="badge bg-success" v-if="group.status === 1">Active</span>
                <span class="badge bg-danger" v-else>Inactive</span>

              </td>
              <td class="text-center d-flex flex-row gap-3">
                <router-link :to="{name:'groupDetails',params:{id:group.id}}" class="bg-secondary text-white p-2  border-0 rounded">Add Members</router-link>
                <router-link :to="{name:'editForm',params:{id:group.id}}" class="bg-success text-white p-2 border-0 rounded">Edit</router-link>
                <button @click="groupDelete(group.id)" class="bg-danger text-white p-2 border-0 rounded">Delete</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>