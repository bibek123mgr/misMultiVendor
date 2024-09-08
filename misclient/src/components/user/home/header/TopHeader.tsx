import { Link } from 'react-router-dom'


const TopHeader = () => {
    const menuList = [
        {
            name: 'About',
            url: '/about'
        },
        {
            name: 'Contact Us',
            url: '/contact'
        },
        {
            name: 'Order Tracking',
            url: '/orders'
        },
        {
            name: 'FAQ',
            url: '/faq'
        },
    ]
    return (
        <div className='w-full h-10 md:block hidden'>
            <div className='max-w-screen-xl flex justify-between m-auto items-center h-full'>
                <ul className='flex items-center space-x-5'>
                    {menuList.map((key, index) => (
                        <li key={index}>
                            <Link to={key.url} className='text-black'>{key.name}</Link>
                        </li>
                    ))}
                </ul>
                <div>
                    <select name="" id="" className='mx-1 h-7 bg-gray-100 text-center text-black'>
                        <option value="">English</option>
                        <option value="">Nepali</option>
                    </select>
                    <select name="" id="" className='mx-1 h-7 bg-gray-100 text-center text-black' >
                        <option value="">USD</option>
                        <option value="">Rupees</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default TopHeader
