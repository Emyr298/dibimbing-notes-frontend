export const fetchGraphQL = async (query: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  });
  return await res.json();
};
