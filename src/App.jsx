import Home from './components/routes/home/home.component.jsx';
import { Routes, Route } from "react-router";
import  Navigation  from './components/routes/navigation/navigation.component.jsx'


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />} >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
