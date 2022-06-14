export async function getSanityContent({ query, variables = {} }: any) {
  const { data } = await fetch(
    "https://rrwkvrzg.api.sanity.io/v1/graphql/production/default",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  ).then((response) => response.json());

  return data;
}
