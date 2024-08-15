export interface CreateNoteFormValues {
  title: string
  body: string
};

export interface CreateNoteFormProps {
  refreshNotes?: () => void | Promise<void>
};
