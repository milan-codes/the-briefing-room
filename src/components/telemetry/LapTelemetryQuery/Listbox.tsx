import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { ComboboxOption } from "../EventQuery/Combobox";

interface ListboxProps {
  options: ComboboxOption[];
  value: string;
  placeholder: string;
  handleChange: (newSelection: string) => void;
}

const MyListbox: React.FC<ListboxProps> = (props) => {
  return (
    <div className="my-2">
      <Listbox
        value={props.value}
        onChange={(newState) => {
          props.handleChange(newState);
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-100 dark:bg-gray-800 py-2 pl-1 pr-10 text-left focus:outline-none sm:text-sm">
            <span className="block truncate pl-2 text-gray-900 dark:text-gray-300">
              {props.value === "" ? props.placeholder : props.value}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-50 dark:bg-gray-900 py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {props.options.map(({ id, label }) => (
                <Listbox.Option
                  key={id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-[#3772FF] text-gray-300" : "text-gray-900 dark:text-gray-300"
                    }`
                  }
                  value={label}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                      >
                        {label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-300">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default MyListbox;
