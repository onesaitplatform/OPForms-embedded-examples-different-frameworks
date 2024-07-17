import { useForms } from "../hooks/useForms";
import { FormContext } from "./FormContext"

export const FormProvider = ({ children }) => {

    const {
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
    } = useForms();

    return (
        <FormContext.Provider value={
            {
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
        }>
            {children}
        </FormContext.Provider>
    )
}