//GET
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

//Patch
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const exisistingPrompt = await Prompt.findById(params.id);
    if (!exisistingPrompt)
      return new Response("Prompt not found", { status: 404 });

    exisistingPrompt.prompt = prompt;
    exisistingPrompt.tag = tag;
    await exisistingPrompt.save();
    return new Response(JSON.stringify(exisistingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};
//Delete
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
