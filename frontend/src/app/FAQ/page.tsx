import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import React from "react";

const faqItems = [
  { question: "Quand vais-je recevoir ma commande ?" },
  { question: "Puis-je modifier mon adresse de livraison après commande ?" },
  { question: "Quels sont les délais de livraison ?" },
  { question: "Quels moyens de paiement acceptez-vous ?" },
  { question: "Livrez-vous à l'étranger ?" },
  { question: "Comment retourner un article ?" },
  { question: "Puis-je suivre ma commande ?" },
  { question: "Que faire si j’ai reçu un article endommagé ?" },
  { question: "Comment nous contacter ?" },
];

export default function ProfilePage() {
  return (
    <div className="bg-[#faf2ea] flex flex-col items-center w-full min-h-screen px-4 sm:px-6">
      <div className="w-full max-w-screen-xl">
        <main className="flex flex-col items-center py-16">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#392e2c] font-playfair mb-10">
            FAQ
          </h1>

          <p className="max-w-md text-base sm:text-lg font-medium text-center text-[#392e2c] font-playfair mb-10">
            Retrouvez ici les questions les plus fréquentes.
          </p>

          <div className="w-full max-w-2xl">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white border border-[#ffae9d] rounded-md overflow-hidden"
                >
                  <AccordionTrigger className="cursor-pointer px-4 py-4 text-[#b39188] font-playfair font-medium text-base sm:text-lg hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 text-[#b39188] font-playfair text-sm sm:text-base">
                    Contenu de la réponse.
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
