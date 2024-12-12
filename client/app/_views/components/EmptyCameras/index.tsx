import { FC } from 'react';
import { useRouter } from 'next/router';
import { Title } from '../../_ui/typography/Title';
import { Text } from '../../_ui/typography/Text';
import { Flex } from '../../_layouts/Flex';
import { Button } from '../../_ui/forms/buttons/Button';
import cls from './index.module.scss';

interface EmptyCamerasProps {
  favorites?: boolean;
}

const EmptyCameras: FC<EmptyCamerasProps> = ({ favorites }) => {
  const { push } = useRouter();

  return (
    <div className={cls.emptyCameras}>
      {favorites ? (
        <Flex flexDirection="column" gap="1rem">
          <Title type="h3">
            У Вас еще нет доступных камер в разделе "Избранное".
          </Title>
          <Text opacity={0.6}>
            Для добавления камеры в Избранное, необходимо в разделе Галерея
            навестись на область просмотра интересующей камеры и переключить
            кнопку добавления в избранное (Звездочка). Обратный процесс также
            работает по повторному нажатию.
          </Text>
          <Button
            type={undefined}
            title={'Перейти к разделу Галерея'}
            onClick={() => push('/dashboard/view')}
          >
            Перейти к Галерее
          </Button>
        </Flex>
      ) : (
        <Flex flexDirection="column" gap="1rem">
          <Title type="h3">У Вас еще нет доступных камер.</Title>
          <Text opacity={0.6}>
            Чтобы получить доступ, обратитесь в аудиторию 1-391а. С собой
            необходимо взять список перечня камер, содержащий в себе всю
            необходимую информацию для доступа к камере, а именно:
          </Text>
          <Text opacity={0.6}>
            Или напишите на почту c просьбой о добавлении камер.
          </Text>
          <ul>
            <li>IP-адрес камеры;</li>
            <li>Название камеры (как вы бы хотели ее видеть);</li>
            <li>Локация камеры (короткое описание ее расположения);</li>
            <li>Логин и пароль для доступа к потоку камеры.</li>
          </ul>
        </Flex>
      )}
    </div>
  );
};

export { EmptyCameras };
