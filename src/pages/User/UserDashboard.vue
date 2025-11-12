<script setup>

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
<!--                  <p v-if="member.loading" >load..</p>-->
<!--                  <h4 v-if="!member.loading" class="mb-0">{{member.count}}</h4>-->
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
<!--                  <p v-if="group.loading" >load..</p>-->
<!--                  <h4 class="mb-0">{{group.count}}</h4>-->
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
<!--                  <h4 class="mb-0">{{task.count}}</h4>-->
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

</style>