import {
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
} from "@chakra-ui/react";
import { Driver } from "..";
import useData from "../hooks/useData";
import Spinner from "./common/Spinner";

const Drivers = () => {
  const { data, isLoading, error } = useData<Driver>("/drivers", true);

  return (
    <>
      {isLoading && <Spinner />}
      {error && (
        <Text fontSize={30} color="tomato">
          {error}
        </Text>
      )}

      {true && (
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
              {data.map((driver, index) => {
                return (
                  <Tr key={driver.id}>
                    <Td isNumeric>{index + 1}</Td>
                    <Td>{driver.user.first_name}</Td>
                    <Td>{driver.user.last_name}</Td>
                    <Td>{driver.user.username}</Td>
                    <Td>{driver.co_driver}</Td>
                    <Td>{driver.truck}</Td>
                    <Td>{driver.app_version}</Td>
                    <Td>{driver.user.date_joined}</Td>
                    <Td>edit</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Drivers;