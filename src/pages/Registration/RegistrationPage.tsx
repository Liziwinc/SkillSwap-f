import { useEffect, useState } from "react"
import { ProgressScale } from "../../shared/ui//ProgressScale"
import styles from './RegistrationPage.module.css'
import { FirstStepRegistration } from "../../shared/ui/FirstStepRegistration"
import RegistrationInfo from "../../shared/ui/RegistrationInfo/RegistrationInfo"
import { ThirdStepRegistration } from "../../shared/ui/ThirdStepRegistration/ThirdStepRegistration"
import { SecondStepRegistration } from "../../shared/ui/SecondStepRegistration"
import type { TProfile } from "../../shared/utils/types"
import PreviewCard from "../../shared/ui/PreviewCard"
import Modal from "../../shared/ui/Modal/Modal"
import { useNavigate } from "react-router-dom"
import { createProfileThunk } from "../../slice/profileSlice"
import { useDispatch } from "../../shared/utils/store"
import Button from "../../shared/ui/Button/Button"

interface TCurrentStep {
    step: number;
    img: string;
    alt: string;
    title: string;
    description: string;
};

const stepData: TCurrentStep[] = [
    {
        step: 1,
        img: 'public/images/light-bulb.png',
        alt: 'картинка: лампочка',
        title: 'Добро пожаловать в SkillSwap!',
        description: 'Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми',
    },
    {
        step: 2,
        img: 'public/images/user-info.png',
        alt: 'картинка: лампочка',
        title: 'Расскажите немного о себе',
        description: 'Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена',
    },
    {
        step: 3,
        img: 'public/images/school-board.png',
        alt: 'картинка: лампочка',
        title: 'Укажите, чем вы готовы поделиться',
        description: 'Так другие люди смогут увидеть ваши предложения и предложить вам обмен!',
    },
];

interface ImageData {
  url: string;
  file: File;
};

export interface IAvatar {
  file: File | null;
  url: string;
};

export type TUserFirst = {
    email: string,
    password: string,
};

export type TUserSecond = {
    name: string,
    city: string,
    date: Date,
    gender: string,
    categoriesWantToLearn: string,
    subcategoriesWantToLearn: string[],
    avatar: IAvatar,
};

export type TUserThird = {
    skillCanTeachName: string,
    skillCanTeachCategory: string,
    skillCanTeachSubCategory: string,
    skillCanTeachDescription: string,
    imagesData: ImageData[],
};

export const Registration = () => {
    const [currentStep, setCurrentStep] = useState<TCurrentStep>(stepData[0]);
    const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
    const [newUserFirst, setNewUserFirst] = useState<TUserFirst | null>(null);
    const [newUserSecond, setNewUserSecond] = useState<TUserSecond | null>(null);
    const [newUserThird, setNewUserThird] = useState<TUserThird | null>(null);
    const [isCreate, setIsCreate] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (newUserThird) {
            openPrewiew();
        }
    }, [newUserThird]);
    
    const handleSubmitFirstStep = (email: string, password: string) => {
        setNewUserFirst({
            email: email,
            password: password,
        });
        setCurrentStep(stepData[currentStep.step]);
    };

    const handleSubmitSecondStep = 
    (avatar: IAvatar, name: string, gender: string, city: string, category: string, subcategory: string[], dateOfBirth: Date) => {
        setNewUserSecond ({
            avatar: avatar,
            name: name,
            gender: gender,
            city: city,
            categoriesWantToLearn: category,
            subcategoriesWantToLearn: subcategory,
            date: dateOfBirth,
        });
        setCurrentStep(stepData[currentStep.step]);
    };

    const handleSubmitThirdStep = (selectedCategoryId: string, subcategory: string, images: ImageData[], nameSkill: string, description: string) => {
        setNewUserThird({
            skillCanTeachName: nameSkill,
            skillCanTeachCategory: selectedCategoryId,
            skillCanTeachSubCategory: subcategory,
            skillCanTeachDescription: description,
            imagesData: images,
        });
    }

    const openPrewiew = () => {
        // здесь добавить открытие модалки с редактированием навыка
        setIsPreviewOpen(true);
    }

    const handlePrevStep = () => {
        // для того чтобы возвращаться на предыдущий шаг
        const prevStep = currentStep.step-2;
        setCurrentStep(stepData[prevStep]);
    };

    const handleCreateProfile = async () => {
        if (!newUserFirst || !newUserSecond || !newUserThird) {
            console.error('один из шагов не заполнен');
            return;
        }

        try {
            const userData: Omit<TProfile, 'id' | 'auth'> = {
                ...newUserFirst,
            ...newUserSecond,
            ...newUserThird,
            avatarUrl: newUserSecond.avatar.url,
            dateOfBirth: newUserSecond.date.toISOString(),
            images: newUserThird.imagesData.map(item => item.url),
            aboutMe: '',
            myLikeArr: []
            };

            const profile = await dispatch(createProfileThunk(userData));
            // Обрабатываем успешный результат
            console.log('Профиль создан:', profile);
            setIsPreviewOpen(false);
            setIsCreate(true);
        } catch (error) {
            // Обрабатываем ошибки
            console.error('Ошибка при создании профиля:', error);
        }
    };

    const handleEdit = () => {
        // закрыть форму, чтобы вносить изменения
        setIsPreviewOpen(false);
    };

    const handleImageOverlayClick = () => {
        console.log('handleImageOverlayClick');
    };

    const closeCreateModal = () => {
        navigate('/');
        setIsCreate(false);
    };
 
    return (
        <div className={styles.container}>
            <div className={styles.steps}>
                <ProgressScale totalSteps={3} thisStep={currentStep.step}/>
                <RegistrationInfo stepData={stepData[currentStep.step-1]}>
                    {
                        (currentStep.step === 1)
                        ? <FirstStepRegistration initialUserData={newUserFirst} handleFirstStep={handleSubmitFirstStep} />
                        : (currentStep.step === 2)
                            ? <SecondStepRegistration initialUserData={newUserSecond} handlePrevStep={handlePrevStep} handleSecondStep={handleSubmitSecondStep} />
                            : <ThirdStepRegistration initialUserData={newUserThird} handlePrevStep={handlePrevStep} handleThirdStep={handleSubmitThirdStep} />
                    } 
                </RegistrationInfo>
     
                {newUserThird && <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} title="" message="">
                    <PreviewCard
                        isModal={true}
                        title={newUserThird.skillCanTeachName}
                        category={newUserThird.skillCanTeachCategory}
                        subcategory={newUserThird.skillCanTeachSubCategory}
                        description={newUserThird.skillCanTeachDescription}
                        imgArr={newUserThird.imagesData}
                        onConfirm={handleCreateProfile}
                        onEdit={handleEdit}
                        onImageOverlayClick={handleImageOverlayClick}
                    />
                </Modal>
                }

                {isCreate && 
                    <Modal isOpen={isCreate} onClose={closeCreateModal} title="" message="">
                        <div className={styles.modal}>
                            <img src="src/assets/icons/doneModal.svg" className={styles.img}/>
                            <h2>Ваше предложение создано</h2>
                            <p>Теперь вы можете предложить обмен</p>
                            <Button className="primary" onClick={closeCreateModal} classNameNew={styles.buttonDone}>Готово</Button>
                        </div>
                    </Modal>
                }
            </div>
        </div>
    )
}

export default RegistrationInfo;