"use client"

import { Modal } from "./_components/modal"
import { Todo } from "@prisma/client"
import { api } from "../trpc/react"
import { use, useEffect, useState } from "react"

export default function Home() {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [todos, setTodos] = useState<Todo[]>([])
    const { data, isLoading } = api.todo.getTodos.useQuery()
    const { mutate: deleteTodo }  = api.todo.deleteTodo.useMutation({ 
        onSuccess(deletedTodo){
            setTodos((todos) => todos.filter((todo) => todo.id !== deletedTodo.id))
        }
    })

    useEffect(() => {
        data && setTodos(data)
    }, [data])

    if (!todos || isLoading) {
        return (
            <div className="text-2xl w-screen h-screen flex items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
                Loading...
            </div>
        )
    }

    return (
        <>
            {modalOpen && <Modal setModalOpen={setModalOpen} setTodos={setTodos} />}
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
                <div className="w-1/2">
                    <div className="flex items-center justify-between ">
                        <h1 className="text-3xl"><span className="text-pink-500 font-bold">T3</span> Todo</h1>
                        <button onClick={() => setModalOpen(true)} type="button" className="border border-pink-500 text-md py-2 px-5 rounded-full">Create</button>
                    </div>
                    <div className="mt-10 text-xl flex flex-col gap-y-3">
                        {todos.map((todo) => {
                            const { id, content } = todo
                            
                            return (
                            <div className="flex items-center justify-between">
                                <p>{content}</p>
                                <div onClick={() => deleteTodo({id})} className="p-1 opacity-50 hover:opacity-100 transition text-pink-500 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg >
                                </div>
                            </div>
                        )})}
                    </div>
                </div>
            </main>
        </>
    );
}

