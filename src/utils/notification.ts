import { CreateToastFnReturn } from "@chakra-ui/react";

export const notifySuccess = (toast: CreateToastFnReturn, msg: string) => {
  toast({
    title: msg,
    status: "success",
    duration: 9000,
    isClosable: true,
  });
};

export const notifyError = (toast: CreateToastFnReturn, msg: string) => {
  toast({
    title: msg,
    status: "error",
    duration: 9000,
    isClosable: true,
  });
}
