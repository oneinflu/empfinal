"use client";

import { Button } from "@/components/base/buttons/button";
import { Mentorship } from "./types";
import { Clock, VideoRecorder, ChevronRight } from "@untitledui/icons";
import { useState } from "react";
import { cx } from "@/utils/cx";

export const MentorshipSidebar = ({ mentorship }: { mentorship: Mentorship }) => {
    const [selectedService, setSelectedService] = useState<string>(mentorship.services[0].id);

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden sticky top-24">
            <div className="p-6 bg-gray-900 text-white">
                <h3 className="text-lg font-bold">Book a Session</h3>
                <p className="text-gray-400 text-sm">Select a service to proceed</p>
            </div>

            <div className="p-4 space-y-3">
                {mentorship.services.map((service) => {
                    const isSelected = selectedService === service.id;
                    return (
                        <div 
                            key={service.id}
                            onClick={() => setSelectedService(service.id)}
                            className={cx(
                                "p-4 rounded-xl border cursor-pointer transition-all",
                                isSelected 
                                    ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600" 
                                    : "border-gray-200 hover:border-blue-300 bg-white"
                            )}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-gray-900">{service.title}</h4>
                                <div className="font-bold text-gray-900">
                                    {service.currency}{service.price}
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{service.duration} mins</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <VideoRecorder className="w-3 h-3" />
                                    <span>Video Call</span>
                                </div>
                            </div>
                            {isSelected && (
                                <p className="text-xs text-gray-600 border-t border-blue-100 pt-2 mt-2">
                                    {service.description}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50">
                <Button className="w-full justify-center" size="lg">
                    Book Now <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
                <div className="text-center mt-3 text-xs text-gray-500">
                    Next available slot: <span className="font-medium text-gray-900">Tomorrow, 10:00 AM</span>
                </div>
            </div>
        </div>
    );
};
