"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const storyParagraphs = ["Tech Kidz Africa is a leading technology academy operating in Nairobi, Mombasa, and Malindi. We inspire African learners aged 4 and beyond through hands-on training in Robotics, Animation, Gaming, Coding, App and Web Development, Creative Design Thinking, Online Safety, and 3D Printing. Beyond empowering students, we equip educators with advanced technology skills, including AI integration, to effectively incorporate technology into their teaching. Through this dual approach, Tech Kidz Africa bridges the digital divide and prepares the next generation of African innovators.",
];

export default function OurStoryText() {
    return (
        <div className="space-y-6">
            {storyParagraphs.map((paragraph, index) => (
                <TextGenerateEffect
                    key={index}
                    words={paragraph}
                    className="text-lg text-gray-700 font-normal"
                    duration={2}
                />
            ))}
        </div>
    );
}
