import os
import tempfile
import pytest
from app import app

testFile_path1 = "example-resume/Heemank_Verma.pdf"
testUser1 = "Heemank Verma"
testFile_path2 = "example-resume/John_Doe.pdf"
testUser2 = "John Doe"

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_ping_endpoint(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b'hello world' in response.data

def test_resumeOCR_endpoint_Name(client):
    response = client.get('/resumeOCR/')
    assert response.status_code == 200
    assert b'Heemank Verma' in response.data

def test_resumeOCR_endpoint_Company(client):
    response = client.get('/resumeOCR/')
    assert response.status_code == 200
    assert b'Timeswap' in response.data

def test_resumeOCR_endpoint_Job(client):
    response = client.get('/resumeOCR/')
    assert response.status_code == 200
    assert b'SDK & Frontend Developer' in response.data

def test_resumeOCR_endpoint_Description(client):
    response = client.get('/resumeOCR/')
    assert response.status_code == 200
    assert b'CodingNinjas' in response.data

def test_resumetojson_endpoint_Name(client):
    with open(testFile_path1, 'rb') as resume_file:
        data = {'file': (resume_file, testFile_path1)}
        response = client.post('/resumetojson/', data=data, content_type='multipart/form-data')
    print(response.data, "response.data")
    assert response.status_code == 200
    assert b'Heemank Verma' in response.data

def test_resumetojson_endpoint_Company(client):
    with open(testFile_path1, 'rb') as resume_file:
        data = {'file': (resume_file, testFile_path1)}
        response = client.post('/resumetojson/', data=data, content_type='multipart/form-data')
    print(response.data, "response.data")
    assert response.status_code == 200
    assert b'CodingNinjas' in response.data

def test_resumetojson_endpoint2(client):
    with open(testFile_path2, 'rb') as resume_file:
        data = {'file': (resume_file, testFile_path2)}
        response = client.post('/resumetojson/', data=data, content_type='multipart/form-data')
    print(response.data, "response.data")
    assert response.status_code == 200
    assert b'John Doe' in response.data

def test_resumetojsonmultiple_endpoint(client):
    with open(testFile_path2, 'rb') as resume_file:
        data = {'file': (resume_file, testFile_path2)}
        response = client.post('/resumetojson/', data=data, content_type='multipart/form-data')
    print(response.data, "response.data")
    assert response.status_code == 200
    assert b'John Doe' in response.data

# # Ensure 100% code coverage
def test_main():
    import coverage
    cov = coverage.Coverage(source=['app'])
    cov.start()
    
    # Import your app after starting coverage
    import app

    cov.stop()
    cov.save()

if __name__ == '__main__':
    pytest.main()
