// /pages/index.js
import Head from "next/head";
import {
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { axiosAuth } from "@/lib/axiosAuth";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function LoginPage() {
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axiosAuth.post("/authService/auth/login", values);
        const data = res.data;

        localStorage.setItem("token", data.token);

        toast({
          title: "Login Berhasil",
          status: "success",
        });

        window.location.href = "/";
      } catch (err) {
        toast({
          title: "Login Gagal",
          description: err.response?.data?.message || err.message,
          status: "error",
        });
      }
    },
  });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Flex minH="100vh" justify="center" align="center" bg="gray.50" p={4}>
        <Container maxW="md" p={8} borderRadius="lg" bg="white" boxShadow="md">
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

          <Heading mb={6} textAlign="center">
            Login
          </Heading>

          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </FormControl>
              <Button type="submit" colorScheme="green" width="full">
                Login
              </Button>
              <Text>Or</Text>
              <Button
                as="a"
                href="http://localhost:300/authService/auth/google"
                colorScheme="blue"
                width="full"
              >
                Login dengan Google
              </Button>
              <Button
                variant="link"
                colorScheme="blue"
                onClick={() => (window.location.href = "/register")}
              >
                Belum punya akun? Register
              </Button>
            </VStack>
          </form>
        </Container>
      </Flex>
    </>
  );
}
