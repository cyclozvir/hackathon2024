import { Flex, Spacer, Heading } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserConext";
import { useContext } from 'react';

function Heder(){
    const {data, updateData} = useContext(UserContext)

    return(
        <header>
            <Flex maxWidth="1280px" m="0 auto" p="1rem">
                <Link to="/">
                    <Heading as="h1" size="xl">
                        єПошук
                    </Heading>
                </Link>
                <Spacer />
                    {data}
            </Flex>
        </header>
    )
}

export default Heder