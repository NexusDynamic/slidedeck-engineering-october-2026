import { mount } from 'svelte';
import './deck.css';
import Deck from './Deck.svelte';

mount(Deck, { target: document.getElementById('app')! });
