import React from 'react';
import {useRoutes} from 'react-router-dom'
import { Container} from '@material-ui/core';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { routes } from './routes';

function App() {
  const element = useRoutes(routes)
  return (
    <Container maxWidth="xl">
      <Navbar/>
      {element}
    </Container>
  )
}

export default App