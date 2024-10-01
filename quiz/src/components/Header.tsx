'use client'

import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { useTheme } from '@/hooks/useTheme';
import { topicIcon } from '@/util/topicIcon';
import Image from 'next/image';

export default function Header() {
    const path = usePathname();

    const [theme, setTheme] = useTheme();

    let topic: string | undefined;
    if (path !== '/') {
        topic = path.replace('/', '')
    }

    const { src, bgColor } = topicIcon(topic);

    return (
        <header className={styles.header}>
            { topic !== undefined && (
                <div className='topic-container'>
                    <div className='topic-icon-wrapper' style={{ backgroundColor: bgColor}}>
                        <Image src={src} alt='' />
                    </div>
                    <h2>{topic}</h2>
                </div>
            )}
            <div className={styles.toggleBtnsContainer}>
                <label htmlFor='light'>
                    <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="" d="M12 1.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 1 1-1.5 0v-1.5A.75.75 0 0 1 12 1.5Zm0 15a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0-1.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm9.75-2.25a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 1 0 0 1.5h1.5ZM12 19.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 1 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm-8.25-6.75a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 1 0 0 1.5h1.5Zm.969-8.031a.75.75 0 0 1 1.062 0l1.5 1.5a.751.751 0 0 1-1.062 1.062l-1.5-1.5a.75.75 0 0 1 0-1.062Zm1.062 14.562a.75.75 0 1 1-1.062-1.06l1.5-1.5a.75.75 0 1 1 1.062 1.06l-1.5 1.5Zm13.5-14.562a.75.75 0 0 0-1.062 0l-1.5 1.5a.751.751 0 0 0 1.062 1.062l1.5-1.5a.75.75 0 0 0 0-1.062Zm-1.062 14.562a.75.75 0 0 0 1.062-1.06l-1.5-1.5a.75.75 0 0 0-1.062 1.06l1.5 1.5Z"/></svg>
                </label>
                <div className={styles.toggleBtns}>
                    <input 
                        className={styles.lightRadio} 
                        type='radio' 
                        name='toggle-theme' 
                        id='light' 
                        value='light'
                        checked={theme === 'light'}
                        onChange={e => setTheme(e.target.value)}
                    />
                    <input 
                        className={styles.darkRadio} 
                        type='radio' 
                        name='toggle-theme' 
                        id='dark' 
                        value='dark'
                        checked={theme === 'dark'}
                        onChange={e => setTheme(e.target.value)}
                    />
                    <div className={styles.ball}></div>
                </div>
                <label htmlFor='dark'>
                    <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="" d="M11.775 4.522A7.5 7.5 0 1 1 4.898 16.09c2.104-.57 4.974-1.953 6.24-5.326.828-2.211.876-4.408.637-6.241ZM20.184 12a8.997 8.997 0 0 0-9.315-8.994.75.75 0 0 0-.713.888c.345 1.821.42 4.092-.424 6.342-1.2 3.201-4.203 4.26-6.115 4.606a.75.75 0 0 0-.542 1.066A9 9 0 0 0 20.184 12Z"/></svg>
                </label>
            </div>
        </header>
    )
}