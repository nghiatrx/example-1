import store from '../../store'
import { getStoreFromApi, saveStore } from '../../store/actions';
import { Store } from '../../store/storeinfo/storeinfo.interface';
import axios from 'axios'

jest.mock('axios')

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

afterEach(() => {
  jest.restoreAllMocks();
})

describe('Store API', () => {
  it('Get Store', async () => {
    mockedAxios.get.mockResolvedValue({ data })
    await store.dispatch(getStoreFromApi('id2'))
    expect(store.getState().storeinfo).toEqual(data)
  });

  it('Update Store', async () => {
    data.name = 'New Name'
    mockedAxios.put.mockResolvedValue({ data })
    await store.dispatch(saveStore(data))
    expect(store.getState().storeinfo).toEqual(data)
  });
});