import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(3); 
  const [totalPages, setTotalPages] = useState(1);
  const token = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const getJobs = async (page, limit) => {
    try {
      const res = await fetch(
        `http://localhost:5500/api/admin/getjob?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      if (res.status === 403) {
        toast.error(data.message);
      } else {
        setJobs(data.jobs);
        setTotalPages(data.totalPages); 
      }
      console.log("get jobs data", data.jobs);
    } catch (error) {
      console.log("error in get jobs");
    }
  };

  useEffect(() => {
    getJobs(page, limit);
  }, [page, limit]);

  const handleDelete = async (e) => {
    try {
      const res = await fetch(`http://localhost:5500/api/admin/deleteJob/${e}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log("delete job data", data);
      if (data) {
        getJobs(page, limit);
      }
      if (res.status === 403) {
        toast.error(data.message);
      }
      if (data.success) {
        toast.success("deleted successfully");
      }
    } catch (error) {
      console.log("error in handleDelete", error);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleEdit = async (id) => {
    navigate(`/updatejob/${id}`);
  };

  return (
    <>
      <Box p={"40px"} bg={"#0D1117"} minH={"100vh"} textColor={"white"}>
      <Text color={"cyan"} fontSize={"50px"} textAlign={"center"} textTransform={"uppercase"}>Jobify</Text>



{jobs.length === 0 ? (
  <Flex minH={"300px"} flexDirection="column" alignItems="center" justifyContent="center" color="white" mt="50px">
          <Text fontSize="2xl" mb="20px">No Jobs found.</Text>
        
       
        </Flex>
):(
  <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr 1fr" }}>
          {jobs.map((e,) => (
            <GridItem colSpan={{ base: "1fr" }} key={e._id}>
              <Box
                p={"20px"}
                h={"350px"}
                boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2)"}
                mt={"20px"}
                w={"300px"}
                // border={"1px solid #2C7A7B"}
                rounded={"md"}
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

                <Text mt={"10px"} fontSize={"16px"} fontWeight={"500"}>
                  Title:
                </Text>
                <Text fontSize={"13px"} color={"teal"}>
                  {e.title}
                </Text>

                <Text mt={"10px"} fontSize={"16px"} fontWeight={"500"}>
                  Description:
                </Text>
                <Text fontSize={"13px"} color={"teal"}>
                  {e.description}
                </Text>

                <Text mt={"10px"} fontSize={"16px"} fontWeight={"500"}>
                  Location:
                </Text>
                <Text fontSize={"13px"} color={"teal"}>
                  {e.location}
                </Text>

                <Text mt={"10px"} fontSize={"16px"} fontWeight={"500"}>
                  Salary:
                </Text>
                <Text fontSize={"13px"} color={"teal"}>
                  {e.salary}
                </Text>
                <Text mt={"10px"} fontSize={"16px"} fontWeight={"500"}>
                  Company:
                </Text>
                <Text fontSize={"13px"} color={"teal"}>
                  {e.company}
                </Text>
              </Box>
            </GridItem>
          ))}
        </Grid>
)}

       

        <Flex justifyContent="space-between" mt="20px">
          <Button onClick={handlePrevPage} isDisabled={page === 1}>
            Previous
          </Button>
          <Text>Page: {page}</Text>
          <Button onClick={handleNextPage} isDisabled={page === totalPages}>
            Next
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default Jobs;
