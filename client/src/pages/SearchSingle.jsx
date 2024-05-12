import { useEffect, useState } from "react";
import {
	Card,
	CardBody,
	CardFooter,
	HStack,
	Stack,
	Heading,
	Text,
	Divider,
	Button,
	Image,
    Center
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";

function SearchSingle() {
	const { id } = useParams();
	const [events, setEvents] = useState(null);

	useEffect(() => {
		const fetchEvents = async () => {
				try {
					const response = await fetch(
						`http://134.122.81.144:8000/missing-persons/${id}/`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
							},
						}
					);

					if (response.ok) {
						const eventsList = await response.json();
						setEvents(eventsList);
					} else {
						throw new Error("Failed to fetch user data");
					}
				} catch (error) {
					console.error("Error fetching user data:", error);
				}		
		};

		fetchEvents();
	}, []);

	return (
		<>
			<section className="container">
				<HStack spacing="16px" flexWrap="wrap" justifyContent="center">
					{events ? (
					
							<Card
								key={events.id}
								maxW="sm"
                                minW="sm"
                                minH="sm"
								shadow="none"
								borderWidth={1}
								borderRadius="md"
								borderColor="#E2E8F0"
							>
								<CardBody>
									<Image
										src={events.photo}
										borderRadius="lg"
									/>
									<Stack mt="6" spacing="3">
										<Heading size="md">{events.title}</Heading>
										    <Text>
												{events.first_name} {events.last_name}
											</Text>
                                            <Text>
                                                {events.description}
                                            </Text>
									</Stack>
								</CardBody>
								<Divider />
								<CardFooter>
									<Link to={`/missing-persons/${events.id}`}> 
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
											Детальніше
										</Button>
									</Link>
								</CardFooter>
							</Card>
						
					) : (
						<p>Loading user data...</p>
					)}
				</HStack>
			</section>
		</>
	);
}

export default SearchSingle