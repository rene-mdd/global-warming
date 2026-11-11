// Renders one paragraph from locales/*.js: an array of segments where a
// string is text, { href, text, em } a link (or plain emphasis without
// href), { text, code: true } inline code, and { br: true } a line break.

import PropTypes from "prop-types";

export default function RichText({ parts }) {
  return parts.map((part, i) => {
    const key = `${i}`;
    if (typeof part === "string") return part;
    if (part.br) return <br key={key} />;
    if (part.code) return <code key={key}>{part.text}</code>;
    const text = part.em ? <em>{part.text}</em> : part.text;
    return part.href ? (
      <a key={key} href={part.href}>
        {text}
      </a>
    ) : (
      <span key={key}>{text}</span>
    );
  });
}

RichText.propTypes = {
  parts: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        href: PropTypes.string,
        text: PropTypes.string,
        em: PropTypes.bool,
        code: PropTypes.bool,
        br: PropTypes.bool,
      }),
    ])
  ).isRequired,
};
