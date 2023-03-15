export const reduceMultiSelectArray = (arr) => {
  return arr.map((e) => {
    return {
      label: e.surname ? e.name + " " + e.surname : e.name,
      value: e.id,
    };
  });
};

export const reduceSelectArrayMultiSelect = (arr) => {
  return arr.map((e) => {
    return { name: e.label, id: e.value };
  });
};
