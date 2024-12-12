import { getAllCameras } from './get.all.cameras';
import { getAllUsersCameras } from './get.all.users.cameras';
import { getCamerasById } from './get.cameras.by.id';
import { getCamerasByUser } from './get.cameras.by.user';
import { getUserCamerasById } from './get.user.camera.by.id';
import { postAddCamera } from './post.add.camera';
import { editCamera } from './edit.camera';
import { deleteCamera } from './delete.camera';

export const camerasApi = {
    getAll: getAllCameras,
    getAllUsers: getAllUsersCameras,
    getById: getCamerasById,
    getByUser: getCamerasByUser,
    getUserById: getUserCamerasById,
    add: postAddCamera,
    edit: editCamera,
    delete: deleteCamera,
};