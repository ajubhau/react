import Link from "next/link";
import { getAllMeals } from "../lib/meals";

import classes from './page.module.css';
import MealsGrid from "@/components/meal/meal-grid";
import { Suspense } from "react";

// static metadata
export const metadata = {
  title: 'Meals',
  description: 'Delicious meals list.',
};

async function Meals() {
    const meals = await getAllMeals();
    return <MealsGrid meals={meals}/>
}
export default async function MealsPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>Delicious meals, created <span className={classes.highlight}>by you</span></h1>
                <p>Choose your favorite recipe and cook it your self. It is easy and fun!</p>
                <p className={classes.cta}>
                    <Link href="/meals/share">
                        Share Your Favorite Recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
                    <Meals />
                </Suspense>
            </main>
        </>
    )
}