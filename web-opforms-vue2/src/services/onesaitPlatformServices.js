import axios from 'axios';

export async function loadFormsList(platformbase, authorization) {
  if (!authorization || !authorization.token_type) {
    return null
  }
  let forms = [];
  const response = await axios.get(
    `${platformbase}/controlpanel/api/forms/`,
    {
      headers: createHeader(authorization)
    }
  )
  forms = response.data;
  return forms;
}
export async function getForm(platformbase, formid, authorization) {
  if (!authorization || !authorization.token_type) {
    return null
  }
  let url = `${platformbase}/controlpanel/api/forms/${formid}`;
  return axios.get(url, {
    headers: createHeader(authorization)
  });
}

export async function getData(platformbase, formid, dataoid, authorization) {
  if (!authorization || !authorization.token_type) {
    return null
  }
  return axios.get(`${platformbase}/controlpanel/api/forms/${formid}/data/${dataoid}`,
    {
      headers: createHeader(authorization)
    }
  );
}

export async function createData(platformbase, formid, submission, authorization) {
  if (!authorization || !authorization.token_type) {
    return null
  }
  submission.metadata.formId = formid
  delete submission.data.submit
  return axios.post(
    `${platformbase}/controlpanel/api/forms/submit`, submission,
    {
      headers: createHeader(authorization)
    }
  );
}
export async function updateData(platformbase, formid, dataoid, submission, authorization) {
  if (!authorization || !authorization.token_type) {
    return null
  }
  submission.metadata.formId = formid
  submission.metadata.dataId = dataoid
  delete submission.data.submit
  return axios.post(
    `${platformbase}/controlpanel/api/forms/submit/update`, submission,
    {
      headers: createHeader(authorization)
    }
  );
}

export async function login(platformbase, auth, user, pass) {

  let payload = { 'grant_type': 'password', 'username': user, 'password': pass }
  return axios.post(
    `${platformbase}/auth/realms/onesaitplatform/protocol/openid-connect/token`
    , payload
    , {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': auth
      }
    }
  );
}

function createHeader(authorization) {
  if (authorization && authorization.token_type && authorization.token_type.toUpperCase() == 'BEARER') {
    window.authorization = { token_type: 'bearer', access_token: authorization.access_token }
    return {
      accept: "application/json",
      "Authorization": `Bearer ${authorization.access_token}`
    }
  } else {
    return null
  }
}