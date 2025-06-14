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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductCard from "@/features/item/ProductCard";
import { useFetchItems } from "../features/item/useFetchItems";

export default function ItemsPage() {
  const { data, isLoading } = useFetchItems();

  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");
  const [isChecking, setIsChecking] = useState(true); // Tambahan untuk proses loading token

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
        console.log("Token payload:", payload);

        setDisplayName(payload.displayName || payload.username || "");
        setRole(payload.role || "");
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
      }
    }

    setIsChecking(false); // Proses cek selesai
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Container maxW="6xl" py={10}>
      <Heading mb={4}>Product List</Heading>

      {isChecking ? ( // Menunggu pengecekan token selesai
        <Center my={8}>
          <Spinner size="xl" />
        </Center>
      ) : (
        <HStack spacing={4} mb={8}>
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
              name={item.name}
              slug={item.slug}
              price={item.price}
              image={item.image}
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
