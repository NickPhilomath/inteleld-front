import {
  Button,
  FormControl,
  FormLabel,
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

interface Props {
  isOpen: boolean;
  onClose: () => void;
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

const DriverFrom = ({ isOpen, onClose }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DriverData>();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="69rem">
        <ModalHeader>Create a Driver</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <HStack>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="First name"
                    id="user.first_name"
                    {...register("user.first_name", { required: true })}
                  />
                  {errors.cdl_number?.type === "required" && (
                    <InputError message="This field is required" />
                  )}
                </FormControl>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Last name"
                    id="user.last_name"
                    {...register("user.last_name", { required: true })}
                  />
                  {errors.cdl_number?.type === "required" && (
                    <InputError message="This field is required" />
                  )}
                </FormControl>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Username"
                    id="user.username"
                    {...register("user.username", { required: true })}
                  />
                  {errors.cdl_number?.type === "required" && (
                    <InputError message="This field is required" />
                  )}
                </FormControl>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Email"
                    id="user.email"
                    {...register("user.email", { required: true })}
                  />
                  {errors.cdl_number?.type === "required" && (
                    <InputError message="This field is required" />
                  )}
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
                  {errors.cdl_number?.type === "required" && (
                    <InputError message="This field is required" />
                  )}
                </FormControl>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Phone number"
                    id="user.phone"
                    {...register("user.phone", { required: true })}
                  />
                  {errors.cdl_number?.type === "required" && (
                    <InputError message="This field is required" />
                  )}
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
                </FormControl>
                <FormControl>
                  <Select placeholder="CDL state">
                    <option>United Arab Emirates</option>
                    <option>Nigeria</option>
                  </Select>
                </FormControl>
              </HStack>
              {/* {error && (
                <Text fontSize={15} color="tomato">
                  {error}
                </Text>
              )}
              {isLoading ? (
                <FormButton isSpinner={true} />
              ) : (
                <FormButton type="submit" text="Login" />
              )} */}
            </Stack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DriverFrom;
