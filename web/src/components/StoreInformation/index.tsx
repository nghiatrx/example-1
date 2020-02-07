import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Card } from 'antd';
import './style.scss';
import Information from './Information';

const StoreInformation = React.memo(() => {
  const { t } = useTranslation();
  return (
    <div>
      <h3 className='title'>{t('Store Information')}</h3>
      <Row gutter={[16, 16]}>
        <Col sm={24} md={10} lg={8}>
          <Information />
        </Col>

        <Col sm={24} md={14} lg={16}>
          <Card>
            <h5>{t('Delivery Default Message')}</h5>
          </Card>
        </Col>
      </Row>
    </div>
  );
})

export default StoreInformation;
