---
name: recipe-promote
description: 시식 통과한 후보를 explore/candidates에서 recipes/로 승격해 확정 레시피로 정리. "○○ 확정", "레시피로 승격" 류에 사용.
---

# recipe-promote — 최종 선정(승격)

## 할 일
시식 통과한 후보를 `recipes/<이름>/`로 정리한다.

## recipes/<이름>/recipe.md 구성
- draft + trial 보정값을 반영한 **확정 수치** 레시피(재료·절임·만드는 법·발효·플레이팅)
- 시식 요약(루브릭 점수 + 핵심 강점)
- 차별점·타깃·스토리
- 출처(참고 시)

## 부가
- 시각자료(HomeCook 스타일 JSX·이미지)는 같은 폴더에. PDF는 `.gitignore` 대상.
- candidate 폴더의 trials/tasting 이력은 남겨두거나 `recipes/<이름>/`로 함께 이동.
- 추후 **recipe portal** 앱에 노출할 항목이면 메모.

## 데이터
- 확정 후 `data.md`의 해당 항목 상태/메모 갱신.
