import {
  Text,
  Button,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import InputError from "./common/InputError";
import { STATES } from "..";
import useRequest from "../hooks/useRequest";
import SpinnerButton from "./common/SpinnerButton";
import { getHeaders } from "../hooks/useData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleRefetch: () => void;
}

interface DriverUserData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
}

interface DriverData {
  user: DriverUserData;
  vehicle: number;
  cdl_number: string;
  cdl_state: string;
  notes: string;
}

const getErrorMsg = (data: any, index: string) => {
  let indexes = index.split(".");

  for (let i = 0; i < indexes.length; i++) {
    Object.keys(data).forEach((s) => {
      if (s === indexes[i]) data = data[s];
    });
  }
  // prepare message
  let msg = "";
  for (let i = 0; i < data.length; i++) msg += data[i] + " ";
  return msg;
};

const DriverFrom = ({ isOpen, onClose, handleRefetch }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { post, isLoading, errorMsg, resErros } = useRequest<DriverData>(
    "/drivers/",
    true,
    {
      headers: getHeaders(),
    }
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DriverData>();

  const onSubmit = async (data: FieldValues) => {
    post(data, () => {
      onClose();
      reset();
      handleRefetch();
    });
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="69rem">
        <ModalHeader>Create a Driver</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="driver-form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <HStack>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="First name"
                    id="user.first_name"
                    {...register("user.first_name", { required: true })}
                  />
                  {errors.user?.first_name?.type === "required" && (
                    <InputError message="This field is required" />
                  )}
                  <InputError
                    message={getErrorMsg(resErros, "user.first_name")}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Last name"
                    id="user.last_name"
                    {...register("user.last_name", { required: true })}
                  />
                  {errors.user?.last_name?.type === "required" && (
                    <InputError message="This field is required" />
                  )}
                  <InputError
                    message={getErrorMsg(resErros, "user.last_name")}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Username"
                    id="user.username"
                    {...register("user.username", { required: true })}
                  />
                  {errors.user?.username?.type === "required" && (
                    <InputError message="This field is required" />
                  )}
                  <InputError
                    message={getErrorMsg(resErros, "user.username")}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Email"
                    id="user.email"
                    {...register("user.email", { required: true })}
                  />
                  {errors.user?.email?.type === "required" && (
                    <InputError message="This field is required" />
                  )}
                  <InputError message={getErrorMsg(resErros, "user.email")} />
                </FormControl>
              </HStack>
              <HStack>
                <FormControl>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      id="user.password"
                      {...register("user.password", { required: true })}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.user?.password?.type === "required" && (
                    <InputError message="This field is required" />
                  )}
                  <InputError
                    message={getErrorMsg(resErros, "user.password")}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Phone number"
                    id="user.phone"
                    {...register("user.phone", { required: true })}
                  />
                  {errors.user?.phone?.type === "required" && (
                    <InputError message="This field is required" />
                  )}
                  <InputError message={getErrorMsg(resErros, "user.phone")} />
                </FormControl>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="CDL number"
                    id="cdl_number"
                    {...register("cdl_number", { required: true })}
                  />
                  {errors.cdl_number?.type === "required" && (
                    <InputError message="This field is required" />
                  )}
                  <InputError message={getErrorMsg(resErros, "cdl_number")} />
                </FormControl>
                <FormControl>
                  <Select
                    placeholder="CDL state"
                    id="cdl_state"
                    {...register("cdl_state")}
                  >
                    {STATES.map((state, index) => {
                      return (
                        <option key={index} value={state.value}>
                          {state.name}
                        </option>
                      );
                    })}
                  </Select>
                  <InputError message={getErrorMsg(resErros, "cdl_state")} />
                </FormControl>
              </HStack>
              <HStack>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Notes"
                    id="notes"
                    {...register("notes")}
                  />
                  {errors.notes?.type === "required" && (
                    <InputError message="This field is required" />
                  )}
                  <InputError message={getErrorMsg(resErros, "notes")} />
                </FormControl>
              </HStack>
              {errorMsg && (
                <Text fontSize={15} color="tomato">
                  {errorMsg}
                </Text>
              )}
            </Stack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          {isLoading ? (
            <SpinnerButton />
          ) : (
            <Button type="submit" form="driver-form" colorScheme="blue">
              Save
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DriverFrom;
