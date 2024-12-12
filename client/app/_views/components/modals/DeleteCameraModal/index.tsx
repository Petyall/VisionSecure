import { FC, useState } from "react";

import { Camera } from "@/app/_data/types";
import { useAlertStore, useCameraStore } from "@/app/_data/store";

import { useCameras } from "@/app/hooks";

import { ModalWindow } from "@/app/_views/_ui/popups/ModalWindow";
import { TrashCanIcon } from "@/app/_views/_ui/svg_dynamic";
import { Flex } from "@/app/_views/_layouts/Flex";
import { Button } from "@/app/_views/_ui/forms/buttons/Button";
import { Input } from "@/app/_views/_ui/forms/inputs/Input";
import { Form } from "@/app/_views/_ui/forms/Form";
import { Text } from "@/app/_views/_ui/typography/Text";
import cls from './index.module.scss';

type FormData = Pick<Camera, 'name'>;

const DeleteCameraModal: FC = () => {
    const { addAlert } = useAlertStore();
    const currentCamera = useCameraStore(e => e.currentCamera);
    const { fetchDeleteCamera } = useCameras();
    
    const initialForm = {
        name: '',
    };
    
    const [formData, setFormData] = useState<FormData>(initialForm);
    const [isValid, setValid] = useState<boolean>(false);

    const handleSubmit = async () => {
        try {
            if (formData.name !== currentCamera?.name) {
                addAlert(`Удаление было прервано. Укажите корректное название камеры.`, 'warning');
                return;
            }
            if (currentCamera?.id) {
                const id = currentCamera?.id;
                fetchDeleteCamera({ id: { id } });
            } else {
                addAlert(`Не удалось установить камеру. Закройте окно и попробуйте снова.`, 'error');
            }
        } catch (err) {
            addAlert(
                `Во время удаления произошла ошибка: ${err}.`,
                'error'
            );
            console.error(`Delete handler Error >>> ${err}`);
        }
    }

    return (
        <ModalWindow className={cls.deleteCameraModal}>
            <ModalWindow.Head
                ico={<TrashCanIcon />}
                title='Удаление'
            />
            <ModalWindow.Body>
                <Form>
                    <Text opacity={.6}>Чтобы подтвердить удаление, введите «{currentCamera?.name}» в поле ниже. После выполнения результат будет необратим.</Text>
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
                        isValid={() =>
                            setValid(currentCamera?.name === formData.name)
                        }
                    />
                </Form>
            </ModalWindow.Body>
            <ModalWindow.Footer>
                <Flex>
                    <Button
                        type='button'
                        data-red
                        title="Подтвердить удаление"
                        onClick={handleSubmit}
                        disabled={isValid}
                    >
                        Подтвердить
                    </Button>
                </Flex>
            </ModalWindow.Footer>
        </ModalWindow>
    );
}

export { DeleteCameraModal };