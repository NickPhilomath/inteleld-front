import { FormControl, Input } from "@chakra-ui/react";
import InputError from "./InputError";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  id: string;
  type: "text" | "password" | "number";
  placeholder: string;
  //   register: (i: any, d: any) => any;
  conf: UseFormRegisterReturn;
  errors?: any;
}

const FormInput = ({ id, type, placeholder, conf, errors = {} }: Props) => {
  return (
    <FormControl>
      <Input type={type} placeholder={placeholder} id={id} {...conf} />
      {errors.user?.first_name?.type === "required" && (
        <InputError message="This field is required" />
      )}
    </FormControl>
  );
};

export default FormInput;
