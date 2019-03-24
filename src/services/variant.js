import request from '@/utils/request';

export async function variant_list(info) {
  let response =  request('/api/order/variant/list',{
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    },
    params: info,
  });
  return response;
}

export async function deleteByUuid(uuid) {
  return request.delete('/api/order/variant/delete/'+uuid);
}

