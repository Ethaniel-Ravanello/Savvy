import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";

interface TransactionCategory {
  id: number;
  category: string;
}

interface Props {
  value: any;
  onChange: any;
  options: TransactionCategory[];
}

export default function ComboBox({ value, onChange, options }: Props) {
  const [query, setQuery] = useState("");

  const filteredCategory =
    query === ""
      ? options
      : options.filter((data) =>
          data.category
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  return (
    <div className="">
      <Combobox value={value} onChange={onChange}>
        <div className="relative mt-1">
          <div className="">
            <Combobox.Input
              className="w-full border-2 dark:border-gray-600 bg-transparent py-2 pl-3 pr-10 text-sm leading-5 text-white focus:ring-0 font-semibold rounded-lg"
              displayValue={(data: any) => data.category}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <BiChevronDown
                className="h-5 w-5 text-primary-50"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary-900 border-2 border-gray-600 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredCategory.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-white font-semibold">
                  Nothing found.
                </div>
              ) : (
                filteredCategory.map((data: any) => (
                  <Combobox.Option
                    key={data.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 font-semibold ${
                        active
                          ? "hover:bg-primary-500 text-white font-semibold"
                          : "text-white font-semibold"
                      }`
                    }
                    value={data}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate font-semibold`}>
                          {data.category}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <BiChevronDown
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
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
}
