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
  useColorModeValue,
  Icon,
  Flex
} from '@chakra-ui/react'
import { StarIcon, CheckCircleIcon, UnlockIcon } from '@chakra-ui/icons'

const Home = () => {
  const bgGradient = useColorModeValue(
    'linear(to-br, pink.50, purple.50)',
    'linear(to-br, gray.900, purple.900)'
  )

  const cardBg = useColorModeValue('white', 'gray.800')

  return (
    <Box minH="100vh" bgGradient={bgGradient}>
      <Container maxW="container.xl" py={12}>
        <VStack spacing={12} align="center">
          {/* Hero Section */}
          <VStack spacing={6} textAlign="center">
            <Heading
              size="2xl"
              bgGradient="linear(to-r, pink.400, purple.500)"
              bgClip="text"
              fontWeight="extrabold"
            >
              Find Your Perfect Match
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="2xl">
              Join thousands of singles who have found love through our dating platform.
              Create meaningful connections with people who share your interests and values.
            </Text>
            <Flex gap={4} flexWrap="wrap" justify="center">
              <Button
                as={Link}
                to="/login"
                size="lg"
                colorScheme="pink"
                px={8}
                py={6}
                fontSize="lg"
                fontWeight="bold"
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                transition="all 0.2s"
              >
                Login
              </Button>
              <Button
                as={Link}
                to="/register"
                size="lg"
                variant="outline"
                colorScheme="purple"
                px={8}
                py={6}
                fontSize="lg"
                fontWeight="bold"
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                transition="all 0.2s"
              >
                Sign Up Free
              </Button>
            </Flex>
          </VStack>

          {/* Features Section */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8} w="full" maxW="4xl">
            <GridItem>
              <Card bg={cardBg} shadow="lg" _hover={{ transform: 'translateY(-4px)' }} transition="all 0.3s">
                <CardBody textAlign="center" py={8}>
                  <Icon as={StarIcon} w={12} h={12} color="pink.500" mb={4} />
                  <Heading size="md" mb={3}>Smart Matching</Heading>
                  <Text color="gray.600">
                    Our advanced algorithm finds compatible matches based on your preferences and personality.
                  </Text>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem>
              <Card bg={cardBg} shadow="lg" _hover={{ transform: 'translateY(-4px)' }} transition="all 0.3s">
                <CardBody textAlign="center" py={8}>
                  <Icon as={CheckCircleIcon} w={12} h={12} color="purple.500" mb={4} />
                  <Heading size="md" mb={3}>Verified Profiles</Heading>
                  <Text color="gray.600">
                    All profiles are verified to ensure you meet real people with genuine intentions.
                  </Text>
                </CardBody>
              </Card>
            </GridItem>

            <GridItem>
              <Card bg={cardBg} shadow="lg" _hover={{ transform: 'translateY(-4px)' }} transition="all 0.3s">
                <CardBody textAlign="center" py={8}>
                  <Icon as={UnlockIcon} w={12} h={12} color="blue.500" mb={4} />
                  <Heading size="md" mb={3}>Premium Features</Heading>
                  <Text color="gray.600">
                    Unlock unlimited matches, advanced filters, and priority support with premium.
                  </Text>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>

          {/* Call to Action */}
          <Box textAlign="center" py={8}>
            <Text fontSize="lg" color="gray.600" mb={4}>
              Ready to find love? Join our community today!
            </Text>
            <Button
              as={Link}
              to="/register"
              size="lg"
              colorScheme="purple"
              variant="solid"
              px={8}
              py={6}
              fontSize="lg"
              fontWeight="bold"
              _hover={{ transform: 'scale(1.05)' }}
              transition="all 0.2s"
            >
              Get Started Now
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default Home