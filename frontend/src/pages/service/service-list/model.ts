import { Effect, Reducer } from 'umi';
import { Node, Service } from './data.d';
import { queryServices } from './service';

export interface StateServices {
  list: Service[];
}

export interface ModelType {
  namespace: string;
  state: StateServices;
  effects: {
    fetch: Effect;
    appendFetch: Effect;
  };
  reducers: {
    queryList: Reducer<StateServices>;
    refreshList: Reducer<StateServices>;
  };
}

const Model: ModelType = {
  namespace: 'searchServices',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryServices, payload);
      const data = Array.isArray(response.data) ? response.data : [];

      // filter locally
      const { name } = payload;
      let result: Service[] = [];

      if (name != null && name.length > 0) {
        data.forEach((item: Service) => {
          if (item.name.indexOf(name) > 0) {
            result.push(item);
            return;
          }

          item.nodes.forEach((node: Node) => {
            if (
              node.id.indexOf(name) > 0 ||
              node.address.indexOf(name) > 0 ||
              JSON.stringify(node.metadata).indexOf(name) > 0
            ) {
              result.push(item);
            }
          });
        });
      } else {
        result = data;
      }

      yield put({
        type: 'queryList',
        payload: result,
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryServices, payload);
      yield put({
        type: 'refreshList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    refreshList(state, action) {
      return {
        ...state,
        list: (state as StateServices).list.concat(action.payload),
      };
    },
  },
};

export default Model;
