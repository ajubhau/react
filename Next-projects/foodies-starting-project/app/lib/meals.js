import fs from "node:fs";

// import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const sql = require('better-sqlite3');
const db = sql('meals.db');

export async function getAllMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // throw new Error('error')
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals where slug = ?').get(slug)
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const filename = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${filename}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed');
        }
    })

    meal.image = `/images/${filename}`;
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return db.prepare(`
        INSERT INTO meals
        (title, image, summary, instructions, creator, creator_email, slug) 
        VALUES (
            @title,
            @image,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @slug
        )`
    ).run(meal);
}