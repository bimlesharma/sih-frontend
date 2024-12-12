// 'use client';
// import { useTheme } from 'next-themes';
// import { useEffect, useState } from 'react';

// export default function ThemeToggle() {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   // Avoid hydration mismatch
//   useEffect(() => setMounted(true), []);

//   if (!mounted) return null;

//   return (
//     <button
//       onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//       className="p-2 rounded border border-gray-300 dark:border-gray-600"
//     >
//       {theme === 'dark' ? 'Light Mode 🌞' : 'Dark Mode 🌙'}
//     </button>
//   );
// }



'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix for hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      className="p-2 border rounded border-gray-300 dark:border-gray-600"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? 'Light Mode 🌞' : 'Dark Mode 🌙'}
    </button>
  );
}
