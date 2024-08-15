'use client';

import { ChevronLeftIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Card, CardHeader, CardBody, CardFooter, Heading, Stack, StackDivider, Box, Text, Flex, Spacer, Button, IconButton, Divider } from '@chakra-ui/react'

export const NoteDetailModule = () => {
  return (
    <div>
      <Button
        variant="ghost"
        colorScheme="teal"
        leftIcon={<ChevronLeftIcon />}
        marginTop="1rem"
        marginLeft="1rem"
        marginBottom="0"
      >
        Back
      </Button>
      <Flex
        align="center"
        direction="column"
        paddingX="2rem"
        paddingY="1rem"
      >
        <Card
          minWidth={[0, 400, 400, 800]}
        >
          <CardHeader>
          <Flex
            align="center"
          >
            <div>
              <Heading size='md'>Libooran ke Sameria</Heading>
              <Text fontSize="0.9rem" color={'gray'}>createdAt: ASDJASOIDJASODIJ</Text>
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
            <Text paddingTop="1rem">ASDJIOASDIJOASJIOASDJIOJDASOI</Text>
          </CardBody>
        </Card>
      </Flex>
    </div>
  );
};