import { FC, useEffect, useState } from 'react';

import { useCameraStore, useModalWindowStore } from '@/app/_data/store';
import { Camera } from '@/app/_data/types';

import { useCameras } from '@/app/hooks';

import { Container } from '@/app/_views/_layouts/Container';
import { Title } from '@/app/_views/_ui/typography/Title';
import { Flex } from '@/app/_views/_layouts/Flex';
import { Table } from '@/app/_views/_ui/tables/Table';
import { Loader } from '@/app/_views/_ui/loaders/Loader';
import { AddIcon, EditIcon, TrashCanIcon } from '@/app/_views/_ui/svg_dynamic';

import { Search } from '../../_ui/forms/inputs/Search';
import { LinkButton } from '../../_ui/forms/buttons/LinkButton';
import cls from './index.module.scss';


const Cameras: FC = () => {
  const { setCurrentCamera, allCameras } = useCameraStore();
  const { openModal } = useModalWindowStore();
  const { isLoading, fetchGetAllCameras } = useCameras();

  const [queryText, setQueryText] = useState<string>('');

  const [sortColumn, setSortColumn] = useState<keyof Camera>('id');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetchGetAllCameras();
  }, []);

  const filteredByDate = queryText.length
    ? allCameras.filter((e) => e.name.includes(queryText))
    : allCameras;

  const handleClickSort = (column: keyof Camera) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = filteredByDate.slice().sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    } else if (aValue instanceof Date && bValue instanceof Date) {
      return sortDirection === 'asc'
        ? new Date(aValue).getTime() - new Date(bValue).getTime()
        : new Date(bValue).getTime() - new Date(aValue).getTime();
    }

    return 0;
  });

  const handleEdit = (obj: Camera) => {
    openModal('edit', 'camera');
    setCurrentCamera(obj);
  };

  const handleDelete = (obj: Camera) => {
    openModal('delete', 'camera');
    setCurrentCamera(obj);
  };

  return (
    <section className={cls.cameras}>
      <Container>
        <article>
          <Flex flexDirection="column" gap="2rem">
            <Flex justifyContent="space-between">
              <Title type="h3">Камеры</Title>
              <Search
                placeholder='Поиск по названию...'
                value={queryText}
                onChange={(e) => setQueryText(e)}
              />
              <LinkButton
                to={'/dashboard/cameras/create'}
                ico={<AddIcon />}
                title={'Создать камеру'}
              />
            </Flex>
            <div className={cls.tableWrapper}>
              {isLoading ? (
                <Loader />
              ) : (
                <Table>
                  <Table.Head>
                    <Table.Row>
                      <Table.HeadCell
                        sortable
                        onClick={() => handleClickSort('id')}
                      >
                        №
                      </Table.HeadCell>
                      <Table.HeadCell
                        sortable
                        onClick={() => handleClickSort('name')}
                      >
                        Название
                      </Table.HeadCell>
                      <Table.HeadCell
                        sortable
                        onClick={() => handleClickSort('location')}
                      >
                        Расположение
                      </Table.HeadCell>
                      <Table.HeadCell
                        sortable
                        onClick={() => handleClickSort('stream_url')}
                      >
                        Поток
                      </Table.HeadCell>
                      <Table.HeadCell
                        sortable
                        onClick={() => handleClickSort('stream_url')}
                      >
                        Тип потока
                      </Table.HeadCell>
                      <Table.HeadCell
                        sortable
                        onClick={() => handleClickSort('stream_url')}
                      >
                        Пользователь
                      </Table.HeadCell>
                      <Table.HeadCell
                        sortable
                        onClick={() => handleClickSort('stream_url')}
                      >
                        Пароль
                      </Table.HeadCell>
                      <Table.HeadCell
                        sortable
                        onClick={() => handleClickSort('stream_url')}
                      >
                        URL
                      </Table.HeadCell>
                      <Table.HeadCell
                        sortable
                        onClick={() => handleClickSort('stream_url')}
                      >
                        Порт
                      </Table.HeadCell>
                      <Table.HeadCell
                        sortable
                        onClick={() => handleClickSort('updated_at')}
                      >
                        Изменена
                      </Table.HeadCell>
                      <Table.HeadCell
                        sortable
                        onClick={() => handleClickSort('created_at')}
                      >
                        Создана
                      </Table.HeadCell>
                      <Table.HeadCell>Править</Table.HeadCell>
                      <Table.HeadCell>Удалить</Table.HeadCell>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {sortedData.length ? (
                      sortedData.map(cam => (
                        <Table.Row key={cam.id}>
                          <Table.BodyCell>{cam.id}</Table.BodyCell>
                          <Table.BodyCell>{cam.name}</Table.BodyCell>
                          <Table.BodyCell>{cam.location}</Table.BodyCell>
                          {typeof cam.stream_url === 'string'
                            ? (<>
                              <Table.BodyCell>{cam.stream_url || 'не указан'}</Table.BodyCell>
                              <Table.BodyCell>{' - '}</Table.BodyCell>
                              <Table.BodyCell>{' - '}</Table.BodyCell>
                              <Table.BodyCell>{' - '}</Table.BodyCell>
                              <Table.BodyCell>{' - '}</Table.BodyCell>
                              <Table.BodyCell>{' - '}</Table.BodyCell>
                            </>
                            )
                            : (<>
                              <Table.BodyCell>{'не указан'}</Table.BodyCell>
                              <Table.BodyCell>{cam.stream_url.stream_type}</Table.BodyCell>
                              <Table.BodyCell>{cam.stream_url.user}</Table.BodyCell>
                              <Table.BodyCell>{cam.stream_url.password}</Table.BodyCell>
                              <Table.BodyCell>{cam.stream_url.url}</Table.BodyCell>
                              <Table.BodyCell>{cam.stream_url.port}</Table.BodyCell>
                            </>
                            )
                          }
                          <Table.BodyCell>{cam.updated_at || '-'}</Table.BodyCell>
                          <Table.BodyCell>{cam.created_at || '-'}</Table.BodyCell>
                          <Table.BodyCell
                            data-green
                            onClick={() => handleEdit(cam)}
                          >
                            <EditIcon />
                          </Table.BodyCell>
                          <Table.BodyCell
                            data-red
                            onClick={() => handleDelete(cam)}
                          >
                            <TrashCanIcon />
                          </Table.BodyCell>
                        </Table.Row>
                      ))
                    ) : queryText ? (
                      <Table.EmptyCell>
                        <Table.BodyCell>Нет результатов</Table.BodyCell>
                      </Table.EmptyCell>
                    ) : null}
                  </Table.Body>
                </Table>
              )}
            </div>
          </Flex>
        </article>
      </Container>
    </section>
  );
};

export { Cameras };
