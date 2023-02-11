import FaqItem, { FaqItemProps } from "./FaqItem";

const Faq: React.FC = () => {
  return (
    <div className="mx-auto max-w-screen-lg py-16">
      <h1 className="text-gray-900 dark:text-gray-100 text-center text-3xl font-bold sm:text-4xl pb-10">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4 px-4">
        {items.map((item, index) => (
          <FaqItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

const items: FaqItemProps[] = [
  {
    title: "Where do we get the data from?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "How accurate is the data?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Do you collect personal information about me?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Is this unofficial software?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "How can I support the project?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export default Faq;
