const quotes = [
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Clean code always looks like it was written by someone who cares.", author: "Robert C. Martin" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson" },
  { text: "The most disastrous thing that you can ever learn is your first programming language.", author: "Alan Kay" },
  { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
  { text: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie" },
  { text: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.", author: "Dan Salomon" },
  { text: "Deleted code is debugged code.", author: "Jeff Sickel" },
  { text: "If debugging is the process of removing bugs, then programming must be the process of putting them in.", author: "Edsger Dijkstra" },
  { text: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.", author: "Bill Gates" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { text: "Truth can only be found in one place: the code.", author: "Robert C. Martin" },
  { text: "Give a man a program, frustrate him for a day. Teach a man to program, frustrate him for a lifetime.", author: "Muhammad Waseem" },
  { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
  { text: "Java is to JavaScript what car is to carpet.", author: "Chris Heilmann" },
  { text: "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.", author: "Antoine de Saint-Exupery" },
  { text: "It's not a bug — it's an undocumented feature.", author: "Anonymous" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Weeks of coding can save you hours of planning.", author: "Anonymous" },
  { text: "A language that doesn't affect the way you think about programming is not worth knowing.", author: "Alan Perlis" },
  { text: "The computer was born to solve problems that did not exist before.", author: "Bill Gates" },
  { text: "Walking on water and developing software from a specification are easy if both are frozen.", author: "Edward V. Berard" },
  { text: "In theory, there is no difference between theory and practice. But, in practice, there is.", author: "Jan L. A. van de Snepscheut" },
  { text: "No matter how slow you are writing clean code, you will always be slower if you make a mess.", author: "Robert C. Martin" },
  { text: "One of my most productive days was throwing away 1,000 lines of code.", author: "Ken Thompson" },
  { text: "The function of good software is to make the complex appear to be simple.", author: "Grady Booch" },
  { text: "There are only two hard things in Computer Science: cache invalidation and naming things.", author: "Phil Karlton" },
  { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Simplicity is prerequisite for reliability.", author: "Edsger Dijkstra" },
  { text: "Optimism is an occupational hazard of programming; feedback is the treatment.", author: "Kent Beck" },
  { text: "The most important property of a program is whether it accomplishes the intention of its user.", author: "C.A.R. Hoare" },
  { text: "Don't comment bad code — rewrite it.", author: "Brian Kernighan" },
  { text: "Software is a great combination between artistry and engineering.", author: "Bill Gates" },
];

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function getDailyQuote() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / 86400000
  );
  return quotes[dayOfYear % quotes.length];
}

module.exports = { quotes, getRandomQuote, getDailyQuote };
