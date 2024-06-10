import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoTrashBinOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const CompanyDetails = () => {
  const [details, setDetails] = useState([]);
  const { name } = useParams();
const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem("user"));

  const getDetails = async () => {
    try {
      const res = await fetch(
        `http://localhost:5500/api/admin/companyDetails/${name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log("getDetails data", data.findedJobs);
      setDetails(data.findedJobs); // Assuming data.findedJobs contains the details you want to display
    } catch (error) {
      console.error("Error fetching company details:", error);
    }
  };


  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5500/api/admin/deleteJob/${id}`,{
        method:"DELETE",
       headers:{
        "Authorization":`Bearer ${token}`
       }
    })
    const data = await res.json()
    console.log("job details job delete" , data)
    getDetails()
    if(data.success){
      toast.success("Deleted Successfully")
    }
  }

  const handleEdit = async(id) => {
    navigate(`/updatejob/${id}`)
      }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <Box p={"40px"} bg={"#0D1117"} textColor={"white"} minH={{ base: "", lg: "100%" }}>
      <Text
        fontWeight={""}
        textAlign={"center"}
        textTransform={"capitalize"}
        fontSize={"30px"}
      >
        Company: <span style={{fontWeight:"500",color:"cyan"}}> {name}</span>
      </Text>

      <Box>
        <Text color={"cyan"} fontWeight={"500"} textTransform={"capitalize"} fontSize={"20px"}>
          Job List:
        </Text>

        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr 1fr" }}>
          {details.map((e, i) => {
            return (
              <GridItem colSpan={{ base: "1fr" }} key={i}>
                <Box
                  p={"20px"}
                  h={"350px"}
                  boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2)"}
                  mt={"20px"}
                  key={i}
                  w={"300px"}
                  bg={"#161B22"}
                >


<Flex alignItems={"center"} gap={"10px"} justifyContent={"end"}>
                  <Flex
                    cursor={"pointer"}
                    color={"green"}
                    onClick={() => handleEdit(e._id)}
                  >
                    <FaEdit size={"20px"} />
                  </Flex>
                  <Flex
                    cursor={"pointer"}
                    color={"red"}
                    onClick={() => handleDelete(e._id)}
                  >
                    <IoTrashBinOutline size={"20px"} />
                  </Flex>
                </Flex>



               <Box>
                    <Text fontSize={"16px"} fontWeight={"500"}>
                      Company :
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize={"14px"} fontWeight={""} color={"teal"}>
                      {e.company}
                    </Text>
                  </Box>

                  <Box>
                    <Text mt={"10px"} fontSize={"16px"} fontWeight={"500"}>
                      Title :
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize={"14px"} fontWeight={""} color={"teal"}>
                      {e.title}
                    </Text>
                  </Box>

                  <Box>
                    <Text mt={"10px"} fontSize={"16px"} fontWeight={"500"}>
                      Salary :
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize={"14px"} fontWeight={""} color={"teal"}>
                      {e.salary}
                    </Text>
                  </Box>

                  <Box>
                    <Text mt={"10px"} fontSize={"16px"} fontWeight={"500"}>
                      Description :
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize={"14px"} fontWeight={""} color={"teal"}>
                      {e.description}
                    </Text>
                  </Box>

                  <Box>
                    <Text mt={"10px"} fontSize={"16px"} fontWeight={"500"}>
                      Location :
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize={"14px"} fontWeight={""} color={"teal"}>
                      {e.location}
                    </Text>
                  </Box>
                </Box>
              </GridItem>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default CompanyDetails;
