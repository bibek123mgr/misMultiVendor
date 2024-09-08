import { IoMdAdd, IoMdImage } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { createProduct } from '../../store/product/productApi';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../../store/category/categoryApi';

const AddProduct = () => {
    const dispatch = useAppDispatch();

    // State for form data and files
    const [formData, setFormData] = useState({
        name: '',
        stock: '',
        price: '',
        category: '',
        description: ''
    });
    const [files, setFiles] = useState<File[]>([]);

    // Handle text input changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    // Handle file input changes
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(Array.from(event.target.files));
        }
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const { data: categories } = useAppSelector((store) => store.category);

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formdata = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formdata.append(key, value);
        });
        for (let i = 0; i < files.length; i++) {
            formdata.append('image', files[i]);
        }
        formdata.forEach((value, key) => {
            console.log(`${key}:`, value);
        });

        await dispatch(createProduct(formdata));
    };

    return (
        <div className="relative w-full min-h-screen">
            <div className="relative">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                placeholder="Type product name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900">
                                Stock
                            </label>
                            <input
                                type="number"
                                name="stock"
                                id="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                placeholder="Product stock"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                placeholder="$2999"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required
                            >
                                <option>Select category</option>
                                {categories.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Write product description here"
                                required
                            ></textarea>
                        </div>

                        {/* Image Upload Section */}
                        <div className="sm:col-span-2">
                            <label htmlFor="images" className="block mb-2 text-sm font-medium text-gray-900">
                                Upload Images (Up to 4)
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label
                                    htmlFor="images"
                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <IoMdImage className="w-10 h-10 text-gray-400" />
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">PNG, JPG, or GIF (MAX 4 images)</p>
                                    </div>
                                    <input
                                        id="images"
                                        type="file"
                                        name="images"
                                        accept="image/*"
                                        multiple
                                        onChange={handleFileChange}
                                        className="hidden"
                                        required
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        <IoMdAdd className="mr-1 -ml-1 w-6 h-6" />
                        Add new product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
