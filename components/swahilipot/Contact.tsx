"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Send } from "lucide-react";

export function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement form submission
        console.log("Form submitted:", formData);
        alert("Thank you for your message! We will get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section id="contact" className="section-padding bg-swahilipot-50">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Get in <span className="text-gradient-blue">Touch</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have questions or want to collaborate? Reach out to us.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-swahilipot-100 text-swahilipot-600 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Our Location</h3>
                                <p className="text-gray-600">
                                    Fort Jesus Road, Old Town<br />
                                    Mombasa, Kenya
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-swahilipot-100 text-swahilipot-600 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Phone</h3>
                                <p className="text-gray-600">+254 700 000 000</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-swahilipot-100 text-swahilipot-600 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Email</h3>
                                <p className="text-gray-600">info@swahilipothub.co.ke</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swahilipot-500 focus:border-transparent outline-none"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swahilipot-500 focus:border-transparent outline-none"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                Message
                            </label>
                            <textarea
                                id="message"
                                required
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swahilipot-500 focus:border-transparent outline-none resize-none"
                                placeholder="How can we help you?"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-swahilipot-600 hover:bg-swahilipot-700 text-white"
                        >
                            Send Message <Send className="ml-2 h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
