import { Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserConext";
import { useContext } from "react";

function Buttons() { 

	const {data, updateData} = useContext(UserContext)

    return (
			<HStack justifyContent="center" spacing="32px">
				<Link
					to={data == 'user' ? '/request-search': 'register'}
				>
					<Button
						w={200}
						bg="#4FD1C5"
						color="white"
						_hover={{
							background: "#2FB5AA",
						}}
						transition=".3s ease-in"
						size="lg"
					>
						Потрібно Знайти
					</Button>
				</Link>

				<Link
					to="/search-list"
				>
					<Button
						w={200}
						bg="#4FD1C5"
						color="white"
						_hover={{
							background: "#2FB5AA",
						}}
						transition=".3s ease-in"
						size="lg"
					>
						Кого Шукають
					</Button>
				</Link>
			</HStack>
		);
}

export default Buttons