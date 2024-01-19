import {
  Text,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { STATES } from "..";
import useRequest from "../hooks/useRequest";
import { getHeaders } from "../hooks/useData";
import { getErrorMsg } from "../util";
import SpinnerButton from "./common/SpinnerButton";
import FormInput from "./common/FormInput";
import FormInputPasswd from "./common/FormInputPasswd";
import FormSelect from "./common/FormSelect";

const schema = z.object({
  // truck: z.number({ invalid_type_error: "Truck is required" }).positive(),
  cdl_number: z.string().min(5),
  cdl_state: z.string(),
  notes: z.string().max(255),
  user: z.object({
    first_name: z.string().min(3),
    last_name: z.string().min(3),
    username: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(1),
    phone: z.string().max(13),
  }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleRefetch: () => void;
}

const DriverFrom = ({ isOpen, onClose, handleRefetch }: Props) => {
  const { post, isLoading, errorMsg, resErros } = useRequest<FormData>(
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
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FieldValues) => {
    post(data, () => {
      onClose();
      reset();
      handleRefetch();
    });
  };

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
                <FormInput
                  type="text"
                  placeholder="First name"
                  id="user.first_name"
                  conf={register("user.first_name")}
                  errMsg={errors.user?.first_name?.message}
                  resErrMsg={getErrorMsg(resErros, "user.first_name")}
                />
                <FormInput
                  type="text"
                  placeholder="Last name"
                  id="user.last_name"
                  conf={register("user.last_name")}
                  errMsg={errors.user?.last_name?.message}
                  resErrMsg={getErrorMsg(resErros, "user.last_name")}
                />
                <FormInput
                  type="text"
                  placeholder="Username"
                  id="user.username"
                  conf={register("user.username")}
                  errMsg={errors.user?.username?.message}
                  resErrMsg={getErrorMsg(resErros, "user.username")}
                />
                <FormInput
                  type="text"
                  placeholder="Email"
                  id="user.email"
                  conf={register("user.email")}
                  errMsg={errors.user?.email?.message}
                  resErrMsg={getErrorMsg(resErros, "user.email")}
                />
              </HStack>
              <HStack>
                <FormInputPasswd
                  placeholder="Password"
                  id="user.password"
                  conf={register("user.password")}
                  errMsg={errors.user?.password?.message}
                  resErrMsg={getErrorMsg(resErros, "user.password")}
                />
                <FormInput
                  type="text"
                  placeholder="Phone number"
                  id="user.phone"
                  conf={register("user.phone")}
                  errMsg={errors.user?.phone?.message}
                  resErrMsg={getErrorMsg(resErros, "user.phone")}
                />
                <FormInput
                  type="text"
                  placeholder="CDL number"
                  id="cdl_number"
                  conf={register("cdl_number")}
                  errMsg={errors.cdl_number?.message}
                  resErrMsg={getErrorMsg(resErros, "cdl_number")}
                />
                <FormSelect
                  placeholder="CDL state"
                  id="cdl_state"
                  conf={register("cdl_state")}
                  errMsg={errors.cdl_state?.message}
                  resErrMsg={getErrorMsg(resErros, "cdl_state")}
                >
                  {STATES.map((state, index) => {
                    return (
                      <option key={index} value={state.value}>
                        {state.name}
                      </option>
                    );
                  })}
                </FormSelect>
              </HStack>
              <HStack>
                <FormInput
                  type="text"
                  placeholder="Notes"
                  id="notes"
                  conf={register("notes")}
                  errMsg={errors.notes?.message}
                  resErrMsg={getErrorMsg(resErros, "notes")}
                />
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
