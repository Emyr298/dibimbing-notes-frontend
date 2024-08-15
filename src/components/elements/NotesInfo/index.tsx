'use client';

import { Flex, Spacer, Text } from "@chakra-ui/react";
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
        <h1 className="text-2xl font-bold">My Notes</h1>
        <Text fontSize="0.9rem" color={'gray'} >{message}</Text>
      </div>
      <Spacer />
      <CreateNoteForm
        refreshNotes={refreshNotes}
      />
    </Flex>
  );
};
