import sys
from googletrans import Translator
translator = Translator()

txt=sys.argv[1]
srclang=sys.argv[2]
src= str(translator.detect(txt).lang)

res=translator.translate(txt,dest=srclang, src='en')

print(res.text)
sys.stdout.flush()
