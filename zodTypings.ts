import { z } from "zod";

export const userInput = z.object({
  email: z.string().email(),
  // id: z.string(),
  image: z.string(),
  name: z.string(),
  sub: z.string(),
});
