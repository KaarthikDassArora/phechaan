interface PhechaanLogoProps {
  size?: number;
  className?: string;
}

export default function PhechaanLogo({
  size = 40,
  className = "",
}: PhechaanLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle representing unity */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-phechaan-gold"
      />

      {/* India outline stylized */}
      <path
        d="M35 25 C40 20, 60 20, 65 25 L70 35 C72 45, 70 55, 65 60 L60 70 C55 75, 45 75, 40 70 L35 60 C30 55, 28 45, 30 35 Z"
        fill="currentColor"
        className="text-phechaan-gold"
        opacity="0.8"
      />

      {/* Mountain peaks */}
      <path
        d="M25 55 L30 45 L35 50 L40 40 L45 48 L50 35 L55 45 L60 38 L65 48 L70 42 L75 55 Z"
        fill="currentColor"
        className="text-phechaan-bronze"
        opacity="0.6"
      />

      {/* Temple/monument silhouette */}
      <path
        d="M45 50 L47 45 L50 47 L53 45 L55 50 L53 65 L47 65 Z"
        fill="currentColor"
        className="text-phechaan-cream"
      />

      {/* Decorative elements - lotus petals */}
      <g className="text-phechaan-gold" opacity="0.7">
        <ellipse
          cx="35"
          cy="35"
          rx="3"
          ry="8"
          transform="rotate(-45 35 35)"
          fill="currentColor"
        />
        <ellipse
          cx="65"
          cy="35"
          rx="3"
          ry="8"
          transform="rotate(45 65 35)"
          fill="currentColor"
        />
        <ellipse
          cx="35"
          cy="65"
          rx="3"
          ry="8"
          transform="rotate(45 35 65)"
          fill="currentColor"
        />
        <ellipse
          cx="65"
          cy="65"
          rx="3"
          ry="8"
          transform="rotate(-45 65 65)"
          fill="currentColor"
        />
      </g>

      {/* Center dot representing spiritual core */}
      <circle
        cx="50"
        cy="50"
        r="3"
        fill="currentColor"
        className="text-phechaan-gold"
      />
    </svg>
  );
}
