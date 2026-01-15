"use client";

import React from "react";
import { Meteors } from "@/components/ui/meteors";

const storyParagraphs = [
    "Tech Kidz Africa is a leading technology academy operating in Nairobi, Mombasa, and Malindi. We inspire African learners aged 4 and beyond through hands-on training in Robotics, Animation, Gaming, Coding, App and Web Development, Creative Design Thinking, Online Safety, and 3D Printing.",
    "Beyond empowering students, we equip educators with advanced technology skills, including AI integration, to effectively incorporate technology into their teaching. Through this dual approach, Tech Kidz Africa bridges the digital divide and prepares the next generation of African innovators.",
];

export default function OurStoryMeteors() {
    return (
        <div className="w-full relative">
            <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl start-0" />
            <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-8 py-10 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">

                {/* Story Text */}
                <div className="space-y-6 relative z-50">
                    {storyParagraphs.map((paragraph, index) => (
                        <p key={index} className="text-lg text-gray-300 leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Meteor effect */}
                <Meteors number={20} />
            </div>
        </div>
    );
}
