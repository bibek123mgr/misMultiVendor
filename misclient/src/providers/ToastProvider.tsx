import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
                duration: 3000,
                style: {
                    background: '#1f2937',
                    color: '#f9fafb',
                    borderRadius: '0.375rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    padding: '0.5rem 1rem',
                },
                success: {
                    duration: 3000,
                    style: {
                        background: '#16a34a',
                        color: '#ffffff',
                    },
                },
                error: {
                    duration: 3000,
                    style: {
                        background: '#dc2626',
                        color: '#ffffff',
                    },
                },
            }}
        />
    );
}
