"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Header from '@/components/dashboard/header/header';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'sonner'; // for displaying success/error messages
import { Skeleton } from '@/components/ui/skeleton';
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Announcement = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: "Write your announcement here...",
            toolbarAdaptive: false,
            theme: "dark",
            toolbarSticky: false,
            style: {
                backgroundColor: "#0f1b0f",
                color: "#fff",
                height: "370px",
            },
        }),
        []
    );

    // Fetch the existing announcement content on page load
    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/announcements');
                setContent(response.data.announcement);  // Set the existing announcement content
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching announcement:', error);
                setIsLoading(false);
            }
        };

        fetchAnnouncement();
    }, []);

    // Handle the announcement save (update)
    const handlePublish = async () => {
        if (!content.trim()) {
            toast.error('Announcement content cannot be empty');
            return;
        }

        try {
            const response = await axios.put('http://localhost:5001/api/announcements', {
                announcement: content,
            });

            if (response.status === 200) {
                toast.success('Announcement updated successfully!');
            }
        } catch (error) {
            console.error('Error updating announcement:', error);
            toast.error('Failed to update announcement');
        }
    };

    if (isLoading) {
        return (
            <div className="lg:p-6 pt-8">
                <Header title='Announcement' subTitle='Create and manage announcements' />
                <div className="bg-white/5 lg:h-[500px] border border-white/10 backdrop-blur-md rounded-lg p-4 shadow-md">
                    <Skeleton className="h-full w-full bg-[#363535]" />
                </div>
            </div>
        );
    }

    return (
        <div className="lg:p-6 pt-8">
            <Header title='Announcement' subTitle='Create and manage announcements' />

            <div className="bg-white/5 lg:h-[500px] border border-white/10 backdrop-blur-md rounded-lg p-4 shadow-md">
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    onChange={(newContent) => setContent(newContent)}
                />
            </div>

            <div className="flex justify-end mt-4">
                <button onClick={handlePublish} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition">
                    Publish
                </button>
            </div>
        </div>
    );
};

export default Announcement;
