import {Card, CardContent} from "@/components/ui/card";
import { Footprints, Heart, Leaf } from "lucide-react";
import React from "react";


const engagements = [
    {
        title: "Fabrication eco-responsable",
        icon: <Leaf className="h-12 w-12 text-[#ccaea4]" />,
    },
    {
        title: "Produits faits main",
        icon: <Heart className="h-12 w-12 text-[#ccaea4]" />,
    },
    {
        title: "Reduction de l'empreinte carbone",
        icon: <Footprints className="h-12 w-12 text-[#ccaea4]" />,
    },
];

const EngagementsSection =  ({ children }: { children?: React.ReactNode }) => {
    return (
        <section className="w-full py-10 bg-white">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold text-[#392e2c] text-center mb-12 [font-family:'Playfair_Display-Bold', Helvetica]">
                    NOS ENGAGEMENTS
                </h2>

                <div className="flex flex-wrap justify-center gap-8">
                    {engagements.map((engagement, index) => (
                        <Card key={index} className="border-none shadow-none w-[269px]">
                            <CardContent className="p-0 flex flex-col items-center">
                                <div className="relative mb-6 ">
                                    <div className="w-[100px] h-[100px] rounded-full border-[3px] border-[#ffae9d] flex items-center justify-center">
                                        {engagement.icon}
                                    </div>        
                                </div>
                                <h3 className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-base text-center">
                                    {engagement.title}
                                </h3>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        <main>{children}</main>
        </section>
    );
}

export default EngagementsSection;