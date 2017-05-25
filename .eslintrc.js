module.exports = {
    "root": true,
    "parser": "babel-eslint",
    "extends": [
        "airbnb",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
    ],
    "env": {
        "browser": true,
        "node": true,
    },
    "parseOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
        }
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import",
    ],
    "rules": {
        // 4个空格缩进
        "indent": ["error", 4],
        // 文件末尾不要有换行符
        "eol-last": ["off", "never"],
        // 只能单引号
        "quotes": ["error", "single"],
        // 一定要分号
        "semi": ["error", "always"],
        // 分号后面一定要有空格
        "semi-spacing": ["error", { "before": false, "after": true}],
        // 禁用console对象，但是允许 用 console.warn, console.error, console.log方法
        "no-console": ["error", { allow: ["warn", "error", "log", "info"] }],
        // 只能用 ===，不能使用 ==
        "eqeqeq": "error",
        // 禁止未使用过的变量, vars表示检测所有变量，args表示函数参数都必须使用
        "no-unused-vars": ["error", { "vars": "all", "args": "all"}],
        // 关键字后面必须又一个空格if ，function() 等
        "keyword-spacing": ["error", { "after": true }],
        // 逗号后面一定要有个空格
        "comma-spacing": ["error", { "after": true }],
        // 把else语句放在大括号的同一行
        "brace-style": ["error", "1tbs"],
        // 禁止不必要的三元运算符
        "no-unneeded-ternary": ["error", { "defaultAssignment": true }],
        // 不使用tab
        "no-tabs": ["error"],
        // 禁止使用特定的语法， 竟然会禁止for in 和 for of 
        "no-restricted-syntax": ["off", "ForInStatement", "ForOfStatement", "ForStatement"],
        // 禁止混合使用不同的操作符，当表达式中连续的不同的操作符没有使用括号括起来，则发出警告,特别是加减乘除
        "no-mixed-operators": ["off", {
            "groups": [
                ["+", "-", "*", "%", "/"]
            ],
        }],
        "guard-for-in": "off",
        // 禁止使用continue
        "no-continue": "error",
        // 尽可能的简化赋值操作 也就是 x+=y 不能 x = x + y
        "operator-assignment": ["error", "always"],
    },
};