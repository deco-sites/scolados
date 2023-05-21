import LocationSelector from "$store/islands/LocationSelector.tsx";

export interface Location {
  label: string;
  schools: { label: string; href?: string }[];
}

export interface Props {
  title: string;
  locations: Location[];
}

function FindSchool({ title, locations }: Props) {
  return (
    <div class="flex flex-col px-2 container">
      <h2 class="text-center text-xl md:text-3xl py-5 md:py-8 font-semibold">
        {title}
      </h2>
      <LocationSelector locations={locations} />
    </div>
  );
}

export default FindSchool;
