import { useMutation } from "@tanstack/react-query";
export const useMutaionHook = (fnCallback) => {
  const mutation = useMutation({ mutationFn: fnCallback });
  return mutation;
};
