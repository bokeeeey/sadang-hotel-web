import { useMemo, useState, memo } from "react";

// 매우 무거운 계산 함수 (의도적으로 느리게)
const heavyComputation = (num: number) => {
  console.log("💣 heavyComputation 실행 중...");
  let result = 0;
  for (let i = 0; i < 1e9; i++) {
    result += i % num;
  }
  return result;
};

const SlowComponent = () => {
  const [count, setCount] = useState(0);
  // const result = heavyComputation(1000); // 매번 리렌더 시 실행됨

  // ✅ useMemo로 연산 결과 캐싱
  const result = useMemo(() => heavyComputation(1000), []);

  return (
    <div>
      <h1>느린 컴포넌트</h1>
      <p>무거운 연산 결과: {result}</p>
      <button onClick={() => setCount(count + 1)}>클릭: {count}</button>
    </div>
  );
};

export default memo(SlowComponent);
