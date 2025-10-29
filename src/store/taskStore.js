import {ref} from "vue";
import axiosClient from "@/services/axiosClient.js";
import {defineStore} from "pinia";

import cogoToast from "cogo-toast";
import {useRoute, useRouter} from "vue-router";

const taskStore = defineStore('taskStore', ()=>{
    const task = ref([]);
    const pagination = ref({})
    const loading = ref(false);
    async function fetchTasks(page = 1,title=null) {
        try{
            loading.value = true;
            const res = await axiosClient.get('/tasks',{params:{
                page:page, title:title
                }});
            task.value = res.data.data.data
            pagination.value = {
                current_page: res.data.data.current_page,
                last_page: res.data.data.last_page,
                links: res.data.data.links,
                next_page_url: res.data.data.next_page_url,
                prev_page_url: res.data.data.prev_page_url,
            }
            loading.value = false;
            return true;

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

    async function assignTask(task,credentials){
        try{
            const res = await axiosClient.post(`tasks/${task}/assign`,credentials)
            cogoToast.success(res.data.message,{
                position:"top-right",
                size:"small",
            })
            return true
        }
        catch(error){
            if(error.status === 422){
                cogoToast.error(error.response.data.messages,{
                    position:"top-right",
                    size:"small",
                })
            }
            return false
        }
    }

    return {
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        assignTask,
        task,
        loading,
        pagination
    }
})

export default taskStore;