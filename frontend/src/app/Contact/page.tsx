import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import React from "react";

const formLabels = {
    name: "Nom",
    email: "Email",
    message: "Message",
    submit: "Envoyer",
};

export default function ProfilePage() {
    return (
        <div className="bg-[#faf2ea] flex flex-col items-center w-full min-h-screen">
            <div className="bg-[#faf2ea] w-full max-w-[1440px] relative">
                <section className="w-full px-4 py-16 flex flex-col items-center">
                    <h1 className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-2xl text-center tracking-[0] leading-normal mb-8">
                        NOUS CONTACTER
                    </h1>

                    <p className="max-w-[606px] mb-12 [font-family:'Playfair_Display-Medium', Helvetica] font-medium text-[#392e2c] text-xl text-center tracking-[0] leading-normal">
                        Nous adorons recevoir vos retours ! N&apos;hesitez pas a nous contacter pour toute question ou demande particuliere.
                    </p>

                    <div className="w-full max-w-[930px] flex flex-col">
                        <div className="flex flex-col md:flex-row gap-8 mb-8">
                            <div className="flex-1">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-xl tracking-[0] leading-normal"
                                >
                                    {formLabels.name}
                                </label>
                                <Input
                                    id="name"
                                    className="h-[55px] rounded-[5px] border border-solid border-[#ffae9d] bg-white"
                                />
                            </div>

                            <div className="flex-1">
                                <label
                                    htmlFor="enail"
                                    className="block mb-2 [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-xl tracking-[0] leading-normal"
                                >
                                    {formLabels.email}
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    className="h-[55px] rounded-[5px] border border-solid border-[#ffae9d] bg-white"
                                />
                            </div>
                        </div>

                        <div className="mb-8">
                            <label
                                htmlFor="message"
                                className="block mb-2 [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-xl tracking-[0] leading-normal"
                            >
                                {formLabels.message}
                            </label>
                            <Textarea
                                id="message"
                                placeholder="Message"
                                className="h-[150px] rounded-[5px] border border-solid border-[#ffae9d] bg-white [font-family:'Playfair_Display-Regular', Helvetica] font-normal text-base text-[#392e2c]"
                            />
                        </div>

                        <Button className="w-[129px] h-[42px] bg-[#ffae9d] rounded-[5px] border border-solid border-[#b39188] [font-family:'Playfair_Display-Medium', Helvetica] font-medium text-white text-xl">
                            {formLabels.submit}
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
}