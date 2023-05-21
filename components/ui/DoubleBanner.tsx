import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Banner {
  desktopImage: LiveImage;
  mobileImage: LiveImage;
  alt: string;
  href?: string;
}

export interface Props {
  banners: Banner[];
}

function Dots({ banners }: Props) {
  return (
    <>
      <ul class="carousel justify-center gap-2 absolute left-1/2 -translate-x-1/2 bottom-0 z-10">
        {banners?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="h-[37px]">
                <div class="w-6 h-1 rounded bg-base-100 group-disabled:bg-success-content" />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function Buttons() {
  return (
    <>
      <div class="flex absolute left-3 top-1/2 -translate-y-1/2 items-center justify-center z-10">
        <Slider.PrevButton>
          <Icon
            class="text-base-100"
            size={25}
            id="ChevronLeft"
            strokeWidth={2}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex absolute right-3 top-1/2 -translate-y-1/2 items-center justify-center z-10">
        <Slider.NextButton>
          <Icon
            class="text-base-100"
            size={25}
            id="ChevronRight"
            strokeWidth={2}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BannerItem({ banner }: { banner: Banner }) {
  const {
    alt,
    mobileImage,
    desktopImage,
    href,
  } = banner;

  return (
    <a
      href={href ?? "#"}
      aria-label={"Go to"}
      class="relative overflow-y-hidden w-full md:max-w-[587px]"
    >
      <Picture>
        <Source
          media="(max-width: 767px)"
          fetchPriority={"low"}
          src={mobileImage}
          width={360}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={"low"}
          src={desktopImage}
          width={1440}
        />
        <img
          class="object-cover w-full max-h-[503px]"
          loading={"lazy"}
          src={desktopImage}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

function DoubleBanner({ banners }: Props) {
  const id = useId();

  return (
    <>
      <div id={id} class="mt-6 relative md:hidden">
        <Slider class="carousel carousel-center w-full col-span-full row-span-full scrollbar-none gap-6">
          {banners?.map((banner, index) => (
            <Slider.Item index={index} class="carousel-item w-full">
              <BannerItem banner={banner} />
            </Slider.Item>
          ))}
        </Slider>

        <Buttons />

        <Dots banners={banners} />

        <SliderJS rootId={id} infinite />
      </div>
      <div class="hidden md:flex justify-center container gap-4 mt-24 md:gap-24">
        {banners?.map((banner) => <BannerItem banner={banner} />)}
      </div>
    </>
  );
}

export default DoubleBanner;
