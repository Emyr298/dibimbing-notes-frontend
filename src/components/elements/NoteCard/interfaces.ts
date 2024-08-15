export interface NoteCardProps {
  noteId: string
  title: string
  body: string
  createdAt: string
  refreshNotes?: () => void | Promise<void>
};
