from django.test.client import Client as DjangoClient
import json


class Client(DjangoClient):

    def _do_req(self, url, data, method, *args, **kwargs):
        if method == 'GET':
            response = super(Client, self).get(url, data, *args, **kwargs)
        elif method == 'POST':
            response = super(Client, self).post(url, data, *args, **kwargs)
        else:
            response = super(Client, self).delete(url, data, *args, **kwargs)

        decode = kwargs.get('decode', False)
        if decode:
            return json.loads(response.content)
        else:
            return response

    def get(self, url, data={}, *args, **kwargs):
        return self._do_req(url, data, 'GET', *args, **kwargs)

    def post(self, url, data={}, *args, **kwargs):
        return self._do_req(url, data, 'POST', *args, **kwargs)
