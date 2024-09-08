import { FaShippingFast, FaUndo, FaLock, FaStar } from 'react-icons/fa';

const features = [
    {
        icon: <FaShippingFast className='w-6 h-6 text-blue-500' />,
        title: 'Free Shipping',
        description: 'When ordering over $100'
    },
    {
        icon: <FaUndo className='w-6 h-6 text-green-500' />,
        title: 'Free Return',
        description: 'Get Return within 30 days'
    },
    {
        icon: <FaLock className='w-6 h-6 text-red-500' />,
        title: 'Secure Payment',
        description: '100% Secure Online Payment'
    },
    {
        icon: <FaStar className='w-6 h-6 text-yellow-500' />,
        title: 'Best Quality',
        description: 'Original Product Guaranteed'
    }
];

const Facility: React.FC = () => {
    return (
        <div className='w-full px-3'>
            <div className='max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-2 bg-white shadow rounded-lg'>
                {features.map((feature, index) => (
                    <div key={index} className='flex items-center p-4'>
                        <div className='mr-4'>{feature.icon}</div>
                        <div>
                            <h3 className='text-lg font-semibold text-blue-600'>{feature.title}</h3>
                            <p className='text-gray-600'>{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Facility;
