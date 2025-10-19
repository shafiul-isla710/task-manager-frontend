<script setup>
import {onMounted, ref} from "vue";
import memberStore from '@/store/memberStore.js'

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
              <h4>Groups</h4>
<!--              <router-link :to="{name:'createForm'}" class="btn btn-sm btn-primary">Add New</router-link>-->
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
                <button class="btn btn-sm btn-success">Edit</button>
                <button class="btn btn-sm btn-danger ms-2">Delete</button>
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
</template>

<style scoped>

</style>