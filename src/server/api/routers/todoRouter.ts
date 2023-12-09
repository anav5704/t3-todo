import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

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

    toggleTodo: publicProcedure
        .input(z.object({
            id: z.string(),
            done: z.boolean()
        }))
        .mutation(async ({ ctx, input }) => {
            const { id, done } = input

            const todo = ctx.db.todo.update({
                where: {
                    id
                },
                data: {
                    done
                }
            })

            return todo
        })
})