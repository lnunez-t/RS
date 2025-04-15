import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import React from "react";

const NewsletterSection =  ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="w-full py-16 bg-[#ccaea4]">
            <Card className="max-w-[1440px] mx-auto bg-transparent border-none shadow-none">
                <CardContent className="flex flex-col items-center justify-center space-y-6 p-6">
                    <div className="font-bold text-base text-[#faf2ea] text-center font-['Playfair_Display-Bold', Helvetica]">
                        NEWSLETTER
                    </div>

                    <h2 className="font-bold text-xl text-[#392e2c] text-center max-w-[426px] font-['Playfair_Display-Bold', Helvetica]">
                        Rejoignez des maintenant notre communaute
                    </h2>

                    <div className="font-bold text-base text-[#faf2ea] text-center max-w-[360px] font-['Playfair_Display-Bold', Helvetica]">
                        Inscrivez-vous ci-dessous
                    </div>

                    <div className="relative w-full max-w-[449px]">
                        <Input
                            className="h-[42px] rounded-[20px] pl-4 pr-12 py-2 text-sm font-bold text-[#b39188] font-['Playfair_Display-Bold', Helvetica]"
                            placeholder="Adresse mail"
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                            aria-label="Subscribe"
                        >
                            <ArrowRight className="h-6 w-6" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        <main>{children}</main>
        </section>
    );
}

export default NewsletterSection;