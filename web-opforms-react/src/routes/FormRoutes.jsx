import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../components/layout/Navbar"
import { FormProvider } from "../context/FormProvider"
import { ShowFormPage } from "../pages/ShowFormPage"
import { FormsPage } from "../pages/FormsPage"
import { AuthContext } from "../auth/context/AuthContext"
import { useContext } from "react"

export const FormRoutes = () => {
    const { login } = useContext(AuthContext);
    return (
        <>
            <FormProvider>
                <Navbar />
                <Routes>
                    <Route path="forms" element={<FormsPage />} />
                    <Route path="forms/formshow/:formcode/:formId" element={<ShowFormPage />} />
                    <Route path="forms/formshow/:formcode" element={<ShowFormPage />} />
                    <Route path="/" element={<Navigate to="/forms" />} />
                </Routes>
            </FormProvider>
        </>
    )
}