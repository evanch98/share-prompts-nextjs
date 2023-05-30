import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { toast } from "react-hot-toast";

export const POST = async (req) => {
	const { userId, prompt, tag } = await req.json();

	try {
		await connectToDB();
		const newPrompt = new Prompt({
			creator: userId,
			prompt,
			tag,
		});

		await newPrompt.save();

		return new Response(JSON.stringify(newPrompt), { status: 201 });
	} catch (error) {
		toast.error("Failed to create a new prompt.");
		return new Response("Failed to create a new prompt", { status: 500 });
	}
};