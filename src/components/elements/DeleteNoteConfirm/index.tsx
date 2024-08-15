import { DeleteIcon } from "@chakra-ui/icons";
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";
import { fetchGraphQL } from "@/utils/graphql";
import { notifyError, notifySuccess } from "@/utils/notification";
import { DeleteNoteConfirmProps } from "./interface";

export const DeleteNoteConfirm: React.FC<DeleteNoteConfirmProps> = ({
  noteId,
  afterDelete,
  boxSize = 3,
  stopPropagation = false,
}) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = async () => {
    try {
      const res = await fetchGraphQL(`
        mutation {
          deleteNote(id: "${noteId}"){id, title, body, createdAt}
        }
      `);
      if (res.errors || !res.data || !res.data.deleteNote) {
        throw new Error();
      }
      if (afterDelete) afterDelete();
      notifySuccess(toast, 'Successfully deleted notes');
      onClose();
    } catch {
      notifyError(toast, 'Error on deleting notes');
    }
  };
  
  return (
    <>
      <IconButton
        variant="ghost"
        colorScheme="red"
        aria-label="Delete"
        icon={<DeleteIcon boxSize={boxSize} />}
        onClick={(event) => {
          if (stopPropagation) event.stopPropagation();
          onOpen();
        }}
      />
      
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete the note?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={onDelete}
              marginRight="0.5rem"
            >
              Delete
            </Button>
            <Button
              colorScheme="gray"
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
