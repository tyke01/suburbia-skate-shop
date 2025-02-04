import { ButtonLink } from "@/components/button-link";
import { Heading } from "@/components/heading";
import { Logo } from "@/components/logo";
import { CustomizerControlsProvider } from "./context";

import Link from "next/link";
import { createClient } from "@/prismicio";
import Preview from "./preview";
import { asImageSrc } from "@prismicio/client";
import Controls from "./controls";

type SearchParams = {
  wheel?: string;
  deck?: string;
  truck?: string;
  bolt?: string;
};

const page = async (props: { searchParams: Promise<SearchParams> }) => {
  const searchParams = await props.searchParams;

  const client = createClient();

  const customizerSettings = await client.getSingle("board_customizer");

  const { wheels, decks, metals } = customizerSettings.data;

  const defaultWheel =
    wheels.find((wheel) => wheel.uid === searchParams.wheel) ?? wheels[0];
  const defaultDeck =
    decks.find((deck) => deck.uid === searchParams.deck) ?? decks[0];
  const defaultTruck =
    metals.find((metal) => metal.uid === searchParams.truck) ?? metals[0];
  const defaultBolt =
    metals.find((metal) => metal.uid === searchParams.bolt) ?? metals[0];

  const wheelTextureURLs = wheels
    .map((texture) => asImageSrc(texture.texture))
    .filter((url): url is string => Boolean(url));

  const deckTextureURLs = decks
    .map((texture) => asImageSrc(texture.texture))
    .filter((url): url is string => Boolean(url));

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <CustomizerControlsProvider
        defaultWheel={defaultWheel}
        defaultDeck={defaultDeck}
        defaultTruck={defaultTruck}
        defaultBolt={defaultBolt}
      >
        <div className="relative aspect-squate shrink-0 bg-[#3a414a] lg:aspect-auto lg:grow">
          <div className="absolute inset-0">
            <Preview
              deckTextureURLs={deckTextureURLs}
              wheelTextureURLs={wheelTextureURLs}
            />
          </div>
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

          <Controls
            wheels={wheels}
            decks={decks}
            metals={metals}
            className="mb-6"
          />

          <ButtonLink href="" color="lime" icon="plus">
            Add to cart
          </ButtonLink>
        </div>
      </CustomizerControlsProvider>
    </div>
  );
};

export default page;
