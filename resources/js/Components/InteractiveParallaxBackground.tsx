import React, { useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';

/* ── Particle canvas ─────────────────────────────────────────────────────── */
const ParticleCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef   = useRef<number>(0);
    const mouseRef  = useRef({ x: -9999, y: -9999 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width  = window.innerWidth;
            canvas.height = document.documentElement.scrollHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Particle pool
        const NUM = Math.min(Math.floor(window.innerWidth / 8), 140);
        type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; da: number; hue: number };
        const particles: P[] = Array.from({ length: NUM }, () => ({
            x:  Math.random() * canvas.width,
            y:  Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r:  1 + Math.random() * 2.2,
            a:  Math.random(),
            da: (Math.random() - 0.5) * 0.004,
            hue: 340 + Math.random() * 30,   // rose-burgundy range
        }));

        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
        };
        window.addEventListener('mousemove', onMouseMove);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            particles.forEach((p) => {
                // Mouse repulsion
                const dx = p.x - mx;
                const dy = p.y - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 90) {
                    const force = (90 - dist) / 90;
                    p.vx += (dx / dist) * force * 0.12;
                    p.vy += (dy / dist) * force * 0.12;
                }

                // Velocity damping
                p.vx *= 0.98;
                p.vy *= 0.98;

                p.x += p.vx;
                p.y += p.vy;
                p.a += p.da;
                if (p.a > 0.75 || p.a < 0.08) p.da *= -1;

                // Wrap
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width)  p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 60%, 40%, ${p.a})`;
                ctx.fill();
            });

            // Draw connection lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i], b = particles[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(136,19,55,${0.06 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animRef.current = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.55 }}
        />
    );
};

/* ── Cursor spotlight ────────────────────────────────────────────────────── */
const CursorSpotlight: React.FC = () => {
    const x = useMotionValue(-400);
    const y = useMotionValue(-400);
    const springX = useSpring(x, { damping: 22, stiffness: 180 });
    const springY = useSpring(y, { damping: 22, stiffness: 180 });

    useEffect(() => {
        const onMove = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, [x, y]);

    return (
        <motion.div
            className="fixed pointer-events-none z-[1] mix-blend-multiply"
            style={{
                left: springX,
                top:  springY,
                translateX: '-50%',
                translateY: '-50%',
                width:  380,
                height: 380,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(136,19,55,0.10) 0%, rgba(190,18,60,0.05) 45%, transparent 72%)',
            }}
        />
    );
};

/* ── Main background ─────────────────────────────────────────────────────── */
export const InteractiveParallaxBackground: React.FC = () => {
    const { scrollY } = useScroll();

    // Parallax layers
    const orb1Y   = useTransform(scrollY, [0, 3000], [0,  500]);
    const orb2Y   = useTransform(scrollY, [0, 3500], [0, -420]);
    const orb3Y   = useTransform(scrollY, [0, 4000], [0,  620]);
    const orb4Y   = useTransform(scrollY, [0, 5000], [0,  350]);
    const gridY   = useTransform(scrollY, [0, 4000], [0,  220]);
    const noiseY  = useTransform(scrollY, [0, 3000], [0,   80]);

    // Mouse reactive orbs
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const sMouseX = useSpring(mouseX, { damping: 35, stiffness: 100 });
    const sMouseY = useSpring(mouseY, { damping: 35, stiffness: 100 });

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            const nx = (e.clientX / window.innerWidth)  * 2 - 1;
            const ny = (e.clientY / window.innerHeight) * 2 - 1;
            mouseX.set(nx);
            mouseY.set(ny);
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, [mouseX, mouseY]);

    const orb1x = useTransform(sMouseX, [-1, 1], [-50,  50]);
    const orb1yM = useTransform(sMouseY, [-1, 1], [-30,  30]);
    const orb2x = useTransform(sMouseX, [-1, 1], [ 55, -55]);
    const orb2yM = useTransform(sMouseY, [-1, 1], [ 40, -40]);
    const orb3x = useTransform(sMouseX, [-1, 1], [-25,  25]);
    const cursorX = useTransform(sMouseX, [-1, 1], [-200, 200]);
    const cursorY = useTransform(sMouseY, [-1, 1], [-200, 200]);

    return (
        <>
            {/* Fixed full-viewport base layer */}
            <div className="fixed inset-0 pointer-events-none z-0 bg-white overflow-hidden">

                {/* === Base gradient wash === */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_130%_100%_at_60%_-10%,rgba(136,19,55,0.055)_0%,transparent_60%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_10%_80%,rgba(190,18,60,0.04)_0%,transparent_55%)] pointer-events-none" />

                {/* === Animated Gradient Grid === */}
                <motion.div
                    style={{
                        y: gridY,
                        backgroundImage:
                            'linear-gradient(to right, rgba(0,0,0,0.042) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.042) 1px, transparent 1px)',
                        backgroundSize: '52px 52px',
                        maskImage: 'radial-gradient(ellipse 85% 65% at 50% 38%, #000 55%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 85% 65% at 50% 38%, #000 55%, transparent 100%)',
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                    }}
                />

                {/* === Orb 1: Primary Burgundy — top-right, mouse-reactive === */}
                <motion.div
                    style={{
                        y: orb1Y,
                        x: orb1x,
                        position: 'absolute',
                        top: '-18%',
                        right: '-8%',
                        width: '780px',
                        height: '780px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(136,19,55,0.18) 0%, rgba(190,18,60,0.11) 45%, transparent 72%)',
                        filter: 'blur(100px)',
                        pointerEvents: 'none',
                    }}
                />

                {/* === Orb 2: Rose / Warm — center-left, inverse === */}
                <motion.div
                    style={{
                        y: orb2Y,
                        x: orb2x,
                        background: 'radial-gradient(circle, rgba(251,113,133,0.18) 0%, rgba(136,19,55,0.09) 50%, transparent 75%)',
                        filter: 'blur(120px)',
                    }}
                    className="absolute top-[30%] -left-[14%] w-[700px] h-[700px] rounded-full pointer-events-none"
                />

                {/* === Orb 3: Deep burgundy — bottom === */}
                <motion.div
                    style={{
                        y: orb3Y,
                        x: orb3x,
                        background: 'radial-gradient(circle, rgba(136,19,55,0.13) 0%, rgba(220,38,38,0.07) 50%, transparent 75%)',
                        filter: 'blur(130px)',
                    }}
                    className="absolute top-[68%] right-[3%] w-[640px] h-[640px] rounded-full pointer-events-none"
                />

                {/* === Orb 4: Subtle mid-page anchor === */}
                <motion.div
                    style={{
                        y: orb4Y,
                        background: 'radial-gradient(circle, rgba(253,164,175,0.12) 0%, transparent 65%)',
                        filter: 'blur(110px)',
                    }}
                    className="absolute top-[52%] left-[38%] w-[500px] h-[500px] rounded-full pointer-events-none"
                />

                {/* === Cursor reactive spotlight orb === */}
                <motion.div
                    style={{
                        x: cursorX,
                        y: cursorY,
                        background: 'radial-gradient(circle, rgba(136,19,55,0.07) 0%, rgba(190,18,60,0.04) 45%, transparent 70%)',
                        filter: 'blur(90px)',
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full pointer-events-none"
                />

                {/* === Particle field === */}
                <ParticleCanvas />

                {/* === Animated shimmer dots === */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width:  4 + (i % 3) * 3,
                                height: 4 + (i % 3) * 3,
                                left: `${10 + i * 11}%`,
                                top:  `${8  + i * 10}%`,
                                background: `rgba(136,19,55,${0.15 + (i % 4) * 0.07})`,
                            }}
                            animate={{
                                y:       [0, -18, 0],
                                opacity: [0.3, 0.9, 0.3],
                                scale:   [1, 1.3, 1],
                            }}
                            transition={{
                                duration: 3.5 + i * 0.7,
                                repeat: Infinity,
                                delay: i * 0.45,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </div>

                {/* === Vignette fade-to-white at bottom === */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 pointer-events-none" />
            </div>

            {/* Cursor spotlight — fixed layer above content, below interactive z */}
            <CursorSpotlight />
        </>
    );
};
