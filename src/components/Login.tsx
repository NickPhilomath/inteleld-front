import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Text,
  Flex,
  Heading,
  Input,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Button,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import useRequest from "../hooks/useRequest";
import { Auth } from "..";
import { JWTDecoder } from "../util";
import FormButton from "./common/FormButton";
import InputError from "./common/InputError";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

interface LoginData {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { post, isLoading, error } = useRequest<Auth>("/token/");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>();

  const handleShowClick = () => setShowPassword(!showPassword);

  const onSubmit = async (data: FieldValues) => {
    console.log("1", data);
    post(data, (data: Auth) => {
      window.localStorage.setItem(
        "auth",
        JSON.stringify({
          user_id: JWTDecoder(data.access).user_id,
          accessToken: data?.access,
          refreshToken: data?.refresh,
        })
      );
      navigate("/drivers");
    });
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="blue.500" />
        <Heading color="blue.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} p="1rem" boxShadow="lg">
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="username"
                    id="username"
                    {...register("username", { required: true })}
                  />
                </InputGroup>
                {errors.username?.type === "required" && (
                  <InputError message="The username field is required" />
                )}
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    id="password"
                    {...register("password", { required: true })}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password?.type === "required" && (
                  <InputError message="The password field is required" />
                )}
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              {error && (
                <Text fontSize={15} color="tomato">
                  {error}
                </Text>
              )}
              {isLoading ? (
                <FormButton isSpinner={true} />
              ) : (
                <FormButton type="submit" text="Login" />
              )}
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="blue.500" href="#">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;
