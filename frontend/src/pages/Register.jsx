import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  Text,
  useToast,
  Container,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  InputGroup,
  InputRightAddon,
  SimpleGrid
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    phone: '254',
    age: '',
    profession: ''
  })
  const [hobbies, setHobbies] = useState([])
  const [currentHobby, setCurrentHobby] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const addHobby = () => {
    if (currentHobby.trim() && !hobbies.includes(currentHobby.trim())) {
      setHobbies([...hobbies, currentHobby.trim()])
      setCurrentHobby('')
    }
  }

  const removeHobby = (hobby) => {
    setHobbies(hobbies.filter(h => h !== hobby))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.gender || 
        !formData.phone || !formData.age || !formData.profession) {
      toast({
        title: 'Missing information',
        description: 'Please fill all required fields',
        status: 'warning',
        duration: 3000,
        position: 'top-right'
      })
      return
    }

    if (parseInt(formData.age) < 18) {
      toast({
        title: 'Age restriction',
        description: 'You must be at least 18 years old',
        status: 'warning',
        duration: 3000,
        position: 'top-right'
      })
      return
    }

    setLoading(true)

    const userData = {
      ...formData,
      hobbies,
      age: parseInt(formData.age),
      phone: formData.phone.startsWith('254') ? formData.phone : `254${formData.phone}`
    }

    const result = await register(userData)

    if (result.success) {
      toast({
        title: 'Welcome! 🎉',
        description: `Registration successful. ${formData.gender === 'male' ? '100' : '50'} KSH payment required to activate account.`,
        status: 'success',
        duration: 5000,
        position: 'top-right'
      })
      navigate('/payment')
    } else {
      toast({
        title: 'Registration failed',
        description: result.error,
        status: 'error',
        duration: 5000,
        position: 'top-right'
      })
    }
    setLoading(false)
  }

  return (
    <Container maxW="container.lg" minH="100vh" py={10}>
      <Box
        bg="white"
        borderRadius="2xl"
        p={{ base: 6, md: 10 }}
        boxShadow="2xl"
      >
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <VStack spacing={2} textAlign="center">
            <Heading size="xl" bgGradient="linear(to-r, brand.500, pink.500)" bgClip="text">
              Create Your Dating Profile
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Join thousands finding love. Men: 100 KSH | Women: 50 KSH
            </Text>
          </VStack>

          {/* Registration Form */}
          <form onSubmit={handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {/* Left Column */}
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    size="lg"
                    borderRadius="lg"
                    focusBorderColor="brand.500"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    size="lg"
                    borderRadius="lg"
                    focusBorderColor="brand.500"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    size="lg"
                    borderRadius="lg"
                    focusBorderColor="brand.500"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Gender & Pricing</FormLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    placeholder="Select your gender"
                    size="lg"
                    borderRadius="lg"
                    focusBorderColor="brand.500"
                  >
                    <option value="male">Male - 100 KSH</option>
                    <option value="female">Female - 50 KSH</option>
                  </Select>
                </FormControl>
              </VStack>

              {/* Right Column */}
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Phone Number (M-Pesa)</FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="254700000000"
                      borderRadius="lg"
                      focusBorderColor="brand.500"
                    />
                    <InputRightAddon children="+254" />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Age</FormLabel>
                  <Input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="18+"
                    min="18"
                    max="100"
                    size="lg"
                    borderRadius="lg"
                    focusBorderColor="brand.500"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Profession</FormLabel>
                  <Input
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    placeholder="Software Developer"
                    size="lg"
                    borderRadius="lg"
                    focusBorderColor="brand.500"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Hobbies & Interests</FormLabel>
                  <VStack spacing={2} align="stretch">
                    <HStack>
                      <Input
                        value={currentHobby}
                        onChange={(e) => setCurrentHobby(e.target.value)}
                        placeholder="e.g., Hiking, Music"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHobby())}
                        size="lg"
                        borderRadius="lg"
                      />
                      <Button
                        onClick={addHobby}
                        leftIcon={<AddIcon />}
                        colorScheme="brand"
                        borderRadius="lg"
                      >
                        Add
                      </Button>
                    </HStack>
                    
                    {hobbies.length > 0 && (
                      <Box p={3} bg="gray.50" borderRadius="lg">
                        <Text fontSize="sm" color="gray.600" mb={2}>
                          Your hobbies:
                        </Text>
                        <HStack spacing={2} wrap="wrap">
                          {hobbies.map((hobby, index) => (
                            <Tag
                              key={index}
                              size="lg"
                              borderRadius="full"
                              variant="solid"
                              colorScheme="brand"
                            >
                              <TagLabel>{hobby}</TagLabel>
                              <TagCloseButton onClick={() => removeHobby(hobby)} />
                            </Tag>
                          ))}
                        </HStack>
                      </Box>
                    )}
                  </VStack>
                </FormControl>
              </VStack>
            </SimpleGrid>

            {/* Submit Button */}
            <VStack spacing={4} mt={8}>
              <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                w="100%"
                maxW="400px"
                mx="auto"
                isLoading={loading}
                loadingText="Creating profile..."
                bgGradient="linear(to-r, brand.500, pink.500)"
                _hover={{
                  bgGradient: "linear(to-r, brand.600, pink.600)",
                  transform: 'translateY(-2px)',
                  boxShadow: 'xl'
                }}
                transition="all 0.3s"
                borderRadius="lg"
              >
                Create Profile & Continue to Payment
              </Button>

              <Text color="gray.600">
                Already have an account?{' '}
                <Link to="/login">
                  <Text as="span" color="brand.500" fontWeight="semibold" _hover={{ textDecoration: 'underline' }}>
                    Sign in here
                  </Text>
                </Link>
              </Text>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Container>
  )
}

export default Register