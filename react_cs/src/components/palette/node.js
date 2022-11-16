const nodes = [
  {
    id: 'Palette',
    type: 'group',
    data: { label: "Palette" },
    position: { x: 0, y: 0 },
    style: {
      width: 170,
      height: "100%",
      backgroundColor: "#D0C0F7"
    },
  },
  {
    id: 'B',
    type: 'input',
    data: { label: 'LB' },
    position: { x: 10, y: 10 },
    parentNode: 'Palette',
    extent: 'parent',
  },
  {
    id: 'C',
    data: { label: 'App' },
    position: { x: 10, y: 90 },
    parentNode: 'Palette',
    extent: 'parent',
  },
  {
    id: 'Canvas',
    type: 'group',
    data: { label: null },
    position: { x: 200, y: 0 },
    style: {
      width: "100%",
      height: "100%",
      backgroundColor: "#A0C0F7"
    },
  },

];

export default nodes;