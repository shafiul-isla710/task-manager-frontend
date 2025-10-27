<script setup>
import {onMounted, reactive, ref} from "vue";
import taskStore from "@/store/taskStore.js";
import Swal from "sweetalert2";

const tasks = ref([])
const pagination = ref({})
const currentPage = ref(1)

const loading = ref(true)

const taskList = async () =>{
   loading.value = true
   const result = await taskStore().fetchTasks();
   // console.log(result.data.data.first_page_url)
   tasks.value = result.data.data.data
   pagination.value = result.data.data;
   loading.value = false
}

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

// I will handle where will assign task group or use.
//modal
const showModal = ref(false)
const picked = reactive({
  assignTo:'',
  taskId:''
});

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

          <!-- Loading spinner-->
          <div v-if="loading" class="d-flex align-items-center">
            <strong>Loading...</strong>
            <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
          </div>

          <table v-if="!loading" class="table table-striped">
            <thead>
            <tr>
              <th class="w-30">Title</th>
              <th class="w-30">Description</th>
              <th class="w-20">Action</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(task,index) in tasks" :key="index">
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td class="text-right d-flex flex-row gap-3">
                  <button @click="[showModal=true,picked.taskId = task.id]" class="bg-info text-white p-2 border-0 rounded">Assign</button>
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

  <div class="modal fade show"
       tabindex="-1"
       style="display: block; background: rgba(0,0,0,0.5);"
       v-if="showModal">
    <div class="modal-dialog modal-position">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Task Assign to Group or Member</h4>
          <p></p>
          <button
              type="button"
              class="btn-close"
              @click="showModal = false"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" value="user" v-model="picked.assignTo" id="flexRadioDefault1">
            <label class="form-check-label" for="flexRadioDefault1">To User</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" value="group" v-model="picked.assignTo" id="flexRadioDefault2" >
            <label class="form-check-label" for="flexRadioDefault2">To Group</label>
          </div>
        </div>
        <div class="modal-footer">
          <button
              type="button"
              class="btn btn-secondary"
              @click="showModal = false"
          >
            Cancel
          </button>
          <router-link v-if="picked.assignTo" :to="{name:'TaskAssign',params:{taskId:picked.taskId,assignTo:picked.assignTo}}" type="button" class="btn btn-success">
            Next
          </router-link>
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
.modal-position {
  margin-top:200px;
  margin-left:auto;
  margin-right:auto;
}
</style>