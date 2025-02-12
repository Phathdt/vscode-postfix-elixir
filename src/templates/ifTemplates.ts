import * as ts from "typescript";
import { CompletionItemBuilder } from "../completionItemBuilder";
import { BaseExpressionTemplate } from "./baseTemplates";
import { getConfigValue, getIndentCharacters } from "../utils";
import { invertExpression } from "../utils/invert-expression";
import { IndentInfo } from "../template";

export class IfTemplate extends BaseExpressionTemplate {
  buildCompletionItem(node: ts.Node, indentInfo?: IndentInfo) {
    node = this.unwindBinaryExpression(node, false);
    const replacement = this.unwindBinaryExpression(node, true).getText();

    return CompletionItemBuilder.create("if", node, indentInfo)
      .replace(`if ${replacement} do\n${getIndentCharacters()}\${0}\nend`)
      .build();
  }
}

export class ElseTemplate extends BaseExpressionTemplate {
  buildCompletionItem(node: ts.Node, indentInfo?: IndentInfo) {
    node = this.unwindBinaryExpression(node, false);
    const replacement = invertExpression(
      this.unwindBinaryExpression(node, true)
    );

    return CompletionItemBuilder.create("else", node, indentInfo)
      .replace(`if ${replacement} do\n${getIndentCharacters()}\${0}\nend`)
      .build();
  }
}

export class IsNillTemplate extends BaseExpressionTemplate {
  buildCompletionItem(node: ts.Node, indentInfo?: IndentInfo) {
    node = this.unwindBinaryExpression(node, false);
    const replacement = this.unwindBinaryExpression(node, true).getText();

    return CompletionItemBuilder.create("nil", node, indentInfo)
      .replace(`is_nil(${replacement})\${0}`)
      .build();
  }
}
export class NotIsNillTemplate extends BaseExpressionTemplate {
  buildCompletionItem(node: ts.Node, indentInfo?: IndentInfo) {
    node = this.unwindBinaryExpression(node, false);
    const replacement = this.unwindBinaryExpression(node, true).getText();

    return CompletionItemBuilder.create("nnil", node, indentInfo)
      .replace(`!is_nil(${replacement})\${0}`)
      .build();
  }
}
export class IfEqualityTemplate extends BaseExpressionTemplate {
  constructor(
    private keyword: string,
    private operator: string,
    private operand: string,
    private isUndefinedTemplate?: boolean
  ) {
    super(keyword);
  }

  override canUse(node: ts.Node) {
    return super.canUse(node) && !this.isBinaryExpression(node);
  }

  buildCompletionItem(node: ts.Node, indentInfo?: IndentInfo) {
    const typeOfMode =
      this.isUndefinedTemplate &&
      getConfigValue<string>("undefinedMode") == "Typeof";

    return CompletionItemBuilder.create(this.keyword, node, indentInfo)
      .replace(
        typeOfMode
          ? `if (typeof {{expr}} ${this.operator} "${
              this.operand
            }") {\n${getIndentCharacters()}\${0}\n}`
          : `if ({{expr}} ${this.operator} ${
              this.operand
            }) {\n${getIndentCharacters()}\${0}\n}`
      )
      .build();
  }
}
