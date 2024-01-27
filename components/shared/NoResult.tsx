import Image from "next/image";
import React from "react";

const NoResult = () => {
  return (
    <div className="flex-center mt-14 w-full flex-col gap-4 ">
      <Image
        src="/assets/images/noresult.png"
        width={500}
        height={500}
        alt="No result"
        className="object-contain"
      />
      <h4 className="h3-bold text-primary">No Results</h4>
    </div>
  );
};

export default NoResult;
