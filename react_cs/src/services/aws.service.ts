import api from './api';


const createComponent = (planNo: string, componentName: string) => {
    return api.post(`/${componentName}/`, {
        "plan": planNo
    });
};


const deleteComponent = (planNo: string, componentName: string, componentNo: string) => {
    return api.delete(`/${componentName}/${componentNo}`);
};


const AWSService = {
    createComponent,
    deleteComponent
};

export default AWSService;