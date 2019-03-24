import * as diseasesService from '../services/diseases';

export default {
  namespace: 'diseases',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch({ payload: { page = 1, values } }, { call, put }) {
      debugger
      const { data } = yield call(diseasesService.fetch, { page, values });
      yield put({
        type: 'save',
        payload: {
          data: data.content,
          total: parseInt(data.total, 10),
          page: parseInt(page, 10),
        },
      });
    },
    *remove({ payload: uuid }, { call, put }) {
      yield call(diseasesService.remove, uuid);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { uuid, values } }, { call, put }) {
      yield call(diseasesService.patch, uuid, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(diseasesService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/diseases') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
