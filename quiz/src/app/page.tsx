import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import data from '@/data/data.json';
import { topicIcon } from "@/util/topicIcon";

const TOPICS = data.quizzes.map((item) => item.title);

export default function Home() {
  
  return (
    <main className={styles.main}>

      <div className="grid-container">
      
        <div className="left-half">
          <div className={styles.textPart}>
            <h1>Welcome to the <span>Frontend Quiz!</span></h1>
            <p>Pick a subject to get started.</p>
          </div>
        </div>
  
        <div className="right-half">
          {TOPICS.map((topic) => {
            const { src, bgColor } = topicIcon(topic);
            return (
              <Link href={`/${topic}`} key={topic}>
                <button className={styles.topicBtn}>
                  <div className='topic-container'>
                    <div className='topic-icon-wrapper' style={{ backgroundColor: bgColor}}>
                        <Image src={src} alt='' />
                    </div>
                    <h2>{topic}</h2>
                  </div>
                </button>
              </Link>
            )
          })}
        </div>

      </div>
      
    </main>
  );
}
