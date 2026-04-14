import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./src/db/db.js";
import * as schema from "./src/db/schema.js"; // 👈 ADD THIS

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    emailAndPassword: { 
        enabled: true, 
    }, 
    trustedOrigins: ["http://localhost:5173"],
});