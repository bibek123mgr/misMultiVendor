import React from 'react';

type Props = {};

const Hero: React.FC<Props> = () => {
    return (
        <div className='w-full h-full'>
            <div className='max-w-screen-xl mx-auto flex flex-col gap-2 lg:grid lg:grid-cols-3 py-4 px-3 xl:px-0'>
                <div className='relative bg-pink-50 p-4 lg:col-span-2 min-h-[300px] lg:h-[600px] h-auto w-full'>
                    <img
                        src='/banner-1.png'
                        alt='Samsung S10+'
                        className='absolute inset-0 w-full h-full object-cover'
                    />
                </div>
                {/* Small Images Section */}
                <div className='lg:col-span-1 flex gap-2 lg:gap-0 lg:grid'>
                    <div className='relative bg-blue-50 h-[200px] lg:h-[300px] w-full'>
                        <img
                            src='/banner-2.png'
                            alt='Apple Smart Watch'
                            className='absolute inset-0 w-full h-full object-cover'
                        />
                    </div>
                    <div className='relative bg-yellow-50 h-[200px] lg:h-[300px] w-full'>
                        <img
                            src='/banner-3.png'
                            alt='Xbox 5th Version'
                            className='absolute inset-0 w-full h-full object-cover'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
