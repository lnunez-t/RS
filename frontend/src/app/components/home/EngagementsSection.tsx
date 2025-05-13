import { Card, CardContent } from "@/components/ui/card";
import { Footprints, Heart, Leaf } from "lucide-react";
import React from "react";

const engagements = [
  {
    title: "Fabrication éco-responsable",
    icon: <Leaf className="h-12 w-12 text-[#ccaea4]" />,
  },
  {
    title: "Produits faits main",
    icon: <Heart className="h-12 w-12 text-[#ccaea4]" />,
  },
  {
    title: "Réduction de l'empreinte carbone",
    icon: <Footprints className="h-12 w-12 text-[#ccaea4]" />,
  },
];

const EngagementsSection = ({ children }: { children?: React.ReactNode }) => {
  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#392e2c] text-center mb-12 font-playfair">
          NOS ENGAGEMENTS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
          {engagements.map((engagement, index) => (
            <Card
              key={index}
              className="border-none shadow-none w-full max-w-[269px] bg-transparent"
            >
              <CardContent className="p-0 flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="w-[100px] h-[100px] rounded-full border-[3px] border-[#ffae9d] flex items-center justify-center">
                    {engagement.icon}
                  </div>
                </div>
                <h3 className="text-center text-[#392e2c] text-base font-bold font-playfair">
                  {engagement.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {children && <main>{children}</main>}
    </section>
  );
};

export default EngagementsSection;
