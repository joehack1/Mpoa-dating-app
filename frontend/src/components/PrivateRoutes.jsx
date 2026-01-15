import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Spinner, Center } from '@chakra-ui/react'

const PrivateRoute = ({ children }) => {
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

  // Check if user has paid
  if (!user.isPaid && window.location.pathname !== '/payment') {
    return <Navigate to="/payment" />
  }

  return children
}

export default PrivateRoute