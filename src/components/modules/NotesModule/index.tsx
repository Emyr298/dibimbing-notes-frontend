import { NoteCard } from "@/components/elements/NoteCard";
import { NotesInfo } from "@/components/elements/NotesInfo";
import { Flex, Wrap } from "@chakra-ui/react";

export const NotesModule = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full p-[24px]">
        <Flex
          direction="column"
        >
          <NotesInfo />
          <Wrap
            justify="center"
            paddingTop="1rem"
            spacing={"1rem"}
          >
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
          </Wrap>
        </Flex>
      </div>
    </div>
  );
};
