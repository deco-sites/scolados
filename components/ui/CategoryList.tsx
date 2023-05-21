import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Category {
  label: string;
  icon: LiveImage;
  href?: string;
}
export interface Props {
  title?: string;
  categories: Category[];
}

function CategoryList({ categories, title }: Props) {
  return (
    <div class="flex flex-col container">
      {title && (
        <h2 class="text-center text-xl md:text-3xl py-5 md:py-8 font-semibold">
          {title}
        </h2>
      )}
      <div class="flex gap-5 md:gap-20 justify-center">
        {categories?.map((category) => (
          <div class="flex flex-col items-center">
            <div class="flex justify-center items-center border border-solid border-secondary w-[76px] h-[67px] md:w-[135px] md:h-[115px] rounded-md">
              <a href={category.href}>
                <img alt={category.label} src={category.icon} />
              </a>
            </div>
            <span class="mt-2 text-xs md:text-base">{category.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
