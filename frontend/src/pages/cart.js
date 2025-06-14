import {
  Container,
  Heading,
  Spinner,
  Center,
  SimpleGrid,
  Box,
  Image,
  Text,
  Flex,
  Button,
  IconButton,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import {
  MinusIcon,
  AddIcon,
  DeleteIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cartService/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch cart");
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cartService/cart/${itemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );
      fetchCart(); // refresh cart setelah update
    } catch (err) {
      console.error(err);
      alert("Failed to update quantity");
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cartService/cart/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Item Dihapus!",
        status: "success",
      });

      fetchCart(); // refresh cart setelah delete
    } catch (err) {
      console.error(err);
      alert("Failed to delete item");
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/checkoutService/checkout`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to checkout");

      toast({
        title: "Checkout berhasil!",
        status: "success",
      });
      window.location.href = "/transactions";
    } catch (err) {
      console.error(err);
      toast({
        title: "Checkout gagal",
        status: "error",
      });
    }
  };

  return (
    <Container maxW="6xl" py={10}>
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

      <Heading mb={6}>Your Cart</Heading>
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

      {isLoading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : cartItems.length === 0 ? (
        <Text>No items in your cart.</Text>
      ) : (
        <>
          <SimpleGrid columns={[1, 2, 3]} spacing={6} mb={8}>
            {cartItems.map((item) => (
              <Box
                key={item.id}
                borderWidth="1px"
                rounded="md"
                overflow="hidden"
                bg="white"
                shadow="md"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  h={52}
                  w="full"
                  objectFit="cover"
                />
                <Box p={4}>
                  <Heading size="md" mb={2}>
                    {item.name}
                  </Heading>
                  <Text>Price: Rp {item.price.toLocaleString()}</Text>

                  <HStack mt={3}>
                    <IconButton
                      icon={<MinusIcon />}
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    />
                    <Text>{item.quantity}</Text>
                    <IconButton
                      icon={<AddIcon />}
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    />
                  </HStack>

                  {/* ✅ Delete Button */}
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
                    mt={3}
                    onClick={() => deleteItem(item.id)}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            ))}
          </SimpleGrid>

          {/* ✅ Total & Checkout */}
          <Flex
            justify="space-between"
            align="center"
            p={4}
            borderWidth="1px"
            rounded="md"
            bg="gray.50"
            shadow="md"
          >
            <Text fontSize="xl" fontWeight="bold">
              Total: Rp {(totalPrice * 1000).toLocaleString()}
            </Text>
            <Button colorScheme="green" size="lg" onClick={handleCheckout}>
              Checkout
            </Button>
          </Flex>
        </>
      )}
    </Container>
  );
}
