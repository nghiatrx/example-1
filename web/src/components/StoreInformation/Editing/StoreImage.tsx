import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import axios from 'axios';
import { reduxForm } from 'redux-form';

let StoreImage: any = React.memo((props: StoreImage) => {
  const { t } = useTranslation();

  const handleUploadImg = async (e: any) => {
    try {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      const { data } = await axios.post('/files/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        props.change('logoUrl', data.filename);
    } catch (e) { }
  }

  const handleRemove = (e) => {
    e.preventDefault()
    props.change('logoUrl', '')
  }

  return (
    <div className='storeImage'>
      <b>{t('STORE IMAGE')}</b>
      <div className='image' style={{ backgroundImage: `url(${props.logoUrl ? `${process.env.REACT_APP_API_URL}/public/${props.logoUrl}` : `default.png`})` }}></div>
      <div className='btnGroup'>
        <a className='remove' href="#remove" onClick={handleRemove}>{t('Remove')}</a>
        <span className='fileBtn'>
          <input className='file' type='file' onChange={handleUploadImg} />
          <button className='btn default'>{t('Upload Image')}</button>
        </span>
      </div>
    </div>
  )
})

export interface StoreImage {
  logoUrl: string | undefined,
  change: Function // prop from reduxForm
}

StoreImage = reduxForm({
  form: 'store',
})(StoreImage);


const mapStateToProps = (state: any) => ({
  logoUrl: state.form.store && state.form.store.values ? state.form.store.values.logoUrl : ''
})

export default connect(mapStateToProps)(StoreImage);
