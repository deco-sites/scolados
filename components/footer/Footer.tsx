import { asset } from "$fresh/runtime.ts";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import Description from "$store/components/footer/Description.tsx";
import type { ComponentChildren } from "preact";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export type IconItem = { icon: AvailableIcons };
export type StringItem = {
  label: string;
  href: string;
};

export type Item = StringItem | IconItem;

export type Section = {
  label: string;
  children: Item[];
  hideInMobile?: boolean;
  alwaysOpen?: boolean;
};

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

function SectionItem({ item }: { item: Item }) {
  return (
    <span class="text-info-content">
      {isIcon(item)
        ? (
          <div class="border-base-100 border border-solid py-1.5 px-2.5">
            <Icon
              id={item.icon}
              width={25}
              height={20}
              strokeWidth={0.01}
            />
          </div>
        )
        : (
          <a href={item.href}>
            {item.label}
          </a>
        )}
    </span>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return <div class={`py-6 px-4 sm:py-12 sm:px-0 ${_class}`}>{children}</div>;
}

export interface Props {
  sections?: Section[];
  socials?: {
    icon: LiveImage;
    alt: string;
    href: string;
  }[];
  footerDescription?: {
    logoSrc: LiveImage;
    description: string;
  };
}

function Footer({ sections = [], socials, footerDescription }: Props) {
  return (
    <footer class="w-full flex flex-col divide-y divide-primary-content">
      <div>
        <div class="container w-full flex flex-col divide-y divide-primary-content">
          <FooterContainer>
            <Newsletter />
          </FooterContainer>
        </div>
        <Description
          socials={socials}
          footerDescription={footerDescription}
        />
        <div class="container w-full flex flex-col divide-y divide-primary-content">
          <FooterContainer class="py-[10px]">
            {/* Desktop view */}
            <ul class="hidden sm:flex flex-row flex-wrap max-w-[1221px] mx-auto gap-36 gap-y-[51px] justify-start pl-14">
              {sections.map((section) => (
                <li>
                  <div>
                    <span class="font-bold text-base text-secondary uppercase">
                      {section.label}
                    </span>

                    <ul
                      class={`flex ${
                        isIcon(section.children[0]) ? "flex-row" : "flex-col"
                      } gap-4 pt-2 flex-wrap`}
                    >
                      {section.children.map((item) => (
                        <li>
                          <SectionItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>

            {/* Mobile view */}
            <ul class="flex flex-col sm:hidden sm:flex-row gap-4">
              {sections.map((section) =>
                !section.hideInMobile && (
                  <li>
                    {section?.alwaysOpen
                      ? (
                        <div class="flex flex-col justify-center items-center">
                          <span class="text-secondary uppercase font-bold text-base py-5">
                            {section?.label}
                          </span>
                          <ul
                            class={`flex ${
                              isIcon(section.children[0])
                                ? "flex-row"
                                : "flex-col"
                            } gap-5 pt-2`}
                          >
                            {section.children.map((item) => (
                              <li>
                                <SectionItem item={item} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                      : (
                        <span class="text-primary-content">
                          <details class="group">
                            <summary class="flex w-full justify-between text-secondary uppercase font-bold text-base py-5 border-b border-info group-open:border-0">
                              {section.label}
                              <div class="group-open:hidden">
                                <img
                                  alt="Open"
                                  class="w-[24px] h-[24px]"
                                  loading="lazy"
                                  src={asset("/icon-plus-mobile.webp")}
                                />
                              </div>
                              <div class="hidden group-open:block">
                                <img
                                  alt="Close"
                                  class="w-[14px] h-[2px]"
                                  loading="lazy"
                                  src={asset("/icon-less-mobile.webp")}
                                />
                              </div>
                            </summary>

                            <ul
                              class={`flex ${
                                isIcon(section.children[0])
                                  ? "flex-row"
                                  : "flex-col"
                              } gap-5 pt-2`}
                            >
                              {section.children.map((item) => (
                                <li>
                                  <SectionItem item={item} />
                                </li>
                              ))}
                            </ul>
                          </details>
                        </span>
                      )}
                  </li>
                )
              )}
            </ul>
          </FooterContainer>
        </div>
      </div>

      <div>
        <div class="container w-full">
          <FooterContainer class="flex justify-between w-full">
            <span class="flex items-center gap-1 text-primary-content">
              Powered by{" "}
              <a
                href="https://www.deco.cx"
                aria-label="powered by https://www.deco.cx"
              >
                <Icon id="Deco" height={20} width={60} strokeWidth={0.01} />
              </a>
            </span>

            <ul class="flex items-center justify-center gap-2">
              <li>
                <a
                  href="https://www.instagram.com/deco.cx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram logo"
                >
                  <Icon
                    class="text-primary-content"
                    width={32}
                    height={32}
                    id="Instagram"
                    strokeWidth={1}
                  />
                </a>
              </li>
              <li>
                <a
                  href="http://www.deco.cx/discord"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord logo"
                >
                  <Icon
                    class="text-primary-content"
                    width={32}
                    height={32}
                    id="Discord"
                    strokeWidth={5}
                  />
                </a>
              </li>
            </ul>
          </FooterContainer>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
