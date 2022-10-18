import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

export interface ComboboxOption {
  id: number;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  placeholder: string;
  handleChange: (newState: ComboboxOption) => void;
  value: string;
  error: boolean;
}

const MyCombobox: React.FC<ComboboxProps> = (props) => {
  const [query, setQuery] = useState("");
  const inputStyle = "relative w-full cursor-default overflow-hidden rounded-lg text-left";

  const filteredOptions =
    query === ""
      ? props.options
      : props.options.filter(({ label }) =>
          label.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div>
      <Combobox
        value={props.value}
        onChange={(newSelection) => {
          if (props.handleChange && newSelection != null) {
            const selectedOption = props.options.find((option) => option.label === newSelection)!;
            props.handleChange(selectedOption);
          }
        }}
        nullable
      >
        <div className="relative mt-1 ml-4">
          <div
            className={
              props.error ? inputStyle + " border-[1px] border-solid border-red-400" : inputStyle
            }
          >
            <Combobox.Input
              className="w-full py-2 pl-3 pr-4 text-sm leading-5 text-gray-900 bg-[#FCFCFF]"
              placeholder={props.placeholder}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#FCFCFF] text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-3 px-5 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map(({ id, label }) => (
                  <Combobox.Option
                    key={id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-[#3772FF] text-white font-bold" : "text-gray-900"
                      }`
                    }
                    value={label}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                        >
                          {label}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default MyCombobox;
