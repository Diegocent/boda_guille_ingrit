"use client";

import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { COUPLE } from "@/lib/constants";
import { GypsophilaSprig } from "./Gypsophila";

type EnvelopeOverlayProps = {
  onOpened: () => void;
};

export function EnvelopeOverlay({ onOpened }: EnvelopeOverlayProps) {
  const [visible, setVisible] = useState(true);
  const [opening, setOpening] = useState(false);
  const busy = useRef(false);

  const open = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    setOpening(true);
    onOpened();
    window.setTimeout(() => setVisible(false), 900);
  }, [onOpened]);

  if (!visible) return null;

  return (
    <motion.div
      className={`fixed inset-x-0 top-0 z-50 mx-auto flex h-[100dvh] w-full max-w-md items-center justify-center bg-[#E7EEE6] px-5 ${
        opening ? "pointer-events-none" : ""
      }`}
      animate={opening ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.45, delay: opening ? 0.35 : 0, ease: [0.4, 0, 0.2, 1] }}
    >
      <button
        type="button"
        onClick={open}
        aria-label="Abrir invitación"
        className="relative w-full max-w-[340px] text-left"
      >
        <GypsophilaSprig className="pointer-events-none absolute -left-6 -top-10 z-20 w-28 opacity-90" />
        <GypsophilaSprig
          mirror
          className="pointer-events-none absolute -bottom-8 -right-4 z-20 w-32 opacity-90"
        />

        <div className="relative overflow-hidden rounded-sm bg-[#F8FBF7] shadow-[0_18px_40px_rgba(47,61,49,0.18)]">
          <div className="paper-grain pointer-events-none absolute inset-0" />

          <motion.div
            className="relative z-10 origin-top"
            animate={opening ? { rotateX: -150, opacity: 0.35 } : { rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformStyle: "preserve-3d", perspective: 900 }}
          >
            <div
              className="relative h-[88px] bg-[#D6E4D4]"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            >
              <div className="absolute left-1/2 top-[58%] flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#3A5340] shadow-md">
                <span className="font-script text-lg leading-none text-[#F8FBF7]">&</span>
              </div>
            </div>
          </motion.div>

          <div className="relative z-0 px-8 pb-10 pt-8 text-center">
            <p className="font-serif text-[11px] uppercase tracking-[0.32em] text-[#7A9A7E]">
              Una invitación para ustedes
            </p>
            <h1 className="mt-5 font-script text-[2.7rem] leading-none text-[#4F6F52]">
              {COUPLE.first}
            </h1>
            <p className="my-1 font-script text-3xl text-[#4F6F52]">&</p>
            <h1 className="font-script text-[2.7rem] leading-none text-[#4F6F52]">
              {COUPLE.second}
            </h1>
            <p className="mt-5 font-serif text-base text-[#7A9A7E]">{COUPLE.dateLabel}</p>

            <span className="mt-8 inline-block border-b border-[#3A5340] pb-1 font-serif text-sm uppercase tracking-[0.28em] text-[#3A5340]">
              Abrir
            </span>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
