"use client";
import Image from "next/image";

const Loading = () => {
  return (
    <div>
      <Image
        src={"/assets/loading/spinner.svg"}
        alt={"loading.svg"}
        width={25}
        height={25}
      />
    </div>
  );
};

export default Loading;
