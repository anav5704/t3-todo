"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { api } from "../../trpc/react"
import { Todo } from "@prisma/client"

interface ModalProps {
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    setTodos: Dispatch<SetStateAction<Todo[]>>
}

export const Modal = ({ setModalOpen, setTodos }: ModalProps) => {
    const [content, setContent] = useState("")
    const { mutate: addTodo } = api.todo.addTodo.useMutation({
        onSuccess(todo) {
            setTodos((todos) => [...todos, todo])
        }
    })

    return (
        <div className="text-white bg-black/50 h-screen w-screen absolute isnet-0 flex justify-center items-center">
            <div className="p-5 space-y-5 bg-white/10 rounded-xl">
                <h1 className="text-2xl">Add Todo</h1>
                <div className="flex flex-col gap-y-5">
                    <input onChange={(e) => setContent(e.target.value)} value={content} className="text-black focus:outline-none p-2 rounded-md" type="text" name="content" id="" />
                    <div className="flex justify-end gap-x-5">
                        <button onClick={() => setModalOpen(false)} className="border rounded-full px-4 py-1">Cancel</button>
                        <button onClick={() => {
                            addTodo({ content })
                            setModalOpen(false)
                            setContent("")
                        }} className="bg-pink-500 rounded-full px-4 py-1">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
