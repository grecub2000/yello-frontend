import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";

export const NotFoundPage = () => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <Flex
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction="column"
        minW="400px"
        padding={6}
        backgroundColor="black"
        border="2px solid black"
        borderRadius="lg"
      >
        <Text fontWeight="bold" fontSize="28" color="white">
          Error 404: Page not found
        </Text>

        <Text fontSize="18px" color="white">
          The page you are currently looking for does not exist. Click{" "}
          <Button
            variant="link"
            onClick={goBack}
            color="#76ddcf"
            fontSize="18px"
          >
            here
          </Button>{" "}
          to go back to the previous page.
        </Text>
      </Flex>
    </Flex>
  );
};