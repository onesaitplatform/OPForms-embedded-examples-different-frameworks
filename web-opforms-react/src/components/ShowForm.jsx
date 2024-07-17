import { useContext, useEffect, useState } from "react";
import { FormContext } from "../context/FormContext";
import { useNavigate, NavLink } from "react-router-dom";

export const ShowForm = ({ formSelected, handlerCloseForm }) => {
    const { initialOPForm, getData, getForm, updateData, createData } = useContext(FormContext);
    const navigate = useNavigate();
    const [oPForm, setOPForm] = useState(initialOPForm);
    const { formcode, formId } = oPForm;
    const [oid, setOid] = useState('');
    var buildState;

    useEffect(() => {
        setOPForm({
            ...formSelected
        });
        showForm(formSelected.formcode, formSelected.formId,)
    }, [formSelected]);

    const showForm = async (formcode, formId) => {
        if (formcode && formcode.length > 0) {
            window.formId = formcode;
            if (formId != null && formId.length > 0) {
                const responsedata = await getData(formcode, formId);
                const resp = responsedata.data;
                if (!resp.i18nJson) {
                    resp.i18nJson = null
                }
                if (resp?.datasources) {
                    window.ds = resp.datasources
                }
                window.Formio.createForm(
                    document.getElementById('formdiv'),
                    resp.schema, resp.i18nJson
                ).then(function (build) {
                    buildState = build;
                    buildState.submission = {
                        data: resp.data[0],
                    };

                    buildState.on('redirect', function (redirecto) {
                        navigate(`/forms/formshow/${redirecto.formcode}/${redirectto.dataoid}`);
                    })

                    buildState.on("submit", function (submission) {
                        updateData(
                            formcode,
                            formId,
                            submission
                        )
                            .then(function () {
                                buildState.emit("submitDone", submission);
                            })
                            .catch(function (error) {
                                console.log(error);
                                buildState.emit('submitError', error);
                            });
                    });
                });
            } else {

                //show existing form without data

                const responsedata = await getForm(formcode);

                var response = responsedata.data;
                if (!response.i18nJson) {
                    response.i18nJson = null
                }
                if (response?.datasources) {
                    window.ds = response.datasources
                }
                window.Formio.createForm(
                    document.getElementById('formdiv'),
                    JSON.parse(response.jsonSchema), JSON.parse(response.i18nJson)
                ).then(function (build) {
                    buildState = build;
                    buildState.on('redirect', function (redirecto) {
                        navigate(`/forms/formshow/${redirecto.formcode}/${redirectto.dataoid}`);
                    })

                    buildState.on("submit", function (submission) {

                        createData(
                            formcode,
                            submission
                        )
                            .then(function (data) {
                                if (data.ids && data.ids.length > 0) {
                                    window.resultId = data.ids[0]
                                }
                                buildState.emit('submitDone', submission)
                            })
                            .catch(function (error) {
                                buildState.emit('submitError', error)
                                console.log(error)
                            });
                    });
                });
            }
        }
    }


    const onCloseForm = () => {
        handlerCloseForm();
        setOPForm(initialOPForm);
    }
    return (
        <div>
            <label>You can fill the record identifier to load the form with the record data</label>
            <br></br>
            <input value={oid} onChange={e => setOid(e.target.value)}
            /><br></br><br></br>
            <NavLink className={'btn btn-primary btn-sm'}
                to={`/forms/formshow/${formcode}/${oid}`} >
                Show Form
            </NavLink>
            <NavLink className={'btn btn-link btn-sm'}
                to={'/forms'} >
                Back to List
            </NavLink>
            <hr class="hr" />

            <div id="formdiv"></div>
        </div>
    )
}