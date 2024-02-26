import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Cookies from 'js-cookie';
import Contents from "./Components/Contents";
import Account from './Components/Account';
import Add from "./Components/Add";
import Update from "./Components/Update";
import Home from "./Components/Home";
import Signup from './Components/Signup';
import Loginu from './Components/Loginu';
import Logine from './Components/Logine';
import Forgot from './Components/Forgot';
import { UserProvider } from './Components/UserContext';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PageNotFound from './Components/PageNotFound';

const dark = createTheme({
  palette: {
    mode: 'dark'
  }
});

function App() {
  const [auth, setAuth] = useState(false);
  const checkAuth = () => {
    const user = Cookies.get('user');
    const token = Cookies.get('token');
    if ((!user || !token)) {
      setAuth(false);
    } else {
      axios.get('http://localhost:8000/protected', { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => { setAuth(true); })
        .catch((err) => { setAuth(false); })
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <ThemeProvider theme={dark}>
      <CssBaseline />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/forgotpassword' element={<Forgot />}></Route>
            <Route path="/" element={<Home />} />
            <Route path='/pagenotfound' element={<PageNotFound />} />
            <Route path="/loginu" element={<Loginu checkAuth={checkAuth} />} />
            <Route path="/logine" element={<Logine checkAuth={checkAuth} />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/changepassword"
              element={auth ? <Account /> : <PageNotFound />}
            />
            <Route
              path="/task"
              element={auth ? <Contents /> : <PageNotFound />}
            />
            <Route
              path="/add"
              element={auth ? <Add /> : <PageNotFound />}
            />
            <Route
              path="/update/:sno"
              element={auth ? <Update /> : <PageNotFound />}
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;