import {ref} from "vue";
import axiosClient from "@/services/axiosClient.js";
import {defineStore} from "pinia";
import cogoToast from "cogo-toast";
import {useRoute, useRouter} from "vue-router";


const memberStore = defineStore("memberStore", ()=>{
    const router = useRouter();
    const membersData = ref([]);
    const loading = ref(false);
    const pagination =ref({});

    async function fetchMembers(page=1,name=null,desig=null) {
        try{
            loading.value = true;
            const res = await axiosClient.get('/members',{params:{
                    page:page,
                    name:name,
                    designation:desig,
                }});
            membersData.value = res.data.data.data
            pagination.value = {
                current_page: res.data.data.current_page,
                last_page: res.data.data.last_page,
                links: res.data.data.links,
                next_page_url: res.data.data.next_page_url,
                prev_page_url: res.data.data.prev_page_url,
            }
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
        loading,
        pagination,
    }
})

export default memberStore;