# 🥬 나만의 김치 레시피 랩 (Kimchi Recipe Lab)

전통·참신·특화 **62종 김치 아이디어 풀**에서 후보를 골라
**개발 → 실습(담그기) → 시식 평가**의 사이클로 나만의 레시피를 만들어가는 워크스페이스 + 아이디어 탐색 앱.

## 🔗 앱 (GitHub Pages) — 레시피 포털 v0
👉 **https://jwj-nick.github.io/kimchi_recipe_2606_01/**

**① 아이디어 Pool** (`index.html`) — 후보 탐색
- 카테고리(전통/참신/특화) · 타깃 · 레퍼런스 상태 · 발효 기준 필터 + 검색 + "새것만" 토글

**② 나만의 레시피 · 심화** (`recipe.html`) — 확정 레시피 깊게 보기 + **빈칸 직접 입력**
- 맥락(스토리·차별점·작업 순서)은 읽기 전용, **실측값(분량·시간·온도·시식 점수)은 입력 칸**
- 입력값 자동 저장(localStorage) + **마크다운 복사 / JSON 내려받기**로 전달 → 정식 레시피에 반영
- 노란 칸=빈칸 / 초록 칸=채움, 상단에 채움 진행률 표시

> 빌드 없음(React CDN). `index.html` 더블클릭으로도 열림. 두 앱이 곧 **recipe portal**의 초기 형태(MASTERPLAN Phase 1.5).

## 📂 폴더 구조
| 폴더/파일 | 내용 |
|---|---|
| `index.html`, `assets/` | 아이디어 Pool 앱 (`data.js` 임베드, `data.json` SSOT) |
| `data.md` | 아이디어 62종 전체 + 분류 체계 + 시식 루브릭 (읽기용 단일 소스) |
| `explore/candidates/` | 후보별 개발·실습·시식 워크스페이스 (선정 과정) |
| `recipes/` | 최종 선정된 확정 레시피 모음 |
| `reference/` | claude.ai에서 migration한 참고 자료 (앱 원본 JSX, 분홍 루꼴라 자료) |
| `chatlog/` | 세션 로그 (`MMDD-Chat.md`, 라운드별 누적) |
| `.claude/skills/` | 작업용 스킬 (start·explore·develop·trial·taste·promote·log) |
| `CLAUDE.md`, `GUIDE.md` | 프로젝트 지침 · 진행 가이드 |

## 🔄 워크플로우
1. **발상** — `data.md`/앱에서 후보 선택 (`새것` 우선, 선행사례 검색으로 확정)
2. **개발** — `explore/candidates/<이름>/draft.md`에 재료·분량·절임·발효 설계
3. **실습** — 담그고 `trials/`에 분량 조정·관찰 기록
4. **시식** — 루브릭(맛·향/식감/비주얼/발효/차별성, 각 3점)으로 `tasting/`에 채점
5. **승격** — 통과한 후보를 `recipes/<이름>/`로 정리

## 🛠 로컬에서 보기
저장소를 받은 뒤 `index.html`을 더블클릭하면 됩니다(서버 불필요).

> ⚠️ 외부 레시피 참고 시 자기 말로 재구성하고 출처를 남깁니다. PDF 원문은 저작권을 고려해 저장소에 포함하지 않습니다.
