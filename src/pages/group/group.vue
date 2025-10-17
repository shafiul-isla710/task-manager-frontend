<script setup>
import {onMounted, ref} from "vue";
import groupStore from '@/store/groupStore.js'
import Swal from "sweetalert2";

const groups = ref([]);

// Group list Function
const groupList = async() =>{
  const result = await groupStore().fetchGroups()
   groups.value = result.data.data
}

// Group Delete Function
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
    groupList()
  }
}
onMounted(groupList)
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

          <table class="table table-bordered table-striped">
            <thead>
            <tr>
              <th>Group Name</th>
              <th>Title</th>
              <th>Details</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(group, index) in groups" :key="index">
              <td>{{group.name}}</td>
              <td>{{group.title}}</td>
              <td>
                <button class="bg-secondary text-white p-2 border-0 rounded">Group Details</button>
              </td>
              <td class="text-right d-flex flex-row gap-3">
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