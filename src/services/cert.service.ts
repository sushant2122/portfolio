// skill.service.ts
import BaseHttpService from "../config/http.config";

export type CertificationType = {
    title: string;
    issuer: string;
    issue_date: string; // use string (YYYY-MM-DD format)
    expiry_date?: string;

    credential_id?: string;
    verification_link?: string;

    cert_img?: FileList; // for file upload (like skill_img)

    skills?: string;
    description?: string;
};

class CertService extends BaseHttpService {
    createCert = async (data: FormData) => {
        try {
            const response = await this.postRequest(
                import.meta.env.VITE_API_VERSION + '/cert',
                data,
                { file: true, auth: true }
            );
            return response;
        } catch (exception: any) {
            throw exception;
        }
    }

    listCert = async () => {
        try {
            const response = await this.getRequest(
                import.meta.env.VITE_API_VERSION + '/cert'
            );
            return response;
        } catch (exception: any) {
            throw exception;
        }
    }

    updateCertDetail = async (id: number, data: FormData) => {
        try {
            const response = await this.putRequest(
                import.meta.env.VITE_API_VERSION + `/cert/${id}`,
                data,
                { auth: true, file: true }
            );
            return response;
        } catch (exception: any) {
            throw exception;
        }
    }

    deleteCert = async (id: number) => {
        try {
            const response = await this.deleteRequest(
                import.meta.env.VITE_API_VERSION + `/cert/${id}`,
                { auth: true }
            );
            return response;
        } catch (exception: any) {
            throw exception;
        }
    }
}

const certSvc = new CertService()
export default certSvc;