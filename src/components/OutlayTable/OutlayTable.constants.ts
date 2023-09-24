export type OutLayEntries = {
  salary: number;
  equipmentCosts: number;
  estimatedProfit: number;
  overheads: number;
};

export type OutLay = OutLayEntries & {
  id: number;
  rowName: string;
};

export type OutLayEntity = OutLay & {
  hasChildren: boolean;
  parentId: number | null;
  lowerSiblingCounts: string;
};

export type OutLayNode = {
  child: OutLayNode[];
} & OutLay;

export type OutLayTree = OutLayNode[];

export const outlayHeaders = {
  level: 'Уровень',
  title: 'Наименование работ',
  outlay: [
    {
      id: 0,
      title: 'Основная з/п',
    },
    {
      id: 1,
      title: 'Оборудование',
    },
    {
      id: 2,
      title: 'Накладные расходы',
    },
    {
      id: 3,
      title: 'Сметная прибыль',
    },
  ],
};

export const outlayTree: OutLayTree = [
  {
    id: 1,
    rowName: 'Южная строительная площадка',
    salary: 20348,
    equipmentCosts: 108.07,
    estimatedProfit: 1209122.5,
    overheads: 1750,
    child: [
      {
        id: 2,
        rowName: 'Фундаментальные работы',
        salary: 20348,
        equipmentCosts: 108.07,
        estimatedProfit: 1209122.5,
        overheads: 1750,
        child: [
          {
            id: 3,
            rowName: 'Статья работы № 1',
            salary: 20348,
            equipmentCosts: 108.07,
            estimatedProfit: 189122.5,
            overheads: 1750,
            child: [],
          },
          {
            id: 4,
            rowName: 'Статья работы № 2',
            salary: 38200,
            equipmentCosts: 850,
            estimatedProfit: 1020000,
            overheads: 1200,
            child: [],
          },
        ],
      },
    ],
  },
];
