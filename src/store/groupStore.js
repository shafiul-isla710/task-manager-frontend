import {defineStore} from "pinia";
import axiosClient from "@/services/axiosClient.js";
import cogoToast from "cogo-toast";
import {ref} from "vue";
import {useRouter} from 'vue-router'

const groupStore = defineStore("groupStore", ()=>{
    const router = useRouter()

    //fetch group
    async function fetchGroups() {
        try{
            const res = await axiosClient.get("groups")
            return res;
        }
        catch(error) {
            cogoToast.error('something went wrong',{
                position:"top-right",
                size:"small",
            });
        }
    }

    // This function for Create a new group
    async function createGroup(credential){
        try{
            const res = await axiosClient.post("groups", credential)
            cogoToast.success(res.data.message,{
                position:"top-right",
                size:"small",
            });
            return true;
        }
        catch(error){
            if(error.status === 422){
                const errors = error.response.data.messages;
                console.log(errors);
                return errors;

            }
            cogoToast.error('something went wrong',{
                position:"top-right",
                size:"small",
            });
        }
    }

    // This function for update
    async function updateGroup(id,credential){
        try{
            const res = await axiosClient.put(`groups/${id}`, credential)
            cogoToast.success(res.data.message,{
                position:"top-right",
                size:"small",
            });
            return true;
        }
        catch(error){
            if(error.status === 422){
                const errors = error.response.data.messages;
                return errors;
            }
            cogoToast.error('something went wrong',{
                position:"top-right",
                size:"small",
            });
        }
    }

    // This function for update
    async function deleteGroup(id){
        try{
            const res = await axiosClient.delete(`groups/${id}`);
            return true;
        }
        catch(error){
            cogoToast.error('something went wrong',{
                position:"top-right",
                size:"small",
            })
            return false;
        }
    }

    async function getGroupUser(id){
        try{
            const res = await axiosClient.get(`group/${id}/user`);
            return res
        }
        catch(error){
            cogoToast.error('something went wrong',{
                position:"top-right",
                size:"small",
            })
            return false
        }
    }


    return {
        fetchGroups,
        createGroup,
        updateGroup,
        deleteGroup,
        getGroupUser
    }
})

export default groupStore