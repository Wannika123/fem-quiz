'use client';

import data from '@/data/data.json'
import { notFound } from 'next/navigation';
import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import iconError from '@/assets/images/icon-error.svg';
import OptionsWrapper from '@/components/topic/OptionsWrapper';
import ProgressBar from '@/components/topic/ProgressBar';
import TotalScore from '@/components/topic/TotalScore';

import styles from './page.module.css'
import { TuneContext } from '@/context/TuneContext';

export default function TopicPage({ params }: { params: { topic: string }}) {
    const topic = params.topic;
    const item = data.quizzes.find(item => item.title === topic)

    if (!item) {
        notFound();
    }

    const { correctAnswerTune, wrongAnswerTune } = useContext(TuneContext)

    const [index, setIndex] = useState(0);     // current question index
    const [score, setScore] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [finished, setFinished] = useState(false);

    const questionsCount = item.questions.length;
    const correctAnswer = item.questions[index].answer;
    
    const updateChoice = (value: string) => {
        if (submitted) {
            return;
        }
        setSelectedChoice(value);
        if (showWarning) {
            setShowWarning(false);
        }
    }

    const checkAnswer = () => {   
        if (selectedChoice === correctAnswer) {
            setScore(prevState => prevState + 1);
            correctAnswerTune();
        } else {
            wrongAnswerTune();
        }
    }

    const submitAnswer = () => {
        if (!selectedChoice) {
            setShowWarning(true)
            return;
        }
        setSubmitted(true);
        checkAnswer();
    }

    const nextQuestion = () => {
        if (index === questionsCount - 1) {
            setFinished(true);
            return;
        }
        setIndex(state => state + 1);
        setSubmitted(false);
        setSelectedChoice('');
    }

    return (
        <main className={styles.main}>
            <div className='grid-container'>
                <div className='left-half'>
                    <div className={styles.top}>Question {index + 1} of {questionsCount}</div>
                    { item.questions.map((q, i) => (
                        <h2 key={i} style={ i === index ? { display: 'block'} : { display: 'none'}}>
                            <span className='fade-in'>{q.question}</span>
                        </h2>
                    ))} 
                    <ProgressBar index={index} questionsCount={questionsCount} />                 
                </div>
                <div className='right-half'>
                    { !finished 
                        ? <OptionsWrapper
                            index={index}
                            options={item.questions[index].options}
                            correctAnswer={item.questions[index].answer}
                            selectedChoice={selectedChoice}
                            updateChoice={updateChoice}
                            submitted={submitted}
                            showWarning={showWarning}
                        />
                        : <TotalScore 
                            score={score} 
                            questionsCount={questionsCount} 
                            topic={item.title}
                        />
                    }
                    { finished
                        ? <Link href='/'><button>Play Again</button></Link>
                        : submitted
                            ? <button onClick={nextQuestion}>Next Question</button>
                            : (
                                <>
                                    <button onClick={submitAnswer}>Submit Answer</button> 
                                    { showWarning && (
                                        <div className={styles.warningTextContainer}>
                                            <div className={styles.warningText}>
                                                <Image src={iconError} alt='' />
                                                Please select an answer
                                            </div>
                                        </div>
                                    )}                              
                                </>
                            )
                    }
                </div>
            </div>
        </main>
    )
}