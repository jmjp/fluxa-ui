import { definePanel } from '@fluxa/plugin-sdk';
import { ChatMain } from './chat-main';
import { ChatSidebar } from './chat-sidebar';

export default [
  definePanel({ slot: 'main', component: ChatMain, displayName: 'Conversa simulada' }),
  definePanel({ slot: 'sidebar', component: ChatSidebar, displayName: 'Contexto da conversa' }),
];
