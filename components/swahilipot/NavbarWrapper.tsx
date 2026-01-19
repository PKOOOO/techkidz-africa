import { client } from "@/sanity/lib/client";
import { Navbar } from "./Navbar";

async function getPrograms() {
    const query = `*[_type == "programsPage" && isActive == true] | order(order asc) {
        _id,
        title,
        href
    }`;
    
    try {
        return await client.fetch(query);
    } catch (error) {
        console.error("Error fetching programs for navbar:", error);
        return [];
    }
}

export async function NavbarWrapper() {
    const programs = await getPrograms();
    
    return <Navbar programs={programs} />;
}
