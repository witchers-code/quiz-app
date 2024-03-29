import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './style/index.scss';
// Redux
import { Provider } from 'react-redux';
import { store } from './app/store';
// Pages
import ResultPage from './pages/ResultPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/Private/PrivateRoute';
import TestPage from './pages/TestPage';
import AuthWrapper from './components/AuthWrapper/AuthWrapper';
// import AdminPage from "./pages/Admin/AdminPage";
// import SignInPromo from "./pages/SignInPromo";
import DeveloperPage from './pages/DeveloperPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ReactGA from 'react-ga';
import { useEffect } from 'react';
// import PrivacyPolicy from "./pages/PrivacyPolicy";
import BloggerPage from './pages/BloggerPage';
import ExplorePage from './pages/ExplorePage';
import PicFullscreen from './components/XT/PicFullscreen/PicFullscreen';
import SignUpPage from './pages/SignUpPage';
import BloggerCreatePage from './pages/BloggerCreatePage';
const TRACKING_ID = 'G-X99CC06EWN';
ReactGA.initialize(TRACKING_ID);

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<AuthWrapper />}>
            {['/'].map((path, index) => (
              <Route
                path={path}
                element={<Navigate replace to="/divertito" />}
                key={index}
              />
            ))}

            {/* BLOGGER PAGES */}
            <Route path="/:id" element={<BloggerPage />} />
            <Route path="/:id/edit" element={<BloggerPage />} />

            {/* EXPLORE */}
            <Route
              path="/explore"
              element={<Navigate replace to="/explore/men/tests" />}
            />
            <Route path="/explore/*" element={<ExplorePage />} />
            {/* <Route path='/explore/girls/tests' element={<Navigate replace to="/explore/girls/bloggers" />} /> */}

            {/* TEST & RESULT PAGES */}
            <Route path="/test/:id/:numPage" element={<TestPage />} />
            <Route path="/test/:id/result" element={<ResultPage />} />
            <Route path="/test/:id/answers" element={<TestPage />} />

            <Route path="/game/:id/:numPage" element={<TestPage />} />
            <Route path="/game/:id/result" element={<ResultPage />} />
            <Route path="/game/fullscreen" element={<PicFullscreen />} />

            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            <Route path="/developer" element={<DeveloperPage />} />

            {/* <Route path='/privacy' element={<PrivacyPolicy />}/> */}
            {/* <Route path='/admin' element={<AdminPage />}/> */}

            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/create" element={<BloggerCreatePage />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        style={{
          fontSize: '1.2rem',
        }}
        autoClose={2000}
      />
    </Provider>
  );
}

export default App;
