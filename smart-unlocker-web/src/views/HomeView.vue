<template>

    <main class="flex-grow flex flex-col bg-primary p-4">

        <div>
            <span class="text-gray-300">Bienvenido, </span>
            <span class="block text-4xl text-white font-bold">
                {{ user?.name }}
            </span>
        </div>

        <div class="flex-grow flex justify-center items-center">
            <button @click="unlock" :disabled="loading" class="bg-green-600 hover:bg-green-700 text-white rounded-xl" type="button">
                <div v-if="loading">
                    <div class="animate-spin w-72 h-72 border-4 border-t-0 border-l-0 rounded-full m-4 ">
                    </div>
                    <p class="text-sm mb-2">
                        Activando cerradura
                    </p>
                </div>
                <svg v-else class="w-80 h-80" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                        d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z" />
                    <path d="M15 9h.01" />
                </svg>
            </button>

        </div>
    </main>
</template>
<script setup>
    import useActivationRecordStore from '@/stores/activationRecords';
    import useAuthStore from '@/stores/auth';
    import { storeToRefs } from 'pinia';
    import { ref } from 'vue';

    const {
        user
    } = storeToRefs(useAuthStore());

    const {
        createActivationRecord
    } = useActivationRecordStore();

    const loading = ref(false);


    const unlock = async () => {
        try {
            loading.value = true;

            await createActivationRecord({
                uid: user.value.uid
            });

            setTimeout(() => {
                loading.value = false;
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }
</script>