import { Route, Routes } from 'react-router-dom';
import { Home, Login, Register } from './pages';
import {ProtectRoutes} from './components';

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<ProtectRoutes/>}>
          <Route
            path="/"
            element={<Home />}
          />
        </Route>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
    </div>
  );
};
export default App;
