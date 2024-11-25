<template>
    <main class="flex items-center justify-center h-screen bg-[url('/background.jpg')] bg-cover bg-center ">

        <form @submit.prevent="submitHandler" class="bg-[#011826] text-white  p-8 rounded-lg shadow-lg w-96  ">
            <div class="mb-8" >
                <h1 class="text-5xl font-bold text-center mb-4">Smart Unlocker</h1>
                <p class="text-xs text-center" >!Bienvenido, por favor ingrese sus credenciales!</p>
            </div>
            
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium ">Email</label>
                <input v-model="form.email" type="email" id="email" name="email"
                    class="text-gray-800 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required>
            </div>
            <div class="mb-6">
                <label for="password" class="block text-sm font-medium ">Password</label>
                <input v-model="form.password" type="password" id="password" name="password"
                    class="text-gray-800 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required>
            </div>
            <div class="flex items-center justify-between">
                <button type="submit"
                    class="w-full bg-secondary  hover:bg-secondary/80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
            </div>
            <div class="mt-4">
                <p class="text-red-500 text-center text-xs italic">{{ errors }}</p>
            </div>
        </form>
    </main>
</template>

<script setup>
    import { ref } from 'vue';
    import useAuthStore from '@/stores/auth';

    const {
        login
    } = useAuthStore();

    const errors = ref(null);

    const form = ref({
        email: '',
        password: ''
    });

    const submitHandler = async () => {
        try {
        await login(form.value);
        } catch (error) {
            errors.value = error.response.data.message;
        }
    }

</script>
