import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "sdos-project-404807-f914c6db5a26.json"
from google.cloud import language_v1
from google.cloud.language_v1 import types

def analyze_text(text):
    client = language_v1.LanguageServiceClient()

    document = types.Document(
        content=text,
        type=language_v1.Document.Type.PLAIN_TEXT
    )
    response = client.analyze_entities(document=document)

    return response
text = "Your text here"
result = analyze_text(text)
print(result)
