<script setup>
import axiosClient from "@/services/axiosClient.js";
import {onMounted, ref} from "vue";
import taskStore from "@/store/taskStore.js";
import {useRouter,useRoute} from "vue-router";
import axios from "axios";

const router = useRouter()
const route = useRoute()

const isEdit = ref(false);
const title = ref()
const description = ref()
const errorMessage = ref()

onMounted(async () =>{
  if(route.params.id){
    isEdit.value = true
    const res = await axiosClient.get(`/tasks/${route.params.id}`)
    title.value = res.data.data.title
    description.value = res.data.data.description
  }
})

const createOrUpdate = async () => {

  if(route.params.id){
      const result = await taskStore().updateTask(route.params.id, {
        title: title.value,
        description: description.value,
      })
      if(result === true){
        setTimeout(()=>{
          router.push("/TaskList")
        },1000)
      }else{
        errorMessage.value = result
      }
  }
  else{
      const result = await taskStore().createTask({
        title: title.value,
        description: description.value,
      })
      if(result === true){
        setTimeout(()=>{
          router.push('/TaskList')
        },1000)
      }else{
        errorMessage.value = result
      }
  }
}

</script>

<template>
  <div  class="content">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-9">
          <div class="w-90 p-4">
            <div class="d-flex justify-content-between align-items-center">
              <h4>{{isEdit?'Edit Task':'Task Create'}}</h4>
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
                  <span v-if="errorMessage" class="text-danger">
                    {{errorMessage[0]}}
                  </span>
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
              <div class="d-flex flex-row align-items-center gap-5 mt-4">
                <router-link :to="{name:'TaskList'}" class="btn w-16 mt-2 animated fadeInUp float-start btn-secondary">Back</router-link>
              <button @click.prevent="createOrUpdate" class="btn w-20 mt-2 animated fadeInUp float-start btn-primary">
                {{isEdit?'Save Change':'Save'}}
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>