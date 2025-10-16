<script setup>
import {onMounted, ref} from "vue";
import taskStore from "@/store/taskStore.js";
import Swal from "sweetalert2";

const tasks = ref([])
const pagination = ref({})
const currentPage = ref(1)

const taskList = async () =>{
   const result = await taskStore().fetchTasks();
   // console.log(result.data.data.first_page_url)
   tasks.value = result.data.data.data
   pagination.value = result.data.data;
   currentPage.value = page
}
console.log(pagination.value)

const deleteTask = async (id) =>{

  const result = await Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  })
  if(result.isConfirmed){
    await taskStore().deleteTask(id)
    taskList()
  }
}

onMounted(taskList);

</script>

<template>
  <div  class="content">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class=" w-90 p-4">
            <div class=" d-flex justify-content-between align-items-center">
              <h4>Task List</h4>
              <RouterLink :to="{ name:'TaskCreate' }" class="btn btn-sm btn-primary">Add New</RouterLink>
            </div>
          </div>

          <table class="table table-striped">
            <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(task,index) in tasks" :key="index">
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td class="text-right d-flex flex-row gap-3">
                  <router-link :to="{name:'TaskEdit',params:{id:task.id}}" class="bg-success text-white p-2 border-0 rounded">Edit</router-link>
                  <button @click.prevent="deleteTask(task.id)" class="bg-danger text-white p-2 border-0 rounded">Delete</button>
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
.customize-table {
  border-radius: 8px;
  box-shadow: 0 2px 8px #ddd;
}
</style>