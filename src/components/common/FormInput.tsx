import { FormControl, Input } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
import ErrMsg from "./ErrMsg";

interface Props {
  id: string;
  type: "text" | "password" | "number";
  placeholder: string;
  conf: UseFormRegisterReturn;
  errMsg: string | undefined;
  resErrMsg: string;
}

const FormInput = ({
  id,
  type,
  placeholder,
  conf,
  errMsg,
  resErrMsg,
}: Props) => {
  return (
    <FormControl>
      <Input type={type} placeholder={placeholder} id={id} {...conf} />
      <ErrMsg>{errMsg}</ErrMsg>
      <ErrMsg>{resErrMsg}</ErrMsg>
    </FormControl>
  );
};

export default FormInput;
