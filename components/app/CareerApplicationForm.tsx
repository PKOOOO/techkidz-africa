"use client";

import { useState } from "react";

type SubmitState = "idle" | "success" | "error";

export default function CareerApplicationForm({
    careerId,
    careerTitle,
}: {
    careerId: string;
    careerTitle: string;
}) {
    const [submitState, setSubmitState] = useState<SubmitState>("idle");
    const [message, setMessage] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitState("idle");
        setMessage("");

        const form = event.currentTarget;
        const formData = new FormData(form);
        formData.set("careerId", careerId);

        try {
            const response = await fetch("/api/careers/apply", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json().catch(() => null);
                throw new Error(data?.message || "Submission failed.");
            }

            form.reset();
            setSubmitState("success");
            setMessage(`Thanks for applying to ${careerTitle}. We'll be in touch soon.`);
        } catch (error) {
            setSubmitState("error");
            setMessage(error instanceof Error ? error.message : "Submission failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="space-y-5 w-full max-w-xl" onSubmit={handleSubmit}>
            <input type="hidden" name="careerId" value={careerId} />

            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="fullName">
                    Name <span className="text-red-500">*</span>
                </label>
                <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-swahilipot-500"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="hello@world.com"
                    className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-swahilipot-500"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="resume">
                    Resume
                </label>
                <input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="w-full rounded-lg border px-4 py-2 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-neutral-100 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-neutral-700 hover:file:bg-neutral-200"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="githubUrl">
                    GitHub Profile <span className="text-gray-400">(optional)</span>
                </label>
                <input
                    id="githubUrl"
                    name="githubUrl"
                    type="url"
                    placeholder="https://"
                    className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-swahilipot-500"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-swahilipot-600 text-white px-5 py-3 text-sm font-semibold hover:bg-swahilipot-700 disabled:opacity-60"
            >
                {isSubmitting ? "Submitting..." : "Submit application →"}
            </button>

            {submitState !== "idle" ? (
                <p className={submitState === "success" ? "text-green-600 text-sm" : "text-red-600 text-sm"}>
                    {message}
                </p>
            ) : null}
        </form>
    );
}
