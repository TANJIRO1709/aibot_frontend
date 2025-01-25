"use client";
import TypewriterEffect from "../components/ui/Typewriter";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { Input } from "../components/ui/input";
import axios from "axios";

const GeminiAi = () => {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<string>("");
    const [noOfResponses, setNoOfResponses] = useState(0);
    const [disable, setDisable] = useState(false);

    async function getResponse(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!prompt) {
            setResponse("");
            return;
        }
        setLoading(true);
        setResponse("");
        setDisable(true);

        try {
            const result = await axios.post(
                process.env.NEXT_PUBLIC_BASE_URL + "/api/ServiceHubAI",
                {
                    prompt: prompt,
                }
            );

            setResponse(result.data.response);
            setNoOfResponses(noOfResponses + 1);
        } catch (e: any) {
            console.error(e);
            setNoOfResponses(0);
            setDisable(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <section className="font-lato bg-white shadow-lg rounded-lg p-8 w-[90vw] max-w-2xl border border-brown-300">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-black">Property Price Analyser</h1>
                <p className="text-center text-gray-700 mb-6">Enter property details to predict the price instantly!</p>
                <form
                    onSubmit={getResponse}
                    className="flex flex-col gap-4 mb-6"
                >
                    <Input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter details (e.g., location, size, amenities)..."
                        id="realEstateAI"
                        name="prompt"
                        className="border-2 border-brown-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-brown-300"
                    />
                    <Button
                        type="submit"
                        className="h-10 bg-brown-600 text-black rounded-md hover:bg-brown-700 transition"
                        disabled={loading || disable}
                    >
                        {loading ? "Analyzing..." : "Property Price"}
                    </Button>
                </form>

                {noOfResponses > 0 && (
                    <div className="bg-brown-100  text-black rounded-xl py-4 px-6 border border-brown-300">
                        {response && (
                            <TypewriterEffect
                                text={response}
                                setDisable={setDisable}
                            />
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default GeminiAi;