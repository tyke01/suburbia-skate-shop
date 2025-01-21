import { Bounded } from "@/components/bounded";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import Image from "next/image";

import { LazyYouTubePlayer } from "./lazy-youtube-player";

const MASK_CLASSES =
  " [mask-image:url(/video-mask.png)] [mask-mode:alpha] [mask-position:center_center] [mask-repeat:no-repeat] [mask-size:100%_auto]";
/**
 * Props for `VideoBlock`.
 */
export type VideoBlockProps = SliceComponentProps<Content.VideoBlockSlice>;

/**
 * Component for "VideoBlock" Slices.
 */

const VideoBlock = ({ slice }: VideoBlockProps): React.JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-zinc-900"
    >
      <h2 className="sr-only">Video Reel</h2>

      <div className="relative aspect-video">
        {/* masks */}
        <div
          className={clsx(
            MASK_CLASSES,
            "absolute inset-0  bg-brand-lime ~translate-x-2/3 ~translate-y-2/3"
          )}
        />

        <div
          className={clsx(
            MASK_CLASSES,
            "absolute inset-0  bg-white ~translate-x-1/3 ~translate-y-1/2"
          )}
        />

        <div
          className={clsx(
            MASK_CLASSES,
            "absolute inset-0  bg-white ~translate-x-1/2 ~-translate-y-1/3"
          )}
        />

        {/* video */}
        <div className={clsx(MASK_CLASSES, "relative h-full")}>
          {isFilled.keyText(slice.primary.youtube_video_id) ? (
            <LazyYouTubePlayer youTubeID={slice.primary.youtube_video_id} />
          ) : null}
        </div>

        {/* texture overlay */}
        <Image
          src="/image-texture.png"
          alt=""
          fill
          className="pointer-events-none object-cover opacity-50"
        />
      </div>
    </Bounded>
  );
};

export default VideoBlock;
