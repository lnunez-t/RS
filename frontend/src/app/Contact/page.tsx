import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const formLabels = {
  name: "Nom",
  email: "Email",
  message: "Message",
  submit: "Envoyer",
};

export default function ProfilePage() {
  return (
    <div className="bg-[#faf2ea] flex flex-col items-center w-full min-h-screen px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-screen-xl">
        <section className="py-16 flex flex-col items-center">
          <h1 className="font-playfair font-bold text-[#392e2c] text-2xl sm:text-3xl text-center mb-8">
            NOUS CONTACTER
          </h1>

          <p className="max-w-xl font-playfair text-[#392e2c] text-base sm:text-lg text-center mb-12">
            Nous adorons recevoir vos retours ! N&apos;hésitez pas à nous contacter pour toute question ou demande particulière.
          </p>

          <form className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="block mb-2 font-playfair font-semibold text-[#392e2c] text-base sm:text-lg"
                >
                  {formLabels.name}
                </label>
                <Input
                  id="name"
                  className="h-[50px] rounded border border-[#ffae9d] bg-white"
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="block mb-2 font-playfair font-semibold text-[#392e2c] text-base sm:text-lg"
                >
                  {formLabels.email}
                </label>
                <Input
                  id="email"
                  type="email"
                  className="h-[50px] rounded border border-[#ffae9d] bg-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-2 font-playfair font-semibold text-[#392e2c] text-base sm:text-lg"
              >
                {formLabels.message}
              </label>
              <Textarea
                id="message"
                placeholder="Message"
                className="min-h-[150px] rounded border border-[#ffae9d] bg-white font-playfair text-[#392e2c]"
              />
            </div>

            <div className="flex justify-center mt-4">
              <Button className="bg-[#ffae9d] hover:bg-[#f79d8b] rounded px-6 py-2 font-playfair text-white text-base sm:text-lg border border-[#b39188]">
                {formLabels.submit}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
