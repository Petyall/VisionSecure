//#region User
import { getMySelfUser } from './get.my.self.user';
import { getAllUsers } from './get.all.users';
import { getUserById } from './get.user.by.id';
import { deleteUser } from './delete.user';
import { editUser } from './edit.user';
//#endregion

export const userApi = {
    mySelf: getMySelfUser,
    getAll: getAllUsers,
    getById: getUserById,
    delete: deleteUser,
    edit: editUser,
};