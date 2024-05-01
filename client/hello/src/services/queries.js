import { useMutation, useQuery } from "@tanstack/react-query";
import { getTodos, uploadFile, uploadFiles } from "./api"


export function useGetTodo() {
    return useQuery({
        queryKey: ['todos'],
        queryFn: getTodos,
        refetchOnWindowFocus: true,
        enabled: true
    })
}
export function useUploadFile() {
    return useMutation({
        mutationFn: uploadFile, // Updated mutation function
    });
}
export function useUploadFiles() {
    return useMutation({
        mutationFn: uploadFiles, // Updated mutation function
    });
}