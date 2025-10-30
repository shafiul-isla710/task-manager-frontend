<script setup>
import {useRouter} from "vue-router";
import memberStore from "@/store/memberStore.js";
import groupStore from "@/store/groupStore.js";
import taskStore from "@/store/taskStore.js";
import {onMounted} from "vue";

//store instance
const member = memberStore()
const group = groupStore()
const task = taskStore()

const router = useRouter();

const list=(param)=>{
  if(param === 'memberList' && confirm('Do you see All Members?')){
    router.push("/member");
  }
  else if(param === 'groupList' && confirm('Do you see All groups?')){
    router.push("/groups");
  }
  else if(param === 'taskList' && confirm('Do you see All Task?')){
    router.push("/TaskList");
  }
}

onMounted(()=>{
  member.fetchMembers()
  group.fetchGroups()
  task.fetchTasks()
})

</script>

<template>

  <!-- Content -->
  <div class="content">
    <div class="container">
      <div class="row">

        <div class="col-lg-4 mb-5">
          <div @click.prevent="list('memberList')" class="card mini-stats-wid">
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <p class="text-muted fw-medium">Total Valid Members</p>
                  <p v-if="member.loading" >load..</p>
                  <h4 v-if="!member.loading" class="mb-0">{{member.count}}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--card end -->

        <div class="col-lg-4 mb-5">
          <div @click.prevent="list('groupList')" class="card mini-stats-wid">
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <p class="text-muted fw-medium">Total Group Created</p>
                  <p v-if="group.loading" >load..</p>
                  <h4 class="mb-0">{{group.count}}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--card end -->

        <div class="col-lg-4 mb-5">
          <div @click.prevent="list('taskList')" class="card mini-stats-wid">
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <p class="text-muted fw-medium">Total Task</p>
                  <h4 class="mb-0">{{task.count}}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--card end -->

        <div class="col-lg-4 mb-5">
          <div class="card mini-stats-wid">
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <p class="text-muted fw-medium">In Progress Task</p>
                  <h4 class="mb-0">0</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--card end -->

        <div class="col-lg-4 mb-5">
          <div class="card mini-stats-wid">
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <p class="text-muted fw-medium">Completed Task</p>
                  <h4 class="mb-0">0</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--card end -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.side-nav-open {
  width: 250px;
  height: 100vh;
  background: #f8f9fa;
  position: fixed;
  /* top: 56px; */
  left: 0;
  overflow-y: auto;
}
.content {
  margin-left: 250px;
  margin-top: 56px;
  padding: 20px;
}
.side-bar-item {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: #333;
  text-decoration: none;
}
.side-bar-item:hover,
.side-bar-item-active {
  background-color: #e9ecef;
  font-weight: bold;
}
.side-bar-item-icon {
  margin-right: 10px;
}
.user-dropdown {
  position: relative;
}
.user-dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: white;
  min-width: 200px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
.user-dropdown:hover .user-dropdown-content {
  display: block;
}
.icon-nav-img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.nav-logo {
  height: 35px;
}
</style>