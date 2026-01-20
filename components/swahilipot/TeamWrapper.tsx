import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Team } from "./Team";

async function getTeamMembers() {
    const query = `*[_type == "teamMember" && isActive == true] | order(order asc) {
        _id,
        name,
        role,
        bio,
        image,
        linkedin,
        twitter
    }`;
    
    try {
        const members = await client.fetch(query);
        return members.map((member: any) => ({
            _id: member._id,
            name: member.name,
            role: member.role,
            bio: member.bio,
            imageUrl: member.image ? urlFor(member.image).width(800).height(800).url() : null,
            linkedin: member.linkedin,
            twitter: member.twitter,
        }));
    } catch (error) {
        console.error("Error fetching team members:", error);
        return [];
    }
}

export async function TeamWrapper() {
    const members = await getTeamMembers();
    
    return <Team members={members} />;
}
