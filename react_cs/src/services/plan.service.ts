import { ReactFlowJsonObject } from 'reactflow';
import api from './api';
// import PlanData from '../models';

const getUserPlans = () => {
    return api.get(`/plan/`);
};


const getPlan = (planNo: string) => {
    return api.get(`/plan/${planNo}/`);
};

const createPlan = (planData?: ReactFlowJsonObject) => {
    return api.post('/plan/', {
        plan: planData,
        deploy_status: 1,
        running_status: 1,
    });
};

const updatePlan = (planNo: string, planData: ReactFlowJsonObject, deployStatus: number, runningStatus: number) => {
    return api.put(`/plan/${planNo}/`, {
        plan: planData,
        deploy_status: deployStatus,
        running_status: runningStatus,
    });
};


// TODO: Why do we need to send plan data again in deployment?
// The plan data should be fetched from our DB
const delpoyPlan = (planNo: string, planData: any) => {
    return api.put(`/plan/${planNo}/`, planData);
};

const deletePlan = (planNo: string) => {
    return api.delete(`/plan/${planNo}/`);
};


const PlanService = {
    getUserPlans,
    getPlan,
    createPlan,
    updatePlan,
    delpoyPlan,
    deletePlan,
};

export default PlanService;