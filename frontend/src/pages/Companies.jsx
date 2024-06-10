import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiUpload } from "react-icons/fi";
import { IoTrashBinOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [page,setPage] = useState(1)
  const [limit] = useState(3)
  
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user"));

  const getCompanies = async (page) => {
    try {
      const res = await fetch(
        `http://localhost:5500/api/admin/getcompanies?page=${page}&limit=${3}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      if (res.status === 403) {
        toast.error(data.message);
        return;
      }

      setCompanies(data.companies);
      setTotalPages(data.totalPages);
      // setPage(data.Page);
    } catch (error) {
      console.log("error in getCompanies", error);
    }
  };

  useEffect(() => {
    getCompanies(page);
  }, [page, limit]);  

  const handleUpload = () => {
    navigate("/uploadCompany");
  };

  const handleUploadJob = (companyId) => {
    navigate(`/uploadJob/${companyId}`);
  };

  const handleCompanyDetail = (companyId) => {
    navigate(`/companyDetails/${companyId}`);
  };

  const handleDelete = async (companyId) => {
    try {
      const res = await fetch(
        `http://localhost:5500/api/admin/deleteCompany/${companyId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (res.status === 403) {
        toast.error(data.message);
        return;
      }
      if (data.success) {
        toast.success("Deleted Successfully");
      }
      getCompanies(page);
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const handleEdit = (companyId) => {
    navigate(`/uploadCompany?recordId=${companyId}`);
  };

  const handlePrevPage = () => {
    // if (currentPage > 1) {
    //   setCurrentPage(currentPage - 1);
    // }
    if (page > 1) setPage(page - 1);
      };
    
    const handleNextPage = () => {
      // if (currentPage < totalPages) {
        //   setCurrentPage(currentPage + 1);
        // }
        if (page < totalPages) setPage(page + 1);
  };

  return (
    <Box p={"40px"} bg={"#0D1117"} minH={"100vh"}>
      <Flex justifyContent={"space-between"} alignItems={"center"} mb={4}>
        <Text
          color={"cyan"}
          fontSize={"30px"}
          textAlign={""}
          textTransform={"uppercase"}
        >
          Jobify
        </Text>
        <Button onClick={handleUpload} colorScheme="teal" size="sm">
          <Flex gap={"15px"}>
            <FiUpload />
            Upload Company
          </Flex>
        </Button>
      </Flex>


{companies.length === 0 ? (
  <Flex minH={"300px"} flexDirection="column" alignItems="center" justifyContent="center" color="white" mt="50px">
          <Text fontSize="2xl" mb="20px">No Companies found.</Text>
        
          <Button 
          onClick={handleUpload} 
          colorScheme="teal" size="sm">
          <Flex gap={"15px"}>
            <FiUpload />
            Create a Comapny
          </Flex>
        </Button>
        </Flex>
):(
  <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr 1fr" }}>
        {companies.map((company) => (
          <GridItem colSpan={{ base: "1fr" }} key={company._id}>
            <Box
              p={"20px"}
              h={"380px"}
              boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2)"}
              mt={"20px"}
              w={"300px"}
              bg={"#161B22"}
              color={"white"}
            >
              <Flex gap={"10px"} justifyContent={"end"}>
                <Flex
                  cursor={"pointer"}
                  color={"red"}
                  onClick={() => handleDelete(company._id)}
                >
                  <IoTrashBinOutline size={"20px"} />
                </Flex>
                <Flex
                  cursor={"pointer"}
                  color={"green"}
                  onClick={() => handleEdit(company._id)}
                >
                  <FaEdit size={"20px"} />
                </Flex>
              </Flex>
              <Text fontSize={"16px"} fontWeight={"500"}>
                Name:
              </Text>
              <Text fontSize={"14px"} color={"teal"}>
                {company.name}
              </Text>
              <Text mt={"10px"} fontSize={"16px"} fontWeight={"500"}>
                Address:
              </Text>
              <Text fontSize={"14px"} color={"teal"}>
                {company.address}
              </Text>
              <Text mt={"10px"} fontSize={"16px"} fontWeight={"500"}>
                Contact:
              </Text>
              <Text fontSize={"14px"} color={"teal"}>
                {company.contact}
              </Text>
              <Text mt={"10px"} fontSize={"16px"} fontWeight={"500"}>
                Email:
              </Text>
              <Text fontSize={"14px"} color={"teal"}>
                {company.email}
              </Text>
              <Button
                w={"full"}
                mt={"20px"}
                onClick={() => handleUploadJob(company.name)}
                colorScheme="teal"
                size="sm"
              >
                <Flex gap={"15px"}>
                  <FiUpload />
                  Upload Job
                </Flex>
              </Button>
              <Button
                w={"full"}
                mt={"10px"}
                onClick={() => handleCompanyDetail(company.name)}
                bg={"#E2E8F0"}
                size="sm"
              >
                Details
              </Button>
            </Box>
          </GridItem>
        ))}
      </Grid>

)}

    
      <Flex justifyContent="space-between" mt="20px">
        <Button
          onClick={handlePrevPage}
          isDisabled={page === 1}
          colorScheme="teal"
          size="sm"
        >
          Previous
        </Button>
        <Text color={"white"}>Page: {page} </Text>
        <Button
          onClick={handleNextPage}
          isDisabled={page === totalPages}
          colorScheme="teal"
          size="sm"
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default Companies;
