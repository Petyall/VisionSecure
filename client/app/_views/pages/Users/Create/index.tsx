import { FC, useState } from "react";

import { isFormDisabled } from "@/app/utils/functions";

import { api } from "@/app/_data/api";

import { User } from "@/app/_data/types";
import { UserRole } from "@/app/_data/types/enums";
import { useAlertStore, useCameraStore } from "@/app/_data/store";

import { Container } from "@/app/_views/_layouts/Container"
import { Title } from "@/app/_views/_ui/typography/Title";
import { Flex } from "@/app/_views/_layouts/Flex";
import { Form } from "@/app/_views/_ui/forms/Form";
import { Input } from "@/app/_views/_ui/forms/inputs/Input";
import { Button } from "@/app/_views/_ui/forms/buttons/Button";

import cls from './index.module.scss';

type FormData = Pick<
    User,
    | 'first_name'
    | 'last_name' 
    | 'paternal_name'
    | 'email'
    | 'phone_number'
    | 'role'
    | 'password'
>;

interface ValidForm {
    first_name: boolean;
    last_name: boolean;
    paternal_name: boolean;
    email: boolean;
    phone_number: boolean;
    role: boolean;
    password: boolean;
};

const initialForm = {
    first_name: '',
    last_name: '',
    paternal_name: '',
    email: '',
    phone_number: '',
    role: UserRole.USER,
    password: '',
};

const initialValidForm = {
    first_name: false,
    last_name: false,
    paternal_name: false,
    email: false,
    phone_number: false,
    role: false,
    password: false,
};

const UserCreate: FC = () => {
    const { addAlert, removeAlert } = useAlertStore();
    const { setUserCameras } = useCameraStore();
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
            const addUser = api.authentication.signUp({ body });
            addUser.then(response => {
                // if(response.detail && !response.cameras) {
                //     addAlert(`${response.detail}`, 'error');
                //     console.error(`Create Net Error >>> ${response.detail}`);
                //     return;
                // } else {
                //     setAll(response?.cameras);
                //     addAlert(`Пользователь ${formData.last_name} ${formData.first_name[0]}. ${formData.paternal_name[0]}. создана!`, 'info');
                //     reset();
                // }
            });
            addUser.catch(err => {
                addAlert(
                    `Во время создания в системе произошла ошибка: ${err}.`,
                    'error'
                );
                console.error(`Create Net Error >>> ${err}`);
            });
            addUser.finally(() => {
                removeAlert(0);
            });
        } catch (err) {
            addAlert(
                `Во время создания произошла ошибка: ${err}.`,
                'error'
            );
            console.error(`Create handler Error >>> ${err}`);
        }
    }

    return (
        <section className={cls.userCreate} data-focus={focus}>
            <Container>
                <article>
                    <Flex flexDirection="column" gap="2rem">
                        <Flex justifyContent="space-between">
                            <Title type="h3">Регистрация пользователя</Title>
                        </Flex>
                        <Form onSubmit={handleSubmit}>
                            <Input
                                id="last_name"
                                type="text"
                                label={'Фамилия'}
                                placeholder={'Фамилия'}
                                autoFocus
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
                    </Flex>
                </article>
            </Container>
        </section>
    );
}

export { UserCreate };