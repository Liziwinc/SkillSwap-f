import type { FC } from 'react';
import styles from './ProgressScale.module.css';
import type { TProgressScaleProps } from './type';

export const ProgressScale: FC<TProgressScaleProps> = ({totalSteps, thisStep}) => {
    const steps = Array.from({length: totalSteps}, (_, index) => {
        return (
            <div key={index} className={`${styles.line} ${index < thisStep ? styles.done : styles.next}`}></div>
        )
    });
    
    return (
        <div className={styles.container}>
            <h2 className={`${styles.steps} ${styles.jost}`}>Шаг {thisStep} из {totalSteps}</h2>
            <div className={styles.scale}>
                {steps}
            </div>
        </div>
    );
};