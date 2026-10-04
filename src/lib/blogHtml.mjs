const ALLOWED = new Set(["p", "h2", "h3", "strong", "em", "a", "img", "ul", "ol", "li", "br"]);
const RENAME = { b: "strong", i: "em", div: "p", h1: "h2" };
const VOID = new Set(["br", "img"]);
const DROP = new Set(["script", "style", "iframe", "object", "embed", "link", "meta"]);

const escapeText = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const decodeText = (value) =>
  String(value)
    .replace(/&nbsp;/gi, " ")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&");

export function isHtmlPost(content = "") {
  return /<\/?(?:p|h[1-3]|strong|em|a|img|ul|ol|li|br|div|b|i)\b/i.test(content);
}

const readAttr = (source, name) => {
  const match = String(source).match(
    new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>\`]+))`, "i"),
  );
  return match ? decodeText(match[1] ?? match[2] ?? match[3] ?? "") : "";
};

export function safeHref(raw) {
  const value = String(raw || "")
    .trim()
    .replace(/[\u0000-\u001F]+/g, "");
  if (!value || value.startsWith("//") || value.startsWith("\\\\")) return "";
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const url = new URL(value);
    if (url.protocol === "https:" || url.protocol === "http:") return url.href;
  } catch {
    return "";
  }
  return "";
}

const openTag = (name, attrs) => {
  if (name === "br") return "<br>";
  if (name === "img") {
    const imageSrc = safeHref(readAttr(attrs, "src"));
    if (!/^https?:\/\//i.test(imageSrc)) return "";
    const alt = escapeText(readAttr(attrs, "alt"));
    return `<img src="${escapeText(imageSrc)}" alt="${alt}">`;
  }
  if (name === "a") {
    const href = safeHref(readAttr(attrs, "href"));
    if (!href) return "";
    const external = /^https?:\/\//i.test(href);
    const extra = external ? ` target="_blank" rel="noopener noreferrer"` : "";
    return `<a href="${escapeText(href)}"${extra}>`;
  }
  return `<${name}>`;
};

export function sanitizeBlogHtml(input = "") {
  const source = String(input).replace(/<!--[\s\S]*?-->/g, "");
  const tokens = [];
  const pattern = /<\/?([a-zA-Z][\w:-]*)([^>]*)>/g;
  let last = 0;
  let match = pattern.exec(source);
  while (match) {
    if (match.index > last) tokens.push({ kind: "text", value: source.slice(last, match.index) });
    const rawName = match[1].toLowerCase();
    const name = RENAME[rawName] || rawName;
    const closing = match[0].startsWith("</");
    tokens.push({
      kind: closing ? "close" : "open",
      name,
      rawName,
      attrs: match[2] || "",
      void: !closing && (VOID.has(name) || /\/\s*$/.test(match[2] || "")),
    });
    last = match.index + match[0].length;
    match = pattern.exec(source);
  }
  if (last < source.length) tokens.push({ kind: "text", value: source.slice(last) });

  const out = [];
  const stack = [];
  let skip = null;

  const closeThrough = (name) => {
    const index = stack.lastIndexOf(name);
    if (index === -1) return;
    while (stack.length > index) {
      const open = stack.pop();
      if (!VOID.has(open)) out.push(`</${open}>`);
    }
  };

  for (const token of tokens) {
    if (skip) {
      if (token.kind === "open" && token.rawName === skip.name) skip.depth += 1;
      if (token.kind === "close" && token.rawName === skip.name) {
        skip.depth -= 1;
        if (skip.depth <= 0) skip = null;
      }
      continue;
    }

    if (token.kind === "text") {
      const text = escapeText(decodeText(token.value));
      if (text) out.push(text);
      continue;
    }

    if (token.kind === "open" && DROP.has(token.rawName)) {
      skip = { name: token.rawName, depth: 1 };
      continue;
    }

    if (token.kind === "open") {
      if (!ALLOWED.has(token.name)) continue;
      const start = openTag(token.name, token.attrs);
      if (!start) continue;
      out.push(start);
      if (!token.void && !VOID.has(token.name)) stack.push(token.name);
      continue;
    }

    if (ALLOWED.has(token.name)) closeThrough(token.name);
  }

  while (stack.length) {
    const open = stack.pop();
    if (!VOID.has(open)) out.push(`</${open}>`);
  }

  return out
    .join("")
    .replace(/<a><\/a>/g, "")
    .replace(/<(p|h2|h3|li)>\s*<\/\1>/g, "");
}
