import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import ArrowIcon from '../../../assets/icons/chevron-right.svg';
import ClockIcon from '../../../assets/icons/clock.svg';
import EditIcon from '../../../assets/icons/edit.svg';
import SortIcon from '../../../assets/icons/sort.svg';

const meta = {
  title: 'Shared/UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Многофункциональный компонент кнопки с поддержкой иконок, toggle режима и различных стилей.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline'],
      description: 'Стиль кнопки'
    },
    children: {
      control: { type: 'text' },
      description: 'Содержимое кнопки'
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Позиция иконки'
    },
    toggleMode: {
      control: { type: 'boolean' },
      description: 'Включить режим переключения'
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary кнопка',
    className: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary кнопка',
    className: 'secondary'
  }
};

export const Outline: Story = {
  args: {
    children: 'Outline кнопка',
    className: 'outline'
  }
};

export const WithRealIcons: Story = {
  args: {
    children: 'Primary кнопка',
    className: 'primary'
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '200px'
      }}
    >
      <Button className='secondary' icon={<ArrowIcon />} iconPosition='right'>
        Смотреть все
      </Button>
      <Button className='outline'>
        Войти
      </Button>
      <Button className='outline'>
        Назад
      </Button>
      <Button className='primary'>
        Зарегистрироваться
      </Button>
      <Button className='primary'>
        Продолжить
      </Button>
      <Button className='primary'>
        Войти
      </Button>
      <Button className='primary'>
        Предложить обмен
      </Button>
      <Button className='primary'>
         Готово
      </Button>
      <Button className='primary'>
        Подробнее
      </Button>
      <Button className='secondary' icon={<SortIcon />} iconPosition='left'>
        Сначала новые
      </Button>
      <Button className='primary' icon={<SortIcon />}>
        Сортировать
      </Button>
      <Button className='secondary' icon={<EditIcon />} iconPosition='right'>
        Редактировать
      </Button>
      <Button className='outline' icon={<ClockIcon />} iconPosition='left'>
        Обмен предложен
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Кнопки с реальными иконками проекта'
      }
    }
  }
};

export const ToggleWithIcons: Story = {
  args: {
    children: 'Сортировка',
    className: 'outline',
    icon: <SortIcon />,
    toggleMode: true,
    toggledChildren: 'Отсортировано',
    toggledIcon: <ArrowIcon />,
    toggledClassName: 'primary'
  }
};

export const AllVariants: Story = {
  args: {
    children: 'Primary кнопка',
    className: 'primary'
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '300px'
      }}
    >
      <Button className='primary'>Primary</Button>
      <Button className='secondary'>Secondary</Button>
      <Button className='outline'>Outline</Button>
      <Button className='primary' icon={<ClockIcon />}>
        С иконкой
      </Button>
      <Button
        className='outline'
        toggleMode={true}
        toggledClassName='primary'
        toggledChildren='Активно!'
      >
        Toggle кнопка
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Все варианты кнопок в одном месте'
      }
    }
  }
};
