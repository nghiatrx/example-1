import { District } from '../../store/districts/district.interface'
import { setDistricts  } from '../../store/actions'
import store from '../../store'

describe('Districts Reducer', () => {
  const districts1: District[] = [
    {
      id: 'city1',
      text: 'City 1',
      cityId: 'Hanoi'
    },
    {
      id: 'city2',
      text: 'City 2',
      cityId: 'Hanoi'
    }
  ]
  
  const districts2: District[] = [
    {
      id: 'city3',
      text: 'City 3',
      cityId: 'HCMC'
    },
    {
      id: 'city4',
      text: 'City 4',
      cityId: 'HCMC'
    }
  ]

  it('setCities() action round 1', () => {
    store.dispatch(setDistricts('Hanoi', districts1))
    expect(store.getState().districts).toEqual({
      'Hanoi': districts1
    })
  })


  it('setCities() action round 2', () => {
    store.dispatch(setDistricts('HCMC', districts2))
    expect(store.getState().districts).toEqual({
      'Hanoi': districts1,
      'HCMC': districts2
    })
  })
})