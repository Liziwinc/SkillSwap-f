export const getCategoryColor = (categoryName: string): string => {
  const colorMapKey: Record<string, string> = {
    "Бизнес и карьера": "var(--clr-tag-business)",
    "Творчество и искусство": "var( --clr-tag-arts)",
    "Иностранные языки": "var(--clr-tag-languages)",
    "Образование и развитие": "var(--clr-tag-education)",
    "Дом и уют": "var(--clr-tag-home)",
    "Здоровье и лайфстайл": "var(--clr-tag-health)"
  };

  return colorMapKey[categoryName] || 'var(--clr-tag-ect)';
};