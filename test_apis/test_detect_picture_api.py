import requests

api = 'https://7pa6zs0wm6.execute-api.us-east-1.amazonaws.com'
detect_api = f'{api}/detect'
key = '9024592fadae45eeaff4b68d71493748.jpg'
res = requests.get(detect_api, params={
  'key': key
})
print(res.json())
  