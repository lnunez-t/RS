"use client";

import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { useRouter } from "next/navigation";

const collections = [
    {
        id: 1,
        title: "VETEMENTS",
        backgroundImage: "/vetements.svg",
        isHeader: false,
    },
    {
        id: 2,
        title: "CHOUCHOUS",
        backgroundImage: "/chouchous.svg",
        headerText: "COLLECTIONS",
    },
    {
        id: 3,
        title: "BANANES",
        backgroundImage: "/bananes.svg",
        isHeader: false,
    },
];

const CollectionsSection = ({ children }: { children?: React.ReactNode }) => {
    const router = useRouter();

    return (
        <section className="w-full py-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#392e2c] text-center mb-12 font-playfair">
                COLLECTIONS
            </h2>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {collections.map((collection) => (
                        <div
                            key={collection.id}
                            className="relative w-full"
                        >
                            <Card
                                className="relative h-[400px] sm:h-[500px] md:h-[644px] rounded-lg border-none"
                                style={{
                                    backgroundImage: `url(${collection.backgroundImage})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <CardContent className="p-0 h-full flex flex-col items-center justify-between">
                                    <div className="flex-grow" />
                                    <button
                                        onClick={() => router.push("/Shop")}
                                        className="cursor-pointer mb-[60px] w-[269px] sm:w-[200px] h-[43px] sm:h-[50px] border border-white text-white text-lg sm:text-xl font-bold text-center [font-family:'Playfair_Display-Bold',Helvetica] hover:bg-white hover:text-[#392e2c] transition duration-300"
                                    >
                                        {collection.title}
                                    </button>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
            {children && <main>{children}</main>}
        </section>
    );
};

export default CollectionsSection;
