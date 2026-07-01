#!/usr/bin/env node
/**
 * Generate a base64-encoded bcrypt hash for ADMIN_PASSWORD_HASH_B64.
 * Usage: node scripts/hash-password.mjs "YourStrongPassword"
 */
import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "YourStrongPassword"');
  process.exit(1);
}
if (password.length < 8) {
  console.error("Password should be at least 8 characters.");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
const b64 = Buffer.from(hash).toString("base64");

console.log("\nAdd this to your .env.local (base64-encoded to survive dotenv):\n");
console.log(`ADMIN_PASSWORD_HASH_B64=${b64}\n`);
