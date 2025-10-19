import {ref} from "vue";
import axiosClient from "@/services/axiosClient.js";
import {defineStore} from "pinia";
import cogoToast from "cogo-toast";
import {useRoute, useRouter} from "vue-router";


const memberStore = defineStore("memberStore", ()=>{
    const router = useRouter();

    async function fetchMembers(){
        try{
            const res = await axiosClient.get("members");
            return res;
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
        fetchMembers,
    }
})

export default memberStore;