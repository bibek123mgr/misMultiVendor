import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../redux/hook';
import { createCategory } from '../redux/categorySlice';

type Props = {};

const AddCategory = () => {
    const dispatch = useAppDispatch()
    const [drag, setDrag] = useState(false);
    const [data, setData] = useState({
        name: '',
        image: ''
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        await dispatch(createCategory(form));
    };
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setData({ ...data, image: reader.result as string });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDrag(true);
    };

    const handleLeaveOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDrag(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDrag(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setData({
                        ...data, image: reader.result as string
                    });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>

            <div className="p-4 w-full mx-auto">
                <h1 className="text-2xl font-bold mb-4">Add New Category</h1>
                <form onSubmit={handleSubmit} className="space-y-4 w-full">
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium mb-2">Category Name</label>
                        <input
                            type="text"
                            name='name'
                            onChange={onChange}
                            value={data.name}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <input
                            type="file"
                            name="image"
                            accept='image/*'
                            id="image"
                            hidden
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="image"
                            className={`min-h-[20vh] w-full border border-gray-300 p-3 flex items-center justify-center ${drag ? "bg-blue-500" : "bg-transparent"}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleLeaveOver}
                            onDrop={handleDrop}
                        >
                            {data.image ? (
                                <img src={data.image} alt="Category" className="w-full h-full object-contain rounded" />
                            ) : (
                                <span className="text-gray-600">Drag and Drop Your image or click to browse</span>
                            )}
                        </label>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300">
                        Add Category
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddCategory;
