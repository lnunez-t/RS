"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useCartContext } from "@/lib/contexts/CartContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,

} from "@/components/ui/select";
import { SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Radio } from "lucide-react";

const cartItem = {
    name: 'La "bon chic, bon genre"',
    size: "Taille unique",
    price: "60,00 €",
    quantity: 1,
    image: "/banane3.svg",
};

const paymentMethods = [
    {id: "credit-card", label: "Carte de credit"},
    {id: "paypal", label: "Paypal"},
];

export default function PaymentPage() {
    const { cartItems } = useCartContext();
    return (
        <div className="bg-[#faf2ea] flex flex-row justify-center w-full min-h-screen">
            <div className="bg-[#faf2ea] w-full max-w-[1440px] relative">
                <div className="flex flex-row">
                    <div className="w-1/2 p-12">
                        <section className="mb-10">
                            <h2 className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-xl mb-4">
                                Contact
                            </h2>

                            <Input
                                className="w-full h-[35px] bg-white rounded-[5px] border border-solid border-[#ffae9d] mb-4"
                                placeholder="Email"
                            />

                            <div className="flex items-start mt-2">
                                <Checkbox
                                    id="marketing"
                                    className="w-4 h-4 rounded-[5px] border-[#ffae9d] mt-1"
                                />
                                <Label
                                    htmlFor="marketing"
                                    className="ml-2 [font-family:'Playfair_Display-Regular', Helvetica] font-normal text-[#392e2c] text-[10px]"
                                >
                                    Envoyez-moi des nouvelles et des offres par email
                                </Label> 
                            </div>

                            <div className="text-right">
                                <Button
                                    variant="link"
                                    className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-[15px] underline p-0"
                                >
                                    Se connecter
                                </Button>
                            </div>
                        </section>

                        <section className="mb-10">
                            <h2 className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-xl mb-4">
                                Livraison
                            </h2>

                            <Select defaultValue="France">
                                <SelectTrigger className="w-full h-[37px] bg-white rounded-[5px] border border-solid border-[#ffae9d] mb-4">
                                    <SelectValue placeholder="Pays/region" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="France">France</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="flex gap-4 mb-4">
                                <Input
                                    className="w-1/2 h-[35px] bg-white rounded-[5px] border border-solid border-[#ffae9d]"
                                    placeholder="Prenom"
                                />
                                <Input
                                    className="w-1/2 h-[35px] bg-white rounded-[5px] border border-solid border-[#ffae9d]"
                                    placeholder="Nom"
                                />
                            </div>

                            <Input
                                className="w-full h-[35px] bg-white rounded-[5px] border border-solid border-[#ffae9d] mb-4"
                                placeholder="Entreprise (optionnel)"
                            />

                            <Input
                                className="w-full h-[35px] bg-white rounded-[5px] border border-solid border-[#ffae9d] mb-4"
                                placeholder="Adresse"
                            />

                            <Input
                                className="w-full h-[35px] bg-white rounded-[5px] border border-solid border-[#ffae9d] mb-4"
                                placeholder="Appartement, suite, etc. (optionnel)"
                            />

                            <div className="flex gap-4 mb-4">
                                <Input
                                    className="w-1/2 h-[35px] bg-white rounded-[5px] border border-solid border-[#ffae9d]"
                                    placeholder="Code postal"
                                />
                                <Input
                                    className="w-1/2 h-[35px] bg-white rounded-[5px] border border-solid border-[#ffae9d]"
                                    placeholder="Ville"
                                />
                            </div>

                            <Input
                                className="w-1/2 h-[35px] bg-white rounded-[5px] border border-solid border-[#ffae9d]"
                                placeholder="Telephone"
                            />
                        </section>

                        <section className="mb-10">
                            <h2 className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-base mb-4">
                                Mode d'expedition
                            </h2>

                            <div className="w-full h-[46px] bg-[#e8e5e5] rounded-[5px] flex items-center justify-center">
                                <p className="[font-family:'Playfair_Display-Regular', Helvetica] font-normal text-[#696666] text-[10px] text-center">
                                    Saisissez votre adresse postale pour voir les modes d'expedition disponibles.
                                </p>
                            </div>
                        </section>

                        <section className="mb-10">
                            <h2 className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-xl mb-2">
                                Paiement
                            </h2>

                            <p className="[font-family:'Playfair_Display-Regular', Helvetica] font-normal text-[#696666] text-[10px] mb-4">
                                Toutes les transactions sont securisees et chiffrees.
                            </p>

                            <RadioGroup defaultValue="credit-card">
                                <div className="space-y-2">
                                    <div className="w-full bg-[#e8e5e5] rounded-t-[5px] border border-solid border-[#392e2c] p-2 flex items-center">
                                        <RadioGroupItem
                                            value="credit-card"
                                            id="credit-card"
                                            className="w-3 h-3 bg-[#696666] rounded-md mr-2"
                                        />
                                        <Label
                                            htmlFor="credit-card"
                                            className="[font-family:'Playfair_Display-Regular', Helvetica] font-normal text-[#392e2c] text-[10px]"
                                        >
                                            Carte de credit
                                        </Label>
                                    </div>

                                    <Card className="border-[#dddbdb] rounded-none">
                                        <CardContent className="p-4 space-y-4">
                                            <Input
                                                className="w-full h-[35px] bg-white rounded-[5px] border border-solid border-[#dddbdb]"
                                                placeholder="Numero de carte"
                                            />

                                            <div className="flex gap-4">
                                                <Input
                                                    className="w-3/5 h-[35px] bg-white rounded-[5px] border border-solid border-[#dddbdb]"
                                                    placeholder="Date d'expiration (MM/AA)"
                                                />
                                                <Input
                                                    className="w-2/5 h-[35px] bg-white rounded-[5px] border border-solid border-[#dddbdb]"
                                                    placeholder="Code de securite"
                                                />
                                            </div>

                                            <Input
                                                className="w-full h-[35px] bg-white rounded-[5px] border border-solid border-[#dddbdb]"
                                                placeholder="Nom sur la carte"
                                            />

                                            <div className="flex items-center">
                                                <Checkbox
                                                    id="billing-address"
                                                    className="w-4 h-4 rounded-[5px] border-[#d9d9d9]"
                                                />
                                                <Label
                                                    htmlFor="billing-address"
                                                    className="ml-2 [font-family:'Playfair_Display-Regular', Helvetica] font-normal text-[#392e2c] text-[9px]"
                                                >
                                                    Utiliser l'adresse d'expedition comme adresse de facturation
                                                </Label>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <div className="w-full h-[33px] bg-white border border-solid border-[dddbdb] flex items-center pl-4">
                                        <RadioGroupItem
                                            value="paypal"
                                            id="paypal"
                                            className="w-3 h-3 rounded-md mr-2"
                                        />
                                        <Label
                                            htmlFor="paypal"
                                            className="[font-family:'Playfair_Display-Regular', Helvetica] font-normal text-[#392e2c] text-[10px]"
                                        >
                                            Paypal
                                        </Label>
                                    </div>
                                </div>
                            </RadioGroup>
                        </section>

                        <section className="mb-10">
                            <h2 className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-base mb-4">
                                Se souvenir de moi
                            </h2>

                            <div className="flex items-center mb-4">
                                <Checkbox
                                    id="save-info"
                                    className="w-4 h-4 rounded-[5px] border-[#ffae9d]"
                                />
                                <Label
                                    htmlFor="save-info"
                                    className="ml-2 [font-family:'Playfair_Display-Regular', Helvetica] font-normal text-[#b39188] text-xs"
                                >
                                    Sauvegarder mes informations pour mes prochaines commandes
                                </Label>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-start mb-4">
                                <Checkbox
                                    id="terms"
                                    className="w-4 h-4 rounded-[5px] border-[#392e2c] mt-1"
                                />
                                <Label
                                    htmlFor="terms"
                                    className="ml-2 [font-family:'Playfair_Display-Regular', Helvetica] font-normal text-[#392e2c] text-xs text-justify"
                                >
                                    En cliquant sur ce bouton, j'accepte les conditions d'utilisation, la politique d'echanges et retours, la politique de livraison et la politique de confidentialite.
                                </Label>
                            </div>

                            <Button className="w-full h-[35px] bg-[#392e2c] rounded-[5px] [font-family:'Playfair_Display-Regular', Helvetica] font-normal text-white ext-sm mb-8">
                                Payer la commande
                            </Button>

                            <Separator className="mb-2" />
                        </section>
                    </div>

                    <div className="w-1/2 bg-neutral-100 border border-solid border-[#d9d9d9] p-12">
                        <div className="flex items-start mb-12">
                            <div className="relative mr-6">
                                <img
                                    className="w-[100px] h-[100px] object-cover"
                                    alt="Banane"
                                    src="/banane3.svg"
                                />
                                <div className="absolute -top-2 -right-2 w-[23px] h-[23px] bg-[#392e2c] rounded-full border border-solid flex items-center justify-center">
                                    <span className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-white text-xl">
                                        1
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1">
                                <h3 className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-[15px]">
                                    La "bon chic, bon genre"
                                </h3>
                                <p className="[font-family:'Playfair_Display-Regular', Helvetica] font-normal text-[#392e2c] text-xs">
                                    Taille unique
                                </p>
                            </div>

                            <div className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-[15px] text-right">
                                60,00 €
                            </div>
                        </div>

                        <div className="flex mb-6">
                            <Input
                                className="flex-1 h-[35px] bg-white rounded-[5px] border border-solid border-[#696666] mr-2"
                                placeholder="Code promo ou carte cadeau"
                            />
                            <Button className="w-[73px] h-[35px] bg-white rounded-[5px] border border-solid border-[#696666] [font-family:'Playfair_Display-Regular', Helvetica] font-normal text-[#392e2c] text-xs">
                                Appliquer
                            </Button>
                        </div>

                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between">
                                <p className="[font-family:'Playfair_Display-Regular', Helvetica] font-normal text-[#392e2c] text-xs">
                                    Sous-total - 1 article(s)
                                </p>
                                <p className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-[15px] text-right">
                                    60,00 €
                                </p>
                            </div>

                            <div className="flex justify-between">
                                <p className="[font-family:'Playfair_Display-Regular', Helvetica] font-normal text-[#392e2c] text-xs">
                                    Livraison
                                </p>
                                <p className="[font-family:'Playfair_Display-Regular', Helvetica] font-normal text-[#392e2c] text-[10px] text-right">
                                    Saisir une adresse de livraison
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                            <h3 className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-xl">
                                Total
                            </h3>
                            <div className="flex items-center">
                                <span className="[font-family:'Playfair_Display-Regular', Helvetica] font-normal text-[#392e2c] text-xs mr-1">
                                    EUR
                                </span>
                                <span className="[font-family:'Playfair_Display-Bold', Helvetica] font-bold text-[#392e2c] text-xl">
                                    60,00 €
                                </span>
                            </div>
                        </div>

                        <p className="[font-family:'Playfair_Display-Regular', Helvetica] font-normal text-[#392e2c] text-[11px]">
                            Taxes incluses
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}