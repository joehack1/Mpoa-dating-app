import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
  CardFooter,
  Avatar,
  Badge,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const [stats, setStats] = useState({ profilesViewed: 0, matches: 0 })
  const toast = useToast()

  useEffect(() => {
    // Fetch user stats
    // For now, mock data
    setStats({ profilesViewed: 15, matches: 3 })
  }, [])

  const handleLogout = async () => {
    await logout()
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
      status: 'success',
      duration: 3000,
      position: 'top-right'
    })
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {!user?.isPaid && (
          <Alert status="info" borderRadius="lg">
            <AlertIcon />
            <Box>
              <AlertTitle>Upgrade to Premium!</AlertTitle>
              <AlertDescription>
                Unlock profile browsing and advanced features. Only {user?.gender === 'male' ? '100' : '50'} KSH to find your perfect match!
              </AlertDescription>
            </Box>
            <Button as={Link} to="/payment" colorScheme="blue" size="sm" ml={4}>
              Upgrade Now
            </Button>
          </Alert>
        )}

        <Box textAlign="center">
          <Heading size="xl" mb={2}>Welcome back, {user?.name}!</Heading>
          <Text fontSize="lg" color="gray.600">
            {user?.isPaid ? 'Ready to find your perfect match?' : 'Complete your profile and upgrade to start browsing!'}
          </Text>
        </Box>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
          <GridItem>
            <Card>
              <CardHeader>
                <Heading size="md">Your Stats</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4}>
                  {user?.isPaid ? (
                    <>
                      <Box textAlign="center">
                        <Text fontSize="3xl" fontWeight="bold" color="blue.500">{stats.profilesViewed}</Text>
                        <Text color="gray.600">Profiles Viewed</Text>
                      </Box>
                      <Box textAlign="center">
                        <Text fontSize="3xl" fontWeight="bold" color="green.500">{stats.matches}</Text>
                        <Text color="gray.600">Matches</Text>
                      </Box>
                    </>
                  ) : (
                    <Box textAlign="center">
                      <Text fontSize="2xl" fontWeight="bold" color="gray.400">🔒</Text>
                      <Text color="gray.600" fontSize="sm">Upgrade to view stats</Text>
                    </Box>
                  )}
                </VStack>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem>
            <Card>
              <CardHeader>
                <Heading size="md">Quick Actions</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4}>
                  {user?.isPaid ? (
                    <Button as={Link} to="/browse" colorScheme="blue" w="full">
                      Browse Profiles
                    </Button>
                  ) : (
                    <Button as={Link} to="/payment" colorScheme="blue" w="full" leftIcon={<span>🔒</span>}>
                      Unlock Profiles
                    </Button>
                  )}
                  <Button as={Link} to="/profile" colorScheme="green" w="full">
                    Edit Profile
                  </Button>
                  <Button onClick={handleLogout} colorScheme="red" w="full">
                    Logout
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem>
            <Card>
              <CardHeader>
                <Heading size="md">Premium Features</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4}>
                  {user?.isPaid ? (
                    <>
                      <Text>🎉 Premium member - enjoy all features!</Text>
                      <Badge colorScheme="green">Active</Badge>
                    </>
                  ) : (
                    <>
                      <Text>🔒 Unlock these premium features:</Text>
                      <VStack spacing={2} align="start" fontSize="sm">
                        <Text>✓ Browse all profiles</Text>
                        <Text>✓ Send messages</Text>
                        <Text>✓ Advanced filters</Text>
                        <Text>✓ See who viewed you</Text>
                      </VStack>
                      <Badge colorScheme="orange">Free Account</Badge>
                      <Button as={Link} to="/payment" colorScheme="purple" w="full" size="sm">
                        Upgrade Now - {user?.gender === 'male' ? '100' : '50'} KSH
                      </Button>
                    </>
                  )}
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </VStack>
    </Container>
  )
}

export default Dashboard