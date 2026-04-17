import BaseHttpService from "../config/http.config";

class AdminStatsService extends BaseHttpService {
    listAdminStats = async () => {
        try {
            const response = await this.getRequest(
                import.meta.env.VITE_API_VERSION + '/stat', { auth: true }
            );
            return response;

        } catch (exception: any) {
            throw exception;
        }
    }

    listRecentMessages = async () => {
        try {
            const response = await this.getRequest(
                import.meta.env.VITE_API_VERSION + '/stat/messages', { auth: true }
            );
            return response;

        } catch (exception: any) {
            throw exception;
        }
    }

}

const adminStatsSvc = new AdminStatsService()

export default adminStatsSvc;