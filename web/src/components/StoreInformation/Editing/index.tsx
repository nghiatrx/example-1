import React, { useState, useEffect } from 'react';
import { Row, Col, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import StoreImage from './StoreImage';
import BasicInfo from './BasicInfo';
import { connect } from 'react-redux';
import { getCitiesFromApi } from '../../../store/actions';
import './style.scss';

const Editing = React.memo((props: any) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleEditClick = () => {
    setOpen(true);
  }

  useEffect(() => {
    props.dispatch(getCitiesFromApi());
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <button className='editProfileBtn btn default' onClick={handleEditClick}>{t('Edit Profile')}</button>
      <Modal className='editingModal' title={t('EDIT STORE PROFILE')} visible={open} width={1000} footer={null} onCancel={() => setOpen(false)}>
        <Row gutter={[16, 16]}>
          <Col md={10} sm={24}><StoreImage /></Col>
          <Col md={14} sm={24}><BasicInfo onClose={() => setOpen(false)} /></Col>
        </Row>
      </Modal>
    </>
  )
})

export default connect()(Editing);
