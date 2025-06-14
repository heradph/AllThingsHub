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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { axiosAuth } from "@/lib/axiosAuth";

export default function LoginPage() {
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axiosAuth.post("/auth/login", values);
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
      <main>
        <Container my={50}>
          <Heading mb={4}>Login</Heading>
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
              </FormControl>
              <FormControl>
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
              <Button
                as="a"
                href="http://localhost:3000/auth/google"
                colorScheme="blue"
                width="full"
              >
                Login dengan Google
              </Button>
            </VStack>
          </form>
        </Container>
      </main>
    </>
  );
}
