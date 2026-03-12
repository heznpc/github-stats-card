const QUERY = `
query userActivity($login: String!) {
  user(login: $login) {
    contributionsCollection {
      commitContributionsByRepository(maxRepositories: 10) {
        repository {
          name
          owner { login }
        }
        contributions(first: 5, orderBy: {direction: DESC}) {
          nodes {
            occurredAt
            commitCount
          }
        }
      }
      pullRequestContributions(first: 5, orderBy: {direction: DESC}) {
        nodes {
          occurredAt
          pullRequest {
            title
            state
            repository { name owner { login } }
          }
        }
      }
      issueContributions(first: 5, orderBy: {direction: DESC}) {
        nodes {
          occurredAt
          issue {
            title
            state
            repository { name owner { login } }
          }
        }
      }
    }
  }
}`;

async function fetchActivity(username, token) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "github-stats-card",
    },
    body: JSON.stringify({ query: QUERY, variables: { login: username } }),
  });

  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const json = await res.json();
  if (json.errors) {
    const notFound = json.errors.find((e) => e.type === "NOT_FOUND");
    if (notFound) throw new Error(`User not found: ${username}`);
    throw new Error(json.errors[0].message);
  }

  const c = json.data.user.contributionsCollection;
  const events = [];

  for (const repo of c.commitContributionsByRepository) {
    for (const node of repo.contributions.nodes) {
      events.push({
        type: "commit",
        repo: `${repo.repository.owner.login}/${repo.repository.name}`,
        date: node.occurredAt,
        detail: `${node.commitCount} commit${node.commitCount > 1 ? "s" : ""}`,
      });
    }
  }

  for (const node of c.pullRequestContributions.nodes) {
    const pr = node.pullRequest;
    events.push({
      type: "pr",
      repo: `${pr.repository.owner.login}/${pr.repository.name}`,
      date: node.occurredAt,
      detail: pr.title,
      state: pr.state,
    });
  }

  for (const node of c.issueContributions.nodes) {
    const issue = node.issue;
    events.push({
      type: "issue",
      repo: `${issue.repository.owner.login}/${issue.repository.name}`,
      date: node.occurredAt,
      detail: issue.title,
      state: issue.state,
    });
  }

  events.sort((a, b) => new Date(b.date) - new Date(a.date));
  return events.slice(0, 8);
}

module.exports = { fetchActivity };
