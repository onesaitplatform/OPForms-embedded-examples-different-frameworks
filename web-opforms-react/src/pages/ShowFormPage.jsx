import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { ShowForm } from "../components/ShowForm"
import { FormContext } from "../context/FormContext";

export const ShowFormPage = () => {
    const { initialOPForm } = useContext(FormContext);
    const [formSelected, setFormSelected] = useState(initialOPForm);

    const { formcode,formId } = useParams();

    useEffect(() => { 
        if (formcode) {          
            setFormSelected({formcode:formcode,formId:formId});
        }
    }, [formcode,formId])

    return (
        <div className="container my-4">
            <h4> SHOW FORM</h4>
            <div className="row">
                <div className="col">
                    <ShowForm formSelected={formSelected} />
                </div>
            </div>
        </div>
    )
}