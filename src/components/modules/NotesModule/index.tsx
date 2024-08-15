'use client';

import { NoteCard } from "@/components/elements/NoteCard";
import { NotesInfo } from "@/components/elements/NotesInfo";
import { Note } from "@/types/notes";
import { fetchGraphQL } from "@/utils/graphql";
import { notifyError } from "@/utils/notification";
import { Flex, Spinner, Text, useToast, Wrap } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

export const NotesModule = () => {
  const [notes, setNotes] = useState<Note[] | null>(null);
  const toast = useToast();
  
  const getNotes = useCallback(async () => {
    try {
      const res = await fetchGraphQL(`
        {
          notes{id, title, body, createdAt}
        }
      `);
      if (res.errors || !res.data || !res.data.notes) {
        throw new Error();
      }
      setNotes(res.data.notes as Note[]);
    } catch {
      notifyError(toast, 'Error on fetching notes');
    }
  }, [toast]);
  
  useEffect(() => {
    getNotes();
  }, [getNotes]);
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full p-[24px]">
        <Flex
          direction="column"
        >
          <NotesInfo
            notesCount={notes && notes.length > 0 ? notes.length : null}
          />
          <Wrap
            justify="center"
            paddingTop="1rem"
            spacing={"1rem"}
          >
            {
              !notes &&
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
              notes && notes.length === 0 &&
              <Text
                marginTop="200px"
              >
                Tidak ada catatan
              </Text>
            }
            {
              notes && notes.length > 0 &&
              (notes.map((note) => (
                <NoteCard
                  key={note.id}
                  noteId={note.id}
                  title={note.title}
                  body={note.body}
                  createdAt={note.createdAt}
                  refreshNotes={getNotes}
                />
              )))
            }
          </Wrap>
        </Flex>
      </div>
    </div>
  );
};
