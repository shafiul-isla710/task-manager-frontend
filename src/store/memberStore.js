import {ref} from "vue";
import axiosClient from "@/services/axiosClient.js";
import {defineStore} from "pinia";
import cogoToast from "cogo-toast";
import {useRoute, useRouter} from "vue-router";


const memberStore = defineStore("memberStore", ()=>{
    const router = useRouter();
    const membersData = ref([]);
    const loading = ref(false);

    async function fetchMembers(){
        try{
            loading.value = true;
            const res = await axiosClient.get("members");
            membersData.value = res.data.data
            loading.value = false;
            return true
        }
        catch(error){
            cogoToast.error('Something went wrong',{
                position:"top-right",
                size:"small",
            })
            return false;
        }
    }
    async function member(id){
        try{
            const res = await axiosClient.get(`member/${id}`);
            return res;
        }
        catch(error){
            cogoToast.error('Something went wrong',{
                position:"top-right",
                size:"small",
            })
        }
    }
    async function setDesignation(id,credential){
        try{
            const res = await axiosClient.put(`member/${id}`,credential);
            cogoToast.success(res.data.message,{
                position:"top-right",
                size:"small",
            })
            return true
        }
        catch(error){
            if(error.status===422){
                cogoToast.error(error.response.data.messages,{
                    position:"top-right",
                    size:"small",
                })
            }
            cogoToast.error('Something went wrong',{
                position:"top-right",
                size:"small",
            })
            return false;
        }
    }

    return {
        fetchMembers,
        member,
        setDesignation,
        membersData,
        loading
    }
})

export default memberStore;