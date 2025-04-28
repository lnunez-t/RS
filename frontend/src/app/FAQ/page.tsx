import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import React from "react";

const faqItems = [
    {question: "Quand vais-je recevoir ma commande ?"},
    {question: "Quand vais-je recevoir ma commande ?"},
    {question: "Quand vais-je recevoir ma commande ?"},
    {question: "Quand vais-je recevoir ma commande ?"},
    {question: "Quand vais-je recevoir ma commande ?"},
    {question: "Quand vais-je recevoir ma commande ?"},
    {question: "Quand vais-je recevoir ma commande ?"},
    {question: "Quand vais-je recevoir ma commande ?"},
    {question: "Quand vais-je recevoir ma commande ?"},
];

export default function ProfilePage() {
    return (
        <div className="bg-[#faf2ea] flex flex-col items-center w-full min-h-screen">
            <div className="bg-[#faf2ea] w-full max-w-[1440px] relative">
                <main className="flex flex-col items-center px-4 py-16">
                    <h1 className="text-2xl font-bold text-center text-[#392e2c] [font-family:'Playfair_Display-Bold', Helvetica] mb-16">
                        FAQ
                    </h1>

                    <p className="max-w-[454px] text-base font-medium text-center text-[#392e2c] [font-family:'Playfair_Display-Medium', Helvetica] mb-16">
                        Retrouvez ici les questions les plus frequentes.
                    </p>

                    <div className="w-full max-w-[765px]">
                        <Accordion type="single" collapsible className="w-full">
                            {faqItems.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className={`bg-white border border-solid border-[#ffae9d] ${
                                        index === 0 ? "rounded-t-[5px]" : ""
                                    } ${index === faqItems.length - 1 ? "rounded-b-[5px]" : ""}
                                    `}
                                >
                                    <AccordionTrigger className="cursor-pointer py-1.5 px-4 h-[55px] [font-family:'Playfair_Display-Medium', Helvetica] font-medium text-[#b39188] text-[15px] hover:no-underline">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 py-2 text-[#b39188] [font-family:'Playfair_Display-Medium', Helvetica]">
                                        Contenu de la reponse
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </main>
            </div>
        </div>
    );
}