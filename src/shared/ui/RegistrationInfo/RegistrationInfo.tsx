import React, { useEffect, type ReactNode } from 'react';
import styles from './RegistrationInfo.module.css'

interface TCurrentStep {
    img: string;
    alt: string;
    title: string;
    description: string;
}

interface RegistrationInfoProps {
    stepData: TCurrentStep;
    children: ReactNode;
}

const RegistrationInfo: React.FC<RegistrationInfoProps> = ({ stepData, children }) => {
    return (
        <div className={styles.info}>
            {children}
            <div className={styles.imgContainer}>
                <img 
                    className={styles.img} 
                    src={stepData.img} 
                    alt={stepData.alt} 
                />
                <h2>{stepData.title}</h2>
                <p className={styles.description}>{stepData.description}</p>
            </div>
        </div>
    );
};

export default RegistrationInfo;