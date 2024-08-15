import { Note } from "@/types/notes"

export interface NoteCardProps {
  note: Note
  refreshNotes?: () => void | Promise<void>
};
