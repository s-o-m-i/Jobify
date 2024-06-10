import { Navigate, Outlet } from 'react-router-dom'

const PrivateComponent = () => {
    const token = localStorage.getItem("user")
    console.log(token)
  return (
    <>
    {token?<Outlet/>:<Navigate to={"/login"}/>}
        
    </>
  )
}

export default PrivateComponent