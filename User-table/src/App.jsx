import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserTable from './Components/UserTable'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <UserTable/>
    </>
  )
}

export default App
