import { useState } from "react";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { useLingui } from "@lingui/react";

const LanguageDropdown = () => {
  const router = useRouter();
  const { i18n } = useLingui();

  const switchLocale = (locale) => {
    router.push(router.pathname, router.pathname, { locale });
  };

  return (
    <Menu as="div" className="relative inline-flex items-center">
      <Menu.Button
        as="a"
        href="#"
        className="px-1 text-base font-semibold text-dark-blue hover:text-gray-700"
      >
        {i18n.locale == "en" ? "ENG" : "EST"}
        <div className="ml-2 inline-flex">
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.293 0.29303L5.99997 4.58603L1.70697 0.29303L0.292969 1.70703L5.99997 7.41403L11.707 1.70703L10.293 0.29303Z"
              fill="#181A33"
            />
          </svg>
        </div>
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 top-[20px] pb-3 w-28 origin-top bg-white border border-dark-blue focus:outline-none">
          <Menu.Item onClick={() => switchLocale("et")}>
            {({ active }) => (
              <div
                className={
                  "pt-3 px-3 flex justify-between items-center w-full hover:cursor-pointer"
                }
              >
                <span className="text-base font-medium">EST</span>
                {active && (
                  <svg
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5859 0.939514L5.29294 8.23251L1.99994 4.93951L0.585938 6.35351L5.29294 11.0605L13.9999 2.35351L12.5859 0.939514Z"
                      fill="#181A33"
                    />
                  </svg>
                )}
              </div>
            )}
          </Menu.Item>
          <Menu.Item onClick={() => switchLocale("en")}>
            {({ active }) => (
              <div
                className={
                  "pt-3 px-3 flex justify-between items-center w-full hover:cursor-pointer"
                }
              >
                <span className="text-base font-medium">ENG</span>
                {active && (
                  <svg
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5859 0.939514L5.29294 8.23251L1.99994 4.93951L0.585938 6.35351L5.29294 11.0605L13.9999 2.35351L12.5859 0.939514Z"
                      fill="#181A33"
                    />
                  </svg>
                )}
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LanguageDropdown;
