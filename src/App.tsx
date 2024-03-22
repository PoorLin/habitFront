import { Router } from './component/Router'
import 'bulma/css/bulma.css'
import { GoogleOAuthProvider } from '@react-oauth/google'


function App() {

  return (

    <>
      <GoogleOAuthProvider clientId="873017901473-qtqt7mm3e19d5g4kg1pft64briiblb53.apps.googleusercontent.com">
        <Router />
      </GoogleOAuthProvider>
    </>


  )
}

export default App
