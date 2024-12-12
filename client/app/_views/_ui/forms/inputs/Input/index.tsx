'use client';
import { FC, useEffect, useState, useRef } from 'react';
import {
  formatPhoneNumber,
  formatAmount,
  formatDateNumber,
  formatNumber,
} from '@/app/utils/formats';
import {
  validationPhone,
  validationEmail,
  validationPassword,
  validationPasswordAuth,
  validationDate,
  validationWords,
  validationAmount,
  validationDefault,
  validationAnyDate,
} from '@/app/utils/validations';
import { EyeIcon, EyeCloseIcon, CloseIcon } from '../../../svg_dynamic';
import cls from './index.module.scss';

interface InputProps {
  id: string;
  type:
    | 'phoneNumber'
    | 'email'
    | 'password'
    | 'passwordAuth'
    | 'date'
    | 'anyDate'
    | 'amount'
    | 'words'
    | 'text'
    | 'number';
  placeholder?: string;
  label?: string;
  clue?: string;
  readonly?: boolean;
  autoFocus?: boolean;
  autoComplete?: 'off' | 'on' | 'new-password';
  maxLength?: number;
  disabled?: boolean;
  value?: string;
  onChange?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  isValid?: (result: boolean) => void;
}

const formatDefault = (text: string) => text;

const typeInput = {
  phoneNumber: {
    type: 'tel',
    format: formatPhoneNumber,
    valid: validationPhone,
  },
  email: {
    type: 'email',
    format: formatDefault,
    valid: validationEmail,
  },
  password: {
    type: 'password',
    format: formatDefault,
    valid: validationPassword,
  },
  passwordAuth: {
    type: 'password',
    format: formatDefault,
    valid: validationPasswordAuth,
  },
  date: {
    type: 'tel',
    format: formatDateNumber,
    valid: validationDate,
  },
  anyDate: {
    type: 'tel',
    format: formatDateNumber,
    valid: validationAnyDate,
  },
  amount: {
    type: 'tel',
    format: formatAmount,
    valid: validationAmount,
  },
  words: {
    type: 'text',
    format: formatDefault,
    valid: validationWords,
  },
  text: {
    type: 'text',
    format: formatDefault,
    valid: validationDefault,
  },
  number: {
    type: 'text',
    format: formatNumber,
    valid: validationDefault,
  },
};

const Input: FC<InputProps> = ({
  id,
  type = 'text',
  placeholder,
  label,
  clue,
  autoFocus,
  autoComplete = 'off',
  readonly,
  maxLength,
  disabled,
  value,
  onChange,
  onFocus,
  onBlur,
  isValid,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [valid, setValid] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>(value || '');
  const [toggleEye, setToggleEye] = useState<boolean>(false);
  const TypeInput = typeInput[type];

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    onChange && onChange(currentValue);
    isValid && isValid(!!TypeInput.valid(currentValue));

    setCurrentValue(typeInput[type].format(currentValue));
  }, [TypeInput, currentValue, type]);

  useEffect(() => {
    setCurrentValue(value || '');
    if (value?.length == 0) {
      setValid(false);
    }
  }, [value]);

  return (
    <div
      className={cls.inputWrapper}
      data-error={valid && !!TypeInput.valid(currentValue)}
    >
      {label && (
        <label className={cls.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={cls.input}>
        <input
          ref={inputRef}
          id={id}
          name={`${id}_${type}`}
          value={currentValue}
          placeholder={placeholder}
          type={toggleEye ? 'text' : typeInput[type].type}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          readOnly={readonly}
          maxLength={maxLength}
          disabled={disabled}
          onChange={(e) => {
            const text = e.target.value;
            setCurrentValue(typeInput[type].format(text));
          }}
          onFocus={() => {
            onFocus && onFocus();
            setValid(false);
          }}
          onBlur={() => {
            onBlur && onBlur();
            isValid && setValid(true);
          }}
        />
        <div className={cls.controls}>
          {type === 'password' ||
            (type === 'passwordAuth' && (
              <div
                className={cls.eyeButton}
                data-close={!!currentValue.length}
                onClick={() => setToggleEye((prev) => !prev)}
              >
                {toggleEye ? <EyeCloseIcon /> : <EyeIcon />}
              </div>
            ))}
          {currentValue.length ? (
            <div
              className={cls.closeButton}
              onClick={() => setCurrentValue('')}
            >
              <CloseIcon />
            </div>
          ) : null}
        </div>
      </div>
      {valid && TypeInput.valid(currentValue) && !disabled ? (
        <span className={cls.error}>{TypeInput.valid(currentValue)}</span>
      ) : (
        clue && <span className={cls.clue}>{clue}</span>
      )}
    </div>
  );
};

export { Input };
