import * as ts from "typescript";
import { CompletionItemBuilder } from "../completionItemBuilder";
import { BaseTemplate } from "./baseTemplates";
import {
  getConfigValue,
  getIndentCharacters,
  getPlaceholderWithOptions,
} from "../utils";
import { inferForVarTemplate } from "../utils/infer-names";
import { IndentInfo } from "../template";

abstract class BasePipeEnumTemplate extends BaseTemplate {
  canUse(node: ts.Node): boolean {
    return (
      !this.inReturnStatement(node) &&
      !this.inIfStatement(node) &&
      !this.inFunctionArgument(node) &&
      !this.inVariableDeclaration(node) &&
      !this.inAssignmentStatement(node) &&
      !this.isTypeNode(node) &&
      !this.isBinaryExpression(node) &&
      (this.isIdentifier(node) ||
        this.isPropertyAccessExpression(node) ||
        this.isElementAccessExpression(node) ||
        this.isCallExpression(node) ||
        this.isArrayLiteral(node))
    );
  }
}

const getArrayItemNames = (node: ts.Node): string[] => {
  const inferVarNameEnabled = getConfigValue<boolean>("inferVariableName");
  const suggestedNames = inferVarNameEnabled
    ? inferForVarTemplate(node)
    : undefined;
  return suggestedNames?.length > 0 ? suggestedNames : ["item"];
};

export class EnumPipeMapTemplate extends BasePipeEnumTemplate {
  buildCompletionItem(node: ts.Node, indentInfo?: IndentInfo) {
    node = this.unwindBinaryExpression(node, false);
    const replacement = this.unwindBinaryExpression(node, true).getText();
    const itemNames = getArrayItemNames(node);

    return CompletionItemBuilder.create("pmap", node, indentInfo)
      .replace(
        `${replacement} \n|> Enum.map(fn ${getPlaceholderWithOptions(
          itemNames
        )} ->\n${getIndentCharacters()}\${0}\nend)`
      )
      .build();
  }
}
export class EnumPipeEachTemplate extends BasePipeEnumTemplate {
  buildCompletionItem(node: ts.Node, indentInfo?: IndentInfo) {
    node = this.unwindBinaryExpression(node, false);
    const replacement = this.unwindBinaryExpression(node, true).getText();
    const itemNames = getArrayItemNames(node);

    return CompletionItemBuilder.create("peach", node, indentInfo)
      .replace(
        `${replacement} \n|> Enum.each(fn ${getPlaceholderWithOptions(
          itemNames
        )} ->\n${getIndentCharacters()}\${0}\nend)`
      )
      .build();
  }
}
