const QUERY = `
query userRepo($login: String!, $name: String!) {
  repository(owner: $login, name: $name) {
    name
    description
    url
    stargazerCount
    forkCount
    primaryLanguage {
      name
      color
    }
    isArchived
    isFork
    updatedAt
  }
}`;

const PINNED_QUERY = `
query userPinned($login: String!) {
  user(login: $login) {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
          isArchived
          isFork
          updatedAt
        }
      }
    }
  }
}`;

async function graphql(query, variables, token) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "github-stats-card",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const json = await res.json();
  if (json.errors) {
    const notFound = json.errors.find((e) => e.type === "NOT_FOUND");
    if (notFound) throw new Error(`Not found: ${variables.login}/${variables.name || ""}`);
    throw new Error(json.errors[0].message);
  }
  return json.data;
}

async function fetchRepo(username, repoName, token) {
  const data = await graphql(QUERY, { login: username, name: repoName }, token);
  return data.repository;
}

async function fetchPinnedRepos(username, token) {
  const data = await graphql(PINNED_QUERY, { login: username }, token);
  return data.user.pinnedItems.nodes;
}

module.exports = { fetchRepo, fetchPinnedRepos };
