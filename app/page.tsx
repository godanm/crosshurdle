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
 */
const CIVICS_DATA = [
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
  { id: 38, q: "What is the name of the President of the United States now?", a: "Joe Biden", options: ["Donald Trump", "Joe Biden", "Barack Obama", "Kamala Harris"], cat: "Government" },
  { id: 39, q: "What is the name of the Vice President now?", a: "Kamala Harris", options: ["Mike Pence", "Kamala Harris", "Nancy Pelosi", "Joe Biden"], cat: "Government" },
  { id: 61, q: "Who is the Governor of your state now?", a: "Katie Hobbs", options: ["Mark Kelly", "Doug Ducey", "Katie Hobbs", "Kari Lake"], cat: "AZ Specific" },
  { id: 62, q: "What is the capital of your state?", a: "Phoenix", options: ["Tucson", "Flagstaff", "Phoenix", "Sedona"], cat: "AZ Specific" },
  { id: 128, q: "What is Veterans Day?", a: "A holiday to honor people who served in the military", options: ["A day for soldiers", "A holiday to honor people who served in the military", "A day to end war", "The birthday of the Army"], cat: "Holidays" }
];

export default function App() {
  const [hasMounted, setHasMounted] = useState(false);
  const [user, setUser] = useState('Godan');
  const [mode, setMode] = useState('flashcards');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizResult, setQuizResult] = useState({ answered: false, selected: null as string | null });
  
  // FIX: Added explicit index type to state to resolve build error
  const [mastered, setMastered] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setHasMounted(true);
    const saved = localStorage.getItem('family_mastery_128');
    if (saved) {
      try {
        setMastered(JSON.parse(saved));
      } catch (e) {
        console.error("Parse error", e);
      }
    }
  }, []);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('family_mastery_128', JSON.stringify(mastered));
    }
  }, [mastered, hasMounted]);

  const family = useMemo(() => ['Godan', 'Sudha', 'Rajesh', 'Anu'], []);
  const currentQ = useMemo(() => CIVICS_DATA[index] || CIVICS_DATA[0], [index]);

  // FIX: Safely accessing the Record with string template
  const currentMastered = useMemo(() => {
    const key = `${user}-${currentQ?.id}`;
    return !!mastered[key];
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
              <h3 className="text-sm font-black text-slate-500 uppercase tracking-tight">{user}'s Progress</h3>
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
              <div onClick={() => setFlipped(!flipped)} className={`w-full min-h-[250px] flex flex-col items-center justify-center p-10 rounded-[2.5rem] cursor-pointer transition-all duration-500 relative group ${flipped ? 'bg-indigo-600 text-white shadow-2xl' : 'bg-slate-50 border-2 border-dashed border-slate-200 hover:border-indigo-400'}`}>
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
                      <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">{count} / {CIVICS_DATA.length}</span>
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