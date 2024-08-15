import { AddIcon } from "@chakra-ui/icons";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { CreateNoteFormProps, CreateNoteFormValues } from "./interfaces";
import React from "react";
import { fetchGraphQL } from "@/utils/graphql";
import { notifyError, notifySuccess } from "@/utils/notification";

export const CreateNoteForm: React.FC<CreateNoteFormProps> = ({
  refreshNotes,
}) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateNoteFormValues>();
  
  const onSubmit = async ({ title, body }: CreateNoteFormValues) => {
    title = title.replaceAll('"', '\\"');
    body = body.replaceAll('"', '\\"');
    
    try {
      const res = await fetchGraphQL(`
        mutation {
          createNote(title: "${title}", body: "${body}"){id, title, body, createdAt}
        }
      `);
      if (res.errors || !res.data || !res.data.createNote) {
        throw new Error();
      }
      if (refreshNotes) {
        refreshNotes();
      }
      notifySuccess(toast, 'Successfully created notes');
      reset();
      onClose();
    } catch {
      notifyError(toast, 'Error on creating notes');
    }
  };
  
  return (
    <>
      <Button
        colorScheme="teal"
        rightIcon={<AddIcon boxSize={3} />}
        onClick={onOpen}
      >
        Create
      </Button>
      
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Create Note</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={!!errors.title}>
                <FormLabel htmlFor='title'>Title</FormLabel>
                <Input
                  id='title'
                  placeholder='The title of your note'
                  {...register('title', {
                    required: 'This is required',
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl paddingTop={4} isInvalid={!!errors.body}>
                <FormLabel htmlFor='body'>Body</FormLabel>
                <Textarea
                  id='body'
                  placeholder='The contents of your note'
                  minHeight={200}
                  {...register('body', {
                    required: 'This is required',
                  })}
                />
                <FormErrorMessage>
                  {errors.body && errors.body.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
