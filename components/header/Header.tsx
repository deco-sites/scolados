import Modals from "$store/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: Image;
    alt?: string;
  };
}

export interface HeaderAction {
  label?: string;
  icon?: {
    size: number;
    src: LiveImage;
    alt: string;
  };
  href?: string;
}

export interface Props {
  logoImage: {
    source: LiveImage;
    desktopWidth: number;
    desktopHeight: number;
    mobileWidth: number;
    mobileHeight: number;
  };
  alerts: {
    desktopText: string;
    mobileText: string;
  }[];
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];
  /**
   * @title Action items
   * @description Link items used on desktop header
   */
  desktopActionItems?: HeaderAction[];
  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: LoaderReturnType<Product[] | null>;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: LoaderReturnType<Suggestion | null>;

  /** @title Fixed header position */
  fixed?: boolean;
}

function Header(
  {
    logoImage,
    alerts,
    searchbar: _searchbar,
    products,
    navItems = [],
    suggestions,
    fixed = true,
    desktopActionItems,
  }: Props,
) {
  const searchbar = { ..._searchbar, products, suggestions };
  return (
    <>
      <header>
        <div class={`bg-base-100 ${fixed ? "fixed" : "relative"} w-full z-50`}>
          <Alert alerts={alerts} />
          <Navbar
            logo={logoImage}
            items={navItems}
            searchbar={searchbar}
            desktopActionItems={desktopActionItems}
          />
        </div>

        <Modals
          menu={{ items: navItems }}
        />
      </header>
    </>
  );
}

export default Header;
