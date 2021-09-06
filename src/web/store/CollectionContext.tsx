import { createContext, RenderableProps } from "preact";
import { Stash } from "../../scripts/stash/types";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import { getSavedStashes } from "./store";
import { Item } from "../../scripts/items/types/Item";
import { getAllItems } from "../../scripts/stash/getAllItems";
import { characterName } from "../../scripts/stash/characterName";

interface Collection {
  characters: Map<
    string,
    {
      stash: Stash;
    }
  >;
  allItems: Item[];
}

export interface CollectionContextValue extends Collection {
  setCollection: (stashes: Stash[]) => void;
}

export const CollectionContext = createContext<CollectionContextValue>({
  characters: new Map(),
  allItems: [],
  setCollection: () => undefined,
});

export function CollectionProvider({ children }: RenderableProps<unknown>) {
  const [collection, setInternalCollection] = useState<Collection>({
    characters: new Map(),
    allItems: [],
  });

  const setCollection = useCallback((stashes: Stash[]) => {
    const characters = new Map(
      stashes
        .map((stash) => [characterName(stash), { stash }] as const)
        .sort(([a], [b]) => a.localeCompare(b))
    );
    // FIXME: do not list socketed items here, too problematic.
    //  Move the sockets logic to the grail progress itself.
    //  Delete the socketed logic from ItemLocationDesc
    const allItems = stashes.flatMap((stash) => getAllItems(stash, true));
    setInternalCollection({ characters, allItems });
  }, []);

  const value = useMemo(
    () => ({ ...collection, setCollection }),
    [collection, setCollection]
  );

  // Initialize with the stash found in storage
  useEffect(() => {
    getSavedStashes()
      .then((stashes) => Promise.all(stashes).then(setCollection))
      .catch(() => undefined);
  }, [setCollection]);

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
}
