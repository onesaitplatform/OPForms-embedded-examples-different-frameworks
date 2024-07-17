import onesaitplatformServicesApi from "../apis/onesaitplatformServicesApi";
var BASE_URL = 'https://lab.onesaitplatform.com';

export const loadFormsList = async() => { 
    try {
        const response = await onesaitplatformServicesApi.get(`${BASE_URL}/controlpanel/api/forms/`);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const getDataOPs = async (formid, dataoid) => {
    try {
        return await onesaitplatformServicesApi.get(`${BASE_URL}/controlpanel/api/forms/${formid}/data/${dataoid}`);
    } catch (error) {
        throw error;
    }
}


export const getFormOPs = async ( formid) => {
    try {
        return await onesaitplatformServicesApi.get(`${BASE_URL}/controlpanel/api/forms/${formid}`);
    } catch (error) {
        throw error;
    }
}

export const createDataOPs = async (formid, submission) => {
    try {
        
        submission.metadata.formId = formid;
        delete submission.data.submit;
        return await onesaitplatformServicesApi.post(`${BASE_URL}/controlpanel/api/forms/submit`,JSON.stringify(submission));
    } catch (error) {
        throw error;
    }
}
export const updateDataOPs = async (formid, dataoid, submission) => {
    try {
        submission.metadata.formId = formid;
        submission.metadata.dataId = dataoid
        delete submission.data.submit;
        return await onesaitplatformServicesApi.post(`${BASE_URL}/controlpanel/api/forms/submit/update`,JSON.stringify(submission));
    } catch (error) {
        throw error;
    }
}

export const save = async ({ username, email, password, admin }) => {
    try {
        return await onesaitplatformServicesApi.post(BASE_URL, {
            username,
            email,
            password,
            admin,
        });
    } catch (error) {
        throw error;
    }
}

export const update = async({ id, username, email, admin }) => {
    try {
        return await onesaitplatformServicesApi.put(`${BASE_URL}/${id}`, {
            username,
            email,
            admin,
        });
    } catch (error) {
        throw error;
    }
}

export const remove = async (id) => {
    try {
        await onesaitplatformServicesApi.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw error;
    }
}