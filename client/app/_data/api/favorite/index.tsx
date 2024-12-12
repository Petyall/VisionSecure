import { getAllFavoriteCamera } from './get.all.favorite.cameras';
import { getFavoriteUserCameraById } from './get.favorite.user.camera.by.id';
import { postAddFavoriteCamera } from './post.add.favorite.camera';
import { deleteFavoriteCamera } from './delete.favorite.camera';

export const favoriteApi = {
    getAllCamera: getAllFavoriteCamera,
    getUserCameraById: getFavoriteUserCameraById,
    add: postAddFavoriteCamera,
    delete: deleteFavoriteCamera,
};