import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear("user")
    navigate("/login")
  }
  return (
    <>
      <Box  minH={{ base: "", lg: "100vh" }}>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 4fr" }}>
          <GridItem
          bg={"#0D1117"}
          color={"white"}
            minH={"100vh"}
            colSpan={{ base: "1fr" }}
            borderRight={"5px solid teal"}
          >
            <Box px={"20px"}>
              <Text
                fontSize={"18px"}
                lineHeight={"1.1"}
                my={"40px"}
                fontWeight={"500"}
                textAlign={"center"}
                // color={"orange"}
                color={"teal"}
              >
             <span style={{color:"white"}}>   Admin</span>  Dashboard
              </Text>

              <NavLink
                to={"/"}
                className={({ isActive }) => `
${isActive ? "isactive" : ""}
`}
              >
                <Text
                  borderBottom={"2px solid white"}
                  fontSize={"18px"}
                  fontWeight={""}
                  textAlign={""}
                  color={""}
                >
                  Companies
                </Text>
              </NavLink>
              <NavLink
                to={"/jobs"}
                className={({ isActive }) => `
${isActive ? "isactive" : ""}
`}
              >
                <Text
                  borderBottom={"2px solid white"}
                  mt={"20px"}
                  fontSize={"18px"}
                  fontWeight={""}
                  textAlign={""}
                  color={""}
                >
                  Jobs
                </Text>
              </NavLink>

              <Text
              onClick={handleLogout}
                  borderBottom={"2px solid white"}
                  mt={"20px"}
                  fontSize={"18px"}
                  fontWeight={""}
                  textAlign={""}
                  color={""}
                  cursor={"pointer"}
                >
                  Logout
                </Text>

    
            </Box>
          </GridItem>
          <GridItem minH={"100vh"} bg={""} colSpan={{ base: "1fr" }}>
            <Outlet />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default Layout;
