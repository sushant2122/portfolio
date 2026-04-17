// portfolio.service.ts
import BaseHttpService from "../config/http.config";

export type PortfolioType = {
    name: string;
    description?: string;
    portfolio_img?: FileList;
    git_URL: string;
    live_URL?: string;
};

class PortfolioService extends BaseHttpService {
    createPortfolio = async (data: FormData) => {
        try {
            const response = await this.postRequest(
                import.meta.env.VITE_API_VERSION + '/portfolio',
                data,
                { file: true, auth: true }
            );
            return response;
        } catch (exception: any) {
            throw exception;
        }
    }

    listPortfolio = async () => {
        try {
            const response = await this.getRequest(
                import.meta.env.VITE_API_VERSION + '/portfolio'
            );
            return response;
        } catch (exception: any) {
            throw exception;
        }
    }

    updatePortfolioDetail = async (id: number, data: FormData) => {
        try {
            const response = await this.putRequest(
                import.meta.env.VITE_API_VERSION + `/portfolio/${id}`,
                data,
                { auth: true, file: true }
            );
            return response;
        } catch (exception: any) {
            throw exception;
        }
    }

    deletePortfolio = async (id: number) => {
        try {
            const response = await this.deleteRequest(
                import.meta.env.VITE_API_VERSION + `/portfolio/${id}`,
                { auth: true }
            );
            return response;
        } catch (exception: any) {
            throw exception;
        }
    }
}

const portfolioSvc = new PortfolioService()
export default portfolioSvc;