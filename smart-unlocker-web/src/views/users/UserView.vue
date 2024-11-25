<template>
  <main class="flex-grow min-h-screen flex flex-col bg-primary text-white p-4">

    <div class="bg-slate-400 p-4 rounded-md mb-8 ">

      <span class="text-xl ">Usuarios totales: </span>

      <div class="mt-2 flex justify-end items-center">
        <h2 class="text-9xl">
          <span class="font-bold">{{ users.total }}</span>
        </h2>

        <svg class="inline w-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
          <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
        </svg>
      </div>

    </div>



    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">
        Usuarios
      </h1>

      <button @click="userModal.toggleModal()" class="bg-secondary hover:bg-secondary/80 px-4 py-2 rounded-md"
        type="button">
        Nuevo usuario
      </button>
    </div>

    <div class="mb-8">
      <input @input="searchUsers" v-model="userQueryParams.filters.name"
        class="text-gray-800 mt-2 w-full p-2 rounded-md outline-none border-0" type="search" name="search-users"
        id="search-users" placeholder="Buscar usuario por nombre">
    </div>

    <div class="relative overflow-x-auto shadow-md rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right">
        <thead class=" uppercase bg-gray-50 text-gray-900 ">
          <tr>
            <th scope="col" class="px-6 py-3 font-bold">
              nombre
            </th>
            <th scope="col" class="px-6 py-3 font-bold">
              correo
            </th>
            <th scope="col" class="px-6 py-3 font-bold">
              rol
            </th>
            <th scope="col" class="px-6 py-3 font-bold">

            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users.data" class="bg-gray-50 text-gray-900 border-b ">
            <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap ">
              {{ user.name }}
            </th>
            <td class="px-6 py-4">
              {{ user.email }}
            </td>
            <td class="px-6 py-4">
              {{ user.role }}
            </td>
            <td class="px-6 py-4 flex justify-end">
              <button @click="openUpdateUserModal(user)"
                class="bg-green-600 hover:bg-green-600/80 px-4 py-2 rounded-md text-white" type="button">
                Editar
              </button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>

    <p class="text-white text-xs mt-2 text-end italic" >
        Página {{users.current_page}} de {{users.last_page}}
      </p>

    <!-- pagination -->
    <div class="mt-4 flex justify-center gap-1">

      <button :disabled="users.current_page === 1" @click="changePageUser(users.prev_page_url)" class="
          px-4
          py-2
          text-sm
          bg-gray-50
          text-gray-900
          rounded-md
          disabled:cursor-not-allowed
          disabled:opacity-50
          ">
        Anterior
      </button>

      <button :disabled="users.current_page === users.last_page" @click="changePageUser(users.next_page_url)" class="
          px-4
          py-2
          text-sm
          bg-gray-50
          text-gray-900
          rounded-md
          disabled:cursor-not-allowed
          disabled:opacity-50
          ">
        Siguiente
      </button>
    </div>

  </main>
  <UserModal ref="user-modal" />
</template>
<script setup>
  import { onMounted, useTemplateRef } from 'vue';
  import UserModal from './UserModal.vue';
  import useUserStore from '@/stores/user';
  import { storeToRefs } from 'pinia';

  const userModal = useTemplateRef('user-modal');

  const userStore = useUserStore();

  const {
    users,
    userQueryParams
  } = storeToRefs(userStore);

  const {
    getUsers,
    searchUsers,
    changePageUser
  } = userStore;

  const openUpdateUserModal = (user) => {
    userModal.value.setUser(user);
    userModal.value.toggleModal();
  }

  onMounted(async () => {
    await getUsers();
  });

</script>