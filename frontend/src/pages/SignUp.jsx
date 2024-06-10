/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [signupData, setSignupData] = useState({
    username:"",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    setSignupData({ ...signupData, [name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:5500/api/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
      const data = await response.json();

      if (data.msg == "user created") {
        // localStorage.setItem("user", JSON.stringify(data.token));
        navigate("/login");
      }else{
        toast.error("user already exists")
      }
    } catch (error) {
      console.log("error in signup ",error)
    }
  
  };

  return (
    <>
      <Box
        minH={{ base: "", lg: "100vh" }}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box w={{ base: "", lg: "300px" }}>
        <Text mt={"-50px"} mb={"30px"} color={"teal"} fontSize={"50px"} textAlign={"center"} textTransform={"uppercase"}>Jobify</Text>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              value={signupData.username}
              onChange={handleChange}
              type="text"
            />

            <FormLabel mt={"20px"}>Email address</FormLabel>
            <Input
              name="email"
              value={signupData.email}
              onChange={handleChange}
              type="email"
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
            <FormLabel mt={"20px"}>Password</FormLabel>
            <Input
              name="password"
              value={signupData.password}
              onChange={handleChange}
              type="password"
            />
            <FormHelperText>We'll never share your password.</FormHelperText>
            <Button
              onClick={handleSignUp}
              colorScheme="teal"
              w={"full"}
              mt={"20px"}
              size="md"
            >
             SignUp
            </Button>
            <Flex gap={"5px"}>
            <Text mt={'5px'}>Already have an account? </Text>
            <Link to={"/login"}>

            <Text cursor={"pointer"} mt={'5px'} color={"teal"} fontWeight={"500"}>Login</Text>
            </Link>

            </Flex>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
