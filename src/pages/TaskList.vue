<script setup>
import {onMounted, ref} from "vue";
import taskStore from "@/store/taskStore.js";


const tasks = ref([]);

const taskList = async () =>{
   const result = await taskStore().fetchTasks();
   tasks.value = result
  console.log(result)
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
              <tr v-for="task in tasks" :key="task.id">
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td class="text-right d-flex flex-row gap-3">
                  <router-link  class="bg-success text-white p-2 border-0 rounded">Edit</router-link>
                  <span class="bg-danger text-white p-2 border-0 rounded">Delete</span>
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