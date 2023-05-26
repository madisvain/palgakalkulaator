import React, { useState } from "react";
import { useRouter } from "next/router";
import { Trans } from "@lingui/macro";
import { startsWith } from "lodash";

import Link from "next/link";
import Hamburger from "hamburger-react";

import LanguageDropdown from "./language";

const Navigation = ({ scrollToContact }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { asPath } = useRouter();

  return (
    <nav>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 justify-between">
          <div className="flex">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <img
                className="block h-8 w-auto mr-[10px]"
                src="./logo.svg"
                alt="Palgakalkulaator.ee logo"
              />
              <h1 className="general text-xl font-medium color-dark-blue">
                Palgakalkulaator
              </h1>
            </Link>
          </div>

          <ul className="hidden md:flex md:space-x-8">
            <li className="inline-flex items-center ">
              <Link
                href="https://www.arveldaja.com/"
                target="_blank"
                className="p-1 text-base font-semibold text-dark-blue"
              >
                Arveldaja.com
                <div className="ml-2 inline-flex">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5625 1.3125H10.6875V9.4375M1.3125 10.6875L10.6875 1.3125"
                      stroke="#181A33"
                      strokeWidth="1.875"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            </li>
            {/*  Language dropdown */}
            <LanguageDropdown />
          </ul>

          <div className="-mr-2 flex items-center md:hidden">
            <Hamburger
              size={24}
              color="#181A33"
              label="Näita menüüd"
              onToggle={(toggled) => {
                if (toggled) {
                  setMenuOpen(true);
                } else {
                  setMenuOpen(false);
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`${menuOpen ? "block" : "hidden"} h-full`}>
        <div className="space-y-1 pt-2 pb-3">
          <Link
            href="/teenused"
            className="block py-2 pl-3 pr-4 text-base font-semibold text-dark-blue"
          >
            Arveldaja.com
          </Link>
        </div>
        <div className="pt-4 pb-3">
          <div className="flex flex-row justify-end">
            <a
              href="#"
              className="px-4 py-2 text-base font-medium flex flex-row items-center"
            >
              EST
              <div className="ml-2">
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
              </div>
            </a>
            <a href="#" className="block px-4 py-2 text-base font-medium">
              ENG
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
