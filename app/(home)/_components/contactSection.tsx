"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ContactSectionProps {
    className?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ className = "" }) => {
    return (
        <section id="contact" className={`py-16 px-4 bg-black text-white ${className}`}>
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <div className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Contact Us</h2>
                    <div className="w-16 h-1 bg-white mb-8"></div>
                </div>

                {/* Instructions */}
                <p className="mb-4">Ready to place an order? It’s easy.</p>
                <p className="flex items-start gap-2 mb-2">
                    <span role="img" aria-label="cart">🛒</span>
                    <span>
                        <strong>Step 1:</strong> Add the products you want to your cart and complete checkout.
                    </span>
                </p>
                <p className="flex items-start gap-2 mb-6">
                    <span role="img" aria-label="signal">📲</span>
                    <span>
                        <strong>Step 2:</strong> We’ll reach out to you directly on <strong>Signal</strong> with pickup instructions.
                    </span>
                </p>

                <p className="mb-6 text-gray-300">
                    You can message us at any time — we respond FAST (like warp-speed fast). Our support is always
                    online during business hours, but we often reply after hours too. Don’t be shy!
                </p>

                {/* Need to get in touch */}
                <h3 className="text-lg font-semibold mb-4">Need to get in touch right now?</h3>
                <p className="mb-4">Tap one of the platforms below:</p>

                {/* Platform Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                    {/* Signal */}
                    <Button
                        className="w-full sm:w-auto bg-[#3a76f0] hover:bg-[#2c61d8] cursor-pointer text-white px-6 py-4 rounded-xl flex items-center gap-4 shadow-md hover:shadow-lg"
                        onClick={() => window.open("https://signal.me/#eu/sd-v2cNc3i1IsKlKsL8S3Mf38b60RplD84Op8ejV_7yKD-pKJmBPn4o-Fd6OO4Is", "_blank")}
                    >
                        <img src="/signal_logo.png" alt="Signal" className="w-6 h-6  rounded-2xl" />
                        <span className="font-semibold">Signal</span>
                        <span className="text-sm opacity-90">(For the fastest response)</span>
                    </Button>

                    {/* Telegram */}
                    <Button
                        className="w-full sm:w-auto bg-[#229ED9] hover:bg-[#1b8ec2] cursor-pointer text-white px-7 py-4 rounded-xl flex items-center gap-4 shadow-md hover:shadow-lg"
                        onClick={() => window.open("https://t.me/greenthumbsCS", "_blank")}
                    >
                        <img src="/telegram_logo.avif" alt="telegram" className="w-6 h-6  rounded-2xl" />
                        <span className="font-semibold">Telegram</span>
                      
                    </Button>
                </div>

                {/* Help list */}
                <p className="font-semibold mb-4">We’re here to help with:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 mb-8">
                    <li>Order status and updates</li>
                    <li>Custom or bulk requests</li>
                    <li>Pickup coordination</li>
                    <li>Product questions</li>
                    <li>General cosmic curiosity 🛸</li>
                </ul>

                {/* Hours */}
                <Card className="bg-gray-900 border-gray-800 text-white">
                    <CardContent className="p-6">
                        <p>
                            <strong>Hours:</strong>
                            <br />
                            Daily | <span className="font-semibold">12:00 PM – 10:00 PM EST</span>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default ContactSection;
