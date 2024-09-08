import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="px-4 py-2">
            <div className="max-w-screen-xl w-full m-auto">
                <Link to={'/'}>
                    <img
                        src={'/banner-4.png'}
                        width={1200}
                        height={400}
                        alt="banner"
                        className="w-full h-auto object-cover"
                    />
                </Link>
            </div>
        </div>
    );
};

export default Banner;
