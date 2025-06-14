import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Heading,
  Spinner,
  Center,
  Box,
  Text,
  SimpleGrid,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function TransactionDetailPage() {
  const { query } = useRouter();
  const [transaction, setTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!query.id) return;

    const fetchDetail = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/transactionService/transactions/${query.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setTransaction(data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch transaction detail");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [query.id]);

  return (
    <Container maxW="5xl" py={10}>
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

      {isLoading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : transaction ? (
        <>
          <Heading mb={4}>Transaction #{transaction.transaction.id}</Heading>
          <Text>
            Date: {new Date(transaction.transaction.date).toLocaleString()}
          </Text>
          <Text mb={4} fontWeight="bold">
            Total: Rp{" "}
            {(transaction.transaction.total_price * 1000).toLocaleString()}
          </Text>

          <SimpleGrid columns={[1, 2, 3]} spacing={6}>
            {transaction.items.map((item, idx) => (
              <Box
                key={idx}
                borderWidth="1px"
                rounded="md"
                overflow="hidden"
                shadow="md"
              >
                <Box
                  h={64}
                  w="full"
                  rounded="lg"
                  shadow="md"
                  bgSize="cover"
                  bgPos="center"
                  cursor="pointer"
                  style={{
                    backgroundImage: `url(${
                      item?.image?.startsWith("/")
                        ? item?.image
                        : "/" + item?.image
                    })`,
                  }}
                />

                <Box p={4}>
                  <Text fontWeight="bold">{item.name}</Text>
                  <Text>Price: Rp {item.price.toLocaleString()}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </>
      ) : (
        <Text>Transaction not found.</Text>
      )}
    </Container>
  );
}
