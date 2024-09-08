import { Route, Routes } from 'react-router-dom';
import ProtectedLayout from './routes/ProtectedLayout';
import PublicLayout from './routes/PublicLayout';

const App = () => {
  return (
    <Routes >
      <Route path='/dashboard/*' element={<ProtectedLayout />} />
      <Route path='/*' element={<PublicLayout />} />
    </Routes>
  );
};

export default App;
