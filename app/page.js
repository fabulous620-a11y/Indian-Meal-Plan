"use client";

import { useEffect, useState } from "react";
import { DAYS } from "./data/meals";

export default function Home() {
  const [currentDay, setCurrentDay] = useState(0);
  const [openMeal, setOpenMeal] = useState(null); // index of meal shown in recipe, or null

  const day = DAYS[currentDay];
  const recipe = openMeal !== null ? day.meals[openMeal] : null;

  // Close the recipe with the Escape key.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpenMeal(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock background scrolling while a recipe is open.
  useEffect(() => {
    document.body.style.overflow = recipe ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [recipe]);

  const changeDay = (i) => {
    setCurrentDay(i);
    setOpenMeal(null);
  };

  return (
    <>
      <header>
        <h1>Our Weekly Family Meals</h1>
        <p>Tap any meal to open its recipe</p>
      </header>

      <nav className="days">
        {DAYS.map((d, i) => (
          <button
            key={d.name}
            className={i === currentDay ? "active" : ""}
            onClick={() => changeDay(i)}
          >
            {d.name}
          </button>
        ))}
      </nav>

      <main>
        <h2 className="day-title">
          {day.name} <span>· 3 meals</span>
        </h2>
        <section className="meals">
          {day.meals.map((m, idx) => (
            <button
              key={m.name}
              className="meal"
              aria-label={`${m.name} recipe`}
              onClick={() => setOpenMeal(idx)}
            >
              <div className="pic" style={{ background: m.bg }}>
                {m.emoji}
              </div>
              <div className="body">
                <span className="type">{m.type}</span>
                <h3 className="name">{m.name}</h3>
                <p className="desc">{m.desc}</p>
                <span className="tap">Tap for recipe →</span>
              </div>
            </button>
          ))}
        </section>
      </main>

      <footer>
        Serves 4 · Mushrooms, beef and pork are not included in any meal.
      </footer>

      {recipe && (
        <div
          className="overlay open"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpenMeal(null);
          }}
        >
          <div className="sheet" role="dialog" aria-modal="true">
            <button
              className="close"
              aria-label="Close recipe"
              onClick={() => setOpenMeal(null)}
            >
              ×
            </button>
            <div className="pic" style={{ background: recipe.bg }}>
              {recipe.emoji}
            </div>
            <div className="content">
              <span className="type">
                {recipe.type} · {day.name}
              </span>
              <h2>{recipe.name}</h2>
              <div className="meta">
                {recipe.desc} · ⏱ {recipe.time} · {recipe.serves}
              </div>
              <h3>Ingredients</h3>
              <ul>
                {recipe.ingredients.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3>Method</h3>
              <ol>
                {recipe.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <div className="note">
                Adjust salt and chilli to taste. Use less oil for a lighter version.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
