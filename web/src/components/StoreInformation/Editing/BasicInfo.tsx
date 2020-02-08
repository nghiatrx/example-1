import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from 'antd';
import { TextField, Select } from '../../Inputs';
import { connect } from 'react-redux';
import { District } from '../../../store/districts/district.interface';
import { City } from '../../../store/cities/city.interface';
import { Store } from '../../../store/storeinfo/storeinfo.interface';
import { saveStore, getDistrictsFromApi } from '../../../store/actions';

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
    props.dispatch(saveStore(values));
  }

  const getDistrictApi = (cityId: string) => {
    props.dispatch(getDistrictsFromApi(cityId))
  }

  useEffect(() => {
    if (props.formValuesInitial.city !== props.formValues.city) {
      props.change('district', ''); // when change city, set emply for district
    }
    if (props.formValues.city && !props.districts[props.formValues.city]) {
      getDistrictApi(props.formValues.city)
    }
  }, [props.formValues.city]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (props.formValuesInitial.redInvoice?.city !== props.formValues.redInvoice?.city) {
      props.change('redInvoice.district', ''); // when change city, set emply for district
    }
    if (props.formValues.redInvoice?.city && !props.districts[props.formValues.redInvoice?.city]) {
      getDistrictApi(props.formValues.redInvoice?.city)
    }
  }, [props.formValues.redInvoice?.city]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <form onSubmit={props.handleSubmit(submit)}>
        <Row gutter={[16, 16]}>
          <Col md={24}><b>{t('BASIC INFO')}.</b></Col>
          <Col md={24}>
            <div className='storeName'>
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
            <div className='storeAddress'>
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
            <div className='district'>
              <label>{t('District')}</label>
              <div>
                <Field name="district" component={Select} options={props.districts[props.formValues.city || ''] || []} />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className='city'>
              <label>{t('City')}</label>
              <div>
                <Field name="city" component={Select} options={props.cities || []} />
              </div>
            </div>
          </Col>

          <Col md={24}>
            <div className='phone'>
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
                <Field name="redInvoice.district" component={Select} options={props.districts[props.formValues.redInvoice?.city || ''] || []} />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div>
              <label>{t('City')}</label>
              <div>
                <Field name="redInvoice.city" component={Select} options={props.cities || []} />
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
  districts: { [key: string]: District[] },
  cities: City[],
  formValues: Store,
  formValuesInitial: Store,
  change: Function, // prop from reduxForm
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
    formValues: state.form.store ? state.form.store.values : {},
    formValuesInitial: state.form.store ? state.form.store.initial : {},
    districts: state.districts,
    cities: state.cities
  })
)(BasicInfo);

export default BasicInfo;