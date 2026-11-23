"use client";

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
import { GypsophilaSprig } from "./Gypsophila";
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
      className={className}
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
    <div className="relative bg-[#F8FBF7] text-[#3A5340]">
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-80" />
      <img
        src="/floral/gypsophila-a.jpg"
        alt=""
        className="floral-soft pointer-events-none absolute -right-16 -top-6 h-64 w-64 object-cover"
      />
      <Hero />
      <Names />
      <Message />
      <DateBlock />
      <Countdown />
      <Itinerary />
      <Venue />
      <Rsvp />
      <Gifts />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative px-8 pb-2 pt-16 text-center">
      <Reveal>
        <p className="font-serif text-[11px] uppercase tracking-[0.36em] text-[#7A9A7E]">
          Nuestra boda
        </p>
      </Reveal>
    </section>
  );
}

function Names() {
  return (
    <section className="relative px-8 pb-6 pt-6 text-center">
      <GypsophilaSprig className="pointer-events-none absolute left-2 top-0 w-20 opacity-80" />
      <Reveal>
        <h1 className="font-script text-[3.6rem] leading-[0.95] text-[#4F6F52]">{COUPLE.first}</h1>
        <p className="my-3 font-script text-4xl text-[#4F6F52]">&</p>
        <h1 className="font-script text-[3.6rem] leading-[0.95] text-[#4F6F52]">{COUPLE.second}</h1>
      </Reveal>
    </section>
  );
}

function Message() {
  return (
    <section className="relative px-10 py-10 text-center">
      <Reveal>
        <p className="mx-auto max-w-xs font-serif text-lg italic leading-relaxed text-[#7A9A7E]">
          {MESSAGE}
        </p>
      </Reveal>
    </section>
  );
}

function DateBlock() {
  return (
    <section className="relative px-8 pb-8 text-center">
      <Reveal>
        <p className="font-serif text-[11px] uppercase tracking-[0.3em] text-[#7A9A7E]">
          {COUPLE.weekday}
        </p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <p className="font-serif text-[4.8rem] font-medium leading-none text-[#4F6F52]">
            {COUPLE.day}
          </p>
          <div className="h-14 w-px bg-[#4F6F52]/30" />
          <div className="text-left">
            <p className="font-serif text-lg uppercase tracking-[0.16em] text-[#4F6F52]">
              {COUPLE.month}
            </p>
            <p className="font-serif text-lg text-[#4F6F52]">{COUPLE.year}</p>
          </div>
        </div>
        <p className="mt-5 font-serif text-base text-[#7A9A7E]">Nos encontramos a las 20:00</p>
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

  const text = useMemo(() => {
    const diff = now === null ? 0 : Math.max(0, WEDDING_DATE.getTime() - now);
    const days = now === null ? 0 : Math.floor(diff / 86400000);
    const hours = now === null ? 0 : Math.floor((diff % 86400000) / 3600000);
    const mins = now === null ? 0 : Math.floor((diff % 3600000) / 60000);
    const secs = now === null ? 0 : Math.floor((diff % 60000) / 1000);
    return `${days} días ${hours} h ${mins} min ${secs} seg`;
  }, [now]);

  return (
    <section className="relative px-8 pb-10 text-center">
      <Reveal>
        <h2 className="font-serif text-sm uppercase tracking-[0.28em] text-[#4F6F52]">
          Cuenta regresiva
        </h2>
        <p className="mt-3 font-serif text-xl text-[#7A9A7E]" suppressHydrationWarning>
          {text}
        </p>
        <OutLink
          href={CALENDAR_URL}
          className="mt-5 inline-block font-serif text-sm text-[#3A5340] underline underline-offset-4"
        >
          Añadir al calendario
        </OutLink>
      </Reveal>
    </section>
  );
}

function Itinerary() {
  return (
    <section className="relative px-8 py-8">
      <img
        src="/floral/gypsophila-b.jpg"
        alt=""
        className="floral-soft pointer-events-none absolute -left-20 top-8 h-56 w-56 object-cover"
      />
      <Reveal>
        <h2 className="text-center font-serif text-sm uppercase tracking-[0.28em] text-[#4F6F52]">
          Itinerario
        </h2>
        <ol className="relative mx-auto mt-8 max-w-xs">
          <div className="absolute bottom-2 left-[4.6rem] top-2 w-px bg-[#4F6F52]/25" />
          {ITINERARY.map((item) => (
            <li key={item.time} className="relative mb-6 flex items-start last:mb-0">
              <p className="w-[4.2rem] shrink-0 pt-0.5 font-serif text-base text-[#7A9A7E]">
                {item.time}
              </p>
              <span className="relative z-10 mt-2 mr-4 h-2.5 w-2.5 shrink-0 rounded-full bg-[#4F6F52]" />
              <p className="pt-0.5 font-serif text-lg text-[#3A5340]">{item.label}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

function Venue() {
  return (
    <section className="relative px-8 py-10 text-center">
      <Reveal>
        <h2 className="font-serif text-sm uppercase tracking-[0.28em] text-[#4F6F52]">
          Lugar
        </h2>
        <p className="mt-4 font-serif text-2xl text-[#3A5340]">{VENUE.place}</p>
        <p className="mt-2 font-serif text-base text-[#7A9A7E]">
          Civil y religiosa en el mismo sitio
        </p>
        <OutLink
          href={VENUE.maps}
          className="mt-6 inline-flex rounded-sm border border-[#3A5340] px-6 py-2.5 font-serif text-sm uppercase tracking-[0.18em] text-[#3A5340]"
        >
          Cómo llegar
        </OutLink>
      </Reveal>
    </section>
  );
}

function Rsvp() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative px-8 py-8 text-center">
      <Reveal>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-sm bg-[#3A5340] px-8 py-3 font-serif text-sm uppercase tracking-[0.2em] text-[#F8FBF7]"
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
    <section className="relative px-8 py-10 text-center">
      <GypsophilaSprig mirror className="pointer-events-none absolute bottom-2 right-4 w-24 opacity-70" />
      <Reveal>
        <h2 className="font-serif text-sm uppercase tracking-[0.28em] text-[#4F6F52]">
          Regalos
        </h2>
        <p className="mx-auto mt-4 max-w-xs font-serif text-base leading-relaxed text-[#7A9A7E]">
          {GIFT.note}
        </p>
        <p className="mt-5 font-serif text-[11px] uppercase tracking-[0.22em] text-[#7A9A7E]">
          {GIFT.aliasLabel}
        </p>
        <p className="mt-2 break-all font-serif text-xl text-[#3A5340]">{GIFT.alias}</p>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative px-8 pb-14 pt-6 text-center">
      <p className="font-script text-3xl text-[#4F6F52]">
        {COUPLE.first} & {COUPLE.second}
      </p>
      <p className="mt-2 font-serif text-sm text-[#7A9A7E]">{COUPLE.dateLabel}</p>
    </footer>
  );
}
