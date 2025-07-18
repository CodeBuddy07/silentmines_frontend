"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ContactSectionProps {
    className?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ className = "" }) => {
    return (
        <section className={`py-16 px-4 bg-black text-white ${className}`}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
                    <div className="w-16 h-1 bg-white mb-8"></div>
                </div>

                {/* Main Content */}
                <div className="space-y-8">
                    {/* Gallery Info */}
                    <p className="text-lg leading-relaxed">
                        All items featured in our current gallery are available for both breakdown and bulk ordering.
                    </p>

                    {/* Flavor Selection */}
                    <div className="space-y-4">
                        <p className="text-lg">
                            <span className="font-semibold">Select Your Flavor:</span> Once you have chosen the flavor you wish to order, please confirm the desired order size. We offer sizes ranging from 1 oz to 5 lb for each flavor.
                        </p>
                    </div>

                    {/* Contact Methods */}
                    <div className="space-y-6">
                        <p className="text-lg">
                            <span className="font-semibold">Contact Us:</span> Click any of our platforms to reach us:
                        </p>

                        {/* Platform Buttons */}
                        <div className="flex flex-wrap gap-4">
                            {/* Signal */}
                            <Button
                                className="w-full sm:w-auto bg-[#3a76f0] hover:bg-[#2c61d8] text-white px-6 py-4 rounded-xl flex items-center gap-4 transition-all duration-300 shadow-md hover:shadow-lg"
                                onClick={() => window.open('https://signal.org', '_blank')}
                            >
                                <img src="/signal_logo.png" alt="Signal" className="w-6 h-6 rounded-2xl" />
                                <div className="text-left">
                                    <span className="text-base font-semibold">Signal</span>
                                    <span className="text-sm opacity-90 ml-1">(For the fastest response)</span>
                                </div>
                            </Button>

                            {/* Element */}
                            <Button
                                className="w-full sm:w-auto bg-[#00bfa5] hover:bg-[#00a896] text-white px-6 py-4 rounded-xl flex items-center gap-4 transition-all duration-300 shadow-md hover:shadow-lg"
                                onClick={() => window.open('https://element.io', '_blank')}
                            >
                                <img src="/element_logo.png" alt="Element" className="w-6 h-6  rounded-2xl" />
                                <span className="text-base font-semibold">Element</span>
                            </Button>

                            {/* Telegram */}
                            <Button
                                className="w-full sm:w-auto bg-[#229ED9] hover:bg-[#1b8ec2] text-white px-6 py-4 rounded-xl flex items-center gap-4 transition-all duration-300 shadow-md hover:shadow-lg"
                                onClick={() => window.open('https://telegram.org', '_blank')}
                            >
                                <img src="/telegram_logo.avif" alt="Telegram" className="w-6 h-6 rounded-2xl" />
                                <span className="text-base font-semibold">Telegram</span>
                            </Button>
                        </div>


                        {/* Response Time */}
                        <Card className="bg-gray-900 border-gray-800">
                            <CardContent className="p-6">
                                <p className="text-gray-300 leading-relaxed">
                                    We strive to respond on the same day, Monday through Friday, from{' '}
                                    <span className="font-semibold text-white">9 AM to 5 PM PST</span>.
                                    Thank you for your interest!
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;