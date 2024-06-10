import { Box, Flex, Text } from "@chakra-ui/react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const UploadCompany = () => {
  const [companyData, setCompanyData] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
  });
  const recordId = new URLSearchParams(window.location.search).get("recordId");

  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    const name = e.target.name;
    setCompanyData({ ...companyData, [name]: e.target.value });
  };

  const handleUploadCompany = async () => {
    let res;
    console.log("Record ID:", recordId);
    if (recordId) {
      try {
        res = await fetch(
          `http://localhost:5500/api/admin/updatecompany/${recordId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(companyData),
          }
        );
        navigate("/");
      } catch (error) {
        console.error("Error updating company data:", error);
      }
    } else {
       res = await fetch("http://localhost:5500/api/admin/uploadcompany", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData),
      });
    }

    const data = await res.json();
    if (res.status === 403) {
      toast.error(data.message);
    }
    setCompanyData({
      name: "",
      address: "",
      contact: "",
      email: "",
    });
    if (data.success) {
      toast.success(data.msg);
      navigate("/");
    }
    console.log("Upload company data", data);
  };

  const getEditData = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5500/api/admin/getcompany/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      if (res.status === 403) {
        toast.error(data.message);
      }

      setCompanyData({
        name: data.findedData.name,
        address: data.findedData.address,
        contact: data.findedData.contact,
        email: data.findedData.email,
      });
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  useEffect(() => {
    if (recordId) {
      getEditData(recordId);
    }
  }, [recordId]);

  return (
    <Box
      minH={"100%"}
      display={"flex"}
      justifyContent={"center"}
      bg={"#0D1117"}
      color={"white"}
    >
      <Box mt={"50px"} w={{ base: "", lg: "500px" }}>
        <Text
          color={"cyan"}
          fontSize={"50px"}
          textAlign={"center"}
          textTransform={"uppercase"}
        >
          Jobify
        </Text>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={companyData.name}
            onChange={handleChange}
            type="text"
          />

          <FormLabel mt={"20px"}>Address</FormLabel>
          <Input
            name="address"
            value={companyData.address}
            onChange={handleChange}
            type="text"
          />
          <FormLabel mt={"20px"}>Contact</FormLabel>
          <Input
            name="contact"
            value={companyData.contact}
            onChange={handleChange}
            type="text"
          />
          <FormLabel mt={"20px"}>Email</FormLabel>
          <Input
            name="email"
            value={companyData.email}
            onChange={handleChange}
            type="email"
          />

          {recordId?(
            <Button
            onClick={handleUploadCompany}
            colorScheme="teal"
            w={"full"}
            mt={"20px"}
            size="md"
          >
            <Flex alignItems={"center"} gap={"15px"}>
              Update Company
              <FiUpload />
            </Flex>
          </Button>
          ):(
            <Button
            onClick={handleUploadCompany}
            colorScheme="teal"
            w={"full"}
            mt={"20px"}
            size="md"
          >
            <Flex alignItems={"center"} gap={"15px"}>
              Upload Company
              <FiUpload />
            </Flex>
          </Button>
          )}

        
        </FormControl>
      </Box>
    </Box>
  );
};

export default UploadCompany;
