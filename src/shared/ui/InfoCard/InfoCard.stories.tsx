import type { Meta, StoryObj } from '@storybook/react';
import InfoCard from './InfoCard';
import Button from '../Button/Button';

const meta = {
  title: 'Shared/UI/InfoCard',
  component: InfoCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Карточка с изображением, заголовком, текстом и кнопками.'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof InfoCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithButtons: Story = {
  args: {
    imageSrc: '/images/error404.png',
    imageAlt: 'error404',
    title: 'Страница не найдена',
    text: 'К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже',
    buttons: (
      <>
        <Button className='outline'>Сообщить об ошибке</Button>
        <Button className='primary'>На главную</Button>
      </>
    )
  }
};

export const WithoutButtons: Story = {
  args: {
    imageSrc: '/images/light-bulb.png',
    imageAlt: 'light-bulb',
    title: 'С возвращением в SkillSwap!',
    text: 'Обменивайтесь знаниями и навыками с другими людьми'
  }
};