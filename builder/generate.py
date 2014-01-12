import os
import zipfile
import json


def main():
  versions = []
  SKIP_DIRS = ('assets', 'builder', 'nightly')
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


  output = json.dumps(versions, sort_keys=True,
                      indent=1, separators=(',', ': '))

  print output
  with open("../versions.json", "w") as text_file:
    text_file.write(output)


def build_version(versions, path, version_number):
  version = {
    'id':  ('v%s' % (version_number.replace('.', '_').replace('-', '_'))).replace('vnightly', 'nightly'),
    'version_number': version_number,
    'files': []
  }
  for (dirpath, dirnames, filenames) in os.walk(path):
    print dirpath
    for filename in filenames:
      if filename.startswith('.'):
        continue
      url = '%s/%s' % (dirpath, filename)
      url = url.replace('../', 'http://code.ionicframework.com/')
      version['files'].append(url)

  versions.append(version)

    

if __name__ == "__main__":
  main()