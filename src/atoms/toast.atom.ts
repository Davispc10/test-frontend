import { atom } from 'jotai';
import { toast as totastInstance } from 'react-toastify';

export const toast = atom(totastInstance);
