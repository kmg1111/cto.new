export const CONTAINER_DIMENSIONS = {
  width: 20,
  height: 8.5,
  depth: 8
};

export const WINDOW_DOOR_TYPES = {
  SLIDING_GLASS: {
    id: 'sliding-glass',
    name: 'Sliding Glass Door',
    width: 3,
    height: 6.67
  },
  FIXED_WINDOW: {
    id: 'fixed-window',
    name: 'Fixed Window',
    width: 4,
    height: 2
  },
  ENTRY_DOOR: {
    id: 'entry-door',
    name: 'Insulated Entry Door',
    width: 3,
    height: 6.67
  }
};

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
