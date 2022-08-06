import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";

export interface DataFilterOption {
  id: number;
  label: string;
}

export interface DataFilterProps {
  options: DataFilterOption[];
}

const DataFilter: React.FC<DataFilterProps> = (props: DataFilterProps) => {
  const [selected, setSelected] = useState(props.options[0]);

  return (
    <div className="w-full py-2">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={setSelected}>
          <div className="space-y-2">
            {props.options.map(({ id, label }) => (
              <RadioGroup.Option
                key={id}
                value={label}
                className={({ checked }) =>
                  `${
                    checked
                      ? "transition duration-300 bg-sky-900 bg-opacity-75 text-white"
                      : "bg-gray-50"
                  }
                    relative flex cursor-pointer rounded-lg px-3 py-2`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`transition duration-300 font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {label}
                          </RadioGroup.Label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default DataFilter;
