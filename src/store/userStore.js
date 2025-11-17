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
    async function updateProfile(credentials){
        try{
            const res = await axiosClient.put('auth/profile/update',credentials,{
                headers: {'content-type':'multipart/form-data'}
            });
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
            }else{
                cogoToast.error('something went wrong');
            }
            return false
        }
    }


    return {
        getProfile,
        updateProfile
    }
})

export default userProfile;