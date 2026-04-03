export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-black dark:text-white dark:bg-black py-4 border-t dark:border-gray-700 text-center text-base font-mono">
      <p>&copy;{currentYear} Vercel Daily. All rights reserved.</p>
    </footer>
  );
}