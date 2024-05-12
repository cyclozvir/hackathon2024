import "./App.css"
import Header from "./components/Header"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useEffect, useContext } from "react";
import { checkTokens } from './utils/tokenUtils';
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Request  from "./pages/Request"
import SearchList from "./pages/SearchList"
import { UserContext } from "./contexts/UserConext";

function App() {
  
  const {data, updateData} = useContext(UserContext)
  const navigate = useNavigate();

    useEffect(() => {
        const fetchTokens = async () => {
          const { isValid } = await checkTokens();
          if (isValid) {
            updateData('user')
          } else {
            updateData('')

          }
        };

        fetchTokens();
    }, [, navigate, data]);
  return (
    <>
      <Header />
      <Routes>
				<Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}/>
        <Route path="request-search" element={<Request />}/>
        <Route path="search-list" element={<SearchList/>} />
			</Routes>
    </>
  )
}

export default App
