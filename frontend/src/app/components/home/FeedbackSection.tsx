import {Card, CardContent} from "@/components/ui/card";
import { User } from "lucide-react";
import React from "react";

const reviews = [
    {
        name: "Sandra",
        headline: "Super qualite !",
        rating: 4.5,
        content: "Lorem ipsum",
    },
    {
        name: "Maxime",
        headline: "Tres content",
        rating: 4,
        content: "Lorem ipsum",
    },
    {
        name: "Laura",
        headline: "Livraison rapide",
        rating: 4.5,
        content: "Lorem ipsum",
    },
];

const renderStars = (rating: number) => {
    return (
        <div className="flex">
            {
                [1, 2, 3, 4, 5].map((star) => (
                    <svg 
                        key={star}
                        className="w-[15px] h-3.5 mr-1"
                        viewBox="0 0 15 14"
                        fill={star <= Math.floor(rating) ? "#FFD700" : "#E0E0E0"}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d = "M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z" />
                    </svg>
                ))
            }
        </div>
    );
    };


const FeedbackSection =  ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="w-full py-12 bg-white">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold text-[#392e2c] text-center mb-12 [font-family:'Playfair_Display-Bold', Helvetica]">
                    VOS RETOURS
                </h2>

                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-[286px] h-[286px] bg-[#faf2ea] rounded-full flex flex-col items-center justify-center">
                        <p className="text-8xl font-bold text-[#ffae9d] text-center [font-family:'Playfair_Display-Bold', Helvetica] [text-shadow:0px_4px_4px_#00000040]">
                            42
                        </p>
                        <p className="text-xl font-bold text-[#392e2c] text-center mt-2 [font-family:'Playfair_Display-Bold', Helvetica]">
                            produits upcycles 
                        </p>
                    </div>

                    <Card className="w-full md:w-[880px] bg-[#faf2ea] rounded-[20px] border-none">
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {reviews.map((review, index) => (
                                    <Card
                                    key={index}
                                    className="bg-white rounded-[15px] border-none"
                                >
                                    <CardContent className="p-5">
                                        <div className="mb-4">{renderStars(review.rating)}</div>
                                        <div className="flex items-center mt-6">
                                            <div className="w-9 h-9 bg-[#ffae9d] rounded-18px] flex items-center justify-center">
                                                <User className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="ml-2 font-bold text-sm text-[#392e2c] [font-family:'Playfair_Display-Bold', Helvetica]">
                                                {review.name}
                                            </span>
                                        </div>

                                        <p className="mt-4 font-bold text-[11px] text-[#ffae9d] [font-family:'Playfair_Display-Bold', Helvetica]">
                                            {review.headline}
                                        </p>

                                        <p className="mt-2 font-bold text-[10px] text-[#392e2c] [font-family:'Playfair_Display-Bold', Helvetica]">
                                            {review.content}
                                        </p>
                                    </CardContent>
                                </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        <main>{children}</main>
        </section>
    );
};

export default FeedbackSection;