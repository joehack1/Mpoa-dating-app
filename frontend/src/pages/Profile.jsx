import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  VStack,
  Heading,
  Text,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
  InputGroup,
  InputRightElement,
  useToast,
  Spinner,
  Center,
  Avatar
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { user, login } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    birthYear: '',
    interests: []
  })
  const [newInterest, setNewInterest] = useState('')
  const toast = useToast()

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        birthYear: user.birthYear || '',
        interests: user.interests || []
      })
      setLoading(false)
    }
  }, [user])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }))
      setNewInterest('')
    }
  }

  const handleRemoveInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const token = localStorage.getItem('dating_token')
      const response = await axios.put('http://localhost:5000/api/profiles/me', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      // Update user in context
      login(response.data.token)

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully',
        status: 'success',
        duration: 3000,
        position: 'top-right'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        status: 'error',
        duration: 3000,
        position: 'top-right'
      })
    } finally {
      setSaving(false)
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
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="xl" mb={2}>Edit Profile</Heading>
          <Text fontSize="lg" color="gray.600">Update your information to attract better matches</Text>
        </Box>

        <Box display="flex" justifyContent="center" mb={6}>
          <Avatar size="xl" name={formData.name} />
        </Box>

        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={6}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your full name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Birth Year</FormLabel>
              <NumberInput
                value={formData.birthYear}
                onChange={(valueString) => handleInputChange('birthYear', parseInt(valueString) || '')}
                min={1900}
                max={new Date().getFullYear()}
              >
                <NumberInputField placeholder="1990" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell others about yourself..."
                rows={4}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Interests</FormLabel>
              <HStack spacing={2} mb={2}>
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Add an interest"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
                />
                <Button onClick={handleAddInterest} colorScheme="blue">
                  <AddIcon />
                </Button>
              </HStack>
              <HStack spacing={2} flexWrap="wrap">
                {formData.interests.map((interest, index) => (
                  <Tag key={index} size="md" colorScheme="blue">
                    <TagLabel>{interest}</TagLabel>
                    <TagCloseButton onClick={() => handleRemoveInterest(interest)} />
                  </Tag>
                ))}
              </HStack>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              w="full"
              isLoading={saving}
              loadingText="Saving..."
            >
              Save Profile
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default Profile