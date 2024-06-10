import { Box, Text } from "@chakra-ui/react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditCompany = () => {
  const [editData, setEditData] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
  });
  const { id } = useParams();
  const navigate = useNavigate()

  const token = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const getEditData = async () => {
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

      if(res.status == 403){
        toast.error(data.message)
      }

      setEditData({
        name: data.findedData.name,
        address: data.findedData.address,
        contact: data.findedData.contact,
        email: data.findedData.email,
      });
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:5500/api/admin/updatecompany/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );
      const data = await res.json();
      console.log("Updated data", data);
      if(res.status == 403){
        toast.error(data.message)
      }
      if(data.status == 200){
        toast.success(data.message)
        navigate('/')
      }
      // Optionally, redirect or give feedback to the user
    } catch (error) {
      console.error("Error updating company data:", error);
    }
  };

  useEffect(() => {
    getEditData();
  }, []);

  return (
    <>
      <Box
        minH={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bg={"#0D1117"}
        textColor={"white"}
      >
        <Box mt={""} w={{ base: "", lg: "500px" }}>
        <Text color={"cyan"} fontSize={"50px"} textAlign={"center"} textTransform={"uppercase"}>Jobify</Text>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={editData.name}
              onChange={handleChange}
              type="text"
            />

            <FormLabel mt={"20px"}>Address</FormLabel>
            <Input
              name="address"
              value={editData.address}
              onChange={handleChange}
              type="text"
            />
            <FormLabel mt={"20px"}>Contact</FormLabel>
            <Input
              name="contact"
              value={editData.contact}
              onChange={handleChange}
              type="text"
            />
            <FormLabel mt={"20px"}>Email</FormLabel>
            <Input
              name="email"
              value={editData.email}
              onChange={handleChange}
              type="email"
            />

            <Button
              onClick={handleUpdate}
              colorScheme="teal"
              w={"full"}
              mt={"20px"}
              size="md"
            >
              Update Company
            </Button>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default EditCompany;
