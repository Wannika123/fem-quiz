import { useEffect, useState } from "react"

export function useTheme() {
    const [theme, setTheme] = useState('');
    const [mounted, setMounted] = useState(false);

    const key = 'Theme';

    useEffect(() => {
        let theme = '';

        const themeData = window.localStorage.getItem(key)
        if (themeData) {
            theme = themeData
        } else {
            theme = window.matchMedia('(prefers-color-scheme: dark)').matches 
                ? 'dark'
                : 'light'    
        }
        
        setTheme(theme);
        localStorage.setItem(key, theme);
        document.body.classList.add(theme);
    }, [])

    useEffect(() => {
        if (!mounted) {
            setMounted(true)
            return
        }
        const oldTheme = (theme === 'light' ? 'dark' : 'light');

        localStorage.setItem(key, theme)
        document.body.classList.replace(oldTheme, theme);
    }, [theme])

    return [theme, setTheme] as [string, typeof setTheme]
}