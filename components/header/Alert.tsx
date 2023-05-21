import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "preact/hooks";

export interface Props {
  alerts: {
    desktopText: string;
    mobileText: string;
  }[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id}>
      <Slider class="carousel carousel-center bg-secondary gap-6 scrollbar-none">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span
              class="text-sm text-secondary-content flex lg:hidden justify-center items-center w-screen h-[32px] whitespace-pre px-2"
              dangerouslySetInnerHTML={{ __html: alert.mobileText ?? "" }}
            />
            <span
              class="text-sm text-secondary-content hidden lg:flex justify-center items-center w-screen h-[32px] whitespace-pre px-2"
              dangerouslySetInnerHTML={{ __html: alert.desktopText ?? "" }}
            />
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
