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

  #print output
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
  print version_number
  build_zip(path, version_number)
  
  version = {
    'id':  ('v%s' % (version_number.replace('.', '_').replace('-', '_'))).replace('vnightly', 'nightly'),
    'version_number': version_number,
    'files': []
  }
  set_version_codename(path, version)

  zip_files = []
  css_files = []
  js_files = []
  font_files = []
  dep_files = []

  for (dirpath, dirnames, filenames) in os.walk(path):
    for filename in filenames:
      if filename.startswith('.') or filename.endswith('.txt') or filename.endswith('.json'):
        continue

      url = '%s/%s' % (dirpath, filename)
      url = url.replace('../', '/')
      if filename.endswith('.zip'):
        zip_files.append(url)
      elif filename.endswith('.css'):
        css_files.append(url)
      elif filename.endswith('.js') and 'ionic' in filename:
        js_files.append(url)
      elif 'font' in dirpath:
        font_files.append(url)
      else:
        dep_files.append(url)

  zip_files.sort()
  css_files.sort()
  js_files.sort()
  font_files.sort()
  dep_files.sort()

  version['files'] = zip_files + css_files + js_files + dep_files + font_files

  versions.append(version)

def set_version_codename(path, version):
  try:
    filename = os.path.join(path, 'version.json')
    f = open(filename, 'r')
    d = json.loads(f.read())
    f.close()

    # {
    #   "version": "0.9.24-alpha-670",
    #   "codename": "peleguin",
    #   "date": "2014-02-05",
    #   "time": "19:22:10"
    # }

    date = d.get('date', None)
    if date:
      version['release_datetime'] = date.strip()
      version['release_date'] = date.strip()

      time = d.get('time', None)
      if time:
        version['release_datetime'] += ' ' + time.strip()

    if version['id'] == 'nightly':
      version['version_codename'] = d.get('version', None)
      version['version_name'] = d.get('version', None)

    else:
      codename = d.get('codename', None)
      if codename:
        codename = d.get('codename', None)
        version['version_codename'] = codename

        version['version_name'] = ''
        names = codename.split('-')
        for n in names:
          version['version_name'] += n.capitalize() + ' '
        version['version_name'] = version['version_name'].strip()

  except:
    pass

def build_zip(path, version_number):
  zipname = os.path.join(path, 'ionic-v%s.zip' % (version_number))
  zipname = zipname.replace('vnightly', 'nightly')
  if 'nightly' not in zipname and os.path.isfile(zipname):
    return

  print 'Build ' + zipname
  zipf = zipfile.ZipFile(zipname, 'w')

  for (dirpath, dirnames, filenames) in os.walk(path):
    for filename in filenames:
      if filename.startswith('.') or '.zip' in filename or filename.endswith('.json')or filename.endswith('.txt'):
        continue
      zipf.write(os.path.join(dirpath, filename))

  zipf.close()
    

if __name__ == "__main__":
  main()