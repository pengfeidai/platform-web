import {Effect, Reducer} from 'umi';
import {Endpoint, Node, Service} from './data.d';
import {callService, queryServices} from './service';

export interface CallState {
  services: Service[];
  nodes: Node[];
  endpoints: Endpoint[];
}

export interface ModelType {
  namespace: string;
  state: CallState;
  effects: {
    fetch: Effect;
    callService: Effect;
  };
  reducers: {
    queryServices: Reducer<CallState>;
    callService: Reducer<CallState>;
  };
}

const Model: ModelType = {
  namespace: 'callService',

  state: {
    services: [],
    nodes: [],
    endpoints: []
  },

  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(queryServices, payload);
      const data = Array.isArray(response.data) ? response.data : [];

      const services: Service[] = data

      yield put({
        type: 'queryServices',
        payload: services,
      });
    },
    * callService({payload}, {call, put}) {
      const response = yield call(callService, payload);
      yield put({
        type: 'callService',
        payload: response.data,
      });
    },

  },

  reducers: {
    queryServices(state, action) {
      return {
        ...(state as CallState),
        services: action.payload,
      };
    },
    callService(state, action) {
      return {
        ...(state as CallState),
      };
    },
  },
};

export default Model;
