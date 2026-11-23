export function GypsophilaSprig({
  className = "",
  mirror = false,
}: {
  className?: string;
  mirror?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 160 200"
      fill="none"
      aria-hidden
      className={`${className} ${mirror ? "-scale-x-100" : ""}`}
    >
      <path
        d="M78 198 C74 150 88 120 70 90 C55 65 72 40 80 12"
        stroke="#7A9A7E"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M78 140 C98 128 112 118 128 98"
        stroke="#7A9A7E"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M76 110 C54 98 40 84 28 66"
        stroke="#7A9A7E"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M74 78 C92 68 104 52 112 36"
        stroke="#7A9A7E"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {[
        [80, 18],
        [72, 34],
        [88, 42],
        [64, 58],
        [96, 62],
        [48, 72],
        [112, 78],
        [36, 88],
        [124, 94],
        [58, 102],
        [102, 108],
        [70, 122],
        [90, 132],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="3.2" fill="#FFFFFF" stroke="#DCE8DA" strokeWidth="0.6" />
          <circle cx={cx} cy={cy} r="1.1" fill="#E7EEE6" />
        </g>
      ))}
    </svg>
  );
}
