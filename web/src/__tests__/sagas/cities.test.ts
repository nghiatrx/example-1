import store from '../../store'
import { getCitiesFromApi } from '../../store/actions';
import axios from 'axios'
import { City } from '../../store/cities/city.interface';

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const data: City[] = [
  {
    id: 'city1',
    text: 'City 1',
  },
  {
    id: 'city1',
    text: 'City 1',
  }
]

afterEach(() => {
  jest.restoreAllMocks();
})
describe('Cities API', () => {
  it('Get Cities', async () => {
    mockedAxios.get.mockResolvedValue({ data })
    await store.dispatch(getCitiesFromApi())
    expect(store.getState().cities).toEqual(data)
  });
});