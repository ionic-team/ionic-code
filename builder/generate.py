import os
import zipfile
import json


def main():
  versions = []
  ionicons = []
  SKIP_DIRS = ('assets', 'builder', 'nightly', 'contrib', 'ionicons')
  ROOT_DIR = '../'

  for f in os.listdir(ROOT_DIR):
    if f.startswith('.'):
      continue

    path = os.path.join(ROOT_DIR, f)
    if os.path.isdir(path) and f not in SKIP_DIRS:
      build_version(versions, path, f)

  def sort_name(k):
    key = k['version_number']
    if '-' not in key:
      key += '-release'
    return key

  versions = sorted(versions, key=lambda k: sort_name(k), reverse=True) 
  build_version(versions, '../nightly', 'nightly')

  build_ionicons(ionicons)
  ionicons = sorted(ionicons, key=lambda k: sort_name(k), reverse=True) 

  data = {
    'versions': versions,
    'ionicons': ionicons
  }

  output = json.dumps(data, sort_keys=True,
                      indent=1, separators=(',', ': '))

  print output
  with open("../versions.json", "w") as text_file:
    text_file.write(output)

def build_ionicons(ionicons):
  IONICONS_DIR = '../ionicons'

  for f in os.listdir(IONICONS_DIR):
    if f.startswith('.'):
      continue

    path = os.path.join(IONICONS_DIR, f)
    if os.path.isdir(path):
      build_version(ionicons, path, f)

def build_version(versions, path, version_number):
  build_zip(path, version_number)
  
  version = {
    'id':  ('v%s' % (version_number.replace('.', '_').replace('-', '_'))).replace('vnightly', 'nightly'),
    'version_number': version_number,
    'files': []
  }
  for (dirpath, dirnames, filenames) in os.walk(path):
    print dirpath
    for filename in filenames:
      if filename.startswith('.') :
        continue
      url = '%s/%s' % (dirpath, filename)
      url = url.replace('../', '/')
      version['files'].append(url)

  versions.append(version)


def build_zip(path, version_number):
  zipname = os.path.join(path, 'ionic-v%s.zip' % (version_number))
  zipname = zipname.replace('vnightly', 'nightly')
  if os.path.isfile(zipname):
    return

  zipf = zipfile.ZipFile(zipname, 'w')

  for (dirpath, dirnames, filenames) in os.walk(path):
    print dirpath
    for filename in filenames:
      if filename.startswith('.') or '.zip' in filename:
        continue
      zipf.write(os.path.join(dirpath, filename))

  zipf.close()
    

if __name__ == "__main__":
  main()