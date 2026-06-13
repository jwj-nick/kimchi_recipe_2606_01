# MASTERPLAN.md — 나만의 김치 레시피 랩 로드맵

> 이 프로젝트의 **전략·방향 SSOT**. 규칙은 `CLAUDE.md`, 사용법은 `GUIDE.md`, 데이터는 `data.md`, 세션 기록은 `chatlog/`.
> 최종 갱신: 2026-06-13

---

## 비전 (한 줄)
나만의 확정 김치 레시피를 쌓아 → **레시피 포털**(탐색 + 심화) → 궁극적으로 **일반 김치 요리 백과** 수준으로 진화시킨다.

---

## 단계 로드맵

### ▶ Phase 1 — 나만의 확정 레시피 2~3개 (현재 목표)
"개발 → 실습 → 시식 → 승격" 사이클로 **내 레시피 2~3개를 확정**한다.

| # | 레시피 | 상태 | 비고 |
|---|---|---|---|
| 1 | **분홍 루꼴라 김치** | ✅ 확정 (다듬기 가능) | 외국인 문화전파용 물김치, 고춧가루 없음. `reference/`에 원본 아티팩트(JSX·PDF). → 정식 `recipes/분홍루꼴라김치/recipe.md`로 수치 추출·실습 검증 필요. |
| 2 | (미정) | ⬜ 후보 탐색 | `recipe-explore`로 선정 |
| 3 | (미정) | ⬜ 후보 탐색 | `recipe-explore`로 선정 |

**Phase 1 완료 기준:** 확정 레시피 2~3개가 각각 `recipes/<이름>/recipe.md`로 정리(실습·시식 통과).

### ▶ Phase 1.5 — 레시피 포털 초기 버전 (앱 두 기능)
확정 레시피가 쌓이면 앱을 두 기능 체제로:

1. **탐색앱 (Idea Pool)** — *현재 `index.html`*. 62종 아이디어를 카테고리·타깃·레퍼런스·발효로 탐색. 후보 발굴용.
2. **레시피 심화앱 (My Recipes)** — *신규*. 확정한 나만의 레시피를 **깊게** 다룬다: 재료·분량·절임·발효 일정, 단계별 가이드, 시식 평가, 스토리·차별점, 시각자료(HomeCook 스타일).

→ 이 둘을 합치면 **레시피 포털 v0**. `jwj-nick.github.io` 메인에 포털 진입 카드 추가.

### ▶ Phase 2 — 김치 요리 백과로 진화 (이후, 지금 목표 아님)
나만의 레시피 2~3개 완성 후 착수. 개인 레시피집 → **일반 김치 요리 백과** 수준:
- 전통/참신/특화 전반의 표준 레시피·변형·과학(발효·염도·유산균) 해설
- 검색·분류·난이도·타깃별 가이드, 실패 포인트 DB
- (범위·형태는 Phase 1 완료 시점에 재설계)

---

## 앱 아키텍처 방향
- 빌드 없음(React CDN + Babel), GitHub Pages. `index.html` 더블클릭으로도 동작.
- 데이터 SSOT: `assets/data.json`(아이디어) (+ 임베드 `data.js`). 확정 레시피는 별도 데이터로 분리 예정(예: `assets/recipes.json`).
- LLM 레시피 생성은 공개 앱에 두지 않음(키·CORS). 필요 시 아티팩트 또는 FastAPI 프록시 별도.

## 폴더 ↔ 단계 매핑
- `explore/candidates/` = Phase 1 작업장(개발·실습·시식)
- `recipes/` = Phase 1 산출(확정본) = 심화앱의 데이터 소스
- `reference/` = migration 참고자료 (분홍 루꼴라 원본 등)
- 탐색앱 = `index.html` / 심화앱 = (신규, Phase 1.5)

## 워크플로우 스킬 (agentskills.io 스펙)
`recipe-start`(현황) · `recipe-explore`(발상) · `recipe-develop`(개발) · `recipe-trial`(실습) · `recipe-taste`(시식) · `recipe-finalize`(정식 레시피 정리·승격, 템플릿 보유) · `recipe-appbuild`(심화앱 빌드) · `recipe-log`(세션 로그)

- **정식 레시피 템플릿:** `recipe-finalize/assets/recipe.template.md` — 맥락 + **계량 재료 + 실제 작업 순서 + 절임/발효 스펙**.
- **심화앱:** `recipe-appbuild`가 recipe.md → 구조화 데이터(`recipe.schema.json`) → 상세 페이지(`recipe-page.template.jsx`).

---

## 지금 바로 다음 액션
1. **분홍 루꼴라 김치 정식화** — `recipe-finalize`로 템플릿을 적용해 `reference/` JSX·PDF의 값을 `recipes/pink-rucola-kimchi/recipe.md`로 추출(미검증 수치는 `≈`) → `recipe-trial`/`recipe-taste`로 확정. *(템플릿 첫 검증 사례)*
2. **레시피 #2·#3 후보 선정** — `recipe-explore` (새것·차별성 우선).
3. **심화앱 부트스트랩** — 레시피 1개 확정되면 `recipe-appbuild`로 `recipes.json` + 상세 페이지 → 포털 v0.
