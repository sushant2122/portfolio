
import type { PasswordResetType } from "../pages/password_reset.page";
import type { ResetType } from "../pages/email_reset.page";
import type { CredentialType } from "../pages/login.page";
import BaseHttpService from "../config/http.config";
class AuthService extends BaseHttpService {

    login = async (data: CredentialType) => {
        try {
            const response = await this.postRequest(
                import.meta.env.VITE_API_VERSION + '/auth/signin',
                data
            );

            localStorage.setItem('access', response.data.token.access);
            localStorage.setItem('refresh', response.data.token.refresh);
            return response;


        } catch (exception: any) {
            throw exception;
        }
    }



    getLoggedInUser = async () => {
        try {
            const response = await this.getRequest(
                import.meta.env.VITE_API_VERSION + '/auth/me', { auth: true }
            );
            return response;

        } catch (exception: any) {
            throw exception;
        }
    }

    forgotPassword = async (data: ResetType) => {
        try {
            const response = await this.postRequest(
                import.meta.env.VITE_API_VERSION + '/auth/forget-password',
                data
            );
            return response;
        } catch (exception: any) {
            throw exception;
        }
    }
    resetPassword = async (data: PasswordResetType, token: string) => {
        try {
            const response = await this.patchRequest(
                import.meta.env.VITE_API_VERSION + '/auth/reset-password/' + token,
                data
            );

            return response;
        } catch (exception: any) {
            throw exception;
        }
    }

}

const authSvc = new AuthService()

export default authSvc;