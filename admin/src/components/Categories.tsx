import React, { FC } from 'react';

interface Props {
    categories: any
}
const Categories: FC<Props> = ({ categories }) => {


    return (
        <div className='py-4'>
            <div className='w-full max-w-screen-lg m-auto'>
                <table className="w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Image</th>
                            <th className="border border-gray-300 px-4 py-2">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((categoryData: any, index: any) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2">{categoryData._id}</td>
                                <td className="border border-gray-300 px-4 py-2">{categoryData.name}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <img src={categoryData.image} alt={categoryData.name} className='w-[50px] h-[50px] object-cover rounded-md' />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{categoryData.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Categories;
