import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
import { AddIcon, EditIcon } from '@chakra-ui/icons'
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
  const [uploadingImage, setUploadingImage] = useState(false)
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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select an image file',
        status: 'error',
        duration: 3000
      })
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please select an image smaller than 5MB',
        status: 'error',
        duration: 3000
      })
      return
    }

    setUploadingImage(true)

    try {
      const token = localStorage.getItem('dating_token')
      const formDataUpload = new FormData()
      formDataUpload.append('profilePhoto', file)

      const response = await axios.post('http://localhost:5000/api/upload', formDataUpload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      // Update profile with new photo URL
      await axios.put('http://localhost:5000/api/profiles/me', {
        profilePhoto: response.data.fileUrl
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      // Update local user data
      const updatedUser = { ...user, profilePhoto: response.data.fileUrl }
      login(localStorage.getItem('dating_token'))

      toast({
        title: 'Photo uploaded',
        description: 'Your profile photo has been updated',
        status: 'success',
        duration: 3000
      })
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: error.response?.data?.error || 'Failed to upload photo',
        status: 'error',
        duration: 3000
      })
    } finally {
      setUploadingImage(false)
    }
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
          <Box position="relative">
            <Avatar
              size="xl"
              name={formData.name}
              src={user?.profilePhoto ? `http://localhost:5000${user.profilePhoto}` : undefined}
            />
            <IconButton
              icon={<EditIcon />}
              size="sm"
              colorScheme="blue"
              borderRadius="full"
              position="absolute"
              bottom={0}
              right={0}
              onClick={() => document.getElementById('profile-photo-input').click()}
              isLoading={uploadingImage}
              loadingText="Uploading..."
            />
            <Input
              id="profile-photo-input"
              type="file"
              accept="image/*"
              display="none"
              onChange={handleImageUpload}
            />
          </Box>
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

        {!user?.isPaid && (
          <Box
            bg="blue.50"
            borderRadius="lg"
            p={6}
            mt={8}
            textAlign="center"
          >
            <Heading size="md" mb={3} color="blue.600">
              🚀 Ready to Find Your Match?
            </Heading>
            <Text mb={4} color="gray.700">
              Complete your profile and upgrade to premium to start browsing profiles and connecting with potential matches!
            </Text>
            <Button as={Link} to="/payment" colorScheme="blue" size="lg">
              Upgrade to Premium - {user?.gender === 'male' ? '100' : '50'} KSH
            </Button>
          </Box>
        )}
      </VStack>
    </Container>
  )
}

export default Profile