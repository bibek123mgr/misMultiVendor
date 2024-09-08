import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/hook';
import { payKhaltiVefity } from '../../store/order/orderApi';


const KhaltiSuccess = () => {
    // Get search params from the URL
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch()
    const pidx = searchParams.get('pidx');
    if (!pidx) {
        return
    }
    useEffect(() => {
        dispatch(payKhaltiVefity(pidx))
    }, [])
    return null
};

export default KhaltiSuccess;
