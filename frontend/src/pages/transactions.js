import { useEffect, useState } from "react";
import {
  Container,
  Heading,
  Spinner,
  Center,
  Box,
  Text,
  VStack,
  Button,
  Image,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/transactionService/transactions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch transactions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <Container maxW="4xl" py={10}>
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

      <Heading mb={6}>Transaction History</Heading>

      {isLoading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : transactions.length === 0 ? (
        <Text>No transactions yet.</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {transactions.map((t) => (
            <Box
              key={t.id}
              borderWidth="1px"
              p={4}
              rounded="md"
              shadow="sm"
              bg="white"
            >
              <Text fontWeight="bold">Transaction #{t.id}</Text>
              <Text>Date: {new Date(t.date).toLocaleString()}</Text>
              <Text>Total: Rp {(t.total_price * 1000).toLocaleString()}</Text>
              <Link href={`/transactions/${t.id}`}>
                <Button mt={2} size="sm" colorScheme="green">
                  View Details
                </Button>
              </Link>
            </Box>
          ))}
        </VStack>
      )}
    </Container>
  );
}
