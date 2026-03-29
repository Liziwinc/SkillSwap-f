import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { ru } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.css';
import './datepicker-overrides.css';
import InputDateAdapter from "./CustomInputDateAdapter";

interface CalendarContainerProps {
  className?: string;
  children: React.ReactNode;
}

interface DatePickerUIProps {
  selectedDate?: Date | null;
  onDateChange?: (date: Date | null) => void;
  profileStyle?: boolean;
}

export const DatePickerUI = ({
  selectedDate: propDate,
  onDateChange,
  profileStyle = false
}: DatePickerUIProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(propDate || null);
  const [tempDate, setTempDate] = useState<Date | null>(propDate || null);
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<DatePicker>(null);

  useEffect(() => {
    setSelectedDate(propDate || null);
    setTempDate(propDate || null);
  }, [propDate]);

  const handleInputClick = () => {
    setIsOpen(true);
    setTempDate(selectedDate);
  };

  const handleCancel = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(false);
    }
    setTempDate(selectedDate);
    setIsOpen(false);
  };

  const handleSelect = () => {
    setSelectedDate(tempDate);
    onDateChange?.(tempDate);
    setIsOpen(false);
  };

  const CustomCalendarContainer: React.FC<CalendarContainerProps> = ({ className, children }) => (
    <div className={className}>
      {children}
      <div className={styles.footer}>
        <button
          type="button"
          onClick={handleCancel}
          className={styles.cancelBtn}
        >
          Отменить
        </button>
        <button
          type="button"
          onClick={handleSelect}
          className={styles.selectBtn}
        >
          Выбрать
        </button>
      </div>
    </div>
  );

  return (
    <div className={profileStyle ? styles.profileWrapper : styles.wrapper}>
      <DatePicker
        ref={datePickerRef}
        selected={tempDate}
        onChange={(date: Date | null) => setTempDate(date)}
        locale={ru}
        dateFormat="dd.MM.yyyy"
        placeholderText="Выберите дату"
        minDate={new Date(1900, 0, 1)}
        maxDate={new Date()}
        showMonthDropdown
        showYearDropdown
        scrollableYearDropdown
        scrollableMonthYearDropdown
        yearDropdownItemNumber={100}
        popperPlacement="bottom-start"
        showPopperArrow={false}
        calendarClassName={`${styles.customCalendar} ${profileStyle ? styles.profileCalendar : ''}`}
        fixedHeight
        open={isOpen}
        onClickOutside={() => {
          setTempDate(selectedDate);
          setIsOpen(false);
        }}
        calendarContainer={CustomCalendarContainer}
        onInputClick={handleInputClick}
        shouldCloseOnSelect={false}
        onCalendarClose={() => setTempDate(selectedDate)}
        customInput={
          <InputDateAdapter
            placeholder="Выберите дату"
            profileStyle={profileStyle}
          />
        }
      />
    </div>
  );
};