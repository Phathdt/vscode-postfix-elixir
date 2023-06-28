import * as ts from "typescript";
import { CompletionItemBuilder } from "../completionItemBuilder";
import { BaseExpressionTemplate } from "./baseTemplates";
import { IndentInfo } from "../template";
import { getPlaceholderWithOptions } from "../utils";
abstract class BasePipeEnumTemplate extends BaseExpressionTemplate {}

export class EnumPipeMapTemplate extends BasePipeEnumTemplate {
  buildCompletionItem(node: ts.Node, indentInfo?: IndentInfo) {
    node = this.unwindBinaryExpression(node, false);
    const replacement = this.unwindBinaryExpression(node, true).getText();

    const itemNames = ["&1"];
    return CompletionItemBuilder.create("pmap", node, indentInfo)
      .replace(
        `${replacement} \n|> Enum.map(& ${getPlaceholderWithOptions(
          itemNames
        )})\${0}`
      )
      .build();
  }
}
export class EnumPipeEachTemplate extends BasePipeEnumTemplate {
  buildCompletionItem(node: ts.Node, indentInfo?: IndentInfo) {
    node = this.unwindBinaryExpression(node, false);
    const replacement = this.unwindBinaryExpression(node, true).getText();
    const itemNames = ["&1"];

    return CompletionItemBuilder.create("peach", node, indentInfo)
      .replace(
        `${replacement} \n|> Enum.each(& ${getPlaceholderWithOptions(
          itemNames
        )})\${0}`
      )
      .build();
  }
}
