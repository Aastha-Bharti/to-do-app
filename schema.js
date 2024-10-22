import {z} from 'zod';

export const LogInSchema = z.object({
    email : z.string().email(),
    password: z.string()
});

export const SignUpSchema = z.object({
    name : z.string(),
    email : z.string().email(),
    password: z.string().max(12).min(8)
});

export const ToDoSchema = z.object({
    title: z.string(),
    description: z.string(),
    markAsDone: z.boolean()
});
