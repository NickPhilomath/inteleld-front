import {
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import useData from "../hooks/useData";
import { Truck } from "..";
import { mps2mph } from "../util";

const DashBoard = () => {
  const { data, isLoading, error } = useData<Truck>("/trucks");

  const columnHelper = createColumnHelper<Truck>();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Name",
    }),
    columnHelper.accessor("location.reverseGeo.formattedLocation", {
      cell: (info) => info.getValue(),
      header: "Location",
    }),
    columnHelper.accessor("location.speed", {
      cell: (info) => info.getValue(),
      header: "Speed (mph)",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("weather.status", {
      cell: (info) => info.getValue(),
      header: "Weather",
    }),
    columnHelper.accessor("weather.wind.speed", {
      cell: (info) => info.getValue(),
      header: "Wind (mph)",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("weather.temp", {
      cell: (info) => info.getValue(),
      header: "Temp (°C)",
      meta: {
        isNumeric: true,
      },
    }),
  ];

  // const getWindTextColor = (speed: number) => {
  //   /*
  //   >-15 - green
  //   15-25 - yellow
  //   25-35 - orange
  //   35-> - red
  //   */
  //   return speed < 15
  //     ? "m-good"
  //     : speed < 25
  //     ? "m-warn"
  //     : speed < 35
  //     ? "m-risky"
  //     : "m-danger";
  // };

  return (
    <>
      {isLoading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
      {error && (
        <Text fontSize={30} color="tomato">
          {error}
        </Text>
      )}

      <DataTable data={data} columns={columns} />

      {!true && (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th isNumeric>#N</Th>
                <Th>Name</Th>
                <Th>Location</Th>
                <Th isNumeric>Speed (mph)</Th>
                <Th>Weather</Th>
                <Th isNumeric>Wind (mph)</Th>
                <Th isNumeric>Temp (°C)</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((truck, index) => {
                return (
                  <Tr>
                    <Td isNumeric>{index + 1}</Td>
                    <Td>{truck.name}</Td>
                    <Td>{truck.location.reverseGeo.formattedLocation}</Td>
                    <Td isNumeric>{truck.location.speed}</Td>
                    <Td>{truck.weather.status}</Td>
                    <Td isNumeric>{mps2mph(truck.weather.wind.speed)}</Td>
                    <Td isNumeric>{truck.weather.temp}</Td>
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

export default DashBoard;
