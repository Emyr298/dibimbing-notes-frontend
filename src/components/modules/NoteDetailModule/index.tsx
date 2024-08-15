'use client';

import { NoteDetailCard } from '@/components/elements/NoteDetailCard';
import { Note } from '@/types/notes';
import { fetchGraphQL } from '@/utils/graphql';
import { notifyError } from '@/utils/notification';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Flex, Button, useToast, Spinner, Text } from '@chakra-ui/react'
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export const NoteDetailModule = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toast = useToast();
  const router = useRouter();
  
  const getNote = useCallback(async () => {
    if (!noteId) return;
    
    const filteredId = noteId.replaceAll('"', '\\"');
    
    try {
      const res = await fetchGraphQL(`
        {
          note(id: "${filteredId}"){id, title, body, createdAt}
        }
      `);
      if (res.errors || !res.data || !res.data.note) {
        throw new Error();
      }
      setNote(res.data.note as Note);
    } catch {
      notifyError(toast, 'Error on fetching note');
    }
    setIsLoading(false);
  }, [toast, noteId]);
  
  useEffect(() => {
    getNote();
  }, [getNote]);
  
  return (
    <div>
      <Button
        variant="ghost"
        colorScheme="teal"
        leftIcon={<ChevronLeftIcon />}
        marginTop="1rem"
        marginLeft="1rem"
        marginBottom="0"
        onClick={() => {
          router.replace("/");
        }}
      >
        Back
      </Button>
      <Flex
        align="center"
        direction="column"
        paddingX="2rem"
        paddingY="1rem"
      >
        {
          isLoading &&
          <Spinner
            marginTop="200px"
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='teal'
            size='xl'
          />
        }
        {
          !isLoading && (
            !note ?
            <Text
              marginTop="200px"
            >
              Catatan tidak ditemukan
            </Text> :
            <NoteDetailCard
              note={note}
              refreshNotes={getNote}
            />
          )
        }
      </Flex>
    </div>
  );
};