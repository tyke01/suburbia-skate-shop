import { Bounded } from "@/components/bounded";
import { Heading } from "@/components/heading";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import React from "react";
import { Skater } from "./skater";

/**
 * Props for `TeamGrid`.
 */
export type TeamGridProps = SliceComponentProps<Content.TeamGridSlice>;

/**
 * Component for "TeamGrid" Slices.
 */
const TeamGrid = async ({
  slice,
}: TeamGridProps): Promise<React.JSX.Element> => {
  const client = createClient();
  const skaters = await client.getAllByType("skater");

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-navy"
    >
      <Heading as="h2" size="lg" className="text-center mb-8 text-white">
        <PrismicText field={slice.primary.heading} />
      </Heading>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {skaters.map((skater, index) => (
          <React.Fragment key={index}>
            {skater.data.first_name && <Skater skater={skater} index={index} />}
          </React.Fragment>
        ))}
      </div>
    </Bounded>
  );
};

export default TeamGrid;
