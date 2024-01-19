import {
  chakra,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  HStack,
  Heading,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";
import { getDateString } from "../util";
import Spinner from "./common/Spinner";
import DriverFrom from "./DriverFrom";
import useDrivers from "../hooks/useDrivers";
import Msg from "./common/Msg";

const CFaPen = chakra(FaPen);
const CFaTrash = chakra(FaTrash);

const Drivers = () => {
  const navigate = useNavigate();
  const [isFormOpen, setFormOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: drivers, error, isLoading, refetch } = useDrivers();
  const [initDriverId, setInitDriverId] = useState<number | undefined>();

  useEffect(() => {
    // this shit it causing to force user to login twice
    if (error?.response?.status === 401) {
      navigate("/login");
      // so i fixed it by changing status code, it doesnt execute here again
      error.response.status = 0;
    }
  }, [error]);

  const handleRefetch = () => {
    setFormOpen(false);
    refetch();
  };
  const handleEditDriver = (id: number) => {
    setInitDriverId(id);
    onOpen();
  };
  const handleCloseForm = () => {
    setFormOpen(false);
  };

  return (
    <>
      <HStack justifyContent="space-between" padding={5} marginBottom={6}>
        <Heading size="lg">Drivers</Heading>
        <Button
          size="md"
          colorScheme="blue"
          onClick={() => {
            setFormOpen(true);
          }}
        >
          Add driver
        </Button>
      </HStack>
      {isFormOpen && (
        <DriverFrom
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          handleRefetch={handleRefetch}
          initialDriverId={initDriverId}
        />
      )}

      {isLoading && <Spinner />}
      {error && (
        <Text fontSize={30} color="tomato">
          {error.message}
        </Text>
      )}

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th isNumeric>#</Th>
              <Th>first Name</Th>
              <Th>last Name</Th>
              <Th>username</Th>
              <Th>co-driver</Th>
              <Th>vehicle</Th>
              <Th>app version</Th>
              <Th>date joined</Th>
              <Th>actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {drivers?.map((driver, index) => {
              return (
                <Tr key={driver.id}>
                  <Td isNumeric>{index + 1}</Td>
                  <Td>{driver.user.first_name}</Td>
                  <Td>{driver.user.last_name}</Td>
                  <Td>{driver.user.username}</Td>
                  <Td>{driver.co_driver}</Td>
                  <Td>
                    {driver.truck ? (
                      driver.truck
                    ) : (
                      <Msg level="error" bold>
                        not assigned
                      </Msg>
                    )}
                  </Td>
                  <Td>
                    {driver.app_version ? (
                      driver.app_version
                    ) : (
                      <Msg level="warn" bold>
                        no data
                      </Msg>
                    )}
                  </Td>
                  <Td>{getDateString(driver.user.date_joined)}</Td>
                  <Td>
                    <HStack fontSize={20}>
                      <CFaPen
                        color="orange.400"
                        _hover={{ cursor: "pointer" }}
                        onClick={() => {
                          handleEditDriver(driver.id);
                        }}
                      />
                      <CFaTrash
                        ml={3}
                        color="tomato"
                        _hover={{ cursor: "pointer" }}
                      />
                    </HStack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Drivers;
