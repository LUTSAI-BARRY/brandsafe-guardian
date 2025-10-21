import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@shared/schema";

// Ensure environment variable is present
if (!process.env.DATABASE_URL) {
  // For development, use a default Neon URL
  process.env.DATABASE_URL = "postgresql://username:password@localhost:5432/brandsafe_dev";
}

// Initialize Neon and Drizzle
const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });

