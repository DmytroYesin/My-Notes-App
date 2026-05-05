export type Note = {
  id: string;
  title: string;
  description: string;
  updateDate: string;
};

export const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Grocery List',
    description: 'Milk, eggs, whole grain bread, bananas.',
    updateDate: '2026-05-05',
  },
  {
    id: '2',
    title: 'Meeting Notes',
    description: 'Discuss Q2 roadmap and release milestones.',
    updateDate: '2026-05-03',
  },
  {
    id: '3',
    title: 'Book Ideas',
    description: 'Write about tiny habits and daily routines.',
    updateDate: '2026-04-29',
  },
  {
    id: '4',
    title: 'Travel Plan',
    description: 'Check flights, hotels, and city pass prices.',
    updateDate: '2026-04-24',
  },
  {
    id: '5',
    title: 'Workout Log',
    description: 'Push day: bench press, dips, shoulder press.',
    updateDate: '2026-04-20',
  },
];

