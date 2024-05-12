import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Heading,
	Link as ChakraLink,
	Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserConext";

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm();

	const {data, updateData} = useContext(UserContext)

    const navigate = useNavigate();

	useEffect(() => {
		

		if (data == 'user') {
			navigate("/request-search");
		}
	}, [navigate]);

	const onSubmit = async (formData) => {
		const { repeatPassword, ...formDataToSend } = formData;
		const registerEndpoint = "http://64.226.118.188:8000/api/v1/user/register/"

		try {
			const response = await fetch(registerEndpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formDataToSend),
			});

			if (response.status === 409) {
				const errorData = await response.json();
				const errorMessage = errorData.email; 

				console.log("Registration Error Message:", errorMessage);

				alert(`Registration Error: ${errorMessage}`);
			} else if (response.status === 500) {
				const errorData = await response.json();
				const errorMessage = errorData.message; 

				console.log("Registration Error Message:", errorMessage);

				alert(`Registration Error: ${errorMessage}`);
			}else{
				const data = await response.json();
				console.log("Registration Response:", data);

				const redirectUrl = "/request-search";
				
				updateData('user')
				localStorage.setItem('jwt_access', data.access);
				localStorage.setItem('jwt_refresh', data.refresh);
				reset()

				navigate(redirectUrl);
			}
		} catch (error) {
			console.error("Error registering user:", error);
			// Handle other types of errors (e.g., network issues)
			alert("Error registering user. Please try again later.");
		}
	};

	return (
		<Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="md">
			<Heading as="h2" size="lg" textAlign="center">
				Створити Аккаунт
			</Heading>
			<Text mb="8px" mt="4px" textAlign="center" fontStyle="italic">
				Потрібно Знайти
			</Text>
			<></>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={3}>
					<FormControl isRequired>
						<FormLabel htmlFor="firstName">First Name</FormLabel>
						<Input
							focusBorderColor="#4FD1C5"
							type="text"
							id="firstName"
							{...register("first_name", {
								required: "Please enter your first name",
							})}
							placeholder="Enter your first name"
						/>
						{errors.firstName && (
							<span style={{ color: "red" }}>{errors.firstName.message}</span>
						)}
					</FormControl>
					<FormControl isRequired>
						<FormLabel htmlFor="lastName">Last Name</FormLabel>
						<Input
							focusBorderColor="#4FD1C5"
							type="text"
							id="lastName"
							{...register("last_name", {
								required: "Please enter your last name",
							})}
							placeholder="Enter your last name"
						/>
						{errors.lastName && (
							<span style={{ color: "red" }}>{errors.lastName.message}</span>
						)}
					</FormControl>
					<FormControl isRequired>
						<FormLabel htmlFor="email">Email</FormLabel>
						<Input
							focusBorderColor="#4FD1C5"
							type="email"
							id="email"
							{...register("email", {
								required: "Please enter your email",
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: "Invalid email address",
								},
							})}
							placeholder="Enter your email"
						/>
						{errors.email && (
							<span style={{ color: "red" }}>{errors.email.message}</span>
						)}
					</FormControl>
					<FormControl isRequired>
						<FormLabel htmlFor="password">Password</FormLabel>
						<Input
							focusBorderColor="#4FD1C5"
							type="password"
							id="password"
							{...register("password", {
								required: "Please enter a password",
								minLength: {
									value: 8,
									message: "Password must be at least 8 characters",
								},
							})}
							placeholder="Enter your password"
						/>
						{errors.password && (
							<span style={{ color: "red" }}>{errors.password.message}</span>
						)}
					</FormControl>
					<FormControl isRequired>
						<FormLabel htmlFor="repeatPassword">Repeat Password</FormLabel>
						<Input
							focusBorderColor="#4FD1C5"
							type="password"
							id="repeatPassword"
							{...register("repeatPassword", {
								required: "Please repeat your password",
								validate: (value) =>
									value === watch("password") || "Passwords do not match",
							})}
							placeholder="Repeat your password"
						/>
						{errors.repeatPassword && (
							<span style={{ color: "red" }}>
								{errors.repeatPassword.message}
							</span>
						)}
					</FormControl>
					<Button
						type="submit"
						bg="#4FD1C5"
						color="white"
						_hover={{
							background: "#2FB5AA",
						}}
						transition=".3s ease-in"
						size="lg"
					>
						Зареєструватись
					</Button>
					<Box textAlign="center">
						<ChakraLink as={RouterLink} to="/login" color="#2FB5AA" mt={3}>
							 Вже є аккаунт? Увійти
						</ChakraLink>
					</Box>
				</Stack>
			</form>
		</Box>
	);
};

export default Register;