import * as ts from "typescript";
import { CompletionItemBuilder } from "../completionItemBuilder";
import { BaseExpressionTemplate } from "./baseTemplates";
import {
  getConfigValue,
  getIndentCharacters,
  getPlaceholderWithOptions,
} from "../utils";
import { inferForVarTemplate } from "../utils/infer-names";
import { IndentInfo } from "../template";

const getArrayItemNames = (node: ts.Node): string[] => {
  const inferVarNameEnabled = getConfigValue<boolean>("inferVariableName");
  const suggestedNames = inferVarNameEnabled
    ? inferForVarTemplate(node)
    : undefined;
  return suggestedNames?.length > 0 ? suggestedNames : ["item"];
};

export class EnumMapTemplate extends BaseExpressionTemplate {
  buildCompletionItem(node: ts.Node, indentInfo?: IndentInfo) {
    node = this.unwindBinaryExpression(node, false);
    const replacement = this.unwindBinaryExpression(node, true).getText();
    const itemNames = getArrayItemNames(node);

    return CompletionItemBuilder.create("map", node, indentInfo)
      .replace(
        `Enum.map(${replacement}, fn ${getPlaceholderWithOptions(
          itemNames
        )} ->\n${getIndentCharacters()}\${0}\nend)`
      )
      .build();
  }
}
export class EnumEachTemplate extends BaseExpressionTemplate {
  buildCompletionItem(node: ts.Node, indentInfo?: IndentInfo) {
    node = this.unwindBinaryExpression(node, false);
    const replacement = this.unwindBinaryExpression(node, true).getText();
    const itemNames = getArrayItemNames(node);

    return CompletionItemBuilder.create("each", node, indentInfo)
      .replace(
        `Enum.each(${replacement}, fn ${getPlaceholderWithOptions(
          itemNames
        )} ->\n${getIndentCharacters()}\${0}\nend)`
      )
      .build();
  }
}
