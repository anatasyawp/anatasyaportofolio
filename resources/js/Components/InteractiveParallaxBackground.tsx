import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion } from 'motion/react';

/* ─────────────────────────────────────────────────────────────────────────────
 * 1. HIGH-DPI SOFT AMBIENT DUST MOTES (Clean, Non-Distracting UX)
 * ───────────────────────────────────────────────────────────────────────────── */
interface AmbientMote {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    alpha: number;
    baseAlpha: number;
    alphaSpeed: number;
}

const SoftAmbientDustCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animFrameRef = useRef<number>(0);
    const mousePos = useRef({ x: -9999, y: -9999 });
    const prefersReduced = useReducedMotion();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            if (!canvas) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        // Low particle density for a clean, peaceful, non-distracting visual experience
        const count = Math.min(Math.floor(width / 42), 36);
        const motes: AmbientMote[] = Array.from({ length: count }, () => {
            const baseAlpha = 0.12 + Math.random() * 0.22;
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.18, // Ultra-soft gentle drift
                vy: (Math.random() - 0.5) * 0.18,
                radius: 0.9 + Math.random() * 1.2,
                alpha: baseAlpha,
                baseAlpha,
                alphaSpeed: 0.002 + Math.random() * 0.004,
            };
        });

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };
        const handleMouseLeave = () => {
            mousePos.current = { x: -9999, y: -9999 };
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseleave', handleMouseLeave);

        let lastTime = performance.now();

        const render = (currentTime: number) => {
            const dt = Math.min((currentTime - lastTime) / 16.66, 2.0);
            lastTime = currentTime;

            ctx.clearRect(0, 0, width, height);

            const mx = mousePos.current.x;
            const my = mousePos.current.y;

            for (let i = 0; i < motes.length; i++) {
                const m = motes[i];

                if (!prefersReduced) {
                    // Soft cushioned parting away from cursor
                    const dx = m.x - mx;
                    const dy = m.y - my;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < 8000 && distSq > 0) {
                        const dist = Math.sqrt(distSq);
                        const force = ((90 - dist) / 90) * 0.06 * dt;
                        m.vx += (dx / dist) * force;
                        m.vy += (dy / dist) * force;
                    }

                    // Gentle damping
                    m.vx *= 0.99;
                    m.vy *= 0.99;

                    m.x += m.vx * dt;
                    m.y += m.vy * dt;

                    // Soft alpha breathing
                    m.alpha += m.alphaSpeed * dt;
                    if (m.alpha > m.baseAlpha + 0.16 || m.alpha < m.baseAlpha - 0.08) {
                        m.alphaSpeed = -m.alphaSpeed;
                    }

                    // Seamless edge wrapping
                    if (m.x < -10) m.x = width + 10;
                    if (m.x > width + 10) m.x = -10;
                    if (m.y < -10) m.y = height + 10;
                    if (m.y > height + 10) m.y = -10;
                }

                // Render soft, translucent ambient speck
                ctx.beginPath();
                ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(136, 19, 55, ${Math.max(0.06, Math.min(m.alpha, 0.38))})`;
                ctx.fill();
            }

            animFrameRef.current = requestAnimationFrame(render);
        };

        animFrameRef.current = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [prefersReduced]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
            style={{ opacity: 0.65 }}
        />
    );
};

/* ─────────────────────────────────────────────────────────────────────────────
 * 2. ULTRA-SOFT SPRING CURSOR SHEEN (Subtle, Atmospheric Feedback)
 * ───────────────────────────────────────────────────────────────────────────── */
interface SoftCursorSheenProps {
    mouseX: any;
    mouseY: any;
}

const SoftCursorSheen: React.FC<SoftCursorSheenProps> = ({ mouseX, mouseY }) => {
    return (
        <motion.div
            className="fixed pointer-events-none z-[2] mix-blend-multiply"
            style={{
                left: mouseX,
                top: mouseY,
                translateX: '-50%',
                translateY: '-50%',
                width: 480,
                height: 480,
                borderRadius: '50%',
                background:
                    'radial-gradient(circle, rgba(136, 19, 55, 0.045) 0%, rgba(244, 63, 94, 0.02) 45%, transparent 70%)',
                filter: 'blur(20px)',
            }}
        />
    );
};

/* ─────────────────────────────────────────────────────────────────────────────
 * 3. SENIOR FRONT-END BACKGROUND: CLEAN, SOFT, UX-FIRST ARCHITECTURE
 * ───────────────────────────────────────────────────────────────────────────── */
export const InteractiveParallaxBackground: React.FC = () => {
    const prefersReduced = useReducedMotion();
    const { scrollY, scrollYProgress } = useScroll();

    // Spring-smoothed scroll progress with high damping for a relaxed, buttery scroll experience
    const smoothProgress = useSpring(scrollYProgress, {
        damping: 38,
        stiffness: 55,
        mass: 0.9,
    });

    // Cursor position with spring physics
    const rawMouseX = useMotionValue(-500);
    const rawMouseY = useMotionValue(-500);
    const springMouseX = useSpring(rawMouseX, { damping: 28, stiffness: 140 });
    const springMouseY = useSpring(rawMouseY, { damping: 28, stiffness: 140 });

    // Normalized mouse [-1, 1] for gentle, subtle parallax drift
    const normMouseX = useMotionValue(0);
    const normMouseY = useMotionValue(0);
    const springNormX = useSpring(normMouseX, { damping: 35, stiffness: 80 });
    const springNormY = useSpring(normMouseY, { damping: 35, stiffness: 80 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            rawMouseX.set(e.clientX);
            rawMouseY.set(e.clientY);

            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            const ny = (e.clientY / window.innerHeight) * 2 - 1;
            normMouseX.set(nx);
            normMouseY.set(ny);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [rawMouseX, rawMouseY, normMouseX, normMouseY]);

    /* ── Soft, Airy, Pastel-Tier Ambient Tones (Never harsh, Never saturated) ── */
    // Interpolated continuously along scroll progress [0 -> 1]
    const softAuraPrimary = useTransform(
        smoothProgress,
        [0.0, 0.25, 0.50, 0.75, 1.0],
        [
            'rgba(136, 19, 55, 0.065)',  // Hero: Soft Burgundy whisper
            'rgba(112, 26, 117, 0.055)', // Experience: Soft Plum tint
            'rgba(190, 18, 60, 0.062)',  // Projects: Gentle Warm Rose
            'rgba(5, 150, 105, 0.048)',  // Credentials: Soft Emerald pearl
            'rgba(136, 19, 55, 0.060)',  // Footer: Subtle Velvet Wine
        ]
    );

    const softAuraSecondary = useTransform(
        smoothProgress,
        [0.0, 0.25, 0.50, 0.75, 1.0],
        [
            'rgba(251, 113, 133, 0.065)', // Hero: Pastel Rose
            'rgba(129, 140, 248, 0.045)', // Experience: Soft Periwinkle
            'rgba(245, 158, 11, 0.048)',  // Projects: Warm Sunlit Amber
            'rgba(16, 185, 129, 0.045)',  // Credentials: Soft Mint
            'rgba(244, 63, 94, 0.055)',   // Footer: Soft Rose
        ]
    );

    // Parallax subtle shifts
    const motifY = useTransform(scrollY, [0, 4000], [0, 120]);
    const orb1Y = useTransform(scrollY, [0, 3500], [0, 280]);
    const orb2Y = useTransform(scrollY, [0, 3500], [0, -220]);
    const orb3Y = useTransform(scrollY, [0, 4500], [0, 340]);

    // Gentle mouse-reactive orb nudges
    const orb1x = useTransform(springNormX, [-1, 1], [-25, 25]);
    const orb1yM = useTransform(springNormY, [-1, 1], [-18, 18]);
    const orb2x = useTransform(springNormX, [-1, 1], [30, -30]);

    return (
        <>
            {/* ── Fixed Viewport Base Atmosphere ── */}
            <div className="fixed inset-0 pointer-events-none z-0 bg-[#FFFFFF] overflow-hidden select-none">

                {/* 1. Base Delicate Wash: Softens the stark white into warm luxury alabaster */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(ellipse 130% 90% at 50% -10%, rgba(136, 19, 55, 0.035) 0%, transparent 70%)',
                    }}
                />

                {/* 2. Clean, Minimal Micro-Dot Motif with Interactive Spotlight Reveal */}
                <motion.div
                    style={{
                        y: motifY,
                        backgroundImage: 'radial-gradient(rgba(136, 19, 55, 0.09) 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                        maskImage: 'radial-gradient(ellipse 90% 75% at 50% 35%, #000 35%, transparent 90%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 90% 75% at 50% 35%, #000 35%, transparent 90%)',
                        opacity: 0.45,
                    }}
                    className="absolute inset-0 pointer-events-none"
                />

                {/* 3. Soft Diffused Aurora Blooms (Extra-wide blurs, ultra-smooth diffusion) */}

                {/* Top-Right Ambient Warmth */}
                <motion.div
                    style={{
                        y: orb1Y,
                        x: orb1x,
                        background: softAuraPrimary,
                        filter: 'blur(160px)',
                    }}
                    className={`absolute -top-[12%] -right-[6%] w-[760px] h-[760px] rounded-full pointer-events-none ${
                        !prefersReduced ? 'animate-aurora-spin' : ''
                    }`}
                />

                {/* Mid-Left Complementary Soft Bloom */}
                <motion.div
                    style={{
                        y: orb2Y,
                        x: orb2x,
                        background: softAuraSecondary,
                        filter: 'blur(170px)',
                    }}
                    className={`absolute top-[32%] -left-[10%] w-[700px] h-[700px] rounded-full pointer-events-none ${
                        !prefersReduced ? 'animate-aurora-drift' : ''
                    }`}
                />

                {/* Bottom-Right Anchor Glow */}
                <motion.div
                    style={{
                        y: orb3Y,
                        background: softAuraPrimary,
                        filter: 'blur(180px)',
                    }}
                    className="absolute top-[68%] right-[2%] w-[640px] h-[640px] rounded-full pointer-events-none"
                />

                {/* 4. Ultra-clean Vignette at Page Foot */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 pointer-events-none" />
            </div>

            {/* Soft Ambient Dust Specks (Minimal, Calming, Non-Intrusive) */}
            <SoftAmbientDustCanvas />

            {/* Soft Spring-Interlaced Cursor Sheen */}
            <SoftCursorSheen mouseX={springMouseX} mouseY={springMouseY} />
        </>
    );
};
