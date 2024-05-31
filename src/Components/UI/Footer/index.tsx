import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: '700',
  style: ['italic'],
});

const Footer = () => {
  return (
    <footer className="w-full py-4  text-center grid grid-cols-2 border-t-2">
      <div className=" border flex flex-col ">
        <h3 className={`text-3xl ${montserrat.className} b`}>FeedMe</h3>
        <div className="ml-5 hidden md:flex">
          <p> Powered by </p>
          <Link href="https://www.yelp.com" target="_blank">
            <Image
              src="/yelp_logo_cmyk.png"
              alt="Yelp"
              width={70}
              height={70}
              quality={100}
              className="ml-2"
            />
          </Link>
        </div>
      </div>
      <p className="font-semibold">&copy; 2024 FeedMe. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
