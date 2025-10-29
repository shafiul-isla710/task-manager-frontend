<script setup>
import {onMounted, reactive, ref} from "vue";
import taskStore from "@/store/taskStore.js";
import Swal from "sweetalert2";

const store = taskStore()

//Pagination
async function goToPage(url) {
  if (!url) return;

  const u = new URL(url);
  const page = u.searchParams.get('page');
  await store.fetchTasks(page);
}

//search
const searchData = ref('')
const search = async () =>{
  await store.fetchTasks(1,searchData.value);
}


//Delete Task
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

onMounted(() => {
  store.fetchTasks()
})

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
          <div v-if="store.loading" class="d-flex align-items-center">
            <strong>Loading...</strong>
            <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
          </div>
          <!-- search input-->
          <div class="row">
            <div class="col-md-3">
              <label for="basic-url" class="form-label">Search</label>
              <div class="input-group mb-3">
                <input type="search" @keyup="search" v-model="searchData" placeholder="Search by title" class="form-control" id="basic-url" aria-describedby="basic-addon3">
              </div>
            </div>
          </div>
          <table v-if="!store.loading" class="table table-striped">
            <thead>
            <tr>
              <th class="w-30">Title</th>
              <th class="w-30">Description</th>
              <th class="w-20">Action</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(task,index) in store.task" :key="index">
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

<!--modal start-->
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
.pagination {
  margin-top: 20px;
}
</style>