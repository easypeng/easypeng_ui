import { omimChpo_list as queryomimChpos, deleteByUuid } from '@/services/omimChpo';
import { message } from 'antd';

// 包含同步更新 state 的 reducers，处理异步逻辑的 effects，

export default {
  // namespace 命名空间
  namespace: 'omimChpo',
  // state 相当于原生React中的state状态，用于存放数据的初始值。
  state: {
		tableData: [],
		totalSize: 0,
		current: 1,
		pageSize: 20
  	},
  // effects 用于和后台交互，是处理异步数据逻辑的地方。
  effects: {
    *getAllomimChpo({payload}, { call, put }) {
      try {
        const response = yield call(queryomimChpos,payload);
        yield put({
          type: 'getAllomimChpoData',
          payload: response.data.content,
        });
      }catch(e){
        message.warn(e.message);
      }
    },
    *delete_by_uuid(_, { call, put }) {
      const response = yield call(deleteByUuid);
      yield put({
        type: 'deleteByUuid',
        payload: response,
      });
    },
  },
  // reducers 用于存放能够改变view的action，这里按照官方说明，不应该做数据的处理，只是用来return state，从而改变view层的展示。
  reducers: {
    getAllomimChpoData(state, action) {
      console.log('loadding data')
      return { ...state, tableData: action.payload, };
    },
    deleteByUuid(state, { payload: uuid }) {
      return state.filter(item => item.uuid !== uuid);
    },
  },
//subscriptions 订阅监听，比如监听路由，
// 进入页面如何如何，就可以在这里处理。
// 相当于原生React中的componentWillMount方法。
// 就比如上述代码，监听/project路由，进入该路由页面后，
// 将发起getAllProjects aciton，获取页面数据。

subscriptions: {
  setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
          if (pathname === '/omimChpo') {
              dispatch({
                  type: 'getAllomimChpo'
              });
          }
      });
  }
},
}


/**
 * Dva 数据流向
 * 总的来说如下：View层操作 –> 触发models层effect中方法 –> 触发service层请求，
 * 获取后台数据 –> 触发model层处理相应数据的方法，存储至reducer中 –> 更新model层中state –> 
 * 触发view层的render方法进行重新渲染 –> 页面更新
 * 
 */