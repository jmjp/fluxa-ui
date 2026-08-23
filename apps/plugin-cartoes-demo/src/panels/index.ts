import { definePanel } from '@fluxa/plugin-sdk';
import { CartoesMain } from './cartoes-main';
import { CartoesSidebar } from './cartoes-sidebar';

export default [
  definePanel({ slot: 'main', component: CartoesMain, displayName: 'Cartões' }),
  definePanel({ slot: 'sidebar', component: CartoesSidebar }),
];
