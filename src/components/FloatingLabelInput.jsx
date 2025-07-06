import React, { useState } from "react";
import {
  FormControl,
  Input,
  FormLabel,
  useColorModeValue
} from "@chakra-ui/react";

const FloatingLabelInput = ({ label, name, type = "text", value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const bg = useColorModeValue("white", "gray.800");

  const isActive = isFocused || value;

  return (
    <FormControl pos="relative" mt={4}>
      <Input
        name={name}
        type={type}
        variant="outline"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder=" "
        height="60px"
        paddingTop="24px"
        background={bg}
      />
      <FormLabel
        pos="absolute"
        top={isActive ? "4px" : "18px"}
        left="12px"
        fontSize={isActive ? "sm" : "md"}
        color={isActive ? "teal.500" : "gray.500"}
        transition="all 0.2s"
        pointerEvents="none"
      >
        {label}
      </FormLabel>
    </FormControl>
  );
};

export default FloatingLabelInput;
