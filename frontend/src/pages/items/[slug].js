import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import {
  Box,
  Heading,
  Image,
  Text,
  Spinner,
  Center,
  Container,
} from "@chakra-ui/react";

export default function ItemDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading, error } = useQuery({
    queryKey: ["item", slug],
    queryFn: async () => {
      const res = await axiosInstance.get(`/items/${slug}`);
      return res.data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
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
      <Heading mb={4}>{data?.name}</Heading>
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
            data?.image?.startsWith("/") ? data?.image : "/" + data?.image
          })`,
        }}
      />
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Harga: Rp{data?.price}
      </Text>
      <Text>{data?.description}</Text>
    </Container>
  );
}
