export interface FlowerItem {
  id: string;
  name: string;
  type: 'rose' | 'sunflower' | 'gerbera' | 'alstroemeria';
  x: number;
  y: number;
  rotation: number;
  scale: number;
  delay: number;
  meaning: string;
}

export type SceneState = 'initial' | 'opening_envelope' | 'letter_revealed' | 'blooming' | 'completed';
