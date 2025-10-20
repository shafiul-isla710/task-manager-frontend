<script setup>
import {onMounted, ref} from "vue";
import {useRoute,useRouter} from 'vue-router'
import memberStore from '@/store/memberStore.js'

const name = ref('')
const email = ref('')
const selected = ref('')

const designation = ref([])

const route = useRoute()
const router = useRouter()

const getMember = async () => {
  const result = await memberStore().member(route.params.id);
  name.value = result.data.data.member.name
  email.value = result.data.data.member.email
  selected.value = result.data.data.member.designation
  designation.value=result.data.data.designations
  console.log(selected.value)
}

const setDesignation = async () => {
  const result = await memberStore().setDesignation(route.params.id,{
    designation: selected.value,
  });
  if(result){
    setTimeout(()=>{
      router.push('/member')
    },2000)
  }
}

onMounted(() => {
  getMember();
})

</script>

<template>

  <div  class="content">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="w-90 p-4">
            <div class="d-flex justify-content-between align-items-center">
              <h4>Edit Member's Roll</h4>
<!--              <router-link :to="{name:'groups'}" class="btn btn-sm btn-primary">Groups</router-link>-->
            </div>
          </div>
          <div class="w-90 p-4">
            <form class="">
              <div class="row">

                <div class="col-md-6 mb-3">
                  <label for="title">Name</label>
                  <input
                      placeholder="Name"
                      class="form-control animated fadeInUp"
                      type="text"
                      readonly
                      v-model="name"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="title">Email</label>
                  <input
                      placeholder="Name"
                      class="form-control animated fadeInUp"
                      type="text"
                      readonly
                      v-model="email"
                  />
                </div>

                <div class="col-md-4 mb-3">
                  <label>Designation</label>
                  <select class="form-select" v-model="selected" aria-label="Default select example" >
                      <option v-if="designation.length" v-for="(data,index) in designation" :key="index" :value="data">{{data}}</option>

                  </select>
                </div>
              </div>
              <div class="d-flex flex-row align-items-center gap-5">
                <router-link :to="{name:'memberList'}" class="btn w-16 mt-2 animated fadeInUp float-start btn-secondary">Back</router-link>
                <button @click.prevent="setDesignation()" class="btn w-16 mt-2 animated fadeInUp float-start btn-primary">
                  Save
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