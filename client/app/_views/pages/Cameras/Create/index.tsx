import { FC, useState } from "react";

import { isFormDisabled } from "@/app/utils/functions";
import { updateStreamUrlField } from "@/app/utils/helpers";

import { api } from "@/app/_data/api";

import { Camera, StreamUrl } from "@/app/_data/types";
import { useAlertStore, useCameraStore } from "@/app/_data/store";

import { Container } from "@/app/_views/_layouts/Container"
import { Title } from "@/app/_views/_ui/typography/Title";
import { Flex } from "@/app/_views/_layouts/Flex";
import { Form } from "@/app/_views/_ui/forms/Form";
import { Input } from "@/app/_views/_ui/forms/inputs/Input";
import { Button } from "@/app/_views/_ui/forms/buttons/Button";

import cls from './index.module.scss';
import { useCameras } from "@/app/hooks";


type FormData = Pick<
    Camera,
    | 'name'
    | 'stream_url'
    | 'location'
>;

interface ValidForm {
    name: boolean;
    stream_url: boolean;
    location: boolean;
};

const initialForm = {
    name: '',
    stream_url: '',
    location: '',
};

const initialValidForm = {
    name: false,
    stream_url: false,
    location: false,
};

const CameraCreate: FC = () => {
    const { addAlert, removeAlert } = useAlertStore();
    const { isLoading, fetchAddCamera } = useCameras();
    const [focus, setFocus] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>(initialForm);
    const [isValid, setValid] = useState<ValidForm>(initialValidForm);

    const isDisabled = isFormDisabled(formData, isValid);

    const reset = () => {
        setFormData(initialForm);
        setValid(initialValidForm);
        removeAlert(0);
    };

    const handleStreamUrlChange = <K extends keyof StreamUrl>(key: K, value: StreamUrl[K]) => {
        setFormData((prev) => updateStreamUrlField(prev, key, value));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const body = formData;
            fetchAddCamera({ body, reset });
        } catch (err) {
            addAlert(
                `Во время создания произошла ошибка: ${err}.`,
                'error'
            );
            console.error(`Create handler Error >>> ${err}`);
        }
    }

    return (
        <section className={cls.cameraCreate} data-focus={focus}>
            <Container>
                <article>
                    <Flex flexDirection="column" gap="2rem">
                        <Flex justifyContent="space-between">
                            <Title type="h3">Создание камеры</Title>
                        </Flex>
                        <Form onSubmit={handleSubmit}>
                            <Input
                                id="name"
                                type="text"
                                label={'Название'}
                                placeholder={'Название'}
                                value={formData.name}
                                onFocus={() => setFocus(true)}
                                onBlur={() => setFocus(false)}
                                onChange={(value) =>
                                    setFormData((prev) => ({ ...prev, name: value }))
                                }
                                isValid={(e) =>
                                    setValid((prev) => ({ ...prev, name: !e }))
                                }
                            />
                            <Input
                                id="location"
                                type="text"
                                label={'Расположение'}
                                placeholder={'Расположение'}
                                value={formData.location}
                                onFocus={() => setFocus(true)}
                                onBlur={() => setFocus(false)}
                                onChange={(value) =>
                                    setFormData((prev) => ({ ...prev, location: value }))
                                }
                                isValid={(e) =>
                                    setValid((prev) => ({ ...prev, location: !e }))
                                }
                            />
                            {typeof formData.stream_url === 'string' ? (
                                <Input
                                    id="stream_url"
                                    type="text"
                                    label={'Поток'}
                                    placeholder={'Поток'}
                                    value={formData.stream_url}
                                    onFocus={() => setFocus(true)}
                                    onBlur={() => setFocus(false)}
                                    onChange={(value) =>
                                        setFormData((prev) => ({ ...prev, stream_url: value }))
                                    }
                                    isValid={(e) =>
                                        setValid((prev) => ({ ...prev, stream_url: !e }))
                                    }
                                />
                            ) : (
                                <>
                                    <Input
                                        id="stream_type"
                                        type="text"
                                        label={'Тип потока'}
                                        placeholder={'Тип потока'}
                                        value={formData.stream_url.stream_type}
                                        onFocus={() => setFocus(true)}
                                        onBlur={() => setFocus(false)}
                                        onChange={(value) =>
                                            handleStreamUrlChange('stream_type', value)
                                        }
                                        isValid={(e) =>
                                            setValid((prev) => ({ ...prev, stream_url: !e }))
                                        }
                                    />
                                    <Input
                                        id="user"
                                        type="text"
                                        label={'Пользователь'}
                                        placeholder={'Пользователь'}
                                        value={formData.stream_url.user}
                                        onFocus={() => setFocus(true)}
                                        onBlur={() => setFocus(false)}
                                        onChange={(value) =>
                                            handleStreamUrlChange('user', value)
                                        }
                                        isValid={(e) =>
                                            setValid((prev) => ({ ...prev, stream_url: !e }))
                                        }
                                    />
                                    <Input
                                        id="password"
                                        type="text"
                                        label={'Пароль'}
                                        placeholder={'Пароль'}
                                        value={formData.stream_url.password}
                                        onFocus={() => setFocus(true)}
                                        onBlur={() => setFocus(false)}
                                        onChange={(value) =>
                                            handleStreamUrlChange('password', value)
                                        }
                                        isValid={(e) =>
                                            setValid((prev) => ({ ...prev, stream_url: !e }))
                                        }
                                    />
                                    <Input
                                        id="url"
                                        type="text"
                                        label={'URL'}
                                        placeholder={'URL'}
                                        value={formData.stream_url.url}
                                        onFocus={() => setFocus(true)}
                                        onBlur={() => setFocus(false)}
                                        onChange={(value) =>
                                            handleStreamUrlChange('url', value)
                                        }
                                        isValid={(e) =>
                                            setValid((prev) => ({ ...prev, stream_url: !e }))
                                        }
                                    />
                                    <Input
                                        id="port"
                                        type="number"
                                        label={'Порт'}
                                        placeholder={'Порт'}
                                        value={formData.stream_url.port.toString()}
                                        onFocus={() => setFocus(true)}
                                        onBlur={() => setFocus(false)}
                                        onChange={(value) =>
                                            handleStreamUrlChange('port', Number(value))
                                        }
                                        isValid={(e) =>
                                            setValid((prev) => ({ ...prev, stream_url: !e }))
                                        }
                                    />
                                    <Input
                                        id="args"
                                        type="text"
                                        label={'Аргументы'}
                                        placeholder={'Аргументы'}
                                        value={formData.stream_url.args}
                                        onFocus={() => setFocus(true)}
                                        onBlur={() => setFocus(false)}
                                        onChange={(value) =>
                                            handleStreamUrlChange('args', value)
                                        }
                                        isValid={(e) =>
                                            setValid((prev) => ({ ...prev, stream_url: !e }))
                                        }
                                    />
                                </>
                            )}
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

export { CameraCreate };