## 가격대별 구매 빈도

### 구현 스펙

- 기간은 컴포넌트 state로 관리합니다.
  - 기본값: `2024-07-01` ~ `2024-07-31`
  - 필터 입력 시 빈 값 허용이 필요해 QueryString은 사용하지 않습니다.
- 유효성 상태
  - `EMPTY`: `from` 또는 `to` 중 하나라도 비어 있음
  - `INVALID`: `to`가 `from`보다 이전
  - `VALID`: 동일 일자이거나 `from` ≤ `to`
- 쿼리 실행: `VALID`일 때만 `useQuery`를 enabled로 실행합니다.
- 차트: `recharts`의 `BarChart`로 시각화합니다.
