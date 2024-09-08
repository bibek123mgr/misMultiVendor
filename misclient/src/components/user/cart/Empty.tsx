import { Link } from "react-router-dom";


const Empty = () => {

    return (
        <div className="flex flex-col items-center justify-center h-fit bg-gray-100 p-4">
            <div className="flex flex-col justify-center items-center text-center">
                <img src="/cart.png" height={300} width={300} alt="empty" />
                <div className="mt-4">
                    <h1 className="text-2xl font-semibold text-gray-900">Your cart is empty</h1>
                    <p className="text-gray-500">It looks like you haven't added any items to your cart yet.</p>
                    <div className='my-6 '>
                        <Link to="/" className='py-3 bg-blue-500 rounded-full px-5 text-white z-50'>
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Empty;
