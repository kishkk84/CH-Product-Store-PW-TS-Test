import * as fs from "fs";
import * as path from "path";
import { getErrorMessage } from "./error-messages.util";

// Remove the directory and its contents
export async function removeDirectory(dirPath: string) {
  if (fs.existsSync(dirPath)) {
    const dirContents = fs.readdirSync(dirPath);
    for (const fileOrDirPath of dirContents) {
      try {
        const fullPath = path.join(dirPath, fileOrDirPath);
        const fullPathFileOrDir = fs.statSync(fullPath);
        if (fullPathFileOrDir.isDirectory()) {
          if (fs.readdirSync(fullPath).length) removeDirectory(fullPath);
          fs.rmdirSync(fullPath);
        } else fs.unlinkSync(fullPath);
      } catch (error) {
        console.error(
          `Error deleting directory '${dirPath}': ${{ message: getErrorMessage(error) }}`,
        );
      }
    }
  }
}
