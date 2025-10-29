import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/app/auth/better/server";

export const { GET, POST } = toNextJsHandler(auth);


