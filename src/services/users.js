import request from '@/utils/requests';
import { PRE_PAGE } from '../defaultSettings';


export async function fetch({ page }) {
  return request(`/ap/users?_page=${page}&_limit=${PRE_PAGE}`);
}

export async function remove(id) {
  return request(`/ap/users/${id}`, {
    method: 'DELETE',
  });
}

export async function patch(id, values) {
  return request(`/ap/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export async function create(values) {
  return request('/ap/users', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

