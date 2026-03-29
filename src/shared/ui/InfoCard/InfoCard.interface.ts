import type { ReactNode } from 'react';

export interface InfoCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  text: string;
  buttons?: ReactNode;
  className?: string;
}