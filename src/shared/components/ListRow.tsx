import { Flex, Text } from "@bongdev/ui";
import type { ReactNode } from "react";

import clsx from "clsx";

import styles from "./ListRow.module.scss";

const cx = clsx.bind(styles);

interface ListRowProps {
  contents: ReactNode;
  right?: ReactNode;
}

function ListRow({ contents, right }: ListRowProps) {
  return (
    <Flex justify="between" className={cx(styles.article)}>
      <Flex>{contents}</Flex>
      {right != null ? <Flex>{right}</Flex> : null}
    </Flex>
  );
}

interface ListRowTextsProps {
  title: ReactNode;
  subTitle?: ReactNode;
}

function ListRowTexts({ title, subTitle }: ListRowTextsProps) {
  return (
    <Flex direction="column">
      <Text size="t6" bold={true}>
        {title}
      </Text>
      {subTitle != null ? (
        <Text size="t7" color="adaptiveGrey600">
          {subTitle}
        </Text>
      ) : null}
    </Flex>
  );
}

ListRow.Texts = ListRowTexts;

export default ListRow;
