import request from '@/utils/request';

export async function omimChpo_list(info) {
  let response =  request('/api/order/omimChpo/list',{
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    },
    params: info,
  });
  return response;
}

export async function deleteByUuid(uuid) {
  return request.delete('/api/order/omimChpo/delete/'+uuid);
}

