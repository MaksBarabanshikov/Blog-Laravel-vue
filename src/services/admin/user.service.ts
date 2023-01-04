import {useMutation, useQuery, useQueryClient} from "vue-query";
import axios from "@/utils/axios";

export function useGetUsersQuery() {
    const query = () => axios.get("/admin/admin-users")
    return useQuery(["allUsers"], () => query(),{
        onSuccess: () => console.log('users')
    })
}

export function useDeleteUserMutation() {
    const queryClient = useQueryClient()
    const query = (id: number) => axios.delete(`/admin/admin-users/${id}`)
    return useMutation(
        'delete-user',
        (id: number) => query(id),
        {
        onSuccess: () => queryClient.invalidateQueries(["allUsers"])
    }
    )
}
