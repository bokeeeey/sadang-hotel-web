import { Flex, Image, Text } from "@sadang-turtleneck-new-ui/ui";
import ListRow from "@shared/components/ListRow";
import { useHotelsQuery } from "./hooks/useHotelsQuery";
import HotelSkeleton from "./HotelSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { Fragment } from "react/jsx-runtime";
import Spacing from "@shared/components/Spacing";
import withAsyncBoundary from "@shared/hocs/WithAsyncBoundary";

export default withAsyncBoundary(
  function HotelList() {
    const { data, loadMore, hasNextPage } = useHotelsQuery();

    return (
      <div>
        <InfiniteScroll
          dataLength={data.length}
          hasMore={hasNextPage}
          loader={<HotelSkeleton size={4} />}
          next={loadMore}
          scrollThreshold={"100px"}
        >
          {data.map((hotel, index) => (
            <Fragment key={index}>
              <ListRow
                contents={
                  <ListRow.Texts title={hotel.name} subTitle={hotel.comment} />
                }
                right={
                  <Flex direction="column">
                    <Flex direction="column">
                      <Image src={hotel.image} />
                    </Flex>
                    <Text size="t6">{hotel.price}원</Text>
                  </Flex>
                }
              />

              {data.length - 1 === index ? null : <Spacing />}
            </Fragment>
          ))}
        </InfiniteScroll>
      </div>
    );
  },
  {
    rejectedFallback: ({}) => <h1>에러가 발생했어요!</h1>,
    pendingFallback: <HotelSkeleton />,
  }
);
