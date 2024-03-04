import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CFormFeedback,
  CFormSelect,
  CRow,
} from '@coreui/react'


const EditUserProfile = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Your Profile</strong>
          </CCardHeader>
          <CCardBody>
         
              <CForm>
              <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">First name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="dsadsad"
                    placeholder="Jhon"
                    required
                  />
                </div>
               
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Last Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="dadsad"
                    placeholder="Doe"
                  />
                </div>
               
                <div className="mb-3">
                  {/* <CFormLabel htmlFor="exampleFormControlInput1">UserName</CFormLabel>
                  <CFormInput
                    type="text"
                    id="exampleFormsst1"
                    placeholder="@jhondoe"
                  /> */}
                    <CCol md={12}>
                      <CFormLabel htmlFor="validationCustomUsername">Username</CFormLabel>
                      <CInputGroup className="has-validation">
                      <CInputGroupText id="inputGroupPrepend">@</CInputGroupText>
                        <CFormInput
                          type="text"
                          id="validationCustomUsername"
                          defaultValue=""
                          aria-describedby="inputGroupPrepend"
                          required
                          maxLength={15}
                        />
                      <CFormFeedback invalid>Please choose a username.</CFormFeedback>
                      </CInputGroup>
                    </CCol>
                </div>
               
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Phone No</CFormLabel>
                  <CFormInput
                    type="text"
                    id="dsadas"
                    placeholder="03032221122"
                  />
                </div>
            
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Password</CFormLabel>
                  <CFormInput
                    type="password"
                    id="exampleFormsst1"
                    placeholder="3231232"
                  />
                </div>
               
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Confirm Password</CFormLabel>
                  <CFormInput
                    type="password"
                    id="dsadsad"
                    placeholder="3231232"
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Address </CFormLabel>
                  <CFormTextarea id="exampleFormControlTextarea1" rows="3"></CFormTextarea>
                </div>
                <div className="col-auto">
                  <CButton type="submit" className="mb-3">
                   Update Profile
                  </CButton>
                </div>
              </CForm>

          
          </CCardBody>
        </CCard>
      </CCol>
      
    </CRow>
  )
}

export default EditUserProfile
