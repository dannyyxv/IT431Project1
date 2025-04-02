import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const Home: FC = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-blue-500 to-purple-500">
              Welcome to XGMX's Gaming Shop!
            </span>
          </h1>
          <p className="text-lg text-white-600 mb-6">
            Enjoy a variety of top picks surely elevating your game to the next level.
          </p>
          <Link href="/products">
            <Button className="bg-gradient-to-r from-red-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg">
              Explore Our Products
            </Button>
          </Link>
        </div>
        
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-blue-500 to-red-500">
            Why Choose Us?
          </h2>
          <p className="text-lg text-white-600 text-center mb-8">
            Offering gaming products meant to enchance your experience, these highly rated choices will surely be good for you.
          </p>
        </section>

        <div className="mt-12 flex justify-center">
          <img src="/comp.png" alt="Gaming Banner" className="w-full max-w-4xl rounded-lg shadow-lg" />
        </div>
      </main>
    </div>
  );
};

export default Home;
