import re
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/calc')
def calc():
    result = 0
    stmt = request.args.get('stmt', 'NONE')

    if (stmt == 'NONE'):
        print('넘어온값이 없음')
    else:
        patt = '[0-9]+'
        op = re.sub(patt, '', stmt)
        print('넘어온 연산자 {}'.format(op))
        nums = stmt.split(op)

        if op == '+':
            result = int(nums[0]) + int(nums[1])
        elif op == '-':
            result = int(nums[0]) - int(nums[1])
        elif op == '*':
            result = int(nums[0]) * int(nums[1])
        elif op == '/':
            result = int(nums[0]) / int(nums[1])
            result = round(result, 5)
    # 연산
    return jsonify(result=result)


if __name__ == '__main__':
    app.run()
