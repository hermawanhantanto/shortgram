import Image from "next/image";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <section className="flex max-h-screen justify-between">
      <div className="p-36">{children}</div>
      <Image
        src="/assets/images/login-page.jpg"
        alt="Login Page"
        width={500}
        height={500}
        className="w-1/2 object-cover "
      />
    </section>
  );
};

export default Layout;
