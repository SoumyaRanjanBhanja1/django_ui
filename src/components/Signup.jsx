// src/components/Register.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FloatingLabelInput from "./FloatingLabelInput";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:8000/api/register/", formData);
    toast({
      title: "Registered Successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/login");
  } catch (err) {
    console.log("Register Error:", err.response?.data || err.message);
    setError(err.response?.data || {});
  }
};


  return (
    <Box maxW="md" mx="auto" mt="10" p="6" boxShadow="md" borderRadius="md">
      <Heading mb="6" textAlign="center">Register</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing="4">
          <FloatingLabelInput
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {error.username && <Text color="red.500">{error.username[0]}</Text>}

          <FloatingLabelInput
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          {error.email && <Text color="red.500">{error.email[0]}</Text>}

          <FloatingLabelInput
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          {error.password && <Text color="red.500">{error.password[0]}</Text>}

          <Button colorScheme="teal" width="full" type="submit">
            Sign Up
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
