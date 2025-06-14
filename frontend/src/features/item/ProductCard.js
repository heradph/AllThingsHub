import { Box, Flex, chakra } from "@chakra-ui/react";
import Link from "next/link";

export default function ProductCard({ name, price, image, slug }) {
  return (
    <Flex direction="column" alignItems="center" w="sm" mx="auto">
      <Box
        h={64}
        w="full"
        rounded="lg"
        shadow="md"
        bgSize="cover"
        bgPos="center"
        cursor="pointer"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      <Box
        w={{ base: 56, md: 64 }}
        bg="white"
        _dark={{ bg: "gray.800" }}
        mt={-10}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
      >
        <Link href={`/items/${slug}`}>
          <chakra.h3
            py={2}
            textAlign="center"
            fontWeight="bold"
            textTransform="uppercase"
            color="gray.800"
            _dark={{ color: "white" }}
            letterSpacing={1}
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
          >
            {name}
          </chakra.h3>
        </Link>

        <Flex
          alignItems="center"
          justifyContent="space-between"
          py={2}
          px={3}
          bg="gray.200"
          _dark={{ bg: "gray.700" }}
        >
          <chakra.span
            fontWeight="bold"
            color="gray.800"
            _dark={{ color: "gray.200" }}
          >
            {price}
          </chakra.span>
          <chakra.button
            bg="gray.800"
            fontSize="xs"
            fontWeight="bold"
            color="white"
            px={3}
            py={1}
            rounded="lg"
            textTransform="uppercase"
            _hover={{ bg: "gray.700", _dark: { bg: "gray.600" } }}
            _focus={{ outline: "none" }}
          >
            Add to cart
          </chakra.button>
        </Flex>
      </Box>
    </Flex>
  );
}
