import z from "zod"

const signupSchema = z.object({
    name : z.string(),
    username : z.string().min(3).max(30),
    companyName : z.string().min(2).max(100),
    email : z.email(),
    password : z.string().min(6),
});

const loginSchema = z.object({
    email : z.string(),
    password : z.string().min(6)
});


export {
    signupSchema,
    loginSchema
}