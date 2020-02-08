import store from '../../store'
import { getDistrictsFromApi } from '../../store/actions';
import axios from 'axios'
import { District } from '../../store/districts/district.interface';

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const data1: District[] = [
  {
    id: 'city1',
    text: 'District 1',
    cityId: 'District 1',
  },
  {
    id: 'city1',
    text: 'District 2',
    cityId: 'District 2',
  }
]

const data2: District[] = [
  {
    id: 'city2',
    text: 'District 3',
    cityId: 'District 3',
  },
  {
    id: 'city2',
    text: 'District 4',
    cityId: 'District 4',
  }
]

afterEach(() => {
  jest.restoreAllMocks();
})

describe('Districts API', () => {
  it('Get Districts round 1', async () => {
    mockedAxios.get.mockResolvedValue({ data: data1 })
    await store.dispatch(getDistrictsFromApi('city1'))
    expect(store.getState().districts).toEqual({
      'city1': data1
    })
  });

  it('Get Districts round 2', async () => {
    mockedAxios.get.mockResolvedValue({ data: data2 })
    await store.dispatch(getDistrictsFromApi('city2'))
    expect(store.getState().districts).toEqual({
      'city1': data1,
      'city2': data2
    })
  });
});