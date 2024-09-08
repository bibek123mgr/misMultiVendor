import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';


const PublicLayout = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes >
        </>
    );
};

export default PublicLayout;
