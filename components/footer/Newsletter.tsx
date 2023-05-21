import { asset } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { Runtime } from "$store/runtime.ts";
import type { JSX } from "preact";

const subscribe = Runtime.create(
  "deco-sites/std/actions/vtex/newsletter/subscribe.ts",
);

function Newsletter() {
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div class="flex flex-col sm:flex-row items-center lg:justify-center gap-6 sm:gap-20">
      <div class="flex flex-col gap-2 max-w-[400px] lg:max-w-none lg:w-[500px] justify-center items-center">
        <span class="font-semibold text-xl text-primary text-center max-w-[310px] lg:max-w-none">
          Fique por dentro de nossas{" "}
          <span class="text-secondary font-extrabold">novidades</span> e{" "}
          <span class="text-secondary font-extrabold">promoções</span>
        </span>
      </div>
      <form
        class="font-body text-body w-full sm:w-[408px] lg:w-[500px] form-control"
        onSubmit={handleSubmit}
      >
        <div class="flex flex-col lg:flex-row gap-4 lg:px-[30px]">
          <div class="relative w-full">
            <input
              name="email"
              class="w-full flex-grow input input-primary border-t-0 border-l-0 border-r-0 outline-none text-sm text-center lg:text-left px-6"
              placeholder="Digite seu e-mail favorito"
            >
            </input>
            <img
              alt="Carrinho"
              class="w-[26px] h-[26px] lg:w-[22px] lg:h-[22px] absolute top-1/2 -translate-y-1/2 left-0"
              src={asset("/icon-envelope.webp")}
            />
          </div>
          <button
            class="border border-secondary border-solid rounded-md bg-secondary h-[40px] flex items-center justify-center text-white font-bold disabled:loading hover:bg-white hover:text-secondary lg:px-6"
            disabled={loading}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Newsletter;
