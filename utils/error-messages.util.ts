// Get the error message
export async function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}
