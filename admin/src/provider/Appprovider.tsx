import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "../redux/store";
import React from "react";

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            {children}
            <Toaster position="top-right" />
        </Provider>
    );
}
