import { ButtonLink } from "@/components/button-link";
import { Heading } from "@/components/heading";
import { Logo } from "@/components/logo";
import { CustomizerControlsProvider } from "./context";

import Link from "next/link";
import { createClient } from "@/prismicio";

const page = async () => {
  const client = createClient();

  const customizerSettings = await client.getSingle("board_customizer");

  const { wheels, decks, metals } = customizerSettings.data;

  const defaultWheel = wheels[0];
  const defaultDeck = decks[0];
  const defaultTruck = metals[0];
  const defaultBolt = metals[0];

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <CustomizerControlsProvider
        defaultWheel={defaultWheel}
        defaultDeck={defaultDeck}
        defaultTruck={defaultTruck}
        defaultBolt={defaultBolt}
      >
        <div className="relative aspect-squate shrink-0 bg-[#3a414a] lg:aspect-auto lg:grow">
          {/* preview */}
          <Link href="/" className="absolute left-6 top-6">
            <Logo className="h-12 text-white" />
          </Link>
        </div>

        <div className="grow bg-texture bg-zinc-900 text-white ~p-4/6 lg:w-96 lg:shrink-0 lg:grow-0">
          {/* sidebar */}
          <Heading as="h1" size="sm" className="mb-6 mt-0">
            Build Your Board
          </Heading>

          <ButtonLink href="" color="lime" icon="plus">
            Add to cart
          </ButtonLink>
        </div>
      </CustomizerControlsProvider>
    </div>
  );
};

export default page;
