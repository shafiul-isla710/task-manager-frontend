<script setup>
import {onMounted, ref} from "vue";
import groupStore from '@/store/groupStore.js'
import {useRoute} from "vue-router";
import Swal from "sweetalert2";

const group = ref([])
const groupMembers = ref([])
const countMember = ref(0)

const route = useRoute();
const groupUser = async()=>{
    const result = await groupStore().getGroupUser(route.params.id)
    group.value = result.data.data.group
    groupMembers.value = result.data.data.members
    console.log(result.data.data.members)
    countMember.value = groupMembers.value.length
}

onMounted(groupUser);

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
                    <button class="btn btn-success">Add Member</button>
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
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="groupMembers.length" v-for="(member,index) in groupMembers" :key="index">
                      <td>image</td>
                      <td>{{member.name}}</td>
                      <td>{{member.email}}</td>
                      <td>{{member.designation}}</td>
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

</template>

<style scoped>

</style>