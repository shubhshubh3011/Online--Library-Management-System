import e from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import dotenv from 'dotenv'

const app = e();

dotenv.config()

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(e.json())

app.listen(3001, () => {
    console.log(`Server running on port ${3001}`)
})