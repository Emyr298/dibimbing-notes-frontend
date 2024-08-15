'use client';

import { Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { NotesInfoProps } from "./interfaces";
import { CreateNoteForm } from "../CreateNoteForm";

export const NotesInfo: React.FC<NotesInfoProps> = ({
  notesCount,
  refreshNotes,
}) => {
  const message = typeof notesCount === 'number' ? `Showing ${notesCount} Notes` : '';
  
  return (
    <Flex
      align="center"
    >
      <div>
        <Heading fontSize="1.5rem" paddingBottom="0.5rem">My Notes</Heading>
        <Text fontSize="0.9rem" color={'gray'} >{message}</Text>
      </div>
      <Spacer />
      <CreateNoteForm
        refreshNotes={refreshNotes}
      />
    </Flex>
  );
};
