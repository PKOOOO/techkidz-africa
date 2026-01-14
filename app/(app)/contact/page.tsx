import { Contact } from "@/components/swahilipot";

export const metadata = {
    title: "Contact Us | Swahilipot Hub Foundation",
    description: "Get in touch with Swahilipot Hub Foundation. We're here to help.",
};

export default function ContactPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="section-padding bg-swahilipot-50">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Contact <span className="text-gradient-blue">Us</span>
                        </h1>
                        <p className="text-lg text-gray-700">
                            Have questions or want to collaborate? We'd love to hear from you.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <Contact />

            {/* Map Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="bg-gray-200 rounded-xl h-80 flex items-center justify-center">
                        <p className="text-gray-500">Map coming soon</p>
                    </div>
                </div>
            </section>
        </>
    );
}
