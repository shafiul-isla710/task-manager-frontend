import {ref} from "vue";
import axiosClient from "@/services/axiosClient.js";
import {defineStore} from "pinia";

import cogoToast from "cogo-toast";

const useStore  = defineStore("authStore", ()=>{
    const token = ref(localStorage.getItem("token") || null);
    const user = ref(null);

    async function register(credential){
        try{
            const res = await axiosClient.post("api/register",credential)
            cogoToast.success(res.data.message);
            return true
        }
        catch(error){
            if(error.response.status === 422){
                const errorMsg = error.response.data.message;
                errorMsg.forEach((msg)=>{
                    cogoToast.error((msg),{
                        position:"top-right",
                        size:"small",
                    })
                })
            }
            else{
                cogoToast.error('something went wrong');
            }
        return false;
        }

    }

    return{
        user,
        token
    }
})

export default useStore;
