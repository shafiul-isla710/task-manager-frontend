import {ref} from "vue";
import axiosClient from "@/services/axiosClient.js";
import {defineStore} from "pinia";

import cogoToast from "cogo-toast";
import {useRoute, useRouter} from "vue-router";

const taskStore = defineStore('taskStore', ()=>{

    async function fetchTasks(page = 1) {
        try{
            const res = await axiosClient.get(`tasks?page=${page}`);

            return res;

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
            if(error.status === 422){
                const errors = error.response.data.messages
                return errors;
            }
            cogoToast.error('Something went wrong',{
                position:"top-right",
                size:"small",
            })
            return false;
        }
    }
    async function updateTask(id,credentials){
            try{
                const res = await axiosClient.put(`tasks/${id}`,credentials )
                cogoToast.success(res.data.message,{
                    position:"top-right",
                    size:"small",
                })
                return true;
            }
            catch(error){
                if(error.status === 422){
                    const errors = error.response.data.messages
                    return errors;
                }
                cogoToast.error('Something went wrong',{
                    position:"top-right",
                    size:"small",
                })
                return false;
            }
    }

    async function deleteTask(id){
        try{
            const res = await axiosClient.delete(`tasks/${id}`);
            cogoToast.success(res.data.message,{
                position:"top-right",
                size:"small",
            })
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
        updateTask,
        deleteTask
    }
})

export default taskStore;