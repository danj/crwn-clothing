export const categoriesMapSelector = (state) => state.categories.categories.reduce((acc, data) => {
    const {title, items} = data;
    acc[title.toLowerCase()] = items;
    return acc;
}, {});

export const categoriesSelector = (state) => state.categories.categories;

export const categoriesIsLoadingSelector = (state) => state.categories.categories.isLoading;
