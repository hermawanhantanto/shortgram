"use client";

import { CldImage } from "next-cloudinary";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  crop?:
    | "crop"
    | "fill"
    | "scale"
    | "lfill"
    | "fill_pad"
    | "thumb"
    | "fit"
    | "limit"
    | "mfit"
    | "pad"
    | "lpad"
    | "mpad"
    | "imagga_scale"
    | "imagga_crop"
    | undefined;
}

const RenderImage = ({ src, alt, width, height, className, crop }: Props) => {
  return (
    <div className={`${className}`}>
      <CldImage
        src={src}
        width={width}
        height={height}
        alt={alt}
        crop={crop || undefined}
      />
    </div>
  );
};

export default RenderImage;
