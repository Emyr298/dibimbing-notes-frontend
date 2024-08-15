'use client';

import { DeleteIcon } from "@chakra-ui/icons";
import { Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Text } from "@chakra-ui/react";

export const NoteCard = () => {
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
        console.log("LOL")
      }}
    >
      <CardHeader paddingY={'1rem'}>
        <Heading fontSize={'x-large'}>Experiences at Vacation</Heading>
        <Text color={'GrayText'} fontSize={'medium'}>Created At: 12 January, 2024</Text>
      </CardHeader>
      <CardBody paddingTop={0}>
        There was a time when I was a kid. There was a time when I was a kid. There was a time when I was a kid.
      </CardBody>
      <CardFooter paddingTop={0}>
        <Flex
          width="100%"
          justify="end"
        >
          <IconButton variant="ghost" colorScheme="red" aria-label="Delete Note" icon={<DeleteIcon />} />
        </Flex>
      </CardFooter>
    </Card>
  );
};