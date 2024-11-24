from flask import Flask, request, jsonify
from flask_restx import Api, Resource, fields
import sympy as sp

app = Flask(__name__)
api = Api(app, doc='/docs')  # Swagger UIを'/docs'に表示

# APIモデルの定義
calc_model = api.model('Calculation', {
    'expression': fields.String(required=True, description='The mathematical expression to be evaluated')
})

class Calculate(Resource):
    @api.expect(calc_model)  # 入力データの形式を定義
    def post(self):
        data = request.get_json()
        expression = data.get("expression")
        
        try:
            # sympyを使って式を解析・計算
            expr = sp.sympify(expression)  # 文字列を数式として解析
            result = expr.evalf()  # 数式を評価
            
            return jsonify({"result": result})
        except sp.SympifyError:
            return jsonify({"result": "Invalid expression"}), 400
        except Exception as e:
            return jsonify({"result": f"Error: {str(e)}"}), 500

# エンドポイントをAPIに追加
api.add_resource(Calculate, '/calculate')

if __name__ == "__main__":
    app.run(debug=True)
