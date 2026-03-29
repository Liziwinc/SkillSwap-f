import type { Meta, StoryObj } from '@storybook/react';
import PreviewCard from './PreviewCard';

const meta: Meta<typeof PreviewCard> = {
  title: 'Components/PreviewCard',
  component: PreviewCard,
  tags: ['autodocs'],
  argTypes: {
    onEdit: { action: 'onEdit' },
    onConfirm: { action: 'onConfirm' },
    onExchange: { action: 'onExchange' },
    onImageOverlayClick: { action: 'onImageOverlayClick' }
  }
};

export default meta;
type Story = StoryObj<typeof PreviewCard>;

const sampleImages = [
  'https://b0bcebf4-d767-420b-9f5a-cccfc5015c46.selstorage.ru/iblock/472/03hqhsxyo79gldivild8evlkezaf1vzm.jpg',
  'https://b0bcebf4-d767-420b-9f5a-cccfc5015c46.selstorage.ru/iblock/472/03hqhsxyo79gldivild8evlkezaf1vzm.jpg',
  'https://b0bcebf4-d767-420b-9f5a-cccfc5015c46.selstorage.ru/iblock/472/03hqhsxyo79gldivild8evlkezaf1vzm.jpg',
  'https://b0bcebf4-d767-420b-9f5a-cccfc5015c46.selstorage.ru/iblock/472/03hqhsxyo79gldivild8evlkezaf1vzm.jpg',
  'https://b0bcebf4-d767-420b-9f5a-cccfc5015c46.selstorage.ru/iblock/472/03hqhsxyo79gldivild8evlkezaf1vzm.jpg'
];

export const DefaultCard: Story = {
  args: {
    title: 'Игра на барабанах',
    category: 'Творчество и искусство / Музыка и звук',
    description:
      'Привет! Я играю на барабанах уже больше 10 лет           —от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры',
    imgArr: sampleImages,
    isModal: false
  }
};

export const ModalCard: Story = {
  args: {
    title: 'Игра на барабанах',
    category: 'Творчество и искусство / Музыка и звук',
    description:
      'Привет! Я играю на барабанах уже больше 10 лет           —от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры',
    imgArr: sampleImages,
    isModal: true
  }
};
