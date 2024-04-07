import { Link } from "react-router-dom";

type Props = {
  width?: string;
  height?: string;
  hideLink?: boolean;
};

export default function Logo({
  width = "w-8",
  height = "h-8",
  hideLink = false,
}: Props) {
  const logo = (
    <>
      <svg
        className={`${width} ${height}`}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            cx="21.152%"
            cy="86.063%"
            fx="21.152%"
            fy="86.063%"
            r="79.941%"
            id="footer-logo"
          >
            <stop stopColor="#4FD1C5" offset="0%" />
            <stop stopColor="#81E6D9" offset="25.871%" />
            <stop stopColor="#338CF5" offset="100%" />
          </radialGradient>
        </defs>
        <rect
          width="32"
          height="32"
          rx="16"
          fill="url(#footer-logo)"
          fillRule="nonzero"
        />
      </svg>
      <h1 className="font-bold">Algowars</h1>
    </>
  );
  return hideLink ? (
    logo
  ) : (
    <Link to="/" className="flex items-center gap-2" aria-label="Algowars">
      {logo}
    </Link>
  );
}
