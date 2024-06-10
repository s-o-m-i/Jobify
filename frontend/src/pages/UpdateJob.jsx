import { Box, Text } from "@chakra-ui/react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateJob = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [updateJobData,setUpdateJobData] = useState({
        title:"",
        description:"",
        location:"",
        salary:"",
        company:"",
    })
    const token = JSON.parse(localStorage.getItem("user"));
    const handleChange = (e) =>{
        const name = e.target.name;
        setUpdateJobData({...updateJobData,[name]:e.target.value})
    }

    const handleUpdateJob = async() =>{
        const res = await fetch(`http://localhost:5500/api/admin/updateJob/${id}`,{
            method:"PUT",
            headers:{
                "Authorization":`Bearer ${token}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updateJobData)
        })
        const data = await res.json()
        console.log("data updated successfully",data)
        if(data.success){
            toast.success("data updated")
            navigate('/jobs')
        }
        if(res.status == 403){
            toast.error(data.message)
        }
    }


    const getUpdatedJobData = async()=>{
        const res = await fetch(`http://localhost:5500/api/admin/getUpdatedJobData/${id}`,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        const data = await res.json()
        console.log("getUpdatedJobData",data)
        setUpdateJobData({
            title:data.data.title,
            description:data.data.description,
            location:data.data.location,
            salary:data.data.salary,
            company:data.data.company,
        })
    }

    useEffect(()=>{
        getUpdatedJobData()
    },[])

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
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={updateJobData.title}
              onChange={handleChange}
              type="text"
            />

            <FormLabel mt={"20px"}>Description</FormLabel>
            <Input
              name="description"
              value={updateJobData.description}
              onChange={handleChange}
              type="text"
            />
            <FormLabel mt={"20px"}>Location</FormLabel>
            <Input
              name="location"
              value={updateJobData.location}
              onChange={handleChange}
              type="text"
            />
            <FormLabel mt={"20px"}>Salary</FormLabel>
            <Input
              name="salary"
              value={updateJobData.salary}
              onChange={handleChange}
              type="email"
            />
            <FormLabel mt={"20px"}>Company</FormLabel>
            <Input
              name="company"
              value={updateJobData.company}
              onChange={handleChange}
              type="email"
            />

            <Button
              onClick={handleUpdateJob}
              colorScheme="teal"
              w={"full"}
              mt={"20px"}
              size="md"
            >
              Update Job
            </Button>
          </FormControl>
        </Box>
      </Box>
    </>
  )
}

export default UpdateJob