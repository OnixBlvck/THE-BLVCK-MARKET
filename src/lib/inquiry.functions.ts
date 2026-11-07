import { createServerFn } from "@tanstack/react-start";
import { inquirySchema } from "./inquiry-schema";
import { storeInquiry } from "./inquiry.server";

export const persistInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inquirySchema.parse(input))
  .handler(({ data }) => storeInquiry(data));