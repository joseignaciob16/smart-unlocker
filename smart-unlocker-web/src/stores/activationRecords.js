import useSearchParams from "@/composables/useSearchParams";
import { defineStore } from "pinia";
import api from "@/libs/axios";
import { ref } from "vue";

const useActivationRecordStore = defineStore('activationRecord', () => {

    const activationRecords = ref([]);

    const activationRecordQueryParams = ref({
        page: 1,
        filters: {
            name: '',
            date: ''
        }
    });


    const getActivationRecords = async (params = '') => {
        const response = await api.get(`/activation-records?${params}`);
        activationRecords.value = response.data;
    }

    const createActivationRecord = async (payload) => {
        const response = await api.post('/activation-records', payload);
        await fetchActivationRecords();
        return response;
    }

    const updateActivationRecord = async (payload, id) => {
        const response = await api.put(`/activation-records/${id}`, payload);
        return response;
    }

    const deleteActivationRecord = async (id) => {
        const response = await api.delete(`/activation-records/${id}`);
        activationRecords.value.data = activationRecords.value.data.filter(activationRecord => activationRecord.id !== id);
        return response;
    }

    const fetchActivationRecords = async () => {
        await getActivationRecords(currentParams.value);
    }

    const { 
        currentParams, 
        search: searchActivationRecords, 
        resetQueryParams,
        changePage: changePageActivationRecord
    } = useSearchParams(activationRecordQueryParams, fetchActivationRecords);

    return {
        activationRecords,
        getActivationRecords,
        createActivationRecord,
        updateActivationRecord,
        deleteActivationRecord,
        currentParams,
        searchActivationRecords,
        resetQueryParams,
        changePageActivationRecord,
        activationRecordQueryParams
    }
});

export default useActivationRecordStore;