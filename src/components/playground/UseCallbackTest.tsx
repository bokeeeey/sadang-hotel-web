import { Button } from "@sadang-turtleneck-new-ui/ui";
import { useCallback, memo, useState } from "react";

const Child = memo(({ onClick }: { onClick: () => void }) => {
  console.log("Child render");
  return <Button onClick={onClick}>useCallback테스트</Button>;
});

function UseCallbackTest() {
  const [count, setCount] = useState(0);

  // const handleClick = () => console.log("click"); // 매번 새로 생성됨
  const handleClick = useCallback(() => console.log("click"), []);

  return (
    <>
      <Button onClick={() => setCount((c) => c + 1)}>{count}</Button>
      <Child onClick={handleClick} />
    </>
  );
}

export default UseCallbackTest;
