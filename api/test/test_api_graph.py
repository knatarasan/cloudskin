import unittest
import requests
from requests.auth import HTTPBasicAuth

class APIGraph(unittest.TestCase):

    def setUp(self):
        pass

    def test_graph_post(self):

        # Make a post call
        url = 'http://127.0.0.1:8000/graph/'
        mygraph = {'graph':{'my_key':'my_value'}}
        auth = HTTPBasicAuth('admin', 'admin')
        res = requests.post(url,json=mygraph,auth = auth).json()
        graph_id = res['id']
        graph_val = res['graph']['my_key']

        # Make a get call with graph id as received above,
        response = requests.get("http://127.0.0.1:8000/graph/"+str(graph_id))
        response_body = response.json()
        assert response_body['graph']['my_key'] == graph_val

if __name__ == "__main__":
    unittest.main()


'''
 USAGE
 -----
 
 python -m unittest test_api_graph.py
'''