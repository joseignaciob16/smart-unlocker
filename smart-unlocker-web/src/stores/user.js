import useSearchParams from "@/composables/useSearchParams";
import { defineStore } from "pinia";
import api from "@/libs/axios";
import { ref } from "vue";

const useUserStore = defineStore('user', () => {

    const users = ref([]);

    const userQueryParams = ref({
        page: 1,
        filters: {
            'user.name': '',
            role: ''
        }
    })


    const getUsers = async (params = '') => {
        const response = await api.get(`/users?${params}`);
        users.value = response.data;
    }

    const createUser = async (payload) => {
        const response = await api.post('/users', payload);
        return response;
    }

    const updateUser = async (payload, id) => {
        const response = await api.put(`/users/${id}`, payload);
        return response;
    }

    const deleteUser = async (id) => {
        const response = await api.delete(`/users/${id}`);
        return response;
    }

    const fetchUsers = async () => {
        await getUsers(currentParams.value);
    }   

    const searchUsers = () => {
        search(fetchUsers);
    }

    const { 
        currentParams, 
        search, 
        resetQueryParams,
        changePage: changePageUser
    } = useSearchParams(userQueryParams, fetchUsers);

    return {
        users,
        getUsers,
        createUser,
        updateUser,
        deleteUser,
        userQueryParams,
        searchUsers,
        changePageUser,
    }
});

export default useUserStore; 