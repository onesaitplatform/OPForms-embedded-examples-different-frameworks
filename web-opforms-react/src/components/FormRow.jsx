import { NavLink } from "react-router-dom"

export const FormRow = ({ id, name, code, description,entity }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{code}</td>
            <td>{entity}</td>
            <td>{description}</td>
            <td>
                        <NavLink className={'btn btn-secondary btn-sm'}
                            to={'/forms/formshow/' + code} >
                           Show Form
                        </NavLink>
                    </td>
        </tr>
    )
}