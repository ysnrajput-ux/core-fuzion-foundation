import { toast as sonner } from "sonner";

import { toErrorMessage } from "@/utils/errors";

export const toast = {
  success: (msg: string) => sonner.success(msg),
  error: (err: unknown) => sonner.error(toErrorMessage(err)),
  info: (msg: string) => sonner.info(msg),
  warning: (msg: string) => sonner.warning(msg),
  promise: sonner.promise.bind(sonner),
};
