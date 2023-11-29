



python3 -m pipenv install pyresparser   
python3 -m spacy download en_core_web_lg
python -m spacy download en_core_web_sm


### Runnner
if pipenv is not found :
sudo -H pip3 install -U pipenv

start pipenv shell
pipenv shell

install dependencies from requirements.txt
pipenv install -r requirements.txt

to run the app 
pipenv run gunicorn app:app

to test the app 
pipenv run pytest test_app.py  --cov=app



nltk
spacy==2.3.5
pyresparser
flask-restful
gunicorn==19.7.1
tomli==2.0.1
pluggy==1.2.0
iniconfig==2.0.0 
pytest==7.4.3
coverage==7.2.6
pytest-cov==2.12.1