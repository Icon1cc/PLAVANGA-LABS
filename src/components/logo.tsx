import Link from "next/link";

type LogoProps = {
  compact?: boolean;
};

export function Logo({ compact = false }: LogoProps) {
  return (
    <Link className="logo" href="#home" aria-label="Plavanga Labs home">
      <span className="logo-mark" aria-hidden="true">
        <span>A</span>
      </span>
      {!compact && (
        <span className="logo-type">
          PLAVANGA <span>LABS</span>
        </span>
      )}
    </Link>
  );
}
