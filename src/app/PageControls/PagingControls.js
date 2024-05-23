
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  HStack,
  Stack,
  Text,
  Box,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const getPageNumbers = (
  currentPage,
  totalCount,
  pageSize,
  currentPages
) => {
  if (currentPages.indexOf(currentPage) !== -1) {
    return currentPages;
  }

  const maxNumber = Math.ceil(totalCount / pageSize);
  const firstPagePosition = Math.min(currentPage, maxNumber - 4);

  const result = [];
  for (
    let i = firstPagePosition - 1;
    i < firstPagePosition + 4 && i < maxNumber;
    i++
  ) {
    if (i < 0) {
      continue;
    }

    result.push(i + 1);
  }

  return result;
};

const PagingControls = (props) => {
  const [pages, setPages] = useState(
    getPageNumbers(props.currentPage, props.totalCount, props.pageSize, [])
  );

  useEffect(() => {
    setPages(
      getPageNumbers(props.currentPage, props.totalCount, props.pageSize, [])
    );
  }, [props.pageSize, props.totalCount]);

  useEffect(() => {
    setPages(
      getPageNumbers(props.currentPage, props.totalCount, props.pageSize, pages)
    );
  }, [props.currentPage]);

  if (props.currentPage < 1) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>The current page index is invalid</AlertTitle>
        <AlertDescription>
          The current page index cannot be lower than 1. It currently is '
          {props.currentPage}'
        </AlertDescription>
      </Alert>
    );
  }

  if (
    props.currentPage > props.totalCount / props.pageSize &&
    props.totalCount > props.pageSize
  ) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>The current page index is invalid</AlertTitle>
        <AlertDescription>
          The current page index cannot be greater than maximum number of pages
          '{Math.floor(props.totalCount / props.pageSize)}'. It currently is '
          {props.currentPage}'
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Stack align="center">
      <Center mt={8}>
        <Box>
          <Text as="ul" listStyleType="none" display="inline-block" p={5}>
            <Box as="li" display="inline">
              <Button
                as="a"
                href="#"
                className="prev"
                fontSize="14px"
                fontWeight="500"
                textDecoration="none"
                px={20}
                py={3}
                color="#fff"
                bg="#468599"
                borderRadius="50px 0 0 50px"
                width="100px"
                _hover={{ bg: "#FFA100", fontWeight: "1000", transform: "translateY(8px)" }}
                _active={{ bg: "#FFA100" }}
                onClick={() => props.onGoToPage(props.currentPage - 1)}
                disabled={props.currentPage - 1 <= 0}
              >
                Previous
              </Button>
            </Box>
            {pages.map((pageNumber) => (
              <Box key={pageNumber} as="li" display="inline">
                <Button
                  as="a"
                  href="#"
                  fontSize="14px"
                  fontWeight="500"
                  textDecoration="none"
                  px={8}
                  py={3}
                  color="#fff"
                  bg={pageNumber === props.currentPage ? "#FFA100" : "#468599"}
                  borderRadius="100%"
                  _hover={{ bg: "#FFA100", fontWeight: "1000", transform: "translateY(8px)" }}
                  _active={{ bg: "#FFA100" }}
                  onClick={() => props.onGoToPage(pageNumber)}
                  variant={pageNumber === props.currentPage ? "solid" : "outline"}
                  mx={10} // Increase gap between buttons
                >
                  {pageNumber}
                </Button>
              </Box>
            ))}
            <Box as="li" display="inline">
              <Button
                as="a"
                href="#"
                className="next"
                fontSize="14px"
                fontWeight="500"
                textDecoration="none"
                px={6}
                py={3}
                color="#fff"
                bg="#468599"
                borderRadius="0 50px 50px 0"
                width="100px"
                _hover={{ bg: "#FFA100", fontWeight: "1000", transform: "translateY(8px)" }}
                _active={{ bg: "#FFA100" }}
                onClick={() => props.onGoToPage(props.currentPage + 1)}
                disabled={Math.max(...pages) + 1 > props.totalCount / props.pageSize}
              >
                Next
              </Button>
            </Box>
          </Text>
        </Box>
      </Center>
      <Text fontWeight="extrabold">
        {props.totalCount} {props.totalCountDescription}
      </Text>
    </Stack>
  );
};

export default PagingControls;
