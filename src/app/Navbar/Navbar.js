"use client";

import React, { useState } from 'react';
import { Flex, Button, Input, Switch, IconButton, useColorMode, Icon, Image } from '@chakra-ui/react';
import Link from 'next/link';

function Navbar({ onSearch }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        bg="gray.300"
        p={4}
        mb={6}
        backgroundColor="#AF15DC"
        color="red"
      >
        <Image
          src="/starbg.png"
          alt="Star Wars Banner"
          w="100px"
          objectFit="cover"
          mt={4}
          h="50px"
        />
        <Flex align="center">
          <ul style={{ display: 'flex', listStyle: 'none', marginLeft: 0, padding: 0, color: 'green' }}>
            <li style={{ marginRight: '20px' }}>
              <Link href={'/'}>
                Home
              </Link>
            </li>
            <li>
              <Link href={'/characters'}>
                Characters
              </Link>
            </li>
          </ul>
        </Flex>
        <Flex align="center">
          <IconButton
            aria-label="Toggle dark mode"
            // icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            colorScheme="teal"
            ml={4}
          />
          <Switch
            size="lg"
            colorScheme="teal"
            isChecked={colorMode === 'dark'}
            onChange={toggleColorMode}
            ml={2}
          />
        </Flex>
      </Flex>
    </div>
  );
}

export default Navbar;
