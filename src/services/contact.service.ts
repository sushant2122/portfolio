

import BaseHttpService from "../config/http.config";
export type MessageType = {
    name: string;
    email: string;
    subject: string;
    message: string;

};
class ContactService extends BaseHttpService {
    createMessage = async (data: MessageType) => {
        try {

            const response = await this.postRequest(
                import.meta.env.VITE_API_VERSION + '/message',
                data
            );
            return response;
        } catch (exception: any) {
            throw exception;
        }
    }
    listMessages = async () => {
        try {
            const response = await this.getRequest(
                import.meta.env.VITE_API_VERSION + '/message', { auth: true }
            );
            return response;

        } catch (exception: any) {
            throw exception;
        }
    }

    updateMessageDetail = async (id: number, data: any) => {
        try {

            const response = await this.putRequest(
                import.meta.env.VITE_API_VERSION + `/message/${id}`, data, { auth: true }
            );
            return response;

        } catch (exception: any) {
            throw exception;
        }
    }
    deleteMessage = async (id: number) => {
        try {
            const response = await this.deleteRequest(
                import.meta.env.VITE_API_VERSION + `/message/${id}`, { auth: true }
            );
            return response;

        } catch (exception: any) {
            throw exception;
        }
    }
}

const contactSvc = new ContactService()

export default contactSvc;