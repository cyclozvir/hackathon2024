import { Flex, Spacer, Heading } from '@chakra-ui/react'
import { Link } from "react-router-dom";

function Heder(){
    return(
        <header>
            <Flex maxWidth="1280px" m="0 auto" p="1rem">
                <Link to="/">
                    <Heading as="h1" size="xl">
                        єПошук
                    </Heading>
                </Link>
            </Flex>
        </header>
    )
}

export default Heder