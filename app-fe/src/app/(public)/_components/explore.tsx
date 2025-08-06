import Image from "next/image";

type CardData = {
  image: string;
  name: string;
  description: string;
  tags: string[];
};

const cardsData: CardData[] = [
  {
    image: "/dummy/masala_dosa.png",
    name: "Masala Dosa",
    description:
      "Masala Dosa is a popular South Indian breakfast dish. It is a crispy and savory crepe made from fermented rice and lentil batter, filled with a spicy and savory mixture of mashed potatoes.",
    tags: ["south_indian", "veg", "spicy"],
  },
  {
    image: "/dummy/kung_pao_cauliflower.png",
    name: "Kung Pao Cauliflower",
    description:
      "Kung Pao Cauliflower is a delicious, spicy vegetarian version of the classic Chinese stir-fry dish, Kung Pao Chicken. Roasted cauliflower is tossed with bell peppers, peanuts, and a sizzling sauce that features a bold blend of savory, spicy, and slightly sweet flavors.",
    tags: ["chinese", "veg", "spicy"],
  },
  {
    image: "/dummy/rajasthani_gatte_ki_sabzi.png",
    name: "Rajasthani Gatte Ki Sabzi",
    description:
      "A traditional Rajasthani vegetarian dish featuring spicy and tangy gram flour dumplings cooked in a spicy yogurt-based curry.",
    tags: ["rajasthani", "veg"],
  },
  {
    image: "/dummy/pyaaz_ki_kachori.png",
    name: "Pyaaz Ki Kachori",
    description:
      "Pyaaz ki kachori is a popular spicy breakfast snack from Rajasthan, featuring a pastry filled with a rich and spicy onion mixture.",
    tags: ["rajasthani", "spicy", "veg"],
  },
  {
    image: "/dummy/punjabi_chole.png",
    name: "Punjabi Chole",
    description:
      "Punjabi Chole is a flavorful and hearty North Indian dish made from chickpeas cooked in a spicy tomato-based sauce, seasoned with traditional Indian spices. It's a popular vegetarian dish often served with rice or flatbreads.",
    tags: ["punjabi", "veg"],
  },
];

const ExploreSection = () => {
  return (
    <section id="explore" className="w-full py-20">
      <h4 className="pb-10 w-full flex justify-center items-center text-xl md:text-3xl lg:text-4xl font-semibold">
        Explore the Library
      </h4>
      <ExploreCards />
    </section>
  );
};

export default ExploreSection;

const CreateCard = ({ card }: { card: CardData }) => (
  <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0">
    <Image
      src={card.image}
      alt="User Image"
      height={60}
      width={90}
      className="w-full rounded-2xl"
    />
    <div className="flex flex-col gap-1 p-1 py-3">
      <p className=" font-semibold">{card.name}</p>
      <p className="text-xs py-4 text-gray-800">{card.description}</p>
    </div>
  </div>
);

const ExploreCards = () => {
  return (
    <>
      <style>{`
            @keyframes marqueeScroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }

            .marquee-inner {
                animation: marqueeScroll 25s linear infinite;
            }

            .marquee-reverse {
                animation-direction: reverse;
            }
        `}</style>

      <div className="marquee-row w-full overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
        <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>

      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
        <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </>
  );
};
