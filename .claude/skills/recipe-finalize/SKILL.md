---
name: recipe-finalize
description: 시식 통과한 확정 김치를 정식 레시피 문서(recipe.md)로 정리하고 recipes/로 승격한다. 맥락(스토리·차별점)에 더해 계량화된 재료와 실제 작업 순서·절임/발효 스펙을 채운다. "정식 레시피로 정리", "○○ 확정·승격", "레시피 문서화" 류에 사용.
metadata:
  stage: "5-finalize"
---

# recipe-finalize — 정식 레시피 정리·승격

확정된 후보를 **재현 가능한 정식 레시피**로 만들어 `recipes/<slug>/recipe.md`에 저장한다.

## 핵심 원칙
- 현 Idea Pool 앱·`reference/` 자료는 **맥락**(스토리·차별점·문화 적합성)일 뿐이다. 정식 레시피는 여기에 **① 계량화된 재료 ② 실제 작업 순서 ③ 절임 스펙 ④ 발효 일정**을 더해야 한다.
- 분량·시간·온도는 **반드시 구체적 수치**(g·mL·큰술·℃·일). 모르는 값은 지어내지 말고 `≈`로 표시 + §9 "검증 필요 수치"에 모아 `recipe-trial`로 확정한다.
- 외부 레시피 참고 시 자기 말로 재구성 + 출처(`sources`). 통째 복사 금지.

## 절차
1. 입력 확인: `explore/candidates/<이름>/`의 `draft.md` + `trials/` + `tasting/`. (또는 reference 자료)
2. 템플릿 복사: `assets/recipe.template.md` → `recipes/<slug>/recipe.md`.
3. frontmatter 메타를 모두 채운다(name·slug·category·target·ferment·ref·difficulty·servings·palette 등). `slug`는 폴더명·앱 id와 일치.
4. §1 맥락 → §2~5 정량 파트(재료표·절임 %·작업 순서·발효 일정) → §6~10 순으로 채운다.
5. 시식 결과(§7)와 실패 포인트(§9) 반영. trial로 보정된 값은 확정값으로, 미검증은 `≈`.
6. 시각자료가 있으면 같은 폴더에(`reference/`의 HomeCook JSX 등 참고). PDF는 `.gitignore` 대상.
7. `data.md`의 해당 항목 상태/메모 갱신(필요 시 `assets/data.json`→`data.js`도).

## 산출
- `recipes/<slug>/recipe.md` (템플릿 구조 준수, 정량 파트 완비)
- 다음: 심화앱이 필요하면 `recipe-appbuild`로.

## 제출용 양식 (외부 제출 시)
외부 제출처 형식이 필요하면 [assets/submission.template.md](assets/submission.template.md)를 `recipes/<slug>/submission.md`로 복사해 채운다.
- 항목: 김치명 / 사진첨부 / 소개 요약(이유·배경·추억·특징과 가치) / 식재료(재료·양념·풀) / 조리법.
- `recipe.md`가 소스 — 분량·조리법은 거기서 가져오되, **미정이면 빈칸**으로 둔다.

## 템플릿
- 정식 레시피 구조 → [assets/recipe.template.md](assets/recipe.template.md)
- 제출용 양식(빈칸) → [assets/submission.template.md](assets/submission.template.md)
