import request from '@/utils/request';

export async function sange_list(info) {
  let response =  request('/api/order/sanger/list',{
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    },
    params: info,
  });
  return response;
}

export async function deleteByUuid(uuid) {
  return request.delete('/api/order/sanger/delete/'+uuid);
}

