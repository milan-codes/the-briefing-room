import FaqItem, { FaqItemProps } from "./FaqItem";

interface FaqProps {
  items: FaqItemProps[];
}

const Faq: React.FC<FaqProps> = ({ items }) => (
  <div className="bg-[#FCFCFF] dark:bg-[#0A0F0D] min-h-screen">
    <div className="max-w-5xl mx-auto px-6 rounded-2xl">
      <h1 className="pt-24 pb-8 text-3xl font-semibold text-center text-gray-800 dark:text-gray-200 capitalize lg:text-4xl">
        Frequently Asked Questions
      </h1>
      {items.map(({ title, description }, index) => (
        <FaqItem key={index} title={title} description={description} />
      ))}
    </div>
  </div>
);

export default Faq;
