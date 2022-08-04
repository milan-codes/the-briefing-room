import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

export interface FaqItemProps {
  title: string;
  description: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ title, description }) => (
  <Disclosure>
    {({ open }) => (
      <>
        <Disclosure.Button className="flex justify-between items-center w-full px-5 py-4 my-4 text-left bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
          <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</span>
          <ChevronUpIcon
            className={`${
              open ? "transform duration-200 rotate-180" : "duration-200"
            } w-7 h-7 text-red-600`}
          />
        </Disclosure.Button>
        <Disclosure.Panel className="px-4 pb-4 text-gray-700 dark:text-gray-300">
          {description}
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
);

export default FaqItem;
