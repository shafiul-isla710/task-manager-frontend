<script setup>
import {onMounted, ref} from "vue";
import memberStore from '@/store/memberStore.js'
import groupStore from '@/store/groupStore.js'

const memberList = ref([])
const memberFetch = async ()=>{
  const result = await memberStore().fetchMembers()
  memberList.value = result.data.data;
  console.log(memberList.value)
}
onMounted(memberFetch)
</script>

<template>
  <div  class="content">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class=" w-90 p-4">
            <div class=" d-flex justify-content-between align-items-center">
              <h4>Member List</h4>
            </div>
          </div>

          <table class="table table-hover align-middle text-center">
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
            <tr v-if="memberList.length" v-for="(member, index) in memberList" :key="index">
              <td>
                <template v-if="member.profile_image">
                  <img
                      :src="member.profile_image"
                      alt="Profile"
                      class="rounded-circle border shadow-sm"
                      style="width: 60px; height: 60px; object-fit: cover;"
                  />
                </template>
                <template v-else>
                  <img
                      src="@/assets/img/dummy.png"
                      alt="Profile"
                      class="rounded-circle border shadow-sm"
                      style="width: 60px; height: 60px; object-fit: cover;"
                  />
                </template>
              </td>
              <td>{{ member.name }}</td>
              <td>{{ member.email }}</td>
              <td>{{ member.designation }}</td>
              <td>
                <router-link :to="{name:'memberEditForm',params:{id:member.id}}" class="btn btn-sm btn-success">Assign Roll</router-link>
              </td>
            </tr>
            <tr v-else>
              <td colspan="5">No members found</td>
            </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
<!--  <div-->
<!--      class="modal fade show"-->
<!--      tabindex="-1"-->
<!--      style="display: block; background: rgba(0,0,0,0.5);"-->
<!--      v-if="showModal"-->
<!--  >-->
<!--    <div class="modal-dialog modal-dialog-centered ">-->
<!--      <div class="modal-content container">-->
<!--        <div class="modal-header">-->
<!--          <h5 class="modal-title">Groups</h5>-->
<!--          <button-->
<!--              type="button"-->
<!--              class="btn-close"-->
<!--              @click="showModal = false"-->
<!--          ></button>-->
<!--        </div>-->

<!--        <div class="modal-body">-->
<!--          <select class="form-select mb-3" v-model="selected" >-->
<!--            <option disabled selected >Select a group</option>-->
<!--            <option v-if="groups" v-for="(group,index) in groups" :key="index" :value="group.id">{{group.name}}</option>-->
<!--          </select>-->
<!--        </div>-->

<!--        <div class="modal-footer">-->
<!--          <button-->
<!--              type="button"-->
<!--              class="btn btn-secondary"-->
<!--              @click="showModal = false"-->
<!--          >-->
<!--            Cancel-->
<!--          </button>-->
<!--          <button type="button" class="btn btn-success">-->
<!--            Save-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->


</template>

<style scoped>

</style>