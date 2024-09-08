import React from 'react';
import { Provider } from 'react-redux';
import ToastProvider from './ToastProvider';
import { store } from '../store/store';

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ToastProvider />
            {children}
        </Provider>
    );
}
