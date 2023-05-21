import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Searchbar from "$store/components/search/Searchbar.tsx";

interface Props {
  searchbar: SearchbarProps;
}

function HeaderSearchbar({ searchbar }: Props) {
  return <Searchbar {...searchbar} variant="desktop" />;
}

export default HeaderSearchbar;
