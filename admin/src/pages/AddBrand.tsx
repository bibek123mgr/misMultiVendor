import React, { ChangeEvent, useState } from 'react';

const AddBrand = () => {
    const [drag, setDrag] = useState(false);
    const [data, setData] = useState({
        name: '',
        image: ''
    });

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDrag(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
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
                    setData({ ...data, image: reader.result as string });
                }
            };
            reader.readAsDataURL(file);
        }
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

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Add New Brand</h1>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-lg font-medium mb-2">Brand Name</label>
                    <input
                        type="text"
                        name='name'
                        value={data.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setData({ ...data, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <input
                        type="file"
                        name="img"
                        id="img"
                        hidden
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="img"
                        className={`w-full min-h-[200px] border border-gray-400 p-3 flex items-center justify-center cursor-pointer ${drag ? "bg-blue-100" : "bg-transparent"}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {data.image ? (
                            <img src={data.image} alt="Brand" className="w-full h-full object-cover rounded" />
                        ) : (
                            <span className="text-gray-600">Drop your image here or click to browse</span>
                        )}
                    </label>
                </div>
            </form>
        </div>
    );
};

export default AddBrand;
