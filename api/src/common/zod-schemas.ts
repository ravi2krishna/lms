import { z } from "zod";

export const IdSchema = z.preprocess(
  (value) => parseInt(value as string),
  z.number().min(1)
);

export const EmailSchema = z.string().email();

export const BooleanQueryParamSchema = z.object({
  archived: z
    .union([z.literal("true"), z.literal("false")])
    .transform((v) => v === "true"),
});
