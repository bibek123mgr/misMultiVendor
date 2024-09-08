import { useEffect } from 'react';
import { useAppDispatch } from '../store/hook';
import { fetchSellerForm } from '../store/seller/sellerApi';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import SelllerForm from '../components/user/becomeSeller/SelllerForm';
import BecomeSellerCom from '../components/user/becomeSeller/BecomeSellerCom';
import { useNavigate } from 'react-router-dom';

const BecomeSeller = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { data: user }: { data: any } = useSelector((store: RootState) => store.auth)
    useEffect(() => {
        if (data && Object.entries(user).length > 0) {
            dispatch(fetchSellerForm())
        }
    }, [user])
    const { data }: { data: any } = useSelector((store: RootState) => store.seller)
    if (user.role === 'vendor') {
        return navigate('/')
    }
    return (
        <div>
            {(!data || Object.entries(data).length === 0) ? <BecomeSellerCom /> : <SelllerForm storeData={data} />}
        </div>
    );
};

export default BecomeSeller;
