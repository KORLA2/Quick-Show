import z from 'zod';
export declare let signUpSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strict>;
export declare let signInSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strict>;
export type signInFormData = z.infer<typeof signInSchema>;
export type signUpFormData = z.infer<typeof signUpSchema>;
export type AuthForm = signInFormData & Partial<signUpFormData>;
