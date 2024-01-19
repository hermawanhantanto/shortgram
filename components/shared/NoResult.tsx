import Image from "next/image";
import React from "react";
import Link from "next/link";

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
      <p className="body-regular max-w-[250px]">
        Sorry we cannot provide data, right now. Please wait and comeback again.
      </p>
      <Link
        className="body-semibold w-fit rounded bg-primary px-5 py-2.5 text-white"
        href="/"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NoResult;
