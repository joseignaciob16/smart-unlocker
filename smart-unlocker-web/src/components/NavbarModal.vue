<template>
    <VueFinalModal v-model="show" teleport-to="body" :click-to-close="true" content-transition="vfm-fade"
        overlay-transition="vfm-fade" class="flex justify-center items-center bg-black bg-opacity-50"
        content-class="flex flex-col m-2 p-4 max-w-6xl bg-primary rounded-lg space-y-2">
        <div class="bg-primary text-white text-xl">
            
            <h2 class="text-4xl mb-4">
                Navegacion
            </h2>

            <nav class="flex flex-col items-center space-y-4 mb-4">

                <RouterLink @click="toggleModal" class="flex p-2 rounded-md" :class="{'bg-[#031119]' : route.name === 'inicio'}"  :to="{ name: 'inicio' }">
                    <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                    </svg>
                    Inicio
                </RouterLink>

                <RouterLink v-if="user?.role === 'admin'" @click="toggleModal" class="flex text-xl p-2 rounded-md" :class="{'bg-[#031119]' : route.name === 'usuarios'}"  :to="{ name: 'usuarios' }">
                    <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                    </svg>
                    Usuarios
                </RouterLink>

                <RouterLink @click="toggleModal" class="flex p-2 rounded-md" :class="{'bg-[#031119]' : route.name === 'activaciones'}" :to="{ name: 'activaciones' }">
                    <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
                        <path d="M9 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                        <path d="M13 11v-4a4 4 0 1 1 8 0v4" />
                    </svg>
                    Activaciones
                </RouterLink>

            </nav>

            <div class="flex justify-center" >
                <button @click="logoutHandler" class="flex items-center px-4 py-2 bg-red-700 rounded-md hover:bg-red-800" type="button">
                    <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                        <path d="M9 12h12l-3 -3" />
                        <path d="M18 15l3 -3" />
                    </svg>
                    Cerrar sesion
                </button>
            </div>

        </div>
    </VueFinalModal>
</template>
<script setup>
    import { VueFinalModal } from 'vue-final-modal';
    import { useRoute } from 'vue-router';
    import { ref } from 'vue';
    import useAuthStore from '@/stores/auth';
    import { storeToRefs } from 'pinia';
    
    const show = ref(false);
    
    const route = useRoute();

    const authStore = useAuthStore();

    const {
        logout
    } = authStore;

    const {
        user
    } = storeToRefs(authStore);

    const logoutHandler = async () => {
        toggleModal();
        await logout();
    }

    const toggleModal = () => {
        show.value = !show.value;
    }

    defineExpose({
        toggleModal
    })
</script>