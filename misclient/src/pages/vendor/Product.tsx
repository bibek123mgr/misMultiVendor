import { useEffect } from "react";
import { useAppDispatch } from "../../store/hook";
import { fetchProducts } from "../../store/vendor/product/productApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Product = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const { products } = useSelector((store: RootState) => store.Vproduct.data);
    console.log(products);

    return (
        <div>
            <section className="bg-gray-50 p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            {/* Additional content if needed */}
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Product Id</th>
                                        <th scope="col" className="px-4 py-3">Product name</th>
                                        <th scope="col" className="px-4 py-3">Image</th>
                                        <th scope="col" className="px-4 py-3">Stock</th>
                                        <th scope="col" className="px-4 py-3">Price</th>
                                        <th scope="col" className="px-4 py-3">CreatedAt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products && products.length > 0 ? (
                                        products.map((product: any) => (
                                            <tr className="border-b" key={product._id}>
                                                <td className="px-4 py-3">{product._id}</td>
                                                <td className="px-4 py-3">{product.name}</td>
                                                <td className="px-4 py-3">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-[50px] h-auto"
                                                    />
                                                </td>
                                                <td className="px-4 py-3">{product.stock}</td>
                                                <td className="px-4 py-3">{product.price}</td>
                                                <td className="px-4 py-3">{new Date(product.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-3 text-center">
                                                No products available.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Product;
