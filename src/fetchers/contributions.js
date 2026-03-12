const QUERY = `
query userContributions($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
            weekday
          }
        }
      }
    }
  }
}`;

async function fetchContributions(username, token) {
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

  const calendar =
    json.data.user.contributionsCollection.contributionCalendar;

  return {
    total: calendar.totalContributions,
    weeks: calendar.weeks,
  };
}

module.exports = { fetchContributions };
