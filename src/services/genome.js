import request from '@/utils/request';

export async function genome_list(info) {
  let response =  request('/api/order/genome/list',{
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    },
    params: info,
  });
  return response;
}

export async function deleteByUuid(uuid) {
  return request.delete('/api/order/genome/delete/'+uuid);
}

