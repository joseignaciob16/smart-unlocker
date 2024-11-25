import { defineStore } from "pinia";
import api from "@/libs/axios";
import { ref } from "vue";
import router from "@/router";

const useAuthStore = defineStore('auth', () => {

    const user = ref(null);

    const login = async (payload) => {

        const response = await api.post('/login', payload);
        if (response.status === 200) {
            localStorage.setItem('token', response.data.access_token);
            await getUser();
            router.push({ name: 'inicio' });
        }

    }

    const logout = async () => {
        try {
            await api.post('/logout');
            localStorage.removeItem('token');
            user.value = null;
        } catch (error) {
            console.error(error);
        } finally {
            router.push({ name: 'login' });
        }
    }

    const getUser = async () => {
        try {
            const response = await api.get('/user');
            user.value = response.data;
        } catch (error) {
            console.error(error);
        }
    }

    return {
        user,
        login,
        logout,
        getUser
    }
})

export default useAuthStore;