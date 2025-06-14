import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import {
  Box,
  Heading,
  Text,
  Spinner,
  Center,
  Container,
  Button,
  useToast,
  VStack,
  chakra,
  Flex,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function ItemDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const toast = useToast();

  const [displayName, setDisplayName] = useState("");
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const token = tokenFromUrl || localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setDisplayName(payload.displayName || payload.username || "");
      } catch (err) {
        localStorage.removeItem("token");
      }
    }

    setIsChecking(false);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["item", slug],
    queryFn: async () => {
      const res = await axiosInstance.get(`/itemService/items/${slug}`);
      return res.data;
    },
    enabled: !!slug,
  });

  const handleAddToCart = async (itemId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast({
        title: "Anda harus login terlebih dahulu",
        status: "warning",
      });
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cartService/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ itemId, quantity: 1 }),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to add to cart");

      toast({
        title: "Item berhasil ditambahkan ke keranjang",
        status: "success",
      });
    } catch (err) {
      toast({
        title: err.message || "Gagal menambahkan ke keranjang",
        status: "error",
      });
    }
  };

  if (isLoading || isChecking) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">Gagal memuat item.</Text>
      </Center>
    );
  }

  return (
    <Container py={8}>
      <Flex align="center" mb={6} mx={-150} gap={3}>
        <Image
          src="/logo.png"
          alt="All Things Hub Logo"
          boxSize="60px"
          objectFit="contain"
        />
        <Heading size="xl" color="#4a474d ">
          All Things Hub
        </Heading>
      </Flex>

      <Flex justify="flex-end" mb={6}>
        <Button
          as="a"
          href="/"
          rightIcon={<ArrowForwardIcon />}
          colorScheme="gray"
          variant="outline"
          size="sm"
        >
          Kembali ke Katalog
        </Button>
      </Flex>

      <VStack spacing={6} align="start">
        <Heading>{data?.name}</Heading>
        <Box
          h={64}
          w="full"
          rounded="lg"
          shadow="md"
          bgSize="cover"
          bgPos="center"
          style={{
            backgroundImage: `url(${
              data?.image?.startsWith("/") ? data?.image : "/" + data?.image
            })`,
          }}
        />
        <Text fontSize="2xl" fontWeight="bold">
          Harga: Rp{data?.price}
        </Text>
        <Text>{data?.description}</Text>
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
          onClick={() => handleAddToCart(data.id)}
        >
          Add to Cart
        </chakra.button>
      </VStack>
    </Container>
  );
}
