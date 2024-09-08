import Product from './Product';
import { RiFilter2Line } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

type Props = {
    filter: boolean;
    title: string;
    products: any
};

const Products = ({ filter, title, products }: Props) => {
    return (
        <section className="bg-gray-100 py-8 antialiased md:py-12">
            <div className="mx-auto max-w-screen-xl px-3 2xl:px-0">
                <div className="flex items-center justify-between">
                    <h1 className="mb-5 text-2xl font-bold text-black">{title}</h1>
                    {filter ? (
                        <button>
                            <RiFilter2Line size={25} fill="black" />
                        </button>
                    ) : (
                        <Link to={'/product'} className="text-black hover:text-blue-500">
                            See More
                            <span>
                                <IoIosArrowForward size={15} className="inline-block ml-[-3px]" />
                            </span>
                        </Link>
                    )}
                </div>
                <div className="mb-4 grid gap-2 sm:grid-cols-3 md:mb-8 lg:grid-cols-4 xl:grid-cols-5 grid-cols-2">
                    {products?.map((product: any) => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
