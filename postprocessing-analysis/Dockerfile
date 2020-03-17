FROM python:3

WORKDIR /post-processing

COPY . /post-processing

RUN pip install -r requirements.txt

CMD ["python3", "./postprocessing-analysis.py"]