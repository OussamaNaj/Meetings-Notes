import sys
from googletrans import Translator
translator = Translator()

txt=sys.argv[1]
srclang= str(translator.detect(txt).lang)

res=translator.translate(txt,dest='en', src=srclang)
text=res.text


print('{"text":"'+text +'","srclang": "'+srclang+'"}')
sys.stdout.flush()
