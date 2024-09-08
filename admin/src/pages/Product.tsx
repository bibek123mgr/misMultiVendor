import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { fetchProducts } from '../redux/productSlice';

type Product = {
    _id: string;
    name: string;
    price: number;
    image: string;
    stock: number;
    store: string;
    createdAt: string;
};

const Product = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchProducts()); // Fetch products from API
    }, [dispatch]);

    const { products }: { products: Product[] } = useAppSelector((store) => store.product.data);

    return (
        <div className="overflow-x-auto p-4 w-full">
            <h1 className="text-2xl font-bold mb-6">Products</h1>
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border border-gray-300">Product Name</th>
                        <th className="px-4 py-2 border border-gray-300">Store</th>
                        <th className="px-4 py-2 border border-gray-300">Price</th>
                        <th className="px-4 py-2 border border-gray-300">Stock</th>
                        <th className="px-4 py-2 border border-gray-300">Image</th>
                        <th className="px-4 py-2 border border-gray-300">Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border border-gray-300">
                                <Link to={`/product/${product._id}`}>{product.name}</Link>
                            </td>
                            <td className="px-4 py-2 border border-gray-300">{product.store}</td>
                            <td className="px-4 py-2 border border-gray-300">${product.price}</td>
                            <td className="px-4 py-2 border border-gray-300">{product.stock}</td>
                            <td className="px-4 py-2 border border-gray-300">
                                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
                            </td>
                            <td className="px-4 py-2 border border-gray-300">{new Date(product.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default Product;
