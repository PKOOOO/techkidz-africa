import Link from "next/link";
import { ArrowLeft, Palette, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Creatives Department | Swahilipot Hub Foundation",
    description: "Arts, design, and creative expression at Swahilipot Hub.",
};

const services = [
    "Graphic design and branding",
    "Video production and editing",
    "Photography and visual content",
    "Music and audio production",
    "Animation and motion graphics",
    "Creative workshops and training",
];

export default function CreativesDepartmentPage() {
    return (
        <>
            <section className="section-padding bg-swahilipot-50">
                <div className="container-custom">
                    <Link href="/" className="inline-flex items-center text-swahilipot-600 hover:text-swahilipot-700 mb-6">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                    </Link>
                    <div className="max-w-3xl">
                        <div className="bg-swahilipot-100 text-swahilipot-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                            <Palette size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="text-gradient-blue">Creatives</span> Department
                        </h1>
                        <p className="text-lg text-gray-700">
                            Where art meets innovation. We nurture creative talent and produce visual stories that inspire and engage.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-custom">
                    <h2 className="text-2xl font-bold mb-8">What We Do</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div key={service} className="flex items-start gap-3 p-4 bg-white rounded-lg border">
                                <CheckCircle className="text-swahilipot-600 shrink-0 mt-1" size={20} />
                                <span className="text-gray-700">{service}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding bg-swahilipot-900">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Express Your Creativity</h2>
                    <p className="text-swahilipot-200 mb-8 max-w-xl mx-auto">
                        Join our creative team and bring your artistic vision to life.
                    </p>
                    <Button className="bg-white text-swahilipot-900 hover:bg-swahilipot-100" asChild>
                        <Link href="/industrial-attachment">Apply for Attachment</Link>
                    </Button>
                </div>
            </section>
        </>
    );
}
