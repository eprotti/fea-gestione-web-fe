export const addObjectToTemplate = (key, label, value) => ({
  type: 'ADD_OBJECT',
  payload: { key, label, value }
});

export const updateObjectOrder = (updatedTemplate) => ({
  type: 'UPDATE_OBJECT_ORDER',
  payload: updatedTemplate,
});

export const removeObjectFromTemplate = (index) => ({
  type: 'REMOVE_OBJECT',
  payload: index
});