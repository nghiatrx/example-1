import React, { Suspense } from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import App from '../../App';
import store from '../../store';
import { act, Simulate } from 'react-dom/test-utils';
import axios from 'axios'
import { Store } from '../../store/storeinfo/storeinfo.interface';

jest.mock('axios')

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: key => key})
}))

const mockedAxios = axios as jest.Mocked<typeof axios>

const data: Store = {
  id: 'id2',
  logoUrl: '',
  name: 'test name',
  address: 'test address',
  district: 'test district',
  city: 'test city',
  phone: '1234567890',
  redInvoice: {
    name: 'invoice name',
    address: 'invoice address',
    district: 'invoice district',
    city: 'invoice city',
    taxCode: 'invoice taxCode'
  }
}

var container;

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
  jest.restoreAllMocks()
})

describe('App', () => {
  it('Match Some Texts', async () => {
    mockedAxios.get.mockResolvedValue({ data })
    await act(async () => {
      ReactDOM.render(<Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </Provider>, container);
    });
 
    // make sure store data have been loaded on UI
    expect(container.textContent).toMatch(RegExp(`${data.name}`))
    expect(container.textContent).toMatch(RegExp(`${data.address}`))
    expect(container.textContent).toMatch(RegExp(`${data.phone}`))
    expect(container.textContent).toMatch(RegExp(`${data.redInvoice?.address}`))
    expect(container.textContent).toMatch(RegExp(`${data.redInvoice?.taxCode}`))

    const button = document.getElementsByClassName('editProfileBtn')[0]
    expect(button).toBeVisible()

    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })

    const modal = document.getElementsByClassName('editingModal')[0]

    expect(modal).toBeVisible() // modal must be shown

    const phoneInput = modal.getElementsByClassName('phone')[0].getElementsByTagName('input')[0]

    expect(phoneInput).toBeVisible()

    act(() => {
      phoneInput.value = 'invalid phone number'
      Simulate.change(phoneInput)
      Simulate.keyDown(phoneInput, {key: 'Enter', keyCode: 13, which: 13});
    })
    expect(modal.getElementsByClassName('phone')[0].getElementsByClassName('error')[0]).toBeVisible()

    act(() => {
      phoneInput.value = '84399761629' // valid phone number
      Simulate.change(phoneInput)
      Simulate.keyDown(phoneInput, {key: 'Enter', keyCode: 13, which: 13});
    })
    expect(modal.getElementsByClassName('phone')[0].getElementsByClassName('error')[0]).toBeUndefined()

    act(() => {
      phoneInput.value = '843997616291111' // unvalid phone number, too long
      Simulate.change(phoneInput)
      Simulate.keyDown(phoneInput, {key: 'Enter', keyCode: 13, which: 13});
    })
    expect(modal.getElementsByClassName('phone')[0].getElementsByClassName('error')[0]).toBeVisible()

    act(() => {
      phoneInput.value = 'a4399761629' // unvalid phone number
      Simulate.change(phoneInput)
      Simulate.keyDown(phoneInput, {key: 'Enter', keyCode: 13, which: 13});
    })
    expect(modal.getElementsByClassName('phone')[0].getElementsByClassName('error')[0]).toBeVisible()
  }); 
})
