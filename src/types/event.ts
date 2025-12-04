export interface FightEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  mainFight: string;
  imageUrl: string;
  price: number;
  category: 'MMA' | 'BOXEO' | 'MUAY_THAI' | 'KICKBOXING' | 'BJJ';
  isHighlight?: boolean;
}
