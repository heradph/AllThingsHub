import {
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useToast,
  Flex,
  Image,
} from "@chakra-ui/react";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function RegisterPage() {
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Min 6 characters"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/authService/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Register failed");

        toast({
          title: "Register Successful",
          description: "Please login with your new account",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        window.location.href = "/login";
      } catch (err) {
        toast({
          title: "Error",
          description: err.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
  });

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <Flex minH="100vh" justify="center" align="center" bg="gray.50" px={4}>
        <Container maxW="md" bg="white" p={8} rounded="md" shadow="md">
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
            Register
          </Heading>

          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl
                isInvalid={formik.touched.username && formik.errors.username}
              >
                <FormLabel>Username</FormLabel>
                <Input
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <Text color="red.500" fontSize="sm">
                  {formik.touched.username && formik.errors.username}
                </Text>
              </FormControl>

              <FormControl
                isInvalid={formik.touched.password && formik.errors.password}
              >
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <Text color="red.500" fontSize="sm">
                  {formik.touched.password && formik.errors.password}
                </Text>
              </FormControl>

              <Button
                type="submit"
                colorScheme="green"
                width="full"
                isLoading={formik.isSubmitting}
              >
                Register
              </Button>
              <Text>Or</Text>
              <Button
                as="a"
                href="http://localhost:300/authService/auth/google"
                colorScheme="blue"
                width="full"
              >
                Masuk dengan Google
              </Button>

              <Button
                variant="link"
                colorScheme="blue"
                onClick={() => (window.location.href = "/login")}
              >
                Sudah ada akun? Login
              </Button>
            </VStack>
          </form>
        </Container>
      </Flex>
    </>
  );
}
