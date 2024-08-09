import { z } from "zod";

export const signupValidation = z.object({
  name: z.string().min(2, { message: "Tên dài lên fen!" }).max(20),
  email: z.string().email("Có cái mail cũng viết sai gòi làm gì ăn ???"),
  username: z
    .string()
    .min(2, { message: "Ai lại để username 2 chữ ???" })
    .max(20),
  password: z
    .string()
    .min(8, { message: "Đặt password hơn 8 chữ giùm cái!" })
    .max(20),
});

export const signinValidation = z.object({
  email: z.string().email("Có cái mail cũng viết sai gòi làm gì ăn ???"),
  password: z
    .string()
    .min(8, { message: "Đặt password hơn 8 chữ giùm cái!" })
    .max(20),
});

export const createPostValidation = z.object({
  caption: z
    .string()
    .min(5, { message: "Viết caption dài lên fen!" })
    .max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(1, { message: "Địa chỉ nào 1 chữ ???" })
    .max(1000, { message: "Maximum 1000 characters." }),
  tags: z.string(),
});
