"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { COUPLE } from "@/lib/constants";
import { EucalyptusLeaf, GypsophilaSprig, SectionOrnament } from "./Decorations";

type EnvelopeOverlayProps = {
  onOpened: () => void;
};

export function EnvelopeOverlay({ onOpened }: EnvelopeOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [opening, setOpening] = useState(false);
  const busy = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const open = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    setOpening(true);
    onOpened();
    window.setTimeout(() => setVisible(false), 950);
  }, [onOpened]);

  if (!mounted || !visible) return null;

  return createPortal(
    <motion.div
      className={`fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#E4EDE2]/95 px-5 ${
        opening ? "pointer-events-none" : ""
      }`}
      animate={opening ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.45, delay: opening ? 0.4 : 0, ease: [0.4, 0, 0.2, 1] }}
    >
      <img
        src="/floral/baby-breath.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#E4EDE2]/55" />

      <button
        type="button"
        onClick={open}
        aria-label="Abrir invitación"
        className="relative w-full max-w-[350px] text-left"
      >
        <GypsophilaSprig className="absolute -left-8 -top-12 z-30 h-40 w-28" />
        <GypsophilaSprig mirror className="absolute -bottom-10 -right-6 z-30 h-44 w-32" delay={0.35} />
        <EucalyptusLeaf className="absolute -right-2 top-20 z-30 h-24 w-14" delay={0.2} />

        <div className="relative overflow-hidden rounded-sm bg-[#F7FAF4] shadow-[0_22px_50px_rgba(47,70,52,0.22)]">
          <div className="paper-grain pointer-events-none absolute inset-0" />
          <img
            src="/floral/baby-breath-green.jpg"
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12]"
          />

          <motion.div
            className="relative z-10 origin-top"
            animate={opening ? { rotateX: -155, opacity: 0.25 } : { rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformStyle: "preserve-3d", perspective: 900 }}
          >
            <div
              className="relative h-[96px] bg-gradient-to-b from-[#C9DBC8] to-[#AFC9AE]"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            >
              <div className="absolute left-1/2 top-[58%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#2F4634] shadow-lg ring-4 ring-[#F7FAF4]/35">
                <span className="font-script text-xl leading-none text-[#F7FAF4]">&</span>
              </div>
            </div>
          </motion.div>

          <div className="relative z-0 px-8 pb-11 pt-9 text-center">
            <p className="font-serif text-[11px] uppercase tracking-[0.34em] text-[#6F8F74]">
              Una invitación para ustedes
            </p>
            <SectionOrnament />
            <h1 className="mt-6 font-script text-[3rem] leading-none text-[#4F6F52]">
              {COUPLE.first}
            </h1>
            <p className="my-1 font-script text-3xl text-[#6F8F74]">&</p>
            <h1 className="font-script text-[3rem] leading-none text-[#4F6F52]">
              {COUPLE.second}
            </h1>
            <p className="mt-6 font-serif text-base text-[#6F8F74]">{COUPLE.dateLabel}</p>
            <span className="mt-9 inline-block rounded-sm bg-[#2F4634] px-9 py-3 font-serif text-sm uppercase tracking-[0.28em] text-[#F7FAF4]">
              Abrir
            </span>
          </div>
        </div>
      </button>
    </motion.div>,
    document.body,
  );
}
