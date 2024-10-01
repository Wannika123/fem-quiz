import styles from './ProgressBar.module.css'

type ProgressBarType = {
    index: number
    questionsCount: number
}

export default function ProgressBar({ index, questionsCount }: ProgressBarType) {

    return (
        <div className={styles.container}>
            <div style={{ width: `calc(100% / ${questionsCount} * ${index + 1}` }}></div>
        </div>
    )
}