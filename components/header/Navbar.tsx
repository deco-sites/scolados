import { asset } from "$fresh/runtime.ts";
import HeaderSearchbar from "$store/islands/HeaderSearchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import NavItem from "./NavItem.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

interface HeaderAction {
  label?: string;
  icon?: {
    size: number;
    src: LiveImage;
    alt: string;
  };
  href?: string;
}

function Navbar({ logo, items, searchbar, desktopActionItems }: {
  logo: {
    source: LiveImage;
    desktopWidth: number;
    desktopHeight: number;
    mobileWidth: number;
    mobileHeight: number;
  };
  items: INavItem[];
  searchbar: SearchbarProps;
  desktopActionItems?: HeaderAction[];
}) {
  return (
    <>
      {/* Mobile Version */}
      <div class="md:hidden flex-col border-b border-base-200">
        <div class="flex flex-row justify-between items-center w-full pl-2 pr-6 gap-2 pt-2">
          <Buttons variant="menu" />

          <a
            href="/"
            class="flex-grow inline-flex justify-center items-center"
            aria-label="Store logo"
          >
            <Picture
              preload
              class="col-start-1 col-span-1 row-start-1 row-span-1"
            >
              <Source
                src={logo.source}
                width={logo.mobileWidth}
                height={logo.mobileHeight}
                media="(max-width: 1024px)"
              />
              <Source
                src={logo.source}
                width={logo.desktopWidth}
                height={logo.desktopHeight}
                media="(min-width: 1024px)"
              />
              <img src={logo.source} alt="Scolados" />
            </Picture>
          </a>

          <div class="flex gap-1">
            <Buttons variant="cart" />
          </div>
        </div>
        <div class="block w-full bg-base-100">
          <HeaderSearchbar searchbar={searchbar} />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-col w-full">
        <div class="container max-w-7xl flex flex-row justify-start items-center px-1 py-6">
          <a href="/" aria-label="Store logo" class="block ml-10">
            <Picture
              preload
              class="col-start-1 col-span-1 row-start-1 row-span-1"
            >
              <Source
                src={logo.source}
                width={logo.mobileWidth}
                height={logo.mobileHeight}
                media="(max-width: 1024px)"
              />
              <Source
                src={logo.source}
                width={logo.desktopWidth}
                height={logo.desktopHeight}
                media="(min-width: 1024px)"
              />
              <img src={logo.source} alt="Scolados" />
            </Picture>
          </a>
          <div class="block w-full max-w-[491px] bg-base-100 ml-16">
            <HeaderSearchbar searchbar={searchbar} />
          </div>
          <div class="flex items-stretch justify-center w-[33%] gap-8">
            <div class="ml-16 flex">
              {desktopActionItems?.map((item, index, arr) => (
                <a
                  class={`flex items-center relative ${
                    index === arr.length - 1 ? "mr-5" : "mr-4 lg:mr-9"
                  }`}
                  href={item.href}
                >
                  {item.icon && (
                    <img
                      class="hidden lg:block absolute right-full mr-1"
                      width={item.icon.size}
                      height={item.icon.size}
                      alt={item.icon.alt}
                      src={item.icon.src}
                    />
                  )}
                  {item.label && (
                    <span
                      class="text-[11px] text-justify w-16 leading-none"
                      dangerouslySetInnerHTML={{ __html: item.label }}
                    />
                  )}
                </a>
              ))}
              <a
                href="/login"
                aria-label="Log in"
                class="text-xs font-normal text-justify capitalize w-16 flex items-center leading-none mr-4 relative"
              >
                <img
                  alt="Log in"
                  class="absolute right-full mr-1 w-6 h-6"
                  src={asset("/icon-user.webp")}
                />
                <span class="hidden lg:block">Olá visitante</span>
              </a>
            </div>
          </div>
          <div class="flex items-center justify-end gap-2">
            <Buttons variant="cart" />
          </div>
        </div>
        <div class="flex-auto flex justify-center border-t border-base-200 w-full">
          {items.map((item) => <NavItem item={item} />)}
        </div>
      </div>
    </>
  );
}

export default Navbar;
