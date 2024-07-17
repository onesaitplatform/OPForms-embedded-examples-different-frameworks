import { useContext } from "react"
import { FormContext } from "../context/FormContext"
import { FormRow } from "./FormRow"
import { AuthContext } from "../auth/context/AuthContext";

export const FormList = () => {

    const { forms } = useContext(FormContext);
    const { login } = useContext(AuthContext);
    return (
        <table className="table table-hover table-striped">

            <thead>
                <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Entity</th>
                    <th>Description</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {
                    forms.map(({ id, name, code, description,entity }) => (
                        <FormRow
                            key={id}
                            id={id}
                            name={name}
                            code={code}
                            description={description}
                            entity={entity}
                        />
                    ))
                }
            </tbody>
        </table>
    )
}