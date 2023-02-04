import { ReactFlowJsonObject } from 'reactflow';
import api from './api';
// import PlanData from '../models';

const getUserPlans = () => {
    return api.get(`/plan/`);
};


const getPlan = (planNo: string) => {
    return api.get(`/plan/${planNo}/`);
};

const createPlan = (name: string, description: string, planData: ReactFlowJsonObject) => {
    return api.post('/plan/', {
        name: name,
        description: description,
        data: planData
    });
};

const updatePlan = (planNo: string, name: string, description: string, planData: ReactFlowJsonObject) => {
    return api.put(`/plan/${planNo}/`, {
        name: name,
        description: description,
        data: planData
    });
};


const deletePlan = (planNo: string) => {
    return api.delete(`/plan/${planNo}/`);
};


const PlanService = {
    getUserPlans,
    getPlan,
    createPlan,
    updatePlan,
    deletePlan,
};

export default PlanService;