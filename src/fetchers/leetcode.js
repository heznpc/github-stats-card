const LEETCODE_API = "https://leetcode.com/graphql";

const QUERY = `
query userProfile($username: String!) {
  matchedUser(username: $username) {
    username
    submitStats: submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
    }
    profile {
      ranking
    }
  }
  allQuestionsCount {
    difficulty
    count
  }
}`;

async function fetchLeetcode(username) {
  const res = await fetch(LEETCODE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "github-stats-card",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: { username },
    }),
  });

  if (!res.ok) throw new Error(`LeetCode API error: ${res.status}`);
  const json = await res.json();

  if (json.errors || !json.data.matchedUser) {
    throw new Error(`LeetCode user not found: ${username}`);
  }

  const user = json.data.matchedUser;
  const allQuestions = json.data.allQuestionsCount;
  const submissions = user.submitStats.acSubmissionNum;

  const stats = {};
  for (const s of submissions) {
    stats[s.difficulty] = { solved: s.count, submissions: s.submissions };
  }

  const totals = {};
  for (const q of allQuestions) {
    totals[q.difficulty] = q.count;
  }

  return {
    username: user.username,
    ranking: user.profile.ranking,
    totalSolved: stats.All?.solved || 0,
    totalQuestions: totals.All || 0,
    easy: { solved: stats.Easy?.solved || 0, total: totals.Easy || 0 },
    medium: { solved: stats.Medium?.solved || 0, total: totals.Medium || 0 },
    hard: { solved: stats.Hard?.solved || 0, total: totals.Hard || 0 },
  };
}

module.exports = { fetchLeetcode };
