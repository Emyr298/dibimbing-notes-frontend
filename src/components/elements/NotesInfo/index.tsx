'use client';

import { AddIcon } from "@chakra-ui/icons";
import { Button, Flex, Spacer, Text } from "@chakra-ui/react";

export const NotesInfo = () => {
  return (
    <Flex
      align="center"
    >
      <div>
        <h1 className="text-2xl font-bold">My Notes</h1>
        <Text fontSize="0.9rem" color={'gray'} >Showing 15 out of 1000 Notes</Text>
      </div>
      <Spacer />
      <Button
        colorScheme="teal"
        rightIcon={<AddIcon boxSize={3} />}
      >
        Create
      </Button>
    </Flex>
  );
};
