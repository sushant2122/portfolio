

import BaseHttpService from "../config/http.config";
export type ExperienceType = {
    title: string;
    position: string;
    from: string;
    to: string;
};
class ExperienceService extends BaseHttpService {

    createExp = async (data: ExperienceType) => {
        try {

            const response = await this.postRequest(
                import.meta.env.VITE_API_VERSION + '/experience',
                data, { auth: true }
            );
            return response;
        } catch (exception: any) {
            throw exception;
        }
    }

    listExps = async () => {
        try {
            const response = await this.getRequest(
                import.meta.env.VITE_API_VERSION + '/experience'
            );
            return response;

        } catch (exception: any) {
            throw exception;
        }
    }

    updateExpDetail = async (id: number, data: any) => {
        try {

            const response = await this.putRequest(
                import.meta.env.VITE_API_VERSION + `/experience/${id}`, data, { auth: true }
            );
            return response;

        } catch (exception: any) {
            throw exception;
        }
    }
    deleteExp = async (id: number) => {
        try {
            const response = await this.deleteRequest(
                import.meta.env.VITE_API_VERSION + `/experience/${id}`, { auth: true }
            );
            return response;

        } catch (exception: any) {
            throw exception;
        }
    }

}

const expSvc = new ExperienceService()

export default expSvc;