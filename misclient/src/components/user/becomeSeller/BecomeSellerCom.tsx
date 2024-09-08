import { FC, useState } from 'react'
import { useAppDispatch } from '../../../store/hook';
import { sellerRequest } from '../../../store/seller/sellerApi';

type Props = {

}

const BecomeSellerCom: FC<Props> = () => {
    const dispatch = useAppDispatch()
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        vatNumber: '',
        panNumber: '',
        citizenshipNumber: '',
        email: '',
        address: '',
        description: ''
    });

    const [files, setFiles] = useState<File[]>([]);
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    // Handle file change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(Array.from(event.target.files));
        }
    };

    const handleSubmit = async (event: any) => {
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
        await dispatch(sellerRequest(formdata))
    };
    return (
        <div className='bg-gray-100'>
            <form className='max-w-screen-lg m-auto pt-3 lg:px-0 px-3' onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="space-y-5">
                    <div className="">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Store Information</h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Store Name</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">About</label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    ></textarea>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your Store.</p>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                <div className="mt-2">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">Contact Number</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="number"
                                        id="number"
                                        autoComplete="tel"
                                        value={formData.number}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Your Address</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        autoComplete="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="vatNumber" className="block text-sm font-medium leading-6 text-gray-900">VAT Number</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="vatNumber"
                                        id="vatNumber"
                                        autoComplete="vatNumber"
                                        value={formData.vatNumber}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="panNumber" className="block text-sm font-medium leading-6 text-gray-900">PAN Number</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="panNumber"
                                        id="panNumber"
                                        autoComplete="panNumber"
                                        value={formData.panNumber}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="citizenshipNumber" className="block text-sm font-medium leading-6 text-gray-900">Citizenship Number</label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="citizenshipNumber"
                                        id="citizenshipNumber"
                                        autoComplete="citizenshipNumber"
                                        value={formData.citizenshipNumber}
                                        onChange={handleInputChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full mt-2">
                            <label htmlFor="file-upload" className="block text-sm font-medium leading-6 text-gray-900">Citizenship Photo</label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M22.5 30.75L19.5 33.75L15 29.25L8.25 36H6.75V30.75L12 24L22.5 30.75Z" />
                                    </svg>
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-indigo-600 hover:text-indigo-500">
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                onChange={handleFileChange}
                                                className="sr-only"
                                                multiple
                                                maxLength={2}
                                                accept="image/*"
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pb-8 flex w-full justify-end">
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm ring-1 ring-indigo-600 ring-inset hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                        >
                            Submit Form
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default BecomeSellerCom