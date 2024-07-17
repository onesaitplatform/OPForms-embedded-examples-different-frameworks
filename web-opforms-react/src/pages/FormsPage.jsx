import { useContext, useEffect } from "react";
import { FormList } from "../components/FormsList";
import { FormContext } from "../context/FormContext";
import { AuthContext } from "../auth/context/AuthContext";

export const FormsPage = () => {

    const {
        forms,
        getForms,
    } = useContext(FormContext);

    const { login } = useContext(AuthContext);

    useEffect(() => {
        getForms();
    }, []);

    return (
        <>


            <div className="container my-4">
                <h2>OP FORMS</h2>
                <div className="row">
                    <div className="col">
                        {
                            forms.length === 0
                                ? <div className="alert alert-warning">There are no forms in the system!</div>
                                : <FormList />
                        }
                    </div>
                </div>
            </div>
        </>
    );
}