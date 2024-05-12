import { useEffect, useContext, useState} from "react";
import { useForm } from "react-hook-form";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Heading,
    Select,
    Textarea,
    Flex
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserConext";
import axios from 'axios';
import Map from '../components/Map'

const Request = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const {data, updateData} = useContext(UserContext)
    const [mapValue, setMapValue] = useState(null);
   
    const handleMapValue = (value) => {
        console.log(value)
        setMapValue(value);
      };

    const navigate = useNavigate();

	useEffect(() => {
		

		if (data != 'user') {
			navigate("/");
		}
	}, [navigate]);

	const onSubmit = async (formData) => {
        
        const payload = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            description: formData.description,
            photo: formData.photo['0'],
            age: formData.age,
            gender: formData.gender,
            last_seen_date: formData.last_seen_date,
            contact_information: formData.contact_information,
            last_seen_location: mapValue
        }
        console.log(payload);
        try {
            const response = await axios.post("http://134.122.81.144:8000/missing-persons/", payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt_access')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response.status === 201) {
                alert('request created')
                console.log("Search Req Response:", response);
            } else {
                const errorMessage = response.data.message;
                console.log("Login Error Message:", errorMessage);
                alert(`Login Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error login user:", error);
            alert("Error login user. Please try again later.");
        }
    };

	return (
		<Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="md">
            <Heading as="h2" size="lg" textAlign="center" mb={5}> 
                Запит На Пошук
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    <FormControl isRequired>
                        <FormLabel htmlFor="first_name">First Name</FormLabel>
                        <Input
                            focusBorderColor="#4FD1C5"
                            type="text"
                            id="first_name"
                            {...register("first_name", { required: "Please enter your first name" })}
                            placeholder="Enter your first name"
                        />
                        {errors.first_name && (
                            <span style={{ color: "red" }}>{errors.first_name.message}</span>
                        )}
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor="last_name">Last Name</FormLabel>
                        <Input
                            focusBorderColor="#4FD1C5"
                            type="text"
                            id="last_name"
                            {...register("last_name", { required: "Please enter your last name" })}
                            placeholder="Enter your last name"
                        />
                        {errors.last_name && (
                            <span style={{ color: "red" }}>{errors.last_name.message}</span>
                        )}
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor="age">Age</FormLabel>
                        <Input
                            focusBorderColor="#4FD1C5"
                            type="number"
                            id="age"
                            {...register("age", { required: "Please enter your age" })}
                            placeholder="Enter your age"
                        />
                        {errors.age && (
                            <span style={{ color: "red" }}>{errors.age.message}</span>
                        )}
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor="gender">Gender</FormLabel>
                        <Select
                            focusBorderColor="#4FD1C5"
                            id="gender"
                            {...register("gender", { required: "Please select your gender" })}
                            placeholder="Select your gender"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Select>
                        {errors.gender && (
                            <span style={{ color: "red" }}>{errors.gender.message}</span>
                        )}
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <Textarea
                            focusBorderColor="#4FD1C5"
                            id="description"
                            {...register("description", { required: "Please enter a description" })}
                            placeholder="Enter a description"
                        />
                        {errors.description && (
                            <span style={{ color: "red" }}>{errors.description.message}</span>
                        )}
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor="last_seen_date">Last Seen Date</FormLabel>
                        <Input
                            focusBorderColor="#4FD1C5"
                            type='date'
                            id="last_seen_date"
                            {...register("last_seen_date", { required: "Please select the last seen date" })}
                            placeholder="Select last seen date"
                        />
                        {errors.last_seen_date && (
                            <span style={{ color: "red" }}>{errors.last_seen_date.message}</span>
                        )}
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor="photo">Photo</FormLabel>
                        <Input
                            focusBorderColor="#4FD1C5"
                            type="file" 
                            id="photo"
                            {...register("photo", { required: "Please select the last seen date" })}
                            />
                        {errors.photo && (
                            <span style={{ color: "red" }}>
                                {errors.photo.message}
                            </span>
                        )}
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor="contact_information">Contact Information</FormLabel>
                        <Input
                            focusBorderColor="#4FD1C5"
                            type="text"
                            id="contact_information"
                            {...register("contact_information", { required: "Please enter your contact information" })}
                            placeholder="Enter your contact information"
                        />
                        {errors.contact_information && (
                            <span style={{ color: "red" }}>{errors.contact_information.message}</span>
                        )}
                    </FormControl>
                    <Map onMapChange={handleMapValue}/>
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
                        Створити
                    </Button>
                </Stack>
            </form>
        </Box>

	);
};

export default Request