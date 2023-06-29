import subprocess
import time

for i in range(1000000000):
    print('Try {}'.format(i))

    # The api of call is different between windows(os.name=nt) and linux(os.name=posix) platforms
    ret = subprocess.call(['git', 'push', '-u', 'origin', 'main'])

    print(ret)
    if ret == 0:
        break

    time.sleep(1)
