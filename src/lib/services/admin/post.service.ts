import {useMutation, useQuery, useQueryClient} from "vue-query";
import axios from "@/utils/axios";
import { Ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

export function useGetPostsAdminQuery(page: Ref) {
    const query = () => axios.get(`/admin/admin-posts?page=` + page.value)
    return useQuery(['adminPosts', page], () => query() )
}

export function useGetPostAdminQuery(id: string | string[]) {
    const query = axios.get(`/admin/admin-posts/${id}`)
    return useQuery(['adminPost', id], () => query, {
        onSuccess: () => console.log('post')
    })
}

export function useCreatePostMutation() {
    const query = (newPost: any) => axios.post('/admin/admin-posts', {...newPost})
    return useMutation('createPost', (newPost: any) => query(newPost))
}

export function useDeletePostAdminMutation() {
    const queryClient = useQueryClient();
    const query = (id: number) => axios.delete(`/admin/admin-posts/${id}`)
    return useMutation('delete', (id: number) => query(id), {
        onSuccess: () => queryClient.invalidateQueries(["adminPosts"])
    })
}

export function useUpdatePostAdminMutation() {
    const route = useRoute()
    const router = useRouter()

    const id = route.params.id

    const query = (newPost: any) => axios.put(`/admin/admin-posts/${id}`, {...newPost})
    return useMutation('updatePost', (newPost) => query(newPost),{
        onSuccess: () => router.push({name: "AdminPanel"})
    })
}
