import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  VStack,
  Heading,
  Text,
  useToast,
  Container,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Icon,
  Progress,
  SimpleGrid,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'
import { CheckCircleIcon, PhoneIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const Payment = () => {
  const [loading, setLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [simulating, setSimulating] = useState(false)
  const { user, API_URL } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const amount = user?.gender === 'male' ? 100 : 50

  const simulatePayment = async () => {
    if (!user?.phone) {
      toast({
        title: 'Phone number required',
        description: 'Please update your profile with a phone number',
        status: 'warning',
        duration: 5000
      })
      return
    }

    setSimulating(true)
    
    try {
      const token = localStorage.getItem('dating_token')
      const response = await axios.post(
        `${API_URL}/payments/simulate-payment`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      toast({
        title: 'Payment Successful!',
        description: `You have paid ${amount} KSH`,
        status: 'success',
        duration: 5000
      })

      setPaymentStatus('success')
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/')
      }, 2000)

    } catch (error) {
      toast({
        title: 'Payment Failed',
        description: error.response?.data?.error || 'Payment simulation failed',
        status: 'error',
        duration: 5000
      })
      setPaymentStatus('failed')
    } finally {
      setSimulating(false)
    }
  }

  const handleMpesaPayment = async () => {
    toast({
      title: 'M-Pesa Integration',
      description: 'Connect your M-Pesa API credentials in backend',
      status: 'info',
      duration: 5000
    })
  }

  const paymentMethods = [
    {
      id: 'mpesa',
      name: 'M-Pesa',
      icon: '📱',
      color: 'green',
      description: 'Pay via M-Pesa STK Push',
      action: handleMpesaPayment
    },
    {
      id: 'simulate',
      name: 'Simulate Payment',
      icon: '🧪',
      color: 'blue',
      description: 'Test payment (for development)',
      action: simulatePayment
    }
  ]

  if (user?.isPaid) {
    return (
      <Container maxW="container.md" minH="100vh" display="flex" alignItems="center">
        <Card w="100%" borderRadius="2xl" boxShadow="2xl">
          <CardBody p={10}>
            <VStack spacing={8} textAlign="center">
              <Box
                w="100px"
                h="100px"
                bg="green.100"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={CheckCircleIcon} w={16} h={16} color="green.500" />
              </Box>
              
              <VStack spacing={4}>
                <Heading size="xl" color="green.600">
                  Payment Verified! ✅
                </Heading>
                <Text fontSize="lg" color="gray.600">
                  Your account is fully activated. Welcome to the community!
                </Text>
                <Badge colorScheme="green" fontSize="lg" p={2} borderRadius="lg">
                  Paid: {amount} KSH
                </Badge>
              </VStack>

              <Button
                colorScheme="brand"
                size="lg"
                rightIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/')}
                bgGradient="linear(to-r, brand.500, pink.500)"
                _hover={{
                  bgGradient: "linear(to-r, brand.600, pink.600)",
                  transform: 'translateY(-2px)'
                }}
                transition="all 0.3s"
                borderRadius="lg"
              >
                Browse Profiles
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </Container>
    )
  }

  return (
    <Container maxW="container.lg" minH="100vh" py={10}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <VStack spacing={4} textAlign="center">
          <Heading size="xl" bgGradient="linear(to-r, brand.500, pink.500)" bgClip="text">
            Complete Your Registration
          </Heading>
          <Text fontSize="lg" color="gray.600">
            One-time payment required to activate your account
          </Text>
        </VStack>

        {/* Payment Amount Card */}
        <Card borderRadius="2xl" boxShadow="xl" border="2px" borderColor="brand.100">
          <CardBody>
            <VStack spacing={6}>
              <Box textAlign="center">
                <Text fontSize="sm" color="gray.500" mb={2}>
                  Payment Amount for {user?.gender === 'male' ? 'Men' : 'Women'}
                </Text>
                <Heading size="2xl" color="brand.500">
                  {amount} KSH
                </Heading>
                <Text fontSize="sm" color="gray.600" mt={2}>
                  One-time payment • Full access forever
                </Text>
              </Box>

              <Progress 
                value={paymentStatus === 'success' ? 100 : 50} 
                size="lg" 
                colorScheme="brand" 
                borderRadius="full"
                w="100%"
              />
              <HStack spacing={8} fontSize="sm" color="gray.600">
                <Text>Register</Text>
                <Text fontWeight="bold" color="brand.500">Payment</Text>
                <Text>Browse</Text>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Benefits */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {[
            'Unlimited profile browsing',
            'Photo uploads',
            'Secure messaging',
            'Verified profiles only',
            '24/7 customer support',
            'Money-back guarantee'
          ].map((benefit, index) => (
            <Card key={index} borderRadius="lg" variant="outline">
              <CardBody>
                <HStack>
                  <Icon as={CheckCircleIcon} color="green.500" />
                  <Text>{benefit}</Text>
                </HStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        {/* Payment Methods */}
        <Card borderRadius="2xl" boxShadow="xl">
          <CardHeader>
            <Heading size="md">Choose Payment Method</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              {paymentMethods.map((method) => (
                <Card
                  key={method.id}
                  w="100%"
                  borderRadius="lg"
                  border="2px"
                  borderColor={method.color + '.200'}
                  _hover={{
                    borderColor: method.color + '.500',
                    transform: 'translateY(-2px)',
                    cursor: 'pointer'
                  }}
                  transition="all 0.3s"
                  onClick={method.action}
                >
                  <CardBody>
                    <HStack spacing={4}>
                      <Box fontSize="2xl">{method.icon}</Box>
                      <VStack align="start" spacing={1} flex={1}>
                        <HStack>
                          <Text fontWeight="bold">{method.name}</Text>
                          {method.id === 'simulate' && (
                            <Badge colorScheme="blue" fontSize="xs">TEST</Badge>
                          )}
                        </HStack>
                        <Text fontSize="sm" color="gray.600">{method.description}</Text>
                      </VStack>
                      <ArrowForwardIcon />
                    </HStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>

            {/* Development Note */}
            <Alert status="info" borderRadius="lg" mt={6}>
              <AlertIcon />
              <Box>
                <AlertTitle>Development Mode</AlertTitle>
                <AlertDescription>
                  Use "Simulate Payment" for testing. For real M-Pesa payments, add your Daraja API credentials.
                </AlertDescription>
              </Box>
            </Alert>
          </CardBody>
        </Card>

        {/* Simulate Button */}
        <Button
          colorScheme="brand"
          size="lg"
          onClick={simulatePayment}
          isLoading={simulating}
          loadingText="Processing payment..."
          leftIcon={<PhoneIcon />}
          bgGradient="linear(to-r, brand.500, pink.500)"
          _hover={{
            bgGradient: "linear(to-r, brand.600, pink.600)",
            transform: 'translateY(-2px)',
            boxShadow: 'xl'
          }}
          transition="all 0.3s"
          borderRadius="lg"
        >
          Simulate Payment ({amount} KSH)
        </Button>
      </VStack>
    </Container>
  )
}

export default Payment