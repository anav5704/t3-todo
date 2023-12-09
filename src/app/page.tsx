"use client"

import { Modal } from "./_components/modal"
import { Todo } from "@prisma/client"
import { api } from "../trpc/react"
import { use, useEffect, useState } from "react"

export default function Home() {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [todos, setTodos] = useState<Todo[]>([])
    const { data, isLoading } = api.todo.getTodos.useQuery()
    
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
                    <div className="mt-10 text-xl flex flex-col gap-y-2">
                        {todos.map((todo) => (
                            <div>{todo.content}</div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}

