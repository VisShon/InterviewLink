
import nltk
import ssl
import os
import traceback

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

nltk.download('stopwords')
import spacy
spacy.cli.download("en_core_web_sm")

 
from pyresparser import ResumeParser
from flask import Flask, jsonify, request

testFile_path = "example-resume/Heemank_Verma.pdf"

def extract_text(file):
  data = ResumeParser(file).get_extracted_data()
  return data
# multiple files are being given as input to the function extract_text and the output is stored in a list
def extract_text_multiple(files):
  data = []
  for file in files:
    data.append(ResumeParser(file).get_extracted_data())
  return data



app = Flask(__name__)

try:
    path = os.path.dirname(os.path.abspath(__file__))
    upload_folder = os.path.join(path, "tmp")
    os.makedirs(upload_folder, exist_ok=True)
    app.config["UPLOAD_FOLDER"] = upload_folder
except Exception as e:
    app.logger.info("Error in creating upload folder:")
    app.logger.error("Exception occured: {}".format(e))


@app.route('/', methods = ['GET', 'POST']) 
def home(): 
	if(request.method == 'GET'): 

		data = "hello world"
		return jsonify({'data': data}) 

@app.get("/resumeOCR/")
def resumeOCR():
    x = extract_text(testFile_path)
    print(x)
    return { "data": x}



# A simple function that takes single pdf files as form input, runs the extract_text function on it and returns the output as a json object 
# curl -X POST -F 'file=@<path_to_file>' http://localhost:8000/resumetojson/
@app.post("/resumetojson/")
def resumetojson():
    path = ""
    try:
      pdf_file = request.files['file']
      print(pdf_file, type(pdf_file), request.files)
      save_path = os.path.join(app.config.get('UPLOAD_FOLDER'), "temp.pdf")
      pdf_file.save(save_path)
      path = save_path
    except Exception as e:
        app.logger.info("Error in saving file:")
        app.logger.error("Exception occured: {}".format(e))
        app.logger.error("Traceback: {}".format(traceback.format_exc()))
        return {"text": "Error in saving file"}
    
    extracted_text = extract_text(path)
    os.remove(path)
    return {"text": extracted_text}


# A simple function that takes multiple pdf files as form input, runs the extract_text_multiple function on them and returns the output as a list 
# the function must support multiple files as input
# curl example : curl -X POST -F 'file=@<path_to_file>' -F 'file=@<path_to_file>' http://localhost:8000/resumetojsonmultiple/
@app.post("/resumetojsonmultiple/")
def resumetojsonmultiple():
  files_paths  = []
  try:
    pdf_files = request.files.getlist('file')
    # save all the files in the upload folder
    for pdf_file in pdf_files:
      files_paths.append(os.path.join(app.config.get('UPLOAD_FOLDER'), pdf_file.filename))
      pdf_file.save(files_paths[-1])
  except Exception as e:
      app.logger.info("Error in saving file:")
      app.logger.error("Exception occured: {}".format(e))
      app.logger.error("Traceback: {}".format(traceback.format_exc()))
      return {"text": "Error in saving file"}

  extracted_text = extract_text_multiple(files_paths)
  # remove all the files from the upload folder
  for file_path in files_paths:
    os.remove(file_path)
  return {"text": extracted_text}

     
# driver function 
if __name__ == '__main__': 
	app.run(debug = True) 
