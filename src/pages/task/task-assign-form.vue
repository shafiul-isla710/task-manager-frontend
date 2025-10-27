<script setup>
import {ref, computed, onMounted} from "vue";
import memberStore from '@/store/memberStore.js'
import groupStore from '@/store/groupStore.js'
import taskStore from '@/store/taskStore.js'
import useStore from '@/store/authStore.js'
import {useRouter,useRoute} from "vue-router";

const props = defineProps({
      taskId: String,
      assignTo: String,
})

const router = useRouter()
const route = useRoute()
// get all member
const store = memberStore();
//get all group
const store2 = groupStore();
//auth store
const store3 = useStore()

//get all member without viewer
const users = computed(() => {
  return store.membersData.filter(user => user.designation !== 'viewer');
});

//get only active groups
const groups = computed(()=>{
  return store2.groups.filter(group => group.status === 1)
})

//Assign Task Function
const selected = ref('');
const adminData = JSON.parse(localStorage.getItem('user'));



const assignTask = async () => {

  const credential = {
    assignee_type:props.assignTo,
    assignee_id:selected.value,
    assigned_by:adminData.id,
  }

   const result = await taskStore().assignTask(props.taskId,credential);
   if(result){
     setTimeout(()=>{
       router.push('/TaskList')
     },2000)
   }
}

onMounted(()=>{
  store.fetchMembers()
  store2.fetchGroups()
})

</script>

<template>

  <div class="content">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-9">
          <div class="w-90 p-4">
            <div class="d-flex justify-content-between align-items-center">
              <h4>Task Assign to {{assignTo}}</h4>
              <router-link :to="{name:'TaskList'}" class="btn btn-sm btn-primary">Task List</router-link>
            </div>

            <div class="w-90 p-4">
              <form class="">
                <div class="row">
                  <div class="col-md-8  mb-3">
                    <label> Select {{assignTo}}</label>
                    <template v-if="assignTo==='group'">
                      <select name="status" id="status" v-model="selected" class="form-select" aria-label="Default select example">
                        <option disabled value="">Select group</option>
                        <option v-if="groups.length" v-for="(group,index) in groups" :key="index" :value="group.id">{{group.name}}</option>
                      </select>
                    </template>

                    <template v-if="assignTo==='user'">
                      <select name="status" id="status" v-model="selected" class="form-select" aria-label="Default select example">
                        <option disabled value="">Select user</option>
                        <option  v-if="users.length" v-for="(user,index) in users" :key="index" :value="user.id">{{user.name}}</option>
                      </select>
                    </template>

                  </div>
                  <div class="col-md-5 d-flex flex-row gap-5 mb-3">
                    <router-link :to="{name:'TaskList'}" class="btn w-16 mt-2 animated fadeInUp float-start btn-secondary">
                      Back
                    </router-link>
                    <button @click.prevent="assignTask" class="btn w-16 mt-2 animated fadeInUp float-start btn-primary">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>