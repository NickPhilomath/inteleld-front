import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { useState } from "react";
import ErrMsg from "./ErrMsg";

interface Props {
  id: string;
  placeholder: string;
  //   register: (i: any, d: any) => any;
  conf: UseFormRegisterReturn;
  errMsg: string | undefined;
  resErrMsg: string;
}

const FormInputPasswd = ({
  id,
  placeholder,
  conf,
  errMsg,
  resErrMsg,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  return (
    <FormControl>
      <InputGroup>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          id={id}
          {...conf}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleShowClick}>
            {showPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <ErrMsg>{errMsg}</ErrMsg>
      <ErrMsg>{resErrMsg}</ErrMsg>
    </FormControl>
  );
};

export default FormInputPasswd;
