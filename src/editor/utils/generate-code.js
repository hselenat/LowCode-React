import * as t from '@babel/types';
import * as g from '@babel/generator';

let importStatements = new Map();

function createJsxStatement(component) {
  const attrs = [];

  Object.keys(component.props).forEach(key => {
    const propValue = component.props[key];

    if (typeof propValue === 'object' && propValue.value != null && typeof propValue.value === 'string') {
      attrs.push(
        t.jsxAttribute(
          t.jsxIdentifier(key),
          t.stringLiteral(propValue.value)
        )
      )
    }
  });

  // 生成导入语句，如果已经导入了则跳过
  if (!importStatements.has(component.name)) {
    importStatements.set(component.name,
      t.importDeclaration(
        [t.importDefaultSpecifier(t.identifier(component.name))],
        t.stringLiteral(`@/editor/components/${component.fileName}/prod`)
      )
    )
  }

  // 创建 jsx 元素
  return t.jsxElement(
    t.jsxOpeningElement(
      t.jsxIdentifier(component.name),
      attrs
    ),
    t.jsxClosingElement(
      t.jsxIdentifier(component.name),
    ),
    // 递归创建子元素
    (component.children || []).map(createJsxStatement)
  );
}

function generateCode(components) {
  importStatements = new Map();
  // 默认导入 react和 useRef、useState
  importStatements.set("react",
    t.importDeclaration(
      [
        t.importDefaultSpecifier(t.identifier('React')),
        t.importSpecifier(
          t.identifier('useRef'),
          t.identifier('useRef')
        ),
        t.importSpecifier(
          t.identifier('useState'),
          t.identifier('useState')
        )
      ],
      t.stringLiteral('react')
    )
  );
  // 创建一个 App 方法
  const funcStatement = t.functionDeclaration(
    t.identifier("App"),
    [],
    // 创建方法内部的语句
    t.blockStatement([
      // 创建 return 语句
      t.returnStatement(
        // 创建 <></
        t.jsxFragment(
          t.jsxOpeningFragment(),
          t.jsxClosingFragment(),
          components.map(createJsxStatement)
        )
      )
    ])
  )

  const ast = t.program(
    [
      ...importStatements.values(),
      funcStatement,
      // 生成默认导出 App 方法
      t.exportDefaultDeclaration(
        t.identifier("App")
      )
    ]
  )

  // 格式化代码 - 使用@babel/generator自带的格式化选项
  return g.default(ast, {
    jsescOption: { minimal: true },
    compact: false,
    comments: true,
    retainLines: false,
    indent: 2 // 2个空格缩进
  }).code;
}

export { generateCode };


