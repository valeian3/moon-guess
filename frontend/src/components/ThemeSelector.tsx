import { useLocalStorage } from 'hooks/hooks'

import { Sun, Moon } from 'lucide-react'

function ThemeSelector() {
  const [theme, setTheme] = useLocalStorage<string>('theme', 'light')

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark')
      setTheme('light')
    } else {
      document.documentElement.classList.add('dark')
      setTheme('dark')
    }
  }
  return (
    <>
      {theme === 'light' ? (
        <Sun
          onClick={toggleTheme}
          size={40}
          className="hover:text-primary-500 tablet:block rounded-md p-2 text-yellow-500 hover:bg-gray-300 dark:hover:bg-gray-600"
        />
      ) : (
        <Moon
          onClick={toggleTheme}
          size={40}
          className="hover:text-primary-500 tablet:block rounded-md p-2 text-violet-700 hover:bg-gray-300 dark:text-violet-400 dark:hover:bg-gray-600"
        />
      )}
    </>
  )
}

export default ThemeSelector
