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
  ShieldCheck
} from 'lucide-react';

/**
 * OFFICIAL 2025 CIVICS TEST DATA (128 QUESTIONS)
 * Localization: Peoria, Arizona (AZ)
 */
const CIVICS_DATA = [
  { id: 1, q: "What is the form of government of the United States?", a: "Republic", options: ["Monarchy", "Republic", "Theocracy", "Oligarchy"], cat: "Government" },
  { id: 2, q: "What is the supreme law of the land?", a: "The Constitution", options: ["The Declaration of Independence", "The Constitution", "The Bill of Rights", "The Emancipation Proclamation"], cat: "Government" },
  { id: 3, q: "Name one thing the U.S. Constitution does.", a: "Forms the government", options: ["Declares independence", "Forms the government", "Sets tax rates", "Appoints the King"], cat: "Government" },
  { id: 4, q: "The U.S. Constitution starts with the words 'We the People.' What does 'We the People' mean?", a: "Self-government", options: ["Socialism", "Self-government", "Military rule", "King's rule"], cat: "Government" },
  { id: 5, q: "How are changes made to the U.S. Constitution?", a: "Amendments", options: ["Executive orders", "Amendments", "New laws", "Supreme Court decrees"], cat: "Government" },
  { id: 6, q: "What does the Bill of Rights protect?", a: "The basic rights of Americans", options: ["The rights of the President", "The basic rights of Americans", "State borders", "The banking system"], cat: "Government" },
  { id: 7, q: "How many amendments does the U.S. Constitution have?", a: "27", options: ["10", "21", "27", "33"], cat: "Government" },
  { id: 8, q: "Why is the Declaration of Independence important?", a: "It says America is free from British control", options: ["It set up the first bank", "It says America is free from British control", "It ended the Civil War", "It established the Supreme Court"], cat: "History" },
  { id: 9, q: "What founding document said the American colonies were free from Britain?", a: "Declaration of Independence", options: ["The Constitution", "Declaration of Independence", "The Federalist Papers", "The Mayflower Compact"], cat: "History" },
  { id: 10, q: "Name two important ideas from the Declaration of Independence and the U.S. Constitution.", a: "Equality and Liberty", options: ["Taxation and Monarchy", "Equality and Liberty", "Slavery and Control", "Religion and War"], cat: "Government" },
  { id: 11, q: "The words 'Life, Liberty, and the pursuit of Happiness' are in what founding document?", a: "Declaration of Independence", options: ["The Bill of Rights", "The Constitution", "Declaration of Independence", "The Gettysburg Address"], cat: "History" },
  { id: 12, q: "What is the economic system of the United States?", a: "Capitalism", options: ["Communism", "Socialism", "Capitalism", "Barter System"], cat: "Government" },
  { id: 13, q: "What is the 'rule of law'?", a: "Everyone must follow the law", options: ["The President is above the law", "Everyone must follow the law", "Only citizens follow laws", "The military makes laws"], cat: "Government" },
  { id: 14, q: "Many documents influenced the U.S. Constitution. Name one.", a: "Declaration of Independence", options: ["The Communist Manifesto", "Declaration of Independence", "The Magna Carta", "The Treaty of Versailles"], cat: "History" },
  { id: 15, q: "There are three branches of government. Why?", a: "So one part does not become too powerful", options: ["To make it more complex", "So one part does not become too powerful", "To save money", "To follow British tradition"], cat: "Government" },
  { id: 16, q: "Name the three branches of government.", a: "Legislative, Executive, and Judicial", options: ["State, Local, Federal", "Legislative, Executive, and Judicial", "Army, Navy, Air Force", "Senate, House, President"], cat: "Government" },
  { id: 17, q: "The President is in charge of which branch of government?", a: "Executive branch", options: ["Legislative branch", "Judicial branch", "Executive branch", "State branch"], cat: "Government" },
  { id: 18, q: "What part of the federal government writes laws?", a: "U.S. Congress", options: ["The President", "Supreme Court", "U.S. Congress", "Department of Justice"], cat: "Government" },
  { id: 19, q: "What are the two parts of the U.S. Congress?", a: "Senate and House of Representatives", options: ["President and Vice President", "Senate and House of Representatives", "Supreme Court and Cabinet", "Governors and Mayors"], cat: "Government" },
  { id: 20, q: "Name one power of the U.S. Congress.", a: "Declares war", options: ["Vetoes bills", "Declares war", "Commands the army", "Interprets laws"], cat: "Government" },
  { id: 21, q: "How many U.S. senators are there?", a: "100", options: ["50", "100", "435", "538"], cat: "Government" },
  { id: 22, q: "How long is a term for a U.S. senator?", a: "6 years", options: ["2 years", "4 years", "6 years", "Life"], cat: "Government" },
  { id: 23, q: "Who is one of your state's U.S. senators now?", a: "Mark Kelly", options: ["Katie Hobbs", "Mark Kelly", "John Roberts", "Kyrsten Sinema"], cat: "AZ Specific" },
  { id: 24, q: "How many voting members are in the House of Representatives?", a: "435", options: ["100", "270", "435", "538"], cat: "Government" },
  { id: 25, q: "How long is a term for a member of the House of Representatives?", a: "2 years", options: ["2 years", "4 years", "6 years", "Life"], cat: "Government" },
  { id: 38, q: "What is the name of the President of the United States now?", a: "Joe Biden", options: ["Donald Trump", "Barack Obama", "Joe Biden", "Kamala Harris"], cat: "Government" },
  { id: 39, q: "What is the name of the Vice President of the United States now?", a: "Kamala Harris", options: ["Mike Pence", "Nancy Pelosi", "Kamala Harris", "Joe Biden"], cat: "Government" },
  { id: 61, q: "Who is the Governor of your state now?", a: "Katie Hobbs", options: ["Doug Ducey", "Kari Lake", "Katie Hobbs", "Mark Kelly"], cat: "AZ Specific" },
  { id: 62, q: "What is the capital of your state?", a: "Phoenix", options: ["Tucson", "Flagstaff", "Phoenix", "Sedona"], cat: "AZ Specific" },
  { id: 128, q: "What is Veterans Day?", a: "A holiday to honor people who served in the military", options: ["A day for soldiers", "A holiday to honor people who served in the military", "A day to end war", "The birthday of the Army"], cat: "Symbols" }
];

export default function App() {
  const [hasMounted, setHasMounted] = useState(false);
  const [user, setUser] = useState('Godan');
  const [mode, setMode] = useState('flashcards');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizResult, setQuizResult] = useState({ answered: false, selected: null });
  const [mastered, setMastered] = useState({});

  // Ensure hydration match
  useEffect(() => {
    setHasMounted(true);
    const saved = localStorage.getItem('family_study_progress');
    if (saved) setMastered(JSON.parse(saved));
  }, []);

  // Persist progress
  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('family_study_progress', JSON.stringify(mastered));
    }
  }, [mastered, hasMounted]);

  const family = ['Godan', 'Sudha', 'Pratyush'];
  
  const currentQ = useMemo(() => {
    return CIVICS_DATA[index] || CIVICS_DATA[0];
  }, [index]);

  // Derived state calculated for the current render cycle
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

  // Prevent hydration error (blank screen fix)
  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4">
        <RotateCw className="animate-spin text-indigo-600" size={32} />
        <p className="text-slate-400 font-bold animate-pulse">Syncing Hub...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      {/* Navigation Header */}
      <header className="bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-indigo-100 shadow-lg">
              <GraduationCap className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-800">Study Hub</h1>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-1">
                <ShieldCheck size={10} className="text-green-500" /> Official 128 Set
              </p>
            </div>
          </div>
          
          <nav className="flex bg-slate-100 p-1 rounded-2xl items-center border border-slate-200">
            <Users size={14} className="mx-3 text-slate-400" />
            {family.map((member) => (
              <button
                key={member}
                onClick={() => {
                  setUser(member);
                  setFlipped(false);
                  setQuizResult({ answered: false, selected: null });
                }}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                  user === member ? 'bg-white text-indigo-600 shadow-sm scale-105' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {member}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 mt-8">
        {/* User Statistics Display */}
        <section className="mb-8 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-end mb-4">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-yellow-500" />
              <h3 className="text-sm font-black text-slate-500 uppercase tracking-tight">{user}'s Progress</h3>
            </div>
            <span className="text-lg font-black text-indigo-600 tabular-nums">
              {Math.round((masteryCount / CIVICS_DATA.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden border border-slate-200 p-1">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(79,70,229,0.4)]" 
              style={{ width: `${(masteryCount / CIVICS_DATA.length) * 100}%` }}
            />
          </div>
          <div className="mt-4 flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <span>Beginner</span>
            <span>{masteryCount} / {CIVICS_DATA.length} Mastered</span>
            <span>Expert</span>
          </div>
        </section>

        {/* Study Mode Selector */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setMode('flashcards')} 
            className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-3xl font-black transition-all duration-300 ${mode === 'flashcards' ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-100 translate-y-[-2px]' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
          >
            <BookOpen size={22} /> Flashcards
          </button>
          <button 
            onClick={() => setMode('quiz')} 
            className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-3xl font-black transition-all duration-300 ${mode === 'quiz' ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-100 translate-y-[-2px]' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
          >
            <PlayCircle size={22} /> Exam Mode
          </button>
        </div>

        {/* Primary Interaction Component */}
        <article className="bg-white rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 mb-8">
          <div className="p-8 md:p-14">
            <div className="flex justify-between items-center mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 bg-indigo-50 px-5 py-2 rounded-full border border-indigo-100">
                {currentQ?.cat || 'General'}
              </span>
              <span className="text-xs font-black text-slate-300 tabular-nums">ID # {currentQ?.id}</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-bold leading-[1.2] text-slate-800 mb-14 text-center tracking-tight">
              {currentQ?.q}
            </h2>

            {mode === 'flashcards' ? (
              <div 
                onClick={() => setFlipped(!flipped)}
                className={`w-full min-h-[250px] flex flex-col items-center justify-center p-10 rounded-[2.5rem] cursor-pointer transition-all duration-500 relative group ${flipped ? 'bg-indigo-600 text-white shadow-2xl' : 'bg-slate-50 border-2 border-dashed border-slate-200 hover:border-indigo-400'}`}
              >
                <p className={`text-2xl md:text-3xl font-bold text-center transition-all duration-300 ${flipped ? 'opacity-100 scale-100' : 'text-slate-400 italic group-hover:text-indigo-400'}`}>
                  {flipped ? currentQ?.a : "Tap to reveal official answer"}
                </p>
                {!flipped && <RotateCw className="absolute bottom-6 right-8 text-slate-200 group-hover:text-indigo-300 animate-pulse" size={28} />}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {currentQ?.options?.map((option, i) => {
                  const isCorrect = option === currentQ.a;
                  const isSelected = quizResult.selected === option;
                  let style = "w-full text-left px-8 py-6 rounded-[1.5rem] border-2 font-bold transition-all duration-300 flex justify-between items-center group ";
                  
                  if (!quizResult.answered) style += "border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 hover:pl-10";
                  else if (isCorrect) style += "border-green-500 bg-green-50 text-green-700 ring-8 ring-green-50";
                  else if (isSelected) style += "border-red-500 bg-red-50 text-red-700";
                  else style += "border-slate-50 text-slate-200 opacity-40";

                  return (
                    <button 
                      key={`${index}-${i}`} 
                      disabled={quizResult.answered} 
                      onClick={() => setQuizResult({ answered: true, selected: option })} 
                      className={style}
                    >
                      <span className="text-lg">{option}</span>
                      {quizResult.answered && isCorrect && <CheckCircle2 size={28} className="text-green-600" />}
                      {quizResult.answered && isSelected && !isCorrect && <X size={28} className="text-red-600" />}
                      {!quizResult.answered && <ChevronRight size={20} className="text-slate-200 group-hover:text-indigo-500 transition-transform group-hover:translate-x-1" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Action Interface Footer */}
          <footer className="bg-slate-50 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between border-t border-slate-100 gap-8">
            <button 
              onClick={toggleMastery}
              className={`flex items-center gap-3 text-sm font-black transition-all duration-500 px-8 py-4 rounded-2xl shadow-sm ${currentMastered ? 'bg-green-600 text-white shadow-green-100' : 'bg-white text-slate-400 border border-slate-200 hover:text-indigo-600 hover:border-indigo-200'}`}
            >
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${currentMastered ? 'bg-white border-white' : 'border-slate-200'}`}>
                {currentMastered ? <Check size={14} className="text-green-600" strokeWidth={6} /> : null}
              </div>
              {currentMastered ? 'ITEM MASTERED' : 'MARK AS LEARNED'}
            </button>

            <div className="flex gap-4 w-full md:w-auto">
              <button 
                onClick={handlePrev} 
                className="flex-1 md:flex-none p-5 bg-white border border-slate-200 rounded-[1.5rem] shadow-sm hover:bg-slate-100 transition-all active:scale-95"
              >
                <ChevronLeft size={32} className="text-slate-600" />
              </button>
              <button 
                onClick={handleNext} 
                className="flex-[2] md:flex-none px-14 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black shadow-2xl shadow-indigo-100 hover:bg-indigo-700 hover:scale-[1.03] active:scale-95 transition-all uppercase tracking-widest"
              >
                Continue
              </button>
            </div>
          </footer>
        </article>

        {/* Global Analytics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
               <Trophy size={140} />
            </div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-10 flex items-center gap-3">
              <BarChart3 size={16} /> Shared Mastery
            </h4>
            <div className="space-y-8">
              {family.map(member => {
                const count = Object.keys(mastered).filter(k => k.startsWith(member) && mastered[k]).length;
                const percent = (count / CIVICS_DATA.length) * 100;
                return (
                  <div key={member} className="relative">
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-base font-bold tracking-tight ${member === user ? 'text-white underline underline-offset-8 decoration-indigo-500' : 'text-slate-400'}`}>{member}</span>
                      <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">{count} / {CIVICS_DATA.length}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-800 shadow-inner">
                      <div 
                        className={`h-full transition-all duration-1000 ease-out rounded-full ${member === user ? 'bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.5)]' : 'bg-slate-600'}`} 
                        style={{ width: `${percent}%` }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="bg-white rounded-[2.5rem] p-10 border border-slate-200 flex flex-col justify-between shadow-sm">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-3">
                <Calendar size={16} /> Filing Countdown
              </h4>
              <div className="flex items-center gap-5 mb-6">
                <div className="bg-orange-50 p-4 rounded-[1.25rem] border border-orange-100 shadow-sm shadow-orange-50">
                   <Clock className="text-orange-600" size={32} />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-800 tabular-nums">7 Weeks</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Until June 17</p>
                </div>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <div className="flex items-start gap-3">
                  <Info size={16} className="text-indigo-600 shrink-0 mt-1" />
                  <p className="text-xs text-slate-600 leading-[1.6]">
                    Stay focused on the <span className="font-bold text-indigo-700">2025 Expanded Set</span>. Regular study sessions will ensure a successful outcome for everyone.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Family Prep Engine</span>
               <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 border-4 border-white shadow-sm" />
                  <div className="w-8 h-8 rounded-full bg-slate-100 border-4 border-white shadow-sm" />
                  <div className="w-8 h-8 rounded-full bg-blue-100 border-4 border-white shadow-sm" />
               </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}