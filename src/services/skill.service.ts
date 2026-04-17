// skill.service.ts
import BaseHttpService from "../config/http.config";

export type SkillType = {
    name: string;
    level: string;
    skill_img?: FileList;
};

class SkillService extends BaseHttpService {
    createSkill = async (data: FormData) => {
        try {
            const response = await this.postRequest(
                import.meta.env.VITE_API_VERSION + '/skill',
                data,
                { file: true, auth: true }
            );
            return response;
        } catch (exception: any) {
            throw exception;
        }
    }

    listSkill = async () => {
        try {
            const response = await this.getRequest(
                import.meta.env.VITE_API_VERSION + '/skill'
            );
            return response;
        } catch (exception: any) {
            throw exception;
        }
    }

    updateSkillDetail = async (id: number, data: FormData) => {
        try {
            const response = await this.putRequest(
                import.meta.env.VITE_API_VERSION + `/skill/${id}`,
                data,
                { auth: true, file: true }
            );
            return response;
        } catch (exception: any) {
            throw exception;
        }
    }

    deleteSkill = async (id: number) => {
        try {
            const response = await this.deleteRequest(
                import.meta.env.VITE_API_VERSION + `/skill/${id}`,
                { auth: true }
            );
            return response;
        } catch (exception: any) {
            throw exception;
        }
    }
}

const skillSvc = new SkillService()
export default skillSvc;