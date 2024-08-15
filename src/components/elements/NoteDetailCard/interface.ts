import { Note } from "@/types/notes";

export interface NoteDetailCardProps {
  note: Note
  refreshNotes?: () => void | Promise<void>
};
