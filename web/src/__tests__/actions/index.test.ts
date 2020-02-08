import * as actions from '../../store/actions'
import { Store } from '../../store/storeinfo/storeinfo.interface'
import IAction from '../../store/action.interface'
import { City } from '../../store/cities/city.interface'

describe('Actions', () => {
  const store: Store = {
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

  it('SET_STORE action', () => {
    const expectedAction : IAction= {
      type: actions.SET_STORE,
      payload: store
    }
    expect(actions.setStore(store)).toEqual(expectedAction)
  })

  it('SET_DISTRICTS action', () => {
    const expectedAction : IAction= {
      type: actions.SET_DISTRICTS,
      payload: {
        cityId: 'city1',
        districts: []
      }
    }
    expect(actions.setDistricts('city1', [])).toEqual(expectedAction)
  })

  it('SET_CITIES action', () => {
    const cities: City[] = [
      {
        id: 'city1',
        text: 'City 1'
      }
    ]
    const expectedAction : IAction = {
      type: actions.SET_CITIES,
      payload: cities
    }
    expect(actions.setCities(cities)).toEqual(expectedAction)
  })

})