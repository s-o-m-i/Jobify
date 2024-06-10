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

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    setLoginData({ ...loginData, [name]: e.target.value });
  };

  const handleLogin = async () => {

    try {
      const response = await fetch("http://localhost:5500/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      console.log("user not exists somi",data)
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.token));
        toast.success("user login successfully")
        navigate("/");
      }else{
        toast.error("user already exists")
      }
    } catch (error) {
     console.log("error in handleLogin",error) 
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
            <FormLabel>Email address</FormLabel>
            <Input
              name="email"
              value={loginData.email}
              onChange={handleChange}
              type="email"
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
            <FormLabel mt={"20px"}>Password</FormLabel>
            <Input
              name="password"
              value={loginData.password}
              onChange={handleChange}
              type="password"
            />
            <FormHelperText>We'll never share your password.</FormHelperText>
            <Button
              onClick={handleLogin}
              colorScheme="teal"
              w={"full"}
              mt={"20px"}
              size="md"
            >
              Login
            </Button>
            <Flex gap={"5px"}>
            <Text mt={'5px'}>Don't have an account? </Text>
            <Link to={"/signup"}>

            <Text cursor={"pointer"} mt={'5px'} color={"teal"} fontWeight={"500"}>Signup</Text>
            </Link>

            </Flex>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default Login;
