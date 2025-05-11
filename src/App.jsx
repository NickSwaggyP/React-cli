import React, { lazy, Suspense } from 'react';

// import Home from './pages/Home';
// import About from './pages/About';
import { Route, Link,Routes} from 'react-router-dom'

const Home=lazy(()=> import(/* webpackChunkName:'home' */ "./pages/Home"))
const About=lazy(()=> import(/* webpackChunkName:'about' */ "./pages/About"))

function App(){
    return (
       <div>
            <h1>App---</h1>

            <ul>
                <li>
                    <Link to="/home">home</Link>
                </li>
                <li>
                    <Link to="/about">about</Link>
                </li>
            </ul>

            <Suspense fallback={<div>loading...</div>}>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Suspense>
       </div> 
       )
}

export default App;