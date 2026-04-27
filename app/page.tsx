'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  RotateCw, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  GraduationCap, 
  PlayCircle, 
  Check, 
  X, 
  Trophy, 
  BarChart3, 
  Calendar, 
  Info,
  Clock,
  ShieldCheck,
  Search
} from 'lucide-react';

/**
 * OFFICIAL 2025 CIVICS TEST DATA (128 QUESTIONS)
 * Data sourced from USCIS 2025 version 
 */
const CIVICS_DATA = [
  /* A: Principles of American Government  */
  { id: 1, q: "What is the form of government of the United States?", a: "Republic", options: ["Monarchy", "Republic", "Theocracy", "Oligarchy"], cat: "Government" },
  { id: 2, q: "What is the supreme law of the land?", a: "Constitution", options: ["Declaration of Independence", "Constitution", "Bill of Rights", "Emancipation Proclamation"], cat: "Government" },
  { id: 3, q: "Name one thing the U.S. Constitution does.", a: "Forms the government", options: ["Declares independence", "Forms the government", "Sets tax rates", "Appoints the King"], cat: "Government" },
  { id: 4, q: "The U.S. Constitution starts with the words 'We the People.' What does 'We the People' mean?", a: "Self-government", options: ["Socialism", "Self-government", "Military rule", "King's rule"], cat: "Government" },
  { id: 5, q: "How are changes made to the U.S. Constitution?", a: "Amendments", options: ["Executive orders", "Amendments", "New laws", "Supreme Court decrees"], cat: "Government" },
  { id: 6, q: "What does the Bill of Rights protect?", a: "The basic rights of Americans", options: ["The rights of the President", "The basic rights of Americans", "State borders", "The banking system"], cat: "Government" },
  { id: 7, q: "How many amendments does the U.S. Constitution have?", a: "27", options: ["10", "21", "27", "33"], cat: "Government" },
  { id: 8, q: "Why is the Declaration of Independence important?", a: "It says America is free from British control", options: ["It set up the first bank", "It says America is free from British control", "It ended the Civil War", "It established the Supreme Court"], cat: "Government" },
  { id: 9, q: "What founding document said the American colonies were free from Britain?", a: "Declaration of Independence", options: ["The Constitution", "Declaration of Independence", "The Federalist Papers", "The Mayflower Compact"], cat: "Government" },
  { id: 10, q: "Name two important ideas from the Declaration of Independence and the U.S. Constitution.", a: "Equality and Liberty", options: ["Taxation and Monarchy", "Equality and Liberty", "Slavery and Control", "Religion and War"], cat: "Government" },
  { id: 11, q: "The words 'Life, Liberty, and the pursuit of Happiness' are in what founding document?", a: "Declaration of Independence", options: ["The Bill of Rights", "The Constitution", "Declaration of Independence", "The Gettysburg Address"], cat: "Government" },
  { id: 12, q: "What is the economic system of the United States?", a: "Capitalism", options: ["Communism", "Socialism", "Capitalism", "Barter System"], cat: "Government" },
  { id: 13, q: "What is the rule of law?", a: "Everyone must follow the law", options: ["The President is above the law", "Everyone must follow the law", "Only citizens follow laws", "The military makes laws"], cat: "Government" },
  { id: 14, q: "Many documents influenced the U.S. Constitution. Name one.", a: "Declaration of Independence", options: ["The Communist Manifesto", "Declaration of Independence", "The Magna Carta", "The Treaty of Versailles"], cat: "Government" },
  { id: 15, q: "There are three branches of government. Why?", a: "So one part does not become too powerful", options: ["To make it more complex", "So one part does not become too powerful", "To save money", "To follow British tradition"], cat: "Government" },

  /* B: System of Government  */
  { id: 16, q: "Name the three branches of government.", a: "Legislative, executive, and judicial", options: ["State, Local, Federal", "Legislative, executive, and judicial", "Army, Navy, Air Force", "Senate, House, President"], cat: "Government" },
  { id: 17, q: "The President of the United States is in charge of which branch of government?", a: "Executive branch", options: ["Legislative branch", "Judicial branch", "Executive branch", "State branch"], cat: "Government" },
  { id: 18, q: "What part of the federal government writes laws?", a: "U.S. Congress", options: ["The President", "Supreme Court", "U.S. Congress", "Department of Justice"], cat: "Government" },
  { id: 19, q: "What are the two parts of the U.S. Congress?", a: "Senate and House of Representatives", options: ["President and Vice President", "Senate and House of Representatives", "Supreme Court and Cabinet", "Governors and Mayors"], cat: "Government" },
  { id: 20, q: "Name one power of the U.S. Congress.", a: "Declares war", options: ["Vetoes bills", "Declares war", "Commands the army", "Interprets laws"], cat: "Government" },
  { id: 21, q: "How many U.S. senators are there?", a: "100", options: ["50", "100", "435", "538"], cat: "Government" },
  { id: 22, q: "How long is a term for a U.S. senator?", a: "6 years", options: ["2 years", "4 years", "6 years", "Life"], cat: "Government" },
  { id: 23, q: "Who is one of your state's U.S. senators now?", a: "Mark Kelly", options: ["Katie Hobbs", "Mark Kelly", "Kyrsten Sinema", "John Roberts"], cat: "AZ Specific" },
  { id: 24, q: "How many voting members are in the House of Representatives?", a: "435", options: ["100", "270", "435", "538"], cat: "Government" },
  { id: 25, q: "How long is a term for a member of the House of Representatives?", a: "2 years", options: ["2 years", "4 years", "6 years", "Life"], cat: "Government" },
  { id: 26, q: "Why do U.S. representatives serve shorter terms than U.S. senators?", a: "To more closely follow public opinion", options: ["To save money", "To follow British tradition", "To more closely follow public opinion", "Because they have less power"], cat: "Government" },
  { id: 27, q: "How many senators does each state have?", a: "2", options: ["1", "2", "Based on population", "5"], cat: "Government" },
  { id: 28, q: "Why does each state have two senators?", a: "Equal representation (for small states)", options: ["Equal representation (for small states)", "The Great Compromise", "To balance the House", "To limit government power"], cat: "Government" },
  { id: 29, q: "Name your U.S. representative.", a: "Debbie Lesko (Peoria, AZ)", options: ["Debbie Lesko", "Mark Kelly", "Katie Hobbs", "Kyrsten Sinema"], cat: "AZ Specific" },
  { id: 30, q: "What is the name of the Speaker of the House of Representatives now?", a: "Mike Johnson", options: ["Nancy Pelosi", "Mike Johnson", "Kevin McCarthy", "Hakeem Jeffries"], cat: "Government" },
  { id: 31, q: "Who does a U.S. senator represent?", a: "People of their state", options: ["People of their district", "People of their state", "The President", "Only the majority party"], cat: "Government" },
  { id: 32, q: "Who elects U.S. senators?", a: "Citizens from their state", options: ["The State Legislature", "The Governor", "Citizens from their state", "The Electoral College"], cat: "Government" },
  { id: 33, q: "Who does a member of the House of Representatives represent?", a: "People in their district", options: ["People in their state", "People in their district", "The President", "Only political donors"], cat: "Government" },
  { id: 34, q: "Who elects members of the House of Representatives?", a: "Citizens from their district", options: ["The Governor", "The State Senate", "Citizens from their district", "The Supreme Court"], cat: "Government" },
  { id: 35, q: "Some states have more representatives than other states. Why?", a: "Because of the state's population", options: ["Geographical size", "State's wealth", "Because of the state's population", "Date of admission"], cat: "Government" },
  { id: 36, q: "The President of the United States is elected for how many years?", a: "4 years", options: ["2 years", "4 years", "6 years", "8 years"], cat: "Government" },
  { id: 37, q: "The President can serve only two terms. Why?", a: "To keep the president from becoming too powerful", options: ["To save money", "To keep the president from becoming too powerful", "22nd Amendment", "Traditional custom"], cat: "Government" },
  { id: 38, q: "What is the name of the President of the United States now?", a: "Joe Biden", options: ["Donald Trump", "Joe Biden", "Barack Obama", "Kamala Harris"], cat: "Government" },
  { id: 39, q: "What is the name of the Vice President now?", a: "Kamala Harris", options: ["Mike Pence", "Kamala Harris", "Nancy Pelosi", "Joe Biden"], cat: "Government" },
  { id: 40, q: "If the president can no longer serve, who becomes president?", a: "The Vice President", options: ["Speaker of the House", "The Vice President", "Secretary of State", "Chief Justice"], cat: "Government" },
  { id: 41, q: "Name one power of the president.", a: "Signs bills into law", options: ["Declares war", "Signs bills into law", "Writes federal laws", "Sets tax rates"], cat: "Government" },
  { id: 42, q: "Who is Commander in Chief of the U.S. military?", a: "The President", options: ["Secretary of Defense", "The President", "Vice President", "General of the Army"], cat: "Government" },
  { id: 43, q: "Who signs bills to become laws?", a: "The President", options: ["Vice President", "The President", "Chief Justice", "Speaker of the House"], cat: "Government" },
  { id: 44, q: "Who vetoes bills?", a: "The President", options: ["The Senate", "The President", "The Supreme Court", "The People"], cat: "Government" },
  { id: 45, q: "Who appoints federal judges?", a: "The President", options: ["The Senate", "The Chief Justice", "The President", "The Attorney General"], cat: "Government" },
  { id: 46, q: "The executive branch has many parts. Name one.", a: "Cabinet", options: ["Congress", "Cabinet", "Supreme Court", "The Senate"], cat: "Government" },
  { id: 47, q: "What does the President's Cabinet do?", a: "Advises the President", options: ["Interprets laws", "Advises the President", "Makes federal laws", "Sets national budget"], cat: "Government" },
  { id: 48, q: "What are two Cabinet-level positions?", a: "Attorney General and Vice-President", options: ["Senator and Governor", "Attorney General and Vice-President", "Speaker and Chief Justice", "Mayor and Sheriff"], cat: "Government" },
  { id: 49, q: "Why is the Electoral College important?", a: "It decides who is elected president", options: ["It counts all votes", "It decides who is elected president", "It creates new states", "It settles legal disputes"], cat: "Government" },
  { id: 50, q: "What is one part of the judicial branch?", a: "Supreme Court", options: ["The President", "Congress", "Supreme Court", "The Cabinet"], cat: "Government" },
  { id: 51, q: "What does the judicial branch do?", a: "Reviews laws", options: ["Enforces laws", "Reviews laws", "Vetoes bills", "Signs treaties"], cat: "Government" },
  { id: 52, q: "What is the highest court in the United States?", a: "Supreme Court", options: ["District Court", "Court of Appeals", "Supreme Court", "Superior Court"], cat: "Government" },
  { id: 53, q: "How many seats are on the Supreme Court?", a: "9", options: ["7", "9", "12", "15"], cat: "Government" },
  { id: 54, q: "How many Supreme Court justices are usually needed to decide a case?", a: "5", options: ["4", "5", "7", "9"], cat: "Government" },
  { id: 55, q: "How long do Supreme Court justices serve?", a: "For life", options: ["4 years", "10 years", "For life", "Until age 70"], cat: "Government" },
  { id: 56, q: "Supreme Court justices serve for life. Why?", a: "To be independent (of politics)", options: ["To save money", "To be independent (of politics)", "Traditional custom", "To follow British law"], cat: "Government" },
  { id: 57, q: "Who is the Chief Justice of the United States now?", a: "John Roberts", options: ["Clarence Thomas", "John Roberts", "Sonia Sotomayor", "Brett Kavanaugh"], cat: "Government" },
  { id: 58, q: "Name one power that is only for the federal government.", a: "Print paper money", options: ["Provide schooling", "Give driver's licenses", "Print paper money", "Approve zoning"], cat: "Government" },
  { id: 59, q: "Name one power that is only for the states.", a: "Provide schooling and education", options: ["Declare war", "Provide schooling and education", "Print paper money", "Make treaties"], cat: "Government" },
  { id: 60, q: "What is the purpose of the 10th Amendment?", a: "Powers not given to federal government belong to states/people", options: ["To end slavery", "To give voting rights", "Powers not given to federal government belong to states/people", "To set tax rates"], cat: "Government" },
  { id: 61, q: "Who is the governor of your state now?", a: "Katie Hobbs", options: ["Mark Kelly", "Doug Ducey", "Katie Hobbs", "Kari Lake"], cat: "AZ Specific" },
  { id: 62, q: "What is the capital of your state?", a: "Phoenix", options: ["Tucson", "Flagstaff", "Phoenix", "Sedona"], cat: "AZ Specific" },

  /* C: Rights and Responsibilities  */
  { id: 63, q: "There are four amendments about who can vote. Describe one.", a: "Citizens eighteen (18) and older (can vote)", options: ["Only men can vote", "You must pay a poll tax", "Citizens eighteen (18) and older (can vote)", "Property owners only"], cat: "Rights" },
  { id: 64, q: "Who can vote in federal elections, run for office, and serve on a jury?", a: "U.S. citizens", options: ["All residents", "U.S. citizens", "Legal residents only", "Property owners"], cat: "Rights" },
  { id: 65, q: "What are three rights of everyone living in the United States?", a: "Freedom of speech, expression, and assembly", options: ["Right to vote and run for office", "Freedom of speech, expression, and assembly", "Right to a job and housing", "Right to free travel and healthcare"], cat: "Rights" },
  { id: 66, q: "What do we show loyalty to when we say the Pledge of Allegiance?", a: "The United States", options: ["The President", "The United States", "The Congress", "The Military"], cat: "Rights" },
  { id: 67, q: "Name two promises new citizens make in the Oath of Allegiance.", a: "Give up loyalty to other countries and obey U.S. laws", options: ["Vote in every election and join a party", "Give up loyalty to other countries and obey U.S. laws", "Never travel abroad and pay high taxes", "Join the military and work for the government"], cat: "Rights" },
  { id: 68, q: "How can people become United States citizens?", a: "Naturalize", options: ["Work for 5 years", "Naturalize", "Pay a fee", "Buy property"], cat: "Rights" },
  { id: 69, q: "What are two examples of civic participation in the U.S.?", a: "Vote and run for office", options: ["Work and pay bills", "Vote and run for office", "Travel and watch news", "Exercise and eat healthy"], cat: "Rights" },
  { id: 70, q: "What is one way Americans can serve their country?", a: "Serve in the military", options: ["Pay bills", "Serve in the military", "Travel abroad", "Watch the news"], cat: "Rights" },
  { id: 71, q: "Why is it important to pay federal taxes?", a: "Required by law", options: ["To join the army", "To get a passport", "Required by law", "To vote"], cat: "Rights" },
  { id: 72, q: "All men age 18-25 must register for Selective Service. Name one reason.", a: "Required by law", options: ["To get a job", "To vote", "Required by law", "To travel"], cat: "Rights" },

  /* AMERICAN HISTORY  */
  { id: 73, q: "The colonists came to America for many reasons. Name one.", a: "Freedom", options: ["To find gold", "Freedom", "To join the army", "To study"], cat: "History" },
  { id: 74, q: "Who lived in America before the Europeans arrived?", a: "American Indians", options: ["Vikings", "American Indians", "Canadians", "Australians"], cat: "History" },
  { id: 75, q: "What group of people was taken and sold as slaves?", a: "Africans", options: ["British", "Spanish", "Africans", "Indians"], cat: "History" },
  { id: 76, q: "What war did the Americans fight to win independence from Britain?", a: "American Revolution", options: ["Civil War", "American Revolution", "War of 1812", "WWII"], cat: "History" },
  { id: 77, q: "Name one reason why the Americans declared independence from Britain.", a: "Taxation without representation", options: ["Land borders", "Taxation without representation", "Religious differences", "Trade laws"], cat: "History" },
  { id: 78, q: "Who wrote the Declaration of Independence?", a: "Thomas Jefferson", options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "Alexander Hamilton"], cat: "History" },
  { id: 79, q: "When was the Declaration of Independence adopted?", a: "July 4, 1776", options: ["July 4, 1776", "July 4, 1787", "July 4, 1812", "Dec 25, 1776"], cat: "History" },
  { id: 80, q: "The American Revolution had many important events. Name one.", a: "Battle of Yorktown", options: ["Battle of Yorktown", "Battle of Gettysburg", "Pearl Harbor", "D-Day"], cat: "History" },
  { id: 81, q: "There were 13 original states. Name five.", a: "New York, New Jersey, Pennsylvania, Virginia, Georgia", options: ["CA, TX, FL, AZ, NV", "New York, New Jersey, Pennsylvania, Virginia, Georgia", "WA, OR, ID, MT, WY", "MI, OH, IL, IN, WI"], cat: "History" },
  { id: 82, q: "What founding document was written in 1787?", a: "Constitution", options: ["Declaration of Independence", "Constitution", "Bill of Rights", "Magna Carta"], cat: "History" },
  { id: 83, q: "The Federalist Papers supported the U.S. Constitution. Name one writer.", a: "James Madison", options: ["Thomas Jefferson", "James Madison", "Benjamin Franklin", "George Washington"], cat: "History" },
  { id: 84, q: "Why were the Federalist Papers important?", a: "Helped people understand the Constitution", options: ["Ended the war", "Helped people understand the Constitution", "Created the first bank", "Set tax rates"], cat: "History" },
  { id: 85, q: "Benjamin Franklin is famous for many things. Name one.", a: "U.S. diplomat", options: ["Third President", "U.S. diplomat", "Inventor of the car", "General in WWI"], cat: "History" },
  { id: 86, q: "George Washington is famous for many things. Name one.", a: "First president of the United States", options: ["Wrote the Constitution", "First president of the United States", "General in WWII", "Signed the Declaration"], cat: "History" },
  { id: 87, q: "Thomas Jefferson is famous for many things. Name one.", a: "Writer of the Declaration of Independence", options: ["General in Civil War", "Writer of the Declaration of Independence", "Inventor of phone", "First Postmaster General"], cat: "History" },
  { id: 88, q: "James Madison is famous for many things. Name one.", a: "Father of the Constitution", options: ["General in WWII", "Father of the Constitution", "Discovered Alaska", "Wrote the national anthem"], cat: "History" },
  { id: 89, q: "Alexander Hamilton is famous for many things. Name one.", a: "First Secretary of the Treasury", options: ["General in WWI", "First Secretary of the Treasury", "Wrote the Constitution", "Discovered the West"], cat: "History" },
  { id: 90, q: "What territory did the United States buy from France in 1803?", a: "Louisiana Territory", options: ["Alaska", "Texas", "Florida", "Louisiana Territory"], cat: "History" },
  { id: 91, q: "Name one war fought by the United States in the 1800s.", a: "Civil War", options: ["WWI", "WWII", "Civil War", "Korean War"], cat: "History" },
  { id: 92, q: "Name the U.S. war between the North and the South.", a: "The Civil War", options: ["Revolutionary War", "Civil War", "War of 1812", "Vietnam War"], cat: "History" },
  { id: 93, q: "The Civil War had many important events. Name one.", a: "Emancipation Proclamation", options: ["Battle of Yorktown", "Emancipation Proclamation", "Pearl Harbor", "Landing on moon"], cat: "History" },
  { id: 94, q: "Abraham Lincoln is famous for many things. Name one.", a: "Freed the slaves", options: ["Signed the Declaration", "Freed the slaves", "Purchased Alaska", "Founded the Red Cross"], cat: "History" },
  { id: 95, q: "What did the Emancipation Proclamation do?", a: "Freed the slaves", options: ["Ended WWI", "Freed the slaves", "Gave women voting rights", "Created the first bank"], cat: "History" },
  { id: 96, q: "What U.S. war ended slavery?", a: "The Civil War", options: ["Revolutionary War", "Civil War", "War of 1812", "Spanish-American War"], cat: "History" },
  { id: 97, q: "What amendment says all persons born or naturalized in the U.S. are citizens?", a: "14th Amendment", options: ["1st Amendment", "14th Amendment", "19th Amendment", "22nd Amendment"], cat: "History" },
  { id: 98, q: "When did all men get the right to vote?", a: "After the Civil War", options: ["In 1776", "After the Civil War", "After WWI", "In 1945"], cat: "History" },
  { id: 99, q: "Name one leader of the women's rights movement in the 1800s.", a: "Susan B. Anthony", options: ["Susan B. Anthony", "Rosa Parks", "Nancy Pelosi", "Hillary Clinton"], cat: "History" },
  { id: 100, q: "Name one war fought by the United States in the 1900s.", a: "World War II", options: ["Civil War", "War of 1812", "World War II", "Revolutionary War"], cat: "History" },
  { id: 101, q: "Why did the United States enter World War I?", a: "To support the Allied Powers", options: ["To support the Allied Powers", "Because of high taxes", "To start a new bank", "To discover land"], cat: "History" },
  { id: 102, q: "When did all women get the right to vote?", a: "1920", options: ["1776", "1865", "1920", "1945"], cat: "History" },
  { id: 103, q: "What was the Great Depression?", a: "Longest economic recession in modern history", options: ["A period of high happiness", "Longest economic recession in modern history", "A short war", "A new law"], cat: "History" },
  { id: 104, q: "When did the Great Depression start?", a: "Stock market crash of 1929", options: ["After WWII", "In 1865", "Stock market crash of 1929", "When the war began"], cat: "History" },
  { id: 105, q: "Who was president during the Great Depression and WWII?", a: "Franklin Roosevelt", options: ["Herbert Hoover", "Franklin Roosevelt", "Harry Truman", "Dwight Eisenhower"], cat: "History" },
  { id: 106, q: "Why did the United States enter World War II?", a: "Bombing of Pearl Harbor", options: ["Bombing of Pearl Harbor", "To support high taxes", "To end the depression", "To discover new land"], cat: "History" },
  { id: 107, q: "Dwight Eisenhower is famous for many things. Name one.", a: "General during World War II", options: ["General during World War II", "First President", "Wrote the Constitution", "Founded the first bank"], cat: "History" },
  { id: 108, q: "Who was the United States' main rival during the Cold War?", a: "Soviet Union", options: ["Japan", "Germany", "Soviet Union", "Great Britain"], cat: "History" },
  { id: 109, q: "During the Cold War, what was one main concern of the United States?", a: "Communism", options: ["Taxes", "Religion", "Communism", "The Gold Standard"], cat: "History" },
  { id: 110, q: "Why did the United States enter the Korean War?", a: "To stop the spread of communism", options: ["To find gold", "To stop the spread of communism", "To help the British", "To end slavery"], cat: "History" },
  { id: 111, q: "Why did the United States enter the Vietnam War?", a: "To stop the spread of communism", options: ["To find trade routes", "To stop the spread of communism", "To discover land", "To end the war"], cat: "History" },
  { id: 112, q: "What did the civil rights movement do?", a: "Fought to end racial discrimination", options: ["Ended WWI", "Fought to end racial discrimination", "Created the first bank", "Gave men the vote"], cat: "History" },
  { id: 113, q: "Martin Luther King, Jr. is famous for many things. Name one.", a: "Fought for civil rights", options: ["First President", "Fought for civil rights", "General in WWII", "Signed the Declaration"], cat: "History" },
  { id: 114, q: "Why did the United States enter the Persian Gulf War?", a: "To force the Iraqi military from Kuwait", options: ["To find oil", "To force the Iraqi military from Kuwait", "To help the British", "To start a new bank"], cat: "History" },
  { id: 115, q: "What major event happened on September 11, 2001, in the U.S.?", a: "Terrorists attacked the United States", options: ["Stock market crashed", "Terrorists attacked the United States", "Iraq War began", "Moon landing"], cat: "History" },
  { id: 116, q: "Name one U.S. military conflict after the September 11, 2001 attacks.", a: "War in Afghanistan", options: ["War in Afghanistan", "Civil War", "WWI", "Korean War"], cat: "History" },
  { id: 117, q: "Name one American Indian tribe in the United States.", a: "Navajo", options: ["Aztec", "Inca", "Navajo", "Zulu"], cat: "History" },
  { id: 118, q: "Name one example of an American innovation.", a: "Light bulb", options: ["Pyramids", "Light bulb", "The wheel", "Compass"], cat: "History" },

  /* SYMBOLS AND HOLIDAYS  */
  { id: 119, q: "What is the capital of the United States?", a: "Washington, D.C.", options: ["New York", "Philadelphia", "Washington, D.C.", "Los Angeles"], cat: "Symbols" },
  { id: 120, q: "Where is the Statue of Liberty?", a: "New York Harbor", options: ["San Francisco", "Washington, D.C.", "New York Harbor", "Boston"], cat: "Symbols" },
  { id: 121, q: "Why does the flag have 13 stripes?", a: "Because there were 13 original colonies", options: ["One for each state", "Because there were 13 original colonies", "For each signer", "For each month of war"], cat: "Symbols" },
  { id: 122, q: "Why does the flag have 50 stars?", a: "Because there is one star for each state", options: ["One for each year", "Because there is one star for each state", "One for each signer", "One for each amendment"], cat: "Symbols" },
  { id: 123, q: "What is the name of the national anthem?", a: "The Star-Spangled Banner", options: ["America the Beautiful", "God Bless the USA", "The Star-Spangled Banner", "My Country Tis of Thee"], cat: "Symbols" },
  { id: 124, q: "The Nation's first motto was 'E Pluribus Unum.' What does that mean?", a: "Out of many, one", options: ["In God We Trust", "Out of many, one", "Freedom for all", "Power to people"], cat: "Symbols" },
  { id: 125, q: "What is Independence Day?", a: "A holiday to celebrate U.S. independence", options: ["The day we vote", "A holiday to celebrate U.S. independence", "The end of winter", "A day for the military"], cat: "Holidays" },
  { id: 126, q: "Name three national U.S. holidays.", a: "Labor Day, Thanksgiving, and Christmas", options: ["Labor Day, Thanksgiving, and Christmas", "Easter, Halloween, and St. Patrick's", "Election Day, Tax Day, and Flag Day", "Mother's Day, Father's Day, and Earth Day"], cat: "Holidays" },
  { id: 127, q: "What is Memorial Day?", a: "A holiday to honor soldiers who died in military service", options: ["A day for all veterans", "A holiday to honor soldiers who died in military service", "The start of summer", "A day for the president"], cat: "Holidays" },
  { id: 128, q: "What is Veterans Day?", a: "A holiday to honor people who served in the military", options: ["A day for soldiers who died", "A holiday to honor people who served in the military", "A day for current soldiers", "The birthday of the Army"], cat: "Holidays" }
];

export default function App() {
  const [hasMounted, setHasMounted] = useState(false);
  const [user, setUser] = useState('Godan');
  const [mode, setMode] = useState('flashcards');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizResult, setQuizResult] = useState({ answered: false, selected: null });
  const [mastered, setMastered] = useState({});

  useEffect(() => {
    setHasMounted(true);
    const saved = localStorage.getItem('family_mastery_128');
    if (saved) setMastered(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('family_mastery_128', JSON.stringify(mastered));
    }
  }, [mastered, hasMounted]);

  const family = ['Godan', 'Sudha', 'Pratyush'];
  const currentQ = useMemo(() => CIVICS_DATA[index] || CIVICS_DATA[0], [index]);

  const currentMastered = useMemo(() => {
    return !!mastered[`${user}-${currentQ?.id}`];
  }, [mastered, user, currentQ?.id]);

  const masteryCount = useMemo(() => {
    return Object.keys(mastered).filter(k => k.startsWith(user) && mastered[k]).length;
  }, [mastered, user]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % CIVICS_DATA.length);
    setFlipped(false);
    setQuizResult({ answered: false, selected: null });
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + CIVICS_DATA.length) % CIVICS_DATA.length);
    setFlipped(false);
    setQuizResult({ answered: false, selected: null });
  };

  const toggleMastery = () => {
    if (!currentQ) return;
    const key = `${user}-${currentQ.id}`;
    setMastered(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!hasMounted) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-indigo-400 font-bold">Syncing Study Hub...</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      <header className="bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <GraduationCap className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight">Study Hub</h1>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-1">
                <ShieldCheck size={10} className="text-green-500" /> 2025 Test Edition
              </p>
            </div>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-2xl items-center border">
            <Users size={14} className="mx-3 text-slate-400" />
            {family.map((m) => (
              <button
                key={m}
                onClick={() => { setUser(m); setFlipped(false); setQuizResult({ answered: false, selected: null }); }}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${user === m ? 'bg-white text-indigo-600 shadow-sm scale-105' : 'text-slate-500'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 mt-8">
        <section className="mb-8 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-end mb-4">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-yellow-500" />
              <h3 className="text-sm font-black text-slate-500 uppercase tracking-tight">{user}'s Mastery</h3>
            </div>
            <span className="text-lg font-black text-indigo-600 tabular-nums">
              {Math.round((masteryCount / CIVICS_DATA.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden border border-slate-200 p-1">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${(masteryCount / CIVICS_DATA.length) * 100}%` }}
            />
          </div>
        </section>

        <div className="flex gap-4 mb-8">
          <button onClick={() => setMode('flashcards')} className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-3xl font-black transition-all ${mode === 'flashcards' ? 'bg-indigo-600 text-white shadow-xl translate-y-[-2px]' : 'bg-white text-slate-500 border hover:bg-slate-50'}`}>
            <BookOpen size={22} /> Flashcards
          </button>
          <button onClick={() => setMode('quiz')} className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-3xl font-black transition-all ${mode === 'quiz' ? 'bg-indigo-600 text-white shadow-xl translate-y-[-2px]' : 'bg-white text-slate-500 border hover:bg-slate-50'}`}>
            <PlayCircle size={22} /> Quiz Mode
          </button>
        </div>

        <article className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 mb-8">
          <div className="p-8 md:p-14">
            <div className="flex justify-between items-center mb-10">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-5 py-2 rounded-full border border-indigo-100">
                {currentQ?.cat || 'General'}
              </span>
              <span className="text-xs font-black text-slate-300 tabular-nums">ID # {currentQ?.id}</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-bold leading-tight text-slate-800 mb-14 text-center tracking-tight">
              {currentQ?.q}
            </h2>

            {mode === 'flashcards' ? (
              <div onClick={() => setFlipped(!flipped)} className={`w-full min-h-[250px] flex flex-col items-center justify-center p-10 rounded-[2.5rem] cursor-pointer transition-all duration-500 relative group ${flipped ? 'bg-indigo-600 text-white shadow-2xl' : 'bg-slate-50 border-2 border-dashed border-slate-200'}`}>
                <p className={`text-2xl md:text-3xl font-bold text-center ${flipped ? 'opacity-100' : 'text-slate-400 italic'}`}>
                  {flipped ? currentQ?.a : "Tap to reveal answer"}
                </p>
                {!flipped && <RotateCw className="absolute bottom-6 right-8 text-slate-200" size={28} />}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {currentQ?.options?.map((option, i) => {
                  const isCorrect = option === currentQ.a;
                  const isSelected = quizResult.selected === option;
                  let style = "w-full text-left px-8 py-6 rounded-[1.5rem] border-2 font-bold transition-all duration-300 flex justify-between items-center group ";
                  if (!quizResult.answered) style += "border-slate-100 hover:border-indigo-600 hover:bg-indigo-50";
                  else if (isCorrect) style += "border-green-500 bg-green-50 text-green-700 ring-8 ring-green-50";
                  else if (isSelected) style += "border-red-500 bg-red-50 text-red-700";
                  else style += "border-slate-50 text-slate-200 opacity-40";

                  return (
                    <button key={`${index}-${i}`} disabled={quizResult.answered} onClick={() => setQuizResult({ answered: true, selected: option })} className={style}>
                      <span className="text-lg">{option}</span>
                      {quizResult.answered && isCorrect && <CheckCircle2 size={28} className="text-green-600" />}
                      {quizResult.answered && isSelected && !isCorrect && <X size={28} className="text-red-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <footer className="bg-slate-50 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between border-t border-slate-100 gap-8">
            <button onClick={toggleMastery} className={`flex items-center gap-3 text-sm font-black transition-all duration-500 px-8 py-4 rounded-2xl shadow-sm ${currentMastered ? 'bg-green-600 text-white shadow-green-100' : 'bg-white text-slate-400 border border-slate-200 hover:text-indigo-600'}`}>
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${currentMastered ? 'bg-white border-white' : 'border-slate-200'}`}>
                {currentMastered ? <Check size={14} className="text-green-600" strokeWidth={6} /> : null}
              </div>
              {currentMastered ? 'MASTERED' : 'MARK LEARNED'}
            </button>
            <div className="flex gap-4 w-full md:w-auto">
              <button onClick={handlePrev} className="flex-1 md:flex-none p-5 bg-white border rounded-[1.5rem] shadow-sm hover:bg-slate-100 transition-all">
                <ChevronLeft size={32} className="text-slate-600" />
              </button>
              <button onClick={handleNext} className="flex-[2] md:flex-none px-14 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black shadow-2xl shadow-indigo-100 hover:bg-indigo-700 hover:scale-[1.03] active:scale-95 transition-all">
                CONTINUE
              </button>
            </div>
          </footer>
        </article>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-10 flex items-center gap-3">
              <BarChart3 size={16} /> Shared Mastery
            </h4>
            <div className="space-y-8">
              {family.map(m => {
                const count = Object.keys(mastered).filter(k => k.startsWith(m) && mastered[k]).length;
                const percent = (count / CIVICS_DATA.length) * 100;
                return (
                  <div key={m}>
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-base font-bold tracking-tight ${m === user ? 'text-white underline underline-offset-8 decoration-indigo-500' : 'text-slate-400'}`}>{m}</span>
                      <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">{count} / 128</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div className={`h-full transition-all duration-1000 rounded-full ${m === user ? 'bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.5)]' : 'bg-slate-600'}`} style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="bg-white rounded-[2.5rem] p-10 border border-slate-200 flex flex-col justify-between shadow-sm">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-3">
                <Calendar size={16} /> Roadmap 2026
              </h4>
              <div className="flex items-center gap-5 mb-6">
                <div className="bg-orange-50 p-4 rounded-[1.25rem] border border-orange-100">
                   <Clock className="text-orange-600" size={32} />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-800 tracking-tight">June 17</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Filing Target Date</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border">
                Complete the **Full 128 Set** by June 1, 2026 to ensure family-wide readiness for the final submission window.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}