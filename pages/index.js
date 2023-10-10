import Head from 'next/head';
import React from 'react';
import { useState } from 'react';
import styles from './index.module.css';

export default function Home() {
  const [age, setAge] = useState(28);
  const [skill, setSkill] = useState('beginner');
  const [time, setTime] = useState('A Weekend');
  const [language, setLanguage] = useState('JavaScript');

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState('');
  const [step, setStep] = useState('');
  const [example, setExample] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    setResult('');
    setStep('');
    setExample('');
    const response = await fetch('/api/generate-projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ age, skill, time, language }),
    });
    const data = await response.json();
    setResult(data.result.replaceAll('\\n', '<br />'));
    setStep(data.resultTwo.replaceAll('\\n', '<br />'));
    setExample(data.resultThree.replaceAll('\\n', '<br />'));
    setLoading(false);
  }

  return (
    <div>
      <Head>
        <title>Project Picker</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3> 💡 Programmer Project Picker 💡</h3>
        <form onSubmit={onSubmit}>
          <label>What is your skill Level?</label>
          <select
            name="skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <label> Coding Language</label>
          <input
            type="text"
            name="language"
            placeholder="Enter the language you want to use for your project"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />

          <label>Age</label>
          <input
            type="number"
            min={1}
            max={99}
            name="age"
            placeholder="Enter the age"
            value={age}
            onChange={(e) => setAge(Number.parseInt(e.target.value))}
          />

          <label>Time</label>
          <input
            type="text"
            name="time"
            placeholder="Enter the time you want to take on your project"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <input type="submit" value="Generate Project Idea" />
        </form>

        {loading && (
          <div>
            <h3>Looking for the best project idea 💡</h3>
            <img src="/loading.webp" className={styles.loading} />
          </div>
        )}

        {result != '' && (
          <div className={styles.resultContainer}>
            <div className={styles.resultHeading}> Project Title: </div>
            <div className={styles.result}>{result}</div>
            <div className={styles.resultHeading}> Project Steps:</div>
            <div className={styles.result}> {step}</div>
            <div className={styles.resultHeading}> Similar Projects:</div>
            <div className={styles.result}>{example}</div>
          </div>
        )}
      </main>
    </div>
  );
}
