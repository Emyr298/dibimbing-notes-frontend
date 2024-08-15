'use client';

import { ChevronRightIcon, DeleteIcon } from "@chakra-ui/icons";
import { Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Text, useToast } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { NoteCardProps } from "./interfaces";
import { useRouter } from "next/navigation";
import { fetchGraphQL } from "@/utils/graphql";
import { notifyError, notifySuccess } from "@/utils/notification";

export const NoteCard: React.FC<NoteCardProps> = ({
  noteId,
  title,
  body,
  createdAt,
  refreshNotes,
}) => {
  const router = useRouter();
  const toast = useToast();
  
  const deleteNote = useCallback(async () => {
    try {
      const res = await fetchGraphQL(`
        mutation {
          deleteNote(id: "${noteId}"){id, title, body, createdAt}
        }
      `);
      if (res.errors || !res.data) {
        throw new Error();
      }
      if (refreshNotes) {
        refreshNotes();
      }
      notifySuccess(toast, 'Successfully deleted notes');
    } catch {
      notifyError(toast, 'Error on deleting notes');
    }
  }, [toast, noteId, refreshNotes]);
  
  return (
    <Card
      size="sm"
      flexGrow={1}
      maxWidth={400}
      transitionDuration="0.2s"
      transitionTimingFunction="ease-in-out"
      _hover={{
        background: 'gray.50',
        cursor: 'pointer',
      }}
      onClick={() => {
        router.push(noteId);
      }}
    >
      <CardHeader paddingY="1rem">
        <Heading fontSize="x-large">{title}</Heading>
        <Text color="GrayText" fontSize="medium">Created At: {createdAt}</Text>
      </CardHeader>
      <CardBody paddingTop={0}>
        {body}
      </CardBody>
      <CardFooter paddingTop={0}>
        <Flex
          width="100%"
          justify="space-between"
        >
          <IconButton
            variant="ghost"
            colorScheme="red"
            aria-label="Delete Note"
            icon={<DeleteIcon />}
            onClick={(event) => {
              event.stopPropagation();
              deleteNote();
            }}
          />
          <IconButton
            variant="ghost"
            colorScheme="teal"
            aria-label="Visit Note"
            icon={<ChevronRightIcon />}
          />
        </Flex>
      </CardFooter>
    </Card>
  );
};