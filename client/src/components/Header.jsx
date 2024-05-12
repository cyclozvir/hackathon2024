import { Flex, Spacer, Heading, Button } from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserConext";
import { useContext } from 'react';

function Heder(){
    const {data, updateData} = useContext(UserContext)
    const navigate = useNavigate();

    function logOut(){
            updateData('')
            localStorage.removeItem('jwt_access')
			localStorage.removeItem('jwt_refresh')
            navigate("/");
    }

    return(
        <header>
            <Flex maxWidth="1280px" m="0 auto" p="1rem">
                <Link to="/">
                    <Heading as="h1" size="xl">
                        єПошук
                    </Heading>
                </Link>
                <Spacer />
                {data == 'user' ? (
                     <Button onClick={logOut} colorScheme='white' variant='outline'>
                         Вийти
                     </Button>
                ) : null }
                    
            </Flex>
        </header>
    )
}

export default Heder