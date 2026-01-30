"use client";

import { Button } from "@/components/base/buttons/button";
import { Mentorship } from "./types";
import { Clock, VideoRecorder, ChevronRight, ChevronLeft, Calendar, Check, ArrowLeft, XClose } from "@untitledui/icons";
import { useState, useMemo } from "react";
import { cx } from "@/utils/cx";

// Mock data for available slots
const TIME_SLOTS = [
    "09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM", "07:00 PM"
];

export const MentorshipSidebar = ({ mentorship }: { mentorship: Mentorship }) => {
    // Steps: 'service' -> 'date' -> 'time' -> 'confirm'
    const [step, setStep] = useState<'service' | 'date' | 'time' | 'confirm'>('service');
    
    const [selectedServiceId, setSelectedServiceId] = useState<string>(mentorship.services[0].id);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    
    const selectedService = useMemo(() => 
        mentorship.services.find(s => s.id === selectedServiceId) || mentorship.services[0],
    [mentorship.services, selectedServiceId]);

    // Calendar generation
    const currentMonth = new Date();
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    
    const calendarDays = useMemo(() => {
        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
        for (let i = 1; i <= daysInMonth; i++) days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
        return days;
    }, []);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setStep('time');
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setStep('confirm');
    };

    const handleBook = () => {
        alert(`Booking Confirmed!\nService: ${selectedService.title}\nDate: ${selectedDate?.toDateString()}\nTime: ${selectedTime}`);
    };

    const resetFlow = () => {
        setStep('service');
        setSelectedDate(null);
        setSelectedTime(null);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden sticky top-24">
            {/* Header */}
            <div className="p-6 bg-gray-900 text-white relative">
                {step !== 'service' && (
                    <button 
                        onClick={() => setStep(step === 'confirm' ? 'time' : step === 'time' ? 'date' : 'service')}
                        className="absolute top-6 left-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                )}
                <div className={cx("transition-all duration-300", step !== 'service' ? "pl-6" : "")}>
                    <h3 className="text-lg font-bold">
                        {step === 'service' && "Available Services"}
                        {step === 'date' && "Select a Date"}
                        {step === 'time' && "Select a Time"}
                        {step === 'confirm' && "Confirm Booking"}
                    </h3>
                    <p className="text-gray-400 text-sm">
                        {step === 'service' && "Choose a package to get started"}
                        {step === 'date' && "Times are in your local timezone"}
                        {step === 'time' && `Availability for ${selectedDate?.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`}
                        {step === 'confirm' && "Review your session details"}
                    </p>
                </div>
            </div>

            <div className="p-4">
                {/* Step 1: Service Selection */}
                {step === 'service' && (
                    <div className="space-y-3">
                        {mentorship.services.map((service) => {
                            const isSelected = selectedServiceId === service.id;
                            return (
                                <div 
                                    key={service.id}
                                    onClick={() => setSelectedServiceId(service.id)}
                                    className={cx(
                                        "p-4 rounded-xl border cursor-pointer transition-all group relative",
                                        isSelected 
                                            ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600" 
                                            : "border-gray-200 hover:border-blue-300 bg-white hover:shadow-md"
                                    )}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            {service.pricingType === 'per_hour' && (
                                                <span className="inline-block px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold uppercase tracking-wider mb-1">
                                                    Hourly
                                                </span>
                                            )}
                                            <h4 className="font-bold text-gray-900">{service.title}</h4>
                                        </div>
                                        <div className="font-bold text-gray-900 text-lg">
                                            {service.currency}{service.price}
                                            {service.pricingType === 'per_hour' && <span className="text-xs text-gray-500 font-normal">/hr</span>}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{service.duration} mins</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <VideoRecorder className="w-3.5 h-3.5" />
                                            <span>Video Call</span>
                                        </div>
                                    </div>
                                    
                                    <p className="text-sm text-gray-600 border-t border-gray-100 pt-3">
                                        {service.description}
                                    </p>

                                    {isSelected && (
                                        <div className="absolute top-4 right-4 text-blue-600">
                                            <Check className="w-5 h-5" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        
                        <Button className="w-full justify-center mt-4" size="lg" onClick={() => setStep('date')}>
                            Schedule Session 
                        </Button>
                    </div>
                )}

                {/* Step 2: Date Selection (Calendly Style) */}
                {step === 'date' && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <span className="font-semibold text-gray-900">
                                {currentMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                            </span>
                            <div className="flex gap-1">
                                <button className="p-1 hover:bg-gray-100 rounded-full"><ChevronLeft className="w-4 h-4" /></button>
                                <button className="p-1 hover:bg-gray-100 rounded-full"><ChevronRight className="w-4 h-4" /></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-400 mb-2">
                            <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                        </div>
                        
                        <div className="grid grid-cols-7 gap-1">
                            {calendarDays.map((date, i) => (
                                <div key={i} className="aspect-square">
                                    {date ? (
                                        <button
                                            onClick={() => handleDateSelect(date)}
                                            className="w-full h-full flex items-center justify-center rounded-full text-sm font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 text-gray-700"
                                        >
                                            {date.getDate()}
                                        </button>
                                    ) : (
                                        <div />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3: Time Selection */}
                {step === 'time' && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {TIME_SLOTS.map((time) => (
                                <button
                                    key={time}
                                    onClick={() => handleTimeSelect(time)}
                                    className="w-full p-3 rounded-lg border border-gray-200 text-gray-700 font-medium hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all flex justify-between items-center group"
                                >
                                    <span>{time}</span>
                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 4: Confirmation */}
                {step === 'confirm' && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                            <div className="flex gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{selectedService.title}</h4>
                                    <p className="text-gray-500 text-xs mt-1">with {mentorship.mentor.name}</p>
                                </div>
                            </div>
                            
                            <div className="space-y-3 pt-4 border-t border-gray-200/50">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Date</span>
                                    <span className="font-medium text-gray-900">{selectedDate?.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Time</span>
                                    <span className="font-medium text-gray-900">{selectedTime}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Duration</span>
                                    <span className="font-medium text-gray-900">{selectedService.duration} mins</span>
                                </div>
                                <div className="flex justify-between text-sm pt-2 border-t border-gray-200/50">
                                    <span className="font-bold text-gray-900">Total</span>
                                    <span className="font-bold text-blue-600 text-lg">{selectedService.currency}{selectedService.price}</span>
                                </div>
                            </div>
                        </div>

                        <Button className="w-full justify-center mb-3" size="lg" onClick={handleBook}>
                            Confirm & Pay
                        </Button>
                        <button 
                            onClick={resetFlow}
                            className="w-full py-2 text-sm text-gray-500 font-medium hover:text-gray-900 flex items-center justify-center gap-2"
                        >
                            <XClose className="w-3.5 h-3.5" /> Start Over
                        </button>
                    </div>
                )}
            </div>

            {/* Footer / Trust Signals */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-500">
                    <span className="font-medium text-gray-900">100% Satisfaction Guarantee</span> • Free rescheduling
                </p>
            </div>
        </div>
    );
};
