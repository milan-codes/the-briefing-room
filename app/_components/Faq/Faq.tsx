import FaqItem, { FaqItemProps } from "./FaqItem";

const Faq: React.FC = () => {
  return (
    <div className="mx-auto max-w-screen-lg py-16" id="faq">
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
    title: "Is this unofficial software?",
    description:
      "Yes, it is UNOFFICIAL. The creator of this website is in no way, shape or form linked to FORMULA 1, Liberty Media, the FIA or any other organization. This website was created only for fun, and educational purposes and it does not generate any revenue. All rights belong to their respective owners. It is a web application developed by passionate fans of the sport to provide fellow enthusiasts with a unique way to analyze and engage with telemetry data and statistics. Any insights or data derived from the app should be regarded as unofficial and for informational purposes only.",
  },
  {
    title: "Where do we get the data from?",
    description:
      "The data is provided by the amazing FastF1 package. Checkout their GitHub page & docs for more information.",
  },
  {
    title: "How accurate is the data?",
    description:
      "There is a margin of error in telemetry data, attributed to the intermittent nature of the data samples, which prevents the dataset from being entirely continuous in nature.",
  },
  {
    title: "Do you collect any data about me?",
    description:
      "Absolutely not. Your interactions with the app, and usage remain entirely confidential and are not gathered or stored by us.",
  },
  {
    title: "How can I support the project?",
    description:
      "We welcome and encourage contributions from the community to enhance The Briefing Room app. If you have coding skills, insights, or ideas to improve the app, you can actively participate in its development on the project's GitHub repositories. Whether it's fixing bugs, adding new features, or suggesting improvements, your input can make a significant difference. By collaborating with us on GitHub, you can help shape the future of this app and create a more comprehensive and valuable resource for all F1 fans.",
  },
];

export default Faq;
