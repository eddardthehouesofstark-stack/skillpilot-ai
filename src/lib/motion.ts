"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function initMotion(root: HTMLElement) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return () => {};

  const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  let frame = 0;
  const tick = (time: number) => {
    lenis.raf(time * 1000);
    frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
  lenis.on("scroll", ScrollTrigger.update);

  const ctx = gsap.context(() => {
    gsap.from(".hero-kicker", { y: 18, opacity: 0, duration: 0.8, delay: 0.15, ease: "power3.out" });
    gsap.from(".line-reveal", { yPercent: 115, opacity: 0, duration: 1.05, stagger: 0.13, delay: 0.22, ease: "power4.out" });
    gsap.from(".hero-bottom", { y: 22, opacity: 0, duration: 0.9, delay: 0.72, ease: "power3.out" });
    gsap.from(".hero-art", { scale: 0.88, opacity: 0, duration: 1.4, delay: 0.35, ease: "power3.out" });

    gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
      gsap.fromTo(element, { y: 34, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 86%", once: true },
      });
    });

    gsap.to(".hero-core", { y: -42, rotate: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
    gsap.to(".orbit-one", { rotate: 30, y: -65, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 } });
    gsap.to(".orbit-two", { rotate: -24, y: 42, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.5 } });
    gsap.to(".hero-grid", { yPercent: 22, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".manifesto-decoration", { yPercent: -24, rotate: 12, ease: "none", scrollTrigger: { trigger: ".manifesto", start: "top bottom", end: "bottom top", scrub: true } });
    gsap.to(".statement-bg-word", { xPercent: -12, ease: "none", scrollTrigger: { trigger: ".statement", start: "top bottom", end: "bottom top", scrub: true } });
    gsap.to(".statement-graphic", { y: -75, rotate: 8, ease: "none", scrollTrigger: { trigger: ".statement", start: "top bottom", end: "bottom top", scrub: true } });
    gsap.to(".closing-orb", { y: -70, rotate: -15, ease: "none", scrollTrigger: { trigger: ".closing", start: "top bottom", end: "bottom top", scrub: true } });
  }, root);

  return () => {
    cancelAnimationFrame(frame);
    lenis.destroy();
    ctx.revert();
  };
}
