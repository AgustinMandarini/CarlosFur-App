import bootstrap from "./../../skills/bootstrap.svg";
import css from "./../../skills/css.svg";
import git from "./../../skills/git.svg";
import html from "./../../skills/html.svg";
import javascript from "./../../skills/javascript.svg";
import nextJS from "./../../skills/nextJS.svg";
import postgresql from "./../../skills/postgresql.svg";
import react from "./../../skills/react.svg";
import node from "./../../skills/node.png"

export const skillsImage = (skill) => {
  const skillID = skill.toLowerCase();
  switch (skillID) {
    case "html":
      return html;

    case "css":
      return css;

    case "javascript":
      return javascript;
    case "next js":
      return nextJS;

    case "react":
      return react;

    case "bootstrap":
      return bootstrap;

    case "postgresql":
      return postgresql;
    case "git":
      return git;
      case "node":
        return node
  }
};
