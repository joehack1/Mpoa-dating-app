import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  VStack,
  Heading,
  Text,
  Container,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useToast,
  Spinner,
  Center
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const Browse = () => {
  const { user } = useAuth()
  const [profiles, setProfiles] = useState([])
  const [filteredProfiles, setFilteredProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterAge, setFilterAge] = useState('')
  const toast = useToast()

  useEffect(() => {
    fetchProfiles()
  }, [])

  useEffect(() => {
    filterProfiles()
  }, [profiles, searchTerm, filterAge])

  const fetchProfiles = async () => {
    try {
      const token = localStorage.getItem('dating_token')
      const response = await axios.get('http://localhost:5000/api/profiles', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProfiles(response.data.filter(p => p._id !== user._id))
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load profiles',
        status: 'error',
        duration: 3000,
        position: 'top-right'
      })
    } finally {
      setLoading(false)
    }
  }

  const filterProfiles = () => {
    let filtered = profiles

    if (searchTerm) {
      filtered = filtered.filter(profile =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.bio?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterAge) {
      const currentYear = new Date().getFullYear()
      const minBirthYear = currentYear - parseInt(filterAge.split('-')[1])
      const maxBirthYear = currentYear - parseInt(filterAge.split('-')[0])
      filtered = filtered.filter(profile => {
        if (!profile.birthYear) return true
        return profile.birthYear >= maxBirthYear && profile.birthYear <= minBirthYear
      })
    }

    setFilteredProfiles(filtered)
  }

  const handleLike = async (profileId) => {
    try {
      const token = localStorage.getItem('dating_token')
      await axios.post(`http://localhost:5000/api/profiles/${profileId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast({
        title: 'Liked!',
        description: 'Profile liked successfully',
        status: 'success',
        duration: 2000,
        position: 'top-right'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to like profile',
        status: 'error',
        duration: 3000,
        position: 'top-right'
      })
    }
  }

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    )
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="xl" mb={2}>Browse Profiles</Heading>
          <Text fontSize="lg" color="gray.600">Find your perfect match</Text>
        </Box>

        <Box>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} mb={6}>
            <GridItem>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Search by name or bio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </GridItem>
            <GridItem>
              <Select placeholder="Filter by age" value={filterAge} onChange={(e) => setFilterAge(e.target.value)}>
                <option value="18-25">18-25 years</option>
                <option value="26-35">26-35 years</option>
                <option value="36-45">36-45 years</option>
                <option value="46-60">46-60 years</option>
              </Select>
            </GridItem>
          </Grid>
        </Box>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
          {filteredProfiles.map((profile) => (
            <GridItem key={profile._id}>
              <Card>
                <CardHeader>
                  <Box display="flex" alignItems="center">
                    <Avatar size="lg" name={profile.name} mr={4} />
                    <Box>
                      <Heading size="md">{profile.name}</Heading>
                      {profile.birthYear && (
                        <Text fontSize="sm" color="gray.600">
                          {new Date().getFullYear() - profile.birthYear} years old
                        </Text>
                      )}
                    </Box>
                  </Box>
                </CardHeader>
                <CardBody>
                  <Text mb={4}>{profile.bio || 'No bio available'}</Text>
                  <Box>
                    <Badge colorScheme="blue" mr={2}>Active</Badge>
                    {profile.interests?.length > 0 && (
                      <Badge colorScheme="green">
                        {profile.interests.length} interests
                      </Badge>
                    )}
                  </Box>
                </CardBody>
                <CardFooter>
                  <Button
                    colorScheme="pink"
                    onClick={() => handleLike(profile._id)}
                    w="full"
                  >
                    Like Profile
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
        </Grid>

        {filteredProfiles.length === 0 && !loading && (
          <Box textAlign="center" py={8}>
            <Text fontSize="lg" color="gray.600">No profiles found matching your criteria.</Text>
          </Box>
        )}
      </VStack>
    </Container>
  )
}

export default Browse