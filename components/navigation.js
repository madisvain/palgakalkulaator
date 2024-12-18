import Link from "next/link";
import { useRouter } from "next/router";
import { Trans } from "@lingui/macro";

import LanguageDropdown from "./language";

const Navigation = ({ year, setYear }) => {
  const router = useRouter();
  const years = [2024, 2025];
  const currentYear = new Date().getFullYear();

  const basePath = router.pathname.split("/")[1].replace(/\d+/g, "");

  return (
    <nav>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <img
                className="block h-8 w-auto mr-[10px]"
                src="/logo.svg"
                alt="Palgakalkulaator.ee logo"
                height={32}
                width={32}
              />
              <h1 className="general text-xl font-medium color-dark-blue">Palgakalkulaator</h1>
            </Link>
            {years.map((y) => (
              <Link href={y === currentYear ? `/${basePath}` : `${basePath}/${y}`} key={y}>
                <div
                  className={`inline-block align-middle general text-lg font-medium bg-green color-dark-blue border-dark-blue border rounded-sm px-1 pt-[2px] ml-2 ${
                    y !== year && "opacity-60 hover:opacity-100 bg-transparent border-transparent"
                  }`}
                >
                  {y === year ? <strong>{y}</strong> : y}
                </div>
              </Link>
            ))}
          </div>

          <ul className="flex space-x-6">
            <li className="hidden md:inline-flex items-center ">
              <Link
                href="/vabad-paevad-ja-tooajafond"
                className="p-1 text-base font-semibold text-dark-blue hover:underline"
              >
                <Trans>Vabad päevad</Trans>
              </Link>
            </li>
            <li className="hidden md:inline-flex items-center ">
              <Link
                href="https://www.arveldaja.com/"
                target="_blank"
                className="p-1 text-base font-semibold text-dark-blue"
              >
                Arveldaja.com
                <div className="ml-2 inline-flex">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
