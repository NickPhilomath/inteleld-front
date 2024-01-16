import { Button, Spinner } from "@chakra-ui/react";

interface Props {
  type?: "button" | "submit" | "reset" | undefined;
  text?: string;
  isSpinner?: boolean;
}

const FormButton = ({
  type = undefined,
  text = "",
  isSpinner = false,
}: Props) => {
  return (
    <Button
      borderRadius={1}
      type={type}
      variant="solid"
      colorScheme="blue"
      width="full"
    >
      {isSpinner ? <Spinner /> : text}
    </Button>
  );
};

export default FormButton;
