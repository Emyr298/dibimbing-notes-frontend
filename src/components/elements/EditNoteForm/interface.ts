import { Note } from "@/types/notes"

export interface EditNoteFormValues {
  title: string
  body: string
};

export interface EditNoteFormProps {
  note: Note
  refreshNotes?: () => void | Promise<void>
};
