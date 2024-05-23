import { InputGroup, Input, InputRightElement, Icon } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <InputGroup>
      <Input
        placeholder="Search characters"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <InputRightElement>
        <Icon as={SearchIcon} />
      </InputRightElement>
    </InputGroup>
  );
};

export default Search;
