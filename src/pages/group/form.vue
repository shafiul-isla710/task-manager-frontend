<script setup>
import {onMounted, ref} from "vue";
import axiosClient from "@/services/axiosClient.js";
import groupStore from "@/store/groupStore.js";
import {useRouter,useRoute} from 'vue-router'
const name = ref("");
const title = ref("");
const status = ref("");

const router = useRouter()
const route = useRoute()
const store = groupStore()
const errorMessage = ref('')
const isEdit = ref(false)


onMounted(async()=>{

  if(route.params.id){
    isEdit.value = true

    const res = await axiosClient.get(`groups/${route.params.id}`)
    name.value = res.data.data.name
    title.value = res.data.data.title
    status.value = res.data.data.status
  }
})


// Create or Update method ,, if Params exits id group will be update otherwise create group
const createOrUpdate = async () => {
  if(route.params.id){
    const result = await store.updateGroup(route.params.id ,{
      name : name.value,
      title : title.value,
      status : status.value,
    })
    if(result === true){
      setTimeout(()=>{
        router.push("/groups")
      },1000)
    }else{
      errorMessage.value = result
    }
  }
  else{
    const result = await store.createGroup({
      name:name.value,
      title:title.value,
    })
    if(result === true){
      setTimeout(()=>{
        router.push("/groups")
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
              <h4>{{isEdit?'Edit Group':'Group Create'}}</h4>
              <router-link :to="{name:'groups'}" class="btn btn-sm btn-primary">Groups</router-link>
            </div>
            <div v-if="errorMessage" class="w-16 col-md-4 offset-md-8" v-for="(message,index) in errorMessage" :key="index">
              <p class="alert alert-danger text-white" >{{message}}</p>
            </div>
          </div>
          <div class="w-90 p-4">
            <form class="">
              <div class="row">

                <div class="col-md-6 mb-3 ">
                  <label for="name">Group Name</label>
                  <input
                      placeholder="Group Name"
                      class="form-control"
                      type="text"
                      v-model="name"
                      aria-describedby="basic-addon1"
                      aria-label="name"
                  />
                </div>
                <div class="col-md-6">
                  <label for="title">Group Title</label>
                  <textarea
                        placeholder="Group Title"
                        class="form-control"
                        v-model="title"
                    >
                  </textarea>
                </div>
                <div v-show="isEdit" class="col-md-3 mb-3">
                  <label>Status</label>
                  <select name="status" id="status" v-model="status"  class="form-select" aria-label="Default select example">
                    <option :value="1">Active</option>
                    <option :value="0">Inactive</option>
                  </select>
                </div>
              </div>
              <div class="d-flex flex-row align-items-center gap-5">
                <router-link :to="{name:'groups'}" class="btn w-16 mt-2 animated fadeInUp float-start btn-secondary">Back</router-link>
                <button @click.prevent="createOrUpdate" class="btn w-16 mt-2 animated fadeInUp float-start btn-primary">
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