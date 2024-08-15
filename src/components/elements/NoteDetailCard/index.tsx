import React from "react";
import { NoteDetailCardProps } from "./interface";
import { Card, CardHeader, CardBody, Heading, Text, Flex, Spacer, IconButton, Divider } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { EditNoteForm } from "../EditNoteForm";
import { DeleteNoteConfirm } from "../DeleteNoteConfirm";
import { useRouter } from "next/navigation";

export const NoteDetailCard: React.FC<NoteDetailCardProps> = ({
  note,
  refreshNotes
}) => {
  const router = useRouter();
  
  return (
    <Card
      minWidth={[0, 400, 400, 800]}
    >
      <CardHeader>
      <Flex
        align="center"
        direction={["column", "row"]}
      >
        <div>
          <Heading size='md' wordBreak="break-word">{ note.title }</Heading>
          <Text fontSize="0.9rem" color={'gray'}>Created At: {note.createdAt}</Text>
        </div>
        <Spacer />
        <Flex
          width={["100%", "fit-content"]}
          justify="end"
          marginTop={["1rem", "0"]}
        >
          <EditNoteForm
            note={note}
            refreshNotes={refreshNotes}
          />
          <DeleteNoteConfirm
            noteId={note.id}
            afterDelete={() => {
              router.replace("/");
            }}
            boxSize={5}
          />
        </Flex>
      </Flex>
      </CardHeader>
      <CardBody paddingTop={0}>
        <Divider />
        <Text paddingTop="1rem" whiteSpace="pre-line">{note.body}</Text>
      </CardBody>
    </Card>
  );
};