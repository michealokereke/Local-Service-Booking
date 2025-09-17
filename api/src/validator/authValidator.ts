import z from "zod";

export const CurrencyEnum = z.enum([
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CNY",
  "AUD",
  "CAD",
  "CHF",
  "INR",
  "BRL",
  "ZAR",
  "SEK",
  "NZD",
  "SGD",
  "HKD",
  "KRW",
  "MXN",
  "NGN",
  "RUB",
  "TRY",
]);

export const registerSchema = z
  .object({
    name: z.string().min(2).max(80),
    email: z.string().email().trim().lowercase(),
    password: z.string().min(8).max(25),
    confirmPassword: z.string().min(8).max(25),
    role: z.enum(["client", "owner"]).optional(),
    businessName: z.string().trim(),
    timezone: z.string(),
    currency: CurrencyEnum,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const loginSchema = z.object({
  email: z.string().email().trim().lowercase(),
  password: z.string().min(8).max(25),
});
