"use client";
import { useEffect, useState } from 'react';
import { Box, Heading, Text, Spinner, Container, Center, SimpleGrid, Image, Flex, Input, Link, Button, Icon } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
// import { SearchIcon } from "@chakra-ui/icons";
import NextLink from 'next/link';
import PagingControls from '../PageControls/PagingControls';

const People = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
        const data = await response.json();

        const peopleWithDetails = await Promise.all(data.results.map(async person => {
          const homeworld = await fetch(person.homeworld).then(res => res.json()).then(data => data.name);
          const films = await Promise.all(person.films.map(url => fetch(url).then(res => res.json()).then(data => data.title)));
          const vehicles = await Promise.all(person.vehicles.map(url => fetch(url).then(res => res.json()).then(data => data.name)));
          const starships = await Promise.all(person.starships.map(url => fetch(url).then(res => res.json()).then(data => data.name)));

          return { ...person, homeworld, films, vehicles, starships };
        }));

        setPeople(peopleWithDetails);
        setNextPage(data.next);
        setPreviousPage(data.previous);
        setTotalCount(data.count);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, [page]);

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
  };

  const toggleFavorite = (personId) => {
    setFavorites(prevFavorites => ({
      ...prevFavorites,
      [personId]: !prevFavorites[personId]
    }));
    console.log(`Favorite person ${favorites[personId] ? 'removed' : 'added'}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayFavorites = () => {
    const favoriteIds = Object.keys(favorites).filter(personId => favorites[personId]);
    if (favoriteIds.length > 0) {
      alert(`Favorite List:\n${favoriteIds.map(id => `Person ID: ${id}`).join('\n')}`);
    } else {
      alert('You have no favorite characters yet.');
    }
  };

  if (loading) {
    return (
      <Center className="cs-loader show" height="100vh">
        <Box className="cs-loader__media" mb="4">
          <img
            loading="lazy"
            src="https://www.bigmpizza.com/static/media/loader.dcda44e4fa1c198431d4.gif"
            alt="Loader"
            maxW="8rem"
            maxH="8rem"
          />
          <Text fontWeight="bold" fontSize="2xl" color="white" mb="2">
            Loading...
          </Text>
          <Center>
            <Box textAlign="center">
              <Box
                as="span"
                mx="1"
                textTransform="uppercase"
                letterSpacing="4px"
                fontFamily="sans-serif"
                fontSize="1.8rem"
                fontWeight="400"
                position="relative"
                display="inline-block"
                backgroundClip="text"
                _before={{
                  content: "''",
                  position: "absolute",
                  top: "-5px",
                  left: "0",
                  right: "0",
                  bottom: "0",
                }}
                _after={{
                  content: "''",
                  position: "absolute",
                  top: "-10px",
                  left: "0",
                  right: "0",
                  bottom: "0",
                }}
              >
                L
              </Box>
              {/* Add similar Box components for other letters */}
            </Box>
          </Center>
        </Box>

        <Text fontWeight="bold" fontSize="2xl" color="red" mb="2">
          Loading...
        </Text>
        <Center>
          <Box textAlign="center">
            <Box
              as="span"
              mx="1"
              textTransform="uppercase"
              letterSpacing="4px"
              fontFamily="sans-serif"
              fontSize="1.8rem"
              fontWeight="400"
              position="relative"
              display="inline-block"
              backgroundClip="text"
              _before={{
                content: "''",
                position: "absolute",
                top: "-5px",
                left: "0",
                right: "0",
                bottom: "0",
              }}
              _after={{
                content: "''",
                position: "absolute",
                top: "-10px",
                left: "0",
                right: "0",
                bottom: "0",
              }}
            >
            </Box>
            {/* Add similar Box components for other letters */}
          </Box>
        </Center>
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
    <Container maxW="container.lg" py={10} bg={`url("/star-wars2.jpg")`}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100px"
        margin={0}
        padding={0}
      >
        <Box
          bg="white"
          height="30px"
          borderRadius="30px"
          padding="10px 20px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          transition="0.8s"
          boxShadow="4px 4px 6px 0 rgba(255,255,255,.3), 
                    -4px -4px 6px 0 rgba(116, 125, 136, .2), 
                    inset -4px -4px 6px 0 rgba(255,255,255,.2), 
                    inset 4px 4px 6px 0 rgba(0, 0, 0, .2)"
          _hover={{
            animation: "hoverShake 0.15s linear 3",
            ".search-input": {
              width: "400px",
            },
          }}
          sx={{
            "@keyframes hoverShake": {
              "0%": { transform: "skew(0deg,0deg)" },
              "25%": { transform: "skew(5deg, 5deg)" },
              "75%": { transform: "skew(-5deg, -5deg)" },
              "100%": { transform: "skew(0deg,0deg)" },
            },
          }}
        >
          <Input
            className="search-input"
            bg="transparent"
            border="none"
            outline="none"
            width="0px"
            fontWeight="500"
            fontSize="16px"
            transition="0.8s"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>
        <Flex justifyContent="flex-end" paddingRight="20px"> 
          <Button
            onClick={displayFavorites}
            className="btn"
            type="button"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="13rem"
            overflow="hidden"
            height="3rem"
            borderRadius="5rem"
            transition="0.5s"
            _hover={{
              bg: "#adf7d1",
              transform: "scale(1.1)",
            }}
            _active={{
              border: "double 4px #FE53BB",
              bg: "#adf7d1",
              backgroundOrigin: "border-box",
              backgroundClip: "content-box, border-box",
            }}
          >
            <strong>view favorites
            <Icon
              as={FaHeart}
              boxSize="1.2em"
              color="Red"
            /></strong>
            <Center
              id="container-stars"
              position="absolute"
              zIndex="-1"
              width="100%"
              height="100%"
              overflow="hidden"
              transition="0.5s"
              borderRadius="5rem"
              bg="rgba(0, 0, 0, 0.5)"
            >
              <Box id="stars" position="relative" background="transparent" width="200rem" height="200rem">
                <Box
                  as="div"
                  position="absolute"
                  top="-10rem"
                  left="-100rem"
                  width="100%"
                  height="100%"
                  bgSize="50px 50px"
                  animation="animStarRotate 90s linear infinite"
                />
                <Box
                  as="div"
                  position="absolute"
                  top="0"
                  left="-50%"
                  width="170%"
                  height="500%"
                  bgSize="50px 50px"
                  opacity="0.5"
                  animation="animStar 60s linear infinite"
                />
              </Box>
            </Center>
          </Button>
        </Flex>
      </Box>
      <Heading as="h1" size="xl" mb={6} textAlign="center">Characters Listing Screen</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={8} justifyItems="center">
        {filteredPeople.map((person) => {
          const personId = person.url.match(/\/people\/(\d+)\//)[1];
          return (
            <Box
              key={personId}
              h="12em"
              w="18em"
              border="2px solid"
              borderColor="rgba(75, 30, 133, 0.5)"
              borderRadius="1.5em"
              color="black"
              p="1em"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              gap="0.75em"
            >
              <NextLink href={`/characters/${personId}`} passHref>
                <Link>
                  <Heading as="p" size="md" fontWeight="bold" mb="0.5rem">{person.name}</Heading>
                </Link>
              </NextLink>
              <Text><strong>Gender:</strong> {person.gender}</Text>
              <Flex justify="space-between" alignItems="center" pt="10px" borderTop="1px solid" borderColor="gray.200">
                <Heading as="span" size="md" fontWeight="bold">add favorite</Heading>
                <Button
                  borderWidth="1px"
                  borderColor="gray.700"
                  display="flex"
                  p="0.3em"
                  cursor="pointer"
                  borderRadius="50px"
                  transition="0.3s ease-in-out"
                  _hover={{
                    borderColor: 'orange.200',
                    bg: 'orange.200',
                  }}
                  onClick={() => {
                    toggleFavorite(personId);
                    alert(favorites[personId] ? 'Favorite person removed' : 'Favorite person added');
                  }}
                >
                  <Icon
                    as={FaHeart}
                    boxSize="1.2em"
                    style={{ color: favorites[personId] ? 'red' : 'gray' }}
                  />
                </Button>
              </Flex>
            </Box>
          );
        })}
      </SimpleGrid>
      <PagingControls
        totalCount={totalCount}
        totalCountDescription="Characters"
        pageSize={10}
        onGoToPage={handlePageChange}
        currentPage={page}
      />
    </Container>
  );
};

export default People;
