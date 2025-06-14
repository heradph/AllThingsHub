import {
  Container,
  Heading,
  Center,
  Spinner,
  SimpleGrid,
  Text,
  Box,
  Button,
  HStack,
  Flex,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductCard from "@/features/item/ProductCard";
import { useFetchItems } from "../features/item/useFetchItems";

export default function ItemsPage() {
  const { data, isLoading } = useFetchItems();
  const toast = useToast();

  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");
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
        setRole(payload.role || "");
      } catch (err) {
        localStorage.removeItem("token");
      }
    }

    setIsChecking(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleAddToCart = async (itemId) => {
    const token = localStorage.getItem("token");

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
        title: "Item added to cart successfully!",
        status: "success",
      });
    } catch (err) {
      toast({
        title: "Failed to add item to cart",
        status: "error",
      });
    }
  };

  return (
    <Container maxW="6xl" py={4}>
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

      <Heading mb={4}>Product List</Heading>

      {isChecking ? (
        <Center my={8}>
          <Spinner size="xl" />
        </Center>
      ) : (
        <HStack spacing={4} mb={8} flexWrap="wrap">
          {!displayName && (
            <>
              <Button
                colorScheme="green"
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => (window.location.href = "/register")}
              >
                Register
              </Button>
            </>
          )}
          {displayName && (
            <>
              <Text fontSize="lg" fontWeight="bold">
                Hi, {displayName} 👋
              </Text>
              <Button colorScheme="red" onClick={handleLogout}>
                Logout
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => (window.location.href = "/cart")}
              >
                Cart
              </Button>
              <Button
                colorScheme="green"
                onClick={() => (window.location.href = "/transactions")}
              >
                Riwayat Transaksi
              </Button>
              {role === "admin" && (
                <Button
                  colorScheme="purple"
                  onClick={() => (window.location.href = "/admin")}
                >
                  Admin Page
                </Button>
              )}
            </>
          )}
        </HStack>
      )}

      {isLoading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={8}>
          {data?.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              slug={item.slug}
              price={item.price}
              image={item.image}
              onAddToCart={handleAddToCart}
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
