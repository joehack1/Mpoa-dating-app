import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Spinner, Center } from '@chakra-ui/react'

const PrivateRoute = ({ children, requirePayment = false }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="brand.500" />
      </Center>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  // Only redirect to payment for routes that explicitly require payment
  if (requirePayment && !user.isPaid && window.location.pathname !== '/payment') {
    return <Navigate to="/payment" />
  }

  return children
}

export default PrivateRoute