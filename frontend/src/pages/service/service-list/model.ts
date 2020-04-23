import { Effect, Reducer } from 'umi';
import { Node, Service } from './data.d';
import { queryServices } from './service';

export class Filters {
  private s!: string;

  private n!: string;

  constructor(service: string, node: string) {
    this.s = service;
    this.n = node;
  }

  set service(value: string) {
    this.s = value;
  }

  set node(value: string) {
    this.n = value;
  }
}

export interface StateServices {
  list: Service[];
  filters: Filters;
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

const filterNode = (filter: string, nodes: Node[]) => {
  const nodesTemp: Node[] = [];
  if (filter != null) {
    nodes.forEach((n: Node) => {
      if (
        n.id.indexOf(filter) > 0 ||
        n.address.indexOf(filter) > 0 ||
        JSON.stringify(n.metadata).indexOf(filter) > 0
      ) {
        nodesTemp.push(n);
      }
    });

    return nodesTemp;
  }

  return nodes;
};

const filterService = (filter: string, services: Service[]) => {
  const servicesTemp: Service[] = [];
  if (filter != null && filter !== '') {
    services.forEach((item: Service) => {
      if (item.name.indexOf(filter) > 0) {
        servicesTemp.push(item);
      }
    });

    return servicesTemp;
  }

  return services;
};

const emptyArray = (arr: any[]) => {
  while (arr.length > 0) {
    arr.pop();
  }
};

const Model: ModelType = {
  namespace: 'searchServices',

  state: {
    list: [],
    filters: new Filters('', ''),
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryServices, payload);
      const data = Array.isArray(response.data) ? response.data : [];
      // filter locally
      const { serviceStr, nodeStr } = payload;
      const services: Service[] = filterService(serviceStr, data);

      if (nodeStr != null && nodeStr !== '') {
        services.forEach((service: Service) => {
          emptyArray(service.nodes);
          service.nodes.push(...filterNode(nodeStr, service.nodes));
        });
      }

      yield put({
        type: 'queryList',
        payload: services,
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
