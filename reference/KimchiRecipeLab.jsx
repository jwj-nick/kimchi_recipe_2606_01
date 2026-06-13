import React, { useState, useMemo } from "react";

/*
  나만의 김치 레시피 — 아이디어 랩 v3
  두 축 분리: 카테고리(전통/참신/특화) × 레퍼런스 상태(있음/유사/새것)
  "나만의 아이디어만" 토글 → 과제용(레퍼런스 없는 것)만 추림
*/

const P = {
  paper: "#FBF7EE", sogeum: "#F3ECDD", ongi: "#2B211C",
  ink: "#352D26", muted: "#897D6D", line: "rgba(43,33,28,0.10)",
};

const CAT = {
  trad: { label: "전통", c: "#9A6B3F", desc: "실재하는 전통·향토·궁중 김치. 레퍼런스가 확실하니 지식 확장용." },
  novel: { label: "참신", c: "#3E7CA5", desc: "맛·재료의 실험적 조합. '새 아이디어'가 가장 많이 모인 곳." },
  spec: { label: "특화", c: "#3E8C73", desc: "대상(외국인·시니어·비건 등)을 겨냥한 기능형 김치." },
};

const TGT = {
  foreign: { label: "외국인", c: "#3E7CA5" },
  vegan: { label: "비건", c: "#3E8C73" },
  senior: { label: "시니어", c: "#B5772E" },
  health: { label: "건강", c: "#6B9A57" },
  genz: { label: "신세대", c: "#C2497F" },
};

const REF = {
  yes: { label: "레퍼런스 있음", c: "#8A9A93", note: "기존에 존재 — 과제 '나만의 아이디어'에선 제외 권장. 공부용으로 좋음." },
  maybe: { label: "유사 사례 가능", c: "#C9982E", note: "비슷한 게 있을 수 있음 — 검색해 확인 후 차별점을 더하면 나만의 것이 됨." },
  new: { label: "새 아이디어", c: "#BE3A2B", note: "알려진 레퍼런스가 거의 없음 — 과제용 나만의 아이디어로 적합." },
};

// 발효 기준 — 김치의 정의(젖산발효·유산균) 충족 여부
const FERM = {
  live: { label: "진짜 김치", short: "생발효", c: "#3E8C73", icon: "🥬", note: "결과물이 젖산발효 + 살아있는 유산균. 김치의 정의를 충족." },
  flavor: { label: "김치 활용 가공품", short: "풍미만", c: "#C9982E", icon: "🍶", note: "이미 발효된 김치·파우더를 재료로 사용. 발효 풍미는 있으나 살아있는 유산균은 기대하기 어려움(열풍건조 시 사멸)." },
  none: { label: "비발효", short: "비발효", c: "#8A9A93", icon: "·", note: "발효 요소 없음." },
};

const IDEAS = [
  // ── 전통 (레퍼런스 확실) ──
  { cat: "trad", n: "보쌈김치", c: "잣·밤·대추·낙지를 배추로 싼 궁중김치", ing: ["배추", "잣", "밤", "낙지"], tw: "한 입에 호화로운 서사", ref: "yes", h: "#B23A2B", lv: 3 },
  { cat: "trad", n: "동치미", c: "겨울 무 맑은 물김치", ing: ["무", "소금", "청각"], tw: "냉면 국물까지 확장", ref: "yes", h: "#D7E2E0", lv: 2 },
  { cat: "trad", n: "백김치(정석)", c: "고춧가루 없이 맑게", ing: ["배추", "배", "무"], tw: "붉지 않은 품격", ref: "yes", h: "#EDE6D6", lv: 2 },
  { cat: "trad", n: "갓김치(여수식)", c: "갓 특유의 알싸한 향", ing: ["갓", "멸치젓", "고춧가루"], tw: "지역색·향 차별화", ref: "yes", h: "#2E5D3A", lv: 2 },
  { cat: "trad", n: "장김치", c: "간장 베이스 궁중김치", ing: ["배추", "무", "간장"], tw: "외국인에게도 순함", ref: "yes", h: "#6B4A2A", lv: 2 },
  { cat: "trad", n: "고들빼기 김치", c: "쌉쌀한 맛, 사라져가는 향토", ing: ["고들빼기", "젓갈", "고춧가루"], tw: "희소성 자체가 스토리", ref: "yes", h: "#4F6B33", lv: 3 },
  { cat: "trad", n: "섞박지", c: "큼직하게 썬 무·배추 김치", ing: ["무", "배추", "젓갈"], tw: "국밥집의 그 맛", ref: "yes", h: "#C0432E", lv: 1 },
  { cat: "trad", n: "총각김치", c: "알타리무 통째로", ing: ["알타리무", "고춧가루", "젓갈"], tw: "아삭한 식감의 정석", ref: "yes", h: "#C0392B", lv: 1 },

  // ── 참신 (실험적 조합) ──
  { cat: "novel", n: "토마토 물김치", c: "방울토마토를 띄운 여름 냉국", ing: ["방울토마토", "오이", "유산균"], tw: "떠먹는 비주얼", ref: "new", h: "#E2472F", lv: 1 },
  { cat: "novel", n: "망고 살사 김치", c: "멕시칸 크로스오버", ing: ["망고", "양파", "고수"], tw: "타코·나초에 얹기", ref: "new", h: "#F2A93B", lv: 2 },
  { cat: "novel", n: "커피향 백김치", c: "콜드브루를 미량 더한 쌉쌀함", ing: ["배추", "콜드브루", "배"], tw: "의외의 향, 토론거리", ref: "new", h: "#6F4A2F", lv: 3 },
  { cat: "novel", n: "수박무 깍두기", c: "수박 흰 부분으로 만든 깍두기", ing: ["수박 흰부분", "고춧가루", "소금"], tw: "버려지는 부분 업사이클", ref: "new", h: "#E26B7A", lv: 2 },
  { cat: "novel", n: "청포도 물김치", c: "청포도 단맛·산미의 맑은 김치", ing: ["청포도", "무", "배"], tw: "와인 같은 향", ref: "new", h: "#B5C24A", lv: 2 },
  { cat: "novel", n: "들깨크림 백김치", c: "들깨로 고소·부드러운 국물", ing: ["배추", "들깻가루", "배"], tw: "구수한 크리미함", ref: "new", h: "#D9CBA0", lv: 2 },
  { cat: "novel", n: "트러플 묵은지", c: "트러플 오일을 입힌 프리미엄 묵은지", ing: ["묵은지", "트러플오일"], tw: "발효+발효의 럭셔리", ref: "new", h: "#4A3A2A", lv: 3 },
  { cat: "novel", n: "레몬그라스 백김치", c: "동남아 향을 입힌 백김치", ing: ["배추", "레몬그라스", "라임"], tw: "타이·베트남 식탁 친화", ref: "new", h: "#B5C26A", lv: 3 },
  { cat: "novel", n: "셀러리·오이 셀러드김치", c: "서양 채소로 아삭 즉석김치", ing: ["셀러리", "오이", "고춧가루"], tw: "샐러드처럼 가볍게", ref: "new", h: "#7FB05A", lv: 1 },
  { cat: "novel", n: "청귤 백김치", c: "제주 청귤의 상큼·쌉쌀", ing: ["배추", "청귤", "무"], tw: "제주 로컬·겨울 한정", ref: "new", h: "#C9D14A", lv: 2 },
  { cat: "novel", n: "발사믹 양파 깍두기", c: "발사믹으로 단·산미 입힌 양파", ing: ["양파", "발사믹", "고춧가루"], tw: "스테이크·양식 곁들임", ref: "new", h: "#6B3A4A", lv: 2 },
  { cat: "novel", n: "자몽 핑크 물김치", c: "자몽 쌉쌀함 + 분홍빛", ing: ["자몽", "무", "비트(소량)"], tw: "디톡스 비주얼", ref: "new", h: "#E2607A", lv: 2 },
  { cat: "novel", n: "산초 깍두기", c: "초피(산초)의 알싸한 향", ing: ["무", "산초", "고춧가루"], tw: "어른 입맛 향 차별화", ref: "new", h: "#5A6B3A", lv: 2 },
  { cat: "novel", n: "콤부차 발효 물김치", c: "콤부차로 2차 발효", ing: ["무", "콤부차", "생강"], tw: "발효+발효 트렌드", ref: "new", h: "#C98A3A", lv: 3 },
  { cat: "novel", n: "흑임자 크림 백김치", c: "흑임자로 고소·검은빛 반전", ing: ["배추", "흑임자", "배"], tw: "검은 백김치의 의외성", ref: "new", h: "#2E2A2A", lv: 2 },
  { cat: "novel", n: "파인애플 깍두기", c: "무 + 파인애플 효소로 빠른 발효", ing: ["무", "파인애플", "고춧가루"], tw: "효소가 단맛·발효 부스트", ref: "maybe", h: "#E8B23A", lv: 1 },
  { cat: "novel", n: "비트 핑크 백김치", c: "비트로 천연 분홍빛", ing: ["배추", "비트", "배"], tw: "인공색소 없이 핑크", ref: "maybe", h: "#C24E86", lv: 2 },
  { cat: "novel", n: "흑마늘 묵은지", c: "흑마늘 단맛 + 깊은 숙성", ing: ["배추", "흑마늘", "젓갈"], tw: "감칠맛·단맛 레이어", ref: "maybe", h: "#3A2A28", lv: 2 },
  { cat: "novel", n: "단호박 백김치", c: "단호박으로 달큰·고운 색", ing: ["배추", "단호박", "배"], tw: "아이도 먹는 순한 단맛", ref: "maybe", h: "#E89A2E", lv: 2 },
  { cat: "novel", n: "유자 백김치", c: "유자 향·산미의 겨울 백김치", ing: ["배추", "유자청", "무"], tw: "향긋한 명절 선물용", ref: "maybe", h: "#E8C24A", lv: 2 },

  // ── 특화: 외국인 ──
  { cat: "spec", tgt: "foreign", n: "김치 처트니", c: "빵에 발라먹는 인도식 잼형", ing: ["김치", "생강", "대추야자"], tw: "스프레드로 용도 확장", ref: "new", h: "#8A4B2A", lv: 2, f: "flavor" },
  { cat: "spec", tgt: "foreign", n: "김치 후무스", c: "병아리콩 딥에 김치를 더함", ing: ["병아리콩", "김치", "타히니"], tw: "중동·비건 겸용 딥", ref: "new", h: "#D9B36A", lv: 2, f: "flavor" },
  { cat: "spec", tgt: "foreign", n: "김치 케첩", c: "토마토 베이스 발효 소스", ing: ["김치", "토마토", "식초"], tw: "감자튀김·버거 범용", ref: "new", h: "#C0392B", lv: 1, f: "flavor" },
  { cat: "spec", tgt: "foreign", n: "마일드 케일 김치", c: "매운맛 절반 + 친숙한 케일", ing: ["케일", "양배추", "고춧가루(소량)"], tw: "발효취·매움 ↓ 입문용", ref: "maybe", h: "#3E7A4A", lv: 1 },
  { cat: "spec", tgt: "foreign", n: "김치 살사", c: "타코·나초용 다진 김치", ing: ["김치", "토마토", "라임"], tw: "범용 소스화", ref: "maybe", h: "#D8452F", lv: 1, f: "flavor" },
  { cat: "spec", tgt: "foreign", n: "김치 콜슬로", c: "양배추 김치 + 마요 살짝", ing: ["양배추", "당근", "마요"], tw: "버거·샌드 토핑", ref: "yes", h: "#E3C94A", lv: 1, f: "flavor" },
  { cat: "spec", tgt: "foreign", n: "치즈 김치", c: "발효 치즈 결합", ing: ["배추", "체다", "고춧가루"], tw: "와인 안주", ref: "yes", h: "#E8B33A", lv: 2 },

  // ── 특화: 비건 ──
  { cat: "spec", tgt: "vegan", n: "지중해 토마토·올리브 김치", c: "올리브·토마토로 산미", ing: ["양배추", "올리브", "토마토"], tw: "유럽 비건 식탁 친화", ref: "new", h: "#C0533F", lv: 2 },
  { cat: "spec", tgt: "vegan", n: "영양효모 감칠 깍두기", c: "뉴트리셔널 이스트로 풍미", ing: ["무", "영양효모", "고춧가루"], tw: "치즈향 감칠맛, 무젓갈", ref: "new", h: "#E0C24A", lv: 2 },
  { cat: "spec", tgt: "vegan", n: "낫토 감칠 비건 김치", c: "낫토로 끈적·강한 감칠맛", ing: ["배추", "낫토", "표고"], tw: "발효 더블, 강렬한 우마미", ref: "new", h: "#A8923A", lv: 3 },
  { cat: "spec", tgt: "vegan", n: "코코넛 크림 백김치", c: "코코넛으로 부드러운 비건 국물", ing: ["배추", "코코넛크림", "라임"], tw: "동남아풍 비건", ref: "new", h: "#EDE6D6", lv: 2 },
  { cat: "spec", tgt: "vegan", n: "사과·배 효소 김치", c: "과일 효소로 발효·단맛", ing: ["배추", "사과", "배"], tw: "설탕·젓갈 없이 깊은 맛", ref: "maybe", h: "#D9C36B", lv: 1 },
  { cat: "spec", tgt: "vegan", n: "미소 비건 김치", c: "된장·미소로 콩 감칠맛", ing: ["배추", "미소", "표고가루"], tw: "발효 위에 발효", ref: "maybe", h: "#B5772E", lv: 2 },
  { cat: "spec", tgt: "vegan", n: "표고·다시마 감칠 김치", c: "젓갈 대신 버섯·해조 육수", ing: ["배추", "건표고", "다시마"], tw: "동물성 0, 감칠맛 유지", ref: "yes", h: "#6B5240", lv: 1 },

  // ── 특화: 시니어 ──
  { cat: "spec", tgt: "senior", n: "두부 무침김치", c: "연두부에 다진 김치로 부드럽게", ing: ["연두부", "다진김치", "들기름"], tw: "근감소증 대비 단백질", ref: "new", h: "#E8E0C8", lv: 1, f: "flavor" },
  { cat: "spec", tgt: "senior", n: "죽 곁들임 순한 양념김치", c: "곱게 다진 무자극 김치", ing: ["배추", "무", "저염양념"], tw: "흰죽·회복기 식단", ref: "new", h: "#E8C8A0", lv: 1 },
  { cat: "spec", tgt: "senior", n: "생강·강황 항염 김치", c: "노란빛 항염 재료", ing: ["배추", "생강", "강황"], tw: "관절 건강 + 새 비주얼", ref: "new", h: "#D9A52E", lv: 2 },
  { cat: "spec", tgt: "senior", n: "강판 연하 깍두기", c: "무를 갈아 부드럽게", ing: ["무(간 것)", "배", "저염양념"], tw: "씹기 부담 거의 0", ref: "new", h: "#E8D8C0", lv: 1 },
  { cat: "spec", tgt: "senior", n: "흑임자 영양 백김치", c: "흑임자·잣으로 고소·영양", ing: ["배추", "흑임자", "잣"], tw: "기력·영양 보충", ref: "new", h: "#3A352E", lv: 2 },
  { cat: "spec", tgt: "senior", n: "무름 백김치(연하식)", c: "한 번 더 익혀 잇몸으로도", ing: ["배추", "무", "배"], tw: "저작 약한 분 타깃", ref: "maybe", h: "#EDE6D6", lv: 1 },
  { cat: "spec", tgt: "senior", n: "약선 김치", c: "대추·생강·구기자로 기력", ing: ["배추", "대추", "구기자"], tw: "보약 같은 김치", ref: "maybe", h: "#A33A2B", lv: 2 },
  { cat: "spec", tgt: "senior", n: "뼈튼튼 김치", c: "멸치가루·들깨·시래기", ing: ["시래기", "멸치가루", "들깨"], tw: "칼슘·식이섬유, 익혀 부드럽게", ref: "maybe", h: "#8A6A3A", lv: 2 },
  { cat: "spec", tgt: "senior", n: "동치미 한 모금 컵", c: "맑은 저염 국물 미니 컵", ing: ["무", "소금(소량)", "생강"], tw: "수분·전해질 보충", ref: "maybe", h: "#D7E2E0", lv: 1 },

  // ── 특화: 건강 ──
  { cat: "spec", tgt: "health", n: "프로바이오틱 종균 김치", c: "선발 유산균으로 균일·고기능", ing: ["배추", "선발 종균", "고춧가루"], tw: "효능·품질 표준화", ref: "yes", h: "#C0392B", lv: 3 },
  { cat: "spec", tgt: "health", n: "저나트륨 김치", c: "소금 줄이고 다시마 미네랄", ing: ["배추", "다시마", "저염소금"], tw: "혈압·건강 소구", ref: "yes", h: "#5A8CA8", lv: 2 },
  { cat: "spec", tgt: "health", n: "식이섬유 부스트 김치", c: "우엉·연근으로 섬유질 ↑", ing: ["우엉", "연근", "배추"], tw: "장 건강 + 아삭", ref: "maybe", h: "#8A6A3A", lv: 2 },
  { cat: "spec", tgt: "health", n: "치아씨 오메가 김치", c: "들기름·치아씨로 오메가3", ing: ["배추", "치아씨", "들기름"], tw: "오메가3·식이섬유 강화", ref: "new", h: "#5A7A4A", lv: 2 },
  { cat: "spec", tgt: "health", n: "적포도 폴리페놀 김치", c: "적포도·적채로 항산화", ing: ["적채", "적포도", "무"], tw: "와인빛 항산화", ref: "new", h: "#7A2A4A", lv: 2 },

  // ── 특화: 신세대 ──
  { cat: "spec", tgt: "genz", n: "컬러 김치 3종 박스", c: "빨강·분홍·연두 미니 3종", ing: ["배추", "비트", "청경채"], tw: "선물·언박싱·촬영각", ref: "new", h: "#C24E86", lv: 2 },
  { cat: "spec", tgt: "genz", n: "김치 하이볼 안주 큐브", c: "하이볼에 맞춘 상큼 큐브", ing: ["무", "배추", "유자"], tw: "혼술 페어링 콘텐츠", ref: "new", h: "#D9A52E", lv: 1 },
  { cat: "spec", tgt: "genz", n: "병아리콩 단백 김치", c: "단백질 강화 헬시 김치", ing: ["배추", "병아리콩", "고춧가루"], tw: "운동·고단백 태그", ref: "new", h: "#C9A86A", lv: 2 },
  { cat: "spec", tgt: "genz", n: "한입 큐브 김치", c: "1인·도시락용 정육면체", ing: ["무", "배추", "고춧가루"], tw: "간편·휴대", ref: "maybe", h: "#D14B3A", lv: 1 },
  { cat: "spec", tgt: "genz", n: "마라 김치", c: "마라 트렌드 + 발효", ing: ["배추", "마라양념", "화자오"], tw: "매운맛 챌린지 콘텐츠", ref: "maybe", h: "#B81E2A", lv: 2 },
  { cat: "spec", tgt: "genz", n: "저당 다이어트 김치", c: "설탕·밀가루풀 빼고 가볍게", ing: ["배추", "무", "알룰로스"], tw: "헬시 라이프 태그", ref: "maybe", h: "#7FB05A", lv: 1 },
];

function Lv({ n }) {
  return (
    <span style={{ display: "inline-flex", gap: 3, alignItems: "center" }}>
      {[1, 2, 3].map((i) => <span key={i} style={{ width: 6, height: 6, borderRadius: 99, background: i <= n ? P.ongi : "rgba(0,0,0,0.14)" }} />)}
    </span>
  );
}

async function generateRecipe(idea) {
  const prompt = `너는 30년차 김치 명인이자 푸드 스타일리스트야. 아래 창작 김치의 실전 레시피를 한국어로 작성해. 반드시 아래 JSON만 출력하고 설명·마크다운·코드펜스는 절대 쓰지 마.

김치 이름: ${idea.n}
콘셉트: ${idea.c}
핵심 재료: ${idea.ing.join(", ")}
차별 포인트: ${idea.tw}

JSON:
{
 "servings":"예: 4인분",
 "ingredients":[{"item":"배추","amount":"1통(2kg)"}],
 "brine":"절임 1~2문장(소금 농도/시간)",
 "steps":["1. ...","2. ..."],
 "ferment":"발효 일정(온도·기간·먹기 좋은 시점)",
 "plating":"플레이팅·비주얼 팁 1~2문장",
 "tasting":["시식 평가 포인트 3개"],
 "tip":"실패 방지 팁 1문장"
}
간결하게. steps는 5~7단계. 분량은 현실적으로.`;
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
  });
  const data = await res.json();
  const text = data.content.filter((b) => b.type === "text").map((b) => b.text).join("");
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

function RefLinks({ idea, color }) {
  const q = encodeURIComponent(idea.n + " 김치");
  const links = [
    { label: "이미지", url: `https://www.google.com/search?tbm=isch&q=${q}` },
    { label: "레시피", url: `https://www.10000recipe.com/recipe/list.html?q=${q}` },
    { label: "유튜브", url: `https://www.youtube.com/results?search_query=${q}+만들기` },
  ];
  return (
    <div className="flex flex-wrap" style={{ gap: 6 }}>
      {links.map((l) => (
        <a key={l.label} href={l.url} target="_blank" rel="noreferrer"
          style={{ fontSize: 12, padding: "6px 12px", borderRadius: 99, textDecoration: "none", border: `1px solid ${color}`, color, fontWeight: 600 }}>
          {l.label} ↗
        </a>
      ))}
    </div>
  );
}

function Block({ title, color, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color, marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  );
}

function DetailModal({ idea, onClose }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const cat = CAT[idea.cat], ref = REF[idea.ref], tgt = idea.tgt ? TGT[idea.tgt] : null;
  const fm = FERM[idea.f || "live"];

  const run = async () => {
    setLoading(true); setErr(null);
    try { setRecipe(await generateRecipe(idea)); }
    catch { setErr("레시피 생성에 실패했어요. 다시 시도해 주세요."); }
    finally { setLoading(false); }
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(20,14,11,0.55)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: P.paper, width: "100%", maxWidth: 600, maxHeight: "92vh", overflowY: "auto", borderRadius: "20px 20px 0 0", padding: 22 }}>
        <div className="flex items-start justify-between" style={{ marginBottom: 12 }}>
          <div>
            <div className="flex items-center" style={{ gap: 6, marginBottom: 4 }}>
              <span style={{ fontSize: 10.5, color: cat.c, fontWeight: 600 }}>{cat.label}</span>
              {tgt && <span style={{ fontSize: 10.5, color: tgt.c, fontWeight: 600 }}>· {tgt.label}</span>}
            </div>
            <h2 style={{ fontFamily: "'Gowun Batang', serif", fontSize: 24, color: P.ink, margin: "0 0 4px" }}>{idea.n}</h2>
            <div style={{ fontSize: 13, color: P.muted }}>{idea.c}</div>
          </div>
          <button onClick={onClose} style={{ fontSize: 22, color: P.muted, background: "none", border: "none", cursor: "pointer", lineHeight: 1 }}>✕</button>
        </div>

        {/* 레퍼런스 상태 */}
        <div style={{ background: `${ref.c}14`, border: `1px solid ${ref.c}55`, borderRadius: 10, padding: "10px 14px", marginBottom: 18 }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <span style={{ width: 9, height: 9, borderRadius: 99, background: ref.c }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: ref.c }}>{ref.label}</span>
          </div>
          <div style={{ fontSize: 12, color: P.ink, marginTop: 6, lineHeight: 1.5 }}>{ref.note}</div>
        </div>

        {/* 발효 상태 */}
        <div style={{ background: `${fm.c}14`, border: `1px solid ${fm.c}55`, borderRadius: 10, padding: "10px 14px", marginBottom: 18 }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <span style={{ fontSize: 14 }}>{fm.icon}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: fm.c }}>{fm.label}</span>
          </div>
          <div style={{ fontSize: 12, color: P.ink, marginTop: 6, lineHeight: 1.5 }}>{fm.note}</div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, color: P.muted, marginBottom: 6 }}>기대 비주얼 · 컬러</div>
          <div className="flex" style={{ gap: 8, alignItems: "center" }}>
            <span style={{ width: 44, height: 44, borderRadius: 10, background: idea.h, border: "2px solid #fff", boxShadow: "0 1px 6px rgba(0,0,0,0.18)" }} />
            <span style={{ width: 32, height: 32, borderRadius: 8, background: cat.c, opacity: 0.85 }} />
            <span style={{ width: 24, height: 24, borderRadius: 7, background: "#fff", border: `1px solid ${P.line}` }} />
            <span style={{ fontSize: 12, color: P.muted, marginLeft: 4 }}>주재료 색 · 카테고리 톤 · 여백</span>
          </div>
        </div>

        {/* 레퍼런스 링크 */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, color: P.muted, marginBottom: 6 }}>웹에서 실제 사례 확인 (새 탭)</div>
          <RefLinks idea={idea} color={cat.c} />
        </div>

        {!recipe && !loading && (
          <button onClick={run} style={{ width: "100%", padding: 14, borderRadius: 12, border: "none", cursor: "pointer", background: P.ongi, color: "#fff", fontSize: 14, fontWeight: 600 }}>
            ✨ 이 김치의 상세 레시피 생성하기
          </button>
        )}
        {loading && <div style={{ textAlign: "center", padding: "20px 0", color: P.muted, fontSize: 13 }}>명인이 레시피를 구상하는 중…</div>}
        {err && <div style={{ background: "rgba(190,58,43,0.08)", color: "#BE3A2B", borderRadius: 10, padding: 14, fontSize: 13 }}>{err} <button onClick={run} style={{ marginLeft: 8, color: "#BE3A2B", fontWeight: 600, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>재시도</button></div>}

        {recipe && (
          <div style={{ marginTop: 4 }}>
            <div style={{ fontSize: 12, color: P.muted, marginBottom: 12 }}>분량 · {recipe.servings}</div>
            <Block title="재료" color={cat.c}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px" }}>
                {(recipe.ingredients || []).map((x, i) => (
                  <div key={i} style={{ fontSize: 13, display: "flex", justifyContent: "space-between", borderBottom: `1px dashed ${P.line}`, padding: "3px 0" }}>
                    <span style={{ color: P.ink }}>{x.item}</span><span style={{ color: P.muted }}>{x.amount}</span>
                  </div>
                ))}
              </div>
            </Block>
            <Block title="절임" color={cat.c}><p style={{ fontSize: 13, lineHeight: 1.6, color: P.ink, margin: 0 }}>{recipe.brine}</p></Block>
            <Block title="만드는 법" color={cat.c}>
              <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {(recipe.steps || []).map((s, i) => <li key={i} style={{ fontSize: 13, lineHeight: 1.6, color: P.ink, marginBottom: 6 }}>{s}</li>)}
              </ol>
            </Block>
            <Block title="발효 일정" color={cat.c}><p style={{ fontSize: 13, lineHeight: 1.6, color: P.ink, margin: 0 }}>{recipe.ferment}</p></Block>
            <Block title="플레이팅 · 비주얼" color={cat.c}><p style={{ fontSize: 13, lineHeight: 1.6, color: P.ink, margin: 0 }}>{recipe.plating}</p></Block>
            <Block title="시식 평가 포인트" color={cat.c}>
              <div className="flex flex-wrap" style={{ gap: 6 }}>
                {(recipe.tasting || []).map((x, i) => <span key={i} style={{ fontSize: 12, background: "rgba(0,0,0,0.05)", color: P.ink, padding: "5px 10px", borderRadius: 8 }}>{x}</span>)}
              </div>
            </Block>
            {recipe.tip && <div style={{ background: P.ongi, color: "#fff", borderRadius: 12, padding: 14, marginTop: 6, fontSize: 12.5, lineHeight: 1.6 }}><b style={{ color: "#E0B354" }}>명인의 팁 </b>{recipe.tip}</div>}
            <button onClick={run} style={{ marginTop: 14, width: "100%", padding: 10, borderRadius: 10, border: `1px solid ${P.line}`, background: "transparent", color: P.muted, fontSize: 12.5, cursor: "pointer" }}>↻ 다른 버전으로 다시 생성</button>
            <div style={{ fontSize: 11, color: P.muted, textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>AI가 만든 초안이에요. 실습하며 분량·간을 직접 조정해 완성하세요.</div>
          </div>
        )}
      </div>
    </div>
  );
}

function IdeaCard({ idea, onOpen, picked, onPick }) {
  const cat = CAT[idea.cat], ref = REF[idea.ref], tgt = idea.tgt ? TGT[idea.tgt] : null;
  const fm = FERM[idea.f || "live"];
  return (
    <div style={{ background: P.paper, borderRadius: 14, padding: 14, borderLeft: `4px solid ${cat.c}`, border: picked ? `2px solid ${cat.c}` : `1px solid ${P.line}`, borderLeftWidth: 4, borderLeftColor: cat.c, boxShadow: "0 1px 2px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
        <span className="flex items-center" style={{ gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 99, background: idea.h, border: "1px solid rgba(0,0,0,0.1)" }} />
          <span style={{ fontSize: 10, color: cat.c, fontWeight: 600 }}>{cat.label}{tgt ? `·${tgt.label}` : ""}</span>
          {idea.f && idea.f !== "live" && <span style={{ fontSize: 9.5, color: fm.c, fontWeight: 600 }}>· {fm.icon}{fm.short}</span>}
        </span>
        <span style={{ fontSize: 9.5, color: "#fff", background: ref.c, padding: "2px 7px", borderRadius: 99, fontWeight: 600 }}>{ref.label}</span>
      </div>
      <h3 style={{ fontFamily: "'Gowun Batang', serif", fontSize: 17, color: P.ink, margin: "0 0 4px", lineHeight: 1.2 }}>{idea.n}</h3>
      <p style={{ fontSize: 12.5, color: P.ink, margin: "0 0 8px", lineHeight: 1.45, flex: 1 }}>{idea.c}</p>
      <div className="flex flex-wrap" style={{ gap: 4, marginBottom: 8 }}>
        {idea.ing.map((x) => <span key={x} style={{ fontSize: 10.5, color: P.muted, background: "rgba(0,0,0,0.045)", padding: "2px 7px", borderRadius: 99 }}>{x}</span>)}
      </div>
      <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
        <span style={{ fontSize: 11.5, color: cat.c, lineHeight: 1.4 }}>↳ {idea.tw}</span>
        <Lv n={idea.lv} />
      </div>
      <div className="flex" style={{ gap: 6 }}>
        <button onClick={() => onOpen(idea)} style={{ flex: 1, fontSize: 12, padding: "8px", borderRadius: 9, cursor: "pointer", fontWeight: 600, border: "none", background: cat.c, color: "#fff" }}>레시피·레퍼런스</button>
        <button onClick={() => onPick(idea.n)} title="시식 후보" style={{ width: 40, fontSize: 14, padding: "8px", borderRadius: 9, cursor: "pointer", border: `1px solid ${picked ? cat.c : P.line}`, background: picked ? cat.c : "transparent", color: picked ? "#fff" : P.muted }}>{picked ? "✓" : "+"}</button>
      </div>
    </div>
  );
}

export default function KimchiRecipeLab() {
  const [cat, setCat] = useState("all");
  const [tgt, setTgt] = useState("all");
  const [onlyMine, setOnlyMine] = useState(false);
  const [ferm, setFerm] = useState("all"); // all | live | proc
  const [open, setOpen] = useState(null);
  const [picks, setPicks] = useState([]);

  const filtered = useMemo(() => IDEAS.filter((i) => {
    const f = i.f || "live";
    if (cat !== "all" && i.cat !== cat) return false;
    if (cat === "spec" && tgt !== "all" && i.tgt !== tgt) return false;
    if (onlyMine && i.ref !== "new") return false;
    if (ferm === "live" && f !== "live") return false;
    if (ferm === "proc" && f === "live") return false;
    return true;
  }), [cat, tgt, onlyMine, ferm]);

  const liveCount = IDEAS.filter((i) => (i.f || "live") === "live").length;
  const procCount = IDEAS.length - liveCount;

  const newCount = IDEAS.filter((i) => i.ref === "new").length;
  const togglePick = (n) => setPicks((p) => p.includes(n) ? p.filter((x) => x !== n) : [...p, n]);

  return (
    <div style={{ minHeight: "100vh", background: P.sogeum }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=IBM+Plex+Sans+KR:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; } body { margin: 0; }
        .rl, .rl * { font-family: 'IBM Plex Sans KR', sans-serif; }
      `}</style>

      <div className="rl" style={{ maxWidth: 760, margin: "0 auto", padding: "0 16px 80px" }}>
        <header style={{ padding: "32px 4px 14px" }}>
          <div style={{ fontSize: 11, letterSpacing: 2.5, color: "#BE3A2B", fontWeight: 600, marginBottom: 10 }}>나만의 김치 레시피 · 아이디어 랩</div>
          <h1 style={{ fontFamily: "'Gowun Batang', serif", fontSize: 29, lineHeight: 1.25, color: P.ongi, margin: 0 }}>전통·참신·특화로<br />아이디어 고르기</h1>
          <p style={{ fontSize: 13.5, color: P.muted, marginTop: 12, lineHeight: 1.6 }}>각 카드의 <b>레퍼런스 배지</b>로 기존 것과 새 아이디어를 구분합니다. 과제에 쓸 <b style={{ color: "#BE3A2B" }}>나만의 아이디어</b>만 보려면 아래 토글을 켜세요.</p>
        </header>

        {/* 레퍼런스 범례 */}
        <div style={{ background: P.paper, borderRadius: 12, padding: 14, border: `1px solid ${P.line}`, marginBottom: 16 }}>
          {Object.entries(REF).map(([k, r]) => (
            <div key={k} className="flex items-center" style={{ gap: 8, marginBottom: k === "new" ? 0 : 7 }}>
              <span style={{ width: 9, height: 9, borderRadius: 99, background: r.c, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: P.ink }}><b style={{ color: r.c }}>{r.label}</b> — {k === "yes" ? "이미 존재(전통·상품·연구). 공부용." : k === "maybe" ? "유사 가능. 검색 확인 후 차별점 추가." : "거의 없음. 과제용 나만의 아이디어."}</span>
            </div>
          ))}
          <div style={{ fontSize: 11, color: P.muted, marginTop: 10, paddingTop: 8, borderTop: `1px dashed ${P.line}`, lineHeight: 1.5 }}>
            ⚠ 배지는 추정입니다. 제출 전 사이언스온·웹 검색으로 최종 확인하세요.
          </div>
        </div>

        {/* 나만의 아이디어 토글 */}
        <button onClick={() => setOnlyMine(!onlyMine)}
          style={{ width: "100%", padding: "12px 16px", borderRadius: 12, marginBottom: 18, cursor: "pointer", textAlign: "left",
            border: onlyMine ? "2px solid #BE3A2B" : `1px solid ${P.line}`, background: onlyMine ? "#BE3A2B" : P.paper,
            color: onlyMine ? "#fff" : P.ink, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13.5, fontWeight: 600 }}>🔍 나만의 아이디어만 보기 <span style={{ opacity: 0.7, fontWeight: 400 }}>(레퍼런스 없는 것)</span></span>
          <span style={{ fontSize: 12, opacity: 0.85 }}>{onlyMine ? `${filtered.length}개 ●` : `${newCount}개 ○`}</span>
        </button>

        {/* 발효 기준 필터 */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11.5, color: P.muted, marginBottom: 6 }}>발효 기준 — 김치는 젖산발효·유산균이 있어야 김치</div>
          <div className="flex" style={{ gap: 6 }}>
            {[["all", `전체 ${IDEAS.length}`, P.ongi], ["live", `🥬 진짜 김치 ${liveCount}`, FERM.live.c], ["proc", `🍶 가공품 ${procCount}`, FERM.flavor.c]].map(([k, lbl, c]) => (
              <button key={k} onClick={() => setFerm(k)}
                style={{ flex: 1, fontSize: 12, padding: "9px 6px", borderRadius: 10, cursor: "pointer", fontWeight: 600,
                  border: ferm === k ? `2px solid ${c}` : `1px solid ${P.line}`, background: ferm === k ? c : P.paper, color: ferm === k ? "#fff" : P.ink, transition: "all .2s" }}>
                {lbl}
              </button>
            ))}
          </div>
          {ferm === "proc" && (
            <div style={{ fontSize: 11.5, color: FERM.flavor.c, marginTop: 8, lineHeight: 1.5 }}>
              이미 발효된 김치·파우더를 재료로 쓴 소스·딥류. 발효 풍미는 있지만 살아있는 유산균은 기대하기 어려워, 엄밀히는 '김치'가 아닌 <b>김치 활용 가공품</b>입니다.
            </div>
          )}
        </div>

        {/* 카테고리 탭 */}
        <div className="flex flex-wrap" style={{ gap: 7, marginBottom: 8 }}>
          <button onClick={() => { setCat("all"); setTgt("all"); }} style={tabStyle(cat === "all", P.ongi)}>전체 {IDEAS.length}</button>
          {Object.entries(CAT).map(([k, c]) => (
            <button key={k} onClick={() => { setCat(k); setTgt("all"); }} style={tabStyle(cat === k, c.c)}>{c.label}</button>
          ))}
        </div>

        {/* 카테고리 설명 */}
        {cat !== "all" && (
          <div style={{ fontSize: 12.5, color: CAT[cat].c, background: P.paper, borderRadius: 10, padding: "10px 14px", border: `1px solid ${P.line}`, marginBottom: 12, lineHeight: 1.5 }}>
            <b>{CAT[cat].label}</b> · {CAT[cat].desc}
          </div>
        )}

        {/* 특화 타깃 서브필터 */}
        {cat === "spec" && (
          <div className="flex flex-wrap" style={{ gap: 6, marginBottom: 16 }}>
            <button onClick={() => setTgt("all")} style={subStyle(tgt === "all", P.ongi)}>전체</button>
            {Object.entries(TGT).map(([k, t]) => (
              <button key={k} onClick={() => setTgt(k)} style={subStyle(tgt === k, t.c)}>{t.label}</button>
            ))}
          </div>
        )}
        {cat !== "spec" && <div style={{ height: 6 }} />}

        {/* 그리드 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(225px, 1fr))", gap: 12 }}>
          {filtered.map((idea) => <IdeaCard key={idea.n} idea={idea} onOpen={setOpen} picked={picks.includes(idea.n)} onPick={togglePick} />)}
        </div>
        {filtered.length === 0 && <div style={{ textAlign: "center", color: P.muted, fontSize: 13, padding: "40px 0" }}>조건에 맞는 아이디어가 없어요. 필터를 조정해 보세요.</div>}

        <footer style={{ textAlign: "center", marginTop: 28, fontSize: 11.5, color: P.muted, lineHeight: 1.6 }}>
          {picks.length > 0 && <div style={{ color: "#BE3A2B", fontWeight: 600, marginBottom: 6 }}>시식 후보 {picks.length}개 담음</div>}
          난이도 ●○○ 쉬움 · ●●● 도전 — 실습 가능성을 함께 고려하세요
        </footer>
      </div>

      {open && <DetailModal idea={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function tabStyle(on, c) {
  return { fontSize: 12.5, padding: "7px 14px", borderRadius: 99, cursor: "pointer", fontWeight: 600, border: on ? `2px solid ${c}` : "1px solid rgba(43,33,28,0.10)", background: on ? c : "#FBF7EE", color: on ? "#fff" : "#352D26", transition: "all .2s" };
}
function subStyle(on, c) {
  return { fontSize: 12, padding: "5px 12px", borderRadius: 99, cursor: "pointer", fontWeight: 600, border: on ? `1.5px solid ${c}` : "1px solid rgba(43,33,28,0.10)", background: on ? `${c}1a` : "transparent", color: on ? c : "#897D6D" };
}
