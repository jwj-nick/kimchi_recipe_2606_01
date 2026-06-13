# CLAUDE.md — 나만의 김치 레시피 랩 프로젝트 지침

이 파일은 Claude Code가 이 폴더에서 일할 때 따르는 규칙입니다.

## 프로젝트 목적
"나만의 김치 레시피"를 **개발 → 실습(담그기) → 시식 평가**의 사이클로 발전시킨다.
부수적으로, 아이디어 탐색용 **아이디어 Pool 앱(`index.html`)을 유지·확장**한다(→ 추후 recipe portal로 발전).

GitHub: `jwj-nick/kimchi_recipe_2606_01` · Pages: https://jwj-nick.github.io/kimchi_recipe_2606_01/

## 작업자
RTL/HW 엔지니어 출신. React/Vite/FastAPI, Claude Code, AI 워크플로우에 익숙함.
→ 기술적 설명 OK. 단, 결론·다음 행동을 먼저 제시하고 근거는 뒤에.

## 로드맵
전략·단계는 `MASTERPLAN.md` 참조 (SSOT). 요약: Phase 1 = 나만의 확정 레시피 2~3개(분홍 루꼴라 확정) → Phase 1.5 = 탐색앱+심화앱 = 레시피 포털 v0 → Phase 2 = 김치 요리 백과로 진화(이후).

## 폴더 구조
**두 개의 큰 버킷: ① 탐색·선정(`explore/`) → ② 최종 선정(`recipes/`).**
- `index.html`, `assets/` — 아이디어 Pool 앱(빌드 없음). `assets/data.json`이 기계용 SSOT, `assets/data.js`는 임베드 사본(둘 다 함께 재생성).
- `data.md` — 아이디어 62종 전체 + 분류 체계 + 시식 루브릭. **사람이 읽는 단일 소스.**
- `explore/candidates/<이름>/` — ① 후보 개발·실습·시식 워크스페이스. 안에 `draft.md`, `trials/`, `tasting/`.
- `recipes/<이름>/` — ② 시식 통과로 **승격**된 확정 레시피. 안에 `recipe.md`(+ 시각자료).
- `reference/` — claude.ai에서 migration한 **참고 자료**(최종 아님). 앱 원본 JSX, 분홍 루꼴라 자료 등.
- `chatlog/MMDD-Chat.md` — 세션 로그. 사용자 원문 + 산출물을 **라운드별 누적**.
- `.claude/skills/` — 작업용 스킬(start·explore·develop·trial·taste·**finalize**·**appbuild**·log). 정식 레시피 템플릿은 `recipe-finalize/assets/recipe.template.md`, 심화앱 데이터 스키마·페이지 템플릿은 `recipe-appbuild/assets/`.

⚠️ 데이터 갱신 시 `assets/data.json` → `assets/data.js`(`window.KIMCHI_DATA`) 재생성 + `data.md` 동기화.

## 두 축 (데이터 모델)
1. **카테고리**: `전통(trad)` / `참신(novel)` / `특화(spec)`. 특화는 타깃 `외국인·비건·시니어·건강·신세대`.
2. **레퍼런스 상태**: `있음(yes)` / `유사 가능(maybe)` / `새 아이디어(new)`.
   - 이 상태는 **추정**이다. 새 아이디어로 밀려면 웹/논문 검색으로 **선행 사례를 확인**하고 차별점을 명확히 한다.

## 워크플로우 (스킬과 1:1)
1. **발상** (`recipe-explore`) — `data.md`/앱에서 후보를 고른다. `new` 우선 + 선행사례 검색으로 확정.
2. **개발** (`recipe-develop`) — 재료·분량·절임·발효·플레이팅을 `explore/candidates/<이름>/draft.md`로 설계.
3. **실습** (`recipe-trial`) — 담그고 `explore/candidates/<이름>/trials/<날짜>.md`에 분량 조정·관찰 기록.
4. **시식** (`recipe-taste`) — 루브릭으로 `.../tasting/<날짜>.md`에 채점 + 개선점·승격 판단.
5. **정식화·승격** (`recipe-finalize`) — 통과한 후보를 **템플릿 기반 정식 `recipes/<slug>/recipe.md`**로 정리(계량 재료+작업 순서+절임/발효 스펙). 템플릿: `.claude/skills/recipe-finalize/assets/recipe.template.md`.
6. **심화앱** (`recipe-appbuild`) — 정식 레시피 → 심화앱(My Recipes) 데이터+페이지. 탐색앱과 함께 레시피 포털 v0.
세션 경계: `recipe-start`(현황 점검) / `recipe-log`(chatlog 라운드 정리).

> 스킬은 **agentskills.io 스펙** 준수(SKILL.md: `name`+`description` 필수, `name`=폴더명, 템플릿은 스킬 `assets/`에).

## 시식 평가 루브릭 (각 3점 척도)
- 맛·향 (균형·감칠맛·발효취)
- 식감 (아삭함·숙성 정도)
- 비주얼 (색·플레이팅·촬영각)
- 발효 (보존성·산도 변화)
- 차별성 (스토리·시장성)
→ 타깃별 가중치를 다르게: 외국인=맛·향(진입장벽), 참신=차별성, 건강=발효, 시니어=식감/삼킴.

## 앱 작업 시 주의 ⚠
- 배포 앱(`index.html`)은 **탐색·필터 전용**(빌드 없음, GitHub Pages). 레시피 생성 버튼은 두지 않는다.
- 레시피 생성(LLM 호출)이 필요하면: `reference/`의 원본 JSX가 `https://api.anthropic.com/v1/messages`를 호출하던 방식 참고 — **claude.ai 아티팩트 안에서만 인증 없이 동작**. 로컬/Pages에선 키·CORS로 실패하므로, 필요 시 FastAPI 프록시(서버 `ANTHROPIC_API_KEY`, 프런트 노출 금지)로 별도 구성.
- 새 아이디어 추가 시 `assets/data.json` → `assets/data.js` 재생성 + `data.md`를 **함께** 갱신.

## 저작권
- 외부 레시피를 참고하면 **자기 말로 재구성**하고 출처를 남긴다. 본문 통째 복사 금지.
- 생성 레시피는 초안 — 실습으로 검증·보정한 값을 `recipes/`의 최종본에 반영한다.

## 출력 규칙
- 한국어. 레시피는 분량·시간·온도를 **구체적 수치**로.
- 추측은 추측이라 밝히고, 사실 확인이 필요하면 검색 후 출처를 남긴다.
