import {ref} from "vue";
import axiosClient from "@/services/axiosClient.js";
import {defineStore} from "pinia";

import cogoToast from "cogo-toast";
import {useRoute, useRouter} from "vue-router";

const taskStore = defineStore('taskStore', ()=>{

    async function fetchTasks() {
        try{
            const res = await axiosClient.get("/tasks");
            return res.data.data ? res.data.data : [];

        }
        catch(error) {
            cogoToast.error('Something went wrong',{
                position:"top-right",
                size:"small",
            });
            return false;
        }
    }

    async function createTask(credentials) {
        try{
            const res = await axiosClient.post("/tasks",credentials )

            cogoToast.success(res.data.message,{
                position:"top-right",
                size:"small",
            });
            return true;
        }
        catch(error){
            cogoToast.error('Something went wrong',{
                position:"top-right",
                size:"small",
            })
            return false;
        }
    }

    return {
        fetchTasks,
        createTask,
    }
})

export default taskStore;