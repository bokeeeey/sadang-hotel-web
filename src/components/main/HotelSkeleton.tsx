import clsx from "clsx";

import styles from "./HotelSkeleton.module.scss";
import ListRow from "@shared/components/ListRow";
import { Fragment } from "react/jsx-runtime";
import { Flex, Text } from "@sadang-turtleneck-new-ui/ui";
import Spacing from "@shared/components/Spacing";

const cx = clsx.bind(styles);

function HotelSkeleton({ size = 10 }: { size?: number }) {
  return [...new Array(size)].map((_, idx) => (
    <Fragment key={idx}>
      <ListRow
        contents={
          <Flex direction="column">
            <ListRow.Texts
              title={
                <div
                  className={cx(styles.skeleton)}
                  style={{
                    width: 230,
                    height: 23,
                    marginBottom: 5,
                  }}
                />
              }
              subTitle={
                <div
                  className={cx(styles.skeleton)}
                  style={{
                    width: 276,
                    height: 20,
                  }}
                />
              }
            />
          </Flex>
        }
        right={
          <Flex direction="column">
            <Flex direction="column">
              <div
                className={cx(styles.skeleton)}
                style={{ width: 63, height: 63, marginBottom: 5 }}
              />
            </Flex>
            <Text size="t6">
              <div
                className={cx(styles.skeleton)}
                style={{ width: 66, height: 22 }}
              />
            </Text>
          </Flex>
        }
      />
      {10 - 1 === idx ? null : <Spacing />}
    </Fragment>
  ));
}

export default HotelSkeleton;
