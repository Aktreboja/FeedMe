// Dynamic response error object for error handling API routes.
export const ResponseError = (error: string, status: number) => {
  return new Response(
    JSON.stringify({
      error,
    }),
    {
      status,
      headers: { 'Content-Type': 'application/json' },
    },
  );
};
