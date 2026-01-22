import { FC } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useAppSelector } from '@services/store';
import { selectIngredients } from '@services/ingredients/slice';

type IngredientDetailsProps = {
  id?: string;
};

export const IngredientDetails: FC<IngredientDetailsProps> = ({
  id: propId
}) => {
  const { id: paramId } = useParams<{ id: string }>();
  const location = useLocation();
  const ingredients = useAppSelector(selectIngredients);

  const id =
    propId || paramId || location.pathname.match(/\/ingredients\/([^/]+)/)?.[1];

  const ingredientData = id ? ingredients.find((ing) => ing._id === id) : null;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
