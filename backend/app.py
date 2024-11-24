from flask import Flask, request, jsonify
from flask_restx import Api, Resource, fields
import sympy as sp
from flask_cors import CORS

app = Flask(__name__)
api = Api(app, doc="/docs")  # Swagger UIを'/docs'に表示
CORS(app)

# APIモデルの定義
calc_model = api.model(
    "Calculation",
    {
        "expression": fields.String(
            required=True, description="The mathematical expression to be evaluated"
        )
    },
)


class Calculate(Resource):
    @api.expect(calc_model)  # 入力データの形式を定義
    def post(self):
        data = request.get_json()
        expression = data.get("expression")

        try:
            # sympyを使って式を解析・計算
            expr = sp.sympify(expression)  # 文字列を数式として解析
            result = expr.evalf()  # 数式を評価

            # 0除算の検出（評価結果が無限大かどうか）
            if result.is_infinite:
                raise ZeroDivisionError("Division by zero encountered")

            # 正常なレスポンスを返す
            return {"result": float(result)}

        # 数式の解析エラー
        except sp.SympifyError:
            return {"result": "Invalid mathematical expression"}, 400

        # 0除算エラー
        except ZeroDivisionError as zde:
            return {"result": f"Math Error: {str(zde)}"}, 400

        # TypeErrorなどの式評価中のエラー
        except TypeError as te:
            return {"result": f"Type Error: {str(te)}"}, 400

        # その他のエラーをキャッチ
        except Exception as e:
            return {"result": f"Unexpected Error: {str(e)}"}, 500

    @app.errorhandler(Exception)
    def handle_exception(self, e):
        # 未処理の例外をキャッチ
        print(f"Unhandled exception: {str(e)}")
        return jsonify({"result": "Internal server error"}), 500


# エンドポイントをAPIに追加
api.add_resource(Calculate, "/calculate")

if __name__ == "__main__":
    app.run(debug=True)
