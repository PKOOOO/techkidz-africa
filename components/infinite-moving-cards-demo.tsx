"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Briefcase, Star, Lightbulb, ShieldCheck } from "lucide-react";

export default function InfiniteMovingCardsDemo() {
    return (
        <div className="h-[20rem] rounded-md flex flex-col antialiased bg-transparent items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="normal"
            />
        </div>
    );
}

const testimonials = [
    {
        quote:
            "We maintain the highest standards in our curriculum, instructors, and every interaction with our learners and partners.",
        name: "Professionalism",
        title: "Core Value",
        icon: Briefcase,
    },
    {
        quote:
            "We deliver exceptional learning experiences that create supportive environments where every child can explore and grow confidently.",
        name: "Quality Service",
        title: "Core Value",
        icon: Star,
    },
    {
        quote:
            "We empower children to think creatively, solve problems, and transform their ideas into reality through hands-on technology learning.",
        name: "Creativity and Innovation",
        title: "Core Value",
        icon: Lightbulb,
    },
    {
        quote:
            "We operate with honesty, transparency, and accountability, creating safe learning environments built on trust and ethical responsibility.",
        name: "Integrity",
        title: "Core Value",
        icon: ShieldCheck,
    },
];
