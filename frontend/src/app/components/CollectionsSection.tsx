import {Card, CardContent} from "@/components/ui/card";
import React from "react";

const collections = [
    {
        id: 1,
        title: "VETEMENTS",
        backgroundImage: "/vetements.svg",
        isHeader: false,
    },
    {
        id: 2,
        title: "CHOUCOUS",
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

const CollectionsSection =  ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="w-full flex flex-row">
            {collections.map((collection) => (
                <Card
                    key={collection.id}
                    className="relative w-full h-[644px] rounded-none border-none"
                    style={{
                        backgroundImage: `url(${collection.backgroundImage})`,
                        backgroundSize: "100% 100%",
                      }}
                >
                    <CardContent className="p-0 h-full flex flex-col justify-between">
                        {collection.isHeader && (
                            <div className="w-[269px] mt-4 mx-auto [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-white text-2xl text-center">
                                {collection.headerText}
                            </div>
                        )}

                        <div className="w-[274px] h-[43px] mx-auto mb-[67px]">
                            <div className="relative w-[272px] h-[43px]">
                                <div className="w-[269px] h-[43px] border border-solid border-white absolute left-0" />
                                <div className="absolute w-[269px] h-[43px] top-[9px] left-[3px] [font-family:'Playfair_Display-Bold', Helvetica] font-bold text-white text-xl text-center">
                                    {collection.title}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        <main>{children}</main>
        </section>
    );
}

export default CollectionsSection;