from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect("reviews.db")

    with open("database.sql", "r") as file:
        conn.executescript(file.read())

    conn.commit()
    conn.close()


def get_db():
    conn = sqlite3.connect("reviews.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/action")
def action():
    return render_template("action.html")

@app.route("/posters")
def posters():
    return render_template("posters.html")

@app.route("/game")
def game():
    return render_template("sim.html")

@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/models")
def models():
    return render_template("models.html")


@app.route("/purchase")
def purchase():
    return render_template("purchase.html")


@app.route("/activities")
def activities():
    return render_template("action.html")


@app.route("/reviews", methods=["GET", "POST"])
def reviews():

    if request.method == "POST":
        name = request.form["name"]
        review = request.form["review"]

        conn = get_db()

        conn.execute(
            "INSERT INTO reviews (name, review) VALUES (?, ?)",
            (name, review)
        )

        conn.commit()
        conn.close()

        return redirect("/reviews")

    conn = get_db()

    reviews = conn.execute(
        "SELECT name, review FROM reviews ORDER BY id DESC"
    ).fetchall()

    conn.close()

    return render_template("reviews.html", reviews=reviews)


init_db()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)