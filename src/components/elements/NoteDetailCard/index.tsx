import React from "react";
import { NoteDetailCardProps } from "./interface";
import { Card, CardHeader, CardBody, Heading, Text, Flex, Spacer, IconButton, Divider } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

export const NoteDetailCard: React.FC<NoteDetailCardProps> = ({
  note,
  refreshNotes
}) => {
  return (
    <Card
      minWidth={[0, 400, 400, 800]}
    >
      <CardHeader>
      <Flex
        align="center"
      >
        <div>
          <Heading size='md'>{ note.title }</Heading>
          <Text fontSize="0.9rem" color={'gray'}>createdAt: {note.createdAt}</Text>
        </div>
        <Spacer />
        <IconButton
          variant="ghost"
          colorScheme="teal"
          aria-label="Delete"
          icon={<EditIcon boxSize={5} />}
        />
        <IconButton
          variant="ghost"
          colorScheme="red"
          aria-label="Delete"
          icon={<DeleteIcon boxSize={5} />}
        />
      </Flex>
      </CardHeader>
      <CardBody paddingTop={0}>
        <Divider />
        <Text paddingTop="1rem">{note.body}</Text>
      </CardBody>
    </Card>
  );
};