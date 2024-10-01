import { topicIcon } from "@/util/topicIcon";
import Image from "next/image";
import styles from './TotalScore.module.css'
import { useContext, useEffect } from "react";
import { TuneContext } from "@/context/TuneContext";

type TotalScoreType = {
    score: number
    questionsCount: number
    topic: string
}

export default function TotalScore({ score, questionsCount, topic }: TotalScoreType) {
    const { src, bgColor } = topicIcon(topic);

    const { celebratingTune, mourningTune } = useContext(TuneContext);

    useEffect(() => {
        if (score === questionsCount) {
            celebratingTune();
        }    
        if (score === 0) {
            mourningTune();
        }   
    }, [])

    return (
        <div className={styles.container}>
            <div className='topic-container'>
                <div className='topic-icon-wrapper' style={{ backgroundColor: bgColor}}>
                    <Image src={src} alt='' />
                </div>
                <h2>{topic}</h2>
            </div>
            <div className={styles.score}>{score}</div>
            <p>out of {questionsCount}</p>
        </div>
    )
}