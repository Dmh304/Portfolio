import { useEffect, useState, useRef } from "react";

// Generate random stars — more stars, brighter
const generateStars = (count) =>
    Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 2,
        brightness: Math.random(),
    }));

// Bright feature stars — the big sparkly ones
const generateBrightStars = (count) =>
    Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 70 + 5,
        left: Math.random() * 100,
        size: Math.random() * 3 + 3,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 3,
    }));

const stars = generateStars(300);
const brightStars = generateBrightStars(15);

// Shooting star config
const shootingStars = [
    { id: 1, delay: 0, duration: 3, top: 12, startLeft: 15, angle: 35, length: 180, thickness: 2 },
    { id: 2, delay: 5, duration: 2.5, top: 30, startLeft: 55, angle: 40, length: 140, thickness: 1.5 },
    { id: 3, delay: 9, duration: 2, top: 8, startLeft: 70, angle: 30, length: 160, thickness: 1.8 },
    { id: 4, delay: 14, duration: 2.8, top: 50, startLeft: 25, angle: 38, length: 120, thickness: 1.4 },
    { id: 5, delay: 18, duration: 2.2, top: 20, startLeft: 80, angle: 32, length: 150, thickness: 1.6 },
];

export default function StarryBackground() {
    const [mousePos, setMousePos] = useState({ x: -999, y: -999 });
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 overflow-hidden pointer-events-none"
            style={{
                background: "linear-gradient(180deg, #040d1a 0%, #081e3c 20%, #0c2d5a 40%, #0a2548 60%, #071a36 80%, #030b18 100%)",
                zIndex: 0,
            }}
        >
            {/* Atmospheric haze at bottom */}
            <div className="absolute" style={{
                bottom: "0", left: "0", right: "0",
                height: "30%",
                background: "linear-gradient(to top, rgba(4, 10, 22, 0.9) 0%, rgba(8, 20, 40, 0.4) 30%, rgba(12, 30, 55, 0.1) 55%, transparent 100%)",
            }} />

            {/* ====== STARS with mouse glow interaction ====== */}
            {stars.map((s) => {
                const dx = mousePos.x - (window.innerWidth * s.left) / 100;
                const dy = mousePos.y - (window.innerHeight * s.top) / 100;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const glowing = dist < 90;

                const colors = ["#d0e8ff", "#b8d4f0", "#e0d8f5", "#f0e8d8", "#ffffff"];
                const baseColor = colors[s.id % colors.length];

                return (
                    <span
                        key={s.id}
                        className="absolute rounded-full"
                        style={{
                            top: `${s.top}%`,
                            left: `${s.left}%`,
                            width: glowing ? `${s.size * 2.5}px` : `${s.size}px`,
                            height: glowing ? `${s.size * 2.5}px` : `${s.size}px`,
                            background: glowing ? "#ffffff" : baseColor,
                            opacity: glowing ? 1 : (s.brightness * 0.6 + 0.3),
                            boxShadow: glowing
                                ? `0 0 ${s.size * 6}px rgba(100, 180, 255, 0.9), 0 0 ${s.size * 14}px rgba(140, 200, 255, 0.5)`
                                : s.size > 1.8
                                    ? `0 0 ${s.size * 2}px rgba(180, 220, 255, 0.4)`
                                    : "none",
                            transition: "all 0.3s ease",
                            animation: `twinkle ${s.duration}s ${s.delay}s infinite alternate ease-in-out`,
                        }}
                    />
                );
            })}

            {/* ====== BRIGHT FEATURE STARS — sparkle cross effect ====== */}
            {brightStars.map((s) => (
                <div
                    key={`bright-${s.id}`}
                    className="absolute"
                    style={{
                        top: `${s.top}%`,
                        left: `${s.left}%`,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        animation: `brightStarPulse ${s.duration}s ${s.delay}s infinite alternate ease-in-out`,
                    }}
                >
                    {/* Core */}
                    <div style={{
                        position: "absolute",
                        top: "50%", left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: `${s.size * 0.4}px`,
                        height: `${s.size * 0.4}px`,
                        borderRadius: "50%",
                        background: "#ffffff",
                        boxShadow: `0 0 ${s.size}px rgba(180, 220, 255, 1), 0 0 ${s.size * 2.5}px rgba(100, 170, 255, 0.7), 0 0 ${s.size * 5}px rgba(60, 140, 255, 0.3)`,
                    }} />
                    {/* Horizontal ray */}
                    <div style={{
                        position: "absolute",
                        top: "50%", left: "0",
                        width: "100%",
                        height: "1px",
                        background: "linear-gradient(90deg, transparent 0%, rgba(180,220,255,0.6) 30%, #ffffff 50%, rgba(180,220,255,0.6) 70%, transparent 100%)",
                        transform: "translateY(-50%)",
                    }} />
                    {/* Vertical ray */}
                    <div style={{
                        position: "absolute",
                        left: "50%", top: "0",
                        height: "100%",
                        width: "1px",
                        background: "linear-gradient(180deg, transparent 0%, rgba(180,220,255,0.6) 30%, #ffffff 50%, rgba(180,220,255,0.6) 70%, transparent 100%)",
                        transform: "translateX(-50%)",
                    }} />
                </div>
            ))}

            {/* ====== SHOOTING STARS — realistic with head glow + fading trail ====== */}
            {shootingStars.map((ss) => (
                <div
                    key={ss.id}
                    className="absolute"
                    style={{
                        top: `${ss.top}%`,
                        left: `${ss.startLeft}%`,
                        width: `${ss.length}px`,
                        height: `${ss.thickness}px`,
                        transform: `rotate(${ss.angle}deg)`,
                        transformOrigin: "100% 50%",
                        animation: `shootingStarFly ${ss.duration}s ${ss.delay}s ease-in infinite`,
                        opacity: 0,
                    }}
                >
                    {/* Trail gradient — bright head fading to nothing */}
                    <div style={{
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 15%, rgba(150,200,255,0.3) 50%, rgba(200,230,255,0.7) 80%, rgba(255,255,255,0.95) 95%, #fff 100%)`,
                        borderRadius: "0 50% 50% 0",
                    }} />
                    {/* Head glow */}
                    <div style={{
                        position: "absolute",
                        right: "-3px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: `${ss.thickness * 5}px`,
                        height: `${ss.thickness * 5}px`,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(150,210,255,0.7) 40%, transparent 70%)",
                        boxShadow: `0 0 ${ss.thickness * 5}px rgba(150,210,255,0.9), 0 0 ${ss.thickness * 12}px rgba(100,170,255,0.5)`,
                    }} />
                </div>
            ))}

            <style>{`
                @keyframes twinkle {
                    0% { opacity: 0.2; transform: scale(0.8); }
                    50% { opacity: 0.7; transform: scale(1.1); }
                    100% { opacity: 1; transform: scale(1.3); }
                }

                @keyframes brightStarPulse {
                    0% { opacity: 0.5; transform: scale(0.7); }
                    50% { opacity: 1; transform: scale(1.1); }
                    100% { opacity: 0.7; transform: scale(0.9); }
                }

                @keyframes shootingStarFly {
                    0% {
                        opacity: 0;
                        transform: rotate(var(--angle, 35deg)) translateX(0);
                    }
                    2% {
                        opacity: 1;
                    }
                    30% {
                        opacity: 0.9;
                        transform: rotate(var(--angle, 35deg)) translateX(500px);
                    }
                    50% {
                        opacity: 0;
                        transform: rotate(var(--angle, 35deg)) translateX(900px);
                    }
                    100% {
                        opacity: 0;
                        transform: rotate(var(--angle, 35deg)) translateX(900px);
                    }
                }
            `}</style>
        </div>
    );
}
