import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const UserProfile = () => {
    const { data }: { data: any } = useSelector((store: RootState) => store.auth);
    const name = data?.name || '';
    const email = data?.email || '';
    const address = data?.address || '';
    const role = data?.role || '';

    return (
        <div className="p-2 md:p-4">
            <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                <h2 className="pl-6 text-2xl font-bold sm:text-xl">Profile</h2>
                <div className="grid max-w-2xl mx-auto mt-8">
                    <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                        <img
                            className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300"
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Profile picture"
                        />
                        <div className="flex flex-col space-y-5 sm:ml-8">
                            <button
                                type="button"
                                className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200">
                                Change picture
                            </button>
                        </div>
                    </div>
                    <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                        <div className="mb-2">
                            <label htmlFor="name" className="block mb-1 text-sm font-medium text-indigo-900">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                readOnly
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email" className="block mb-1 text-sm font-medium text-indigo-900">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                readOnly
                            />
                        </div>
                        {address && (
                            <div className="mb-2">
                                <label htmlFor="address" className="block mb-1 text-sm font-medium text-indigo-900">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    readOnly
                                />
                            </div>
                        )}
                        <div className="mb-2">
                            <label htmlFor="role" className="block mb-1 text-sm font-medium text-indigo-900">Role</label>
                            <input
                                type="text"
                                id="role"
                                value={role}
                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                readOnly
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center my-2">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
