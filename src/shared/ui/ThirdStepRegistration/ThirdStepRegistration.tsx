import { useEffect, useRef, useState, type ChangeEvent} from 'react';
import rawSkills from '../../../../src/assets/db/skills.json';
import Button from '../Button/Button';
import { Dropdown } from '../Dropdown';
import ImageInput from '../ImageInput';
import Input from '../Input/Input';
import styles from './ThirdStepRegistration.module.css';
import type { TUserThird } from '../../../pages/Registration/RegistrationPage';
export interface Skill {
  id: string;
  name: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: Skill[];
}
const skills = rawSkills as SkillCategory[];

export interface ImageData {
  url: string;
  file: File;
}

interface ThirdStepRegistrationProps {
  initialUserData: TUserThird | null;
  handlePrevStep: () => void,
  handleThirdStep: (selectedCategoryId: string, subcategory: string, images: ImageData[], nameSkill: string, description: string) => void,
}

export const ThirdStepRegistration = ({
  initialUserData,
  handlePrevStep,
  handleThirdStep,
}: ThirdStepRegistrationProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialUserData?.skillCanTeachCategory ? initialUserData?.skillCanTeachCategory : '');
  const [subcategory, setSubcategory] = useState<string>(initialUserData?.skillCanTeachSubCategory ? initialUserData?.skillCanTeachSubCategory : '');
  const [images, setImages] = useState<ImageData[]>(initialUserData?.imagesData ? initialUserData.imagesData : []);
  const [nameSkill, setNameSkill] = useState<string>(initialUserData?.skillCanTeachName ? initialUserData?.skillCanTeachName : '');
  const [description, setDescription] = useState<string>(initialUserData?.skillCanTeachDescription ? initialUserData?.skillCanTeachDescription : '');
  
  const categoryOptions = skills.map((category) => ({
    label: category.name,
    value: category.id
  }));

  const subcategoryOptions = skills
    .filter((cat) => selectedCategoryId.includes(cat.id))
    .flatMap((cat) =>
      cat.skills.map((skill) => ({
        label: skill.name,
        value: skill.id
      }))
    );

  const handleImageChange = (files: FileList | null) => {
    if (!files) return;
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
    const newImages = Array.from(files).filter(file => {
      return acceptedTypes.includes(file.type);
    }).map(file => ({
      url: URL.createObjectURL(file),
      file: file
    }));
    
    setImages(prevImages => [...prevImages, ...newImages]);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleNameSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameSkill(e.target.value);
  };

  const removeImage = (indexToRemove: number) => {
    const urlToRemote = images.find((_, index) => index === indexToRemove);
    if (urlToRemote) URL.revokeObjectURL(urlToRemote.url);
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // здесь добавить вызов функции сохранения заполненных полей в новом юзере
    handleThirdStep(selectedCategoryId, subcategory, images, nameSkill, description);
  };

  useEffect(() => {
    return () => {
      images.forEach(({ url }) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [images]);

  return (
    <form
      ref={formRef}
      data-ss2
      onSubmit={handleSubmit}
    >
      <div className={styles.wrapper}>
        <div className={styles.fieldGroup}>
          <label className={styles.labelText}>Название навыка</label>
          <Input
            placeholder='Введите название вашего навыка'
            value={nameSkill}
            onChange={handleNameSkillChange}
            className={styles.customInput}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.labelText}>Категория навыка</label>
          <div className={styles.dropdownWrapper}>
            <Dropdown
              placeholder='Выберите категорию навыка'
              value={selectedCategoryId}
              onChange={(val) => setSelectedCategoryId(val as string)}
              options={categoryOptions}
              checkbox={true}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.labelText}>Подкатегория навыка</label>
          <div className={styles.dropdownWrapper}>
            <Dropdown
              placeholder='Выберите подкатегорию навыка'
              value={subcategory}
              onChange={(val) => setSubcategory(val as string)}
              options={subcategoryOptions}
              checkbox={true}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.labelText}>Описание</label>
          <textarea
            placeholder='Коротко опишите, чему можете научить'
            value={description}
            onChange={handleDescriptionChange}
            className={`${styles.customInput} ${styles.textarea}`}
          />
        </div>

        <div className={styles.imageInput}>
          <ImageInput
            id='skill-image'
            onChange={handleImageChange}
            multiple={true}
          />
          <div className={styles.previewContainer}>
            {images.map((file, index) => (
              <div key={index} className={styles.previewItem}>
                <img
                  key={index}
                  src={URL.createObjectURL(file.file)}
                  alt={`preview-${index}`}
                  className={styles.previewImage}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className={styles.removeButton}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.buttonRow}>
          <Button onClick={handlePrevStep} className='outline' width={208}>
            Назад
          </Button>
          <Button
            disabled={!selectedCategoryId || !subcategory || images.length < 1 || !nameSkill || !description}
            type="submit"
            classNameNew={(!selectedCategoryId || !subcategory || images.length < 1 || !nameSkill || !description) ? `${styles.disabledButton}` : ''}
            className='primary'
            width={208}
          >
            Продолжить
          </Button>
        </div>
      </div>
    </form>
  );
};
