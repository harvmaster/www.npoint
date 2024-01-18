import { defaultSyntax } from './syntaxStyles';

export const applySyntaxHighlighting = (element: HTMLElement, syntax = 'default'): void => {
  // const text = element.innerHTML || "";

  const applyStyles = (styles: {[key: string]: string}) => {
    return 'display: inline; width: fit-content; ' + Object.entries(styles).map(([key, value]) => `${key}: ${value}`).join("; ");
  }

  // Remove html from text
  const text = element.innerHTML
    .replace(/<div[^>]*>/g, "")
    .replace(/<\/div>/g, "")
    .replace(/<br>/g, "\\n")
    .replace(/&nbsp;/g, " ");

    console.log(text)

  // Replace json
  const html = text
  .replace(/"([^"]+)":/g, `<div style="${applyStyles(defaultSyntax.json.key)}">"$1"</div>:`)
  .replace(/(:|,)/g, `<div style="${applyStyles(defaultSyntax.json.symbol)}">$1</div>`)
    .replace(/:<\/div> "([^"]+)"/g, `: <div style="${applyStyles(defaultSyntax.json.string)}">"$1"</div>`)
    .replace(/:<\/div> (\d+)/g, `: <div style="${applyStyles(defaultSyntax.json.number)}">$1</div>`)
    .replace(/:<\/div> (true|false)/g, `: <div style="${applyStyles(defaultSyntax.json.value)}">$1</div>`)
    .replace(/:<\/div> null/g, `: <div style="${applyStyles(defaultSyntax.json.value)}">null</div>`)
    .replace(/,(\s*})/g, `<div style="${applyStyles(defaultSyntax.json.comma)}">,</div>$1`)
    .replace(/({|}|\[|\])/g, `<div style="${applyStyles(defaultSyntax.json.bracket)}">$1</div>`)
    .replace(/\\n/g, "<br>");

  console.log(html)
  element.innerHTML = html;
}

export default applySyntaxHighlighting;