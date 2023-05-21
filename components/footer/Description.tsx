import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

interface Props {
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
function Description({ footerDescription, socials }: Props) {
  return (
    <div class="bg-secondary w-full text-white">
      <div class="container max-w-[1100px] lg:h-[132px] flex flex-col justify-center items-center text-center px-3 lg:flex-row lg:text-start lg:gap-24">
        <img
          class="pt-8 lg:pt-0"
          width={214}
          height={47}
          alt="Scolados"
          src={footerDescription?.logoSrc}
        />
        <p class="text-white text-sm font-semibold my-5 lg:max-w-[680px]">
          {footerDescription?.description}
        </p>
        <div class="flex flex-col pb-4 lg:hidden">
          <span class="my-4 font-bold">Siga-nos nas redes sociais</span>
          <ul class="flex justify-center items-center gap-2">
            {socials?.map((social) => (
              <li>
                <a href={social.href}>
                  <img class="w-6 h-6" alt={social.alt} src={social.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Description;
