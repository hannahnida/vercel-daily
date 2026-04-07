export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>&copy;{currentYear} Vercel Daily. All rights reserved.</p>
      </aside>
    </footer>
  );
}