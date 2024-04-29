import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface DropdownProps {
  label: string;
  link: { href: string; label: string }[];
}

export default function Example({ label, link }: DropdownProps) {
  return (
    <div className="bg-white rounded-xl hover:bg-primary-300 active:bg-primary-500">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center px-6 py-3 rounded-xl font-semibold text-black">
            {label}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              {link.map((link: any) => (
                <Menu.Item as="a" key={link.href} href={link.href}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-primary-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold`}
                    >
                      {link.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
