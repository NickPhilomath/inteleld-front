import { Text } from "@chakra-ui/react";

const InputError = ({ message }: { message: string }) => {
  return (
    <Text fontSize={15} color="tomato">
      {message}
    </Text>
  );
};

export default InputError;
