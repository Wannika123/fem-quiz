import { useEffect, useMemo, useRef } from 'react'
import Image from 'next/image'

import iconCorrect from '@/assets/images/icon-correct.svg';
import iconWrong from '@/assets/images/icon-incorrect.svg';

import styles from './OptionsWrapper.module.css'

type OptionsWrapperType = {
    index: number
    options: string[]
    correctAnswer: string
    selectedChoice: string
    updateChoice: (value: string) => void
    submitted: boolean
    showWarning: boolean
}

type KeyboardEvent = {
    key: string;
}

export default function OptionsWrapper({ 
    index,
    options, 
    correctAnswer, 
    selectedChoice, 
    updateChoice,
    submitted,
    showWarning
}: OptionsWrapperType) {

    let randomOrder: number[] = useMemo(() => {
        if (index !== 0) {
            let arr = [];
            for (let i = 0; i < options.length; i++) {
                if (Math.random() > 0.5) {
                    arr.push(i)
                } else {
                    arr.unshift(i)
                }
            } 
            return arr
        } else {
            return [0, 1, 2, 3]
        }
        
    }, [correctAnswer])

    const aRef = useRef<HTMLInputElement>(null);
    const bRef = useRef<HTMLInputElement>(null);
    const cRef = useRef<HTMLInputElement>(null);
    const dRef = useRef<HTMLInputElement>(null);

    const refArr = [aRef, bRef, cRef, dRef];

    const listeningTo = (event: KeyboardEvent) => {
        if (event.key === 'a' || event.key === 'A') {
            if (aRef.current && !submitted) {
                updateChoice(aRef.current.value)
            }
        }
        if (event.key === 'b' || event.key === 'B') {
            if (bRef.current && !submitted) {
                updateChoice(bRef.current.value)
            }
        }
        if (event.key === 'c' || event.key === 'C') {
            if (cRef.current && !submitted) {
                updateChoice(cRef.current.value)
            }
        }
        if (event.key === 'd' || event.key === 'D') {
            if (dRef.current && !submitted) {
                updateChoice(dRef.current.value)
            }
        }
    }

    useEffect(() => {

        window.addEventListener('keydown', listeningTo); 
        
        return () => window.removeEventListener('keydown', listeningTo);
    }, [submitted, showWarning])

    return (
        <div 
            className={styles.container} 
            key={correctAnswer}
        >
            {randomOrder.map((random, i) => (                   
                <label 
                    key={i}
                    
                    className={submitted ? styles.submitted : undefined}
                >  
                    <div>
                        <div className={styles.smallBox}>{String.fromCharCode(65 + i)}</div>
                    </div>                   
                    <span className='fade-in'>{options[random]}</span>
                    <input 
                        type='radio' 
                        value={options[random]}
                        name='choice'
                        className={options[random] === correctAnswer ? styles.correct : styles.wrong}
                        checked={options[random] === selectedChoice}
                        onChange={e => updateChoice(e.target.value)}
                        ref={refArr[randomOrder[i]]}
                    />
                    <Image 
                        src={options[random] === correctAnswer ? iconCorrect : iconWrong}
                        alt=''
                    />
                </label>              
            ))}
        </div>
    )
}