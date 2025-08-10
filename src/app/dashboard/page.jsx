"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import api from '@/api/axios';
import authService from '@/api/authService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DashboardPage() {
    const [slots, setSlots] = useState([]);
    const [bookings, setBookings] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const token = authService.getToken();
        if (!token) {
            router.push('/login');
            return;
        }
        fetchData(token);
    }, [router]);

    const fetchData = async (token) => {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            
            // Fetch available slots for the next 7 days
            const today = new Date().toISOString().split('T')[0];
            const nextWeek = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0];
            const slotsResponse = await api.get(`/slots?from=${today}&to=${nextWeek}`, { headers });
            setSlots(slotsResponse.data);

            // Fetch patient's bookings
            const bookingsResponse = await api.get('/my-bookings', { headers });
            setBookings(bookingsResponse.data);
        } catch (error) {
            toast.error(error.response?.data?.error?.message || "Failed to fetch data");
            authService.logout();
            router.push('/login');
        }
    };

    const handleBook = async (slotId) => {
        try {
            const token = authService.getToken();
            await api.post('/book', { slotId }, { headers: { Authorization: `Bearer ${token}` } });
            toast.success("Appointment booked successfully!");
            fetchData(token); // Refresh the data
        } catch (error) {
            toast.error(error.response?.data?.error?.message || "Booking failed");
        }
    };
    
    const formatDate = (dateString) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Patient Dashboard</h1>
                <Button onClick={() => { authService.logout(); router.push('/login'); }}>Logout</Button>
            </div>
            
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Available Slots</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[300px]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {slots.length > 0 ? (
                                slots.map(slot => (
                                    <div key={slot._id} className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
                                        <span>{formatDate(slot.startAt)}</span>
                                        <Button onClick={() => handleBook(slot._id)}>Book</Button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center w-full">No available slots for the next 7 days.</p>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>My Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[200px]">
                        <div className="grid grid-cols-1 gap-4">
                            {bookings.length > 0 ? (
                                bookings.map(booking => (
                                    <div key={booking._id} className="p-4 border rounded-lg shadow-sm">
                                        <p>
                                         Booking for:
                                         <strong className='font-bold'>{booking.slot ? formatDate(booking.slot.startAt) : 'Slot not found'}</strong>
                                         
                                     </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center">You have no bookings.</p>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}