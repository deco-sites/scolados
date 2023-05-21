export interface Props {
  href: string;
  text: string;
}

function InstagramView({ href, text }: Props) {
  return (
    <div class="hidden lg:block w-full text-center pb-24 mt-16 border-b-[3px] border-solid border-secondary">
      <a class="text-secondary font-bold text-2xl" href={href} target="_blank">
        {text}
      </a>
    </div>
  );
}

export default InstagramView;
