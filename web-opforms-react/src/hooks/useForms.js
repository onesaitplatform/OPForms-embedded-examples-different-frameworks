import { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { usersReducer } from "../reducers/usersReducer";
import { loadFormsList, getDataOPs, updateDataOPs, createDataOPs, getFormOPs, remove, save, update } from "../services/onesaitplatformServices";
import { AuthContext } from "../auth/context/AuthContext";

const initialUsers = [];

const initialOPForm = { formcode: '', formformId: '' };

const initialErrors = {
    username: '',
    password: '',
    email: '',
}

export const useForms = () => {
    const [forms, dispatch] = useReducer(usersReducer, initialUsers);
    const [formSelected, setFormSelected] = useState(initialOPForm);
    const [visibleForm, setVisibleForm] = useState(false);

    const [errors, setErrors] = useState(initialErrors)

    const navigate = useNavigate();

    const { login, handlerLogout } = useContext(AuthContext);

    const getForms = async () => {

        try {
            const result = await loadFormsList();
            console.log(result);
            dispatch({
                type: 'loadingUsers',
                payload: result.data,
            });
        } catch (error) {
            if (error.response?.status == 401) {
                handlerLogout();
            }
        }
    }

    const getData = async (formid, dataoid) => {
        const result = await getDataOPs(formid, dataoid);
        return result;
    }

    const getForm = async (formid) => {
        const result = await getFormOPs(formid);
        return result;
    }

    const updateData = async (formid, dataoid, submission) => {
        const result = await updateDataOPs(formid, dataoid, submission);
        return result;
    }
    const createData = async (formid, submission) => {
        const result = await createDataOPs(formid, submission);
        return result;
    }

    const handlerFormSelectedForm = (form) => {
        setVisibleForm(true);
        setFormSelected({ ...form });
    }

    const handlerOpenForm = () => {
        setVisibleForm(true);
    }

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setFormSelected(initialOPForm);
        setErrors({});
    }
    return {
        forms,
        formSelected,
        initialOPForm,
        visibleForm,
        errors,
        getData,
        getForm,
        createData,
        updateData,
        handlerFormSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getForms,
    }
}