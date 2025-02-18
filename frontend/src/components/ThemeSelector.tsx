import { useLocalStorage } from 'hooks/hooks'

import { Sun, Moon } from 'lucide-react'

function ThemeSelector() {
  const [theme, setTheme] = useLocalStorage<string>('theme', 'light')

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.querySelector('html')?.setAttribute('data-theme', 'light')
      setTheme('light')
    } else {
      document.querySelector('html')?.setAttribute('data-theme', 'dark')
      setTheme('dark')
    }
  }
  return (
    <>
      {theme === 'light' ? (
        <Sun
          onClick={toggleTheme}
          size={40}
          className="text-warning hover:bg-base-300 rounded-md p-2"
        />
      ) : (
        <Moon
          onClick={toggleTheme}
          size={40}
          className="text-info-content hover:bg-base-300 rounded-md p-2"
        />
      )}
    </>
  )
}

export default ThemeSelector
