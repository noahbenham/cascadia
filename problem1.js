const people = [
  {
    id: 0,
    name: 'John',
    skills: ['javascript', 'html', 'css', 'c#'],
  },
  {
    id: 1,
    name: 'Brian',
    skills: ['javascript', 'java', 'c', 'c#', 'c++', 'html'],
  },
  {
    id: 2,
    name: 'Michael',
    skills: ['c', 'c++', 'go', 'rust'],
  },
];

/**
 * Simple solution
 * @param {Array} input
 */
function mapSkillsToPeopleNames(input) {
  const unsortedSkillMap = input.reduce((acc, person) => {
    person.skills.forEach((skill) => {
      if (!acc[skill]) {
        acc[skill] = [];
      }
      acc[skill].push(person.name);
    });
    return acc;
  }, {});

  const ordered = {};
  Object.keys(unsortedSkillMap).sort().forEach((key) => {
    ordered[key] = unsortedSkillMap[key];
  });
  return ordered;
}

console.log(mapSkillsToPeopleNames(people));
