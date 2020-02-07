import React from 'react';
import { Input as AntInput } from 'antd';
import { useTranslation } from 'react-i18next';

const TextField = (props: TextField) => {
  const { input, meta: { error, warning } } = props;
  const { t } = useTranslation();

  return (
    <div>
      <AntInput
        value={input.value}
        onChange={e => input.onChange(e.target.value)} />

      {((error && <span style={{ color: '#ff0000' }}>{t(`${error}`)}</span>) || (warning && <span color='#d4ff00'>{t(`${warning}`)}}</span>))}

    </div>
  )

}

export interface TextField {
  input: any,
  meta: { error: any, warning: any } // from reduxForm
}

export default TextField;