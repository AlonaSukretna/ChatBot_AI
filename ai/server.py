from sanic import Sanic
from sanic.response import json as json

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.naive_bayes import MultinomialNB
from sklearn.externals import joblib

app = Sanic()

def classification(docs):
    clf = joblib.load('/usr/src/app/model_clf.pkl')
    count_vect = joblib.load('/usr/src/app/model_count_vect.pkl')

    x = count_vect.transform(docs)
    result = clf.predict(x)

    return result

# http://localhost:1337/api/test?doc="what%20a%20good%20thing"
# http://localhost:1337/api/test?doc="what%20a%20bad%20thing"
@app.route("api/test", methods=["GET"])
async def test(request):
    doc = request.args["doc"][0]

    result = classification([doc])

    return json({"result": str(result[0])})

# { "docs":[ "what a good thing", "what a bad thing"]}
@app.route("api/classify", methods=["POST"])
async def classify(request):
    docs = request.json

    result = classification(docs["docs"])

    return json({"result": ",".join(str(n) for n in result)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=1337, workers=2)
