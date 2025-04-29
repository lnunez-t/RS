"use client";

import {Card, CardContent} from "@/components/ui/card";
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

const CollectionsSection =  ({ children }: { children?: React.ReactNode }) => {
    const router = useRouter();

    return (
        <section className="w-full ">
            <div className="flex w-full">
            {collections.map((collection) => (
                <div
                    key={collection.id}
                    className="w-1/3 relative"
                >
                    <Card
                        className="relative h-[644px] rounded-none border-none"
                        style={{
                            backgroundImage: `url(${collection.backgroundImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <CardContent className="p-0 h-full flex flex-col items-center justify-between">
                            {collection.headerText && (
                                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-white text-3xl font-bold text-center z-10 [font-family:'Playfair_Display-Bold',Helvetica]">
                                    {collection.headerText}
                                </div>
                            )}
                            <div className="flex-grow" />
                            <button
                            onClick={() => router.push("/Shop")}
                            className="cursor-pointer mb-[60px] w-[269px] h-[43px] border border-white text-white text-xl font-bold text-center [font-family:'Playfair_Display-Bold',Helvetica] hover:bg-white hover:text-[#392e2c] transition duration-300"
                            >
                            {collection.title}
                            </button>
                        </CardContent>
                    </Card>
                </div>
            ))}
            </div>
            
        <main>{children}</main>
        </section>
    );
}

export default CollectionsSection;