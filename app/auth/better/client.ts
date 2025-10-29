"use client";
import { createAuthClient } from "better-auth/react";
import { genericOAuthClient } from "better-auth/client/plugins";

export const { useSession, signIn, signOut } = createAuthClient({
  plugins: [genericOAuthClient()],
});
