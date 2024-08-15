export interface NotesInfoProps {
  notesCount: number | null
  refreshNotes?: () => void | Promise<void>
};
