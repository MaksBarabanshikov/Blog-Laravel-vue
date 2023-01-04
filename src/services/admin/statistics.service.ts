import {useQuery} from "vue-query";
import axios from "@/utils/axios";

export function useGetStatisticsQuery() {
    const query = axios.get("/admin/statistics")
    return useQuery('statistics', () => query)
}
