import { PRE_PAGE } from '../defaultSettings';
import request from '@/utils/request';
import qs from 'qs';

export async function fetch({ page,values }) {
  return request(`/api/order/disease?page=${page}&per_page=${PRE_PAGE}&${qs.stringify(values)}`);
}

export async function remove(uuid) {
  return request(`/api/order/disease/${uuid}`, {
    method: 'DELETE',
  });
}

export async function patch(uuid, values) {
  return request(`/api/order/disease/${uuid}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export async function create(values) {
  return request('/api/order/disease', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

