import Link from "next/link";

export default function Search() {
  return (
    <main>
      <h1>Search</h1>
      <nav>
        <ul>
          <li><Link href="/search/make-model">Make/Model-wise</Link></li>
          <li><Link href="/search/specification">Specification-wise</Link></li>
          <li><Link href="/search/service">Service-wise</Link></li>
        </ul>
      </nav>
    </main>
  );
}
