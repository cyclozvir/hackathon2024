import "./App.css"
import Header from "./components/Header"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useEffect, useContext } from "react";
import { checkTokens } from './utils/tokenUtils';
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Request  from "./pages/Request"
import { UserContext } from "./contexts/UserConext";

function App() {
  
  const {data, updateData} = useContext(UserContext)
  const navigate = useNavigate();

    useEffect(() => {
      if (data == 'user'){
        const fetchTokens = async () => {
          const { isValid } = await checkTokens();
          if (isValid) {
            updateData('user')
          } else {
            updateData('')

          }
        };

        fetchTokens();
      }
    }, [, navigate, data]);
  return (
    <>
      <Header />
      <Routes>
				<Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}/>
        <Route path="request-search" element={<Request />}/>
			</Routes>
    </>
  )
}

export default App
