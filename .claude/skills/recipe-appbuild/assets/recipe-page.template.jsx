/*
  RecipePage — 정식 레시피 1개를 깊게 보여주는 심화앱 페이지 템플릿.
  입력: recipe.schema.json을 따르는 recipe 객체.
  스타일 레퍼런스: reference/PinkRucolaKimchi_HomeCook.jsx (분홍 팔레트·단면도·친근한 톤).
  빌드 없음(React CDN + Babel) 환경에서도 동작하도록 외부 의존 없음.

  사용:
    <RecipePage recipe={RECIPES["pink-rucola-kimchi"]} />
  심화앱은 recipes.json(배열)을 로드 → slug로 라우팅 → 이 컴포넌트로 렌더.
*/

const FERM_LABEL = { live: "🥬 진짜 김치", flavor: "🍶 김치 활용 가공품" };
const REF_LABEL = { new: "새 아이디어", maybe: "유사 사례 가능", yes: "레퍼런스 있음" };

function palette(recipe) {
  const [a = "#C84E6C", b = "#4E7A3E"] = recipe.palette || [];
  return {
    bg: "#FBF7EE", paper: "#FFFBF6", ink: "#2E2724", muted: "#8C7E76",
    line: "rgba(46,39,36,0.10)", brand: a, accent: b,
  };
}

function Section({ title, children, C }) {
  return (
    <section style={{ padding: "28px 0", borderTop: `1px solid ${C.line}` }}>
      {title && <h2 style={{ fontFamily: "'Gowun Batang',serif", fontSize: 22, margin: "0 0 16px", color: C.ink }}>{title}</h2>}
      {children}
    </section>
  );
}

function Dots({ n, C }) {
  return <span style={{ display: "inline-flex", gap: 3 }}>
    {[1, 2, 3].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: 99, background: i <= n ? C.brand : C.line }} />)}
  </span>;
}

function RecipePage({ recipe: r }) {
  const C = palette(r);
  const groups = [...new Set((r.ingredients || []).map(i => i.group || "재료"))];
  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'IBM Plex Sans KR',sans-serif", color: C.ink }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=IBM+Plex+Sans+KR:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap');`}</style>
      <div style={{ maxWidth: 660, margin: "0 auto", padding: "0 18px 80px" }}>

        {/* Header */}
        <header style={{ padding: "44px 0 8px", textAlign: "center" }}>
          <div style={{ height: 6, width: 60, background: C.brand, borderRadius: 99, margin: "0 auto 18px" }} />
          <h1 style={{ fontFamily: "'Gowun Batang',serif", fontSize: 34, margin: "0 0 4px" }}>{r.name}</h1>
          {r.name_en && <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: C.brand, letterSpacing: 1 }}>{r.name_en.toUpperCase()}</div>}
          {r.concept && <p style={{ color: C.muted, fontSize: 15, marginTop: 14 }}>{r.concept}</p>}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 16, fontSize: 12.5 }}>
            <span>{FERM_LABEL[r.ferment]}</span>
            <span>· {r.servings}</span>
            {r.total_time && <span>· ⏱ {r.total_time}</span>}
            <span>· 난이도 <Dots n={r.difficulty} C={C} /></span>
            {r.ref && <span>· {REF_LABEL[r.ref]}</span>}
          </div>
        </header>

        {/* 1. 스토리·차별점 (맥락) */}
        {(r.story || r.twist) && <Section title="왜 이 김치인가" C={C}>
          {r.story && <p style={{ lineHeight: 1.7 }}>{r.story}</p>}
          {r.twist && <p style={{ fontWeight: 600, borderLeft: `3px solid ${C.accent}`, paddingLeft: 12 }}>{r.twist}</p>}
        </Section>}

        {/* 2. 계량 재료 */}
        <Section title={`계량 재료 · ${r.servings}`} C={C}>
          {groups.map(g => (
            <div key={g} style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.brand, marginBottom: 6 }}>{g}</div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <tbody>
                  {r.ingredients.filter(i => (i.group || "재료") === g).map((i, k) => (
                    <tr key={k} style={{ borderBottom: `1px solid ${C.line}` }}>
                      <td style={{ padding: "7px 0" }}>{i.item}{i.approx && <span title="실습 검증 필요" style={{ color: C.muted }}> ≈</span>}</td>
                      <td style={{ padding: "7px 0", fontFamily: "'IBM Plex Mono',monospace", textAlign: "right", whiteSpace: "nowrap" }}>{i.amount}</td>
                      <td style={{ padding: "7px 0 7px 12px", color: C.muted, fontSize: 12.5 }}>{i.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </Section>

        {/* 3. 절임 스펙 */}
        {r.brine && <Section title="절임 스펙" C={C}>
          <ul style={{ lineHeight: 1.8, margin: 0, paddingLeft: 18 }}>
            {r.brine.salinity && <li>소금 농도: <b>{r.brine.salinity}</b></li>}
            {r.brine.time && <li>시간: {r.brine.time}</li>}
            {r.brine.temp && <li>온도: {r.brine.temp}</li>}
            {r.brine.target && <li>목표 상태: {r.brine.target}</li>}
          </ul>
        </Section>}

        {/* 4. 작업 순서 */}
        <Section title="작업 순서" C={C}>
          <ol style={{ margin: 0, paddingLeft: 22, lineHeight: 1.7 }}>
            {r.steps.map((s, k) => (
              <li key={k} style={{ marginBottom: 12 }}>
                {s.phase && <b style={{ color: C.brand }}>[{s.phase}] </b>}{s.text}
                {s.tip && <div style={{ fontSize: 12.5, color: C.muted, marginTop: 3 }}>💡 {s.tip}</div>}
              </li>
            ))}
          </ol>
        </Section>

        {/* 5. 발효 일정 */}
        {r.ferment_schedule && <Section title="발효 일정" C={C}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead><tr style={{ color: C.muted, fontSize: 12, textAlign: "left" }}>
              <th style={{ padding: "4px 0" }}>구간</th><th>온도</th><th>기간</th><th>목표</th>
            </tr></thead>
            <tbody>
              {r.ferment_schedule.map((f, k) => (
                <tr key={k} style={{ borderTop: `1px solid ${C.line}` }}>
                  <td style={{ padding: "7px 0" }}>{f.stage}</td><td>{f.temp}</td><td>{f.duration}</td><td>{f.goal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {r.best_after && <p style={{ marginTop: 12 }}>🍽 <b>먹기 좋은 시점:</b> {r.best_after}</p>}
          {r.storage && <p>🧊 <b>보관:</b> {r.storage}</p>}
        </Section>}

        {/* 6~9. 플레이팅·시식·변형·실패 */}
        {r.plating && <Section title="플레이팅" C={C}><p style={{ lineHeight: 1.7 }}>{r.plating}</p></Section>}
        {r.tasting?.scores && <Section title="시식 평가" C={C}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {Object.entries({ flavor: "맛·향", texture: "식감", visual: "비주얼", ferment: "발효", uniqueness: "차별성" }).map(([k, label]) => (
              <div key={k} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 12, color: C.muted }}>{label}</div>
                <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600 }}>{r.tasting.scores[k] ?? "-"}/3</div>
              </div>
            ))}
          </div>
          {r.tasting.comment && <p style={{ marginTop: 12, color: C.muted }}>{r.tasting.comment}</p>}
        </Section>}
        {r.variations?.length > 0 && <Section title="변형 · 옵션" C={C}>
          <ul style={{ lineHeight: 1.7 }}>{r.variations.map((v, k) => <li key={k}>{v}</li>)}</ul></Section>}
        {r.pitfalls?.length > 0 && <Section title="실패 포인트 & 회피" C={C}>
          <ul style={{ lineHeight: 1.7 }}>{r.pitfalls.map((p, k) => <li key={k}>{p}</li>)}</ul></Section>}
        {r.sources?.length > 0 && <Section title="출처" C={C}>
          <ul style={{ fontSize: 12.5, color: C.muted }}>{r.sources.map((s, k) => <li key={k}>{s}</li>)}</ul></Section>}
      </div>
    </div>
  );
}

// 심화앱 통합 시: export 또는 window 등록
// export default RecipePage;
