"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import api from '@/api/axios';
import authService from '@/api/authService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
    const [slots, setSlots] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const router = useRouter();

    useEffect(() => {
        const token = authService.getToken();
        if (!token) {
            router.push('/login');
            return;
        }
        fetchData(token, selectedDate);
    }, [router, selectedDate]);

    const fetchData = async (token, date) => {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            
            // Format the selected date for the API call
            const formattedDate = date.toISOString().split('T')[0];

            // Fetch available slots for the selected day
            const slotsResponse = await api.get(`/slots?date=${formattedDate}`, { headers });
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
            fetchData(token, selectedDate); // Refresh the data for the current day
        } catch (error) {
            toast.error(error.response?.data?.error?.message || "Booking failed");
        }
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const formatDate = (dateString) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Helper to generate an array of dates for the next 7 days
    const getNextSevenDays = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date();
            day.setDate(day.getDate() + i);
            days.push(day);
        }
        return days;
    };

    const isSameDay = (date1, date2) => {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
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
                    <div className="flex space-x-2 overflow-x-auto py-2">
                        {getNextSevenDays().map((day, index) => (
                            <Button
                                key={index}
                                onClick={() => handleDateSelect(day)}
                                variant="outline"
                                className={cn(
                                    "min-w-[100px]",
                                    isSameDay(selectedDate, day) ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                                )}
                            >
                                {day.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                            </Button>
                        ))}
                    </div>
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
                                <p className="text-center w-full">No available slots for this day.</p>
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
                                            <span className='font-bold'>{booking.slot ? formatDate(booking.slot.startAt) : 'Slot not found'}</span>
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
