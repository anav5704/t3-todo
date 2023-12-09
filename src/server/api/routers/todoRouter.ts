import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { Input } from "postcss";

export const todoRouter = createTRPCRouter({
    addTodo: publicProcedure
        .input(z.object({
            content: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const { content } = input

            const todo = await ctx.db.todo.create({
                data: {
                    content
                }
            })

            return todo
        }),

    getTodos: publicProcedure
        .query(async ({ ctx }) => {
            const todos = await ctx.db.todo.findMany()
            return todos
        }),

    deleteTodo: publicProcedure
        .input(z.object({
            id: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const { id } = input

            const todo = await ctx.db.todo.delete({
                where: {
                    id
                }
            })

            return todo
        }),

})