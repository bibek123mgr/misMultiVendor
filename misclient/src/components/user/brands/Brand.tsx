import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const brands = [

    {
        name: "Apple",
        link: "https://www.apple.com"
    },

    {
        name: "Apple",
        link: "https://www.apple.com"
    },

    {
        name: "Apple",
        link: "https://www.apple.com"
    },

    {
        name: "Apple",
        link: "https://www.apple.com"
    },

    {
        name: "Apple",
        link: "https://www.apple.com"
    },

    {
        name: "Apple",
        link: "https://www.apple.com"
    },

    {
        name: "Apple",
        link: "https://www.apple.com"
    },

    {
        name: "Apple",
        link: "https://www.apple.com"
    },
    {
        name: "Apple",
        link: "https://www.apple.com"
    },

    {
        name: "Apple",
        link: "https://www.apple.com"
    },

    {
        name: "Apple",
        link: "https://www.apple.com"
    },

    {
        name: "Apple",
        link: "https://www.apple.com"
    },

    {
        name: "Apple",
        link: "https://www.apple.com"
    },

    {
        name: "Apple",
        link: "https://www.apple.com"
    },

    {
        name: "Apple",
        link: "https://www.apple.com"
    },

    {
        name: "Apple",
        link: "https://www.apple.com"
    },

    {
        name: "Apple",
        link: "https://www.apple.com"
    },

    {
        name: "Apple",
        link: "https://www.apple.com"
    },


    // Add more brands as needed
];

const Brand = () => {
    return (
        <div>
            <div className="max-w-screen-xl mx-auto lg:px-0 px-3">
                <div className="flex items-center overflow-x-auto hideScroll">
                    {brands.map((brand, index) => (
                        <Link key={index} href={brand.link} className="flex items-center justify-center bg-white shadow-md min-h-24 min-w-24">
                            <Image
                                width={100}
                                height={100}
                                src={'/apple.png'}
                                alt={`${brand.name} logo`}
                                className="object-contain"
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Brand;
