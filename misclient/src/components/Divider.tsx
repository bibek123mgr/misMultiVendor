
type Props = {
    title: string
}

const Divider = (props: Props) => {
    return (
        <span className="relative flex justify-center py-2">
            <div
                className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
            ></div>
            <span className="relative z-10 bg-white px-6 text-black">{props.title}</span>
        </span>
    )
}

export default Divider