---
name: recipe-appbuild
description: 정식 레시피(recipe.md)를 깊게 다루는 심화앱(My Recipes)을 만든다. recipe.md를 구조화 데이터로 변환하고, 레시피 상세 페이지를 빌드해 탐색앱 옆에 통합한다. "레시피 심화앱 만들어줘", "○○ 레시피 앱 페이지", "확정 레시피 앱에 추가" 류에 사용.
metadata:
  stage: "6-app"
---

# recipe-appbuild — 레시피 심화앱 빌드

확정 레시피(`recipes/<slug>/recipe.md`)를 **깊게 보여주는 심화앱 페이지**로 만든다.
탐색앱(`index.html`, 아이디어 pool)과 함께 **레시피 포털 v0**(MASTERPLAN Phase 1.5)를 구성.

## 심화앱 = 2탭 구조 (중요)
1. **📖 원문 가이드** — 최초 소스(원본 아티팩트, 예: `reference/<...>_HomeCook.jsx`)를 **거의 그대로** 보존. 일러스트·콘셉트·문화 적합성 등 풍부한 원문이 1차 콘텐츠. slug→가이드 컴포넌트(`GUIDES` 맵)로 등록.
2. **📐 계량 정보** — 그 위에 **추가**되는 정량/입력 페이지. 분량·시간·온도·시식을 빈칸 입력(localStorage 저장 + 마크다운/JSON 내보내기).
> 원문 가이드가 기본 탭. 원본 소스를 압축·재작성하지 말 것 — 보존하고 계량 페이지를 덧붙인다.

## 산출물 위치
- `assets/recipes.json` — 확정 레시피들의 구조화 데이터 배열 (각 항목 = [recipe.schema.json](assets/recipe.schema.json) 준수)
- `assets/recipes.js` — 위 임베드 사본(`window.RECIPES`), file:// 대응
- `recipe.html` (또는 탐색앱과 한 셸 안의 라우트) — 심화앱 진입점

## 절차
1. **데이터화:** `recipes/<slug>/recipe.md`의 frontmatter+본문을 [recipe.schema.json](assets/recipe.schema.json) 형태 객체로 변환해 `assets/recipes.json` 배열에 추가/갱신.
   - 계량 재료 → `ingredients[]`(group/item/amount/note/approx), 작업 순서 → `steps[]`, 발효 → `ferment_schedule[]`.
   - 미검증 수치는 `approx: true`로 표시(앱에서 ≈ 노출).
2. **임베드 재생성:** `recipes.json` → `recipes.js`(`window.RECIPES = {...}` slug 키 맵).
3. **페이지:** [recipe-page.template.jsx](assets/recipe-page.template.jsx)의 `RecipePage`로 상세 렌더. 스타일 레퍼런스 = `reference/PinkRucolaKimchi_HomeCook.jsx`.
4. **통합:** 심화앱 진입점에서 slug 목록 → 카드/리스트 → `RecipePage`. 탐색앱과 동일한 빌드 없음(React CDN) 방식.
5. **포털:** 탐색앱 ↔ 심화앱 상호 링크. 추후 `jwj-nick.github.io` 메인에 포털 카드.

## 원칙
- 빌드 없음(React CDN + Babel). `index.html` 더블클릭으로도 열림.
- 데이터 SSOT는 `recipes/<slug>/recipe.md`. `recipes.json`/`recipes.js`는 거기서 파생 — 직접 손대지 말고 재생성.
- LLM 호출/생성 버튼 없음(공개 앱). 정적 데이터만.

## 관련
- 입력 생산: [recipe-finalize](../recipe-finalize/SKILL.md) · 데이터 모델: [recipe.schema.json](assets/recipe.schema.json)
