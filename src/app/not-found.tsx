import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">
        <span aria-hidden="true" />
        404
      </p>
      <h1>This page is not part of the build.</h1>
      <p>Return to Plavanga Labs and continue exploring our services.</p>
      <Link className="button button-primary" href="/">
        Back to home
      </Link>
    </main>
  );
}
