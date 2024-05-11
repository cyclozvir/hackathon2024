import { Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Buttons() { 

    return (
			<HStack justifyContent="center" spacing="32px">
				<Link
					to="/register"
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
					to="/register"
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
						Список Пошуку
					</Button>
				</Link>
			</HStack>
		);
}

export default Buttons