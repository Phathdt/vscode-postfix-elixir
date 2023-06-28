import * as vsc from "vscode";
import { IPostfixTemplate } from "../template";
import { CustomTemplate } from "../templates/customTemplate";
import {
  IfTemplate,
  ElseTemplate,
  IsNillTemplate,
  NotIsNillTemplate,
} from "../templates/ifTemplates";
import { VarTemplate } from "../templates/varTemplates";
import { EnumEachTemplate, EnumMapTemplate } from "../templates/EnumTemplates";
import { InspectTemplate } from "../templates/InspectTemplates";
import {
  EnumPipeEachTemplate,
  EnumPipeMapTemplate,
} from "../templates/PipeEnumTemplates";

export const loadCustomTemplates = () => {
  const config = vsc.workspace.getConfiguration("postfixElixir");
  const templates = config.get<ICustomTemplateDefinition[]>("customTemplates");
  if (templates) {
    return templates.map(
      (t) => new CustomTemplate(t.name, t.description, t.body, t.when)
    );
  }

  return [];
};

export const loadBuiltinTemplates = () => {
  const config = vsc.workspace.getConfiguration("postfixElixir");
  const disabledTemplates = config.get<string[]>(
    "disabledBuiltinTemplates",
    []
  );

  const templates: IPostfixTemplate[] = [
    new VarTemplate("var"),
    new IfTemplate("if"),
    new ElseTemplate("else"),
    new IsNillTemplate("nil"),
    new NotIsNillTemplate("nnil"),
    new EnumMapTemplate("map"),
    new EnumEachTemplate("each"),
    new InspectTemplate("iins"),
    new EnumPipeMapTemplate("pmap"),
    new EnumPipeEachTemplate("peach"),
    // new IfEqualityTemplate("null", "===", "null"),
    // new IfEqualityTemplate("notnull", "!==", "null"),
    // new IfEqualityTemplate("undefined", "===", "undefined", true),
    // new IfEqualityTemplate("notundefined", "!==", "undefined", true),
  ];

  return templates.filter((t) => !disabledTemplates.includes(t.templateName));
};

interface ICustomTemplateDefinition {
  name: string;
  description: string;
  body: string;
  when: string[];
}
