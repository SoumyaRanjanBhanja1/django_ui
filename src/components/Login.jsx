import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FloatingLabelInput from "./FloatingLabelInput";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const API='https://django-server-7.onrender.com';

  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${API}/api/login/`, formData);
    console.log("Login success", res.data);
    navigate("/");
  } catch (err) {
    console.log("Login Error:", err.response?.data || err.message);
    toast({
      title: "Login Failed",
      description: err.response?.data?.email?.[0] || "Something went wrong",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};


  return (
    <Box maxW="md" mx="auto" mt="10" p="6" boxShadow="md" borderRadius="md">
      <Heading mb="6" textAlign="center">
        Login
      </Heading>
      <VStack spacing="4">
        <FloatingLabelInput
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <FloatingLabelInput
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button colorScheme="blue" width="full" onClick={handleSubmit}>
          Login
        </Button>
      </VStack>
    </Box>
  );
}
