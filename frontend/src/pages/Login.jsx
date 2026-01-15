import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Container,
  Image,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = await login(email, password)

    if (result.success) {
      toast({
        title: 'Welcome back!',
        description: 'Login successful',
        status: 'success',
        duration: 3000,
        position: 'top-right'
      })
      
      // Check if user has paid
      if (result.data.user.isPaid) {
        navigate('/dashboard')
      } else {
        navigate('/payment')
      }
    } else {
      toast({
        title: 'Login failed',
        description: result.error,
        status: 'error',
        duration: 5000,
        position: 'top-right'
      })
    }
    setLoading(false)
  }

  return (
    <Container maxW="container.md" minH="100vh" display="flex" alignItems="center">
      <Box
        w="100%"
        bg="white"
        borderRadius="2xl"
        p={{ base: 6, md: 10 }}
        boxShadow="2xl"
      >
        <VStack spacing={8}>
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <Box position="relative">
              <Box
                w="60px"
                h="60px"
                bg="brand.500"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mx="auto"
                mb={4}
              >
                <Text fontSize="2xl" fontWeight="bold" color="white">♥</Text>
              </Box>
              <Heading size="xl" bgGradient="linear(to-r, brand.500, pink.500)" bgClip="text">
                Welcome Back
              </Heading>
            </Box>
            <Text color="gray.600">
              Find your soulmate today. Sign in to continue.
            </Text>
          </VStack>

          {/* Login Form */}
          <Box w="100%" maxW="400px">
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <FormControl isRequired>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    size="lg"
                    borderRadius="lg"
                    focusBorderColor="brand.500"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      size="lg"
                      borderRadius="lg"
                      focusBorderColor="brand.500"
                    />
                    <InputRightElement h="full">
                      <IconButton
                        variant="ghost"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="brand"
                  size="lg"
                  w="100%"
                  isLoading={loading}
                  loadingText="Signing in..."
                  borderRadius="lg"
                  bgGradient="linear(to-r, brand.500, pink.500)"
                  _hover={{
                    bgGradient: "linear(to-r, brand.600, pink.600)",
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg'
                  }}
                  transition="all 0.3s"
                >
                  Sign In
                </Button>
              </VStack>
            </form>

            <VStack spacing={4} mt={8}>
              <Text color="gray.600">
                Don't have an account?{' '}
                <Link to="/register">
                  <Text as="span" color="brand.500" fontWeight="semibold" _hover={{ textDecoration: 'underline' }}>
                    Create one now
                  </Text>
                </Link>
              </Text>
              
              {/* Demo credentials */}
              <Box
                p={4}
                bg="gray.50"
                borderRadius="lg"
                w="100%"
                textAlign="center"
              >
                <Text fontSize="sm" color="gray.600" mb={2}>
                  Demo Credentials:
                </Text>
                <Text fontSize="xs" color="gray.500">
                  test@example.com / password123
                </Text>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Container>
  )
}

export default Login