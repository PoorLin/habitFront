import { Index } from './component/Index'
import { Router } from './component/Router'
import 'bulma/css/bulma.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './auth/AuthProvider'
function App() {
  return (
          <>
             <GoogleOAuthProvider clientId="873017901473-qtqt7mm3e19d5g4kg1pft64briiblb53.apps.googleusercontent.com">
<AuthProvider>
               <Router />
               
               </AuthProvider>
               </GoogleOAuthProvider>
          </>


  )
}

export default App
