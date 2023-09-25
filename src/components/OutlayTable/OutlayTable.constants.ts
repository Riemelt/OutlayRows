import { OutlayTree } from '../../store/types/types';

export const outlayHeaders = {
  level: 'Уровень',
  title: 'Наименование работ',
  outlay: [
    {
      id: 0,
      title: 'Основная з/п',
      type: 'salary',
    },
    {
      id: 1,
      title: 'Оборудование',
      type: 'overheads',
    },
    {
      id: 2,
      title: 'Накладные расходы',
      type: 'equipmentCosts',
    },
    {
      id: 3,
      title: 'Сметная прибыль',
      type: 'estimatedProfit',
    },
  ],
};
