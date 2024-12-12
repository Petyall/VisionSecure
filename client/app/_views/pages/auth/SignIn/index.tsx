import { FC, FormEvent, useState } from 'react';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

import { isFormDisabled } from '@/app/utils/functions';
import { requestToRegistrationMailForm } from '@/app/_data/urls';
import { api } from '@/app/_data/api';
import { User } from '@/app/_data/types';
import { useAlertStore, useUserStore } from '@/app/_data/store';

import { Form } from '@/app/_views/_ui/forms/Form';
import { Container } from '@/app/_views/_layouts/Container';
import { Flex } from '@/app/_views/_layouts/Flex';
import { Input } from '@/app/_views/_ui/forms/inputs/Input';
import { Button } from '@/app/_views/_ui/forms/buttons/Button';
import { Text } from '@/app/_views/_ui/typography/Text';

import cls from './index.module.scss';

type FormData = Pick<User, 'email' | 'password'>;

interface ValidForm {
  email: boolean;
  password: boolean;
}

const initialForm = {
  email: 'user@example.com',
  password: 'string',
};

const initialValidForm = {
  email: false,
  password: false,
};

const SignIn: FC = () => {
  const router = useRouter();
  const { setAuth } = useUserStore();
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    removeAlert(0);

    try {
      const response = await api.authentication.signIn(formData);

      if (response.detail && !response.access_token) {
        deleteCookie('access_token');
        setAuth(false);
        addAlert(`Ошибка: ${response.detail}`, 'error');
        console.error(`Sign in Error >>> ${response.detail}`);
        return;
      }

      setCookie('access_token', response.access_token);
      setAuth(true);
      addAlert('Успешный вход в систему', 'info');
      reset();

      router.push('/');
    } catch (err) {
      const error = err as Error;
      addAlert(
        `Во время входа в систему произошла ошибка: ${error.message}`,
        'error'
      );
      console.error(`Sign in Error >>> ${error.message}`);
    }
  };

  return (
    <section className={cls.signIn} data-focus={focus}>
      <Container>
        <Flex flexGrow={1} justifyContent="center" alignItems="center">
          <div className={cls.frame}>
            <Form onSubmit={handleSubmit}>
              <Input
                autoFocus
                id="login"
                type="email"
                label={'Электронная почта'}
                placeholder={'Электронная почта'}
                clue="которую вы указали при регистрации"
                value={formData.email}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, email: value }))
                }
                isValid={(e) => setValid((prev) => ({ ...prev, email: !e }))}
              />
              <Input
                id="password"
                type="passwordAuth"
                label={'Пароль'}
                placeholder={'Пароль'}
                value={formData.password}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, password: value }))
                }
                isValid={(e) => setValid((prev) => ({ ...prev, password: !e }))}
              />
              <Button type="submit" title="Войти" disabled={isDisabled}>
                Войти
              </Button>
              <hr />
              <Text>
                Забыли пароль? <br />
                Отправьте запрос на восстановление{' '}
                <a href={requestToRegistrationMailForm}>по почте</a>
              </Text>
            </Form>
          </div>
        </Flex>
      </Container>
    </section>
  );
};

export { SignIn };
