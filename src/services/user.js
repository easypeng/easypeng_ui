import request from '@/utils/request';
import { PAGE_SIZE } from '../defaultSettings';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function queryNotices() {
  return request('/api/notices');
}
