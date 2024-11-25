import { computed } from "vue";
import debounce from "@/utils/debounce";

export default function useSearchParams(queryParams, fetchFunction, debounceDelay = 500) {
    
    const currentParams = computed(() => {

        const params = new URLSearchParams({
            page: queryParams.value.page.toString(),
        });

        if (queryParams.value.include) {
            params.append('include', queryParams.value.include.toString());
        }

        for (const key in queryParams.value.filters) {
            if (queryParams.value.filters[key]) {
                params.append(`filter[${key}]`, queryParams.value.filters[key]);
            }
        }

        return params.toString();
    });

    const search = debounce(async () => {
        queryParams.value.page = 1;
        await fetchFunction();
    }, debounceDelay);

    const resetQueryParams = () => {
        for(const key in queryParams.value.filters) {
            queryParams.value.filters[key] = '';
        }
    }

    const changePage = async (url) => {
        if (url === null) return;
        const urlObj = new URL(url);
        queryParams.value.page = urlObj.searchParams.get('page') || 1;
        await fetchFunction();
    };

    return {
        currentParams,
        resetQueryParams,
        changePage,
        search,
    };
}
