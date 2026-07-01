"use server";

import { redirect } from "next/navigation";
import { loginSchema } from "@/schemas/auth.schema";
import { authenticate } from "@/lib/auth/users";
import { setSession, clearSession } from "@/lib/auth";

export interface LoginState {
  error?: string;
}

/**
 * Login server action (used with useActionState). Validates with Zod,
 * verifies the password with bcrypt, sets a signed httpOnly session cookie,
 * then redirects to the dashboard.
 */
export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const user = await authenticate(parsed.data.email, parsed.data.password);
  if (!user) {
    return { error: "Invalid email or password." };
  }

  await setSession({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await clearSession();
  redirect("/admin/login");
}
