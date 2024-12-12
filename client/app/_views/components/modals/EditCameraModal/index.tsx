import { FC, useState } from "react";

import { isFormDisabled } from "@/app/utils/functions";
import { updateStreamUrlField } from "@/app/utils/helpers";

import { Camera, StreamUrl } from "@/app/_data/types";
import { useAlertStore, useCameraStore } from "@/app/_data/store";

import { useCameras } from "@/app/hooks";

import { ModalWindow } from "@/app/_views/_ui/popups/ModalWindow";
import { Flex } from "@/app/_views/_layouts/Flex";
import { Button } from "@/app/_views/_ui/forms/buttons/Button";
import { Input } from "@/app/_views/_ui/forms/inputs/Input";
import { Form } from "@/app/_views/_ui/forms/Form";
import { EditIcon } from "@/app/_views/_ui/svg_dynamic";
import cls from './index.module.scss';

type FormData = Pick<Camera, 'name' | 'location' | 'stream_url'>;

interface ValidForm {
    name: boolean;
    location: boolean;
    stream_url: boolean;
};

const initialValidForm = {
    name: false,
    location: false,
    stream_url: false,
};

const EditCameraModal: FC = () => {
    const { addAlert, removeAlert } = useAlertStore();
    const currentCamera = useCameraStore(e => e.currentCamera);
    const { fetchEditCamera } = useCameras();

    const initialForm = {
        name: currentCamera?.name || '',
        location: currentCamera?.location || '',
        stream_url: currentCamera?.stream_url || '',
    };

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

    const handleSubmit = async () => {
        try {
            const body = formData;
            const id = currentCamera?.id;

            if (!id) {
                addAlert('Камера по ID не найдена.', 'error');
                return;
            }

            fetchEditCamera({ id: { id }, body });
        } catch (err) {
            addAlert(
                `Во время изменения произошла ошибка: ${err}.`,
                'error'
            );
            console.error(`Edit handler Error >>> ${err}`);
        }
    }

    return (
        <ModalWindow className={cls.editCameraModal}>
            <ModalWindow.Head
                ico={<EditIcon />}
                title='Редактирование'
            />
            <ModalWindow.Body>
                <Form>
                    <Input
                        id="name"
                        type="text"
                        label={'Название'}
                        placeholder={'Название'}
                        autoFocus
                        value={formData.name}
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
                                onChange={(value) =>
                                    handleStreamUrlChange('args', value)
                                }
                                isValid={(e) =>
                                    setValid((prev) => ({ ...prev, stream_url: !e }))
                                }
                            />
                        </>
                    )}
                </Form>
            </ModalWindow.Body>
            <ModalWindow.Footer>
                <Flex>
                    <Button
                        type='button'
                        title="Создать"
                        onClick={handleSubmit}
                        disabled={isDisabled}
                    >
                        Обновить
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
            </ModalWindow.Footer>
        </ModalWindow>
    );
}

export { EditCameraModal };