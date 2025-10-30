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
    const count = ref(0);

    async function fetchMembers(page=1,name=null,desig=null) {
        try{
            loading.value = true;
            const res = await axiosClient.get('/members',{params:{
                    page:page,
                    name:name,
                    designation:desig,
                }});
            console.log(res)
            membersData.value = res.data.data.members.data
            count.value = res.data.data.total
            console.log(count.value)
            pagination.value = {
                current_page: res.data.data.members.current_page,
                last_page: res.data.data.members.last_page,
                links: res.data.data.members.links,
                next_page_url: res.data.data.members.next_page_url,
                prev_page_url: res.data.data.members.prev_page_url,
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
        count
    }
})

export default memberStore;