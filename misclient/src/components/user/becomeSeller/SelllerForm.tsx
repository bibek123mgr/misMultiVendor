import { FC } from 'react'
import { StoreData } from '../../../type/TypeDef'

type Props = {
    storeData: StoreData
}

const SelllerForm: FC<Props> = ({ storeData }) => {
    return (
        <div className='py-4 bg-gray-100'>
            <div className='m-auto max-w-screen-xl'>
                <table className="w-full  table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Field</th>
                            <th className="border border-gray-300 px-4 py-2">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Name</td>
                            <td className="border border-gray-300 px-4 py-2">{storeData.name}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Description</td>
                            <td className="border border-gray-300 px-4 py-2">{storeData.description}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Email</td>
                            <td className="border border-gray-300 px-4 py-2">{storeData.email}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Number</td>
                            <td className="border border-gray-300 px-4 py-2">{storeData.number}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">VAT Number</td>
                            <td className="border border-gray-300 px-4 py-2">{storeData.vatNumber}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">PAN Number</td>
                            <td className="border border-gray-300 px-4 py-2">{storeData.panNumber}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Citizenship Number</td>
                            <td className="border border-gray-300 px-4 py-2">{storeData.citizenship.number}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Citizenship Images</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <div className='flex flex-wrap gap-4'>
                                    {storeData.citizenship.images.map((image, index) => (
                                        <div key={index} className='w-[100px] h-[100px] flex-shrink-0'>
                                            <img src={image.url} alt="" className='w-full h-full object-cover' />
                                        </div>
                                    ))}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Verified</td>
                            <td className="border border-gray-300 px-4 py-2">{storeData.verified ? 'Yes' : 'No'}</td>
                        </tr>
                    </tbody>
                </table>
                <div className='flex space-x-9 mt-5 justify-end w-full'>
                    <button className='p-3 rounded-md bg-green-600 px-10 text-white'>Edit</button>
                    <button className='p-3 rounded-md bg-red-600 px-8 text-white'>Cancel</button>
                </div>
            </div>

        </div>
    )
}

export default SelllerForm