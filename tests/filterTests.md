# Test filters

**In the cases below, tests can be done to control the functionality of all the filters in the filter-modal.**

When doing these text, we used console.log to check if the labels, rating etc was matching with the input from the filter in the user-interface.
The code we used for console.log will be provided below and can be copied into the project.

export async function challengesApi() {
const response = await fetch(
"https://lernia-sjj-assignments.vercel.app/api/challenges"
);
const data = await response.json();
data.challenges.forEach(challenge => {
console.log(
`Title: ${challenge.title}\n` +
`Description: ${challenge.description}\n` +
`Rating: ${challenge.rating}\n` +
`Type: ${challenge.type === 'onsite' ? 'Onsite' : 'Online'}\n` +
`Labels: ${challenge.labels.join(", ")}\n`
);
});
return data;
}

## Test case A: By type filter

### <ins>Test case A:A:</ins>

- Open webpage and navigate to challenge page.
- Press the "Filter challenges" button to open the modal.
- Press the "Include online challenges" checkbox.
- Press the "Include onsite challenges" checkbox.
- Press the "Include onsite challenges" checkbox again.

Expected:

- Only the challenges with the online challenges logo should be displayed.

### <ins>Test case A:B:</ins>

- Open webpage and navigate to challenge page.
- Press the "Filter challenges" button to open the modal.
- Press the "Include onsite challenges" checkbox.
- Press the "Include online challenges" checkbox.
- Press the "Include online challenges" checkbox again.

Expected:

- Only the challenges with the onsite challenges logo should be displayed.

### <ins>Test case A:C:</ins>

- Open webpage and navigate to challenge page.
- Press the "Filter challenges" button to open the modal.
- Press the "Include onsite challenges" checkbox.
- Press the "Include onsite challenges" checkbox.
- Press both checkboxes again.

Expected:

- All the challenges should be displayed.

## Test case B: By rating filter

### <ins>Test case B:A:</ins>

- Open webpage and navigate to challenges.html.
- Press Filter challenges button to open the filter modal.
- In the filter-modal, press minimum rating of 2 stars.
- In the filter-modal, press maximum rating of 4 stars.

Expected:

- Only challenges that have 2 - 4 stars in rating should be shown in the user-interface.

### <ins>Test case B:B:</ins>

- Open webpage and navigate to challenges.html.
- Press Filter challenges button to open the filter modal.
- In the filter-modal, press minimum rating of 2 stars.
- In the filter-modal, press maximum rating of 4 stars.
- Uncheck maximum rating of 4 stars.
- Uncheck minimum rating of 2 stars.

Expected:

- All challenges should now be shown in the user-interface.

### <ins>Test case B:C:</ins>

- Open webpage and navigate to challenges.html.
- Press Filter challenges button to open the filter modal.
- In the filter-modal, press minimum rating of 2 stars.

Expected:

- Only challenges that have a minimum rating of 2 stars and up to 5 stars should be shown in the user-interface.

### <ins>Test case B:D:</ins>

- Open webpage and navigate to challenges.html.
- Press Filter challenges button to open the filter modal.
- In the filter-modal, press maximum rating of 4 stars.

Expected:

- Only challenges that have 0 rating and up to maximum of 4 in rating should be shown in the user-interface.

### <ins>Test case B:E:</ins>

- Open webpage and navigate to challenges.html.
- Press Filter challenges button to open the filter modal.
- In the filter-modal, press minimum rating of 5 stars and maximum rating of 5 stars.

Expected:

- A message should appear on the challenges with the content of "No matching challenges". This message might depend
  On the current rating from the API which updates from day to day.

## Test case C: By tag filter

### <ins>Test case C:A:</ins>

- Open webpage and navigate to challenge page.
- Press the "Filter challenges" button to open the modal.
- Navigate to the "By tags" title
- Press the "Electronics" button.
- Press the "SSH" button.

Expected:

- Only the challenge with the title "Network in the machine" should display.

### <ins>Test case C:B:</ins>

- Open webpage and navigate to challenge page.
- Press the "Filter challenges" button to open the modal.
- Navigate to the "By tags" title
- Press the "Web" button.
- Press the "Phreaking" button.
- Press the "Hacking" button.

Expected:

- Only the challenge with the title "Binary dreams for hackers" should display.

### <ins>Test case C:C:</ins>

- Open webpage and navigate to challenge page.
- Press the "Filter challenges" button to open the modal.
- Navigate to the "By tags" title
- Press the "SSH" button.
- Press the "CTF" button.
- Press the "Phreaking" button.
- Press the "Linux" button.
- Press the "Phreaking" button again.

Expected:

- Only the challenge with the title "Room in binary" should display.

### <ins>Test case C:D:</ins>

- Open webpage and navigate to challenge page.
- Press the "Filter challenges" button to open the modal.
- Navigate to the "By tags" title
- Press the "Web" button.
- Press the "CTF" button.
- Press the "Bash" button.

Expected:

- No challenges should display, and an error message should display.

## Test case D: By text filter

### <ins>Test case D:A:</ins>

- Open webpage and navigate to challenges.html.
- Press Filter challenges button to open the filter modal.
- In the "Or type to search for Keyword"-input. Write SHELL in uppercase.

Expected:

- The word "Shell" should be shown in either the title or in the description of the challenges shown.

### <ins>Test case D:B:</ins>

- Open webpage and navigate to challenges.html.
- Press Filter challenges button to open the filter modal.
- In the "Or type to search for Keyword"-input. Write shell in lowercase.

Expected:

- The word "Shell" should be shown in either the title or in the description of the challenges shown.

### <ins>Test case D:C:</ins>

- Open webpage and navigate to challenges.html.
- Press Filter challenges button to open the filter modal.
- In the "Or type to search for Keyword"-input. Write "123456789".

Expected:

- A message should be displayed with "No matching challenges" with the current data from API.

### <ins>Test case D:D:</ins>

- Open webpage and navigate to challenges.html.
- Press Filter challenges button to open the filter modal.
- In the "Or type to search for Keyword"-input. Write "Space".

Expected:

- Challenges that has the word space in the title or in their description should be show in the interface.

## Test case E: All filters

### <ins>Test case E:A:</ins>

- Open webpage and navigate to challenges.html.
- Press Filter challenges button to open the filter modal.
- In the "Or type to search for keyword"-input. Write "Project".
- In the "By type"-filter, click "include online challenges"-checkbox.

Expected:

- Only challenges that have the keyword "Project" in title or description and is aviable online should be shown.

### <ins>Test case E:B</ins>

- Open webpage and navigate to challenges.html.
- Press Filter challenges button to open the filter modal.
- In the "By type"-filter, click "include onsite challenges"-checkbox.
- In the "Or type to search for keyword"-input. Write "Project".

Expected:

- Only challenges that are onsite and have the keyword "project" in title or description should be shown.

### <ins>Test case E:C:</ins>

- Open webpage and navigate to challenges.html.
- Press Filter challenges button to open the filter modal.
- Under the "By tags" title: Press the "Coding" button.
- Press the "Hacking" button.
- Under the "By rating" title, on the first set of stars: Press the first star.
- On the second set of stars: Press the third star.
- Under the "By tags" title: Press the "Bash" button.

Expected:

- Only challenges that have the rating 2 and the title "Project: X 2000" should be displayed.

### <ins>Test case E:D:</ins>

- Open webpage and navigate to challenges.html.
- Press Filter challenges button to open the filter modal.
- Under the "By rating" title, on the first set of stars: Press the first star.
- On the second set of stars: Press the fourth star.
- Under the "By tags" title: Press the "SSH" button.
- Press the "Coding" button.
- Press the "Coding" button again.

Expected:

- There should only be 7 challenges displayed.

### <ins>Test case E:E</ins>

- Open webpage and navigate to challenges.html.
- Press Filter challenges button to open the filter modal.
- In the "By tags"-filter, click "Linux", "CTF", "Phreaking". When they become red, they are marked.
- In the "Or type to search for keyword"-input. Write "Shell"

Expected:

- When chosing the filter-tags, only challenges with the filter tags will be shown. When writing "Shell", challenges with the correct labels and keyword in title and description will be shown.

### <ins>Test case E:F</ins>

- Open webpage and navigate to challenges.html.
- Press Filter challenges button to open the filter modal.
- In the "Or type to search for keyword"-input. Write "Shell"
- In the "By tags"-filter, click "Linux", "CTF", "Phreaking". When they become red, they are marked.

Expected:

- When writing "Shell", challenges with Shell in description or title will be shown. When clicking on the tags, challenges that have the matching keyword filter-tags will be shown.

### <ins>Test case E:G</ins>

- Open webpage and navigate to challenges.html.
- Press Filter challenges button to open the filter modal.
- Press the "Include online challenges" checkbox.
- Under the "By tags" title: Press the "SSH" button.
- Press the "Bash" button.
- Press the "Bash" button again.
- Press the "Include onsite challenges" checkbox.
- Press the "Linux" button under the "By tags" title

Expected:

- There should be 4 rooms displayed. Two online and two onsite.

### <ins>Test case E:H</ins>

- Open webpage and navigate to challenges.html.
- Press Filter challenges button to open the filter modal.
- In the "Or type to search for keyword"-input. Write "Shell"
- In the "By rating"-filter, click minimum rating of 2 stars, and maximum rating och 4 stars.

Expected:

- When writing Shell, room with the keyword in title or description should be shown. When adding minimum and maximum rating of stars, only challenges with correct keyword and rating should be shown.

### <ins>Test case E:I</ins>

- Open webpage and navigate to challenges.html.
- Press Filter challenges button to open the filter modal.
- In the "By rating"-filter, click minimum rating of 2 stars, and maximum rating och 4 stars.
- In the "Or type to search for keyword"-input. Write "Shell"

Expected:

- When adding 2-4 stars, challenges with 2-4 stars should be shown. When writing the keyword, only challenges that matches the keyword and the rating will be shown.

### <ins>Test case E:J</ins>

- Open webpage and navigate to challenges.html.
- Press Filter challenges button to open the filter modal.
- In "By type"-filter, click "Include online challenges".
- In the "By rating"-filter, click minumum of 1 star, and maximum of 5 stars.
- In the "By tags"-filter, click "Coding", "Linux", "Electronics".
- In the "Or type to search for keyword", type "Network."

Expected:

- Clicking on "Include online challenges" should show only online challenges. When adding rating, only room that are online and have the correct rating should show.
- When clicking the tags, only the challenges that are online, and have correct rating and tags should be shown.
- When writing keyword "Network". Only the challenges that are online, correct rating, correct tags and the correct keyword in title / description should be shown.

### <ins>Test case E:K</ins>

- Open webpage and navigate to challenges.html.
- Press Filter challenges button to open the filter modal.
- In the "Or type to search for keyword", type "Network."
- In the "By tags"-filter, click "Coding", "Linux", "Electronics".
- In the "By rating"-filter, click minumum of 2 star, and maximum of 5 stars.
- In "By type"-filter, click "Include online challenges".

Expected:

- When adding the keyword "Network", challenges with network in title or description should be shown.
- When adding the tags filter, challenges with the keyword network and correct tags should be shown.
- When adding the rating-filter. Challenges with correct keywork, correct tags and correct rating should be shown.
- When adding the by type-filter. Challenges with correct keyword, correct tags, correct rating and correct type should be shown.
