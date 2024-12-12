import { FC, useState } from 'react';

import { isFormDisabled } from '@/app/utils/functions';

import { postSignUp } from '@/app/_data/api/authentication/post.sign.up';

import { useAlertStore } from '@/app/_data/store';
import { UserRole } from '@/app/_data/types/enums';
import { User } from '@/app/_data/types';

import { Form } from '@/app/_views/_ui/forms/Form';
import { Container } from '@/app/_views/_layouts/Container';
import { Flex } from '@/app/_views/_layouts/Flex';
import { Selection } from '@/app/_views/_ui/forms/inputs/Selection';
import { Input } from '@/app/_views/_ui/forms/inputs/Input';
import { Button } from '@/app/_views/_ui/forms/buttons/Button';
import cls from './index.module.scss';

type FormData = Pick<
  User,
  | 'first_name'
  | 'last_name'
  | 'paternal_name'
  | 'email'
  | 'phone_number'
  | 'password'
  | 'role'
>;

interface ValidForm {
  first_name: boolean;
  last_name: boolean;
  paternal_name: boolean;
  email: boolean;
  phone_number: boolean;
  password: boolean;
  role: boolean;
}

const initialForm = {
  first_name: '',
  last_name: '',
  paternal_name: '',
  email: '',
  phone_number: '',
  password: '',
  role: UserRole.USER,
};

const initialValidForm = {
  first_name: false,
  last_name: false,
  paternal_name: false,
  email: false,
  phone_number: false,
  password: false,
  role: false,
};

const SignUp: FC = () => {
  const { addAlert, removeAlert } = useAlertStore();
  const [focus, setFocus] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [isValid, setValid] = useState<ValidForm>(initialValidForm);

  const isDisabled = isFormDisabled(formData, isValid);

  const reset = () => {
    setFormData(initialForm);
    setValid(initialValidForm);
    removeAlert(0);
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = formData;
      postSignUp({ body })
        .then((res) => {
          if (res.detail && !res.message) {
            addAlert(`${res.detail}`, 'error');
            console.error(`Sign up Net Error >>> ${res.detail}`);
            return;
          } else {
            reset();
            addAlert('', 'info');
          }
        })
        .catch((err) => {
          addAlert(
            `Во время регистрации в системе произошла ошибка: ${err}.`,
            'error'
          );
          console.error(`Sign up Net Error >>> ${err}`);
        })
        .finally(() => {
          removeAlert(0);
        });
    } catch (err) {
      addAlert(
        `Во время регистрации в системе произошла ошибка: ${err}.`,
        'error'
      );
      console.error(`Sign up handler Error >>> ${err}`);
    }
  };

  return (
    <section className={cls.signUp} data-focus={focus}>
      <Container>
        <Flex justifyContent="center" alignItems="center">
          <div className={cls.frame}>
            <Form onSubmit={handleSubmit}>
              <Input
                id="last_name"
                type="words"
                label={'Фамилия'}
                placeholder={'Фамилия'}
                value={formData.last_name}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, last_name: value }))
                }
                isValid={(e) =>
                  setValid((prev) => ({ ...prev, last_name: !e }))
                }
              />
              <Input
                id="first_name"
                type="words"
                label={'Имя'}
                placeholder={'Имя'}
                value={formData.first_name}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, first_name: value }))
                }
                isValid={(e) =>
                  setValid((prev) => ({ ...prev, first_name: !e }))
                }
              />
              <Input
                id="paternal_name"
                type="words"
                label={'Отчество'}
                placeholder={'Отчество'}
                value={formData.paternal_name}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, paternal_name: value }))
                }
                isValid={(e) =>
                  setValid((prev) => ({ ...prev, paternal_name: !e }))
                }
              />
              <Input
                id="phoneNumber"
                type="phoneNumber"
                label={'Номер телефона'}
                placeholder={'Номер телефона'}
                clue="Вводится без кода страны (+7 или 8)."
                value={formData.phone_number}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, phone_number: value }))
                }
                isValid={(e) =>
                  setValid((prev) => ({ ...prev, phone_number: !e }))
                }
              />
              <Input
                id="email"
                type="email"
                label={'Электронная почта'}
                placeholder={'Электронная почта'}
                clue="Любой домен электронного адреса."
                value={formData.phone_number}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, phone_number: value }))
                }
                isValid={(e) =>
                  setValid((prev) => ({ ...prev, phone_number: !e }))
                }
              />
              <Input
                id="password"
                type="passwordAuth"
                label={'Пароль'}
                placeholder={'Пароль'}
                clue="Должен соответствовать требованиям безопасности."
                value={formData.password}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, password: value }))
                }
                isValid={(e) => setValid((prev) => ({ ...prev, password: !e }))}
              />
              <Selection
                label="Выберите роль пользователя: "
                clue="Root - полный доступ, Admin - CRUD камер, User - просмотр камер по доступу."
                options={Object.values(UserRole)}
                value={formData.role}
                onChange={(e) => setFormData((prev) => ({ ...prev, role: e }))}
              />
              <Flex>
                <Button type="submit" title="Создать" disabled={isDisabled}>
                  Создать
                </Button>
                <Button
                  type="reset"
                  title="Сбросить"
                  disabled={isDisabled}
                  onClick={reset}
                >
                  Сбросить
                </Button>
              </Flex>
            </Form>
          </div>
        </Flex>
      </Container>
    </section>
  );
};

export { SignUp };
