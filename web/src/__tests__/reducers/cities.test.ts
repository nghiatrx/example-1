import { setCities } from '../../store/actions';
import { City } from '../../store/cities/city.interface';
import store from '../../store'

describe('Cities Reducer', () => {
  const cities: City[] = [
    {
      id: 'Hanoi',
      text: 'Hanoi'
    },
    {
      id: 'HCMC',
      text: 'HCMC'
    },
    {
      id: 'Danang',
      text: 'Danang'
    }
  ]
  
  it('setCities() action', () => {
    store.dispatch(setCities(cities))
    expect(store.getState().cities).toEqual(cities)
  })
})