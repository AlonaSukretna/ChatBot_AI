FROM python:3.6

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

ADD model_clf.pkl ./model_clf.pkl
ADD model_count_vect.pkl ./model_count_vect.pkl

COPY . .

EXPOSE 1337
CMD python3 -m sanic server.app --host=0.0.0.0 --port=1337 --workers=2
