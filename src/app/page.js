"use client"
import styles from "./page.module.css";
import Navbar from "./Navbar/Navbar";
import { Heading, Box, Image } from '@chakra-ui/react';

export default function Home() {
  return (
    <>
   
   <Box>
      <Heading textAlign="center" fontSize="4xl" mt={8}>
        Welcome to Star Wars Page
      </Heading>
      <Image
        src="/star-wars.jpg"
        alt="Star Wars Banner"
        w="100%"
        objectFit="cover"
        mt={4}
        h="550px"
      />
    </Box>
   </>
  );
}
