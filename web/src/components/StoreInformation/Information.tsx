import React, { useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Store } from '../../store/storeinfo/storeinfo.interface';
import Editing from './Editing';
import { getStoreFromApi } from '../../store/actions';

const Information = React.memo((props: InformationProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    props.dispatch(getStoreFromApi('id1'))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card title="Card title">
      <div className='image' style={{ backgroundImage: `url(${props.logoUrl ? `${process.env.REACT_APP_API_URL}/public/${props.logoUrl}` : `default.png`})` }}></div>
      <div className='groupLabel'>{t('Store Info')}.</div>
      <Row className='rowInfo'>
        <Col md={12}>{t('Name')}:</Col>
        <Col md={12}>{props.name}</Col>
      </Row>
      <Row className='rowInfo'>
        <Col md={12}>{t('Address')}:</Col>
        <Col md={12}>{props.address}</Col>
      </Row>
      <Row className='rowInfo'>
        <Col md={12}>{t('Phone')} #:</Col>
        <Col md={12}>{props.phone}</Col>
      </Row>
      <div className='groupLabel'>{t('Red Invoice Info')}.</div>
      <Row className='rowInfo'>
        <Col md={12}>{t('Company Name')}:</Col>
        <Col md={12}>{props.redInvoice?.name}</Col>
      </Row>
      <Row className='rowInfo'>
        <Col md={12}>{t('Address')}:</Col>
        <Col md={12}>{props.redInvoice?.address}</Col>
      </Row>
      <Row className='rowInfo'>
        <Col md={12}>{t('MST')}:</Col>
        <Col md={12}>{props.redInvoice?.taxCode}</Col>
      </Row>

      <Editing />

    </Card>
  )
})

interface InformationProps extends Store {
  dispatch: Function
}

const mapStateToProps = (state: { storeinfo: Store }) => (
  state.storeinfo
)

export default connect(mapStateToProps)(Information);
