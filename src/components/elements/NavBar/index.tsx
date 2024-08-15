import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

export const NavBar = () => {
  return (
    <Box width="100%" background="teal.300" padding="0.9rem" boxShadow="md" position="fixed" zIndex="50">
      <Heading fontSize="1.3rem">
        <Link href="/">
          Notes<Text as="span" color="white">App</Text>
        </Link>
      </Heading>
    </Box>
  );
};
