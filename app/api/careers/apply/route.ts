import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
});

export async function POST(request: Request) {
    if (!token) {
        return new Response(
            JSON.stringify({ message: "Missing Sanity write token." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

    try {
        const formData = await request.formData();
        const careerId = String(formData.get("careerId") || "").trim();
        const fullName = String(formData.get("fullName") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const linkedinUrl = String(formData.get("linkedinUrl") || "").trim();
        const githubUrl = String(formData.get("githubUrl") || "").trim();
        const note = String(formData.get("note") || "").trim();
        const resumeFile = formData.get("resume");

        if (!careerId || !fullName || !email) {
            return new Response(
                JSON.stringify({ message: "Missing required fields." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        let resumeAssetRef: { _type: "reference"; _ref: string } | undefined;
        if (resumeFile instanceof File && resumeFile.size > 0) {
            const asset = await writeClient.assets.upload("file", resumeFile, {
                filename: resumeFile.name || "resume",
                contentType: resumeFile.type || undefined,
            });
            resumeAssetRef = { _type: "reference", _ref: asset._id };
        }

        const doc = await writeClient.create({
            _type: "careerApplication",
            career: { _type: "reference", _ref: careerId },
            fullName,
            email,
            linkedinUrl: linkedinUrl || undefined,
            githubUrl: githubUrl || undefined,
            note: note || undefined,
            resume: resumeAssetRef ? { _type: "file", asset: resumeAssetRef } : undefined,
        });

        return new Response(
            JSON.stringify({ message: "Application submitted.", id: doc._id }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Career application error:", error);
        return new Response(
            JSON.stringify({ message: "Failed to submit application." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
