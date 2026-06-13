import React, { useState } from "react";

/*
  Pink Rucola Kimchi — 외국인 홈쿡 가이드 (문화 전파용)
  컨셉: 집에서 쉽게, 며칠 안에 먹는 분홍 물김치. 고춧가루 없음.
  생토마토 1차 옵션 / 토마토가루·선드라이드 2차 / 방울토마토 데코
  시그니처: 분홍 국물 + 방울토마토 데코 단면도, 친근한 톤
  팔레트: 분홍 국물 / 루꼴라 초록 / 오이 연두 / 방울토마토 / 천일염
*/

const C = {
  bg: "#FBF3F1", paper: "#FFFBF6", ink: "#2E2724", muted: "#8C7E76",
  brine: "#E07A93", brineDeep: "#C84E6C", brineLt: "#F4C2CE",
  rucola: "#4E7A3E", rucolaLt: "#6FA04A",
  cuke: "#BCD79E", cukeSkin: "#5E8C4A",
  cherry: "#E24B4B", salt: "#FAF6EE", pear: "#C9A24B", line: "rgba(46,39,36,0.10)",
};

function Mono({ children, c }) {
  return <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, color: c || C.brineDeep }}>{children}</span>;
}

function Jar() {
  return (
    <svg viewBox="0 0 280 300" style={{ width: "100%", maxWidth: 300, height: "auto", display: "block", margin: "0 auto" }} role="img" aria-label="분홍 국물에 오이소박이와 루꼴라가 담기고 방울토마토가 올라간 김치 단면도">
      <defs>
        <linearGradient id="brineG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.brineLt} /><stop offset="100%" stopColor={C.brine} />
        </linearGradient>
        <clipPath id="jarClip"><path d="M58 86 Q58 78 70 76 L210 76 Q222 78 222 86 L222 268 Q222 284 204 284 L76 284 Q58 284 58 268 Z" /></clipPath>
      </defs>
      <rect x="64" y="58" width="152" height="20" rx="8" fill={C.salt} stroke={C.line} />
      <path d="M58 86 Q58 78 70 76 L210 76 Q222 78 222 86 L222 268 Q222 284 204 284 L76 284 Q58 284 58 268 Z" fill={C.paper} stroke={C.brineDeep} strokeWidth="2.5" />
      <g clipPath="url(#jarClip)">
        <rect x="58" y="150" width="164" height="140" fill="url(#brineG)" opacity="0.92" />
        <rect x="58" y="150" width="164" height="3" fill="#fff" opacity="0.5" />
        {[[88, 168], [128, 158], [170, 172]].map(([x, y], i) => (
          <g key={i}>
            <rect x={x} y={y} width="26" height="104" rx="9" fill={C.cuke} stroke={C.cukeSkin} strokeWidth="2.5" />
            <rect x={x + 8} y={y + 8} width="10" height="78" rx="5" fill={C.brineDeep} opacity="0.5" />
          </g>
        ))}
        {[[80, 158, -18], [150, 150, 12], [196, 162, 24], [110, 178, -8]].map(([x, y, r], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M0 0 Q8 -10 18 -4 Q10 4 0 0Z" fill={C.rucola} />
          </g>
        ))}
        {[[100, 230], [150, 250], [188, 220], [120, 265]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.6" fill="#fff" opacity="0.7" />)}
      </g>
      {/* 방울토마토 데코 (국물 위에 동동) */}
      {[[96, 150], [140, 146], [184, 151]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" fill={C.cherry} />
          <circle cx={x - 3} cy={y - 3} r="2.5" fill="#fff" opacity="0.55" />
          <path d={`M${x} ${y - 9} l-3 -4 m3 4 l3 -4`} stroke={C.rucola} strokeWidth="1.6" fill="none" />
        </g>
      ))}
      <rect x="58" y="200" width="164" height="32" fill="#fff" opacity="0.82" />
      <text x="140" y="216" textAnchor="middle" fontFamily="'Gowun Batang', serif" fontSize="13" fill={C.brineDeep}>Pink Rucola Kimchi</text>
      <text x="140" y="228" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fill={C.muted}>EASY · NO CHILI · 3 DAYS</text>
    </svg>
  );
}

const WHY = [
  ["🌶️ 고춧가루 없음", "토마토·파프리카로 순한 분홍. 매운맛 부담 제로."],
  ["🥬 진짜 발효 김치", "물김치 국물에 유산균이 산다. 샐러드가 아님."],
  ["⏱️ 며칠이면 완성", "담그고 2~3일이면 먹기 좋다. 오래 안 기다림."],
  ["🍅 흔한 재료", "토마토·루꼴라·오이. 어느 마트에나 있다."],
];

const STEPS = [
  { no: "1", t: "Make the broth (감칠맛 물)", c: C.brineDeep,
    body: "물에 다시마·말린 표고를 넣고, 건새우·북어포를 더해 냉장고에서 하룻밤 둔다. 끓이지 않는다.",
    bodyV: "물에 다시마·말린 표고만 넣고 냉장고에서 하룻밤 둔다. 끓이지 않는다. 동물성 재료 없음.",
    chip: [["우리기", "하룻밤 / overnight"]],
    tip: "건새우·북어포가 감칠맛을 더한다. 없으면 다시마·표고만으로도 OK.",
    tipV: "다시마(글루탐산) + 표고(구아닐산)의 감칠맛 시너지. 젓갈·해산물 0 → 완전 비건." },
  { no: "2", t: "Pink sauce (분홍 양념)", c: C.brine,
    body: "토마토·마늘·생강·파프리카가루·배(또는 사과)를 블렌더에 갈아 물과 섞는다. 곱게 거르면 더 맑다(선택).",
    chip: [["토마토", "1차 옵션 · 생토마토"], ["국물 간", "약 2% 소금"]],
    tip: "생토마토가 가장 쉽고 신선하다. 색은 핑크, 맛은 새콤달콤." },
  { no: "3", t: "Quick-salt the veg (살짝 절이기)", c: C.rucola,
    body: "루꼴라는 소금물에 아주 살짝(5분 이내). 오이는 짧게 토막 내 뜨겁지 않은 물에 살짝 담갔다 빼고, 가운데 속을 파낸다.",
    chip: [["루꼴라", "5분 이내"], ["오이", "데치지 말고 살짝"]],
    tip: "오이를 끓는 물에 오래 두면 물러진다. 따뜻한 물에 잠깐이면 충분." },
  { no: "4", t: "Pack & ferment (담가서 익히기)", c: C.pear,
    body: "오이 속에 루꼴라+양념을 채워 통에 담고, 남은 루꼴라와 함께 분홍 국물을 붓는다. 방울토마토를 위에 올려 장식.",
    chip: [["실온", "반나절 (half-day)"], ["냉장", "2~3일"]],
    tip: "실온에 잠깐 둬 발효를 깨운 뒤 냉장으로. 며칠 안에 먹으니 부담 없다." },
];

const TOMATO = [
  { rank: "1차", name: "생토마토 (Fresh)", c: C.cherry, best: true,
    note: "가장 쉽고 흔하다. 신선한 단맛·과즙. 며칠 안에 먹는 이 레시피엔 과발효가 문제 안 됨. 잘 익은 빨간 토마토.", },
  { rank: "2차", name: "토마토 가루 (Powder)", c: C.brineDeep, best: false,
    note: "수분 없어 더 오래 보관·진한 색. 여행·선물용이나 오래 두고 먹을 때.", },
  { rank: "2차", name: "선드라이드 토마토", c: C.pear, best: false,
    note: "감칠맛 폭발 + 씹는 맛. 잘게 다져 소박이 속에. 지중해 감성.", },
];

const CULTURE = [
  { r: "지중해 (이탈리아·스페인)", s: 5, note: "토마토+루꼴라가 일상. '발효 샐러드'로 가장 환영." },
  { r: "미국·서유럽·호주", s: 4, note: "발효·헬시 트렌드 + 친숙한 재료. 따라 만들기 쉬움." },
  { r: "동남아 (태국·베트남)", s: 4, note: "새콤·허브 물김치가 입맛과 통함." },
  { r: "일본", s: 3, note: "순한 국물은 맞지만 토마토 김치는 낯섦." },
  { r: "중동·인도", s: 2, note: "재료는 친숙하나 발효 채소 문화가 약함." },
];

function Eyebrow({ children }) { return <div style={{ fontSize: 11, letterSpacing: 2.5, color: C.brineDeep, fontWeight: 600, marginBottom: 14 }}>{children}</div>; }
function H2({ children }) { return <h2 style={{ fontFamily: "'Gowun Batang', serif", fontSize: 23, color: C.ink, margin: "0 0 16px", lineHeight: 1.3 }}>{children}</h2>; }
function Section({ children, top }) { return <section style={{ padding: "40px 0", borderTop: top ? `1px solid ${C.line}` : "none" }}>{children}</section>; }

export default function PinkRucolaKimchi() {
  const [tab, setTab] = useState(0);
  const [vegan, setVegan] = useState(false);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=IBM+Plex+Sans+KR:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; } body { margin: 0; }
        .pk, .pk * { font-family: 'IBM Plex Sans KR', sans-serif; }
        @media (prefers-reduced-motion: reduce){ * { transition: none !important; } }
      `}</style>

      <div className="pk" style={{ maxWidth: 620, margin: "0 auto", padding: "0 18px 70px" }}>
        {/* Hero */}
        <header style={{ padding: "40px 0 8px", textAlign: "center" }}>
          <Eyebrow>집에서 쉽게 · 며칠이면 완성</Eyebrow>
          <h1 style={{ fontFamily: "'Gowun Batang', serif", fontSize: 36, lineHeight: 1.2, color: C.ink, margin: "0 0 6px" }}>
            분홍 루꼴라 김치
          </h1>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: C.brineDeep, letterSpacing: 1, marginBottom: 14 }}>PINK RUCOLA KIMCHI</div>
          <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, maxWidth: 430, margin: "0 auto 24px" }}>
            고춧가루 없이 <b style={{ color: C.brineDeep }}>토마토</b>로 물들인 순한 물김치. 부추 대신 <b style={{ color: C.rucola }}>루꼴라</b>, 위엔 <b style={{ color: C.cherry }}>방울토마토</b>. 누구나 집에서 따라 만들 수 있게.
          </p>
          <Jar />
        </header>

        {/* 기본 / 비건 토글 */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 4 }}>
          {[[false, "기본", "건새우·북어 + 다시마·표고"], [true, "비건", "다시마·표고만"]].map(([v, lbl, sub]) => {
            const on = vegan === v;
            const ac = v ? C.rucola : C.brineDeep;
            return (
              <button key={lbl} onClick={() => setVegan(v)}
                style={{ flex: "1 1 0", maxWidth: 200, padding: "10px 12px", borderRadius: 12, cursor: "pointer", textAlign: "center",
                  border: on ? `2px solid ${ac}` : `1px solid ${C.line}`, background: on ? ac : C.paper, color: on ? "#fff" : C.ink, transition: "all .2s" }}>
                <div style={{ fontSize: 13.5, fontWeight: 700 }}>{v ? "🌱 " : ""}{lbl}</div>
                <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>{sub}</div>
              </button>
            );
          })}
        </div>
        {vegan && (
          <div style={{ fontSize: 12, color: C.rucola, textAlign: "center", marginTop: 10, lineHeight: 1.5 }}>
            건새우·북어를 빼고 <b>다시마·표고만</b>으로 감칠맛을 내 <b>완전 비건</b>. 채식·종교적 제약이 있는 사람에게도 권할 수 있어요.
          </div>
        )}

        {/* 왜 쉬운가 */}
        <Section>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {WHY.map(([t, d]) => (
              <div key={t} style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 4 }}>{t}</div>
                <div style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.45 }}>{d}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* 레시피 */}
        <Section top>
          <Eyebrow>레시피 · 4단계</Eyebrow>
          <H2>이렇게 만들어요</H2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {STEPS.map((s) => (
              <div key={s.no} style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 14, padding: 16, borderLeft: `4px solid ${s.c}` }}>
                <div className="flex items-center" style={{ gap: 10, marginBottom: 8 }}>
                  <span style={{ width: 24, height: 24, borderRadius: 7, background: s.c, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{s.no}</span>
                  <h3 style={{ fontFamily: "'Gowun Batang', serif", fontSize: 16.5, color: C.ink, margin: 0 }}>{s.t}</h3>
                  {s.no === "1" && vegan && <span style={{ fontSize: 10, color: "#fff", background: C.rucola, padding: "2px 7px", borderRadius: 99, fontWeight: 600 }}>비건</span>}
                </div>
                <p style={{ fontSize: 13, color: C.ink, lineHeight: 1.55, margin: "0 0 10px" }}>{vegan && s.bodyV ? s.bodyV : s.body}</p>
                <div className="flex flex-wrap" style={{ gap: 6, marginBottom: 10 }}>
                  {s.chip.map(([k, v]) => (
                    <span key={k} style={{ fontSize: 11.5, background: `${s.c}14`, borderRadius: 8, padding: "4px 9px", color: C.ink }}>{k} <Mono c={s.c}>{v}</Mono></span>
                  ))}
                </div>
                <div style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.55, paddingTop: 8, borderTop: `1px dashed ${C.line}` }}>
                  <b style={{ color: s.c }}>팁 </b>{vegan && s.tipV ? s.tipV : s.tip}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 토마토 옵션 */}
        <Section top>
          <Eyebrow>토마토, 무엇을 쓸까</Eyebrow>
          <H2>생토마토면 충분해요</H2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {TOMATO.map((t) => (
              <div key={t.name} style={{ background: C.paper, border: t.best ? `2px solid ${t.c}` : `1px solid ${C.line}`, borderRadius: 14, padding: 16 }}>
                <div className="flex items-center" style={{ gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: "#fff", background: t.c, padding: "2px 8px", borderRadius: 99 }}>{t.rank}</span>
                  <span style={{ fontFamily: "'Gowun Batang', serif", fontSize: 16, color: C.ink }}>{t.name}</span>
                  {t.best && <span style={{ fontSize: 10.5, color: t.c, fontWeight: 600 }}>★ 가장 쉬움</span>}
                </div>
                <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.55 }}>{t.note}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11.5, color: C.muted, marginTop: 12, lineHeight: 1.6, background: `${C.cherry}10`, borderRadius: 10, padding: "10px 14px" }}>
            며칠 안에 먹는 레시피라 생토마토의 빠른 발효는 걱정 없어요. 오이만 단단한 걸 골라 살짝 절이면 아삭함이 유지됩니다.
          </div>
        </Section>

        {/* 데코 */}
        <Section top>
          <Eyebrow>마무리</Eyebrow>
          <H2>방울토마토로 예쁘게</H2>
          <div style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 14, padding: 18, display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 54, height: 54, borderRadius: 99, background: `${C.cherry}1a`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>🍅</div>
            <div style={{ fontSize: 13, color: C.ink, lineHeight: 1.6 }}>
              먹기 직전 <b style={{ color: C.cherry }}>방울토마토</b>를 반 갈라 위에 올리면 분홍 국물과 색이 어우러져 한 그릇이 화사해집니다. 그릇째 식탁에, 또는 SNS 한 컷.
            </div>
          </div>
        </Section>

        {/* 어디서 환영받을까 */}
        <Section top>
          <Eyebrow>문화 전파</Eyebrow>
          <H2>어디서 잘 통할까</H2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {CULTURE.map((c) => (
              <div key={c.r} style={{ background: C.paper, border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 14px" }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 3 }}>
                  <span style={{ fontSize: 13, color: C.ink, fontWeight: 600 }}>{c.r}</span>
                  <span style={{ display: "inline-flex", gap: 3 }}>
                    {[1, 2, 3, 4, 5].map((i) => <span key={i} style={{ width: 7, height: 7, borderRadius: 99, background: i <= c.s ? (c.s >= 4 ? C.rucola : c.s === 3 ? C.pear : C.brineDeep) : "rgba(0,0,0,0.1)" }} />)}
                  </span>
                </div>
                <div style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.5 }}>{c.note}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12.5, color: C.muted, marginTop: 14, lineHeight: 1.6 }}>
            친숙한 재료 + 매운맛·젓갈 없음 + 짧은 발효 = <b style={{ color: C.ink }}>외국인이 가장 따라 하기 쉬운 김치</b>. 한국 김치를 처음 접하는 사람에게 권하기 좋은 '입문 김치'예요.
          </p>
        </Section>

        {/* 한 줄 요약 카드 (공유용) */}
        <Section top>
          <div style={{ background: C.brineDeep, borderRadius: 16, padding: 22, color: "#fff", textAlign: "center" }}>
            <div style={{ fontFamily: "'Gowun Batang', serif", fontSize: 18, marginBottom: 8 }}>3-day Pink Kimchi</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.7, opacity: 0.92 }}>
              감칠맛 물 (하룻밤) → 토마토·파프리카 분홍 양념 → 루꼴라·오이 살짝 절임 → 한 통에 담아 반나절 실온 + 냉장 2~3일 → 방울토마토 올려 완성
            </div>
          </div>
        </Section>

        <footer style={{ paddingTop: 36, borderTop: `1px solid ${C.line}`, textAlign: "center" }}>
          <div style={{ fontFamily: "'Gowun Batang', serif", fontSize: 15, color: C.brineDeep, marginBottom: 6 }}>한국의 발효, 세계의 식탁으로</div>
          <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>비공개 · 개인 레시피 · 2026.06.13</div>
        </footer>
      </div>
    </div>
  );
}
