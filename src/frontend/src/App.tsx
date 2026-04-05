import { Toaster } from "@/components/ui/sonner";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// Types
interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  shape: "square" | "circle" | "triangle";
}

interface FloatingEmoji {
  id: number;
  emoji: string;
  left: number;
  bottom: number;
  delay: number;
  duration: number;
  size: string;
}

interface Firework {
  id: number;
  x: number;
  y: number;
}

// Confetti colors
const CONFETTI_COLORS = [
  "#ff2bbf",
  "#ffe600",
  "#19d6ff",
  "#55ff6a",
  "#ff8a00",
  "#6a32ff",
  "#ff4444",
  "#ffffff",
];

function generateConfetti(count: number): ConfettiPiece[] {
  const shapes: Array<"square" | "circle" | "triangle"> = [
    "square",
    "circle",
    "triangle",
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 4,
    size: 8 + Math.random() * 12,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
  }));
}

function generateFloatingEmojis(): FloatingEmoji[] {
  const emojis = ["🎈", "🎉", "🎊", "💜", "🔥", "⭐", "✨"];
  return Array.from({ length: 12 }, (_, i) => ({
    id: i,
    emoji: emojis[i % emojis.length],
    left: 5 + Math.random() * 90,
    bottom: 5 + Math.random() * 30,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 4,
    size: `${1.2 + Math.random() * 1.5}rem`,
  }));
}

// Roast items
const roastItems = [
  {
    id: "ringtone",
    emoji: "📱",
    text: "Still uses default iPhone ringtone 😂",
  },
  {
    id: "wifi",
    emoji: "📶",
    text: "Bro's personality = WiFi signal (weak but trying)",
  },
  { id: "reply", emoji: "💀", text: "Takes 3 hours to reply, online 24/7 💀" },
  {
    id: "5min",
    emoji: "⏰",
    text: "Says 'just 5 minutes' for everything since 2009",
  },
  { id: "notes", emoji: "🍕", text: "His notes app is 90% food orders" },
  {
    id: "food",
    emoji: "🤦",
    text: "Can't decide what to eat for 45 minutes straight",
  },
];

const achievements = [
  {
    id: "cringe",
    icon: "🏅",
    text: "Survived 1000+ cringe moments (still counting)",
  },
  {
    id: "procrastinator",
    icon: "🎖️",
    text: "Professional Procrastinator since birth",
  },
  { id: "excuses", icon: "🥇", text: "World's Fastest Excuse Generator" },
  { id: "sleep", icon: "🎗️", text: "5-Star Sleep Schedule Destroyer" },
  {
    id: "overthink",
    icon: "🏆",
    text: "Undefeated Overthinking Champion 2024",
  },
  { id: "maggi", icon: "💎", text: "Certified 3AM Maggi Chef Extraordinaire" },
];

const legendReasons = [
  {
    id: "maggi3am",
    icon: "🍜",
    text: "Can eat Maggi at 3AM like a 5-star chef",
  },
  { id: "meme", icon: "🧠", text: "Certified meme expert (self-proclaimed)" },
  {
    id: "alarms",
    icon: "😴",
    text: "Sleeps through 10 alarms but somehow always shows up",
  },
  {
    id: "reply",
    icon: "💬",
    text: "Has a reply for every situation (usually wrong)",
  },
  { id: "sing", icon: "🎤", text: "Thinks he can sing (he cannot)" },
  {
    id: "fire",
    icon: "❤️",
    text: "Genuinely one of the most fire people you'll meet",
  },
];

// Chaos floating stickers positioned around sections
const chaosEmojis = [
  {
    emoji: "🎉",
    className: "animate-spin-custom",
    style: { top: "15%", left: "3%" },
  },
  {
    emoji: "💀",
    className: "animate-bounce-custom",
    style: { top: "20%", right: "4%" },
  },
  {
    emoji: "🔥",
    className: "animate-wiggle",
    style: { top: "40%", left: "1%" },
  },
  {
    emoji: "🎊",
    className: "animate-spin-custom",
    style: { top: "35%", right: "2%" },
  },
  {
    emoji: "⭐",
    className: "animate-bounce-custom",
    style: { top: "55%", left: "2%" },
  },
  {
    emoji: "🎈",
    className: "animate-wiggle",
    style: { top: "60%", right: "3%" },
  },
  {
    emoji: "💜",
    className: "animate-spin-custom",
    style: { top: "75%", left: "1%" },
  },
  {
    emoji: "🍌",
    className: "animate-bounce-custom",
    style: { top: "80%", right: "2%" },
  },
];

// Card rotations for roast
const cardRotations = ["-2deg", "2deg", "-3deg", "1.5deg", "-1deg", "3deg"];

function ConfettiRain({ active }: { active: boolean }) {
  const pieces = active ? generateConfetti(80) : [];
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            top: "-20px",
            backgroundColor: p.shape !== "triangle" ? p.color : "transparent",
            width: p.shape === "circle" ? `${p.size}px` : `${p.size}px`,
            height: p.shape === "circle" ? `${p.size}px` : `${p.size}px`,
            borderRadius:
              p.shape === "circle" ? "50%" : p.shape === "square" ? "2px" : "0",
            borderLeft:
              p.shape === "triangle"
                ? `${p.size / 2}px solid transparent`
                : undefined,
            borderRight:
              p.shape === "triangle"
                ? `${p.size / 2}px solid transparent`
                : undefined,
            borderBottom:
              p.shape === "triangle"
                ? `${p.size}px solid ${p.color}`
                : undefined,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function AnnouncementStrip() {
  return (
    <div
      className="w-full overflow-hidden py-3 relative"
      style={{ background: "#ff2bbf", borderBottom: "4px solid #0a0a0a" }}
      data-ocid="announcement.strip"
    >
      <div className="animate-marquee whitespace-nowrap inline-block">
        <span
          className="font-bangers text-xl tracking-widest text-white animate-blink"
          style={{ textShadow: "2px 2px 0 #0a0a0a" }}
        >
          🎉 SAMIR IS OFFICIALLY ANCIENT 🎉 &nbsp;&nbsp;|&nbsp;&nbsp; HAPPY
          BIRTHDAY LEGEND 🔥 &nbsp;&nbsp;|&nbsp;&nbsp; 🎂 ANOTHER YEAR OF CHAOS
          BEGINS 🎂 &nbsp;&nbsp;|&nbsp;&nbsp; 🎊 PARTY TIME FOREVER 🎊
          &nbsp;&nbsp;|&nbsp;&nbsp; 🎉 SAMIR IS OFFICIALLY ANCIENT 🎉
          &nbsp;&nbsp;|&nbsp;&nbsp; HAPPY BIRTHDAY LEGEND 🔥
          &nbsp;&nbsp;|&nbsp;&nbsp; 🎂 THE LEGEND LIVES ON 🎂 &nbsp;&nbsp;|
        </span>
      </div>
    </div>
  );
}

// Samir's photo hero section with all effects
function SamirHeroSection() {
  const [confettiActive, setConfettiActive] = useState(true);
  const [showPranked, setShowPranked] = useState(false);
  const [localConfetti, setLocalConfetti] = useState<ConfettiPiece[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [musicStarted, setMusicStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setConfettiActive(false), 9000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-start music on first user interaction
  useEffect(() => {
    const startMusic = () => {
      if (!musicStarted) {
        setMusicStarted(true);
        playBackgroundMusic();
      }
    };
    document.addEventListener("click", startMusic, { once: true });
    document.addEventListener("touchstart", startMusic, { once: true });
    return () => {
      document.removeEventListener("click", startMusic);
      document.removeEventListener("touchstart", startMusic);
    };
  }, [musicStarted]);

  function playBackgroundMusic() {
    try {
      // Use Web Audio API to generate a simple party beat loop
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      function playNote(
        freq: number,
        startTime: number,
        duration: number,
        vol = 0.08,
      ) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = "square";
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(vol, startTime + 0.01);
        gain.gain.linearRampToValueAtTime(0, startTime + duration - 0.01);
        osc.start(startTime);
        osc.stop(startTime + duration);
      }

      // Simple happy birthday melody loop at low volume
      const melody = [
        [523, 0.3],
        [523, 0.6],
        [587, 0.9],
        [523, 1.2],
        [698, 1.5],
        [659, 1.9],
        [523, 2.5],
        [523, 2.8],
        [587, 3.1],
        [523, 3.4],
        [784, 3.7],
        [698, 4.1],
      ];
      const now = ctx.currentTime;
      for (const [freq, t] of melody) {
        playNote(freq, now + t, 0.25);
      }

      // Loop every 5 seconds
      const intervalId = setInterval(() => {
        const t = ctx.currentTime;
        for (const [freq, offset] of melody) {
          playNote(freq, t + offset, 0.25);
        }
      }, 5000);

      // Store cleanup
      (
        ctx as unknown as { _intervalId: ReturnType<typeof setInterval> }
      )._intervalId = intervalId;
    } catch {
      // Audio not supported, silent fallback
    }
  }

  function playPartyHorn() {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Party horn: ascending chirp
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);

      // Second toot
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(600, now + 0.45);
      osc2.frequency.exponentialRampToValueAtTime(1500, now + 0.75);
      gain2.gain.setValueAtTime(0.12, now + 0.45);
      gain2.gain.linearRampToValueAtTime(0, now + 0.8);
      osc2.start(now + 0.45);
      osc2.stop(now + 0.8);
    } catch {
      // Audio not supported
    }
  }

  function handleSurpriseClick() {
    setShowPranked(true);
    setLocalConfetti(generateConfetti(100));
    toast("😂 YOU JUST GOT PRANKED!! 😂", {
      description: "Classic Samir move -- can't resist a button 💀",
      duration: 5000,
    });
    setTimeout(() => setLocalConfetti([]), 7000);
  }

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-16"
      style={{
        background:
          "radial-gradient(ellipse at center, #1a0040 0%, #0d0d2b 50%, #0a0a1a 100%)",
      }}
      data-ocid="hero.section"
    >
      {/* Neon blobs background */}
      <div
        className="absolute w-80 h-80 rounded-full opacity-25 pointer-events-none"
        style={{
          background: "#ff2bbf",
          filter: "blur(90px)",
          top: "5%",
          left: "5%",
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "#19d6ff",
          filter: "blur(70px)",
          top: "15%",
          right: "8%",
        }}
      />
      <div
        className="absolute w-72 h-72 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "#6a32ff",
          filter: "blur(80px)",
          bottom: "10%",
          left: "30%",
        }}
      />
      <div
        className="absolute w-56 h-56 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "#ffe600",
          filter: "blur(70px)",
          bottom: "20%",
          right: "15%",
        }}
      />

      {/* MAIN TITLE - tilted + animated */}
      <h1
        className="font-bangers text-center relative z-10 animate-hero-title-tilt"
        style={{
          fontSize: "clamp(2.2rem, 7vw, 6.5rem)",
          color: "#ffe600",
          WebkitTextStroke: "3px #0a0a0a",
          textShadow: "0 0 30px #ffe600, 0 0 60px #ff8a00, 5px 5px 0 #0a0a0a",
          lineHeight: 1.1,
          letterSpacing: "0.03em",
          transform: "rotate(-3deg)",
          marginBottom: "0.3rem",
        }}
      >
        HAPPY BIRTHDAY SAMIR 🎉🔥
      </h1>

      {/* SUBTITLE - tilted + animated */}
      <p
        className="font-bangers text-center relative z-10 animate-subtitle-bounce"
        style={{
          fontSize: "clamp(1rem, 3.5vw, 2.2rem)",
          color: "#ff2bbf",
          WebkitTextStroke: "2px #0a0a0a",
          textShadow: "0 0 20px #ff2bbf, 3px 3px 0 #0a0a0a",
          transform: "rotate(2deg)",
          marginBottom: "2rem",
          letterSpacing: "0.04em",
        }}
      >
        Certified Party Legend Since Birth 💀
      </p>

      {/* SAMIR IMAGE with glow + floating emojis + meme stickers */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Floating emojis around the image */}
        {[
          { id: "e0", emoji: "😂", angle: 0 },
          { id: "e1", emoji: "🔥", angle: 45 },
          { id: "e2", emoji: "🎂", angle: 90 },
          { id: "e3", emoji: "🥳", angle: 135 },
          { id: "e4", emoji: "😂", angle: 180 },
          { id: "e5", emoji: "🔥", angle: 225 },
          { id: "e6", emoji: "🎂", angle: 270 },
          { id: "e7", emoji: "🥳", angle: 315 },
        ].map(({ id, emoji, angle }, i) => {
          const radius = 52;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          return (
            <span
              key={id}
              className="absolute text-3xl md:text-4xl animate-orbit-emoji select-none pointer-events-none"
              style={{
                left: `calc(50% + ${x}%)`,
                top: `calc(50% + ${y}%)`,
                transform: "translate(-50%, -50%)",
                animationDelay: `${i * 0.4}s`,
                zIndex: 20,
              }}
            >
              {emoji}
            </span>
          );
        })}

        {/* Meme stickers */}
        <div
          className="absolute top-0 right-0 font-bangers text-sm md:text-base z-30 animate-sticker-pop"
          style={{
            background: "#ffe600",
            color: "#0a0a0a",
            border: "3px solid #0a0a0a",
            boxShadow: "3px 3px 0 #0a0a0a",
            borderRadius: "8px",
            padding: "4px 10px",
            transform: "rotate(12deg) translate(20%, -30%)",
            whiteSpace: "nowrap",
          }}
        >
          YOLO 🤙
        </div>

        <div
          className="absolute top-1/3 left-0 font-bangers text-xs md:text-sm z-30 animate-sticker-pop2"
          style={{
            background: "#ff2bbf",
            color: "white",
            border: "3px solid #0a0a0a",
            boxShadow: "3px 3px 0 #0a0a0a",
            borderRadius: "8px",
            padding: "4px 10px",
            transform: "rotate(-15deg) translate(-20%, 0)",
            whiteSpace: "nowrap",
          }}
        >
          It&apos;s Party Time! 🎉
        </div>

        <div
          className="absolute bottom-0 left-1/4 font-bangers text-xs md:text-sm z-30 animate-sticker-pop"
          style={{
            background: "#19d6ff",
            color: "#0a0a0a",
            border: "3px solid #0a0a0a",
            boxShadow: "3px 3px 0 #0a0a0a",
            borderRadius: "8px",
            padding: "4px 10px",
            transform: "rotate(-8deg) translate(0, 40%)",
            whiteSpace: "nowrap",
          }}
        >
          Legend Alert 🚨
        </div>

        {/* Samir's photo with glow */}
        <div
          className="relative animate-hero-img-pulse"
          style={{
            borderRadius: "20px",
            border: "5px solid #ffe600",
            boxShadow:
              "0 0 40px #ff2bbf, 0 0 80px #ff2bbf, 0 0 120px #6a32ff, 8px 8px 0 #0a0a0a",
            overflow: "hidden",
            maxWidth: "340px",
            width: "80vw",
          }}
          onMouseEnter={playPartyHorn}
        >
          <img
            src="/assets/file_00000000504471fa9b0afb17e141eb1e-019d5b1c-9b55-720d-b73f-4c92db9fddc6.png"
            alt="Samir the Birthday Legend"
            style={{
              width: "100%",
              display: "block",
              filter:
                "drop-shadow(0 0 15px #ff2bbf) brightness(1.05) contrast(1.05)",
            }}
          />

          {/* Surprise button overlay on image */}
          <button
            type="button"
            onClick={handleSurpriseClick}
            data-ocid="hero.surprise_button"
            className="font-bangers w-full py-3 animate-pulse-glow"
            style={{
              background: "linear-gradient(135deg, #ff2bbf, #6a32ff)",
              color: "white",
              fontSize: "clamp(0.9rem, 3vw, 1.3rem)",
              border: "none",
              letterSpacing: "0.04em",
              cursor:
                "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><text y='28' font-size='28'>🍌</text></svg>\") 16 16, pointer",
            }}
          >
            CLICK FOR SURPRISE 😈
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="mt-10 animate-bounce-custom relative z-10"
        style={{ color: "#ffe600", fontSize: "2rem" }}
      >
        👇 SCROLL FOR CHAOS 👇
      </div>

      {/* Confetti */}
      <ConfettiRain active={confettiActive} />

      {/* Surprise confetti burst */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {localConfetti.map((p) => (
          <div
            key={`hero-surprise-${p.id}`}
            className="confetti-piece"
            style={{
              left: `${p.left}%`,
              top: "-20px",
              backgroundColor: p.shape !== "triangle" ? p.color : "transparent",
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: p.shape === "circle" ? "50%" : "2px",
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* PRANKED Modal */}
      {showPranked && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[100]"
          style={{ background: "rgba(0,0,0,0.8)" }}
          data-ocid="hero.prank_modal"
        >
          <div
            className="comic-card animate-pop-in max-w-md w-full mx-4 p-8 text-center"
            style={{ background: "#ffe600" }}
          >
            <div className="text-6xl mb-4">😂</div>
            <h3
              className="font-bangers mb-3"
              style={{
                fontSize: "2.2rem",
                color: "#0a0a0a",
                WebkitTextStroke: "1px #0a0a0a",
              }}
            >
              YOU JUST GOT PRANKED 😂
            </h3>
            <p
              className="font-nunito font-black text-lg mb-6"
              style={{ color: "#1a165a" }}
            >
              Happy Birthday Samir!! 🎉🎉🎉
              <br />
              <span className="text-sm opacity-70">
                You literally cannot follow basic instructions 💀
              </span>
            </p>
            <button
              type="button"
              onClick={() => setShowPranked(false)}
              data-ocid="hero.prank_close"
              className="font-bangers px-8 py-3 rounded-xl text-white"
              style={{
                fontSize: "1.3rem",
                background: "#ff2bbf",
                border: "3px solid #0a0a0a",
                boxShadow: "3px 3px 0 #0a0a0a",
              }}
            >
              ok fine 😭
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function RoastSection() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShaking(true);
          setTimeout(() => setShaking(false), 600);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-16 px-4 relative"
      style={{
        background: "linear-gradient(180deg, #0d0d2b 0%, #1a0a10 100%)",
      }}
      data-ocid="roast.section"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          ref={ref}
          className={`font-bangers text-center mb-12 ${shaking ? "animate-shake" : ""}`}
          style={{
            fontSize: "clamp(2rem, 6vw, 4.5rem)",
            color: "#ff2bbf",
            WebkitTextStroke: "3px #0a0a0a",
            textShadow: "0 0 20px #ff2bbf, 4px 4px 0 #0a0a0a",
          }}
        >
          THINGS ONLY SAMIR DOES 😂🔥
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roastItems.map((item, i) => (
            <div
              key={item.id}
              data-ocid={`roast.item.${i + 1}`}
              className="comic-card p-5 animate-card-float"
              style={
                {
                  "--card-rotate": cardRotations[i],
                  transform: `rotate(${cardRotations[i]})`,
                  background:
                    i % 3 === 0
                      ? "#ffe600"
                      : i % 3 === 1
                        ? "#ff2bbf"
                        : "#19d6ff",
                  animationDelay: `${i * 0.3}s`,
                } as React.CSSProperties
              }
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <p
                className="font-nunito font-black text-sm md:text-base"
                style={{ color: "#0a0a0a", lineHeight: 1.4 }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementsSection() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [shaking, setShaking] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShaking(true);
          setTimeout(() => setShaking(false), 600);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 relative"
      style={{
        background: "linear-gradient(180deg, #1a0a10 0%, #0a1a1a 100%)",
      }}
      data-ocid="achievements.section"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          ref={ref}
          className={`font-bangers text-center mb-4 ${shaking ? "animate-shake" : ""}`}
          style={{
            fontSize: "clamp(1.8rem, 5vw, 4rem)",
            color: "#ffe600",
            WebkitTextStroke: "3px #0a0a0a",
            textShadow: "0 0 20px #ffe600, 4px 4px 0 #0a0a0a",
          }}
        >
          SAMIR&apos;S LEGENDARY ACHIEVEMENTS 🏆
        </h2>

        {/* Legend badge */}
        <div className="flex justify-center mb-8">
          <img
            src="/assets/generated/legend-badge-transparent.dim_300x300.png"
            alt="Legend Badge"
            className="w-32 h-32 animate-legend-spin"
            style={{ filter: "drop-shadow(0 0 15px #ffe600)" }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((item, i) => (
            <div
              key={item.id}
              data-ocid={`achievements.item.${i + 1}`}
              className="comic-card-dark p-4 flex items-center gap-4"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-60px)",
                transition: `all 0.5s ease ${i * 0.12}s`,
              }}
            >
              <span className="text-3xl flex-shrink-0">{item.icon}</span>
              <p
                className="font-nunito font-black text-sm md:text-base"
                style={{ color: "#ffe600" }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LegendSection() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShaking(true);
          setTimeout(() => setShaking(false), 600);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-16 px-4 relative"
      style={{
        background: "linear-gradient(180deg, #0a1a1a 0%, #0f0a2a 100%)",
      }}
      data-ocid="legend.section"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          ref={ref}
          className={`font-bangers text-center mb-12 ${shaking ? "animate-shake" : ""}`}
          style={{
            fontSize: "clamp(1.6rem, 5vw, 3.8rem)",
            color: "#55ff6a",
            WebkitTextStroke: "3px #0a0a0a",
            textShadow: "0 0 20px #55ff6a, 4px 4px 0 #0a0a0a",
          }}
        >
          WHY SAMIR IS A CERTIFIED LEGEND 🐐
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {legendReasons.map((item, i) => (
            <div
              key={item.id}
              data-ocid={`legend.item.${i + 1}`}
              className="rounded-2xl p-5 flex items-center gap-4 animate-card-float"
              style={{
                background:
                  i === legendReasons.length - 1
                    ? "linear-gradient(135deg, #ff2bbf20, #6a32ff20)"
                    : "rgba(26,22,90,0.8)",
                animationDelay: `${i * 0.25}s`,
                border:
                  i === legendReasons.length - 1
                    ? "3px solid #ff2bbf"
                    : "3px solid #19d6ff",
                boxShadow:
                  i === legendReasons.length - 1
                    ? "0 0 20px #ff2bbf, 4px 4px 0 #0a0a0a"
                    : "0 0 15px #19d6ff, 4px 4px 0 #0a0a0a",
              }}
            >
              <span
                className="text-4xl flex-shrink-0 animate-bounce-custom"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {item.icon}
              </span>
              <p
                className="font-nunito font-black text-sm md:text-base"
                style={{
                  color: i === legendReasons.length - 1 ? "#ff2bbf" : "#19d6ff",
                  textShadow:
                    i === legendReasons.length - 1
                      ? "0 0 10px #ff2bbf"
                      : "0 0 8px #19d6ff",
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SurpriseSection() {
  const [pranked, setPranked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [localConfetti, setLocalConfetti] = useState<ConfettiPiece[]>([]);

  const handleSurpriseClick = useCallback(() => {
    setPranked(true);
    setShowModal(true);
    setLocalConfetti(generateConfetti(80));
    toast("🎉 GOTCHA LMAOOOO 🎉", {
      description: "You literally cannot follow instructions 😂",
      duration: 4000,
    });
    setTimeout(() => setLocalConfetti([]), 6000);
  }, []);

  return (
    <section
      className="py-20 px-4 relative"
      style={{
        background: "linear-gradient(180deg, #0f0a2a 0%, #1a0a0a 100%)",
      }}
      data-ocid="surprise.section"
    >
      <div className="max-w-xl mx-auto text-center">
        <h2
          className="font-bangers mb-4"
          style={{
            fontSize: "clamp(1.8rem, 5vw, 4rem)",
            color: "#ffe600",
            WebkitTextStroke: "2px #0a0a0a",
            textShadow: "0 0 20px #ffe600, 4px 4px 0 #0a0a0a",
          }}
        >
          ⚠️ DO NOT TOUCH THIS BUTTON ⚠️
        </h2>
        <p className="font-nunito font-black mb-8" style={{ color: "#ff2bbf" }}>
          I mean it. Seriously. Don&apos;t.
        </p>

        <button
          type="button"
          onClick={handleSurpriseClick}
          data-ocid="surprise.primary_button"
          className="animate-pulse-glow font-bangers px-12 py-6 rounded-2xl text-white relative"
          style={{
            fontSize: "clamp(1.3rem, 4vw, 2.2rem)",
            background: "linear-gradient(135deg, #ff2bbf, #6a32ff)",
            border: "4px solid #ffe600",
            letterSpacing: "0.05em",
            transition: "transform 0.1s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          🎁 DON&apos;T CLICK THIS 😈
        </button>

        {pranked && (
          <p
            className="mt-6 font-bangers animate-color-flash"
            style={{ fontSize: "1.5rem" }}
          >
            TOO LATE 😂😂😂
          </p>
        )}
      </div>

      {/* Confetti burst */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {localConfetti.map((p) => (
          <div
            key={`surprise-${p.id}`}
            className="confetti-piece"
            style={{
              left: `${p.left}%`,
              top: "-20px",
              backgroundColor: p.shape !== "triangle" ? p.color : "transparent",
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: p.shape === "circle" ? "50%" : "2px",
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Prank modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[100]"
          style={{ background: "rgba(0,0,0,0.75)" }}
          data-ocid="surprise.modal"
        >
          <div
            className="comic-card animate-pop-in max-w-md w-full mx-4 p-8 text-center"
            style={{ background: "#ffe600" }}
          >
            <div className="text-6xl mb-4">😂</div>
            <h3
              className="font-bangers mb-3"
              style={{
                fontSize: "2rem",
                color: "#0a0a0a",
                WebkitTextStroke: "1px #0a0a0a",
              }}
            >
              YOU JUST GOT PRANKED
            </h3>
            <p
              className="font-nunito font-black text-lg mb-6"
              style={{ color: "#1a165a" }}
            >
              Happy Birthday tho!! 🎉🎉🎉
              <br />
              <span className="text-sm opacity-70">
                Samir could NEVER resist a forbidden button 💀
              </span>
            </p>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              data-ocid="surprise.close_button"
              className="font-bangers px-8 py-3 rounded-xl text-white"
              style={{
                fontSize: "1.3rem",
                background: "#ff2bbf",
                border: "3px solid #0a0a0a",
                boxShadow: "3px 3px 0 #0a0a0a",
              }}
            >
              ok fine 😭
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Fireworks({ fireworks }: { fireworks: Firework[] }) {
  return (
    <>
      {fireworks.map((fw) => (
        <div
          key={fw.id}
          className="pointer-events-none absolute"
          style={{ left: `${fw.x}%`, top: `${fw.y}%` }}
        >
          <div
            className="absolute w-16 h-16 rounded-full"
            style={{
              border: "3px solid #ffe600",
              transform: "translate(-50%, -50%)",
              animation: "firework-burst 1.2s ease-out forwards",
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, si) => {
            const rad = (angle * Math.PI) / 180;
            const dist = 50 + Math.random() * 30;
            return (
              <div
                key={`spark-${angle}`}
                className="absolute w-2 h-2 rounded-full"
                style={
                  {
                    background: CONFETTI_COLORS[si % CONFETTI_COLORS.length],
                    transform: "translate(-50%, -50%)",
                    "--tx": `${Math.cos(rad) * dist}px`,
                    "--ty": `${Math.sin(rad) * dist}px`,
                    animation: "firework-spark 1s ease-out forwards",
                    animationDelay: `${Math.random() * 0.3}s`,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

function FinalSection() {
  const [balloons] = useState(generateFloatingEmojis);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShaking(true);
          setTimeout(() => setShaking(false), 600);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true);
          const fws = Array.from({ length: 8 }, (_, i) => ({
            id: i,
            x: 10 + Math.random() * 80,
            y: 10 + Math.random() * 60,
          }));
          setFireworks(fws);
          setTimeout(() => setFireworks([]), 3000);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 overflow-hidden min-h-[60vh] flex flex-col items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #1a0a2e 0%, #0a1a2e 40%, #1a165a 100%)",
      }}
      data-ocid="final.section"
    >
      {balloons.map((b) => (
        <div
          key={b.id}
          className="float-emoji"
          style={{
            left: `${b.left}%`,
            bottom: `${b.bottom}%`,
            fontSize: b.size,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
            animationIterationCount: "infinite",
          }}
        >
          {b.emoji}
        </div>
      ))}

      <Fireworks fireworks={fireworks} />

      <div className="relative z-10 text-center max-w-3xl">
        <h2
          ref={ref}
          className={`font-bangers mb-6 ${shaking ? "animate-shake" : ""}`}
          style={{
            fontSize: "clamp(2rem, 7vw, 5.5rem)",
            color: "#ffe600",
            WebkitTextStroke: "3px #0a0a0a",
            textShadow: "0 0 30px #ffe600, 0 0 60px #ffe600, 5px 5px 0 #0a0a0a",
            lineHeight: 1.2,
          }}
        >
          Happy Birthday bro 🎉
        </h2>

        <p
          className="font-bangers mb-4"
          style={{
            fontSize: "clamp(1.2rem, 4vw, 2.5rem)",
            color: "#19d6ff",
            WebkitTextStroke: "2px #0a0a0a",
            textShadow: "0 0 15px #19d6ff, 3px 3px 0 #0a0a0a",
          }}
        >
          Stay weird, stay awesome 🔥
        </p>

        <p
          className="font-nunito font-black text-lg md:text-xl"
          style={{ color: "#ff2bbf", textShadow: "0 0 10px #ff2bbf" }}
        >
          From everyone who loves your chaotic energy ❤️🔥
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {["🎈", "🎉", "🎊", "🥳", "🎂", "🔥", "💜", "🐐"].map((e, i) => (
            <span
              key={e}
              className="text-4xl animate-bounce-custom"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {e}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  return (
    <footer
      className="py-6 text-center"
      style={{ background: "#0a0a0a", borderTop: "3px solid #ff2bbf" }}
    >
      <p className="font-nunito font-bold text-sm" style={{ color: "#ff2bbf" }}>
        © {year}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#19d6ff", textDecoration: "underline" }}
        >
          caffeine.ai
        </a>{" "}
        🎂
      </p>
    </footer>
  );
}

function BirthdayPopups() {
  const [popup, setPopup] = useState<1 | 2 | null>(null);
  const shownRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const t1 = setTimeout(() => {
      if (!shownRef.current.has(1)) {
        shownRef.current.add(1);
        setPopup(1);
      }
    }, 2000);
    return () => clearTimeout(t1);
  }, []);

  const dismissPopup1 = useCallback(() => {
    setPopup(null);
    setTimeout(() => {
      if (!shownRef.current.has(2)) {
        shownRef.current.add(2);
        setPopup(2);
      }
    }, 10000);
  }, []);

  const dismissPopup2 = useCallback(() => {
    setPopup(null);
  }, []);

  if (!popup) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[200]"
      style={{ background: "rgba(0,0,0,0.7)" }}
    >
      {popup === 1 && (
        <div
          className="comic-card animate-pop-in max-w-sm w-full mx-4 p-8 text-center"
          style={{ background: "#ff2bbf" }}
          data-ocid="popup1.modal"
        >
          <div className="text-5xl mb-3">⚠️</div>
          <h3
            className="font-bangers mb-3"
            style={{
              fontSize: "1.6rem",
              color: "white",
              WebkitTextStroke: "1px #0a0a0a",
            }}
          >
            WARNING: SAMIR IS NOW OLD ⚠️
          </h3>
          <p className="font-nunito font-black mb-5" style={{ color: "white" }}>
            Age detected: **ancient** 🦕
            <br />
            Scientists are baffled by his survival.
          </p>
          <button
            type="button"
            onClick={dismissPopup1}
            data-ocid="popup1.confirm_button"
            className="font-bangers px-6 py-3 rounded-xl"
            style={{
              fontSize: "1.1rem",
              background: "#ffe600",
              border: "3px solid #0a0a0a",
              boxShadow: "3px 3px 0 #0a0a0a",
              color: "#0a0a0a",
            }}
          >
            OK I accept this tragedy
          </button>
        </div>
      )}

      {popup === 2 && (
        <div
          className="comic-card animate-pop-in max-w-sm w-full mx-4 p-8 text-center"
          style={{ background: "#19d6ff" }}
          data-ocid="popup2.modal"
        >
          <div className="text-5xl mb-3">🎂</div>
          <h3
            className="font-bangers mb-3"
            style={{
              fontSize: "1.5rem",
              color: "#0a0a0a",
              WebkitTextStroke: "1px #0a0a0a",
            }}
          >
            REMINDER: SAMIR STILL CAN&apos;T COOK 🎂
          </h3>
          <p
            className="font-nunito font-black mb-5"
            style={{ color: "#1a165a" }}
          >
            Except Maggi at 3AM obviously.
            <br />
            That&apos;s his one skill. 💀
          </p>
          <button
            type="button"
            onClick={dismissPopup2}
            data-ocid="popup2.confirm_button"
            className="font-bangers px-6 py-3 rounded-xl"
            style={{
              fontSize: "1.1rem",
              background: "#ff2bbf",
              border: "3px solid #0a0a0a",
              boxShadow: "3px 3px 0 #0a0a0a",
              color: "white",
            }}
          >
            lmaooo
          </button>
        </div>
      )}
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background:
          "linear-gradient(270deg, #1a165a, #0d0d2b, #1a0a2e, #0a1a2e)",
        backgroundSize: "400% 400%",
        animation: "gradient-shift 12s ease infinite",
        opacity: 0.4,
      }}
    />
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen" style={{ background: "#0d0d2b" }}>
      <AnimatedBackground />

      {/* Chaos floating stickers */}
      <div className="fixed pointer-events-none z-40">
        {chaosEmojis.map((item) => (
          <span
            key={item.emoji}
            className={`fixed text-3xl select-none ${item.className}`}
            style={item.style}
          >
            {item.emoji}
          </span>
        ))}
      </div>

      <div className="relative z-10">
        <AnnouncementStrip />
        <SamirHeroSection />
        <RoastSection />
        <AchievementsSection />
        <LegendSection />
        <SurpriseSection />
        <FinalSection />
        <Footer />
      </div>

      <BirthdayPopups />
      <Toaster richColors />
    </div>
  );
}
