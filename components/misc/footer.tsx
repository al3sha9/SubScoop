import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const year = new Date(Date.now()).getFullYear();

  return (
    <footer className="">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center  sm:justify-start">
            <Link href="https://typs.dev/" className="flex flex-row justify-center items-center space-x-2" target="_blank" rel="norefferer" ><Image alt="typs.dev" src="https://typs.dev/logo.png" width={25} height={25} /><span className="font-bold text-md">typs.dev</span></Link>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            Copyright &copy; {year}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
