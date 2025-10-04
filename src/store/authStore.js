import {ref} from "vue";
import axiosClient from "@/services/axiosClient.js";
import {defineStore} from "pinia";

import cogoToast from "cogo-toast";

const useStore  = defineStore("authStore", ()=>{
    const token = ref(localStorage.getItem("token") || null);
    const user = ref(null);

    async function register(credential){
        try{
            const res = await axiosClient.post("auth/register",credential)
            cogoToast.success(res.data.message);
            return true
        }
        catch(error){
            if(error.status === 422){
                let errors = ref([]);
                const errorMsg = error.response.data.messages;
                errorMsg.forEach((msg)=>{
                    errors.push(msg)
                    cogoToast.error((msg),{
                        position:"top-right",
                        size:"small",
                    })
                })
                return errors;
            }
            else{
                cogoToast.error('something went wrong',{
                    position:"top-right",
                    size:"small",
                });
            }
        return false;
        }

    }

    return{
        user,
        token,
        register,
    }
})

export default useStore;
