import { FC, useEffect, useState } from 'react';

import { api } from '@/app/_data/api';
import { useModalWindowStore, useUserStore } from '@/app/_data/store';
import { User } from '@/app/_data/types';

import { Container } from '@/app/_views/_layouts/Container';
import { Title } from '@/app/_views/_ui/typography/Title';
import { Flex } from '@/app/_views/_layouts/Flex';
import { Table } from '@/app/_views/_ui/tables/Table';
import { Loader } from '@/app/_views/_ui/loaders/Loader';
import { AddIcon, CameraIcon, EditIcon, TrashCanIcon } from '@/app/_views/_ui/svg_dynamic';

import { Search } from '../../_ui/forms/inputs/Search';
import { LinkButton } from '../../_ui/forms/buttons/LinkButton';
import cls from './index.module.scss';


const Users: FC = () => {
  const { allUsers, setAllUsers, setCurrentUser } = useUserStore();
  const { openModal } = useModalWindowStore();
  
  const [isLoading, setLoading] = useState<boolean>(true);

  const [queryText, setQueryText] = useState<string>('');

  const [sortColumn, setSortColumn] = useState<keyof User>('id');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const getUsersResponse = api.user.getAll();
    getUsersResponse.then(response => {
      if (response.users) {
        setAllUsers(response.users);
      }
    })
  }, [allUsers]);


  const filteredByDate = queryText.length
    ? allUsers?.filter((e) => e.last_name.includes(queryText))
    : allUsers;

  const handleClickSort = (column: keyof User) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = filteredByDate?.slice().sort((a, b) => {
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

  const handleEdit = (obj: User) => {
    openModal('edit', 'user');
    setCurrentUser(obj);
  };

  const handleDelete = (obj: User) => {
    openModal('delete', 'user');
    setCurrentUser(obj);
  };

  return (
    <section className={cls.users}>
      <Container>
        <article>
          <Flex flexDirection="column" gap="2rem">
            <Flex justifyContent="space-between">
              <Title type="h3">Пользователи</Title>
              <Search 
                placeholder='Поиск по имени...'  
                value={queryText}
                onChange={(e) => setQueryText(e)}
              />
              <LinkButton 
                to={'/dashboard/users/create'} 
                ico={<AddIcon/>} 
                title={'Регистрация'} 
              />
            </Flex>
            <div className={cls.tableWrapper}>
              {!isLoading ? (
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
                        onClick={() => handleClickSort('first_name')}
                      >
                        Имя
                      </Table.HeadCell>
                      <Table.HeadCell
                        sortable
                        onClick={() => handleClickSort('last_name')}
                      >
                        Фамилия
                      </Table.HeadCell>
                      <Table.HeadCell
                        sortable
                        onClick={() => handleClickSort('paternal_name')}
                      >
                        Отчество
                      </Table.HeadCell>
                      <Table.HeadCell
                        sortable
                        onClick={() => handleClickSort('phone_number')}
                      >
                        Номер тел.
                      </Table.HeadCell>
                      <Table.HeadCell
                        sortable
                        onClick={() => handleClickSort('email')}
                      >
                        Эл. почта
                      </Table.HeadCell>
                      <Table.HeadCell
                        sortable
                        onClick={() => handleClickSort('password')}
                      >
                        Пароль
                      </Table.HeadCell>
                      <Table.HeadCell
                        sortable
                        onClick={() => handleClickSort('role')}
                      >
                        Роль
                      </Table.HeadCell>
                      <Table.HeadCell
                        sortable
                        onClick={() => handleClickSort('created_at')}
                        >
                        Создан
                      </Table.HeadCell>
                      <Table.HeadCell
                        sortable
                        onClick={() => handleClickSort('updated_at')}
                        >
                        Обновлен
                      </Table.HeadCell>
                      <Table.HeadCell>Бан</Table.HeadCell>
                        <Table.HeadCell>Камеры</Table.HeadCell>
                      <Table.HeadCell>Править</Table.HeadCell>
                      <Table.HeadCell>Удалить</Table.HeadCell>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {sortedData?.length ? (
                      sortedData.map(user => (
                        <Table.Row key={user.id}>
                          <Table.BodyCell>{user.id}</Table.BodyCell>
                          <Table.BodyCell>{user.first_name}</Table.BodyCell>
                          <Table.BodyCell>{user.last_name}</Table.BodyCell>
                          <Table.BodyCell>{user.paternal_name}</Table.BodyCell>
                          <Table.BodyCell>{user.phone_number}</Table.BodyCell>
                          <Table.BodyCell>{user.email}</Table.BodyCell>
                          <Table.BodyCell>{user.password}</Table.BodyCell>
                          <Table.BodyCell>{user.role}</Table.BodyCell>
                          <Table.BodyCell>{user.created_at}</Table.BodyCell>
                          <Table.BodyCell>{user.updated_at}</Table.BodyCell>
                          <Table.BodyCell>
                            <input type='checkbox' onChange={() => {}}/>
                          </Table.BodyCell>
                          <Table.BodyCell>
                            <CameraIcon />
                          </Table.BodyCell>
                          <Table.BodyCell
                            data-green
                            onClick={() => handleEdit(user)}
                          >
                            <EditIcon />
                          </Table.BodyCell>
                          <Table.BodyCell
                            data-red
                            onClick={() => handleDelete(user)}
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

export { Users };
