<script setup>
import {ref} from "vue";
import taskStore from "@/store/taskStore.js";
import {useRouter} from "vue-router";

const router = useRouter()

const title = ref()
const description = ref()
const createTask = async () => {
  const result = await taskStore().createTask({
    title: title.value,
    description: description.value,
  })
  if(result){
    setTimeout(()=>{
      router.push('/TaskList')
    },1000)
  }
}

</script>

<template>
  <div  class="content">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="w-90 p-4">
            <div class="d-flex justify-content-between align-items-center">
              <h4>Task Create</h4>
              <RouterLink :to="{ name: 'TaskList'}" class="btn btn-sm btn-primary">All Tasks</RouterLink>
            </div>
          </div>
          <div class="w-90 p-4">
            <form class="">
              <div class="row justify-content-center">
                <div class="col-md-6 mb-3">
                  <label for="title">Title</label>
                  <input
                      placeholder="Title"
                      class="form-control animated fadeInUp"
                      type="text"
                      name="title"
                      v-model="title"
                  />
                </div>
                <div class="col-md-6">
                  <label for="description">Descriptions</label>
                <textarea
                    placeholder="Task Description"
                    class="form-control"
                    name="description"
                    v-model="description"
                >
                </textarea>
                </div>
              </div>
              <button @click.prevent="createTask" class="btn w-20 mt-2 animated fadeInUp float-start btn-primary">
                Add Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>