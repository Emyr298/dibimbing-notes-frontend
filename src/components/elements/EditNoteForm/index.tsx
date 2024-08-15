import { EditIcon } from "@chakra-ui/icons";
import { Button, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React from "react";
import { fetchGraphQL } from "@/utils/graphql";
import { notifyError, notifySuccess } from "@/utils/notification";
import { EditNoteFormProps, EditNoteFormValues } from "./interface";

export const EditNoteForm: React.FC<EditNoteFormProps> = ({
  note,
  refreshNotes,
}) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    setValue,
    
    formState: { errors, isSubmitting }
  } = useForm<EditNoteFormValues>({
    defaultValues: {
      title: note.title,
      body: note.body,
    }
  });
  
  const onSubmit = async ({ title, body }: EditNoteFormValues) => {
    const filteredTitle = title.replaceAll('"', '\\"');
    const filteredBody = body.replaceAll('"', '\\"');
    
    try {
      const res = await fetchGraphQL(`
        mutation {
          updateNote(id: "${note.id}", title: """${filteredTitle}""", body: """${filteredBody}"""){id, title, body, createdAt}
        }
      `);
      if (res.errors || !res.data || !res.data.updateNote) {
        throw new Error();
      }
      if (refreshNotes) {
        refreshNotes();
      }
      notifySuccess(toast, 'Successfully updated notes');
      setValue('title', title);
      setValue('body', body);
      onClose();
    } catch {
      notifyError(toast, 'Error on updating notes');
    }
  };
  
  return (
    <>
      <IconButton
        variant="ghost"
        colorScheme="teal"
        aria-label="Edit"
        onClick={onOpen}
        icon={<EditIcon boxSize={5} />}
      />
      
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Edit Note</ModalHeader>
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
