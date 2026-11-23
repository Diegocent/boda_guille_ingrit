"use client";

import { MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  CALENDAR_URL,
  COUPLE,
  GIFT,
  ITINERARY,
  MESSAGE,
  VENUE,
  WEDDING_DATE,
} from "@/lib/constants";
import {
  EucalyptusLeaf,
  GypsophilaSprig,
  SectionOrnament,
  WaveDivider,
} from "./Decorations";
import { Reveal } from "./Reveal";
import { RsvpModal } from "./RsvpModal";

function OutLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative z-20 ${className ?? ""}`}
      onClick={(event) => {
        event.stopPropagation();
        const popup = window.open(href, "_blank", "noopener,noreferrer");
        if (popup) event.preventDefault();
      }}
    >
      {children}
    </a>
  );
}

export function Invitation() {
  return (
    <div className="relative bg-[#F7FAF4] text-[#2F4634]">
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-70" />
      <Hero />
      <WaveDivider top="#F7FAF4" bottom="#E4EDE2" />
      <MessageBand />
      <WaveDivider top="#E4EDE2" bottom="#F7FAF4" flip />
      <DateBlock />
      <WaveDivider top="#F7FAF4" bottom="#4F6F52" />
      <Countdown />
      <WaveDivider top="#4F6F52" bottom="#F7FAF4" flip />
      <Itinerary />
      <WaveDivider top="#F7FAF4" bottom="#E4EDE2" />
      <Venue />
      <WaveDivider top="#E4EDE2" bottom="#3A5340" />
      <Rsvp />
      <WaveDivider top="#3A5340" bottom="#F7FAF4" flip />
      <Gifts />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-8 py-20">
      <img
        src="/floral/baby-breath.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.22]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F7FAF4]/55 via-[#F7FAF4]/75 to-[#F7FAF4]" />
      <GypsophilaSprig className="absolute -left-4 top-10 h-48 w-36 opacity-90" />
      <GypsophilaSprig mirror className="absolute -right-6 bottom-16 h-56 w-40 opacity-90" delay={0.4} />
      <EucalyptusLeaf className="absolute right-6 top-24 h-28 w-16 opacity-80" delay={0.2} />
      <EucalyptusLeaf className="absolute bottom-28 left-4 h-24 w-14 opacity-75" delay={0.8} />

      <Reveal className="relative z-10 flex flex-col items-center text-center">
        <p className="font-serif text-[11px] uppercase tracking-[0.42em] text-[#6F8F74]">
          Nuestra boda
        </p>
        <SectionOrnament />
        <h1 className="mt-8 font-script text-[4.4rem] leading-[0.92] text-[#4F6F52]">
          {COUPLE.first}
        </h1>
        <p className="my-3 font-script text-5xl text-[#6F8F74]">&</p>
        <h1 className="font-script text-[4.4rem] leading-[0.92] text-[#4F6F52]">
          {COUPLE.second}
        </h1>
        <p className="mt-10 font-serif text-sm uppercase tracking-[0.28em] text-[#2F4634]">
          {COUPLE.dateLabel}
        </p>
        <p className="mt-4 font-serif text-base italic text-[#6F8F74]">
          Quinta Las Palmeras
        </p>
      </Reveal>
    </section>
  );
}

function MessageBand() {
  return (
    <section className="relative overflow-hidden bg-[#E4EDE2] px-10 py-20 text-center">
      <img
        src="/floral/baby-breath.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12]"
      />
      <GypsophilaSprig className="absolute -left-8 top-6 h-40 w-28 opacity-70" />
      <Reveal className="relative z-10">
        <p className="font-serif text-[11px] uppercase tracking-[0.34em] text-[#4F6F52]">
          Con cariño
        </p>
        <p className="mx-auto mt-8 max-w-sm font-script text-[2.15rem] leading-snug text-[#2F4634]">
          {MESSAGE}
        </p>
      </Reveal>
    </section>
  );
}

function DateBlock() {
  return (
    <section className="relative overflow-hidden px-8 py-20 text-center">
      <EucalyptusLeaf className="absolute left-3 top-10 h-28 w-16 opacity-70" />
      <Reveal>
        <p className="font-serif text-[11px] uppercase tracking-[0.34em] text-[#6F8F74]">
          {COUPLE.weekday}
        </p>
        <div className="mt-8 flex items-center justify-center gap-5">
          <p className="font-serif text-[6rem] font-medium leading-none text-[#4F6F52]">
            {COUPLE.day}
          </p>
          <div className="h-20 w-px bg-[#4F6F52]/25" />
          <div className="text-left">
            <p className="font-serif text-2xl uppercase tracking-[0.16em] text-[#4F6F52]">
              {COUPLE.month}
            </p>
            <p className="mt-1 font-serif text-2xl text-[#4F6F52]">{COUPLE.year}</p>
          </div>
        </div>
        <p className="mt-10 font-serif text-lg text-[#6F8F74]">Nos encontramos a las 20:00</p>
        <SectionOrnament />
      </Reveal>
    </section>
  );
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const parts = useMemo(() => {
    const diff = now === null ? 0 : Math.max(0, WEDDING_DATE.getTime() - now);
    return {
      days: now === null ? 0 : Math.floor(diff / 86400000),
      hours: now === null ? 0 : Math.floor((diff % 86400000) / 3600000),
      mins: now === null ? 0 : Math.floor((diff % 3600000) / 60000),
      secs: now === null ? 0 : Math.floor((diff % 60000) / 1000),
    };
  }, [now]);

  const boxes = [
    { label: "Días", value: parts.days },
    { label: "Horas", value: parts.hours },
    { label: "Min", value: parts.mins },
    { label: "Seg", value: parts.secs },
  ];

  return (
    <section className="relative overflow-hidden bg-[#4F6F52] px-8 py-20 text-center text-[#F7FAF4]">
      <GypsophilaSprig className="absolute -right-4 top-4 h-44 w-32 opacity-30" mirror />
      <Reveal>
        <h2 className="font-serif text-sm uppercase tracking-[0.32em] text-[#E4EDE2]">
          Cuenta regresiva
        </h2>
        <div className="mx-auto mt-10 grid max-w-sm grid-cols-4 gap-3" suppressHydrationWarning>
          {boxes.map((box) => (
            <div
              key={box.label}
              className="rounded-sm border border-[#F7FAF4]/20 bg-[#3A5340]/35 px-2 py-4"
            >
              <p className="font-serif text-3xl leading-none">{box.value}</p>
              <p className="mt-2 font-serif text-[10px] uppercase tracking-[0.18em] text-[#E4EDE2]">
                {box.label}
              </p>
            </div>
          ))}
        </div>
        <OutLink
          href={CALENDAR_URL}
          className="mt-10 inline-block border-b border-[#F7FAF4]/70 pb-1 font-serif text-sm uppercase tracking-[0.22em] text-[#F7FAF4]"
        >
          Añadir al calendario
        </OutLink>
      </Reveal>
    </section>
  );
}

function Itinerary() {
  return (
    <section className="relative overflow-hidden px-8 py-20">
      <img
        src="/floral/baby-breath-green.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.1]"
      />
      <GypsophilaSprig className="absolute -left-6 bottom-8 h-48 w-36 opacity-75" />
      <Reveal className="relative z-10">
        <h2 className="text-center font-serif text-sm uppercase tracking-[0.32em] text-[#4F6F52]">
          Itinerario
        </h2>
        <ol className="relative mx-auto mt-12 max-w-xs space-y-8">
          <div className="absolute bottom-3 left-[4.85rem] top-3 w-px bg-[#4F6F52]/20" />
          {ITINERARY.map((item) => (
            <li key={item.time} className="relative flex items-start">
              <p className="w-[4.4rem] shrink-0 pt-1 font-serif text-base text-[#6F8F74]">
                {item.time}
              </p>
              <span className="relative z-10 mt-2.5 mr-5 h-3 w-3 shrink-0 rounded-full border-2 border-[#4F6F52] bg-[#F7FAF4]" />
              <div>
                <p className="font-serif text-xl text-[#2F4634]">{item.label}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

function Venue() {
  return (
    <section className="relative overflow-hidden bg-[#E4EDE2] px-8 py-20 text-center">
      <EucalyptusLeaf className="absolute right-2 top-8 h-28 w-16 opacity-70" delay={0.3} />
      <Reveal>
        <h2 className="font-serif text-sm uppercase tracking-[0.32em] text-[#4F6F52]">Lugar</h2>
        <p className="mt-6 font-script text-5xl text-[#2F4634]">{VENUE.place}</p>
        <p className="mx-auto mt-5 max-w-xs font-serif text-base leading-relaxed text-[#6F8F74]">
          Ceremonia civil y religiosa en el mismo sitio.
        </p>
      </Reveal>
      <Reveal delay={0.12} className="mt-10">
        <img
          src="/floral/venue.jpg"
          alt="Alianzas"
          className="mx-auto h-56 w-full max-w-sm rounded-sm object-cover shadow-[0_16px_40px_rgba(47,70,52,0.18)]"
        />
      </Reveal>
      <Reveal delay={0.18} className="mt-10">
        <OutLink
          href={VENUE.maps}
          className="inline-flex flex-col items-center gap-2 text-[#2F4634]"
        >
          <MapPin className="h-7 w-7 text-[#4F6F52]" strokeWidth={1.5} />
          <span className="font-serif text-sm uppercase tracking-[0.22em]">Cómo llegar</span>
        </OutLink>
      </Reveal>
    </section>
  );
}

function Rsvp() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#3A5340] px-8 py-20 text-center text-[#F7FAF4]">
      <GypsophilaSprig className="absolute -left-4 top-6 h-44 w-32 opacity-25" />
      <GypsophilaSprig mirror className="absolute -right-4 bottom-6 h-48 w-36 opacity-25" delay={0.5} />
      <Reveal className="relative z-10">
        <p className="font-serif text-[11px] uppercase tracking-[0.34em] text-[#E4EDE2]">RSVP</p>
        <h2 className="mt-5 font-script text-5xl leading-tight">¿Nos acompañan?</h2>
        <p className="mx-auto mt-6 max-w-xs font-serif text-base leading-relaxed text-[#E4EDE2]">
          Confirmá tu asistencia para que podamos recibirte como corresponde.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-10 rounded-sm bg-[#F7FAF4] px-8 py-3.5 font-serif text-sm uppercase tracking-[0.22em] text-[#3A5340]"
        >
          Confirmar asistencia
        </button>
      </Reveal>
      <RsvpModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

function Gifts() {
  return (
    <section className="relative overflow-hidden px-8 py-20 text-center">
      <EucalyptusLeaf className="absolute left-4 bottom-10 h-24 w-14 opacity-70" delay={0.6} />
      <Reveal>
        <h2 className="font-serif text-sm uppercase tracking-[0.32em] text-[#4F6F52]">Regalos</h2>
        <p className="mx-auto mt-8 max-w-xs font-serif text-lg leading-relaxed text-[#6F8F74]">
          {GIFT.note}
        </p>
        <div className="mx-auto mt-10 max-w-xs rounded-sm border border-[#4F6F52]/20 bg-[#E4EDE2]/55 px-6 py-8">
          <p className="font-serif text-[11px] uppercase tracking-[0.24em] text-[#6F8F74]">
            {GIFT.aliasLabel}
          </p>
          <p className="mt-3 break-all font-serif text-2xl text-[#2F4634]">{GIFT.alias}</p>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden px-8 pb-16 pt-6 text-center">
      <SectionOrnament />
      <p className="mt-8 font-script text-4xl text-[#4F6F52]">
        {COUPLE.first} & {COUPLE.second}
      </p>
      <p className="mt-3 font-serif text-sm tracking-wide text-[#6F8F74]">{COUPLE.dateLabel}</p>
    </footer>
  );
}
