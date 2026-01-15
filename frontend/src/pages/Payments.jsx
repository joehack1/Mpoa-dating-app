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
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Progress,
  Icon
} from '@chakra-ui/react'
import { CheckCircleIcon, StarIcon, PhoneIcon } from '@chakra-ui/icons'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const Payment = () => {
  const [loading, setLoading] = useState(false)
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [simulating, setSimulating] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const amount = user?.gender === 'male' ? 100 : 50

  const handleTestPayment = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('dating_token')
      const response = await axios.post('http://localhost:5000/api/payments/complete-test-payment', {}, {
        headers: { Authorization: `Bearer ${token}` }
      })

      toast({
        title: 'Payment Successful! 🎉',
        description: response.data.message,
        status: 'success',
        duration: 5000,
        position: 'top-right'
      })

      setPaymentCompleted(true)

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)

    } catch (error) {
      toast({
        title: 'Payment Failed',
        description: error.response?.data?.error || 'Something went wrong',
        status: 'error',
        duration: 5000,
        position: 'top-right'
      })
    } finally {
      setLoading(false)
    }
  }

  if (paymentCompleted) {
    return (
      <Container maxW="container.md" py={12}>
        <VStack spacing={8} textAlign="center">
          <Icon as={CheckCircleIcon} w={16} h={16} color="green.500" />
          <Heading size="xl" color="green.500">Payment Successful!</Heading>
          <Text fontSize="lg">
            Welcome to premium! You now have access to all features.
          </Text>
          <Text>Redirecting to dashboard...</Text>
          <Progress size="lg" isIndeterminate colorScheme="green" w="full" />
        </VStack>
      </Container>
    )
  }

  return (
    <Container maxW="container.md" py={12}>
      <VStack spacing={8}>
        <Box textAlign="center">
          <Heading size="2xl" mb={4}>Upgrade to Premium</Heading>
          <Text fontSize="lg" color="gray.600" mb={6}>
            Unlock unlimited profile browsing and advanced features
          </Text>
        </Box>

        <Card shadow="xl">
          <CardHeader textAlign="center">
            <VStack spacing={4}>
              <Icon as={StarIcon} w={12} h={12} color="yellow.400" />
              <Heading size="lg">Premium Membership</Heading>
              <Badge colorScheme="purple" fontSize="lg" px={4} py={2}>
                {amount} KSH
              </Badge>
            </VStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={6}>
              <Box textAlign="center">
                <Text fontSize="sm" color="gray.600" mb={4}>
                  Gender-based pricing for fairness
                </Text>
                <Text fontSize="3xl" fontWeight="bold" color="purple.500">
                  {amount} KSH
                </Text>
                <Text fontSize="sm" color="gray.500">
                  One-time payment
                </Text>
              </Box>

              <VStack spacing={3} align="start" w="full">
                <Text fontWeight="bold">What you get:</Text>
                <Text>✓ Browse all user profiles</Text>
                <Text>✓ Send and receive messages</Text>
                <Text>✓ Advanced search filters</Text>
                <Text>✓ See who viewed your profile</Text>
                <Text>✓ Premium customer support</Text>
              </VStack>

              <Alert status="info" borderRadius="md">
                <AlertIcon />
                <Box>
                  <AlertTitle>Test Mode!</AlertTitle>
                  <AlertDescription>
                    This is a test payment system. Click the button below to simulate a successful payment.
                  </AlertDescription>
                </Box>
              </Alert>

              <Button
                colorScheme="purple"
                size="lg"
                w="full"
                onClick={handleTestPayment}
                isLoading={loading}
                loadingText="Processing Payment..."
                leftIcon={<StarIcon />}
              >
                Complete Test Payment - {amount} KSH
              </Button>

              <Text fontSize="sm" color="gray.500" textAlign="center">
                By completing this payment, you agree to our terms of service.
                Payment is non-refundable.
              </Text>
            </VStack>
          </CardBody>
        </Card>

        <Button variant="ghost" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </Button>
      </VStack>
    </Container>
  )
}

export default Payment