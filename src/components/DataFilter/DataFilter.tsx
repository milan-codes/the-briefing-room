import { RadioGroup } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectDataFilter, setActiveDataFilter } from "../../features/events/dataFilterSlice";

export interface DataFilterOption {
  id: number;
  label: string;
  property: string;
}

export interface DataFilterProps {
  options: DataFilterOption[];
}

const DataFilter: React.FC<DataFilterProps> = (props: DataFilterProps) => {
  const dataFilter = useAppSelector(selectDataFilter);
  const dispatch = useAppDispatch();

  return (
    <div className="w-full pt-5 border-t-[1px] border-solid border-gray-200">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup
          value={dataFilter.activeFilter}
          onChange={(newState: string) => dispatch(setActiveDataFilter(newState))}
        >
          <div className="space-y-2.5">
            {props.options.map(({ id, label, property }) => (
              <RadioGroup.Option
                key={id}
                value={property}
                className={({ checked }) =>
                  `${checked ? "transition duration-300 bg-[#3772FF] text-white" : "bg-gray-50"}
                    relative flex cursor-pointer rounded-lg px-3 py-4`
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
