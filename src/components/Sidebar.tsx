import { Link } from "react-router-dom";
import { HStack, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { TbMap, TbStack2, TbUsers } from "react-icons/tb";

const Sidebar = () => {
  return (
    <>
      <Heading size="md" marginTop={9} marginBottom={3}>
        Intel ELD
      </Heading>
      <List>
        <ListItem>
          <Link to="/map">
            <HStack>
              <TbMap />
              <Text>Map</Text>
            </HStack>
          </Link>
          <Link to="/logs">
            <HStack>
              <TbStack2 />
              <Text>Logs</Text>
            </HStack>
          </Link>
          <Link to="/drivers">
            <HStack>
              <TbUsers />
              <Text>Drivers</Text>
            </HStack>
          </Link>
          <Link to="/trucks">
            <HStack>
              <TbUsers />
              <Text>Trucks</Text>
            </HStack>
          </Link>
          <Link to="/map">
            <HStack>
              <TbMap />
              <Text>Map</Text>
            </HStack>
          </Link>
        </ListItem>
      </List>
    </>
  );
};

export default Sidebar;
