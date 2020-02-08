import { setStore } from '../../store/actions';
import { Store } from '../../store/storeinfo/storeinfo.interface';
import store from '../../store'

describe('StoreInfo Reducer', () => {
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
  
  it('setStore() action', () => {
    store.dispatch(setStore(data))
    expect(store.getState().storeinfo).toEqual(data)
  })
})