"use client";
import { useEffect, useState } from 'react';
import { Box, Heading, Text, Center, Spinner, Container } from '@chakra-ui/react';

const CharacterPage = ({ params }) => {
  const { id } = params;
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        const data = await response.json();
        
        // Fetch additional details for character
        const homeworld = await fetch(data.homeworld).then(res => res.json()).then(data => data.name);
        const films = await Promise.all(data.films.map(url => fetch(url).then(res => res.json()).then(data => data.title)));
        const vehicles = await Promise.all(data.vehicles.map(url => fetch(url).then(res => res.json()).then(data => data.name)));
        const starships = await Promise.all(data.starships.map(url => fetch(url).then(res => res.json()).then(data => data.name)));

        setCharacter({ ...data, homeworld, films, vehicles, starships });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCharacter();
    }
  }, [id]);

  if (!id) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Text color="red.500">Character ID is not provided.</Text>
      </Box>
    );
  }

  if (loading) {
    return (
      <Center className="loading-screen">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Text color="red.500">Error: {error}</Text>
      </Box>
    );
  }

  return (
    <Container maxW="container.lg" py={10} bg={`url(&quot;/star-wars7.jpg&quot;)`}  >
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        Character Detail Screen
      </Heading>
      <Center>
        <Box 
          p={5} shadow="md" borderWidth="1px" 
          h="34em"
          w="18em"
          border="2px solid"
          borderColor="rgba(75, 30, 133, 0.5)"
          borderRadius="1.5em"
          alignItems="center" justifyContent="center"
          transition="all 0.48s cubic-bezier(0.23, 1, 0.32, 1)"
          backgroundColor="#7dace4"
        >
          <Heading fontSize="xl" fontFamily="'Open Sans', sans-serif" mb={2}>
            {character.name}
          </Heading>
          <Text><strong>Height:</strong> {character.height} cm</Text>
          <Text><strong>Mass:</strong> {character.mass} kg</Text>
          <Text><strong>Hair Color:</strong> {character.hair_color}</Text>
          <Text><strong>Skin Color:</strong> {character.skin_color}</Text>
          <Text><strong>Eye Color:</strong> {character.eye_color}</Text>
          <Text><strong>Birth Year:</strong> {character.birth_year}</Text>
          <Text><strong>Gender:</strong> {character.gender}</Text>
          <Text><strong>Homeworld:</strong> {character.homeworld}</Text>
          {character.films.map((film, index) => (
            <Text key={index}><strong>Film {index + 1}:</strong> {film}</Text>
          ))}
          {character.vehicles.map((vehicle, index) => (
            <Text key={index}><strong>Vehicle {index + 1}:</strong> {vehicle}</Text>
          ))}
          {character.starships.map((starship, index) => (
            <Text key={index}><strong>Starship {index + 1}:</strong> {starship}</Text>
          ))}
        </Box>
      </Center>
    </Container>
  );
};

export default CharacterPage;
