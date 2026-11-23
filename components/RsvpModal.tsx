"use client";

import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type RsvpModalProps = {
  open: boolean;
  onClose: () => void;
};

type Status = "idle" | "saving" | "ok" | "error";

export function RsvpModal({ open, onClose }: RsvpModalProps) {
  const [mounted, setMounted] = useState(false);
  const [nombre, setNombre] = useState("");
  const [acompanado, setAcompanado] = useState(false);
  const [acompanantes, setAcompanantes] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && status !== "saving") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, status]);

  useEffect(() => {
    if (open) return;
    const id = window.setTimeout(() => {
      setNombre("");
      setAcompanado(false);
      setAcompanantes(1);
      setStatus("idle");
      setError("");
    }, 200);
    return () => window.clearTimeout(id);
  }, [open]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = nombre.trim();
    if (name.length < 2) {
      setError("Ingresá el nombre del invitado.");
      return;
    }

    setStatus("saving");
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: name,
          acompanado,
          acompanantes: acompanado ? acompanantes : 0,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "No se pudo guardar");
      }
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error && err.message
          ? err.message
          : "No se pudo registrar ahora. Intentá de nuevo en un momento.",
      );
    }
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#3A5340]/55 px-4 py-6"
      style={{ zIndex: 200 }}
      onClick={() => {
        if (status !== "saving") onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rsvp-title"
        className="relative w-full max-w-sm rounded-sm bg-[#F8FBF7] p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={status === "saving"}
          className="absolute right-4 top-4 p-1 text-[#3A5340] disabled:opacity-40"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "ok" ? (
          <div className="py-4">
            <Check className="h-7 w-7 text-[#4F6F52]" strokeWidth={1.6} />
            <h3 className="mt-5 font-script text-5xl text-[#4F6F52]">Listo</h3>
            <p className="mt-3 font-serif text-base leading-relaxed text-[#3A5340]/80">
              Confirmamos tu asistencia para el 19 de diciembre a las 20:00 en Quinta Las Palmeras.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-sm bg-[#3A5340] px-6 py-2.5 font-serif text-sm uppercase tracking-[0.18em] text-[#F8FBF7]"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p className="font-serif text-sm uppercase tracking-[0.28em] text-[#7A9A7E]">RSVP</p>
            <h3 id="rsvp-title" className="mt-2 font-script text-5xl text-[#4F6F52]">
              Confirmá
            </h3>
            <p className="mt-3 font-serif text-base leading-relaxed text-[#3A5340]/80">
              Nombre del invitado y, si vas acompañado, con cuántas personas.
            </p>

            <label className="mt-6 block">
              <span className="font-serif text-sm uppercase tracking-[0.18em] text-[#7A9A7E]">
                Nombre
              </span>
              <input
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                name="nombre"
                autoComplete="name"
                required
                minLength={2}
                placeholder="Ej: Ana Pérez"
                className="mt-2 w-full rounded-sm border border-[#4F6F52]/25 bg-white px-3 py-3 font-serif text-base text-[#3A5340] outline-none ring-[#7A9A7E] placeholder:text-[#7A9A7E]/50 focus:ring-2"
              />
            </label>

            <fieldset className="mt-5">
              <legend className="font-serif text-sm uppercase tracking-[0.18em] text-[#7A9A7E]">
                ¿Vas acompañado?
              </legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                  { label: "No", value: false },
                  { label: "Sí", value: true },
                ].map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setAcompanado(option.value)}
                    className={`rounded-sm px-3 py-2.5 font-serif text-base ${
                      acompanado === option.value
                        ? "bg-[#3A5340] text-[#F8FBF7]"
                        : "border border-[#4F6F52]/25 text-[#3A5340]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {acompanado ? (
              <label className="mt-5 block">
                <span className="font-serif text-sm uppercase tracking-[0.18em] text-[#7A9A7E]">
                  ¿Con cuántas personas?
                </span>
                <div className="mt-2 flex items-center justify-between rounded-sm border border-[#4F6F52]/25 bg-white px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setAcompanantes((n) => Math.max(1, n - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#E7EEE6] text-lg text-[#3A5340]"
                    aria-label="Menos"
                  >
                    −
                  </button>
                  <span className="font-serif text-2xl">{acompanantes}</span>
                  <button
                    type="button"
                    onClick={() => setAcompanantes((n) => Math.min(10, n + 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#E7EEE6] text-lg text-[#3A5340]"
                    aria-label="Más"
                  >
                    +
                  </button>
                </div>
                <p className="mt-2 font-serif text-sm text-[#7A9A7E]">
                  Vas a ser {1 + acompanantes} en total, contándote a vos.
                </p>
              </label>
            ) : null}

            {error ? <p className="mt-4 font-sans text-xs text-red-700">{error}</p> : null}

            <button
              type="submit"
              disabled={status === "saving"}
              className="mt-6 w-full rounded-sm bg-[#3A5340] px-5 py-3 font-serif text-sm uppercase tracking-[0.18em] text-[#F8FBF7] disabled:opacity-60"
            >
              {status === "saving" ? "Guardando..." : "Confirmar asistencia"}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
