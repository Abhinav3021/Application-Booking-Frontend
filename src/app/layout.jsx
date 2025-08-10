// frontend/src/app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Appointment Booking App',
    description: 'A minimal full-stack appointment booking application.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
                <ToastContainer />
            </body>
        </html>
    );
}