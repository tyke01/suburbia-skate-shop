import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next"
import { Logo } from "@/components/logo";
import { Bounded } from "./bounded";

export const Footer = async () => {

    const client = createClient();

    const settings = await client.getSingle("settings");

  return (
    <footer className="bg-texture bg-zinc-900 text-white overflow-hidden">
        <div className="relative  h-[75vh] ~p-10/16 md:aspect-auto">
        <PrismicNextImage field={settings.data.footer_image} alt="" fill className="object-cover" width={1200}/>

        <Logo className="pointer-events-none relative h-20 mix-blend-exclusion md:h-28"/>

        {/* Board physics */}
        </div>

        <Bounded as={"nav"}>
            <ul className="flex flex-wrap justify-center gap-8 ~text-lg/xl">
                {settings.data.navigation.map((item) => (
                    <li key={item.link.text} className="hover:underline">
                        <PrismicNextLink field={item.link}  />
                    </li>
                ))}
            </ul>
        </Bounded>

        {/* list of links */}
    </footer>
  )
}
