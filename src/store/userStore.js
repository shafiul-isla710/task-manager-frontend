import {ref} from "vue";
import axiosClient from "@/services/axiosClient.js";
import {defineStore} from "pinia";
import cogoToast from "cogo-toast";
import {useRoute, useRouter} from "vue-router";

const userProfile = defineStore("userStore",()=> {


    async function getProfile(){
        try{
            const res = await axiosClient.get("auth/profile")
            return res;
        }
        catch(error){
            return false;
        }
    }

    return {
        getProfile,
    }
})

export default userProfile;