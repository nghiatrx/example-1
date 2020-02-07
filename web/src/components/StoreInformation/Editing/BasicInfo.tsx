import React from 'react';
import { useTranslation } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from 'antd';
import { TextField, Select } from '../../Inputs';
import { connect } from 'react-redux';
import { District } from '../../../store/districts/district.interface';
import { City } from '../../../store/cities/city.interface';
import { Store } from '../../../store/storeinfo/storeinfo.interface';
import { saveStore } from '../../../store/actions';

const isValidPhone = (phone: string): boolean => {
  // length must be from 9 to 11
  var regex = /^([0-9]){9,11}$/;
  return phone.match(regex) !== null;
}

const validate = (values: Store) => {
  const errors: any = {}
  if (!values.name) {
    errors.name = 'Required';
  }
  errors.redInvoice = {};
  if (!values.redInvoice?.name) {
    errors.redInvoice.name = 'Required';
  }
  if (!values.redInvoice?.taxCode) {
    errors.redInvoice.taxCode = 'Required';
  }

  if (!values.phone) {
    errors.phone = 'Required';
  } else if (!isValidPhone(values.phone || '')) {
    errors.phone = 'Invalid'
  }

  return errors
}

let BasicInfo: any = React.memo((props: BasicInfoProps) => {
  const { t } = useTranslation();

  const submit = (values: Store) => {
    console.log('111', values)
    props.dispatch(saveStore(values));
  }

  return (
    <div>
      <form onSubmit={props.handleSubmit(submit)}>
        <Row gutter={[16, 16]}>
          <Col md={24}><b>{t('BASIC INFO')}.</b></Col>
          <Col md={24}>
            <div>
              <label>{t('Store Name')}</label>
              <div>
                <Field
                  name="name"
                  component={TextField}
                  type="text"
                />
              </div>
            </div>
          </Col>

          <Col md={12}>
            <div>
              <label>{t('Store Address')}</label>
              <div>
                <Field
                  name="address"
                  component={TextField}
                  type="text"
                />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div>
              <label>{t('District')}</label>
              <div>
                <Field name="district" component={Select} options={props.districts} />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div>
              <label>{t('City')}</label>
              <div>
                <Field name="city" component={Select} options={props.cities} />
              </div>
            </div>
          </Col>

          <Col md={24}>
            <div>
              <label>{t('Phone')}#</label>
              <div>
                <Field
                  name="phone"
                  component={TextField}
                  type="text"
                />
              </div>
            </div>
          </Col>

          <Col md={24}>
            <b>{t('RED INVOICE INFO')}.</b>
          </Col>

          <Col md={24}>
            <div>
              <label>{t('Company name')}</label>
              <div>
                <Field
                  name="redInvoice.name"
                  component={TextField}
                  type="text"
                />
              </div>
            </div>
          </Col>

          <Col md={12}>
            <div>
              <label>{t('Company Address')}</label>
              <div>
                <Field
                  name="redInvoice.address"
                  component={TextField}
                  type="text"
                />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div>
              <label>{t('District')}</label>
              <div>
                <Field name="redInvoice.district" component={Select} options={props.districts} />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div>
              <label>{t('City')}</label>
              <div>
                <Field name="redInvoice.city" component={Select} options={props.cities} />
              </div>
            </div>
          </Col>

          <Col md={24}>
            <div>
              <label>{t('MST')}</label>
              <div>
                <Field
                  name="redInvoice.taxCode"
                  component={TextField}
                  type="text"
                />
              </div>
            </div>
          </Col>

          <Col md={24}>
            <button style={{ width: '100%' }} type='submit' className='btn primary'>{t('Save')}</button>
          </Col>

          <Col md={24}>
            <button onClick={() => props.onClose()} style={{ width: '100%' }} type='button' className='btn default'>{t('Cancel')}</button>
          </Col>

        </Row>


      </form>
    </div>
  )
})

export interface BasicInfoProps {
  dispatch: Function, // connect redux
  districts: District[],
  cities: City[],
  onClose: Function,
  handleSubmit: Function, // from reduxForm
  submitting: boolean // from reduxForm
}

BasicInfo = reduxForm({
  form: 'store',
  validate
})(BasicInfo);

BasicInfo = connect(
  (state: any) => ({
    initialValues: state.storeinfo,
    districts: state.districts,
    cities: state.cities
  })
)(BasicInfo);

export default BasicInfo;