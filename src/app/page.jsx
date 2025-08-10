// frontend/src/app/page.js
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Clinic</h1>
            <p className="text-lg text-gray-600 mb-8">Your simple and reliable appointment booking solution.</p>
            <div className="flex gap-4">
                <Button asChild>
                    <Link href="/login">Login</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/register">Register</Link>
                </Button>
            </div>
        </div>
    );
}