import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

const ErrMsg = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontSize={15} color="tomato">
      {children}
    </Text>
  );
};

export default ErrMsg;
