import React from 'react';
import chore from './chore';

export interface choreCard {
        title: string,
        author: string,
        editors: string,
        viewers: string,
        choresActive: chore[],
        choresCompleted: chore[],
}

export default choreCard;