import Head from "next/head";
import {
  Container,
  Heading,
  Spinner,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Center,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  useToast,
  HStack,
  Flex,
  Image,
} from "@chakra-ui/react";
import { useFetchItems } from "@/features/item/useFetchItems";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState, useMemo, useCallback } from "react";

export default function ItemsPage() {
  const toast = useToast();
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return (window.location.href = "/");

    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("Invalid token format");

      const payload = JSON.parse(atob(parts[1]));
      if (!payload || payload.role !== "admin") throw new Error("Unauthorized");
    } catch {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  }, []);

  const { data: items, isLoading, refetch } = useFetchItems();

  const { mutate: saveItem, isLoading: saving } = useMutation({
    mutationFn: (body) => {
      if (editId) {
        return axiosInstance.put(`/itemService/items/${editId}`, body);
      }
      return axiosInstance.post("/itemService/items", body);
    },
    onSuccess: () => {
      refetch();
      toast({
        title: editId
          ? "Item berhasil diupdate!"
          : "Item berhasil ditambahkan!",
        status: "success",
      });
      resetForm();
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/itemService/items/${id}`),
    onSuccess: () => {
      refetch();
      toast({ title: "Item berhasil dihapus!", status: "success" });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveItem(form);
  };

  const handleEdit = useCallback((item) => {
    setEditId(item.id);
    setForm({
      name: item.name,
      slug: item.slug,
      price: item.price,
      description: item.description,
      image: item.image,
    });
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      slug: "",
      price: "",
      description: "",
      image: "",
    });
    setEditId(null);
  };

  const renderItems = useMemo(
    () =>
      items?.map((item) => (
        <Tr key={item.id}>
          <Td>{item.id}</Td>
          <Td>{item.name}</Td>
          <Td>{item.price}</Td>
          <Td>{item.description}</Td>
          <Td>{item.image}</Td>
          <Td>
            <HStack spacing={2}>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => handleEdit(item)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </Button>
            </HStack>
          </Td>
        </Tr>
      )),
    [items, handleEdit, deleteItem]
  );

  return (
    <>
      <Head>
        <title>Admin Items</title>
      </Head>
      <main>
        <Container maxW="container.lg" py={6}>
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

          <Heading mb={6}>Admin Items Page</Heading>
          <Button
          mb={10}
            colorScheme="blue"
            onClick={() => (window.location.href = "/")}
          >
            Kembali ke Catalog
          </Button>
          {isLoading ? (
            <Center>
              <Spinner size="xl" />
            </Center>
          ) : (
            <Table mb={8} variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Price</Th>
                  <Th>Description</Th>
                  <Th>Image</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>{renderItems}</Tbody>
            </Table>
          )}

          <form onSubmit={handleSubmit}>
            <VStack spacing={3} align="stretch">
              <FormControl>
                <FormLabel>Item Name</FormLabel>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Slug</FormLabel>
                <Input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme={editId ? "blue" : "green"}
                isLoading={saving}
                width="full"
              >
                {editId ? "Update Item" : "Add Item"}
              </Button>
              {editId && (
                <Button
                  colorScheme="gray"
                  variant="outline"
                  width="full"
                  onClick={resetForm}
                >
                  Cancel Edit
                </Button>
              )}
            </VStack>
          </form>
        </Container>
      </main>
    </>
  );
}
