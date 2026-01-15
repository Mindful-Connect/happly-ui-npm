import pc from "picocolors";

export const logger = {
  info: (message: string) => {
    console.log(pc.cyan("ℹ"), message);
  },

  success: (message: string) => {
    console.log(pc.green("✔"), message);
  },

  warn: (message: string) => {
    console.log(pc.yellow("⚠"), message);
  },

  error: (message: string) => {
    console.log(pc.red("✖"), message);
  },

  break: () => {
    console.log("");
  },

  log: (message: string) => {
    console.log(message);
  },

  // Styled text helpers
  highlight: (text: string) => pc.cyan(text),
  bold: (text: string) => pc.bold(text),
  dim: (text: string) => pc.dim(text),
  green: (text: string) => pc.green(text),
  yellow: (text: string) => pc.yellow(text),
  red: (text: string) => pc.red(text),

  // Box for important messages
  box: (title: string, content: string) => {
    const width = 50;
    const line = "─".repeat(width);
    console.log("");
    console.log(pc.cyan(`┌${line}┐`));
    console.log(pc.cyan("│") + pc.bold(` ${title}`.padEnd(width)) + pc.cyan("│"));
    console.log(pc.cyan(`├${line}┤`));
    content.split("\n").forEach((l) => {
      console.log(pc.cyan("│") + ` ${l}`.padEnd(width) + pc.cyan("│"));
    });
    console.log(pc.cyan(`└${line}┘`));
    console.log("");
  },
};
