'use server';
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.trim() === '';
}
export async function shareMeal(prevState, formData) {
    const mealData = {
      title: formData.get('title'),
      image: formData.get('image'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      creator: formData.get('name'),
      creator_email: formData.get('email'),
    };

    if(
      isInvalidText(mealData.title) ||
      isInvalidText(mealData.summary) ||
      isInvalidText(mealData.instructions) ||
      isInvalidText(mealData.creator) ||
      isInvalidText(mealData.creator_email) ||
      !mealData.creator_email.includes('@') ||
      !mealData.image || mealData.image.size === 0
    ) {
      return {message: "Invalid input"};
    }
    await saveMeal(mealData);
    // revalidatePath('/meals'); //genereally use in production for component re-evaluation
    redirect('/meals');
}