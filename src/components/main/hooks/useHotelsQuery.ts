import { Hotel } from "@models/hotel";
import { getHotels } from "@remote/hotel";
import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useCallback } from "react";

export function useHotelsQuery() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useSuspenseInfiniteQuery<
    {
      hotels: Hotel[];
      lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData>;
    },
    Error,
    InfiniteData<{
      hotels: Hotel[];
      lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData>;
    }>,
    ReturnType<typeof useHotelsQuery.getKey>,
    QueryDocumentSnapshot<DocumentData, DocumentData> | undefined
  >({
    queryKey: useHotelsQuery.getKey(),
    queryFn: ({ pageParam }) => {
      // if (Math.random() < 0.5) {
      //   throw new Error("무언가 잘못되었음!");
      // }

      return getHotels(pageParam);
    },

    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible;
    },

    // throwOnError: true,
    initialPageParam: undefined,
  });

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return;
    }

    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetching]);

  const hotels = data?.pages.map(({ hotels }) => hotels).flat();

  return { data: hotels, loadMore, isFetching, hasNextPage };
}

useHotelsQuery.getKey = () => ["hotels"];
