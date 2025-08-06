## Environment Creation Command

conda create -p venv python==3.12

conda activate venv/ -> cmd

pip install -r requirements.txt

## Docker build command

docker build -t cooksy:latest .

docker run -d -p 8000:8000 -e OPENAI_API_KEY="" --name cooksy-container cooksy:latest

docker tag cooksy:latest hiteshs0lanki/cooksy:latest

docker push hiteshs0lanki/cooksy:latest
