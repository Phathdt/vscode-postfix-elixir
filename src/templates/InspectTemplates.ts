import * as ts from "typescript";
import { CompletionItemBuilder } from "../completionItemBuilder";
import { BaseExpressionTemplate } from "./baseTemplates";
import { IndentInfo } from "../template";

export class InspectTemplate extends BaseExpressionTemplate {
  buildCompletionItem(node: ts.Node, indentInfo?: IndentInfo) {
    node = this.unwindBinaryExpression(node, false);
    const replacement = this.unwindBinaryExpression(node, true).getText();

    return CompletionItemBuilder.create("iins", node, indentInfo)
      .replace(
        `IO.inspect(${replacement}, "\${RELATIVE_FILEPATH}:\${TM_LINE_NUMBER}")\n\${0}`
      )
      .build();
  }
}
