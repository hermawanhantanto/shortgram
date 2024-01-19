import Image from "next/image";
import React from "react";

interface Props {
  image: string;
  label: string;
  alt: string;
}

const Metric = ({ image, label, alt }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        width={20}
        height={20}
        src={image}
        alt={alt}
        className="invert-colors object-contain"
      />
      <p className="small-medium">{label}</p>
    </div>
  );
};

export default Metric;
