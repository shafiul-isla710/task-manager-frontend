import {ref} from "vue";
import axiosClient from "@/services/axiosClient.js";
import {defineStore} from "pinia";
import cogoToast from "cogo-toast";
import {useRoute, useRouter} from "vue-router";

const useStore  = defineStore("authStore", ()=>{
    const token = ref(localStorage.getItem("token") || null);
    const user = ref(null);
    const router = useRouter();

    async function register(formData){
        try{
            const res = await axiosClient.post("auth/register",formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            cogoToast.success(res.data.message,{
                position:"top-right",
                size:"small",
            });
            return true
        }
        catch(error){
            if(error.status === 422){
                let errors = ref([]);
                const errorMsg = error.response.data.messages;
                errorMsg.forEach((msg)=>{

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
    async function login(credential){
        try{
            const res = await axiosClient.post("auth/login",credential)
            localStorage.setItem("token", res.data.data.token)
            // user.value = res.data.data.data;
            console.log(res.data.data.data);
            cogoToast.success(res.data.message,{
                position:"top-right",
                size:"small",
            })
            return true
        }
        catch(error){
            if(error.status === 422){
                let errors = ref([]);
                const errorMsg = error.response.data.messages;
                errorMsg.forEach((msg)=>{
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
                })
            }
            return false;
        }
    }

    async function logout(){
       try{
           const res = await axiosClient.delete('auth/logout');
           token.value = null;
           localStorage.removeItem("token");
           cogoToast.success(res.data.message,{
               position:"top-right",
               size:"small",
           })
           if(res){
              setTimeout(()=>{
                  router.push({name:"login"})
              },2000)
           }
           return true
       }
       catch(error){
           cogoToast.error('something went wrongsdfasf',{
               position:"top-right",
               size:"small",
           })
           return false;
       }
    }

    return{
        user,
        token,
        register,
        login,
        logout,
    }
})

export default useStore;
