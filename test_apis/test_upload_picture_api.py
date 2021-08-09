import requests

api = "https://7pa6zs0wm6.execute-api.us-east-1.amazonaws.com"
upload_api = f'{api}/upload'
test_image = 'image.jpg'

# 获取Upload Url
def get_upload_url(api):
  res = requests.get(api)
  if res.status_code == 200:
    upload_url = res.json()['uploadUrl']
    key = res.json()['key']
    return upload_url, key

# 上传图片
def upload_image(url, img_data):
  res = requests.put(url, data=img_data, headers={'content-type': 'image/jpeg'})
  return res.status_code == 200
    
with open(test_image, 'rb') as f:
  upload_url, key = get_upload_url(upload_api)
  img_data = f.read()
  if upload_image(upload_url, img_data):
    print(f'上传成功！图片名称为：{key}')
  else:
    print('上传失败')