import {
  Box,
  Flex,
  Text,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  Collapse,
  Avatar,
  Icon,
} from "@chakra-ui/react";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
import { FaRss, FaClipboardCheck, FaBell, AiFillGift } from "react-icons/fa";
import { HiCollection, HiCode } from "react-icons/hi";
import { BsGearFill } from "react-icons/bs";
import { FiMenu, FiSearch } from "react-icons/fi";
import Logo from "./Logo"; // buat komponen Logo atau sesuaikan
import ShinyText from "../ShinyText/ShinyText";

const SidebarLayout = ({ children }) => {
  const sidebar = useDisclosure();
  const integrations = useDisclosure();

  const NavItem = ({ icon, children, ...rest }) => (
    <Flex
      align="center"
      px="4"
      pl="4"
      py="3"
      cursor="pointer"
      _hover={{
        bg: "gray.100",
        _dark: { bg: "gray.900" },
        color: "gray.900",
      }}
      role="group"
      transition=".15s ease"
      {...rest}
    >
      {icon && (
        <Icon
          mx="2"
          boxSize="4"
          _groupHover={{ color: "gray.600" }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{ bg: "gray.800" }}
      borderRightWidth="1px"
      w="60"  
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Logo />
        <Text fontSize="2xl" ml="2" fontWeight="bold">
          All Things Hub
        </Text>
      </Flex>
      <Flex direction="column" as="nav" fontSize="sm" color="gray.600">
        <NavItem icon={MdHome}>Home</NavItem>
        <NavItem icon={FaRss}>Articles</NavItem>
        <NavItem icon={HiCollection}>Collections</NavItem>
        <NavItem icon={FaClipboardCheck}>Checklists</NavItem>
        <NavItem icon={HiCode} onClick={integrations.onToggle}>
          Integrations
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={integrations.isOpen && "rotate(90deg)"}
          />
        </NavItem>
        <Collapse in={integrations.isOpen}>
          <NavItem pl="12" py="2">
            Shopify
          </NavItem>
          <NavItem pl="12" py="2">
            Slack
          </NavItem>
          <NavItem pl="12" py="2">
            Zapier
          </NavItem>
        </Collapse>
        <NavItem icon={AiFillGift}>Changelog</NavItem>
        <NavItem icon={BsGearFill}>Settings</NavItem>
      </Flex>
    </Box>
  );

  return (
    <Box as="section" minH="100vh" bg="gray.50" _dark={{ bg: "gray.700" }}>
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="white"
          _dark={{ bg: "gray.800" }}
          borderBottomWidth="1px"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <InputGroup w="96" display={{ base: "none", md: "flex" }}>
            <InputLeftElement color="gray.500">
              <FiSearch />
            </InputLeftElement>
            <Input placeholder="Search for articles..." />
          </InputGroup>
          <Flex align="center">
            <Icon color="gray.500" as={FaBell} cursor="pointer" />
            <Avatar
              ml="4"
              size="sm"
              name="anubra266"
              src="https://avatars.githubusercontent.com/u/30869823?v=4"
              cursor="pointer"
            />
          </Flex>
        </Flex>

        <Box as="main" p="4">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarLayout;
