import * as ts from "typescript";
import { CompletionItemBuilder } from "../completionItemBuilder";
import { BaseExpressionTemplate } from "./baseTemplates";
import { IndentInfo } from "../template";

abstract class BaseInspectTemplate extends BaseExpressionTemplate {
  override canUse(node: ts.Node) {
    return (
      super.canUse(node) &&
      !this.inReturnStatement(node) &&
      !this.inFunctionArgument(node) &&
      !this.inVariableDeclaration(node) &&
      !this.inAssignmentStatement(node)
    );
  }
}

export class InspectTemplate extends BaseInspectTemplate {
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
