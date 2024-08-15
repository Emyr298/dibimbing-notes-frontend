export interface DeleteNoteConfirmProps {
  noteId: string
  boxSize?: number
  stopPropagation?: boolean
  afterDelete?: () => void | Promise<void>
};
