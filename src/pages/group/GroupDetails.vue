<script setup>
import {onMounted, ref} from "vue";
import groupStore from '@/store/groupStore.js'
import {useRoute} from "vue-router";
import Swal from "sweetalert2";
import memberStore from "@/store/memberStore.js";

//member store create
const store = memberStore();

const group = ref([])
const groupMembers = ref([])
const countMember = ref(0)

const route = useRoute();
const groupUser = async()=>{
    const result = await groupStore().getGroupUser(route.params.id)
    group.value = result.data.data.group
    groupMembers.value = result.data.data.members
    countMember.value = groupMembers.value.length
}

// user or member assign to group
const showModal = ref(false)
const selected = ref('')



//assign group function
const assignMember = async()=>{
  const result = await groupStore().memberAssign(route.params.id,{
    user_id:selected.value,
  })
  if(result){
    setTimeout(()=>{
      showModal.value = false
      groupUser()
    },1000)
  }
}
//function for delete member from group
const removeMember = async(user_id)=>{
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
    await groupStore().removeMember(route.params.id,user_id)
    groupUser()
  }
}

onMounted(async ()=>{
  await groupUser()
  store.fetchMembers()
})

</script>

<template>
  <div class="content">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="w-90 p-4">
                <div class="d-flex justify-content-between align-items-cente">
                  <h4>Groups Details</h4>
                  <div class="d-flex flex-row gap-5" >
                    <router-link class="btn btn-secondary" :to="{name:'groups'}">back</router-link>
                    <button @click="showModal = true " class="btn btn-success">Add Member</button>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-5">
                  <div class="table-responsive">
                    <table class="table table-bordered table-striped align-middle">
                      <tbody>
                      <tr>
                        <th scope="row" style="width: 30%">Group Name</th>
                        <td>{{ group.name }}</td>
                      </tr>
                      <tr>
                        <th scope="row">Title</th>
                        <td>{{ group.title }}</td>
                      </tr>
                      <tr>
                        <th scope="row">Members</th>
                        <td>{{ groupMembers.length }}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="col-md-5 offset-md-1">
                  <table class="table table-hover align-middle text-center mb-4">
                    <thead class="table-light">
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Designation</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="groupMembers.length" v-for="(member,index) in groupMembers" :key="index">
                      <td>image</td>
                      <td>{{member.name}}</td>
                      <td>{{member.email}}</td>
                      <td>{{member.designation}}</td>
                      <td>
                        <button @click="removeMember(member.id)" class="bg-danger text-white p-1 border-0 rounded-sm">Remove</button>
                      </td>
                    </tr>
                    <tr v-else>
                      <td colspan="5">No members found</td>
                    </tr>
                    </tbody>
                  </table>
                  <h6 class="m-3">Group Members</h6>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- Modal -->
  <div
      class="modal fade show"
      tabindex="-1"
      style="display: block; background: rgba(0,0,0,0.5);"
      v-if="showModal"
  >
    <div class="modal-dialog custom-modal modal-dialog">
      <div class="modal-content container">
        <div class="modal-header">
          <h5 class="modal-title">Groups</h5>
          <button
              type="button"
              class="btn-close"
              @click="showModal = false"
          ></button>
        </div>

        <div class="modal-body">
          <select class="form-select mb-3 form-control" v-model="selected">
            <option selected >Select a group</option>
            <option v-if="store.membersData" v-for="(member,index) in store.membersData" :key="index" :value="Number(member.id)">
              {{member.name}} -  {{member.designation}}
            </option>
          </select>
        </div>

        <div class="modal-footer">
          <button
              type="button"
              class="btn btn-secondary"
              @click="showModal = false"
          >
            Cancel
          </button>
          <button @click="assignMember" type="button" class="btn btn-success">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

.custom-modal {
  max-width: 700px;
}
.modal-dialog {
  margin-left: auto;
  margin-right: auto;
  margin-top: 90px;
}

</style>