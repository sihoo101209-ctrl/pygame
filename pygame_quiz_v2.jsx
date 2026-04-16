import { useState } from "react";

const lessons = [
  {
    category: "Python 기초",
    title: "import 와 라이브러리",
    explain: `Python에서 외부 기능을 쓰려면 import로 불러와야 해.

import pygame      ← pygame 라이브러리 전체를 불러옴
import random      ← random 모듈을 불러옴

pygame.init()처럼 점(.)으로 기능에 접근해.
불러오지 않으면 "NameError: name 'pygame' is not defined" 오류가 나.`,
    q: "다음 중 pygame을 올바르게 불러오는 코드는?",
    options: ["pygame.load()", "import pygame", "include pygame", "from game import pygame"],
    answer: 1,
    wrongReasons: [
      "pygame.load()는 존재하지 않는 함수야. 불러오기 전에 pygame을 쓸 수 없어.",
      null,
      "include는 C/C++ 문법이야. Python에선 import를 써야 해.",
      "pygame이라는 하위 모듈이 없기 때문에 이렇게 쓰면 오류가 나."
    ]
  },
  {
    category: "Python 기초",
    title: "// 정수 나눗셈",
    explain: `Python의 나눗셈 연산자는 두 가지야:

/  → 소수점 포함 나눗셈   예) 600 / 2  = 300.0
// → 정수 나눗셈 (버림)   예) 600 // 2 = 300

게임에서 좌표는 정수여야 해. 소수점 좌표를 넘기면 오류가 나거나 이상하게 렌더링돼.
그래서 HEIGHT // 2 처럼 // 를 써서 정수로 만들어.`,
    q: "HEIGHT = 600 일 때, HEIGHT // 2 의 결과는?",
    options: ["300.0", "300", "301", "0"],
    answer: 1,
    wrongReasons: [
      "300.0은 / 연산자의 결과야. //는 소수점을 버리고 정수만 반환해.",
      null,
      "// 는 나머지를 버리고 내림이야. 600을 2로 나누면 정확히 300이야.",
      "나눗셈을 나머지로 헷갈린 것 같아. 나머지는 % 연산자로 구해. 600 % 2 = 0."
    ]
  },
  {
    category: "Python 기초",
    title: "random.choice()",
    explain: `random.choice(리스트)는 리스트에서 무작위로 하나를 뽑아.

ball_dx = random.choice([-5, 5])

→ -5 또는 5 중 하나가 랜덤하게 선택돼.
→ -5면 공이 왼쪽으로, 5면 오른쪽으로 출발해.

이렇게 하면 게임을 시작할 때마다 공 방향이 달라져서 재미있어!`,
    q: "random.choice([-5, 5]) 의 결과로 가능한 값은?",
    options: ["-5만 나옴", "5만 나옴", "-5 또는 5 둘 중 하나", "-5에서 5 사이의 정수"],
    answer: 2,
    wrongReasons: [
      "choice()는 리스트의 요소 중 무작위로 하나를 골라. -5만 나오진 않아.",
      "choice()는 리스트의 요소 중 무작위로 하나를 골라. 5만 나오진 않아.",
      null,
      "범위에서 랜덤 정수를 뽑으려면 random.randint(-5, 5)를 써야 해. choice()는 리스트 안에서만 골라."
    ]
  },
  {
    category: "pygame 기초",
    title: "pygame.init() 과 게임 창 생성",
    explain: `pygame을 사용하기 전에 반드시 초기화가 필요해:

pygame.init()   ← 모든 pygame 모듈을 켜는 시작 버튼

그 다음 창을 만들어:

screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("핑퐁")

set_mode()는 창을 만들고 Surface 객체를 돌려줘.
이 screen에 모든 걸 그려.`,
    q: "pygame.init() 을 하지 않고 게임을 실행하면?",
    options: ["정상 동작함", "일부 기능이 오류 날 수 있음", "창이 작게 열림", "FPS가 낮아짐"],
    answer: 1,
    wrongReasons: [
      "init() 없이도 우연히 동작하는 경우도 있지만, 공식적으로 init() 없이 pygame 기능을 쓰는 건 보장되지 않아.",
      null,
      "창 크기는 set_mode()의 인자로 결정해. init()과는 무관해.",
      "FPS는 clock.tick()이 조절해. init()과는 무관해."
    ]
  },
  {
    category: "pygame 기초",
    title: "게임 루프와 clock.tick()",
    explain: `게임 루프는 게임이 실행되는 동안 계속 반복되는 while 루프야.

clock = pygame.time.Clock()

while running:
    clock.tick(60)   ← 초당 최대 60번만 실행

clock.tick(60)이 없으면, 컴퓨터 성능에 따라 루프가 초당 수천 번 돌 수도 있어.
그러면 공이 엄청 빠르게 날아가서 게임이 불가능해져.`,
    q: "clock.tick(60) 의 역할은?",
    options: ["60초 동안 게임을 멈춤", "초당 최대 60프레임으로 속도 제한", "60번 반복 후 종료", "FPS를 60으로 고정 보장"],
    answer: 1,
    wrongReasons: [
      "tick()은 게임을 멈추는 게 아니야. 루프 속도를 조절해서 일정 FPS를 유지시켜.",
      null,
      "tick()은 반복 횟수를 세지 않아. 매 프레임마다 호출해서 속도를 조절하는 거야.",
      "'최대' 60FPS야. 컴퓨터가 느리면 그보다 낮을 수 있어. 정확히 60을 보장하진 않아."
    ]
  },
  {
    category: "pygame 기초",
    title: "이벤트 처리",
    explain: `pygame은 키 입력, 마우스 클릭, 창 닫기 같은 이벤트를 큐에 쌓아둬.
event.get()으로 그 이벤트들을 꺼내서 처리해.

for event in pygame.event.get():
    if event.type == pygame.QUIT:
        running = False

pygame.QUIT는 창의 X 버튼을 눌렀을 때 발생해.
이게 없으면 X 버튼을 눌러도 게임이 안 꺼져!`,
    q: "pygame.QUIT 이벤트가 발생하는 시점은?",
    options: ["ESC 키를 눌렀을 때", "창의 X 버튼을 눌렀을 때", "게임이 패배했을 때", "마우스 우클릭 시"],
    answer: 1,
    wrongReasons: [
      "ESC 키는 pygame.K_ESCAPE 로 감지해야 해. QUIT 이벤트와는 달라.",
      null,
      "게임 패배는 pygame이 자동으로 감지하지 않아. 네가 직접 점수나 조건을 확인해야 해.",
      "마우스 우클릭은 pygame.MOUSEBUTTONDOWN 이벤트야."
    ]
  },
  {
    category: "pygame.Rect",
    title: "pygame.Rect — 사각형 객체",
    explain: `Rect는 위치와 크기를 가진 사각형 객체야.

pygame.Rect(x, y, width, height)

player = pygame.Rect(30, 300, 12, 90)
         →  x=30, y=300, 너비=12, 높이=90

그리고 유용한 속성들이 있어:
  .top      윗쪽 y 좌표
  .bottom   아랫쪽 y 좌표
  .centery  세로 중앙 y 좌표
  .left / .right  좌우 x 좌표`,
    q: "pygame.Rect(30, 300, 12, 90) 에서 인자 순서는?",
    options: ["너비, 높이, x, y", "x, y, 너비, 높이", "y, x, 높이, 너비", "x, 너비, y, 높이"],
    answer: 1,
    wrongReasons: [
      "Rect는 위치(x, y)를 먼저 받고, 그 다음 크기(width, height)를 받아.",
      null,
      "y를 먼저 쓰면 가로/세로가 뒤바뀌어. 항상 x, y 순서야.",
      "x와 y는 항상 붙어 있어야 해. x, y, width, height 순서로 기억해."
    ]
  },
  {
    category: "pygame.Rect",
    title: "colliderect() — 충돌 감지",
    explain: `두 Rect가 겹치는지 확인하는 함수야.

if ball.colliderect(player):
    # 공이 패들에 닿았다!

겹치면 True, 안 겹치면 False를 반환해.

근데 여기서 주의! 방향 조건도 필요해:
if ball.colliderect(player) and ball_dx < 0:
    ball_dx *= -1

ball_dx < 0 조건이 없으면, 공이 패들 안에 있는 동안
계속 방향이 바뀌어서 패들을 뚫고 나가버려.`,
    q: "ball.colliderect(player) 의 반환값은?",
    options: ["겹친 면적 (숫자)", "True 또는 False", "겹친 좌표 (x, y)", "항상 None"],
    answer: 1,
    wrongReasons: [
      "면적을 계산하려면 직접 계산해야 해. colliderect()는 겹치는지 여부만 알려줘.",
      null,
      "좌표는 반환하지 않아. 겹쳤는지 여부(참/거짓)만 반환해.",
      "None은 반환하지 않아. 항상 True나 False를 반환해."
    ]
  },
  {
    category: "게임 루프",
    title: "게임 루프 구조: 입력 → 업데이트 → 렌더링",
    explain: `모든 게임의 기본 구조야:

while running:
    # 1. 입력
    for event in pygame.event.get(): ...
    keys = pygame.key.get_pressed()

    # 2. 업데이트 (게임 상태 변경)
    ball.x += ball_dx
    ball.y += ball_dy

    # 3. 렌더링 (화면 그리기)
    screen.fill(BLACK)
    pygame.draw.rect(screen, WHITE, player)
    pygame.display.flip()

이 순서가 뒤바뀌면 입력이 한 프레임 늦게 반영되거나,
이전 프레임 잔상이 남는 문제가 생겨.`,
    q: "게임 루프의 올바른 순서는?",
    options: ["렌더링 → 입력 → 업데이트", "업데이트 → 입력 → 렌더링", "입력 → 업데이트 → 렌더링", "입력 → 렌더링 → 업데이트"],
    answer: 2,
    wrongReasons: [
      "렌더링을 먼저 하면 이전 상태를 그린 뒤 입력을 받게 돼. 반응이 한 프레임 느려져.",
      "업데이트를 먼저 하면 이전 프레임의 입력으로 상태를 바꾸게 돼. 입력이 한 박자 늦어.",
      null,
      "업데이트 전에 렌더링하면 변경된 상태가 다음 프레임에야 보여. 보이는 것과 실제 상태가 어긋나."
    ]
  },
  {
    category: "게임 루프",
    title: "screen.fill() 과 display.flip()",
    explain: `렌더링 단계의 두 핵심 함수야:

screen.fill(BLACK)
→ 전체 화면을 검은색으로 덮어. 이전 프레임 그림을 지우는 거야.
→ 이게 없으면 공이 움직인 자리가 다 남아서 화면이 엉망이 돼.

pygame.display.flip()
→ 버퍼에 그린 내용을 실제 화면에 표시해.
→ pygame은 더블 버퍼링을 써. 보이지 않는 곳에 다 그린 뒤 한 번에 보여줘서 깜빡임을 방지해.`,
    q: "screen.fill(BLACK) 을 매 프레임마다 호출하는 이유는?",
    options: ["배경 색상을 바꾸기 위해", "이전 프레임의 그림을 지우기 위해", "FPS를 높이기 위해", "메모리를 절약하기 위해"],
    answer: 1,
    wrongReasons: [
      "배경색을 바꾸려면 다른 색을 넘기면 돼. 하지만 이 코드에서 fill의 주 목적은 이전 그림을 지우는 거야.",
      null,
      "fill()은 FPS와 관련 없어. FPS 조절은 clock.tick()이 담당해.",
      "fill()은 메모리와 무관해. 화면 픽셀을 색으로 덮어씌울 뿐이야."
    ]
  },
  {
    category: "충돌 & 물리",
    title: "공 반사 원리",
    explain: `공의 속도는 dx(수평)와 dy(수직)로 표현돼.

ball.x += ball_dx   ← 매 프레임마다 이동
ball.y += ball_dy

벽에 닿으면 방향을 반전:
if ball.top <= 0 or ball.bottom >= HEIGHT:
    ball_dy *= -1   ← -1을 곱해서 부호를 바꿔

4 → -4 (아래에서 위로)
-4 → 4 (위에서 아래로)

이게 튕기는 효과의 전부야!`,
    q: "ball_dy = 5 일 때, ball_dy *= -1 을 하면?",
    options: ["ball_dy = 5 (변화 없음)", "ball_dy = -5", "ball_dy = 0", "ball_dy = 10"],
    answer: 1,
    wrongReasons: [
      "*= -1 은 -1을 곱하라는 거야. 5 × -1 = -5로 바뀌어.",
      null,
      "-1을 곱하면 0이 되는 게 아니야. 부호(방향)만 바뀌고 크기는 유지돼.",
      "*= 2가 아니라 *= -1이야. 크기는 그대로이고 방향만 반전돼."
    ]
  },
  {
    category: "충돌 & 물리",
    title: "CPU AI 원리",
    explain: `CPU 패들의 AI는 굉장히 단순해:

if cpu.centery < ball.centery:
    cpu.y += 4   ← 아래로 이동
if cpu.centery > ball.centery:
    cpu.y -= 4   ← 위로 이동

y 좌표는 아래로 갈수록 커져!
(0,0)이 왼쪽 위, (800,600)이 오른쪽 아래야.

그래서 cpu.centery < ball.centery는
"CPU가 공보다 위에 있다" → 아래로 이동해서 따라가야 해.`,
    q: "화면의 y좌표 방향은?",
    options: ["위로 갈수록 증가", "아래로 갈수록 증가", "항상 0", "중앙이 0"],
    answer: 1,
    wrongReasons: [
      "수학 좌표계와 반대야. 화면 좌표는 왼쪽 위가 (0,0)이고 아래로 갈수록 y가 커져.",
      null,
      "y좌표는 위치에 따라 달라. 화면 높이(600)까지 변해.",
      "중앙이 0인 건 수학 좌표계야. pygame 화면은 왼쪽 위가 (0,0)이야."
    ]
  },
];

const CAT_COLOR = {
  "Python 기초":    "#4f8ef7",
  "pygame 기초":    "#a259f7",
  "pygame.Rect":    "#f7a825",
  "게임 루프":      "#25c9a1",
  "충돌 & 물리":    "#f75959",
};

export default function App() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("learn"); // learn | quiz
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [wrongs, setWrongs] = useState([]);

  const lesson = lessons[idx];
  const color = CAT_COLOR[lesson?.category] || "#4f8ef7";
  const total = lessons.length;

  function handleSelect(i) {
    if (selected !== null) return;
    setSelected(i);
    if (i === lesson.answer) {
      setScore(s => s + 1);
    } else {
      setWrongs(w => [...w, idx]);
    }
  }

  function handleNext() {
    if (idx + 1 >= total) {
      setDone(true);
    } else {
      setIdx(i => i + 1);
      setPhase("learn");
      setSelected(null);
    }
  }

  function restart() {
    setIdx(0);
    setPhase("learn");
    setSelected(null);
    setScore(0);
    setDone(false);
    setWrongs([]);
  }

  const progressPct = ((idx + (phase === "quiz" ? 0.5 : 0)) / total) * 100;
  const percent = Math.round((score / total) * 100);

  // ── 결과 화면 ──
  if (done) {
    return (
      <div style={S.wrap}>
        <div style={{ ...S.card, textAlign: "center", maxWidth: 520 }}>
          <div style={{ fontSize: 52, marginBottom: 8 }}>
            {percent >= 80 ? "🏆" : percent >= 60 ? "💪" : "📚"}
          </div>
          <div style={S.badge("#6b7280")}>RESULT</div>
          <div style={{ fontSize: 52, fontWeight: "bold", color, margin: "12px 0 4px" }}>
            {score} / {total}
          </div>
          <div style={{ color: "#9ca3af", marginBottom: 20 }}>정답률 {percent}%</div>

          <div style={{ background: "#1e2130", borderRadius: 4, height: 6, marginBottom: 28, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${percent}%`, background: color, borderRadius: 4, transition: "width 1s" }} />
          </div>

          {wrongs.length > 0 && (
            <div style={{ textAlign: "left", marginBottom: 24 }}>
              <div style={{ ...S.label, marginBottom: 12 }}>틀린 문제 다시 보기</div>
              {wrongs.map((wi, i) => {
                const wl = lessons[wi];
                return (
                  <div key={i} style={{ background: "#0d0f14", border: "1px solid #2a2d3a", borderRadius: 8, padding: "14px", marginBottom: 8 }}>
                    <div style={{ color: "#a259f7", fontSize: 11, marginBottom: 4 }}>{wl.category} · {wl.title}</div>
                    <div style={{ color: "#d1d5db", fontSize: 13, marginBottom: 6 }}>{wl.q}</div>
                    <div style={{ color: "#25c9a1", fontSize: 13 }}>✓ 정답: {wl.options[wl.answer]}</div>
                  </div>
                );
              })}
            </div>
          )}

          <button onClick={restart} style={{ ...S.btn(color), width: "100%" }}>
            처음부터 다시
          </button>
        </div>
      </div>
    );
  }

  // ── 학습 화면 ──
  if (phase === "learn") {
    return (
      <div style={S.wrap}>
        <div style={S.card}>
          {/* 진행 */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={S.label}>LESSON {idx + 1} / {total}</div>
            <div style={S.badge(color)}>{lesson.category}</div>
          </div>
          <div style={{ background: "#1e2130", borderRadius: 4, height: 3, marginBottom: 20, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progressPct}%`, background: color, borderRadius: 4, transition: "width 0.4s" }} />
          </div>

          {/* 제목 */}
          <div style={{ fontSize: 18, fontWeight: "bold", color: "#e8e8f0", marginBottom: 16 }}>
            {lesson.title}
          </div>

          {/* 설명 */}
          <div style={{
            background: "#0d0f14",
            border: `1px solid ${color}44`,
            borderRadius: 10,
            padding: "16px 18px",
            fontFamily: "'Courier New', monospace",
            fontSize: 13,
            lineHeight: 1.85,
            color: "#c9d1e0",
            whiteSpace: "pre-wrap",
            marginBottom: 20,
          }}>
            {lesson.explain}
          </div>

          <button onClick={() => setPhase("quiz")} style={{ ...S.btn(color), width: "100%" }}>
            문제 풀기 →
          </button>
        </div>
      </div>
    );
  }

  // ── 퀴즈 화면 ──
  const isCorrect = selected === lesson.answer;
  const wrongReason = selected !== null && !isCorrect ? lesson.wrongReasons[selected] : null;

  return (
    <div style={S.wrap}>
      <div style={S.card}>
        {/* 진행 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={S.label}>QUIZ {idx + 1} / {total}</div>
          <div style={S.badge(color)}>{lesson.category}</div>
        </div>
        <div style={{ background: "#1e2130", borderRadius: 4, height: 3, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progressPct + (1 / total) * 50}%`, background: color, borderRadius: 4, transition: "width 0.4s" }} />
        </div>

        {/* 문제 */}
        <div style={{
          background: "#0d0f14",
          border: "1px solid #2a2d3a",
          borderRadius: 10,
          padding: "16px 18px",
          fontSize: 14,
          color: "#d1d5db",
          lineHeight: 1.7,
          marginBottom: 16,
        }}>
          {lesson.q}
        </div>

        {/* 보기 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
          {lesson.options.map((opt, i) => {
            const isAns = i === lesson.answer;
            const isSel = i === selected;
            let bg = "#16181f", border = "#2a2d3a", textColor = "#9ca3af";
            if (selected !== null) {
              if (isAns) { bg = "#25c9a122"; border = "#25c9a1"; textColor = "#25c9a1"; }
              else if (isSel) { bg = "#f7595922"; border = "#f75959"; textColor = "#f75959"; }
            }
            return (
              <button key={i} onClick={() => handleSelect(i)} style={{
                background: bg, border: `1px solid ${border}`, borderRadius: 8,
                padding: "11px 14px", textAlign: "left",
                cursor: selected !== null ? "default" : "pointer",
                color: textColor, fontFamily: "inherit", fontSize: 13,
                display: "flex", alignItems: "center", gap: 10, transition: "all 0.2s",
              }}>
                <span style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: border + "33", border: `1px solid ${border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, flexShrink: 0, color: textColor,
                }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* 피드백 */}
        {selected !== null && (
          <div style={{
            background: isCorrect ? "#25c9a111" : "#f7595911",
            border: `1px solid ${isCorrect ? "#25c9a144" : "#f7595944"}`,
            borderRadius: 8,
            padding: "13px 15px",
            marginBottom: 14,
            fontSize: 13,
            lineHeight: 1.7,
          }}>
            {isCorrect ? (
              <div style={{ color: "#25c9a1" }}>✓ 정답! 완벽해.</div>
            ) : (
              <>
                <div style={{ color: "#f75959", marginBottom: 6 }}>
                  ✗ 오답 — "{lesson.options[selected]}"을 고른 이유가 있겠지만:
                </div>
                <div style={{ color: "#9ca3af" }}>{wrongReason}</div>
                <div style={{ color: "#25c9a1", marginTop: 8 }}>
                  ✓ 정답: {lesson.options[lesson.answer]}
                </div>
              </>
            )}
          </div>
        )}

        {selected !== null && (
          <button onClick={handleNext} style={{ ...S.btn(color), width: "100%" }}>
            {idx + 1 >= total ? "결과 보기" : "다음 개념 →"}
          </button>
        )}

        {/* 설명 다시 보기 */}
        {selected === null && (
          <button onClick={() => setPhase("learn")} style={{
            width: "100%", background: "transparent", border: "1px solid #2a2d3a",
            borderRadius: 8, padding: "10px", color: "#6b7280",
            fontFamily: "inherit", fontSize: 12, cursor: "pointer",
          }}>
            ← 설명 다시 보기
          </button>
        )}
      </div>
    </div>
  );
}

const S = {
  wrap: {
    minHeight: "100vh",
    background: "#0d0f14",
    color: "#e8e8f0",
    fontFamily: "'Courier New', monospace",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
  },
  card: {
    background: "#16181f",
    border: "1px solid #2a2d3a",
    borderRadius: 16,
    padding: "24px 22px",
    maxWidth: 540,
    width: "100%",
  },
  label: {
    fontSize: 11,
    color: "#4b5563",
    letterSpacing: 2,
  },
  badge: (color) => ({
    display: "inline-block",
    background: color + "22",
    border: `1px solid ${color}55`,
    borderRadius: 6,
    padding: "3px 10px",
    fontSize: 11,
    color: color,
    letterSpacing: 1,
  }),
  btn: (color) => ({
    background: color,
    color: "#000",
    border: "none",
    borderRadius: 8,
    padding: "12px",
    fontSize: 13,
    fontWeight: "bold",
    cursor: "pointer",
    fontFamily: "'Courier New', monospace",
    letterSpacing: 1,
  }),
};
