//#region Authentication
import { postSignUp } from './post.sign.up';
import { postSignIn } from './post.sign.in';
import { postRefreshToken } from './post.refresh.token';
import { postValidCheck } from './post.validCheck';
import { postLogout } from './post.logout';
//#endregion

export const authenticationApi = {
    signUp: postSignUp,
    signIn: postSignIn,
    refreshToken: postRefreshToken,
    validCheck: postValidCheck,
    logout: postLogout,
};