<script setup>
import Form from "@/pages/group/form.vue";

defineProps({
  taskId: Number,
  assignTo: String,
})

</script>

<template>

  <div class="content">
    <div class="container">
      <div class="row">
        <div class="col-md-10">
          <div class="w-90 p-4">
            <div class="d-flex justify-content-between">
              <h4>Task Assign to {{assignTo}}</h4>
              <router-link :to="{name:'TaskList'}" class="btn btn-sm btn-primary">Task List</router-link>
            </div>

            <div class="w-90 p-4">
              <form class="">
                <div class="row">
                  <div class="col-md-8 offset-1 mb-3">
                    <label>Status</label>
                    <select name="status" id="status"  class="form-select" aria-label="Default select example">
                      <option :value="1">Active</option>
                      <option :value="0">Inactive</option>
                    </select>
                  </div>
                  <div class="col-md-4 offset-1 mb-3">
                    <button  class="btn w-16 mt-2 animated fadeInUp float-start btn-primary">
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