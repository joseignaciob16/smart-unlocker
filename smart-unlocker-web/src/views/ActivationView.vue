<template>
  <main class="p-4 min-h-screen text-white bg-primary">

    <div class="bg-secondary p-4 rounded-md mb-8 ">

      <span class="text-xl ">Activaciones totales: </span>

      <div class="mt-2 flex justify-end items-center">
        <h2 class="text-9xl">
          <span class="font-bold">{{activationRecords.total}}</span>
        </h2>

        <svg class="inline w-24" fill="#ffffff" viewBox="0 -6.61 122.88 122.88" version="1.1" id="Layer_1"
          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          enable-background="new 0 0 122.88 109.652" xml:space="preserve" stroke="#ffffff">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M2.585,49.871H54.77V34.054v-0.011h0.009c0.002-9.368,3.828-17.878,9.989-24.042 c6.164-6.163,14.679-9.991,24.051-9.991V0h0.005l0,0h0.012v0.009c9.368,0.002,17.878,3.828,24.042,9.989 c6.164,6.164,9.991,14.679,9.991,24.051h0.012v0.004v15.96v2.403h-2.403h-9.811h-2.404v-2.403V33.868v-0.009h0.012 c-0.002-5.332-2.195-10.189-5.722-13.715c-3.528-3.531-8.388-5.721-13.724-5.724v0.009h-0.005l0,0h-0.011V14.42 c-5.334,0.002-10.191,2.19-13.72,5.717l0.005,0.005c-3.529,3.528-5.722,8.388-5.722,13.722h0.009v0.005v16.003h13.987 c1.422,0,2.585,1.164,2.585,2.585v54.613c0,1.422-1.163,2.583-2.585,2.583H2.585c-1.424,0-2.585-1.161-2.585-2.583V52.456 C0,51.035,1.161,49.871,2.585,49.871L2.585,49.871z M43.957,79.753l4.098,18.908l-11.232,0.045l3.297-19.162 c-3.068-0.981-5.295-3.857-5.295-7.252c0-4.202,3.411-7.613,7.614-7.613c4.202,0,7.613,3.411,7.613,7.613 C50.053,75.975,47.433,79.048,43.957,79.753L43.957,79.753z">
              </path>
            </g>
          </g>
        </svg>
      </div>

    </div>

    <div class="rounded-md text-gray-900 bg-primary">

      <h2 class="text-xl  mb-4 text-white">
        Registros de activaciones
      </h2>

      <div class="flex items-center flex-wrap gap-2 justify-between mb-4">

        <div v-if="user?.role === 'admin'" class="w-full max-w-xl">
          <label for="start" class="block text-white">Nombre</label>
          <input @input="searchActivationRecords" v-model="activationRecordQueryParams.filters['user.name']"
            class="w-full p-2 rounded-md outline-none border-0 " type="search" name="search-user" id="search-user"
            placeholder="Buscar registros por nombre de usuario">
        </div>


        <div class="flex w-full max-w-xl justify-between text-white ">
          <div>
            <label for="start" class="block">Desde</label>
            <input v-model="dates.start" @input="updateDateQueryParam" type="date"
              class="p-2 text-gray-800 rounded-md outline-none border-0" name="start" id="start">
          </div>
          <div>
            <label for="end" class="block">Hasta</label>
            <input v-model="dates.end" @input="updateDateQueryParam" type="date"
              class="p-2 text-gray-800 rounded-md outline-none border-0" name="end" id="end">
          </div>
        </div>
        <p class="text-gray-400 text-xs w-full text-start sm:text-end" >
          Para filtrar por una fecha especifica selecciona solo una, selecciona ambas para buscar por un rango
        </p>
      </div>

      <div class="relative overflow-x-auto shadow-md rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" class="px-6 py-3">
                usuario
              </th>
              <th scope="col" class="px-6 py-3">
                fecha
              </th>
              <th scope="col" class="px-6 py-3">
                hora
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="activacionRecord in activationRecords.data" class="bg-white border-b">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                {{ activacionRecord.user.name }}
              </th>
              <td class="px-2 py-4">
                {{ activacionRecord.date }}
              </td>
              <td class="px-2 py-4">
                {{ activacionRecord.time }}
              </td>
            </tr>

          </tbody>
        </table>


      </div>
      <p class="text-white text-xs mt-2 text-end italic" >
        Página {{activationRecords.current_page}} de {{activationRecords.last_page}}
      </p>

      <div class="mt-4 flex justify-center gap-1">

        <button 
     :disabled="activationRecords.current_page === 1"
     @click="changePageActivationRecord(activationRecords.prev_page_url)"
     class="
       px-4
       py-2
       text-sm
       bg-gray-50
       text-gray-900
       rounded-md
       disabled:cursor-not-allowed
       disabled:opacity-50
     "
   >
     Anterior
   </button>

   <button 
     :disabled="activationRecords.current_page === activationRecords.last_page"
     @click="changePageActivationRecord(activationRecords.next_page_url)"
     class="
       px-4
       py-2
       text-sm
       bg-gray-50
       text-gray-900
       rounded-md
       disabled:cursor-not-allowed
       disabled:opacity-50
     "
   >
   Siguiente
   </button>
      </div>
    </div>

  </main>
</template>
<script setup>
  import echo from '@/libs/echo';
  import useActivationRecordStore from '@/stores/activationRecords';
  import useAuthStore from '@/stores/auth';
  import { storeToRefs } from 'pinia';
  import { onMounted, ref } from 'vue';

  const dates = ref({
    start: '',
    end: ''
  });

  const authStore = useAuthStore();
  const activacionRecordStore = useActivationRecordStore();

  const {
    activationRecords,
    activationRecordQueryParams
  } = storeToRefs(activacionRecordStore);

  const {
    user
  } = storeToRefs(authStore);

  const {
    getActivationRecords,
    searchActivationRecords,
    changePageActivationRecord
  } = activacionRecordStore;

  const updateDateQueryParam = async () => {
    const { start, end } = dates.value;

    if (start && end && new Date(start) > new Date(end)) {
      dates.value.start = null;
      dates.value.end = null;
      return;
    }

    activationRecordQueryParams.value.filters.date = `${start || ''}${start && end ? ',' : ''}${end || ''}`;

    searchActivationRecords();
  }

  onMounted(async () => {
    await getActivationRecords();
    echo.channel('tag-rfid-read')
      .listen('UnlockEvent', () => {
        getActivationRecords();
      });
  });

</script>
