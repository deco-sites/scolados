import Icon from "$store/components/ui/Icon.tsx";
import { useState } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";

export interface Location {
  label: string;
  schools: { label: string; href?: string }[];
}

export interface Props {
  locations: Location[];
}

function LocationSelector({ locations }: Props) {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  return (
    <div class="flex flex-col">
      <div class="flex flex-wrap justify-center w-full">
        {locations.map((location) => (
          <Button
            onClick={() => setSelectedLocation(location)}
            class={`btn-outline ${
              selectedLocation === location && "bg-accent-content text-white"
            } min-h-0 h-9 border-accent-content hover:border-accent-content mx-[10px] mb-3 p-2 rounded-lg hover:text-white hover:bg-accent-content normal-case`}
          >
            {location.label}
          </Button>
        ))}
      </div>
      <div
        class={`flex flex-col flex-wrap w-full mt-9 md:flex-row md:gap-x-3 ${
          selectedLocation && selectedLocation.schools.length === 1
            ? "justify-center"
            : ""
        }`}
      >
        {selectedLocation &&
          selectedLocation.schools.map((school, index) => {
            return (
              <>
                <div
                  class={`w-full flex md:hidden justify-between py-2 px-4 text-sm md:w-[32%] ${
                    index % 2 === 0 ? "bg-info" : "bg-white"
                  }`}
                >
                  {school.label}
                  <a class="block" href={school.href}>
                    <Icon id="ArrowRightCircle" width={20} height={20} />
                  </a>
                </div>
                <div
                  class={`hidden md:flex w-full justify-between py-2 px-4 text-sm md:w-[32%] ${
                    index % 6 < 3 ? "bg-info" : "bg-white"
                  }`}
                >
                  {school.label}
                  <a class="block" href={school.href}>
                    <Icon id="ArrowRightCircle" width={20} height={20} />
                  </a>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default LocationSelector;
