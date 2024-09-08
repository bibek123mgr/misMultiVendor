import { useState } from 'react'
import Stores from '../components/Stores'
import SelllerRequest from '../components/StoreRequest'

const Store = () => {
    const [page, setPage] = useState('stores')

    return (
        <div className="flex flex-col items-center p-6">
            <div className="mb-4 flex space-x-4">
                <button
                    type="button"
                    className={`px-4 py-2 rounded-md ${page === 'stores' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setPage('stores')}
                >
                    Stores
                </button>
                <button
                    type="button"
                    className={`px-4 py-2 rounded-md ${page === 'storeRequest' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setPage('storeRequest')}
                >
                    Store Request
                </button>
            </div>

            <div className="w-full">
                {page === 'stores' && <Stores />}
                {page === 'storeRequest' && <SelllerRequest />}
            </div>
        </div>
    )
}

export default Store
