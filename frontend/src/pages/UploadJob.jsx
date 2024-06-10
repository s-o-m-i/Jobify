import { Box, Text } from "@chakra-ui/react";
import {
  Button,
  FormControl,

  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UploadJob = () => {
  const navigate = useNavigate()
  
    const {name} = useParams()
    const [jobData,setJobData] = useState({
        title:"",
        description:"",
        company:name,
        location:"",
        salary:""
    })

    const token = JSON.parse(localStorage.getItem("user"));
    const handleChange = (e) => {
        const name = e.target.name;
        setJobData({...jobData,[name]:e.target.value})
    }

const handleUploadJob = async()=>{
    const res = await fetch("http://localhost:5500/api/admin/uploadjob",{
        method:"POST",
        headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify(jobData)
    })
    const data = await res.json()


    setJobData({
        title:"",
        description:"",
        company:name,
        location:"",
        salary:""
    })

    if(res.status == 403){
        toast.error(data.message)
    }
    if(data.success){
        toast.success("job created")
        navigate("/jobs")
    }

    console.log("uplaod job data",data);
}

  return (
    <>
      <Box minH={"100%"} bg={"#0D1117"} textColor={"white"} display={"flex"} justifyContent={"center"} alignItems={""}>
        <Box w={{ base: "", lg: "500px" }}>
        <Text mt={"20px"} color={"cyan"} fontSize={"50px"} textAlign={"center"} textTransform={"uppercase"}>Jobify</Text>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
                value={jobData.title}
                onChange={handleChange}
              type="text"
            />

            <FormLabel mt={"20px"}>Description</FormLabel>
            <Input
              name="description"
                value={jobData.description}
                onChange={handleChange}
              type="text"
            />
            <FormLabel mt={"20px"}>Company</FormLabel>
            <Input
              name="company"
                value={jobData.company}
                onChange={handleChange}
              type="text"
            />
            <FormLabel mt={"20px"}>Location</FormLabel>
            <Input
              name="location"
                value={jobData.location}
                onChange={handleChange}
              type="email"
            />
            <FormLabel mt={"20px"}>Salary</FormLabel>
            <Input
              name="salary"
                value={jobData.salary}
                onChange={handleChange}
              type="email"
            />

            <Button
                onClick={handleUploadJob}
              colorScheme="teal"
              w={"full"}
              mt={"20px"}
              size="md"
            >
           Upload Job
            </Button>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default UploadJob;
