<template>
    <VueFinalModal v-model="show" teleport-to="body" :click-to-close="false" content-transition="vfm-fade"
        overlay-transition="vfm-fade" class="flex justify-center items-center bg-black bg-opacity-50 "
        content-class="flex flex-col m-2 p-6 max-w-6xl max-h-[600px] overflow-y-auto bg-primary rounded-lg space-y-2">
        
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-4xl text-white ">
                Nuevo usuario
            </h2>

            <button class="text-white " @click="close" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-x">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M18 6l-12 12" />
                    <path d="M6 6l12 12" />
                </svg>
            </button>
        </div>

        <form id="user-form" class="text-white space-y-4" @submit.prevent="submitHandler">

            <div>
                <label for="uid">UID </label>
                <input v-model="form.uid" type="text" id="uid" name="uid" readonly
                    class="text-gray-800 mt-2 w-full p-2 rounded-md outline-none border-0" required>
            </div>

            <div>
                <label for="name">Nombre </label>
                <input v-model="form.name" type="text" id="name" name="name"
                    class="text-gray-800 mt-2 w-full p-2 rounded-md outline-none border-0" required>
            </div>

            <div>
                <label for="email">Correo </label>
                <input v-model="form.email" type="email" id="email" name="email"
                    class="text-gray-800 mt-2 w-full p-2 rounded-md outline-none border-0" required>
            </div>

            <div>
                <label for="password">Contraseña </label>
                <input v-if="form.id" v-model="form.password" type="password" id="password" name="password"
                    class="text-gray-800 mt-2 w-full p-2 rounded-md outline-none border-0">
                <input v-else v-model="form.password" type="password" id="password" name="password"
                    class="text-gray-800 mt-2 w-full p-2 rounded-md outline-none border-0" required>
            </div>

            <div>
                <label for="password_confirmation">Confirmar contraseña </label>
                <input v-if="form.id" v-model="form.password_confirmation" type="password" id="password_confirmation"
                    name="password_confirmation" class="text-gray-800 mt-2 w-full p-2 rounded-md outline-none border-0">
                <input v-else v-model="form.password_confirmation" type="password" id="password_confirmation"
                    name="password_confirmation" class="text-gray-800 mt-2 w-full p-2 rounded-md outline-none border-0"
                    required>
            </div>

            <div>
                <label for="role">Rol</label>
                <select v-model="form.role" name="role" id="role"
                    class="text-gray-800 mt-2 w-full p-2 rounded-md outline-none border-0" required>
                    <option value="admin">Administrador</option>
                    <option value="user">Usuario</option>
                </select>
            </div>

            <div class="flex" :class="form.id ? 'justify-between' : 'justify-end'" >
                <button v-if="form.id" @click="deleteUserHandler" class="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md" type="button">
                    Eliminar
                </button>
                <button class="mt-4 bg-secondary hover:bg-secondary/80 px-4 py-2 rounded-md" type="submit">
                    Guardar
                </button>
            </div>

            <div class="mt-4">
                <p v-for="e in errors" class="text-red-500 text-center text-xs italic">
                    {{ e }}
                </p>
            </div>

        </form>

    </VueFinalModal>
</template>
<script setup>
    import echo from '@/libs/echo';
    import useUserStore from '@/stores/user';
    import { VueFinalModal } from 'vue-final-modal';
    import { onMounted, onUnmounted, ref } from 'vue';

    const show = ref(false);

    const toggleModal = () => {
        show.value = !show.value;
    }

    const close = () => {
        show.value = false;
        resetForm();
    }

    const {
        getUsers,
        createUser,
        updateUser,
        deleteUser
    } = useUserStore();

    const errors = ref(null);

    const form = ref({
        uid: '',
        role: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const resetForm = () => {
        form.value = {
            uid: '',
            role: '',
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        };

        errors.value = null;    
    }

    const setUser = (user) => {
        form.value = user;
    }

    const deleteUserHandler = async () => {
        const response = await deleteUser(form.value.id);
        if (response.status === 204) {
            resetForm();
            toggleModal();
            await getUsers();
        }
    }

    const submitHandler = async () => {

        try {

            if (form.value.id) {
                const response = await updateUser(form.value, form.value.id);
                if (response.status === 200) {
                    resetForm();
                    toggleModal();
                    await getUsers();
                }
                return;
            }

            const response = await createUser(form.value);
            if (response.status === 201) {
                resetForm();
                toggleModal();
                await getUsers();
            }
        } catch (error) {
            errors.value = error.response.data.errors;
        }
    }

    onMounted(() => {
        echo.channel('tag-rfid-read')
            .listen('TagRFIDReadEvent', (e) => {
                form.value.uid = e.tagRFID;
            });
    });

    onUnmounted(() => {
        echo.leave('tag-rfid-read');
    });


    defineExpose({
        setUser,
        toggleModal
    });
</script>