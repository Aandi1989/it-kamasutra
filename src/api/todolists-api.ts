import axios from 'axios';

const instanse = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        "api-key": '22c76d3a-d364-4963-9ac6-fcd4ad3cce7b'
    }
})
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export enum TaskStatuses{
    New=0,
    InProgress=1,
    Completed=2,
    Draft=3
}

export enum TaskPriorities{
    Low=0,
    Middle=1,
    Hi=2,
    Urgently=3,
    Later=4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const todolistsAPI = {
    getTodolists() {
        return instanse.get<Array<TodolistType>>('todo-lists')
            .then(response => {
                console.log(response)
            })
    },
    createTodolist(title: string) {
        return instanse.post<ResponseType<{ item: TodolistType }>>('todo-lists', { title })
            .then(response => {
                console.log(response.data.data.item)
            })
    },
    deleteTodolist(todoListId: string) {
        return instanse.delete<ResponseType>(`todo-lists/${todoListId}`)
            .then(response => {
                console.log(response.data.messages)
            })
    },
    updateTodolist(todoListId: string, title: string) {
        return instanse.put<ResponseType>(`todo-lists/${todoListId}`, { title })
            .then(response => {
                console.log(response.data)
            })
    },
    getTasks(todoListId: string) {
        return instanse.get<GetTasksResponse>(`todo-lists/${todoListId}/tasks`)
            .then(response => {
                console.log(response.data)
            })
    },
    createTask(todoListId: string, title: string) {
        return instanse.post<ResponseType<{item:TaskType}>>(`todo-lists/${todoListId}/tasks`,  {title} )
            .then(response => {
                console.log(response.data.data.item.status)
            })
    },
    deleteTask(todoListId: string, taskId: string) {
        return instanse.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
            .then(response => {
                console.log(response.data)
            })
    },
    updateTask(todoListId: string, taskId: string, model:UpdateTaskModelType) {
        return instanse.put<ResponseType<{item:TaskType}>>(`todo-lists/${todoListId}/tasks/${taskId}`, model )
            .then(response => {
                console.log(response)
            })
    }
}
